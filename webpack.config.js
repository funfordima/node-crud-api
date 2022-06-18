/*jshint esversion: 6 */

import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import nodeExternals from 'webpack-node-externals';
import WebpackShellPlugin from 'webpack-shell-plugin-next';

export const getPath = (metaUrl) => dirname(fileURLToPath(metaUrl));

const {
  NODE_ENV = 'production',
} = process.env;

export default {
  entry: './src/index.ts',
  mode: NODE_ENV,
  devtool: 'eval-source-map',
  target: 'node',
  output: {
    path: resolve(getPath(import.meta.url), 'dist'),
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new WebpackShellPlugin({
      onBuildEnd: ['npm run:dev']
    })
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          'ts-loader',
        ],
        include: [resolve(getPath(import.meta.url), 'src')],
      }
    ]
  },
  externals: [nodeExternals()],
  watch: NODE_ENV === 'development',
};
