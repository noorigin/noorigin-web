import path from 'path'

import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import { phenomicLoader } from 'phenomic'
import PhenomicLoaderFeedWebpackPlugin
  from 'phenomic/lib/loader-feed-webpack-plugin'
import PhenomicLoaderSitemapWebpackPlugin
  from 'phenomic/lib/loader-sitemap-webpack-plugin'
import pkg from './package.json'

export default (config = {}) => {

  // hot loading for postcss config
  // until this is officially supported
  // https://github.com/postcss/postcss-loader/issues/66
  const postcssPluginFile = require.resolve('./postcss.config.js')
  const postcssPlugins = webpackInstance => {
    webpackInstance.addDependency(postcssPluginFile)
    delete require.cache[postcssPluginFile]
    return require(postcssPluginFile)(config)
  }

  return {
    ...config.dev && {
      devtool: '#cheap-module-eval-source-map',
    },
    module: {
      noParse: /\.min\.js/,
      rules: [
        // *.md => consumed via phenomic special webpack loader
        // allow to generate collection and rss feed.
        {
          // phenomic requirement
          test: /\.(md|markdown)$/,
          use: [
            {
              loader: phenomicLoader,
              options: {
                context: path.join(__dirname, config.source),
                // see https://phenomic.io/docs/usage/plugins/
                plugins: [
                  ...require('phenomic/lib/loader-preset-markdown').default,
                  // Custom loader for component embed via .md content files
                  require(
                    path.join(__dirname, 'loaders', 'transform-embed-tags')),
                ],
              },
            },
          ],
        },

        // *.json => like in node, return json
        // (not handled by webpack by default)
        {
          test: /\.json$/,
          use: [{ loader: 'json-loader' }],
        },

        // *.js => babel + eslint
        {
          test: /\.js$/,
          include: [
            path.resolve(__dirname, 'scripts'),
            path.resolve(__dirname, 'src'),
          ],
          use: [
            { loader: 'babel-loader', options: { cacheDirectory: true } },
            { loader: 'eslint-loader', options: { emitWarning: !!config.dev } },
          ],
        },

        // some deps return untranspiled code.
        {
          test: /\.js$/,
          include: [
            path.resolve(__dirname, 'node_modules/react-icons'),
          ],
          use: [{ loader: 'babel-loader' }],
        },

        // ! \\
        // by default *.css files are considered as CSS Modules
        // And *.global.css are considered as global (normal) CSS

        // *.css => CSS Modules
        {
          test: /\.css$/,
          exclude: /\.global\.css$/,
          include: path.resolve(__dirname, 'src'),
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  localIdentName: (
                    config.production
                    ? '[hash:base64:5]'
                    : '[path][name]--[local]--[hash:base64:5]'
                  ),
                },
              },
              { loader: 'postcss-loader' },
            ],
          }),
        },

        // *.global.css => global (normal) css
        {
          test: /\.global\.css$/,
          include: path.resolve(__dirname, 'src'),
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              { loader: 'css-loader' },
              { loader: 'postcss-loader' },
            ],
          }),
        },

        {
          test: /\.css$/,
          include: path.resolve(__dirname, 'node_modules'),
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              { loader: 'css-loader' },
              { loader: 'postcss-loader' },
            ],
          }),
        },

        // copy assets and return generated path in js
        {
          test: /\.(html|ico|jpe?g|png|gif|eot|otf|webp|ttf|woff|woff2)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[path][name].[hash].[ext]',
                context: path.join(__dirname, config.source),
              },
            },
          ],
        },

        // svg as raw string to be inlined
        {
          test: /\.svg$/,
          include: path.resolve(__dirname, 'src'),
          use: [{ loader: 'raw-loader' }],
        },
      ],
    },

    plugins: [
      // You should be able to remove the block below when the following
      // issue has been correctly handled (and postcss-loader supports
      // "plugins" option directly in query, see postcss-loader usage above)
      // https://github.com/postcss/postcss-loader/issues/99
      new webpack.LoaderOptionsPlugin({
        test: /\.css$/,
        options: {
          postcss: postcssPlugins,
          // required to avoid issue css-loader?modules
          // this is normally the default value, but when we use
          // LoaderOptionsPlugin, we must specify it again, otherwise,
          // context is missing (and css modules names can be broken)!
          context: __dirname,
        },
      }),

      new PhenomicLoaderFeedWebpackPlugin({
        // here you define generic metadata for your feed
        feedsOptions: {
          title: pkg.name,
          site_url: pkg.homepage,
        },
        feeds: {
          // here we define one feed, but you can generate multiple, based
          // on different filters
          'feed.xml': {
            collectionOptions: {
              filter: { layout: 'Post' },
              sort: 'date',
              reverse: true,
              limit: 20,
            },
          },
        },
      }),

      new PhenomicLoaderSitemapWebpackPlugin({
        site_url: pkg.homepage,
      }),

      new ExtractTextPlugin({
        filename: '[name].[hash].css',
        disable: config.dev,
      }),

      ...config.production && [
        new webpack.optimize.UglifyJsPlugin(
          { compress: { warnings: false } }
        ),
      ],
    ],

    output: {
      path: path.join(__dirname, config.destination),
      publicPath: config.baseUrl.pathname,
      filename: '[name].[hash].js',
    },

    resolve: { extensions: [ '.js', '.json' ] },
  }
}
