<script>
	import { page } from '$app/stores'
</script>

<svelte:head>
	<title>Exploit Health Checker</title>
	<meta name="description" content="Make sure your exploit works with mollermethod." />
</svelte:head>

<h1>Exploit Health Checker</h1>
<p>Make sure your exploit works with mollermethod. (check console for results)<p>
<pre>loadstring(game:HttpGet '{$page.url.origin}/checker.client.lua', "Exploit Health Checker")()</pre>

<style>
	h1,p,pre {
		text-align: center;
	}
</style>
