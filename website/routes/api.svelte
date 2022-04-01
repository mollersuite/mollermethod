<svelte:head>
	<title>mollermethod API docs</title>
	<meta name="description" content="Make mollermethod plugins." />
</svelte:head>

<h1>mollermethod API docs</h1>
<h2><code>util</code> table</h2>
<p>The <code>util</code> table is passed to your plugin with varargs.</p>
<pre>local util = ...</pre>
<p>The <code>util</code> table has the following functions:</p>
<dl>
<dt><code>util.notify(text: string) -> void</code></dt>
<dd>Display a notification with the given text.</dd>
</dl>
<h2>Plugin interface</h2>
<p>You return a plugin interface. Here's the TypeScript type since I'm lazy</p>
<pre>{`interface Action {
	display?: string // Displayed in Mollybdos. Defaults to the key, with the first letter uppercase.
	enabled?: () => boolean // Defaults to () => true
	description: string //  Displayed in Bracket autocomplete
	execute(this: void, player: Player): Promise<unknown> | unknown
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
}`}</pre>
