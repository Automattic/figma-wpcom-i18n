/**
 * External dependencies
 */
import * as React from 'react';

const NetworkRequests = () => {
	const handleNetworkRequests = ( event ) => {
		const { type, url, options } = event?.data?.pluginMessage;

		if ( type.startsWith( 'networkRequest' ) ) {
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
	};

	React.useEffect( () => {
		window.addEventListener( 'message', handleNetworkRequests );

		return () => window.removeEventListener( 'message', handleNetworkRequests );
	} );

	return null;
};

export default NetworkRequests;
