// src/routes/register/++page.server.js
import makeApiCall from '$lib/ApiCall.js';
import { error, fail } from '@sveltejs/kit';
import { getLocaleFromNavigator } from 'svelte-i18n';
import cookies from 'js-cookie';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	return getFormData();
}

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();

		let formData = {};
		for (let [key, value] of data.entries()) {
			formData[key] = value;
		}

		return await makeApiCall('/api/organization', 'POST', formData, cookies.get('lang'))
			.then((response) => {
				return {
					status: 200,
					headers: {
						'content-type': 'application/json'
					},
					body: JSON.stringify(response.data)
				};
			})
			.catch((errorObj) => {
				let errors = {};

				for (let key in errorObj.response.data) {
					errors[key] = errorObj.response.data[key];
				}

				let form = getFormData();

				let lowestErrorStep = 0;
				for (let step of form.formFields) {
					if (step.fields === undefined) continue;

					for (let field of step.fields) {
						// inject old value in new form object
						if (formData[field.name]) {
							field.value = formData[field.name];
						}

						// inject error message in new form object
						if (errors[field.name]) {
							field.error = errors[field.name];
						}

						// check if this step is the lowest step with an error
						if (field.error) {
							if (lowestErrorStep === 0 || step.step < lowestErrorStep) {
								lowestErrorStep = step.step;
							}
						}
					}
				}

				return {
					status: 400,
					step: lowestErrorStep,
					errors: errors,
					formFields: form.formFields
				};
			});
	}
};

function getFormData() {
	return {
		formFields: [
			{
				step: 1,
				fields: [
					{
						name: 'organizationName',
						value: '',
						type: 'text',
						label: 'register.organizationName'
					},
					{
						name: 'employees',
						value: 1,
						type: 'number',
						label: 'register.employees'
					}
				]
			},
			{
				step: 2,
				fields: [
					{
						name: 'email',
						value: '',
						type: 'text',
						label: 'register.email'
					},
					{
						name: 'password',
						value: '',
						type: 'password',
						label: 'register.password'
					},
					{
						name: 'repeatPassword',
						value: '',
						type: 'password',
						label: 'register.repeatPassword'
					}
				]
			},
			{
				step: 3,
				radio: {
					name: 'type',
					value: '',
					label: 'register.type',
					options: [
						{
							value: '1',
							label: 'register.planBasic'
						},
						{
							value: '2',
							label: 'register.planAdvanced'
						},
						{
							value: '3',
							label: 'register.planUnlimited'
						}
					]
				}
			}
		]
	};
}