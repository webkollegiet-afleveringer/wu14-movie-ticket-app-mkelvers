<script lang="ts">
	import { page } from '$app/state';

	const user = $derived(page.data.user);
</script>

<main class="space-y-8 p-6">
	<article class="[&>*:nth-child(3)]:mt-4">
		{#if user}
			<p class="text-sm text-foreground-muted">Welcome Back,</p>
			<h2 class="text-xl text-foreground">
				{user.name}
			</h2>
		{:else}
			<p class="text-sm text-foreground-muted">You're not logged in</p>
			<a href="/login" class="text-xl text-foreground">Click here to login</a>
		{/if}

		<div class="flex items-center gap-3 rounded-xl bg-background-muted px-4">
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<circle cx="10" cy="10" r="7" stroke="#6F7277" stroke-width="2" />
				<path
					d="M21 21L15 15"
					stroke="#6F7277"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
			<input
				type="text"
				placeholder="Search your favorite movie"
				class="flex-1 bg-transparent py-4 text-foreground outline-none placeholder:text-foreground-muted"
			/>
		</div>
	</article>

	<article class="space-y-4">
		<h2 class="text-xl font-medium text-foreground">Coming Soon</h2>

		<div
			class="flex snap-x snap-mandatory overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
		>
			{#each Array(3) as _, i}
				<div class="min-w-[95%] snap-start snap-always space-y-2 pr-4">
					<img
						src={`https://placehold.co/400x400`}
						alt="movie poster"
						class="aspect-video w-full rounded-xl object-cover"
					/>
					<p class="text-xl font-medium text-foreground">Example</p>
					<p class="text-sm text-foreground-muted">January 2025</p>
				</div>
			{/each}
		</div>
	</article>

	<article class="space-y-4">
		<header class="flex items-center justify-between">
			<h2 class="text-xl font-medium text-foreground">Cinema Near You</h2>
			<button type="button" class="text-sm text-[#696D74]"> See all </button>
		</header>

		<div class="flex flex-col gap-4">
			{#each Array(2) as _, i}
				<div class="flex items-center gap-4">
					<img
						src={'https://placehold.co/100x100'}
						alt="cinema logo"
						class="size-20 rounded-xl object-cover"
					/>
					<div class="flex-1 space-y-1">
						<div class="flex items-center gap-2 text-sm text-accent">
							<svg
								width="18"
								height="18"
								viewBox="0 0 18 18"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<g clip-path="url(#clip0_2_891)">
									<path
										d="M9 1.5C5.85 1.5 3 3.915 3 7.65C3 10.035 4.8375 12.84 8.505 16.0725C8.79 16.32 9.2175 16.32 9.5025 16.0725C13.1625 12.84 15 10.035 15 7.65C15 3.915 12.15 1.5 9 1.5ZM9 9C8.175 9 7.5 8.325 7.5 7.5C7.5 6.675 8.175 6 9 6C9.825 6 10.5 6.675 10.5 7.5C10.5 8.325 9.825 9 9 9Z"
										fill="#636882"
									/>
								</g>
								<defs>
									<clipPath id="clip0_2_891">
										<rect width="18" height="18" fill="white" />
									</clipPath>
								</defs>
							</svg>

							<span>10 Kilometers</span>
						</div>
						<p class="font-medium text-foreground">Cinema 1</p>
						<p class="text-sm text-foreground-muted">Closed 10.00 PM</p>
					</div>
					<div class="flex items-center gap-1">
						<svg width="16" height="16" viewBox="0 0 24 24" fill="#F59E0B">
							<path
								d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
							/>
						</svg>
						<span class="text-sm text-foreground-muted">5,0</span>
					</div>
				</div>
			{/each}
		</div>
	</article>
</main>
