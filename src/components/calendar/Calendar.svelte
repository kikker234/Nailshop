<script lang="ts">

	import CalendarColumn from './CalendarColumn.svelte';
	import CalendarHeader from './CalendarHeader.svelte';
	import CalendarTimes from './CalendarTimes.svelte';
	import { onMount } from 'svelte';
	import { makeClientApiCall } from '$lib/ApiCall';

	export let fixedSize = -1;

	let columns: number = fixedSize != -1 ? fixedSize : 7;
	let startDate: Date = getFirstDateOfWeek(new Date());
	let hours = Array.from({ length: 24 }, (_, i) => `${Math.max(i)}:00`);

	function switchView() {
		if (fixedSize != -1) return;

		columns = columns === 7 ? 1 : 7;
	}

	function getFirstDateOfWeek(date: Date) {
		const day = date.getDay();
		const diff = date.getDate() - day + (day === 0 ? -6 : 1);
		return new Date(date.setDate(diff));
	}

	function getDate(days: number) {
		return new Date(startDate.getTime() + days * 24 * 60 * 60 * 1000);
	}

	onMount(() => {
		if (fixedSize != -1) return;

		window.addEventListener('resize', () => {
			if (window.innerWidth > 1300) {
				columns = 7;
			} else if (window.innerWidth > 900) {
				columns = 5;
			} else {
				columns = 1;
			}
		});
	});

	let tasks = [];
	onMount(async () => {
		tasks = await makeClientApiCall('/api/planned/treatment', 'GET', {
			'start': startDate.toDateString(),
			'end': getDate(columns - 1).toDateString()
		}).then((response) => {
			return response.data.data;
		}).catch((error) => {
			return [];
		});
	});
</script>

<div class="calendar">
	{#if fixedSize === -1}
		<CalendarHeader on:switch={switchView} />
	{/if}

	<div class="flex">
		<CalendarTimes {hours} />

		{#each Array(columns) as _, i}
			<CalendarColumn date={getDate(i)} {tasks} {hours} />
		{/each}
	</div>
</div>

<style>

    .flex {
        display: flex;
        justify-content: space-around;
        height: 100%;
    }
</style>