/**
 * External dependencies
 */
import { resolve, reorder } from 'unicode-bidirectional/dist/unicode.bidirectional';

const RTL_LOCALES = {
	ar: true,
	he: true,
};

export const reorderRTL = ( text: string, locale: string ): string => {
	if ( ! RTL_LOCALES[ locale ] ) {
		return text;
	}

	const codepoints = text.split( '' ).map( ( char ) => char.codePointAt( 0 ) );

	return String.fromCodePoint( ...reorder( codepoints, resolve( codepoints ) ) );
};

export default reorderRTL;
