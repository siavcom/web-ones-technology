// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Configuracion para debug 
  build: {
    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
      }
    }
  },
  plugins:[
  ],
  
  typescript: { shim: false },
  css: ['@/assets/css/styles.css'],
  /*
  css: ['@/assets/css/styles.css','vuetify/styles'],
  build: {
    transpile: ['vuetify'],
  },
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },
   */
    modules: [
        '@pinia/nuxt',
        '@pinia-plugin-persistedstate/nuxt'
 
      ],
      piniaPersistedstate: {
        cookieOptions: {
          sameSite: 'strict',
        },
        storage: 'localStorage'
      }
  }  
)
