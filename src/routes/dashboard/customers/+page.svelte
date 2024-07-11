<script>
	import Loading from '../../../components/Loading.svelte';
	import { makeClientApiCall } from '$lib/ApiCall.js';

	import { _ } from 'svelte-i18n';
	import CustomerEditorModal from './components/CustomerEditorModal.svelte';

	export let form;

	let selectedCustomer = null;

	$: {
		if (form) {
			selectedCustomer = form.body;
		}
	}

	function loadCustomers() {
		return makeClientApiCall('/api/customers');
	}

	const openModal = (customer) => {
		selectedCustomer = customer;
	};

	const openCreateModal = () => {
		selectedCustomer = {};
	};

</script>

<div>
	<h1>{$_('dashboard.customers.title')}</h1>
	<button on:click={openCreateModal}>Add customer</button>
</div>

<div>
	{#await loadCustomers()}
		<div class="center">
			<Loading />
		</div>
	{:then result}
		{#each result.data.data as customer}
			<div class="card">
				<p>{customer.firstName}</p>
				<button on:click={() => openModal(customer)}>Edit customer</button>
			</div>
		{/each}
	{:catch error}
		{#if error.response}
			<p class="error center">{error.response.data.errorMessage || $_('error')}</p>
		{:else}
			<p class="error center">{$_('error')}</p>
		{/if}
	{/await}

	<CustomerEditorModal {selectedCustomer} />
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