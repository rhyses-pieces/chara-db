import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals: { supabase, getSession } }) => {
  const session = await getSession();
  const { data: characters } = await supabase
    .from('characters')
    .select()
    .limit(20);
  
  return { session, characters };
}