const {
	override,
	addWebpackModuleRule,
	addWebpackPlugin
} = require('customize-cra');
const Autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const publicPath = 'https://gaoyuanfell.github.io/react-ele/'

const rewiredConfig = () => config => {

	let index = config.plugins.findIndex(item => item instanceof MiniCssExtractPlugin)
	if (index != -1) {
		config.plugins.splice(index, 1)
	}
	config.plugins.push(
		new MiniCssExtractPlugin({
			filename: 'static/css/[name].css',
			chunkFilename: 'static/css/[name].css',
		}),
	)

	let htmlCOnfig = config.plugins.find(item => item instanceof HtmlWebpackPlugin)
	if (htmlCOnfig) {
		htmlCOnfig.options.hash = true
	}

	config.devtool = config.mode === 'development' ? 'cheap-module-source-map' : false;

	if (config.mode != 'development') {
		config.output.publicPath = publicPath
	}

	config.output.filename = 'static/js/[name].js'
	config.output.chunkFilename = 'static/js/[name].chunk.js'

	config.optimization.splitChunks = {
		chunks: 'async',
		minSize: 30000,
		maxSize: 0,
		minChunks: 1,
		maxAsyncRequests: 5,
		maxInitialRequests: 3,
		automaticNameDelimiter: '~',
		name: true,
		cacheGroups: {
			vendors: {
				test: /[\\/]node_modules[\\/]/,
				priority: -10
			},
			default: {
				minChunks: 2,
				priority: -20,
				reuseExistingChunk: true
			}
		}
	}

	let rules = config.module.rules.find(e => Array.isArray(e.oneOf)).oneOf
	let index2 = rules.findIndex((item) => /url-loader/.test(item.loader))
	if (index2 != -1) {
		rules.splice(index2, 1)
	}

	let urlLoader = {
		test: [/\.png$/, /\.bmp$/, /\.gif$/, /\.jpe?g$/],
		loader: 'url-loader',
		exclude: /node_modules/,
		options: {
			publicPath: config.mode != 'development' ? publicPath : '',
			name: 'static/media/[name].[ext]?[hash]',
			limit: 0,
		}
	}
	rules.unshift(urlLoader)

	return config;
}

module.exports = override(
	rewiredConfig(),
	addWebpackPlugin(Autoprefixer),
)