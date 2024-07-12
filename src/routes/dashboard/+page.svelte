<script lang="ts">
	import { _ } from 'svelte-i18n'
	import Calendar from '../../components/calendar/Calendar.svelte';
</script>

<div class="container mx-auto">
	<h1 class="text-2xl font-bold">{$_('dashboard.dashboard.title')}</h1>

	<div class="grid">
		<div class="">
			<h3>Quick actions</h3>
			<button>Make appointment</button>
		</div>
		<div class="">
		</div>
		<div class="">
			<Calendar fixedSize={1} />
		</div>
	</div>
</div>

<style>
	.grid {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
	}
</style>