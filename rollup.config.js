// import { RollupOptions } from 'rollup';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import json from 'rollup-plugin-json';
import pkg from './package.json' assert { type: 'json' };

export default {
  watch: {
    include: 'src/**',
  },
  external: ['vue', 'vite'],
  input: 'src/index.ts',
  output: [
    {
      format: 'esm',
      // dir: 'dist/esm',
      file: pkg.module,
      globals: {
        vue: 'Vue',
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
      },
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
    resolve(),
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
  ],
};
