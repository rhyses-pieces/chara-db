import { type Actions, fail, redirect, error } from "@sveltejs/kit";
import DOMPurify from 'isomorphic-dompurify';
import { superValidate } from "sveltekit-superforms/server";
import { z } from "zod";
import { nanoid } from "nanoid";

const uuid = crypto.randomUUID();
const imageId = nanoid(11);

const schema = z.object({
  uuid: z.string().uuid().default(uuid),
  name: z.string().min(2),
  content: z.string(),
});

export const load = async () => {
  const form = await superValidate(schema, { errors: false });
  
  return { form };
}

export const actions = {
  upload: async ({ request, locals: { supabase, getSession } }) => {
    const session = await getSession();
    const data = await request.formData();
    
    const username = session?.user.user_metadata.username as string;
    const charaName = data.get('name') as string;
    const file = data.get('image')?.valueOf() as File;
    const fileExt = file.name.split('.').pop();
    const filePath = `${username}/${charaName}-${imageId}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('chara_assets')
      .upload(filePath, file);
    
    if (uploadError) throw uploadError;
  },

  submit: async ({ request, locals: { supabase, getSession } }) => {
    const session = await getSession();
    const userId = session?.user.id!;
    const form = await superValidate(request, schema);
    
    if (!form.valid) return error(400, { message: `Form was not valid` });

    const uuid = form.data.uuid;
    const name = form.data.name;
    const content = form.data.content;

    if (content.match(/<script>|<\/script>/gi) !== null) {
      throw error(402, { message: `Can't use <script> tags!` });
    }

    const sanitizeConfig = {
      ALLOWED_ATTR: ['style', 'class'],
    };
    const sanitize = DOMPurify.sanitize(form.data.content, sanitizeConfig);
    
    if (!form.valid) throw error(402, { message: 'Form is not valid!' });

    const { error: supabaseError } = await supabase
      .from('characters')
      .insert({ 
        id: uuid,
        creator_id: userId,
        name,
        data: sanitize,
      });
    
    if (supabaseError) {
      console.error(supabaseError);
      return fail(500, {
        message: supabaseError.message,
      });
    }

    throw redirect(301, `/chara/${uuid}`);
  }
} satisfies Actions;