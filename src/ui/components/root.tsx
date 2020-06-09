/**
 * External dependencies
 */
import * as React from 'react';

/**
 * Internal dependencies
 */
import NetworkRequests from './network-requests.tsx';
import ButtonGenerate from './button-generate.tsx';
import ButtonCancel from './button-cancel.tsx';

const Root = () => {
	return (
		<div>
			<NetworkRequests />

			<ButtonGenerate />
			<ButtonCancel />
		</div>
	);
};

export default Root;
