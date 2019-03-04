const { resolve } = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin');
const pagelist = require('./app/core/config/pages/pagelist');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const MODE = process.env.NODE_ENV;

const createPages = () => {
    return pagelist.pages.map(page => {
        return new HtmlWebpackPlugin({
            template: `./pages/${page}.hbs`,
            filename: `./${page}.html`
        })
    })
};

const plugins = createPages().concat([
    new MiniCssExtractPlugin({
        filename: 'app.css'
    }),
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
    }),

    new HtmlWebpackInlineSVGPlugin({
        runPreEmit: true,
    }),
    new CopyWebpackPlugin([
        { from: './assets/images/', to: 'assets/images/' },
        { from: './assets/favicons/', to: 'assets/favicons/' },
    ]),
    new webpack.HotModuleReplacementPlugin(),
    new BrowserSyncPlugin({
        proxy: 'http://localhost:8080/',
        open: false
    }),
]);



module.exports = (env, argv) => {
    return {
        module: {
            rules:  [
                {
                    test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                        }
                    }]
                },
                {
                    test: /\.(png|jpe?g|gif|svg|ico)(\?\S*)?$/,
                    include: [
                        resolve(__dirname, 'app','assets','images'),
                    ],
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]',
                    }
                },
                {
                    test: /\.hbs/,
                    use: [
                        {
                            loader: "handlebars-loader",
                            query: {
                                partialDirs: [
                                    resolve(__dirname, 'app', 'components'),
                                    resolve(__dirname,'app','core','helpers')
                                ],
                            }
                        },

                    ]
                },
                {
                    test: /\.js$/,
                    loader: 'babel-loader'
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        {
                            loader:  MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: ''
                            }
                        },
                        {
                            loader: "css-loader",
                            options: {
                                url: true,
                                context: resolve(__dirname, 'app'),
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    autoprefixer({
                                        browsers:['ie >= 8', 'last 4 version']
                                    }),
                                    require('cssnano')({
                                        preset: 'default',
                                    }),
                                ],
                            },
                        },
                        {
                            loader: "sass-loader",
                        }
                    ]
                }
            ],
        },
        context: resolve(__dirname,'app'),
        entry: {
            main: [
                '@babel/polyfill',
                './core/main.js',
                './assets/styles/main.scss'
            ],
        },
        devtool: MODE === 'development' ? 'eval' : 'source-map' ,
        plugins: plugins,
        resolve: {
            alias: {
                'images' : resolve(__dirname, 'app', 'assets', 'images'),
                'icons' : resolve(__dirname, 'app', 'assets', 'icons'),
                'fonts' : resolve(__dirname, 'app', 'assets', 'fonts')
            }
        },
        mode: MODE,
        output: {
            filename: "app.js",
            path: resolve(__dirname, 'build')
        },
        devServer: {
            inline: true,
            hot: true,
            contentBase: resolve(__dirname, 'app')
        },
    }
};