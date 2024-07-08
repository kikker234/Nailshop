<div class="loading">
	&nbsp;
</div>

<style>
	.loading {
			width: 40px;
			height: 40px;
			animation: spin 2s linear infinite;
			border-radius: 100%;
			border: solid 4px var(--primary-color);
			border-top: solid 4px transparent;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>