// plugins/vuetify.ts

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'


export default defineNuxtPlugin(nuxtApp => {
    const vuetify = createVuetify({
        ssr: true,
        components,
        directives,
        // your config will come here
    })

    nuxtApp.vueApp.use(vuetify)
})