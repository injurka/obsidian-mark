import antfu from '@antfu/eslint-config'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  antfu({
    formatters: true,
    ignores: [
      '**/.nuxt/**',
      '**/.output/**',
      '**/.vitestcache/**',
      '**/e2e-**/**',
      '**/content/**',
      '**/public/**',
      '**/node_modules/**',
    ],
  }),
)
