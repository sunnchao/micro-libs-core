// 打包 cjs 和esm
// 导出 dts
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import pkg from './package.json';

export default () => {
  return defineConfig({
    build: {
      emptyOutDir: true,
      lib: {
        entry: 'index.ts',
        name: pkg.name,
        formats: ['es', 'cjs'],
        fileName: (format) => `index.${format}.js`,
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          globals: {
            vue: 'Vue',
          },
          dir: 'dist'
        },
      },
    },
    plugins: [
      dts({
        outDir: 'dist',
        include: ['./**/*.{ts,tsx}'],
        exclude: ['node_modules/**', 'dist/**'],
      }),
    ],
  });
};
