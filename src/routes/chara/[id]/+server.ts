import { redirect, type RequestHandler } from "@sveltejs/kit";

export const DELETE: RequestHandler = async ({ params, locals: { supabase }}) => {
  const id = params.id;
  const { error: deleteCharaError } = await supabase
    .from('characters')
    .delete()
    .eq('id', id);
  if (deleteCharaError) throw deleteCharaError;
  throw redirect(303, '/chara');
}