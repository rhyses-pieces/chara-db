import { json } from "@sveltejs/kit";
import type { PageServerLoad } from "../../chara/$types";

export const GET: PageServerLoad = async ({ locals: { supabase } }) => {
  const { data, error } = await supabase.from('characters').select();
  if (error) throw error;
  return json(data);
}