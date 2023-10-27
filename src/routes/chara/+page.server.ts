import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
  const { data: characters } = await supabase
    .from('characters')
    .select()
    .limit(20);
  
  return { characters };
}