import type { Handle, HandleFetch } from '@sveltejs/kit';
import { building } from '$app/environment';
import { auth } from '$lib/server/auth';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { redisClient } from '$lib/server/redis';

const handleBetterAuth: Handle = async ({ event, resolve }) => {
  const session = await auth.api.getSession({ headers: event.request.headers });

  if (session) {
    event.locals.session = session.session;
    event.locals.user = session.user;
  }

  return svelteKitHandler({ event, resolve, auth, building });
};

export const handleFetch: HandleFetch = async ({ request, fetch }) => {
  const url = new URL(request.url);
  console.log("using fetch handler, for:", url.host)
  if (url.host !== "api.themoviedb.org") {
    return fetch(request);
  }
  console.log("checking cache")
  if (await redisClient.exists(url.pathname)) {
    console.log("using cached response")
    const data = await redisClient.json.GET(url.pathname);
    return new Response(JSON.stringify(data), {
      headers: {
        "X-Cache": "HIT",
        "Content-Type": "application/json"
      }
    });
  };

  console.log("getting new response")
  const response = await fetch(request);
  if (response.ok) {
    const data = await response.clone().json()
    //redisClient.json.SET(url.pathname, "$", data);

    redisClient
      .multi()
      .json.SET(url.pathname, "$", data)
      .expire(url.pathname, 3600)
      .exec();
  }
  console.log("crafting new reponse")
  const headers = new Headers(response.headers);
  headers.set("X-Cache", "MISS");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
export const handle: Handle = handleBetterAuth;
