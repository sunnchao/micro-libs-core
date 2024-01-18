// 打包 cjs 和esm
// 导出 dts
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { join } from 'node:path';

export default () => {
  return defineConfig({
    build: {
      emptyOutDir: true,
      lib: {
        entry: join(process.cwd(), 'src', 'index.ts'),
        // name: pkg.name,
        formats: ['es', 'cjs'],
        fileName: (format, fileName) => `${fileName}.${format}.js`,
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          globals(name) {
            return name.toUpperCase();
          },
          dir: 'dist',
          exports: 'named',
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
