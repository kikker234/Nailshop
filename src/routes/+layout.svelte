<script lang="ts">
	import { init, addMessages, getLocaleFromNavigator, getLocaleFromHash } from 'svelte-i18n';

	import en from '../lang/en-GB.json';
	import nl from '../lang/nl-NL.json';

	addMessages('en-GB', en);
	addMessages('nl-NL', nl);

	init({
		fallbackLocale: 'en-GB',
		initialLocale: getLocaleFromNavigator(),
	})

	let lang = getLocaleFromHash("hash")

	if(!lang) {
		// save the default language in the hash
		lang = "en-GB"
	}
</script>

<slot></slot>
