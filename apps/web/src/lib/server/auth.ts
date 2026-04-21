import { betterAuth } from 'better-auth/minimal';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { env } from '$env/dynamic/private';
import { getRequestEvent } from '$app/server';
import { db } from '$lib/server/db';
import { genericOAuth } from "better-auth/plugins"
import { KEYCLOACK_CLIENT, KEYCLOACK_ISSUER, KEYCLOACK_SECRET } from '$env/static/private';
export const auth = betterAuth({
  baseURL: env.ORIGIN,
  secret: env.BETTER_AUTH_SECRET,
  database: drizzleAdapter(db, { provider: 'sqlite' }),
  emailAndPassword: { enabled: true },
  plugins: [
    genericOAuth({
      config: [
        {
          providerId: "keycloack",
          clientId: KEYCLOACK_CLIENT,
          clientSecret: KEYCLOACK_SECRET,
          discoveryUrl: KEYCLOACK_ISSUER,
          scopes: ["openid", "email", "profile"]
        }
      ]
    }),
    sveltekitCookies(getRequestEvent) // make sure this is the last plugin in the array
  ]
});
