// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ['@/assets/css/styles.css'],
    typescript: { shim: false },
    modules: [
        '@pinia/nuxt',
        '@pinia-plugin-persistedstate/nuxt'
      ]
}
)
