<script>
	export let hours;
</script>

<div class="hours">
	<div class="hour"></div>

	{#each hours as hour}
		<div class="hour">
			{hour}
		</div>
	{/each}
</div>

<style>
    .hours {
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: space-between;
				align-items: center;
    }

		.hour {
				height: 38px;
		}
</style>