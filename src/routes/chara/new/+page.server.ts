import { error, type Actions, fail } from "@sveltejs/kit";

export const actions = {
  default: async ({ request, locals: { supabase, getSession } }) => {
    const session = await getSession();
    const form = await request.formData();

    const uuid = crypto.randomUUID();
    const creator = session?.user.id;
    const name = form.get('name');
    const content = form.get('content');
    
    const { error: createCharaError, data: newChara } = await supabase
      .from('characters')
      .insert({ 
        uuid,
        creator,
        name,
        content
      });
    
    if (createCharaError) {
      return fail(500, {
        supabaseErrorMessage: createCharaError.message,
      });
    }

    return { newChara };
  }
} satisfies Actions;