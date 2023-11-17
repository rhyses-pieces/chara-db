import { PUBLIC_DB_URL, PUBLIC_DB_ANON_KEY } from "$env/static/public";
import { createSupabaseServerClient } from "@supabase/auth-helpers-sveltekit";
import { redirect, type Handle, error } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
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
    if (!session) throw redirect(304, '/');
  }

  if (event.url.pathname.startsWith('/chara') && event.request.method !== 'GET') {
    const session = await event.locals.getSession();
    if (!session) throw error(304, '/');
  }

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === 'content-range';
    },
  });
}