<script>
	import { _ } from 'svelte-i18n';
	import InputField from '../InputField.svelte';

	export let step;
	export let currentStep;

	$: console.log(step);

</script>

<div class={step.step !== currentStep ? 'hidden' : 'block'}>

	{#if step.fields}
		{#each step.fields as field}
			<InputField
				name={field.name}
				type={field.type}
				value={field.value}
				label={$_(field.label)}
				error="{field.error}"
			/>
		{/each}
	{/if}

	{#if step.radio}
		{#each step.radio.options as option}
			<div>
				<label for={step.radio.name}>
					<input name={step.radio.name} value="{option.value}" type="radio">
					{$_(option.label)}
				</label>
			</div>
		{/each}
	{/if}
</div>

<style>
    .hidden {
        display: none;
    }

    .block {
        display: block;
    }
</style>