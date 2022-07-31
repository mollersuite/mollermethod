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
	import { browser } from "$app/env"
	import { Button, TextBlock } from "fluent-svelte"
	import { page } from "$app/stores"
	import hero from '$lib/hero.png'
	
	if (browser) {
		const first_node = document.body.childNodes[0]
		if (first_node.TEXT_NODE) first_node.remove()
	}
</script>

<svelte:head>
	<title>mollermethod</title>
	<meta name="description" content="Scripting, unleashed." />
</svelte:head>

<h4>
	<img src="/icon.png" alt="mollermethod" aria-hidden width="20"/>
	mollermethod
</h4>
<h1>Truly unleashed.</h1>
<nav>
	<code>{`loadstring(game:HttpGetAsync '${$page.url.origin}') {}`}</code> <Button variant="hyperlink" href="/api">Read API docs</Button> <Button variant="hyperlink" href="/faq">FAQ</Button>
</nav>
	
<img src={hero} alt="mollermethod" aria-hidden class="giant" width="700"/>
<img src="/icon.png" alt="mollermethod" aria-hidden class="giant2" width="1000"/>

<style>
	code {
		max-width: max-content;
		padding: 1em;
		box-sizing: border-box;
	}
	article {
		display: flex;
		justify-content: center;
		gap: 1ch;
		flex-direction: column;
		min-height: 100%;
	}
	.giant {
		position: absolute;
		right: 32px;
		max-width: 700px;
		width: 100%;
		border-radius: var(--fds-control-corner-radius);
		box-shadow: 0 0 1em rgba(0,0,0,0.5);
	}
	.giant2 {
		position: fixed;
		left: 0;
		bottom: -20%;
		left: -10%;
		opacity: 1%;
		z-index: -1;
		max-width: 100vw;
		aspect-ratio: 1 / 1;
	}
	@media (max-width: 1700px) {
		.giant {
			position: static;
		}
	}
	@media (prefers-color-scheme: light) {
		.giant2 {
			filter: invert(100%);
		}
	}
	h4 {
		margin: 0;
		display: flex;
		align-items: center;
		gap: 1ch;
		flex-direction: row;
	}
	nav {
		display: flex;
		align-items: center;
		gap: 0;
		flex-direction: row;
		flex-wrap: wrap;
	}
</style>
