/**
 * Internal dependencies.
 */
import { makeRequest } from '~/utils';

const API_ENDPOINT = 'https://translate.wordpress.com/api/translations/-query-by-originals?allow_origin_any';
const PROJECT = 'wpcom';
const TRANSLATION_SET_SLUG = 'default';

export const getTranslations = ( strings, locale ) => {
	const originalStrings = [ ...strings ].map( ( singular ) => ( {
		singular,
	} ) );

	return makeRequest( API_ENDPOINT, {
		method: 'POST',
		body: {
			project: PROJECT,
			translation_set_slug: TRANSLATION_SET_SLUG,
			locale_slug: locale,
			original_strings: JSON.stringify( originalStrings ),
		},
	} );
};

export default getTranslations;
