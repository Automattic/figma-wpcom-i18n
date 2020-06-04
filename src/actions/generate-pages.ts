/**
 * Internal dependencies.
 */
import {
	getLocales,
	getTextNodesDeep,
	getTranslatedPageName,
	getTranslations,
	replaceTextNodeCharacters,
} from '~/utils';

export default async () => {
	const targetPage = figma.currentPage;
	const pageStrings = new Set();

	getTextNodesDeep( figma.currentPage.children ).forEach( ( node ) => {
		pageStrings.add( node.characters );
	} );

	for ( let locale of getLocales() ) {
		try {
			const translations = await getTranslations( pageStrings, locale );
			const translationsMap = Object.values( translations ).reduce( ( map, item ) => {
				if ( item?.translations?.length ) {
					map[ item.original.singular ] = item.translations[ 0 ].translation_0;
				}
				return map;
			}, {} );

			const translatedPageName = getTranslatedPageName( figma.currentPage, locale );
			const existingTranslatedPage = figma.root.children.find(
				( page ) => page.name === translatedPageName
			);

			if ( existingTranslatedPage ) {
				existingTranslatedPage.remove();
			}

			const translatedPage = figma.currentPage.clone();
			translatedPage.name = translatedPageName;

			for ( let node of getTextNodesDeep( translatedPage.children ) ) {
				const nodeString = node.characters;

				if ( nodeString in translationsMap ) {
					await replaceTextNodeCharacters( node, translationsMap[ nodeString ] );
				}
			}
		} catch ( error ) {
			// Handle page translation failures
			console.log( 'error', error );
		}
	}
};
