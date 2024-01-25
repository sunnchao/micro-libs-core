// import { RollupOptions } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import del from 'rollup-plugin-delete'
import pkg from './package.json' assert { type: 'json' };

export default {
  watch: {
    include: 'src/**',
  },
  external: ['vue', 'vite', 'vue-router'],
  input: {
    index: 'src/index.ts',
    utils: 'src/utils/index.ts',
    router: 'src/router/index.ts',
  },
  output: [
    {
      format: 'esm',
      dir: 'dist/esm',
      // file: pkg.module,
      globals: {
        vue: 'Vue',
        vite: 'Vite',
        'vue-router': 'VueRouter',
      },
    },
    // {
    //   format: 'umd',
    //   exports: 'named',
    //   name: 'block-libs',
    //   dir: 'dist',
    // },
  ],
  plugins: [
    del({ targets: 'dist/*' }),
    json(),
    resolve(),
    commonjs(),
    typescript({
      useTsconfigDeclarationDir: true,
      tsconfigOverride: {
        compilerOptions: {
          declaration: true,
          declarationDir: 'dist/types',
        },
      },
    }),
    terser({
      ecma: 6,
      mangle: {
        toplevel: true,
      },
      compress: {
        passes: 2,
      },
    }),
  ],
};
