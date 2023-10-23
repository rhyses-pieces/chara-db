import { error, type Actions, fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, locals: { supabase } }) => {
  const { data: chara } = await supabase
   .from('characters')
   .select()
   .eq('id', params.id)
   .single();

  return { chara };
}

export const actions = {
  update: async ({ request, locals: { supabase } }) => {
    const form = await request.formData();
    const content = form.get('content');
    
    const { error: updateCharaError, data: updateChara } = await supabase
      .from('characters')
      .update({ content });
    
    if (updateCharaError) {
      return fail(500, {
        supabaseErrorMessage: updateCharaError.message,
      });
    }

    return { updateChara };
  },
  
  delete: async ({ request, locals: { supabase } }) => {
    const form = await request.formData();
    const id = form.get('id') as string;

    const { error: deleteCharaError } = await supabase
      .from('characters')
      .delete()
      .eq('id', id);
    
    if (deleteCharaError) {
      return fail(500, {
        supabaseErrorMessage: deleteCharaError.message,
      });
    }
  }
} satisfies Actions;
