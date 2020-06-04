const HtmlWebpackInlineSourcePlugin = require( 'html-webpack-inline-source-plugin' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const path = require( 'path' );

module.exports = ( _env, { mode } ) => ( {
	mode: mode === 'production' ? 'production' : 'development',
	devtool: mode === 'production' ? false : 'inline-source-map',
	entry: {
		main: './src/main.ts',
		ui: './src/ui/index.ts',
	},
	module: {
		rules: [
			{ test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },
			{ test: /\.css$/, loader: [ { loader: 'style-loader' }, { loader: 'css-loader' } ] },
		],
	},
	resolve: {
		extensions: [ '.tsx', '.ts', '.jsx', '.js' ],
		alias: {
			'~': path.resolve( __dirname, 'src' ),
		},
	},
	output: {
		filename: '[name].js',
		path: path.resolve( __dirname, 'dist' ),
	},
	plugins: [
		new HtmlWebpackPlugin( {
			template: './src/ui/index.html',
			filename: 'ui.html',
			inlineSource: '.(js)$',
			chunks: [ 'ui' ],
		} ),
		new HtmlWebpackInlineSourcePlugin(),
	],
} );
