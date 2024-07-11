import makeApiCall from '$lib/ApiCall.js';

export const actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();

		let form = {};
		for (let [key, value] of formData.entries()) {
			form[key] = value;
		}

		let lang = cookies.get('lang') || 'en';
		let method = form.id ? 'PUT' : 'POST';

		console.log(method);

		return await makeApiCall('/api/customers', method, form, cookies.get("flexi"), lang)
			.then((response) => {

				if(response.data.isSuccess) {

					console.log(response.data.data);

					return {
						status: 200,
						body: response.data.data
					};
				}
			})
			.catch((error) => {
				if(!error.response.data.isSuccess) {
					console.log(error.response.data.errorMessage);
				}
			});
	}
};