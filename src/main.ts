figma.showUI( __html__ );

figma.ui.onmessage = ( msg ) => {
	// Handle messages
	figma.closePlugin();
};
