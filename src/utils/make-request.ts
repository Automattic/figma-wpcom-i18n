let id = 0;

export const makeRequest = ( url, options ) =>
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
	} );

export default makeRequest;
