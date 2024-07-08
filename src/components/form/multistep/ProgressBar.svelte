<script>
	export let total;
	export let current;
</script>

<div class="progress-bar">
	<div class="indexes">
		{#each { length: total } as _, i}
			<div class={i >= current ? '' : 'passed'}>
				<p>{i + 1}</p>
			</div>
		{/each}
	</div>

	<div class="progress" style="width: {(current-1) * (100 / (total - 1))}%"></div>
</div>

<style>
    .progress {
        transition: all 500ms ease-in-out;
        height: 10px;
        background-color: var(--primary-color);
        border-radius: 5px;
        margin-inline: 10px;
    }

    .progress-bar {
        width: 100%;
        background-color: #f0f0f0;
        border-radius: 5px;
        transition: all 500ms ease-in-out;
        position: relative;
        display: flex;
        align-items: center;
        margin-block: 20px;
    }

    .indexes {
        position: absolute;
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    .indexes > * {
        border-radius: 100%;
        width: 30px;
        height: 30px;
        border: 5px solid #f0f0f0;
        background-color: white;
        text-align: center;
        transition: all 500ms ease-in-out;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .passed {
        border-color: var(--primary-color);
    }
</style>