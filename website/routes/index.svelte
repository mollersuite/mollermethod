<script>
	import { browser } from "$app/env"

	if (browser) {
		const first_node = document.body.childNodes[0]
		if (first_node.TEXT_NODE) first_node.remove()
	}
</script>

<svelte:head>
	<title>mollermethod</title>
	<meta name="description" content="mollermethod: Scripting, unleashed." />
</svelte:head>
<h1>mollermethod</h1>
<em>Scripting, unleashed.</em>
<p>an upcoming script hub</p>
