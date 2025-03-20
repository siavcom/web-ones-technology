// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // To find hydration errors set debug to true
  debug: false,
  devtools: { enabled: false },

  devServer: {
    host: 'localhost',
    port: 3000
  },

  ssr: true,

  // target: 'static',

   imports: {
    // Auto-import pinia stores defined in `~/stores`
    dirs: ['stores', 'classes']
  },


  plugins: [
  ],

  typescript: {
    shim: false,
    strict: true,
    includeWorkspace: true,
    //typecheck: true
  },

  css: ['~/assets/css/styles.css'],

  // Linux development. To create symbolic links, directories are increased so that Vite accepts them.

  vite: {
    resolve: {
      preserveSymlinks: true,

    },
    /*
    server: {
      fs: { // Permite el acceso a los archivos del servidor
        allow: ['/siavcom/desarrollo/desarrolloweb/Vue/web-ones/'], // absolute path to web-ones directory
      },
    },
     */
    esbuild: {
      keepNames: true   // Keeps the original class and method names (doesn't obfuscate them). Don't remove it. (problem nuxt >=3.15)
    }
  },

  modules: [
    "@nuxt/image", '@vueuse/nuxt',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',],

  app: {
    head: {
      link: [
        { rel: 'icon', href: '/favicon.ico' },]
    }
  },

  // Environment variables
  runtimeConfig: {
    // The private keys which are only available server-side
    basculaServer: 'my-secret-key',
    // Keys within public are also exposed client-side
    public: {
      //  bascula: ['scaleServer.com:3010'],
      whatsAppServer: ['127.0.0.1:3011']
    },
  },

  compatibilityDate: '2024-10-02',
})
