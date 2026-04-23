<script lang="ts">
	import { goto } from '$app/navigation';
	import cardImg from '$lib/assets/card.png';

	// we need to get the seats based off the query string

	let showSuccessDialog = $state(false);

	function handlePayNow() {
		showSuccessDialog = true;
	}
</script>

<main class="space-y-8 overflow-x-hidden p-6">
	<header class="grid grid-cols-[26px_1fr_26px] items-end">
		<button onclick={() => history.back()} title="go back" class="col-start-1">
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
		</button>

		<h1 class="col-start-2 text-center text-xl font-medium text-foreground">Checkout</h1>
	</header>

	<section class="space-y-6">
		<div class="flex items-center justify-between">
			<p class="text-lg font-semibold text-foreground">Payment Method</p>
			<button type="button" class="text-sm text-[#B2B5BB]">Change</button>
		</div>

		<img src={cardImg} alt="Card" class="w-full rounded-xl" />

		<div class="space-y-5">
			<p class="text-lg font-semibold text-foreground">Payment Details</p>

			<div class="space-y-4">
				<div class="space-y-2">
					<label class="text-xs text-foreground">Your Email</label>
					<input
						type="email"
						placeholder="Milesmorales@gmail.com"
						class="w-full rounded-xl border border-[#696D74] bg-transparent px-4 py-4 pr-10 text-sm text-foreground placeholder:text-[#B2B5BB] focus:outline-none"
					/>
				</div>
				<div class="space-y-2">
					<label class="text-xs text-foreground">Cardholder Name</label>
					<input
						type="text"
						placeholder="Miles Morales"
						class="w-full rounded-xl border border-[#696D74] bg-transparent px-4 py-4 text-sm text-foreground placeholder:text-[#B2B5BB] focus:outline-none"
					/>
				</div>
				<div class="space-y-2">
					<label class="text-xs text-foreground">Card Number</label>
					<input
						type="text"
						placeholder="**** **** **** 51446"
						class="w-full rounded-xl border border-[#696D74] bg-transparent px-4 py-4 text-sm text-foreground placeholder:text-[#B2B5BB] focus:outline-none"
					/>
				</div>
				<div class="grid grid-cols-2 gap-4">
					<div class="space-y-2">
						<label class="text-xs text-foreground">Date</label>
						<div class="relative">
							<select
								class="w-full appearance-none rounded-xl border border-[#696D74] bg-transparent px-4 py-4 text-sm text-[#B2B5BB] focus:outline-none"
							>
								<option>02 Nov 2021</option>
							</select>
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
					<div class="space-y-2">
						<label class="text-xs text-foreground">CVV</label>
						<input
							type="text"
							placeholder="123"
							class="w-full rounded-xl border border-[#696D74] bg-transparent px-4 py-4 text-sm text-foreground placeholder:text-[#B2B5BB] focus:outline-none"
						/>
					</div>
				</div>
			</div>
		</div>

		<button
			type="button"
			onclick={handlePayNow}
			class="flex w-full items-center justify-center rounded-xl bg-accent py-4 font-medium text-foreground"
		>
			<span class="w-20 text-right">Pay Now</span>
			<span class="mx-8">|</span>
			<span class="w-20 text-left">$99.8</span>
		</button>
	</section>
</main>

{#if showSuccessDialog}
	<div class="fixed inset-0 z-50 flex items-end justify-center bg-black/60">
		<div class="relative w-full max-w-sm rounded-4xl bg-accent p-8 pt-12 text-center">
			<div
				class="absolute -top-10 left-1/2 flex size-20 -translate-x-1/2 items-center justify-center rounded-full border-4 border-accent bg-white"
			>
				<svg
					width="36"
					height="36"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z"
						fill="#6CA9E8"
						stroke="#6CA9E8"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M9 12L11 14L15 10"
						stroke="white"
						stroke-width="2.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</div>

			<h2 class="mb-4 text-2xl font-bold text-white">Your payment was successful</h2>

			<p class="mb-8 text-sm leading-relaxed text-white/90">
				Adele is a Scottish heiress whose extremely wealthy family owns estates and grounds. When
				she was a teenager. Read More
			</p>

			<button
				type="button"
				onclick={() => goto('/')}
				class="w-full rounded-xl bg-background py-4 text-base font-medium text-white"
			>
				See E-Ticket
			</button>
		</div>
	</div>
{/if}
