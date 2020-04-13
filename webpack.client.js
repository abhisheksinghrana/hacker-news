const path = require('path');

const config = {
    // Tell webpack the root file of our
    // server application
    entry: './src/client/index.js',

    // Tell webpack where to put the output file
    // that is generated
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
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
                    'style-loader',
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
    }
};

module.exports = config;