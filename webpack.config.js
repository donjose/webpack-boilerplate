const path = require('path');
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("webpack-copy-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
module.exports = {
	context: path.resolve(__dirname),
	mode: 'production',
	entry: {
		scripts: './src/js/scripts.js',
		styles: './src/scss/style.scss',

	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].min.js',
		clean: true,
	},
	optimization: {

	},
	module: {
		rules: [

			{
				test: /\.html$/i,
				loader: "html-loader",
				options: {
					minimize: false
				}
			},
			{
				test: /\.(s*)css$/,
				use: [
					{
						loader: miniCssExtractPlugin.loader,
					},
					{
						loader: 'css-loader',
						options: {
						}
					},
					{
						loader: 'sass-loader',
					},
				],
			},
			{
				test: /\.(woff2?|ttf|otf|eot|svg)$/,
				type: 'asset/resource',
				generator : {
					filename : 'assets/fonts/[name][ext][query]',
				}
			},
			{
				test: /\.(jpe?g|png|gif|webp)$/,
				type: 'asset/resource',
				generator: {
					filename: 'assets/images/[name][ext][query]',
				}
			}
		]
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: './src/index.html',
			removeComments: false,
			removeScriptTypeAttributes: true,
			removeStyleLinkTypeAttributes: false,

		}),
		new miniCssExtractPlugin({
			filename: 'css/[name].min.css',
		}),
		new CopyWebpackPlugin({
			patterns : [
				{from: path.resolve(__dirname,"src","form-handler.php"), to:path.resolve(__dirname, "dist/form-handler.php")}
			]
		})
	]
}