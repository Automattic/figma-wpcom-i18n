const DEFAULT_TIMEOUT = 20 * 1000;

let id = 0;

export const makeRequest = ( url, options, timeout = DEFAULT_TIMEOUT ) =>
	new Promise( ( resolve, reject ) => {
		const type = `networkRequest:${ id++ }`;
		const handler = ( message ) => {
			if ( message.type !== type ) {
				return;
			}

			if ( message.status === 'success' ) {
				resolve( message.payload );
			} else {
				reject( message.payload );
			}

			figma.ui.off( 'message', handler );
		};

		figma.ui.postMessage( { type, url, options } );
		figma.ui.on( 'message', handler );

		if ( timeout ) {
			setTimeout( () => {
				reject( `Request timed out after ${ timeout }ms.` );
			}, timeout );
		}
	} );

export default makeRequest;
