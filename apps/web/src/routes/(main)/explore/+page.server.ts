import TMDBClient from "$lib/server/tmdb/client";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, url }) => {
  const type = url.searchParams.get("type");
  const isUpcoming = type === "upcoming";

  const [topMovies, recommended] = await Promise.all([
    TMDBClient.GET(isUpcoming ? "/3/movie/upcoming" : "/3/movie/now_playing", { fetch }),
    TMDBClient.GET("/3/movie/popular", { fetch }),
  ]);

  return {
    topMovies: topMovies.data,
    recommended: recommended.data,
  };
};

