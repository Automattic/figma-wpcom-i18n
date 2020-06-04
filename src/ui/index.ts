/**
 * Internal dependencies
 */
import './style.css';

document.getElementById( 'generate' ).onclick = () => {
	parent.postMessage( { pluginMessage: { type: 'generate' } }, '*' );
};

document.getElementById( 'cancel' ).onclick = () => {
	parent.postMessage( { pluginMessage: { type: 'cancel' } }, '*' );
};
