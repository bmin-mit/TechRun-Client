// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/image', '@nuxt/ui', '@pinia/nuxt'],
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ]
  },
  app: {
    head: {
      title: 'Trò Chơi Địa Điểm',
      meta: [
        { name: 'description', content: 'Website theo dõi tiến độ trò chơi địa điểm' }
      ]
    }
  }
})