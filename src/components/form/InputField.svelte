<script>
	export let name = "input"
	export let type = "text"
	export let value = ""
	export let label = "Label"
	export let error = ""
</script>

<div>
	<label for={name}>{label}
		<input name={name} type="{type}" value={value}>
	</label>

	{#if error}
		<p class="error">{error}</p>
	{/if}
</div>