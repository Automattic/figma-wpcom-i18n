export const getTextNodesDeep = ( children ) =>
	children.reduce( ( arr, node ) => {
		if ( node.type === 'TEXT' ) {
			arr.push( node );
		}

		if ( node.children ) {
			arr.push( ...getTextNodesDeep( node.children ) );
		}

		return arr;
	}, [] );

export default getTextNodesDeep;
