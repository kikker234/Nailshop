<script lang="ts">
	import { init, addMessages, getLocaleFromNavigator } from 'svelte-i18n';

	import en from '../lang/en-GB.json';
	import nl from '../lang/nl-NL.json';

	addMessages('en-GB', en);
	addMessages('nl-NL', nl);

	init({
		fallbackLocale: 'en-GB',
		initialLocale: getLocaleFromNavigator(),
	})
</script>

<slot></slot>
