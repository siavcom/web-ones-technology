<template>
  <div class="LoginForm">
    <div class="imagen">
      <div v-if="!mounted">
        <div class="splash-screen">
          <div class="spinner-wrapper">
            <div class="spinner">
              <p>.......... Loading Login ..........</p>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="form">
        <component id="emp_emp" :is="impComponent(ThisForm.emp_emp.prop.BaseClass)" :Registro="0"
          :Value="ThisForm.emp_emp.prop.Value" :prop="ThisForm.emp_emp.prop" :style="ThisForm.emp_emp.style"
          :position="ThisForm.emp_emp.position" />
        <component id="log_usu" :is="impComponent(ThisForm.log_usu.prop.BaseClass)" :Value="ThisForm.log_usu.prop.Value"
          :Registro="0" :prop="ThisForm.log_usu.prop" :style="ThisForm.log_usu.style"
          :position="ThisForm.log_usu.position" />
        <component id="pas_usu" :is="impComponent(ThisForm.pas_usu.prop.BaseClass)" :Value="ThisForm.pas_usu.prop.Value"
          :Registro="0" :prop="ThisForm.pas_usu.prop" :style="ThisForm.pas_usu.style"
          :position="ThisForm.pas_usu.position" />
        <component id="bt_aceptar" :is="impComponent(ThisForm.bt_aceptar.prop.BaseClass)" class="aceptar" :Registro="0"
          :prop="ThisForm.bt_aceptar.prop" :style="ThisForm.bt_aceptar.style" :position="ThisForm.bt_aceptar.position"
          :imagen="ThisForm.bt_aceptar.imagen" @click.stop="bt_aceptar" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

// the storage for this session
import { storeToRefs } from 'pinia'

// Import the principal class form
import { form } from './login'

// I make reactive the form
const ThisForm = reactive(new form())

// get the session
const session = Session()

const { id_con } = storeToRefs(session)  //pasa los elementos por referencia al Global

/// //////////////////////////////////////////////////////
// watchers 
/// ///////////////////////////////////////


// If the id_con changes
watch(
  () => id_con.value,
  (new_val, old_val) => {
    if (new_val == '')
      return
    if (new_val != old_val) {
      if (window.history.length > 1)
        window.history.back() // regresa a la pagina anterior   
    }
  },
  { deep: false }
)

const bt_aceptar = () => {
  ThisForm.bt_aceptar.click()  // call the method in the form
}

/////////////////////////////////////////
// 
/////////////////////////////////////////
const mounted = ref(false)

onBeforeMount(async () => {
  await ThisForm.Init() // Calls the Init method of thisform
  console.log('======Fin Login Form exitoso====', ThisForm)
  mounted.value = true
})


</script>

<style>
/*
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: start;
  color: #08315a;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

form.LoginForm {
  align-content: center;
  
}
*/
div.imagen {
  align-content: center;
  border: 2px solid green;
  border-radius: 10px;
  padding: 60px;
  background-color: #f2f4f5;
  width: 200px;
  background-image: url("/logos/Siavcom.png");
  /* opacity: 0.5;*/
}

/*
div.DatosUsuario {
  opacity: 1;
  background-color: transparent;
  align-content: start;
  text-align: start;

}
*/
</style>
