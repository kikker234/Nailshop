import cookies from 'js-cookie';

export function setLanguage(lang: string) {

}

export function getLanguage() {
	// get language from cookie called lang
	return cookies.get('lang');
}