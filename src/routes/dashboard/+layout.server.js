import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {

	let flexi = cookies.get('flexi');

	if (flexi === undefined) {
		redirect(307, '/login');
		return;
	}
}