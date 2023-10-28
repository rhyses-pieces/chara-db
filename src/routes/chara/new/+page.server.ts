import { type Actions, fail, redirect, error } from "@sveltejs/kit";
import DOMPurify from 'isomorphic-dompurify';

export const actions = {
  default: async ({ request, locals: { supabase, getSession } }) => {
    const session = await getSession();
    const form = await request.formData();

    const uuid = crypto.randomUUID() as string;
    const creator = session?.user.id;
    const name = form.get('name') as string;
    const content = form.get('content') as string;

    if (content.search('<script>')) {
      return error(402, { message: `Can't use <script> tags!` });
    }

    const sanitizeConfig = {
      ALLOWED_ATTR: ['style', 'class'],
    };
    const sanitize = DOMPurify.sanitize(content, sanitizeConfig);
    
    const { error: supabaseError } = await supabase
      .from('characters')
      .insert({ 
        id: uuid,
        creator_id: creator,
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