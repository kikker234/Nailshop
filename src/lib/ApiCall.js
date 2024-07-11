import axios from 'axios';
import cookies from 'js-cookie';

export function makeClientApiCall(url, method, body) {
	let token = cookies.get("flexi");
	let lang = cookies.get('lang') || 'en';

	return makeApiCall(url, method, body, token, lang)
}

export default function makeApiCall(url, method, body, token, lang) {

	return axios({
		url: 'http://localhost:5161' + url,
		method: method,
		data: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + token,
			'Accept-Language': lang,
			'Content-Language': lang,
			'Instance': "1e303b04-9f1a-46b9-af9f-63c2f95bbfdd",
		}
	});
}