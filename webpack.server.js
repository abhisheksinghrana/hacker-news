const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');

const config = {
    // Inform webpack that we're building a bundle
    // for nodeJS, rather than for the browser
    target: 'node',

    // Tell webpack the root file of our
    // server application
    entry: './src/index.js',

    // Tell webpack where to put the output file
    // that is generated
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [
                        "@babel/preset-env",
                        "@babel/preset-react",
                        {
                            plugins: [
                                "@babel/plugin-proposal-class-properties"
                            ]
                        }
                    ]
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    'isomorphic-style-loader',
                    'css-loader',
                    'sass-loader'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(jpe?g|gif|png|svg)$/,
                use: ['file-loader']
            }
        ]
    },

    externals: [webpackNodeExternals()]
};

module.exports = config;