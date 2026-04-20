<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';

	let { children } = $props();

	const navItems = [
		{ href: '/', label: 'home' },
		{ href: '/explore', label: 'explore' },
		{ href: '/saved', label: 'saved' },
		{ href: '/profile', label: 'profile' }
	];
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="flex min-h-screen flex-col bg-background">
	{@render children()}

	<nav class="fixed right-0 bottom-0 left-0">
		<div class="flex h-16 items-center justify-around px-4">
			{#each navItems as { href, label }}
				{@const isActive = page.url.pathname === href}
				<a
					{href}
					aria-current={isActive ? 'page' : undefined}
					class="flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-200 {isActive
						? 'text-accent'
						: 'text-[#636882]'}"
				>
					{#if label === 'home'}
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M9.13478 20.7733V17.7156C9.13478 16.9351 9.77217 16.3023 10.5584 16.3023H13.4326C13.8102 16.3023 14.1723 16.4512 14.4393 16.7163C14.7063 16.9813 14.8563 17.3408 14.8563 17.7156V20.7733C14.8539 21.0978 14.9821 21.4099 15.2124 21.6402C15.4427 21.8705 15.7561 22 16.0829 22H18.0438C18.9596 22.0023 19.8388 21.6428 20.4872 21.0008C21.1356 20.3588 21.5 19.487 21.5 18.5778V9.86686C21.5 9.13246 21.1721 8.43584 20.6046 7.96467L13.934 2.67587C12.7737 1.74856 11.1111 1.7785 9.98539 2.74698L3.46701 7.96467C2.87274 8.42195 2.51755 9.12064 2.5 9.86686V18.5689C2.5 20.4639 4.04738 22 5.95617 22H7.87229C8.55123 22 9.103 21.4562 9.10792 20.7822L9.13478 20.7733Z"
								fill="currentColor"
							/>
						</svg>
					{:else if label === 'explore'}
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M11.9999 2.00008C17.5199 2.00008 21.9999 6.48008 21.9999 12.0001C21.9999 17.5301 17.5199 22.0001 11.9999 22.0001C6.46988 22.0001 1.99988 17.5301 1.99988 12.0001C1.99988 6.48008 6.46988 2.00008 11.9999 2.00008ZM15.8499 8.71008C15.9599 8.36008 15.6399 8.03008 15.2899 8.14008L10.1699 9.74008C9.95988 9.81008 9.78988 9.97008 9.72988 10.1801L8.12988 15.3101C8.01988 15.6501 8.34988 15.9801 8.68988 15.8701L13.7899 14.2701C13.9999 14.2101 14.1699 14.0401 14.2299 13.8301L15.8499 8.71008Z"
								fill="currentColor"
							/>
						</svg>
					{:else if label === 'saved'}
						<svg
							width="16"
							height="20"
							viewBox="0 0 16 20"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M11.07 0C13.78 0 15.97 1.07 16 3.79V18.97C16 19.14 15.96 19.31 15.88 19.46C15.75 19.7 15.53 19.88 15.26 19.96C15 20.04 14.71 20 14.47 19.86L7.99 16.62L1.5 19.86C1.351 19.939 1.18 19.99 1.01 19.99C0.45 19.99 0 19.53 0 18.97V3.79C0 1.07 2.2 0 4.9 0H11.07ZM11.75 6.04H4.22C3.79 6.04 3.44 6.39 3.44 6.83C3.44 7.269 3.79 7.62 4.22 7.62H11.75C12.18 7.62 12.53 7.269 12.53 6.83C12.53 6.39 12.18 6.04 11.75 6.04Z"
								fill="currentColor"
							/>
						</svg>
					{:else if label === 'profile'}
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M12 15.1739C16.3386 15.1739 20 15.8789 20 18.599C20 21.32 16.3146 22 12 22C7.66237 22 4 21.295 4 18.575C4 15.8539 7.68538 15.1739 12 15.1739ZM12 2C14.9391 2 17.294 4.35402 17.294 7.29105C17.294 10.2281 14.9391 12.5831 12 12.5831C9.0619 12.5831 6.70601 10.2281 6.70601 7.29105C6.70601 4.35402 9.0619 2 12 2Z"
								fill="currentColor"
							/>
						</svg>
					{/if}
				</a>
			{/each}
		</div>
	</nav>
</div>
