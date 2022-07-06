<script>
	import { InfoBadge, Button, ToggleSwitch } from 'fluent-svelte'
</script>
<svelte:head>
	<meta name="robots" content="noindex, nofollow">
</svelte:head>
<main>
	<em>&copy; Etcetera Development. Do not leak. Also, do not leak trendsetter 2, to Shlex. By the way, do not leak this, to Shlex, along with source code. Reminder that DMing Shlex "here it [sic] the new mollermethod please implement" is not a "suggestion", it is "copyright infrigment" or even "industrial espionage"</em>
	<h1>&OpenCurlyDoubleQuote;You bet I'm a trendsetter<del>, too</del> <ins>2</ins>&CloseCurlyDoubleQuote;</h1>
	<nav>
		<article class="player">
			<select size="10">
				<option selected>
					shlexius
				</option>
				<option>
					builderman
				</option>
				<option>
					maumaumaumaumaumau
				</option>
			</select>
			<div>
				<h1>shlexius</h1>
			</div>
		</article>
		<article class="changelog">
			<h1>Truly next gen.</h1>
			<p>See what's new in trendsetter 2.</p>
			<Button variant="accent">Changelog</Button>
		</article>
		<article style:grid-area="script1">
			<h1>tux autofarm <InfoBadge severity="success" /></h1>
			<p>Automatically farm your tux's.</p>
			<Button disabled>Built-in</Button>
		</article>
		<article style:grid-area="script2">
			<h1>Autofarm gold</h1>
			<p>Autofarm Gold<br/>Script Credits: Me<br/>UI Library: Kavo ui library</p>
			<Button>Run</Button>
		</article>
		<article style:grid-area="script3">
			<h1>mollerspy <InfoBadge severity="success" /></h1>
			<p>Prints HTTP requests to console.</p>
			<Button>Run</Button>
		</article>
		<article class="ui">
			<h1>tux autofarm</h1>
			<ToggleSwitch>Autofarm</ToggleSwitch>
			<ToggleSwitch disabled>Fast (Less reliable)</ToggleSwitch>
		</article>
		<article style:grid-area="script6">
			<h1>Sirius <InfoBadge severity="success" /></h1>
			<p>Next-generation script hub</p>
			<Button>Run</Button>
		</article>
		<article style:grid-area="script7">
			<h1>Vision <InfoBadge severity="success" /></h1>
			<p>Aimbot, ESP, and more</p>
			<Button>Run</Button>
		</article>
		<article style:grid-area="script8">
			<h1>moller hub <InfoBadge severity="success" /></h1>
			<p>mollermethod's predecessor</p>
			<Button>Run</Button>
		</article>
		<article style:grid-area="script9">
			<h1>backrooms</h1>
			<p>attempt 2<br/>how'd i get cotc things in here<br />ah well here we go again</p>
			<Button>Run</Button>
			</article>
		<article style:grid-area="script10">
			<h1>Record <InfoBadge severity="success" /></h1>
			<p>An instance hierarchy view for Roblox, by richie0866.</p>
			<Button>Run</Button>
		</article>
		<article style:grid-area="script11">
			<h1>DomainX <InfoBadge severity="caution" /></h1>
			<p>the WORST script hub!!! fuck yoy shlex!</p>
			<Button>Run</Button>
		</article>
		<article style:grid-area="script12">
			<h1>Infinite Yield <InfoBadge severity="success" /></h1>
			<p>The most popular admin script.</p>
			<Button>Run</Button>
		</article>
		<article style:grid-area="script13">
			<h1>Infinite Store <InfoBadge severity="success" /></h1>
			<p>Get plugins for Infinite Yield and mollermethod.</p>
			<Button>Run</Button>
		</article>
	</nav>
</main>

<style>
	main > h1 {
		color: gray;
		text-align: center;
	}
	em {
		margin-top: 35px;
	}
	nav {
		height: 100%;
		display: grid;
		grid-template-areas: 
			"changelog player player player"
			"script1 player player player"
			"gui gui script2 script3"
			"gui gui script6 script7"
			"script8 script9 script10 script11"
			"script12 script13 script14 script15"
			"script16 script17 script18 script19"
			"script20 script21 script22 script23";
		grid-template-columns: 1fr 1fr 1fr 1fr;
		gap: 10px;
		margin-right: 10px;
	}
	.player {
		display: grid;
		grid-template-columns: 1fr 2fr;
		grid-area: player;
		background: #111;
		border-radius: 1em;
		overflow: hidden;
	}
	select {
		background: none;
		border: none;
	}
	option:first-child {
		padding-top: 5px;
		padding-left: 5px;
		box-sizing: border-box;
	}
	option {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	article:not(.player) {
		text-align: center;
		background: rgba(0, 0, 0, 0.5);
		font-size: 70%;
		padding: 5px;
		border-radius: 1em;
	}
	article.ui {
		grid-area: gui;
		text-align: left;
		padding: 6px;
	}
	article.changelog {
		grid-area: 'changelog';
		background-color: rgb(0, 150, 255);
		color: var(--fds-text-on-accent-primary);
	}
	main {
		background: url("$lib/bg.png");
		width: 1920px;
		height: 1009px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border-radius: 5px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
		display: grid;
		grid-template-columns: 500px 1fr 550px;
	}

</style>
