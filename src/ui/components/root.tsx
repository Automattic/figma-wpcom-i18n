/**
 * External dependencies
 */
import * as React from 'react';

/**
 * Internal dependencies
 */
import { getLocales } from '~/utils';
import NetworkRequests from '~/ui/components/network-requests';
import ButtonGenerate from '~/ui/components/button-generate';
import ButtonCancel from '~/ui/components/button-cancel';

const Root = () => {
	const [ state, setState ] = React.useState( {
		status: 'idle',
		processedCount: 0,
	} );

	React.useEffect( () => {
		const handleUIState = ( event ) => {
			const { type, state } = event?.data?.pluginMessage;

			if ( type === 'ui:root' ) {
				setState( ( prevState ) => ( { ...prevState, ...state } ) );
			}
		};

		window.addEventListener( 'message', handleUIState );

		return () => window.removeEventListener( 'message', handleUIState );
	} );

	const { status, processedCount } = state;
	const isProcessing = status === 'processing';
	const isCompleted = status === 'completed';
	const localesCount = getLocales().length;
	const progress = `${ processedCount }/${ localesCount }`;

	return (
		<div>
			<NetworkRequests />

			<p className="align-center">
				{ ! isProcessing && ! isCompleted && '' }
				{ isProcessing && `Generating translated pages (${ progress })` }
				{ isCompleted &&
					`${
						processedCount === localesCount ? 'All' : progress
					} pages were generated successfully!` }
			</p>

			{ ! isCompleted && <ButtonGenerate disabled={ isProcessing } /> }

			<ButtonCancel className={ isCompleted ? 'is-primary' : '' }>
				{ isCompleted ? 'Ok, got it!' : 'Cancel' }
			</ButtonCancel>
		</div>
	);
};

export default Root;
