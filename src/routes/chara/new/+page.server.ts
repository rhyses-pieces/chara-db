import { type Actions, fail, redirect } from "@sveltejs/kit";
import DOMPurify from 'isomorphic-dompurify';

export const actions = {
  default: async ({ request, locals: { supabase, getSession } }) => {
    const session = await getSession();
    const form = await request.formData();

    const uuid = crypto.randomUUID() as string;
    const creator = session?.user.id;
    const name = form.get('name') as string;
    const content = form.get('content') as string;

    const sanitizeConfig = {
      ALLOWED_ATTR: ['style', 'class'],
    };
    const sanitize = DOMPurify.sanitize(content, sanitizeConfig);
    
    const { error } = await supabase
      .from('characters')
      .insert({ 
        id: uuid,
        creator_id: creator,
        name,
        data: sanitize,
      });
    
    if (error) {
      console.error(error);
      return fail(500, {
        supabaseErrorMessage: error.message,
      });
    }

    throw redirect(301, `/chara/${uuid}`);
  }
} satisfies Actions;