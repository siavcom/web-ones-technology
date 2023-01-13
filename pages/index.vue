<template>
  <div class="Main">
    <img class="logoVue" src="@/assets/logo.png" contain>
    <div>
      AMAZING WEB SOFTWARE BY
    </div>
    <div class="imagen" />
    <div>
      <span>Made with</span>
    </div>
    <div>
      <span>WEB-ONES technologies</span>
    </div>
    <div>
      VUE front-end Framework and SQL Db.
    </div>

    <div>
      <a href="https://github.com/siavcom/web-ones-technology">front-end git-hub </a>
    </div>
    <div>
      <a href="https://github.com/siavcom/VFP-NODE">back-end git-hub</a>
    </div>
    <div>
      <a href="http://www.siavcom.com.mx">http://www.siavcom.com.mx</a>
    </div>
  </div>
</template>

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
  background-image: url("/public/img/Logo_Empresa.png");*/
  background-image: url("/Iconos/Logo_Empresa.png");
  /* opacity: 0.5;*/

  background-position: center;
  background-size: 100% 100%;
  height: 100px;
  width: 160px;
}
</style>
