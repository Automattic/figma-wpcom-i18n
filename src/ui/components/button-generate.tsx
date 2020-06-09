/**
 * External dependencies
 */
import React from 'react';

const ButtonGenerate = ( props ) => {
	const handleClick = () => {
		parent.postMessage( { pluginMessage: { type: 'generate-pages' } }, '*' );
	};

	return (
		<button className="is-primary" onClick={ handleClick } { ...props }>
			Generate Pages
		</button>
	);
};

export default ButtonGenerate;
