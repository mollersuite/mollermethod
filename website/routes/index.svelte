<script context="module">
	import { dev } from "$app/env"
	export const router = dev
</script>

<script>
	import { browser } from "$app/env"
	import { Button, TextBlock } from "fluent-svelte"

	if (browser) {
		const first_node = document.body.childNodes[0]
		if (first_node.TEXT_NODE) first_node.remove()
	}
</script>

<svelte:head>
	<title>mollermethod</title>
	<meta name="description" content="mollermethod: Scripting, unleashed." />
</svelte:head>
<article>
	<TextBlock variant="display">Scripting, unleashed.</TextBlock>
	<TextBlock variant="bodyLarge">The universal script hub.</TextBlock>
	<nav>
		<code>loadstring(game:HttpGet 'https://mthd.ml')()</code> <Button variant="hyperlink" href="/api">Read API docs</Button> <Button variant="hyperlink" href="/faq">FAQ</Button>
	</nav>
	<img src="/icon.png" alt="mollermethod" aria-hidden class="giant" width="500"/>
</article>

<style>
	code {
		width: max-content;
		padding: 1em;
		box-sizing: border-box;
	}
	.giant {
		position: absolute;
		right: 10%;
		top: 50%;
		transform: translateY(-50%);
		opacity: 50%;
		z-index: -1;
		max-width: 100vw;
		max-height: 100vh;
	}
	article {
		display: flex;
		justify-content: center;
		/* align-items: center; */
		gap: 1ch;
		height: 100%;
		flex-direction: column;
	}
	@media (max-width: 768px) {
		.giant {
			bottom: 0;
			top: initial;
			transform: none;
			width: 50%;
		}
	}
	@media (prefers-color-scheme: light) {
		.giant {
			filter: invert(100%);
		}
	}
</style>
