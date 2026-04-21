
import createClient, { type Middleware } from "openapi-fetch";
import type { paths } from "./schema.ts";
import { TMDB_TOKEN } from "$env/static/private";

// apiapi spec https://developer.themoviedb.org/openapi/tmdb-api.json
const authMiddleware: Middleware = {
  async onRequest({ request }) {
    request.headers.set("Authorization", `Bearer ${TMDB_TOKEN}`);
    return request;
  },
};

const TMDBClient = createClient<paths>({
  baseUrl: "https://api.themoviedb.org/",
  fetch,
});
TMDBClient.use(authMiddleware);

export default TMDBClient;
