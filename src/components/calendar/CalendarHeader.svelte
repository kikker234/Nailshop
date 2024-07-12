<script>
	import { createEventDispatcher } from 'svelte';

	const dispatcher = createEventDispatcher();

	const switchCalender = () => {
		dispatcher('switch');
	}
</script>

<!--<button on:click={switchCalender}>Switch View</button>-->