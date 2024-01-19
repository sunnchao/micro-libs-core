// import { RollupOptions } from 'rollup';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import json from 'rollup-plugin-json';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json' assert { type: 'json' };

export default {
  watch: {
    include: 'src/**',
  },
  external: ['vue', 'vite', 'vue-router'],
  input: 'src/index.ts',
  output: [
    {
      format: 'esm',
      // dir: 'dist/esm',
      file: pkg.module,
      globals: {
        vue: 'Vue',
        vite: 'vite',
        'vue-router': 'VueRouter',
      },
    },
    {
      format: 'umd',
      exports: 'named',
      name: 'block-libs',
      // dir: 'dist/umd',
      file: pkg.main,
      globals: {
        vue: 'Vue',
        vite: 'vite',
        'vue-router': 'VueRouter',
      },
      entryFileNames: (chunkInfo) => `${chunkInfo.fileName.replace(/\.js$/, '')}`,
    },
    // {
    //   format: 'cjs',
    //   dir: 'dist/cjs',
    //   globals: {
    //     vue: 'Vue',
    //   },
    // },
  ],
  plugins: [
    json(),
    resolve({
      customResolveOptions: {
        packageFilter(pkg) {
          pkg.exports = pkg.exports || pkg.main;
          return pkg;
        },
      },
    }),
    commonjs(),
    typescript({
      useTsconfigDeclarationDir: true,
      tsconfigOverride: {
        compilerOptions: {
          declaration: true,
          declarationDir: 'dist',
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
