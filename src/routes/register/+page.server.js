// src/routes/register/+page.server.js
import makeApiCall from '$lib/ApiCall.js';
import { error, fail } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	return getFormData();
}

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		let formData = {};
		for (let [key, value] of data.entries()) {
			formData[key] = value;
		}

		return await makeApiCall('/api/organization', 'POST', formData)
			.then((response) => {

			})
			.catch((errorObj) => {
				let errors = {};

				for (let key in errorObj.response.data) {

					console.log('Error for field: ' + key);
					errors[key.toLowerCase()] = errorObj.response.data[key];
				}

				let form = getFormData();

				// inject old values into form
				for (let step of form.formFields) {
					if (step.fields === undefined) continue;

					for (let field of step.fields) {
						if (formData[field.name]) {
							field.value = formData[field.name];
						}
					}
				}

				// inject errors into form
				for (let step of form.formFields) {
					if (step.fields === undefined) continue;

					for (let field of step.fields) {
						if (errors[field.name.toLowerCase()]) {
							field.error = errors[field.name];
							console.log('Error for field: ' + field.name + ' - ' + field.error);
						}
					}
				}

				let lowestErrorStep = 0;
				for (let step of form.formFields) {
					if (step.fields === undefined) continue;

					for (let field of step.fields) {
						if (field.error) {
							if (step.step > lowestErrorStep) {
								lowestErrorStep = step.step;
							}
						}
					}
				}

				return {
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

/**/
