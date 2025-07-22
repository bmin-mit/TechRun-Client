// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/image', '@nuxt/ui', '@pinia/nuxt'],
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  app: {
    head: {
      title: 'Tech Run 2025',
      meta: [
        { name: 'description', content: 'Website theo dõi tiến độ Tech Run 2025 của Chiến dịch Hoa Phượng Đỏ PTNK' },
      ],
    },
  },
  eslint: {
    config: {
      standalone: false,
    },
  },
})
