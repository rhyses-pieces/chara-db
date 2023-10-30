import { type Actions, fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, locals: { supabase } }) => {
  const { data: chara, error: characterError } = await supabase
    .from('characters')
    .select(`*,
      users ( username )
    `)
    .eq('id', params.id)
    .single();

  if (characterError) return fail(404, { message: "Unable to find character!" });

  return { chara };
}

export const actions = {
  update: async ({ params, request, locals: { supabase } }) => {
    const form = await request.formData();
    const content = form.get('content') as string;
    
    const { error: updateCharaError } = await supabase
      .from('characters')
      .update({ data: content })
      .eq('id', params.id);
    
    if (updateCharaError) return fail(500, { message: updateCharaError.message });
  },
  
  delete: async ({ request, locals: { supabase } }) => {
    const form = await request.formData();
    const id = form.get('id') as string;

    const { error: deleteCharaError } = await supabase
      .from('characters')
      .delete()
      .eq('id', id);
    
    if (deleteCharaError) return fail(500, { message: deleteCharaError.message, });
  }
} satisfies Actions;
