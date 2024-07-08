<script lang="ts">
	import { _, locale, locales } from 'svelte-i18n';
</script>

<div class="container mx-auto">
	<h1 class="text-2xl font-bold">{$_('dashboard.account.title')}</h1>

	<div class="">
		<select bind:value={$locale}>
			{#each $locales as locale}
				<option value={locale}>{$_("lang."+locale)}</option>
			{/each}
		</select>
	</div>
</div>
