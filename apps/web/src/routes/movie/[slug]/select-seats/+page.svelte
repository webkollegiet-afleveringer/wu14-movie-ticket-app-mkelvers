<script lang="ts">
	import SeatMap from '$lib/components/seat-map.svelte';
	import type { PageProps } from './$types';

	let { params }: PageProps = $props();
	let selectedSeatIds = $state<string[]>([]);

	const handleCheckout = (): void => {
		console.log('selected seats', selectedSeatIds);
	};
</script>

<main class="space-y-8 overflow-x-hidden p-6">
	<header class="grid grid-cols-[26px_1fr_26px] items-center">
		<a href="/movie/{params.slug}" title="go back to movie details" class="col-start-1">
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

		<h1 class="col-start-2 text-center text-xl font-medium text-foreground">Select Seats</h1>
	</header>

	<section class="space-y-6">
		<div class="space-y-3">
			<p class="text-sm text-foreground">Cinema</p>
			<div class="relative">
				<div
					class="w-full rounded-xl border border-[#696D74] bg-transparent px-4 py-4 pr-10 text-sm text-[#B2B5BB]"
				>
					Empire XXI Yogyakarta
				</div>
				<svg
					class="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2"
					viewBox="0 0 16 16"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M3.5275 4L8.5 9.56275L13.4725 4L15 5.71255L8.5 13L2 5.71255L3.5275 4Z"
						fill="#B2B5BB"
					/>
				</svg>
			</div>
		</div>

		<div class="grid grid-cols-2 gap-4">
			<div class="space-y-3">
				<p class="text-sm text-foreground">Date</p>
				<div class="relative">
					<div
						class="w-full rounded-xl border border-[#696D74] bg-transparent px-4 py-4 pr-10 text-sm text-[#B2B5BB]"
					>
						02 Nov 2021
					</div>
					<svg
						class="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2"
						viewBox="0 0 16 16"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M3.5275 4L8.5 9.56275L13.4725 4L15 5.71255L8.5 13L2 5.71255L3.5275 4Z"
							fill="#B2B5BB"
						/>
					</svg>
				</div>
			</div>

			<div class="space-y-3">
				<p class="text-sm text-foreground">Time</p>
				<div class="relative">
					<div
						class="w-full rounded-xl border border-[#696D74] bg-transparent px-4 py-4 pr-10 text-sm text-[#B2B5BB]"
					>
						01.00 PM
					</div>
					<svg
						class="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2"
						viewBox="0 0 16 16"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M3.5275 4L8.5 9.56275L13.4725 4L15 5.71255L8.5 13L2 5.71255L3.5275 4Z"
							fill="#B2B5BB"
						/>
					</svg>
				</div>
			</div>
		</div>
	</section>

	<SeatMap
		onSelectionChange={(seatIds: string[]): void => {
			selectedSeatIds = seatIds;
		}}
	/>

	<button
		type="button"
		onclick={handleCheckout}
		class="block w-full rounded-xl bg-accent py-4 text-center font-medium text-foreground"
	>
		Checkout
	</button>
</main>
