import { redirect } from '@sveltejs/kit';
import axios from 'axios';
import makeApiCall from '$lib/ApiCall.js';

export async function load({ cookies }) {

	let flexi = cookies.get('flexi');
	let lang = cookies.get('lang') || 'en';

	if (flexi === undefined) {
		redirect(307, '/login');
		return;
	}

	let response = await makeApiCall(`/api/auth/valid?token=${flexi}`, "GET", "", flexi, lang)
	let data = response.data;

	if(!data.isSuccess) {
		cookies.delete('flexi', { path: '/' });

		redirect(307, '/login');
		return;
	}

	if(!data.data) {
		cookies.delete('flexi', { path: '/' });

		redirect(307, '/login');
		return;
	}
}