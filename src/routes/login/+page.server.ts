import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions = {
  register: async ({ request, url, locals: { supabase }}) => {
    const auth = supabase.auth;
    const form = await request.formData();

    const username = form.get('username') as string;
    const email = form.get('email') as string;
    const password = form.get('password') as string;
    
    const { error } = await auth.signUp({
      email,
      password,
      options: {
        data: {
          username: username,
        },
        emailRedirectTo: `${url.origin}/auth/callback`,
      },
    });

    if (error) {
      return fail(500, { 
        message: 'Sign up error. Please try again later.',
        success: false,
        email,
      });
    }

    return {
      message: 'Please check your inbox or junk folder for a link to confirm your account',
      success: true,
    }
  },

  login: async ({ request, locals: { supabase } }) => {
    const auth = supabase.auth;
    const form = await request.formData();

    const email = form.get('email') as string;
    const password = form.get('password') as string;

    const { error } = await auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return fail(500, {
        message: 'Login failed. Please try again later',
        success: false,
        email,
      });
    }

    throw redirect(303, '/user');
  }
} satisfies Actions;