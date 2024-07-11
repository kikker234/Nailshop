<script>
	import ModalSideBar from './ModalSideBar.svelte';
	import { writable } from 'svelte/store';
	import { createEventDispatcher, setContext } from 'svelte';
	import { fade } from 'svelte/transition';

	export let isOpen = false;

	const dispatch = createEventDispatcher();

	export let tabs = ['Main'];
	const activeTab = writable(tabs[0])
	setContext('activeTab', activeTab);

	function closeModal() {
		isOpen = false;
		activeTab.set(tabs[0]);

		dispatch('close');
	}
</script>

{#if isOpen}
	<div transition:fade={{ duration: 100 }} class="modal" on:click="{closeModal}">

		<div class="modal-content" on:click|stopPropagation>
			<ModalSideBar {tabs} {activeTab} on:close={closeModal} />

			<div class="content">
				<slot></slot>
			</div>
		</div>
	</div>
{/if}

<style>
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.5);

        display: flex;
        justify-content: center;
        align-items: center;

        transition: all 0.3s ease-in-out;
    }

    .content {
        width: 75%;
    }



    .modal-content {
        overflow: hidden;
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);

        width: 50vw;
        height: 50vh;

        display: flex;
        justify-content: space-between;
    }
</style>
