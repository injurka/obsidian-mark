export default defineNuxtConfig({
  ssr: true,

  imports: {
    autoImport: true,
    dirs: [
      './shared/composables',
    ],
  },

  components: {
    //
  },

  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
  },

  devServer: {
    port: 5173,
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxtjs/color-mode',
    'vuetify-nuxt-module',
    '@pinia/nuxt',
  ],

  colorMode: {
    preference: 'light',
    fallback: 'light',
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '-mode',
    storageKey: 'nuxt-color-mode',
    dataValue: 'theme',
  },

  fonts: {
    priority: ['google', 'local'],
    providers: {
      fontshare: false,
      adobe: false,
      bunny: false,
      fontsource: false,
      googleicons: false,
    },
    devtools: true,
  },

  eslint: {
    config: {
      standalone: false,
    },
  },

  css: [
    '/assets/scss/global.scss',
    '/assets/scss/normalize.scss',
  ],

  runtimeConfig: {
    public: {
      staticBaseUrl: 'http://localhost:5173/content/',
    },
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import '~/assets/scss/_setup.scss';
          `,
          api: 'modern-compiler',
        },
      },
    },
  },

  devtools: { enabled: true },
  compatibilityDate: '2024-11-01',
})
