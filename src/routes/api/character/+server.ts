import { json } from "@sveltejs/kit";
import type { PageServerLoad } from "../../$types";

export const GET: PageServerLoad = async ({ locals: { supabase } }) => {
  const { data, error } = await supabase.from('characters').select();
  if (error) throw error; else return json(data);
}