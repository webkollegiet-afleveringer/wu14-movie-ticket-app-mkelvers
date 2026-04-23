<script lang="ts">
	import { page } from '$app/state';
	import { TMDB_URL } from '$lib/globals.js';

  const { data } = $props();
  const topMovies = $derived(data.topMovies)
  const recommended = $derived(data.recommended)
</script>

<main class="space-y-8 p-6 pb-24">
	<header class="flex items-center justify-between">
		<a href="/" title="go back to home">
			<svg
				width="26"
				height="26"
				viewBox="0 0 26 26"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M16.25 19.5L9.75 13L16.25 6.5"
					stroke="white"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</a>

		<h1 class="text-xl font-medium text-foreground">Explore Movie</h1>

		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<circle cx="10" cy="10" r="7" stroke="white" stroke-width="2" />
			<path
				d="M21 21L15 15"
				stroke="white"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	</header>

	<nav
		class="grid max-w-sm grid-cols-2 gap-1.5 rounded-xl bg-[#2f3745] p-1.5"
		aria-label="Movie availability"
	>
		<a
			href="?type=now-showing"
			data-sveltekit-replacestate
			data-active={page.url.searchParams.get('type') !== 'upcoming' || undefined}
			class="cursor-pointer rounded-lg px-5 py-3 text-center text-base font-medium text-foreground/50 transition-colors data-active:bg-accent data-active:text-foreground"
		>
			Now Showing
		</a>

		<a
			href="?type=upcoming"
			data-sveltekit-replacestate
			data-active={page.url.searchParams.get('type') === 'upcoming' || undefined}
			class="cursor-pointer rounded-lg px-5 py-3 text-center text-base font-medium text-foreground/50 transition-colors data-active:bg-accent data-active:text-foreground"
		>
			Upcoming
		</a>
	</nav>

	<section id="top-movies" class="space-y-4">
		<header class="flex items-center justify-between">
			<h2 class="text-xl font-medium text-foreground">Top Movies</h2>
			<button type="button" class="text-sm text-[#696D74]">See more</button>
		</header>

		<div
			class="flex snap-x snap-mandatory overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
		>
			{#each topMovies?.results as movie}
				<a href="/movie/{movie.id}" class="min-w-[80%] snap-start snap-always space-y-2 pr-4">
					<img
						src={`${TMDB_URL}${movie.poster_path}`}
						alt="movie poster"
						class="aspect-3/4 w-full rounded-xl object-cover"
					/>
					<p class="text-sm font-medium text-foreground">{movie.title}</p>
					<div class="flex items-center gap-0.5">
						{#each Array(5) as _, j}
							<svg width="20" height="20" viewBox="0 0 24 24" fill="#F59E0B">
								<path
									d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
								/>
							</svg>
						{/each}
					</div>
				</a>
			{/each}
		</div>
	</section>

	<section id="recommended" class="space-y-4">
		<header class="flex items-center justify-between">
			<h2 class="text-xl font-medium text-foreground">Recommended</h2>
			<button type="button" class="text-sm text-[#696D74]">See more</button>
		</header>

		<div
			class="flex snap-x snap-mandatory overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
		>
			{#each recommended?.results ?? [] as movie}
				<a href="/movie/{movie.id}" class="min-w-[40%] snap-start snap-always space-y-2 pr-3">
					<img
						src={`${TMDB_URL}${movie.poster_path}`}
						alt="movie poster"
						class="aspect-4/5 w-full rounded-xl object-cover"
					/>
					<p class="text-sm font-medium text-foreground">{movie.title}</p>
				</a>
			{/each}
		</div>
	</section>
</main>
