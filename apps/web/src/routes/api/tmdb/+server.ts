import TMDBClient from "$lib/server/tmdb/client";
import { json } from "@sveltejs/kit";

export async function GET({ fetch }) {
  const movies = await TMDBClient.GET(
    "/3/movie/popular",
    {
      fetch,
    });
  return json(movies)
}
