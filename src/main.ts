/**
 * Internal dependencies
 */
import actions from './actions';

/**
 * Render UI
 */
figma.showUI( __html__ );

/**
 * Bind message handler
 */
figma.ui.onmessage = ( message ) => {
	const { type } = message;

	if ( type in actions ) {
		actions[ type ]( message );
	}
};
