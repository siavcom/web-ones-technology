<template>
  <div class="Main">
    <!--img class="logoVue" src="@/assets/logo.png" contain-->
    <div>
      AMAZING WEB SOFTWARE BY
    </div>
    <div class="imagen" />
    <div>
      <span>Made with Vue {{ VueVersion }} and Nuxt {{ NuxtVersion }}</span>
    </div>

    <div>
      Open Source Web-Ones Technology Framework developed with :
    </div>

    <div>
      <a href="https://vuejs.org/">VUE 3,</a>
    </div>
    <div>
      <a href="https://nuxt.com/">NUXT 3 for front-end Framework,</a>
    </div>
    <div>
      <a href="https://nodejs.org/en/">NODE,</a>

    </div>
    <div>
      <a href="http://expressjs.com/">EXPRESS for back-end </a>

    </div>
    <div>
      and
    </div>
    <div>
      Postgres or MSSQL as DataBase
    </div>
    <div>
      VUE/NUXT npm Packages:
    </div>
    <div>
      <a href="https://www.npmjs.com/package/@zip.js/zip.js/v/2.6.3">zip.js,</a>
      <a>zip.js is an open-source library (BSD-3-Clause license) for zipping and unzipping files in the browser and
        Deno</a>
    </div>
    <div> <a href="https://www.npmjs.com/package/alasql">alasql, </a>
      <a href="https://github.com/alasql/alasql/blob/HEAD/LICENSE">MIT licence information, </a>
    </div>
    <div> <a href="https://www.npmjs.com/package/axios">axios,</a>
    </div>
    <div> <a href="https://www.npmjs.com/package/file-saver/v/1.3.2">file-saver, </a>
    </div>
    <div> <a href="https://www.npmjs.com/package/pinia/v/0.5.2"> pinia, </a>
    </div>
    <div> <a href="https://www.npmjs.com/package/vue-sweetalert2">vue-sweetalert2,</a>
    </div>
    <div> <a href="https://www.npmjs.com/package/vue3-table-lite">vue3-table-lite,</a>
    </div>
    <div> <a href="https://beholdr.github.io/maska/v3">maska,</a>
    </div>
    <div> <a href="https://www.npmjs.com/package/xlsx">xlsx,</a>
    </div>
    <div> <a href="https://www.npmjs.com/package/whatsapp-web.js?activeTab=readme">whatsapp-web.js </a>
      <a href="http://www.apache.org/licenses/LICENSE-2.0."> Licensed under the Apache License, Version 2.0, </a>

    </div>
    <div> <a href="https://github.com/siavcom/web-ones-technology">front-end git-hub, </a>
    </div>
    <div> <a href="https://github.com/siavcom/VFP-NODE">back-end git-hub,</a>
    </div>
    <div> <a href="http://www.siavcom.com.mx">ERP Siavcom</a>
    </div>
    <div>
      NODE/Express npm Packages:
    </div>
    <div>
      <a href="https://sequelize.org/">sequelize</a>
    </div>
    <div>
      <a href="https://socket.io/">Socket.IO</a>
    </div>
    <div>
      <a href="https://sourceforge.net/projects/jasperreports/">Jasper reports library</a>
    </div>
    <div>
      <a href="https://www.npmjs.com/package/node-jasper-report">node jasper</a>
    </div>


  </div>
</template>

<script setup lang="ts">
import { version } from 'vue';
const VueVersion = ref(version)
const NuxtVersion = ref(3.14)

console.log('Vue Version', version);
</script>


<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #08315a;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}


div.imagen {
  align-content: center;
  border: 2px solid green;
  border-radius: 10px;
  padding: 60px;
  background-color: #d5f5b5;
  /*height: 220x;
    width: 220px;
  se quita el directorio /public
  background-image: url("/img/ Logo_Empresa.bmp");
  */
  background-image: url("/logos/Siavcom.png");
  /* opacity: 0.5;*/

  background-position: center;
  background-size: 100% 100%;
  height: 100px;
  width: 160px;
}
</style>
