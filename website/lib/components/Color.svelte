<script>
	export let id
	export let value
</script>

<label for={id}>
	<slot/>
	<div class="color-pick"><input {id} type="color" bind:value /></div>
</label>

<style>
		label {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 1rem;
		align-items: center;
	}
	.color-pick {
		width: 50px;
		height: 50px;
		overflow: hidden;
		border-radius: 100%;
		transition: transform 0.2s;
	}
	input[type="color"] {
		cursor: pointer;
		width: 100%;
		height: 100%;
		background: #ffffff 0% 0% no-repeat padding-box;
		transform: scale(1.5);
	}
	.color-pick:hover {
		transform: scale(1.1)
	}
	.color-pick:focus-within {
		transform: scale(1.5)
	}
</style>
