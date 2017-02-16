var isDevBuild = process.argv.indexOf('--env.prod') < 0;
var path = require('path');
var webpack = require('webpack');
const { AureliaPlugin, ModuleDependenciesPlugin } = require("aurelia-webpack-plugin");
const coreDeps = require("aurelia-core-dependencies");


var bundleOutputDir = './wwwroot/dist';
module.exports = {
    resolve: { 
        extensions: [ '.js', '.ts' ],
        modules: ["ClientApp", "node_modules"],
        symlinks: false,
    },
    entry: { "app": "aurelia-bootstrapper" }, // Note: The aurelia-webpack-plugin will add your app's modules to this bundle automatically
    output: {
        path: path.resolve(bundleOutputDir),
        publicPath: '/dist/',
        filename: '[name].js'
    },
    devServer: {
        contentBase: "./wwwroot",
    },
    module: {
        rules: [
            { test: /\.less$/i, use: ["style-loader", "css-loader", "less-loader"] },
            { test: /\.ts$/i, include: /ClientApp/, use: ['ts-loader']},
            { test: /\.html$/i, use: 'html-loader' },
            { test: /\.css$/i, 
                use: [ 'style-loader' ], 
                issuer: {
                   test: /\.[tj]s$/i,
                }
            },
            { test: /\.css$/i, use: [ 'css-loader' ] },
            { test: /\.scss?$/, use: [ 'css-loader',  "sass-loader"], include: /ClientApp/ },
            { test: /\.json$/i, use: 'json-loader' },
            { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
            
        ]
    },
    plugins: [
        new webpack.DefinePlugin({ IS_DEV_BUILD: JSON.stringify(isDevBuild) }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./wwwroot/dist/vendor-manifest.json')
        }),
        new AureliaPlugin({includeAll: "ClientApp" }),
        coreDeps,
        new ModuleDependenciesPlugin({
            "aurelia-grid": ["./grid","./grid.html", "./aurelia-grid.css"]
        }),
    ].concat(isDevBuild ? [
        // Plugins that apply in development builds only
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map', // Remove this line if you prefer inline source maps
            moduleFilenameTemplate: path.relative(bundleOutputDir, '[resourcePath]') // Point sourcemap entries to the original file locations on disk
        })
    ] : [
        // Plugins that apply in production builds only
        new webpack.optimize.UglifyJsPlugin()
    ])
};
