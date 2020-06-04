/**
 * Internal dependencies.
 */
import { getLocales, getTextNodesDeep, getTranslations } from '~/utils';

export default async () => {
	const targetPage = figma.currentPage;
	const pageStrings = new Set();

	getTextNodesDeep( figma.currentPage.children ).forEach( ( node ) => {
		pageStrings.add( node.characters );
	} );

	for ( let locale of getLocales() ) {
		await getTranslations( pageStrings, locale ).then( console.log );
	}
};
