<script>
	import Loading from '../../../components/Loading.svelte';
	import makeApiCall from '$lib/ApiCall.js';
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import Modal from '../../../components/Modal.svelte';
	import InputField from '../../../components/form/InputField.svelte';

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
				<div class="">
					<p>Personal data</p>
					<p>History</p>
					<p>Settings</p>
				</div>

				<div class="">
					<p on:click={() => showModal = false}>Close</p>
				</div>
			</div>

			<div class="content">
				<form action="">
					<div class="flex">
						<div class="">
							<InputField label="First name" type="text" />
						</div>
						<div class="">
							<InputField label="Infix" type="text" />
						</div>
						<div class="">
							<InputField label="Last name" type="text" />
						</div>
					</div>

					<div class="">
						<InputField label="Email" type="email" />
					</div>

					<div class="">
						<InputField label="Phone number" type="text" />
					</div>
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

        padding: 1em;
    }

    .side {
        background: linear-gradient(0deg, var(--primary-color) 0%, var(--secondary-color) 100%);
        background-size: 200% 100%;
        background-position: right bottom;
        transition: 0.5s;
        height: 75vh;
        width: 25%;

        display: flex;
        justify-content: space-between;
        flex-direction: column;
    }

    .side > div > p {
        /*		Glassified p */
        background: rgba(255, 255, 255, 0.2);
        padding: 10px;
        border-radius: 5px;
        margin: 10px;
        color: white;
    }

    .side > div > p:hover {
        background: rgba(255, 255, 255, 0.3);
        transition: all 250ms;
    }

    .side > div > p:hover {
        cursor: pointer;
    }

    .flex {
        display: flex;
        gap: .5em;
    }

		.flex > *:nth-child(2) {
				width: 33%;
		}

    .flex > * {
        width: 100%;
    }
</style>