import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ params, locals: { supabase } }) => {
  const { data: getChara, error: getCharaError } = await supabase
    .from('characters')
    .select()
    .eq('id', params.id)
    .single();
  if (getCharaError) throw getCharaError;
  return json(getChara);
}