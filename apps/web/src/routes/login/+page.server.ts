import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import type { PageServerLoad } from './$types';
import { auth } from '$lib/server/auth';
import { APIError } from 'better-auth/api';

export const load: PageServerLoad = (event) => {
  if (event.locals.user) {
    return redirect(302, '/');
  }
  return {};
};

export const actions: Actions = {
  signInEmail: async (event) => {
    const formData = await event.request.formData();
    const email = formData.get('email')?.toString() ?? '';
    const password = formData.get('password')?.toString() ?? '';

    try {
      await auth.api.signInEmail({
        body: {
          email,
          password,
          callbackURL: '/auth/verification-success'
        }
      });
    } catch (error) {
      if (error instanceof APIError) {
        return fail(400, { message: error.message || 'Signin failed' });
      }
      return fail(500, { message: 'Unexpected error' });
    }

    return redirect(302, '/');
  },
  signUpEmail: async (event) => {
    const formData = await event.request.formData();
    const email = formData.get('email')?.toString() ?? '';
    const password = formData.get('password')?.toString() ?? '';
    const name = formData.get('name')?.toString() ?? '';
    console.log(
      {
        email,
        password,
        name,
        callbackURL: '/auth/verification-success'
      }
    )
    try {
      await auth.api.signUpEmail({
        body: {
          email,
          password,
          name,
          callbackURL: '/auth/verification-success'
        }
      });
    } catch (error) {
      if (error instanceof APIError) {
        return fail(400, { message: error.message || 'Registration failed' });
      }
      console.log("better_auth is screaming", error)
      return fail(500, { message: 'Unexpected error' });
    }

    return redirect(302, '/');
  },
  signUpSSO: async (event) => {
    const formData = await event.request.formData();
    const callbackURL = formData.get('callbackURL')?.toString() ?? '/login';
    const data = await auth.api.signInWithOAuth2({
      body: {
        providerId: "keycloack",
        callbackURL
      }
    })
    console.log(data)

    if (data.url) {
      return redirect(302, data.url);
    }

    console.log("[error] unexpected auth errror", data);
    return fail(500, "unexpected error")

  }
};
