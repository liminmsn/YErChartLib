import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import { visualizer } from 'rollup-plugin-visualizer';

const isProduction = process.env.NODE_ENV === 'production';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/chart-library.js',
      format: 'cjs',
      sourcemap: !isProduction
    },
    {
      file: 'dist/chart-library.esm.js',
      format: 'es',
      sourcemap: !isProduction
    },
    {
      file: 'dist/chart-library.umd.js',
      format: 'umd',
      name: 'ChartLibrary',
      sourcemap: !isProduction
    }
  ],
  plugins: [
    nodeResolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      exclude: ['test/**', 'examples/**'],
      tslib: 'tslib'
    }),
    isProduction && terser(),
    visualizer({
      filename: 'bundle-analysis.html',
      open: !isProduction && process.env.ANALYZE === 'true'
    })
  ].filter(Boolean)
};