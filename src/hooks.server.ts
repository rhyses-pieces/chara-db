import { PUBLIC_DB_URL, PUBLIC_DB_ANON_KEY } from "$env/static/public";
import { createSupabaseServerClient } from "@supabase/auth-helpers-sveltekit";
import { redirect, type Handle, error } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  // @ts-expect-error - supabase is yelling about protected properties?
  event.locals.supabase = createSupabaseServerClient({
    supabaseUrl: PUBLIC_DB_URL,
    supabaseKey: PUBLIC_DB_ANON_KEY,
    event,
  });

  event.locals.getSession = async () => {
    const { data: { session } } = await event.locals.supabase.auth.getSession();
    return session;
  }

  if (event.url.pathname === '/user') {
    const session = await event.locals.getSession();
    if (!session) throw redirect(303, '/');
  }

  if (event.url.pathname.startsWith('/chara') && event.request.method === 'POST') {
    const session = await event.locals.getSession();
    if (!session) throw error(303, '/');
  }

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === 'content-range';
    },
  });
}