const webpack = require("webpack");
const pkg = require("./package.json");
const { getBannerTemplate } = require("./scripts/banner");

module.exports = function(opts) {
	const isProd = opts.program.state === "prod";

	return {
		mode: isProd ? "production" : "development",
		clean: isProd ? false : true,
		shouldUseEntryHTML: false,
		polyfills: null,
		shouldUseSourceMap: true,
		resolve: {
    alias: {
        '@': resolve('src')
      },
      extensions: ['.tsx', '.ts', '.jsx', '.js', '.json']
    },
		output: {
			globalObject: "this",
			libraryTarget: "umd",
			library: "zen-tools",
		},
		assest: {
			js: {
				name: isProd ? "zen-tools.min.js" : "zen-tools.js",
				output: "",
			},
		},
		// target: "node",
		optimization: {
			runtimeChunk: false,
			splitChunks: false,
		},
		babel: {
			useBuiltIns: false,
			modules: "cjs",
			plugins: [
				[
					"search-and-replace",
					{
						rules: [
							{
								search: "%VERSION%",
								replace: pkg.version,
							},
						],
					},
				],
			],
		},
		pluginExtra: [
			new webpack.BannerPlugin({
				banner: getBannerTemplate(),
				raw: true,
			}),
		],
	};
};
