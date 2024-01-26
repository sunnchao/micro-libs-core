// import { RollupOptions } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import del from 'rollup-plugin-delete';
import pkg from './package.json' assert { type: 'json' };
import fs from 'fs';
import path from 'path';

// 自动读取src 子目录
function getFolders(srcPath) {
  return fs
    .readdirSync(srcPath)
    .filter((file) => fs.statSync(path.join(srcPath, file)).isDirectory());
}

function createInputObject(folders, srcPath) {
  const input = {};
  // 检索是否包含index.ts

  folders
    .filter((folder) => {
      return fs.existsSync(path.join(srcPath, folder, 'index.ts'));
    })
    .forEach((folder) => {
      input[folder] = path.join(srcPath, folder, 'index.ts');
    });
  return input;
}

const srcPath = 'src';
const folders = getFolders(srcPath);
const input = createInputObject(folders, srcPath);

// ESM 配置
const esmConfig = {
  watch: {
    include: 'src/**',
  },
  input: input,
  external: Object.keys(pkg.dependencies),
  output: {
    dir: 'dist',
    format: 'esm',
    sourcemap: true,
    entryFileNames: '[name]/index.esm.js',
  },
  plugins: [
    typescript(),
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

// UMD 配置
const umdConfig = {
  watch: {
    include: 'src/**',
  },
  input: 'src/index.ts',
  external: Object.keys(pkg.dependencies),
  output: {
    // file: 'dist/index.umd.js',
    dir: 'dist',
    format: 'umd',
    name: 'BlockLib',
    sourcemap: true,
    globals: {
      // 例如，如果你的库依赖于 Vue
      vue: 'Vue',
      'vue-router': 'VueRouter',
    },
    entryFileNames: 'index.umd.js',
  },
  plugins: [
    typescript(),
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

export default [esmConfig, umdConfig];

// export default () => {
//   return {
//     watch: {
//       include: 'src/**',
//     },
//     external: Object.keys(pkg.dependencies),
//     input: input,
//     output: [
//       {
//         format: 'esm',
//         dir: 'dist',
//         // file: pkg.module,
//         globals: {
//           vue: 'Vue',
//           vite: 'Vite',
//           'vue-router': 'VueRouter',
//         },
//         // 目录
//         entryFileNames: (chunkInfo) => {
//           // 使用 chunkInfo.name 来决定不同入口点的输出文件名
//           if (chunkInfo.name) {
//             return `${chunkInfo.name}/index.esm.js`;
//           }
//           return '[name].js'; // 默认情况
//         },
//       },
//       // {
//       //   format: 'umd',
//       //   exports: 'named',
//       //   name: 'block-libs',
//       //   dir: 'dist',
//       // },
//     ],
//     plugins: [
//       del({ targets: 'dist/*' }),
//       json(),
//       resolve(),
//       commonjs(),
//       typescript({
//         // useTsconfigDeclarationDir: true,
//         // tsconfigOverride: {
//         //   compilerOptions: {
//         //     declaration: true,
//         //     declarationDir: 'dist/types',
//         //   },
//         // },
//       }),
//       terser({
//         ecma: 6,
//         mangle: {
//           toplevel: true,
//         },
//         compress: {
//           passes: 2,
//         },
//       }),
//     ],
//   };
// };
