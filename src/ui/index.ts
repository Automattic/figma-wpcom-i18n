/**
 * Internal dependencies
 */
import './style.css';

/**
 * Bind network request event handler.
 */
window.addEventListener( 'message', ( event ) => {
	const { type, url, options } = event?.data?.pluginMessage;

	if ( type.startsWith( 'networkReques' ) ) {
		if ( options.body ) {
			const formData = new FormData();

			for ( let prop in options.body ) {
				formData.append( prop, options.body[ prop ] );
			}

			options.body = formData;
		}

		fetch( url, options )
			.then( ( response ) => response.json() )
			.then( ( payload ) => {
				parent.postMessage( { pluginMessage: { type, payload, status: 'success' } }, '*' );
			} )
			.catch( ( error ) => {
				parent.postMessage(
					{ pluginMessage: { type, payload: error.message, status: 'error' } },
					'*'
				);
			} );
	}
} );

/**
 * Bind elements event handlers.
 */
document.getElementById( 'generate' ).addEventListener( 'click', () => {
	parent.postMessage( { pluginMessage: { type: 'generate-pages' } }, '*' );
} );

document.getElementById( 'cancel' ).addEventListener( 'click', () => {
	parent.postMessage( { pluginMessage: { type: 'cancel' } }, '*' );
} );
