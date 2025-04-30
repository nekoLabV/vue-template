import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

const notBuildModule = () => {
  return {
    name: 'not-build-module',
    transformIndexHtml(html: string) {
      return html.replace(` type="module" crossorigin`, '')
    }
  }
}

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        },
        entryFileNames: 'assets/template.min.js',
        chunkFileNames: 'assets/[name].js'
      }
    }
  },
  plugins: [vue(), svgLoader(), cssInjectedByJsPlugin(), notBuildModule()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'),
      '@': path.resolve(__dirname, 'src')
    },
    extensions: ['.js', '.ts', '.json', '.svg']
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://el-reg-invoicing-staging.event-lightning.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
