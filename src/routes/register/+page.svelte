<script lang="ts">
	import { Confetti } from 'svelte-confetti';
	import { _ } from 'svelte-i18n';
	import { enhance } from '$app/forms';
	import ProgressBar from '../../components/form/multistep/ProgressBar.svelte';
	import ButtonBar from '../../components/form/multistep/ButtonBar.svelte';
	import FormStep from '../../components/form/multistep/FormStep.svelte';
	import ScreenConfetti from '../../components/ScreenConfetti.svelte';

	export let data;
	export let form;

	$: currentStep = 1;
	let isSuccessful: boolean = false;

	$: {
		if (form && form.status == 200) {
			isSuccessful = true;
		} else if (form && form.step) {
			skipToStep(form.step);
		}
	}

	$: getForm = () => {
		if (form == null) return data.formFields;

		return form?.formFields;
	};

	const skipToStep = (newStep: number) => {
		currentStep = newStep;
	};

	const getTotalSteps = () => {
		let form = getForm();

		if(!form) return 2;

		return form.length + 1;
	};

	const handleStepChange = (event: any) => {
		currentStep = event.detail;
	};
</script>

<div class="form-card center multi-step-form">
	<form method="POST" use:enhance>
		{#if !isSuccessful}
			<div class="">
				<h1>{$_('register.title')}</h1>

				<!-- Progress bar -->
				<ProgressBar current={currentStep} total={getTotalSteps()} />

				<div class="steps">

					{#each getForm() as step}
						<FormStep {step} {currentStep} />
					{/each}

					{#if getTotalSteps() === currentStep}
						<div class="">
							<p>{$_('register.termsAndConditions')}</p>
						</div>
					{/if}
				</div>
			</div>

			<ButtonBar
				{currentStep}
				totalSteps={getTotalSteps()}
				on:stepChange={handleStepChange}
			/>
		{:else}
			<div class="success-card">
				<div class="">
					<h1>{$_('register.title')}</h1>
					<p>{$_('register.success')}</p>
				</div>

				<div class="center">
					<div class="w-25">
						<a href="/dashboard">
							<button>Login</button>
						</a>
					</div>
				</div>
			</div>
		{/if}
	</form>

	{#if isSuccessful}
		<ScreenConfetti />
	{/if}
</div>

<style>
    form {
        height: 50vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .w-25 {
        width: 25%;
    }

    .success-card {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
    }

    .success-card > div {
        text-align: center;
        padding: 10px;
    }
</style>
