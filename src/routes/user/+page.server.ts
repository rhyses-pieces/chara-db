import { redirect, type Actions, fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals: { supabase, getSession } }) => {
  const session = await getSession();

  if (!session) throw redirect(303, '/');

  const { data: { user } } = await supabase.auth.getUser();
  const { data: characters } = await supabase
    .from('characters')
    .select()
    .eq('creator_id', session.user.id);

  return { session, user, characters };
}

export const actions = {
  update: async ({ request, locals: { supabase } }) => {
    const form = await request.formData();

    const username = form.get('username') as string;
    const email = form.get('email') as string;
    
    const { data: { user }, error } = await supabase.auth.updateUser({
      email,
      data: {
        username: username,
      },
    });

    if (error) return fail(500, { user });
    return { user };
  },

  password: async ({ request, locals: { supabase } }) => {
    
  },

  logout: async ({ locals: { supabase, getSession } }) => {
    const session = await getSession();
    if (session) {
      await supabase.auth.signOut();
      throw redirect(303, '/');
    }
  }
} satisfies Actions;