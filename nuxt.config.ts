// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'url';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxt/eslint', '@nuxt/image', '@nuxtjs/stylelint-module', '@nuxt/icon', '@vueuse/nuxt'],
  icon: {
    customCollections: [
      {
        prefix: 'icon',
        dir: fileURLToPath(new URL('./app/assets/icons', import.meta.url)),
      },
    ],
  },
  css: ['~/assets/styles/fonts.scss', '~/assets/styles/global.scss'],
  alias: {
    assets: fileURLToPath(new URL('./app/assets', import.meta.url)),
    'business-modules': fileURLToPath(new URL('./app/business-modules', import.meta.url)),
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/styles/injectable.scss" as *;',
        },
      },
    },
  },
  typescript: {
    typeCheck: true,
  },
  imports: {
    autoImport: true,
    dirs: ['app/stores/**'],
  },
  runtimeConfig: {
    public: {
      apiHostInternal: 'http://localhost:3003',
    },
  },
  // image: {
  //   provider: 'direct',
  //   providers: {
  //     direct: {
  //       name: 'direct',
  //       provider: './app/providers/direct',
  //     },
  //     sv: {
  //       name: 'sv',
  //       provider: './app/providers/sv',
  //     },
  //   },
  // },
  eslint: {
    config: {
      stylistic: true,
      typescript: {
        tsconfigPath: './tsconfig.json',
      },
    },
  },
  $production: {
    nitro: {
      publicAssets: [
        // {
        //   baseURL: 'favicon.ico',
        //   dir: 'public/favicon.icon',
        //   maxAge: 2592000, // 30 days
        // },
        // {
        //   baseURL: 'fonts',
        //   dir: 'public/fonts',
        //   maxAge: 2592000, // 30 days
        // },
        // {
        //   baseURL: 'images',
        //   dir: 'public/images',
        //   maxAge: 2592000, // 30 days
        // },
        // {
        //   baseURL: 'svg',
        //   dir: 'public/svg',
        //   maxAge: 2592000, // 30 days
        // },
      ],
    },
  },
});
