<script lang="ts">
	import type { PageProps } from './$types';

	let { data, params }: PageProps = $props();
	let movie = $derived(data.movie);

	let isExpanded = $state(false);
</script>

<main class="space-y-8 p-6">
	<header class="flex items-center justify-between">
		<a href="/explore" title="go back to explore">
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

		<h1 class="text-xl font-medium text-foreground">Details Movie</h1>

		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M14.7008 2C18.0928 2 20.0388 3.679 20.0388 6.604V21.14C20.0388 21.75 19.7248 22.299 19.1968 22.606C18.6708 22.914 18.0368 22.92 17.5048 22.62L11.5448 19.253L5.52982 22.627C5.26982 22.773 4.98482 22.847 4.69882 22.847C4.40382 22.847 4.10882 22.768 3.84082 22.61C3.31382 22.303 2.99982 21.754 2.99982 21.145V6.421C2.99982 3.611 4.94682 2 8.34182 2H14.7008ZM14.7008 3.5H8.34182C5.79282 3.5 4.49982 4.482 4.49982 6.421V21.145C4.49982 21.239 4.55382 21.29 4.59882 21.316C4.64382 21.344 4.71482 21.364 4.79682 21.318L11.1788 17.738C11.4068 17.611 11.6858 17.61 11.9148 17.739L18.2418 21.313C18.3248 21.361 18.3958 21.339 18.4408 21.312C18.4858 21.285 18.5388 21.234 18.5388 21.14L18.5385 6.49004C18.5309 5.62937 18.3644 3.5 14.7008 3.5ZM15.1396 8.7285C15.5536 8.7285 15.8896 9.0645 15.8896 9.4785C15.8896 9.8925 15.5536 10.2285 15.1396 10.2285H7.82162C7.40762 10.2285 7.07162 9.8925 7.07162 9.4785C7.07162 9.0645 7.40762 8.7285 7.82162 8.7285H15.1396Z"
				fill="white"
				stroke="white"
				stroke-width="0.5"
			/>
		</svg>
	</header>

	<div
		class="flex snap-x snap-mandatory overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
	>
		{#if movie?.backdrop_path}
			<div class="min-w-[80%] snap-start snap-always pr-4">
				<img
					src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
					alt={movie.title}
					class="aspect-2/3 w-full rounded-xl object-cover"
				/>
			</div>
		{/if}
		{#if movie?.poster_path}
			<div class="min-w-[80%] snap-start snap-always pr-4">
				<img
					src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
					alt={movie.title}
					class="aspect-2/3 w-full rounded-xl object-cover"
				/>
			</div>
		{/if}
	</div>

	<section class="space-y-4">
		<div class="space-y-2">
			<h1 class="text-2xl font-semibold text-foreground">{movie?.title}</h1>
			<div class="flex items-center gap-2 text-sm text-foreground-muted">
				<span>{movie?.release_date?.slice(0, 4)}</span>
				<span class="text-[#696D74]">|</span>
				<div class="flex items-center gap-1">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="#F59E0B">
						<path
							d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
						/>
					</svg>
					<span class="text-foreground-muted">{movie?.vote_average?.toFixed(1)}</span>
				</div>
			</div>
		</div>

		<div class="flex flex-wrap gap-2">
			{#each movie?.genres || [] as genre}
				<span class="rounded-lg bg-[#252932] px-4 py-2 text-sm text-foreground-muted"
					>{genre.name}</span
				>
			{/each}
			{#if movie?.runtime}
				<span class="rounded-lg bg-[#252932] px-4 py-2 text-sm text-foreground-muted"
					>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</span
				>
			{/if}
		</div>

		<div class="space-y-2">
			<h2 class="text-lg font-semibold text-foreground">Synopsis</h2>
			<p class="text-sm text-[#696D74]">
				{#if !isExpanded}
					{movie?.overview?.slice(0, 150)}...
				{:else}
					{movie?.overview}
				{/if}
			</p>
			<button type="button" onclick={() => (isExpanded = !isExpanded)} class="text-sm text-accent">
				{isExpanded ? 'Read Less' : 'Read More'}
			</button>
		</div>

		<a
			href="/movie/{params.slug}/select-seats"
			class="block w-full rounded-xl bg-accent py-4 text-center font-medium text-foreground"
		>
			Book Ticket
		</a>
	</section>
</main>
