<!-- 
  @component
  
  moller button

  The signature Etcetera header button.
  
 -->
<script>
	/**
	 * @type {string | (() => {})}
	 */
	export let href = "#"
	/**
	 * @type {string}
	 */
	export let label
	/**
	 * @type {boolean}
	 */
	export let selected = false
</script>
<div>
	{#if typeof href === "string"}
		<a sveltekit:prefetch class:selected {href} title={label}>
			<slot />
			<b>{label}</b>
		</a>
	{:else}
		<button on:click={href} title={label}>
			<slot />
			<b>{label}</b>
		</button>
	{/if}
</div>
<style>
	div {
		height: 30px;
		width: 30px;
		overflow: visible;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1ch;
		flex-direction: row;
	}
	
	a,
	button {
		/* padding: 16px; */
		padding-left: 10px;
		padding-right: 10px;
		padding-top: 0;
		padding-bottom: 0;
		font-family: "moller", "Segoe UI", sans-serif;
		margin: 0;
		cursor: default;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: row;
		position: relative;
		height: 30px;
		box-sizing: border-box;
		background: none;
		border: none;
		color: var(--fds-text-primary);
		border-radius: 10px;
		gap: 0;
		fill: currentColor;
		/* border-bottom-right-radius: 16px; */
		/* border-top-left-radius: 16px; */
		transition: background 0.3s, gap 0.3s, font-size 0.3s;
	}
	
	a:not(:last-of-type), button:not(:last-of-type) {
		margin-bottom: 10px;
	}
	a b,
	header button b {
		transition: font-size 0.3s;
		font-size: 0;
	}
	a:hover b,
	button:hover b,
	a:focus-visible b,
	button:focus-visible b {
		font-size: small;
	}

	a:hover,
	button:hover,
	a:focus-visible,
	button:focus-visible {
		outline: 0;
		gap: 1ch;
		text-decoration: none;
		background: rgba(255, 255, 255, 0.3);
	}

	a:focus,
	button:focus {
		border: solid 1px var(--fds-text-primary);
	}
	a.selected {
		border: solid 1px gray;
	}
	a:active,
	button:active {
		background: rgba(255, 255, 255, 0.7);
	}

	@media (prefers-color-scheme: light) {
		a:hover,
		button:hover,
		a:focus-visible,
		button:focus-visible {
			background: rgba(0, 0, 0, 0.1);
		}
		a:active,
		button:active {
			background: rgba(0, 0, 0, 0.3);
		}
	}
	@media (max-width: 659px) {
		a,
		button {
			flex-grow: 1;
			padding: 5px;
		}
	}
</style>
