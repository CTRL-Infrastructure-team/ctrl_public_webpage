export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  ssr: true,
  css: ['~/assets/scss/main.scss'],
  modules: ['@element-plus/nuxt'],
  elementPlus: {
    importStyle: 'css'
  },
  runtimeConfig: {
    sessionSecret: '',
    discordUrl: '',
    senderEmailAddress: '',
    senderEmailPassword: '',
    dataDir: '',
    public: {
      twitterImage: process.env.WHOIS_IMG || ''
    }
  },
  app: {
    head: {
      titleTemplate: '%sコンピュータ技術研究会 CTRL',
      htmlAttrs: { lang: 'ja' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: 'コンピュータ技術研究会のホームページです。'
        },
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
        { hid: 'twitter:site', name: 'twitter:site', content: '@tcuctrl' },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: '東京都市大学 コンピュータ技術研究会'
        }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/35__.png' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap'
        }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: (content: string, filename: string) => {
            if (filename.includes('variable.scss')) return content
            return `@use "~/assets/scss/variable.scss" as *;\n${content}`
          }
        }
      }
    }
  },
  nitro: {
    externals: {
      external: ['@prisma/client', 'bcrypt']
    }
  }
})
