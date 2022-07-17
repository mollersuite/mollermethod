<script context="module">
	import { dev } from "$app/env"
	export const router = dev
	/** @type {import('@sveltejs/kit').Load} */
	export const load =  () => ({
		stuff: {
			center: true
		}
	})
</script>

<script>
	import { page } from "$app/stores"
	import url from '$lib/checker.png'
	import Check from "@fluentui/svg-icons/icons/heart_pulse_20_filled.svg?raw"
</script>

<svelte:head>
	<title>Compat Checker</title>
	<meta name="description" content="Make sure your exploit works with mollermethod." />
</svelte:head>

<h4>{@html Check} Compat Checker</h4>
<p>Make sure your exploit works with mollermethod.</p>
<code>loadstring(game:HttpGetAsync "{$page.url
		.origin}/checker.client.lua", "Compat Checker")()</code>
<img src={url} alt="Screenshot of the compat checker" width="500px"/>
<style>
	h4 {
		fill: currentColor;
		margin: 0;
		display: flex;
		align-items: center;
		gap: 1ch;
		flex-direction: row;
	}
	code {
		padding: 1em;
		box-sizing: border-box;
		max-width: max-content;
	}
	img {
		position: absolute;
		right: 32px;
		max-width: 500px;
		width: 100%;
		border-radius: var(--fds-control-corner-radius);
		box-shadow: 0 0 1em rgba(0,0,0,0.5);
	}
	@media (max-width: 1400px) {
		img {
			position: static;
			margin-top: 32px;
		}
	}
</style>
