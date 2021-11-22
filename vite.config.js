import { flowPlugin, esbuildFlowPlugin } from '@bunchtogether/vite-plugin-flow';

export default {
  base: '/todo/',
  port: '8000',
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
    target: 'es2020',
    format: 'esm'
  },
  css: {},
  server: {
    port: 8080,
    proxy: {
      '/api': 'http://localhost:8080'
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [esbuildFlowPlugin()]
    }
  },
  plugins: [
    flowPlugin()
  ]
}