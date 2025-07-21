# manual PACKAGE instalation 
#!/bin/bash

##################################################
# instala nuxt 3.17.5
# npm install nuxt@^3.17.5   
##################################################
npm i pinia
npm i pinia-plugin-persistedstate
npm i @pinia/nuxt

npx nuxi@latest module add vueuse
npm i @vueuse/nuxt @vueuse/core @nuxt/kit @vueuse/integrations

npx nuxi@latest module add image

npm i axios
npm i alasql 
npm i vue-sweetalert2

npm i buffer
npm i nuxt-socket-io

npm audit fix --force

npm i file-saver

npm i maska

npm i qrcode
npm i @point-of-sale/receipt-printer-encoder
npm i @zip.js/zip.js

npm i xlsx
## da un problema high y el npm audit fix no lo puede arreglar


# WARN deprecated glob@7.2.3: Glob versions prior to v9 are no longer supported dont'use
# don use memory leak inflight@1.0.6
# Todavia se dice que nes mejor axios. Hay que cambiar el axios y utilizar fetch de nuxt  en ves de  @nuxt/http and @nuxtjs/axios?

#    "xlsx": "https://cdn.sheetjs.com/xlsx-0.19.3/xlsx-0.19.3.tgz"

# checar npm i jszip porque @zip.js/zip.js esta fuera de uso
