<script>
	import Loading from '../../../components/Loading.svelte';
	import makeApiCall from '$lib/ApiCall.js';
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import Modal from '../../../components/Modal.svelte';

	function loadCustomers() {
		return makeApiCall('/api/customers');
	}

	let showModal = false;
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
				<button on:click={() => showModal = true}>Edit</button>
			</div>
		{/each}
	{:catch error}
		{#if error.response}
			<p class="error center">{error.response.data.errorMessage || $_('error')}</p>
		{:else}
			<p class="error center">{$_('error')}</p>
		{/if}
	{/await}


	<Modal bind:isOpen={showModal}>
		<div class="modal">
			<div class="side">
				<p>Personal data</p>
			</div>

			<div class="content">
				<form action="">
					<input type="text">
				</form>
			</div>
		</div>
	</Modal>
</div>

<style>
    .card {
        background-color: #f9f9f9;
        border-radius: 5px;
        padding: 10px;
        margin: 10px;
        box-shadow: var(--shadow);
    }

    .modal {
				display: flex;
    }

    .content {
        width: 75%;
        height: 100%;
    }

    .side {
        /*	background gradient */
        background: linear-gradient(0deg, var(--primary-color) 0%, var(--secondary-color) 100%);
        background-size: 200% 100%;
        background-position: right bottom;
        transition: 0.5s;
        height: 75vh;
        width: 25%;
    }
</style>