import { type Actions, fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import DOMPurify from "isomorphic-dompurify";
import { nanoid } from "nanoid";

const imageId = nanoid(11);

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
  upload: async ({ request, locals: { supabase, getSession } }) => {
    const session = await getSession();
    const form = await request.formData();

    const username = session?.user.user_metadata.username as string;
    const name = form.get('name') as string;
    const image = form.get('image')?.valueOf() as File;
    const fileExt = image.name.split('.').pop();
    const filePath = `${username}/${name}-${imageId}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('chara_assets')
      .upload(filePath, image);
    
    if (uploadError) throw uploadError;
  },

  update: async ({ params, request, locals: { supabase } }) => {
    const form = await request.formData();
    const name = form.get('name') as string;
    const content = form.get('content') as string;

    const sanitize = DOMPurify.sanitize(content);
    
    const { error: updateCharaError } = await supabase
      .from('characters')
      .update({ name: name, data: sanitize })
      .eq('id', params.id)
      .select();
    
    if (updateCharaError) {
      console.error(updateCharaError);
      return fail(500, { message: updateCharaError.message })
    };

    return { message: 'Successfully updated!' }
  },
} satisfies Actions;
