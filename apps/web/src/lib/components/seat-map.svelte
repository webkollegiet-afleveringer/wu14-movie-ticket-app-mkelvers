<script lang="ts">
	type SeatState = 'available' | 'reserved' | 'selected';
	type SeatInput = {
		id: string;
		status: SeatState;
	};
	type SeatCell =
		| {
				kind: 'aisle';
		  }
		| {
				kind: 'seat';
				id: string;
				state: SeatState;
		  };

	const seatClassByState: Record<SeatState, string> = {
		available: 'border border-[#5E6473] bg-transparent',
		reserved: 'border border-transparent bg-[#EB5757]',
		selected: 'border border-transparent bg-[#54A8E5]'
	};

	let {
		seats = [],
		onSelectionChange = (_seatIds: string[]): void => {}
	}: {
		seats?: SeatInput[];
		onSelectionChange?: (seatIds: string[]) => void;
	} = $props();
	let selectedSeatIds = $state<string[]>([]);

	$effect(() => {
		onSelectionChange(selectedSeatIds);
	});

	const seatOverrides = $derived(
		new Map(seats.map((seat: SeatInput): [string, SeatState] => [seat.id, seat.status]))
	);

	const handleSeatClick = (cell: Extract<SeatCell, { kind: 'seat' }>): void => {
		const serverState = seatOverrides.get(cell.id) ?? 'available';

		if (serverState === 'reserved') {
			return;
		}

		selectedSeatIds = selectedSeatIds.includes(cell.id)
			? selectedSeatIds.filter((seatId: string): boolean => seatId !== cell.id)
			: [...selectedSeatIds, cell.id];
	};

	const seatRows = $derived(
		['xaaaxaaax', 'aaaaxaaaa', 'aaaaxaaaa', 'aaaaxaaaa', 'aaaaxaaaa', 'xaaaxaaax'].map(
			(pattern: string, rowIndex: number) => {
				let seatNumber = 0;
				const rowLabel = String.fromCharCode(65 + rowIndex);

				return [...pattern].map((token: string): SeatCell => {
					if (token === 'x') {
						return { kind: 'aisle' };
					}

					seatNumber += 1;
					const seatId = `${rowLabel}${seatNumber}`;
					const serverState = seatOverrides.get(seatId) ?? 'available';
					const isLocallySelected = selectedSeatIds.includes(seatId);

					return {
						kind: 'seat',
						id: seatId,
						state:
							serverState === 'reserved'
								? 'reserved'
								: isLocallySelected || serverState === 'selected'
									? 'selected'
									: 'available'
					};
				});
			}
		)
	);
</script>

<section class="w-full space-y-7 overflow-hidden pt-1">
	<div class="m-0 w-full">
		<svg
			viewBox="0 0 315 90"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
			class="block h-auto w-full"
		>
			<path
				d="M34 16.5C53.5707 11.1667 106.217 1.5 158.237 1.5C210.258 1.5 260.588 11.1667 281 16.5"
				stroke="#54A8E5"
				stroke-width="3"
				stroke-linecap="round"
			/>
			<path
				d="M0 89.5L32.1944 17.8429C51.3427 12.3952 102.643 1.5 154.659 1.5C206.675 1.5 261.51 12.5524 281.5 18L315 89.5C315 89.5 217.786 64.9857 157.5 64.9857C97.2144 64.9857 0 89.5 0 89.5Z"
				fill="url(#paint0_linear_2_434)"
			/>
			<defs>
				<linearGradient
					id="paint0_linear_2_434"
					x1="157.5"
					y1="1.5"
					x2="157.5"
					y2="45.5"
					gradientUnits="userSpaceOnUse"
				>
					<stop stop-color="#54A8E5" stop-opacity="0.5" />
					<stop offset="1" stop-color="white" stop-opacity="0" />
				</linearGradient>
			</defs>
		</svg>
	</div>

	<div class="space-y-1.5">
		{#each seatRows as row}
			<div class="mx-auto grid w-fit grid-cols-9 gap-1.5">
				{#each row as cell}
					{#if cell.kind === 'aisle'}
						<div class="size-7" aria-hidden="true"></div>
					{:else}
						<button
							type="button"
							class={`size-7 rounded-[10px] ${seatClassByState[cell.state]} disabled:bg-reserved`}
							aria-label={`${cell.id} ${cell.state} seat`}
							aria-pressed={cell.state === 'selected'}
							onclick={() => handleSeatClick(cell)}
							disabled={cell.state === 'reserved'}
						></button>
					{/if}
				{/each}
			</div>
		{/each}
	</div>

	<div class="flex items-center justify-center gap-5 text-xs text-[#B2B5BB]">
		<div class="flex items-center gap-1.5">
			<span class="size-3.5 rounded-full bg-accent"></span>
			<span>Selected</span>
		</div>
		<div class="flex items-center gap-1.5">
			<span class="size-3.5 rounded-full bg-reserved"></span>
			<span>Reserved</span>
		</div>
		<div class="flex items-center gap-1.5">
			<span class="size-3.5 rounded-full border border-[#5E6473] bg-transparent"></span>
			<span>Available</span>
		</div>
	</div>
</section>
