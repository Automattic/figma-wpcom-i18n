/**
 * Internal dependencies.
 */
import {
	getLocales,
	getTextNodesDeep,
	getTranslatedPageName,
	getTranslations,
	reorderRTL,
	replaceTextNodeCharacters,
	updateTextStyleForLocale,
} from '~/utils';

const updateRootUI = ( state ) => {
	figma.ui.postMessage( { type: 'ui:root', state } );
};

export default async () => {
	const targetPage = figma.currentPage;
	const pageStrings = new Set();

	updateRootUI( { status: 'processing' } );

	getTextNodesDeep( figma.currentPage.children ).forEach( ( node ) => {
		pageStrings.add( node.characters );
	} );

	let processedCount = 0;

	for ( let locale of getLocales() ) {
		try {
			const translations = await getTranslations( pageStrings, locale );
			const translationsMap = Object.keys( translations ).reduce( ( map, key ) => {
				const item = translations[ key ];

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
					const translation = reorderRTL( translationsMap[ nodeString ], locale );
					await replaceTextNodeCharacters( node, translation );
					updateTextStyleForLocale( node, locale );
				}
			}

			processedCount++;
			updateRootUI( { processedCount } );
		} catch ( error ) {
			// Handle page translation failures
			console.log( 'error', error );
		}
	}

	updateRootUI( { status: 'completed' } );
};
