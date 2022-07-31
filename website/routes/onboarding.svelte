<script>
	import { ToggleSwitch, Button, Slider } from 'fluent-svelte';
	import {fly, blur} from 'svelte/transition'
	import {expoInOut} from 'svelte/easing'
	import Speaker0 from "@fluentui/svg-icons/icons/speaker_0_20_filled.svg?raw"
	import Speaker1 from "@fluentui/svg-icons/icons/speaker_1_20_filled.svg?raw"
	import Speaker2 from "@fluentui/svg-icons/icons/speaker_2_20_filled.svg?raw"
	import Mute from "@fluentui/svg-icons/icons/speaker_mute_20_filled.svg?raw"
	let activated = false
	let stage = 0
	let volume = 5
	let bg = 'black'
	let fg = 'white'
</script>
{#if !activated}
	<div out:blur>
		<ToggleSwitch bind:checked={activated}>Onboarding mockup</ToggleSwitch>
	</div>
{/if}
{#if activated}
<main in:fly={{duration: 5000,y: 50, easing: expoInOut}} style:--bg={bg} style:--fg={fg}>
	{#if stage === 0}
		<img src="/icon.png" height={50} />
		<h1>Truly next gen.</h1>
		<Button variant="accent" on:click={()=>stage++}>Start</Button>
	{:else if stage === 1}
		<h1>Choose your colours.</h1>
		<label><input type="color" bind:value={bg} /> Background</label>
		<label><input type="color" bind:value={fg} /> Foreground</label>
		<Button variant="accent" on:click={()=>stage++}>Next</Button>
	{:else if stage === 2}
		<h1>A couple options.</h1>
		<ToggleSwitch>External? <small>Bracket will launch in a rconsole window.</small></ToggleSwitch>
		<nav>{@html volume === 0 ? Mute : volume < 5 ? Speaker0 : volume === 10 ? Speaker2 : Speaker1}<Slider bind:value={volume} min={0} max={10}/></nav>
		<Button variant="accent" on:click={()=>stage++}>Next</Button>
	{/if}
	<div class="circles" aria-hidden>
		<div class="circle1" />
		<div class="circle2" />
		<div class="circle3" />
	</div>
</main>
{/if}

<style type="text/css">
main {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 1ch;
	flex-direction: column;
	height: 500px;
	width: 500px;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background: var(--bg);
	color: var(--fg);
	fill: currentColor;
	border-radius: 5em;
	overflow: hidden;
}
	input[type="color"] {
		border: 2px solid hsla(0, 0%, 100%, 0.2);
		border-radius: 100vh;
		transition: border-width 75ms ease;
	}
	::-webkit-color-swatch {
		border-radius: 100vh;
	}
	input[type="color"]:hover {
		border-width: 3px;
	}
	nav {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1ch;
		width: calc(100% - 20px);
		padding: .5em;
		flex-direction: row;
		fill: currentColor;
	}
  @keyframes circle1Path {
    0% {
      top: 50%;
      left: 50%;
      width: 5%;
      height: 5%;
      opacity: 0.5;
    }

    50% {
      top: 0;
      left: 45%;
      width: 60%;
      height: 60%;
      opacity: 1;
    }

    100% {
      top: 50%;
      left: 50%;
      width: 5%;
      height: 5%;
      opacity: 0.5;
    }
  }

  @keyframes circle2Path {
    0% {
      top: 40%;
      left: 45%;
      width: 15%;
      height: 15%;
    }

    50% {
      top: 37%;
      left: -10%;
      width: 80%;
      height: 80%;
    }

    100% {
      top: 40%;
      left: 45%;
      width: 15%;
      height: 15%;
    }
  }

  @keyframes circle3Path {
    0% {
      top: 30%;
      left: 30%;
      width: 25%;
      height: 25%;
    }

    50% {
      top: -50%;
      left: -20%;
      width: 120%;
      height: 120%;
    }

    100% {
      top: 30%;
      left: 30%;
      width: 25%;
      height: 25%;
    }
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
  }

  @keyframes fadeCircleIn {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  .circles {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: -5;
  }
  .circle1 {
    position: absolute;
    animation: circle1Path 15s infinite, fadeCircleIn 1332ms ease-out;
    border-radius: 100%;
    background: radial-gradient(
      50% 50% at 50% 50%,
      rgba(12, 119, 255, 0.3) 15.62%,
      rgba(12, 119, 255, 0) 100%
    );
  }

  .circle2 {
    position: absolute;
    animation: circle2Path 20s infinite, fadeCircleIn 1332ms ease-out;
    border-radius: 100%;
    background: radial-gradient(
      50% 50% at 50% 50%,
      rgba(0, 56, 255, 0.3) 15.62%,
      rgba(12, 119, 255, 0) 100%
    );
  }

  .circle3 {
    position: absolute;
    animation: circle3Path 30s infinite, fadeCircleIn 1332ms ease-out;
    border-radius: 100%;
    background: radial-gradient(
      50% 50% at 50% 50%,
      rgba(65, 56, 210, 0.5) 15.62%,
      rgba(65, 56, 210, 0) 100%
    );
  }
</style>
