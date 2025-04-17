import process from 'node:process'

export default defineNuxtConfig({
  ssr: true,

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
    '/assets/scss/fonts.scss',
    '/assets/scss/global.scss',
    '/assets/scss/normalize.scss',
  ],

  runtimeConfig: {
    public: {
      staticBaseUrl: 'http://localhost:5173',
    },
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import '~/assets/scss/_setup.scss';
          `,
          logger: {
            warn(message: any, options: any) {
              const { stderr } = process
              const span = options.span ?? undefined
              const stack = (options.stack === 'null' ? undefined : options.stack) ?? undefined

              const isExludedError = JSON.stringify(span.text).includes('assets/scss/_setup.scss')
              if (isExludedError)
                return

              if (options.deprecation) {
                if (message?.startsWith('Using / for division outside of calc() is deprecated')) {
                  // silences above deprecation warning
                  return
                }
                stderr.write('DEPRECATION ')
              }
              stderr.write(`WARNING: ${message}\n`)

              if (span !== undefined) {
                // output the snippet that is causing this warning
                stderr.write(`\n"${span.text}"\n`)
              }

              if (stack !== undefined) {
                // indent each line of the stack
                stderr.write(`    ${stack.toString().trimEnd().replace(/\n/g, '\n    ')}\n`)
              }

              stderr.write('\n')
            },
          },
          api: 'modern-compiler',
        },
      },
    },
  },

  devtools: { enabled: true },
  compatibilityDate: '2024-11-01',
})
