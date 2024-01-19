// 打包 cjs 和esm
// 导出 dts
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { join } from 'node:path';

export default () => {
  return defineConfig({
    build: {
      // emptyOutDir: true,
      lib: {
        entry: join(process.cwd(), 'src', 'index.ts'),
        // name: pkg.name,
        // formats: ['es', 'cjs'],
        // fileName: (format, fileName) => {
        //   console.log(fileName, format);
        //   return `${fileName}.${format}.js`
        // },
      },
      rollupOptions: {
        external: ['vue'],
        output: [
          {
            globals(name) {
              return name.toUpperCase();
            },
            dir: 'dist',
            format: 'esm',
            entryFileNames: (name) => {
              return `${name.name}.esm.js`;
            },
          },
          {
            globals(name) {
              return name.toUpperCase();
            },
            dir: 'dist',
            exports: 'named',
            name: 'block-lib',
            format: 'umd',
            entryFileNames: (name) => {
              return `${name.name}.umd.js`;
            },
          },
          {
            // cjs
            globals(name) {
              return name.toUpperCase();
            },
            dir: 'dist',
            format: 'cjs',
            exports: 'named',
            entryFileNames: (name) => {
              return `${name.name}.cjs.js`;
            },
          },
        ],
        input: {
          index: join(process.cwd(), 'src', 'index.ts'),
        },
      },
      // sourcemap: true,
    },
    plugins: [
      dts({
        outDir: 'dist',
        include: ['./src/**/*.{ts,tsx}'],
        exclude: ['node_modules', 'dist/**'],
      }),
    ],
  });
};
