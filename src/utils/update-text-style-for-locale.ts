const LOCALES_TEXT_STYLES = {
	ar: {
		fontName: {
			family: '.Arabic UI Text',
			style: 'Regular',
		},
		rtl: true,
	},
	he: {
		fontName: {
			family: 'Arial Hebrew',
			style: 'Regular',
		},
		rtl: true,
	},
	ja: {
		fontName: {
			family: 'Noto Sans JP',
			style: 'Regular',
		},
	},
	ko: {
		fontName: {
			family: 'Noto Sans KR',
			style: 'Regular',
		},
	},
	'zh-cn': {
		fontName: {
			family: 'Noto Sans SC',
			style: 'Regular',
		},
	},
	'zh-tw': {
		fontName: {
			family: 'Noto Sans TC',
			style: 'Regular',
		},
	},
};

export const updateTextStyleForLocale = async ( node, locale ) => {
	if ( ! ( locale in LOCALES_TEXT_STYLES ) ) {
		return;
	}

	const styles = LOCALES_TEXT_STYLES[ locale ];

	if ( styles.fontName ) {
		await figma.loadFontAsync( styles.fontName );
		node.fontName = styles.fontName;
	}

	if ( styles.rtl ) {
		if ( node.textAlignHorizontal === 'LEFT' ) {
			node.textAlignHorizontal = 'RIGHT';
		} else if ( node.textAlignHorizontal === 'RIGHT' ) {
			node.textAlignHorizontal = 'LEFT';
		}
	}
};

export default updateTextStyleForLocale;
