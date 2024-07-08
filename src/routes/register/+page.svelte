<script lang="ts">
	import { Confetti } from 'svelte-confetti';
	import { _, getDateFormatter } from 'svelte-i18n';
	import { enhance } from '$app/forms';

	export let data;
	export let form;

	let formData = {};
	let currentStep: number = 1;
	let isSuccessful: boolean = false;

	$: {
		if(form && form.step) {
			skipToStep(form.step);
		}
	}

	$: getForm = () => {
		if(form == null) return data.formFields;

		return form?.formFields;
	}

	const nextStep = () => {
		if (currentStep < getTotalSteps()) {
			currentStep++;
		}
	};

	const prevStep = () => {
		if (currentStep > 1) {
			currentStep--;
		}
	};

	const skipToStep = (newStep: number) => {
		currentStep = newStep;
	};

	const getTotalSteps = () => {
		return getForm().length + 1;
	};
</script>

<div class="form-card center multi-step-form">
	<form method="POST" use:enhance>
		{#if !isSuccessful}
			<div class="">
				<h1>{$_('register.title')}</h1>

				<!-- Progress bar -->
				<div class="progress-bar">
					<div class="indexes">
						{#each { length: getTotalSteps() } as _, i}
							<div class={i >= currentStep ? '' : 'passed'}>
								<p>{i + 1}</p>
							</div>
						{/each}
					</div>

					<div class="progress" style="width: {(currentStep-1) * (100 / (getTotalSteps() - 1))}%"></div>
				</div>

				<div class="steps">

					{#each getForm() as step}
						<div class={step.step !== currentStep ? 'hidden' : 'block'}>

							{#if step.fields}
								{#each step.fields as field}
									<div>
										<label for={field.name}>{$_(field.label)}
											<input name={field.name} type="{field.type}" value={field.value}>
										</label>

										{#if field.error}
											<p class="error">{field.error}</p>
										{/if}
									</div>
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
					{/each}

					{#if getTotalSteps() === currentStep}
						<div class="">
							<p>By registering you accept our terms and conditions</p>
						</div>
					{/if}
				</div>
			</div>

			<div class="btn-bar center">
				{#if currentStep < getTotalSteps()}
					<button type="button" on:click={nextStep}>{$_('register.next')}</button>
				{/if}

				{#if currentStep === getTotalSteps()}
					<input type="submit" value="{$_('register.register')}" />
				{/if}

				{#if currentStep > 1}
					<button type="button" on:click={prevStep}>{$_('register.previous')}</button>
				{/if}
			</div>
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
		<div style="
 position: fixed;
 top: -50px;
 left: 0;
 height: 100vh;
 width: 100vw;
 display: flex;
 justify-content: center;
 overflow: hidden;
 pointer-events: none;">
			<Confetti x={[-5, 5]} y={[0, 0.1]} delay={[500, 2000]} infinite duration={5000} amount={200}
								fallDistance="100vh" />
		</div>
	{/if}
</div>

<style>
    form {
        height: 50vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .progress {
        transition: all 500ms ease-in-out;
        height: 10px;
        background-color: var(--primary-color);
        border-radius: 5px;
        margin-inline: 10px;
    }

    .progress-bar {
        width: 100%;
        background-color: #f0f0f0;
        border-radius: 5px;
        transition: all 500ms ease-in-out;
        position: relative;
        display: flex;
        align-items: center;
        margin-block: 20px;
    }

    .indexes {
        position: absolute;
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    .indexes > * {
        border-radius: 100%;
        width: 30px;
        height: 30px;
        border: 5px solid #f0f0f0;
        background-color: white;
        text-align: center;
        transition: all 500ms ease-in-out;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .passed {
        border-color: var(--primary-color);
    }

    .w-25 {
        width: 25%;
    }

    .success-card {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 100%;
    }

    .success-card > div {
        text-align: center;
        padding: 10px;
    }

    .btn-bar {
        display: flex;
        flex-direction: row-reverse;
        justify-content: space-between;
    }

    .btn-bar > button,
    input[type='submit'] {
        width: 25%;
    }

    .hidden {
        display: none;
    }

    .block {
        display: block;
    }
</style>
