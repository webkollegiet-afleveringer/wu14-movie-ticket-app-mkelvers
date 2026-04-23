import TMDBClient from "$lib/server/tmdb/client";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch }) => {
  const upcoming = await TMDBClient.GET("/3/movie/upcoming",
    {
      fetch,
    });

  return {
    upcoming: upcoming.data
  };
};
