<script>
	import { Expander, InfoBar } from "fluent-svelte"
	import External from "@fluentui/svg-icons/icons/window_new_20_filled.svg?raw"
	import Why from "@fluentui/svg-icons/icons/document_question_mark_20_filled.svg?raw"
	import AppsList from "@fluentui/svg-icons/icons/apps_list_20_filled.svg?raw"
	import Store from "@fluentui/svg-icons/icons/arrow_download_20_filled.svg?raw"
</script>

<svelte:head>
	<title>mollermethod FAQ</title>
	<meta name="description" content="Common questions for mollermethod." />
</svelte:head>

<h1>FAQ</h1>
<p>nobody actually asked me these i'm just guessing lol</p>
<Expander>
	<svelte:fragment slot="icon">
	{@html Why}
	</svelte:fragment>
	What is mollermethod?
	<svelte:fragment slot="content">
		<p>We're not sure either. It's like if Infinite Yield and DomainX had a baby.</p>
	</svelte:fragment>
</Expander>
<Expander>
	<svelte:fragment slot="icon">
	{@html AppsList}
	</svelte:fragment>
	What exploits does mollermethod work with?
	<svelte:fragment slot="content">
		<ul>
			<li>Script-Ware (exploit mollermethod's maintainer uses)</li>
			<li>Synapse X (friends tested it)</li>
			<li>Krnl (I saw it working once on it)</li>
			<li>Fluxus (You might need to <a href="/mollermethod.rbxm" download rel="external">download the .rbxm and save it to your workspace</a>, then run mollermethod with debug on)</li>
		</ul>
	</svelte:fragment>
</Expander>
<Expander>
	<svelte:fragment slot="icon">{@html Store}</svelte:fragment>
	Where can I find plugins for mollermethod?
	<svelte:fragment slot="content">
		<p>
			mollermethod has a compatibility layer for <a href="https://github.com/EdgeIY/infiniteyield"
				>Infinite Yield</a>
			plugins, and will automatically read your Infinite Yield config to load them. You can find Infinite
			Yield plugins on
			<a href="https://github.com/Infinite-Store/Infinite-Store">Infinite Store.</a>
		</p>
		<p>
			mollermethod also has its <a href="/api" sveltekit:prefetch>own plugin API</a>, allowing you
			to make custom actions (shows in both Bracket & Mollybdos), commands (shows in Bracket), and
			tags (shows in Mollybdos).
		</p>
	</svelte:fragment>
</Expander>
<Expander>
		<svelte:fragment slot="icon"
		><svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
			><path
				d="M13 2a2.47 2.47 0 0 1 2.47 2.47l-.001.53H19a1 1 0 0 1 1 1l-.001 3.499-1.53.001a2.47 2.47 0 0 0-2.464 2.307L16 11.97v.06a2.47 2.47 0 0 0 2.307 2.465l.163.005 1.529-.001.001 3.504a1 1 0 0 1-1 1l-3.531-.001v.528a2.47 2.47 0 1 1-4.939 0v-.528H7a1 1 0 0 1-1-1l-.001-3.531h-.53a2.47 2.47 0 0 1 0-4.94H6L6 6a1 1 0 0 1 1-1h3.53v-.53A2.47 2.47 0 0 1 13 2Z" /></svg
		></svelte:fragment>
		How do I load in mollermethod plugins?
		<svelte:fragment slot="content">
			<p>Put it in the <code>plugins</code> array, like this:</p>
			<pre>{`loadstring(game:HttpGet 'https://mthd.ml') {
	-- \`plugins\` is an array of scripts as strings that will get loadstring'd by mollermethod.
	plugins = {
		-- These are examples.
		readfile 'path-to-file-in-workspace.lua',
		game:HttpGetAsync 'https://plugin.com/plugin.lua'
	}
}`}</pre>
		</svelte:fragment>
</Expander>
<Expander>
	<svelte:fragment slot="icon">{@html External}</svelte:fragment>
	How do I use Bracket in an external window?
	<svelte:fragment slot="content">
		<ol>
			<li>Go to <a href="/config">the config generator</a></li>
			<li>Enable "External Bracket"</li>
			<li>Use the outputted script in your exploit</li>
		</ol>
		<InfoBar
			title="Note"
			severity="caution"
			message="There is currently no autocomplete in Bracket's external mode. Also, you shouldn't use a prefix."
			closable={false} />
	</svelte:fragment>
</Expander>
