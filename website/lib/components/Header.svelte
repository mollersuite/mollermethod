<header>
	<slot />
</header>

<style>
	header {
		flex-wrap: wrap;
		position: sticky;
		top: 0;
		width: 100vw;
		overflow-x: auto;
		z-index: 2;
		background: var(--fds-system-solid-neutral);
		color: var(--fds-text-primary);
		padding: 1rem;
		display: flex;
		align-items: center;
		gap: 1ch;
		flex-direction: row;
	}

	@media (max-width: 659px) {
		header {
			justify-content: center;
		}
	}

	@media (max-width: 130px) {
		header {
			margin: 0;
			position: static;
			padding: 0;
			flex-direction: column;
		}
	}
	@media (min-width: 1200px) {
		header {
			max-width: 1200px;
			margin: auto;
			border-bottom-left-radius: 1rem;
			border-bottom-right-radius: 1rem;
		}
	}
</style>
