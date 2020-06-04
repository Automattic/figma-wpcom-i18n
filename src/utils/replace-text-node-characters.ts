const DEFAULT_FONT_FALLBACK = { family: 'Roboto', style: 'Regular' };

export const replaceTextNodeCharacters = async (
	node,
	characters,
	fontFallback = DEFAULT_FONT_FALLBACK
) => {
	try {
		// Replacing the characters requires loading the font of the text node.
		await figma.loadFontAsync( node.fontName );
	} catch ( e ) {
		await figma.loadFontAsync( fontFallback );
		node.fontName = fontFallback;
	}

	node.characters = characters;

	return node;
};

export default replaceTextNodeCharacters;
