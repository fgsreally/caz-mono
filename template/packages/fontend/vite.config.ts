import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import Vue from '@vitejs/plugin-vue'
import VueMacros from 'unplugin-vue-macros/vite'
import UnoCSS from 'unocss/vite'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import ReactivityTransform from '@vue-macros/reactivity-transform/vite'
import PC from 'phecda-client/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import Inspect from 'vite-plugin-inspect'
import Pages from 'vite-plugin-pages'
import VueI18n from '@intlify/vite-plugin-vue-i18n'
import { VitePluginFonts } from 'vite-plugin-fonts'
import legacy from '@vitejs/plugin-legacy'
import Layouts from 'vite-plugin-vue-layouts'
// https://vitejs.dev/config/
export default defineConfig(({mode})=>({
  define: {
    'process.env.NODE_ENV': mode==='serve'?"''":"'production'",
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3699',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [
    legacy({
      modernPolyfills: ['es.string.replace-all'],
      renderLegacyChunks: false,
    }),
    VitePluginFonts({
      google: {
        families: [
          'Inter:wght@400;500;600;700;800',
          'Roboto+Mono:wght@400;500',
          'Material+Icons',
        ],
      },
    }),
    Layouts({
      layoutsDirs: './src/views/layout',
      defaultLayout: 'default',
    }),
    Pages({
      routeStyle: 'nuxt',
      dirs: './src/pages',
      importMode: 'async',

    }),
    VueI18n({
      runtimeOnly: false,
      compositionOnly: true,
      include: [resolve(__dirname, 'locales')],
    }),
    Icons({ compiler: 'vue3' }),
    Inspect(),
    PC({
      localPath: '../server/pmeta.js',
      port: ' http://localhost:3699/',
    }),
    VueMacros({
      setupBlock: true,
      plugins: {
        vue: Vue({
          reactivityTransform: true,
        }),
      },
    }),
    AutoImport({
      dirs: ['./src/utils','./src/composables'],
      imports: ['vue', 'vue-router', {
        'phecda-vue': ['useV', 'useR'],
        'axios': [['default', 'axios']],
      }],
      resolvers: [
      ],
    }),
    Components({
      dirs: ['./src/components', './src/views'],
      resolvers: [
        IconsResolver({
        })],
    }),
    ReactivityTransform(),
    UnoCSS(),

  ],
}))
