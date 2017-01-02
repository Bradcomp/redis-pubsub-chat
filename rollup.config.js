'use strict';

import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';

export default {
  entry: 'client/app.js',
  dest: 'public/js/app.js',
  plugins: [
    nodeResolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    commonjs({
      include: 'node_modules/**'
    }),
    babel(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('dev')
    })
  ]
}
