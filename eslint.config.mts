import antfu from '@antfu/eslint-config'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(antfu({
  formatters: true,
  vue: {
    a11y: true,
  },
  typescript: true,
}))
