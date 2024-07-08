<script>
	import Loading from '../../../components/Loading.svelte';
	import makeApiCall from '$lib/ApiCall.js';
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	function loadCustomers() {
		return makeApiCall('/api/customers');
	}
</script>

<div>
	<h1>{$_('dashboard.customers.title')}</h1>
</div>

	<div>
		{#await loadCustomers()}
			<div class="center">
				<Loading />
			</div>
		{:then result}
			{#each result.data.data as customer}
				<div class="card">
					<p>{customer.name}</p>
				</div>
			{/each}
		{:catch error}
			{#if error.response}
				<p class="error center">{error.response.data.errorMessage || $_('error')}</p>
			{:else}
				<p class="error center">{$_('error')}</p>
			{/if}
		{/await}
	</div>

<style>
    .card {
        background-color: #f9f9f9;
        border-radius: 5px;
        padding: 10px;
        margin: 10px;
        box-shadow: var(--shadow);
    }
</style>