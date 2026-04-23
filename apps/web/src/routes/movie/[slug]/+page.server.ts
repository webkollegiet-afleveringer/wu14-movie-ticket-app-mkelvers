import TMDBClient from "$lib/server/tmdb/client";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, fetch }) => {
  const movie = await TMDBClient.GET(`/3/movie/{movie_id}`, {
    fetch,
    params: {
      path: {
        movie_id: Number.parseInt(params.slug)
      }
    }
  });

  return {
    movie: movie.data
  };
};
