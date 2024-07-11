<script lang="ts">
	import { createEventDispatcher, setContext } from 'svelte';

	export let tabs;
	export let activeTab;

	setContext('activeTab', activeTab);

	const setActiveTab = (tab: string) => {
		activeTab.set(tab);
	}

	const dispatch = createEventDispatcher();
	const close = () => {
		dispatch('close');
	}
</script>

<div class="side">
	<div class="">
		{#each tabs as tab, i}
			<button on:click|stopPropagation on:click={() => setActiveTab(tab)}>{tab}</button>
		{/each}
	</div>

	<div class="">
		<button on:click={close}>Close</button>
	</div>
</div>

<style>
    .side {
        background: linear-gradient(0deg, var(--primary-color) 0%, var(--secondary-color) 100%);
        background-size: 200% 100%;
        background-position: right bottom;
        transition: 0.5s;
        height: 100%;
        width: 33%;
        border: none;

        display: flex;
        justify-content: space-between;
        flex-direction: column;
    }

    .side > div {
        padding: 5px;
        display: flex;
        gap: 5px;
        flex-direction: column;
    }

    .side > div > button {
        background: rgba(255, 255, 255, 0.2);
        padding: 10px;
        border-radius: 5px;
        color: white;
        text-align: center;
        border: none;
    }

    .side > div > button:hover {
        background: rgba(255, 255, 255, 0.3);
        transition: all 250ms;
        cursor: pointer;
    }
</style>