<script context="module">
	export const hydrate = false
	export const router = false
	/** @type {import('@sveltejs/kit').Load} */
	export const load =  () => ({
		stuff: {
			center: true
		}
	})
</script>

<script>
	import { InfoBar } from 'fluent-svelte'
</script>

<svelte:head>
	<title>Deprecated!</title>
	<meta name="description" content="mollermethod now has a built-in settings UI" />
	<meta name="robots" content="noindex" />
</svelte:head>

<InfoBar title="Deprecated!" message="mollermethod now has a built-in settings UI. Use that instead." closable={false} severity="critical"/>
