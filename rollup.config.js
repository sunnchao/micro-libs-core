// import { Plugin, RollupOptions } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import clear from 'rollup-plugin-clear';
// @ts-ignore
import pkg from './package.json' assert { type: 'json' };
import fs from 'node:fs';
import path from 'node:path';

import babel from '@rollup/plugin-babel';
import alias from '@rollup/plugin-alias';
import vue from 'rollup-plugin-vue';
// 处理css文件插件
import postcss from 'rollup-plugin-postcss';
// 处理JSX
import vueJsx from '@vitejs/plugin-vue-jsx';

// 自动读取src 子目录
function getFolders(srcPath) {
  return fs.readdirSync(srcPath).filter((file) => fs.statSync(path.join(srcPath, file)).isDirectory());
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
const esmConfig = (_plugins) => {
  return {
    watch: {
      clearScreen: false,
      include: 'src/**/*',
    },
    input: input,
    external: [...Object.keys(pkg.dependencies), 'vue', 'vue-router'],
    output: {
      dir: 'dist',
      format: 'esm',
      sourcemap: true,
      entryFileNames: '[name]/index.esm.js',
    },
    plugins: _plugins,
    globals: {
      vue: 'Vue',
      'vue-router': 'vueRouter',
    },
  };
};

// UMD 配置
const umdConfig = (_plugins) => {
  return {
    watch: {
      clearScreen: false,
      include: 'src/**',
    },
    input: 'src/index.ts',
    external: [...Object.keys(pkg.dependencies), 'vue', 'vue-router'],
    output: {
      // file: 'dist/index.umd.js',
      dir: 'dist',
      format: 'umd',
      name: 'BlockLib',
      sourcemap: true,
      entryFileNames: 'index.umd.js',
    },
    plugins: _plugins,
    globals: {
      vue: 'Vue',
      'vue-router': 'vueRouter',
    },
    exports: 'named',
  };
};

export default () => {
  const _plugins = [
    alias({
      entries: [
        {
          find: '@/',
          replacement: path.resolve(process.cwd(), 'src/'),
        },
      ],
    }),
    clear({
      targets: ['dist/*'], // 将要清空的目录或文件
      force: true, // 强制清空目标，即使它们不是由 Rollup 创建的
    }),
    json(),
    nodeResolve(),
    vue(),
    commonjs(),
    postcss(),
    vueJsx(),
    typescript({
      tsconfigOverride: {
        compilerOptions: { declaration: true },
      },
    }),
    babel({
      babelHelpers: 'bundled',
    }),
    terser({
      ecma: 2020,
      mangle: {
        toplevel: true,
      },
      compress: {
        passes: 2,
      },
    }),
  ];

  return [esmConfig(_plugins), umdConfig(_plugins)];
};
