<script>
	import Loading from '../../../components/Loading.svelte';
	import { makeClientApiCall } from '$lib/ApiCall.js';
</script>
<div class="">
	{#await makeClientApiCall("/api/treatment") }
		<div class="center">
			<Loading />
		</div>
	{:then result}
		{#if result.data.data.length === 0 }
			<p class="center italic">Geen behandelingen gevonden</p>
		{/if}

		{#each result.data.data as treatment}
			{treatment.name}
		{/each}
	{:catch error}
		<div class="">Error</div>
	{/await}
</div>