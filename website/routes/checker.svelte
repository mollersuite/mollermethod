<script>
	import { page } from "$app/stores"
	import url from '$lib/checker.png'
</script>

<svelte:head>
	<title>Compat Checker</title>
	<meta name="description" content="Make sure your exploit works with mollermethod." />
</svelte:head>

<h1>Compat Checker</h1>
<p>Make sure your exploit works with mollermethod.</p>
<img src={url} alt="Screenshot of the compat checker" width="384" height="125"/>
<code>loadstring(game:HttpGetAsync "{$page.url
		.origin}/checker.client.lua", "Compat Checker")()</code>
