<script>
	import { _ } from 'svelte-i18n';
	import { createEventDispatcher } from 'svelte';

	export let currentStep = 1;
	export let totalSteps;

	const dispatch = createEventDispatcher();

	const nextStep = () => {
		if (currentStep < totalSteps) {
			currentStep++;
			dispatch('stepChange', currentStep);
		}
	};

	const prevStep = () => {
		if (currentStep > 1) {
			currentStep--;
			dispatch('stepChange', currentStep);
		}
	};
</script>

<div class="btn-bar center">
	{#if currentStep < totalSteps}
		<button type="button" on:click={nextStep}>{$_('register.next')}</button>
	{/if}

	{#if currentStep === totalSteps}
		<input type="submit" value="{$_('register.register')}" />
	{/if}

	{#if currentStep > 1}
		<button type="button" on:click={prevStep}>{$_('register.previous')}</button>
	{/if}
</div>

<style>
    .btn-bar {
        display: flex;
        flex-direction: row-reverse;
        justify-content: space-between;
    }

    .btn-bar > button,
    input[type='submit'] {
        width: 25%;
    }
</style>
