<svelte:head>
	<title>mollermethod API docs</title>
	<meta name="description" content="Make mollermethod plugins." />
</svelte:head>
<script>
	import image from '$lib/notif.png'
	import example from '$lib/example.lua?raw'
</script>
<h1>mollermethod API docs</h1>
<h2><code>util</code> table</h2>
<p>The <code>util</code> table is passed to your plugin with varargs.</p>
<pre>local util = ...</pre>
<p>The <code>util</code> table has the following functions:</p>
<dl>
	<dt><pre>util.notify(options: {`{
	Text: string // RichText is on btw
	Icon?: string // Defaults to "rbxassetid://7554747376"
	Duration?: number // In seconds, defaults to 5
	App?: string // Defaults to "mollermethod"
}`}) -> void</pre></dt>
	<dd>
		Display a notification with the given text.
		<br>
		<img src={image} alt="a mollermethod notif"/>
	</dd>
	<dt><pre>util.GUI: LayerCollector</pre></dt>
	<dd>A container to put your GUIs in</dd>
	<dt><pre>util.colors: {`{
		ACCENT: Color3,
		BLACK: Color3,
		WHITE: Color3,
		GRAY: Color3[],
		RED: Color3[],
		GREEN: Color3[],
		BLUE: Color3[],
		YELLOW: Color3[],
		ORANGE: Color3[],
		PURPLE: Color3[],
	}`}</pre></dt>
	<dd>A table of colors</dd>
	<dt><pre>util.Snapdragon: import('@rbxts/snapdragon')</pre></dt>
	<dd>The <a href="https://docs.vorlias.com/rbx-snapdragon/">Snapdragon</a> dragging module</dd>
</dl>
<h2>Plugin interface</h2>
<p>You return a plugin interface. Here's the TypeScript type since I'm lazy</p>
<pre>{`// Actions display in both Mollybdos and Bracket.
interface Action {
	display?: string // Displayed in Mollybdos. Defaults to the key, with the first letter uppercase.
	enabled?: () => boolean // Defaults to () => true
	description: string //  Displayed in Bracket autocomplete
	execute(this: void, player: Player): Promise<unknown> | unknown
}

// Commands display only in Bracket.
interface Command {
	description: string // Displayed in Bracket autocomplete
	execute(this: void, args: string[]): void | Promise<unknown>
}

interface Plugin {
	// (will be) displayed in mollermethod settings
	readonly Name: string
	readonly Author: string
	// Runs when the user selects a player in Mollybdos. Call \`tag\` to add a tag to the player. You can call this multiple times to give the tag a "score."
	readonly Tags?: (player: Player, add: (tag: string) => unknown) => unknown
	readonly Actions?: {
		[key: string]: Action // The key will be used as the Bracket command name
	}
	readonly Commands?: {
		[key: string]: Command
	}
}`}</pre>
<h2>Plugin example</h2>
<p>Here's an example plugin. It's a simple example, but it's a good starting point.</p>
<pre>{example}</pre>