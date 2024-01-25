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
      dir: 'dist',
      // file: pkg.module,
      globals: {
        vue: 'Vue',
        vite: 'Vite',
        'vue-router': 'VueRouter',
      },
      // 目录
      entryFileNames: (chunkInfo) => {
        // 使用 chunkInfo.name 来决定不同入口点的输出文件名
        switch (chunkInfo.name) {
          case 'index':
            return 'index.js';
          case 'utils':
            return 'utils/utils.js';
          case 'router':
            return 'router/router.js';
          default:
            return '[name].js'; // 默认情况
        }
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
      // useTsconfigDeclarationDir: true,
      // tsconfigOverride: {
      //   compilerOptions: {
      //     declaration: true,
      //     declarationDir: 'dist/types',
      //   },
      // },
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
