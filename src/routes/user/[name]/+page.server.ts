import { fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, locals: { supabase } }) => {
  const { data: user, error: userError } = await supabase
    .from('users')
    .select()
    .eq('username', params.name)
    .single();
  
  if (userError) return fail(404, { message: 'Unable to find user.' });
  
  return { user }
}