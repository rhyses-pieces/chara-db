import { fail, redirect } from "@sveltejs/kit";
import { z } from "zod";
import { superValidate } from "sveltekit-superforms/server";
import type { Actions } from "./$types";

// username should:
  // 1. not be a single string of repeating characters
  // 2. start with at least one alphanumeric character
  // 3. not end with any symbols (such as .,[]) with the exception of _
  // 4. should contain only alphanumeric characters
  // 5. should be at least 2 to 30 characters max
const usernameRegex = /(?!(.)\1+$)^[a-z0-9]{1}\w{1,29}(?!\W)$/gi;

const registerSchema = z.object({
  username: z.string().regex(usernameRegex, { message: 'Usernames must be in the correct format.' }),
  email: z.string().email(),
  password: z.string().min(6),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const load = async () => {
  const loginForm = await superValidate(loginSchema);
  const registerForm = await superValidate(registerSchema);

  return { loginForm, registerForm };
};

export const actions = {
  register: async ({ request, url, locals: { supabase }}) => {
    const auth = supabase.auth;
    const registerForm = await superValidate(request, registerSchema);

    if (!registerForm.valid) return fail(400, { registerForm });

    const username = registerForm.data.username;
    const email = registerForm.data.email;
    const password = registerForm.data.password;
    
    const { error } = await auth.signUp({
      email,
      password,
      options: {
        data: {
          username: username,
        },
        emailRedirectTo: `${url.origin}/api/auth/callback`,
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
    const loginForm = await superValidate(request, loginSchema);

    const email = loginForm.data.email;
    const password = loginForm.data.password;

    if (!loginForm.valid) return fail(400, { loginForm });

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