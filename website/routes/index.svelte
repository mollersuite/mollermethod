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
	<img src="/icon.png" alt="mollermethod" aria-hidden class="giant"/>
</article>

<style>
	code {
		width: max-content;
		padding: 1em;
		box-sizing: border-box;
	}
	.giant {
		position: absolute;
		transform: translateX(50%);
		right: 0;
		top: 15%;
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
</style>
