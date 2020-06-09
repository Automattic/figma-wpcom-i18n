/**
 * External dependencies
 */
import React from 'react';

const ButtonCancel = ( props ) => {
	const handleClick = () => {
		parent.postMessage( { pluginMessage: { type: 'cancel' } }, '*' );
	};

	return (
		<button onClick={ handleClick } { ...props }>
			{ props.children || 'Cancel' }
		</button>
	);
};

export default ButtonCancel;
