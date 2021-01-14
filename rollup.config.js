const rollupTypescript = require('@rollup/plugin-typescript');
const dts = require('rollup-plugin-dts').default;
const terser = require('rollup-plugin-terser').terser;

export default [
  {
    input: 'src/index.ts',
    plugins: [rollupTypescript(), terser()],
    output: {
      name: 'TOC',
      file: 'lib/index.umd.js',
      format: 'umd',
    },
  },
  {
    input: 'src/index.ts',
    plugins: [rollupTypescript()],
    output: {
      file: 'lib/index.esm.js',
      format: 'es',
    },
  },
  {
    input: 'src/index.ts',
    plugins: [dts()],
    output: {
      file: 'types/index.d.ts',
      format: 'es',
    },
  },
];
