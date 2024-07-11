<script lang="ts">
	import ModalPage from '../../../../components/modal/ModalPage.svelte';
	import InputField from '../../../../components/form/InputField.svelte';
	import Modal from '../../../../components/modal/Modal.svelte';
	import { enhance } from '$app/forms';

	export let selectedCustomer;

	let showModal = false

	$: {
		showModal = !!selectedCustomer;
	}

	const closeModal = () => {
		selectedCustomer = null;
	}

</script>

<Modal bind:isOpen={showModal} tabs={["Personal data", "History", "Settings"]} on:close={closeModal}>
	<ModalPage title="Personal data">
		<form method="POST" use:enhance>
			{#if selectedCustomer}

				{#if !selectedCustomer.id}
					<h2>Create customer</h2>

				{:else}
					<h2>Edit customer</h2>
					<div class="hidden">
						<InputField name="id" label="ID" type="text" value={selectedCustomer.id} />
					</div>
				{/if}

				<div class="flex">
					<div class="">
						<InputField name="firstName" label="First name" type="text" value={selectedCustomer.firstName || ""} />
					</div>
					<div class="">
						<InputField name="infix" label="Infix" type="text" value={selectedCustomer.infix || ""} />
					</div>
					<div class="">
						<InputField name="lastName" label="Last name" type="text" value={selectedCustomer.lastName || ""} />
					</div>
				</div>

				<div class="">
					<InputField name="email" label="Email" type="email" value={selectedCustomer.email || ""} />
				</div>

				<div class="">
					<InputField name="phone" label="Phone number" type="text" value={selectedCustomer.phone || ""} />
				</div>

				<button>Save</button>
			{/if}
		</form>
	</ModalPage>

	<ModalPage title="History">
		<h2>History</h2>
	</ModalPage>

	<ModalPage title="Settings">
		<h2>Settings</h2>
	</ModalPage>
</Modal>

<style>
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

    .hidden {
        display: none;
    }
</style>