<script lang="ts">
	import { getContext, onMount } from 'svelte';

	export let title;

	let current = "";
	let activeTab = getContext('activeTab');
	activeTab.subscribe(value => {
		current = value;
	});

</script>

<div class={title === current ? 'page is-page' : 'page'}>
	{#if title === current}
		<slot></slot>
	{/if}
</div>

<style>
    .page {
				display: none;
        padding: 10px;
    }

		.is-page {
			display: block;
		}
</style>