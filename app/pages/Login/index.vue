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
        <component id="bt_aceptar" :is="impComponent(ThisForm.bt_aceptar.prop.BaseClass)" class="aceptar" Value=" "
          :Registro="0" :prop="ThisForm.bt_aceptar.prop" :style="ThisForm.bt_aceptar.style"
          :position="ThisForm.bt_aceptar.position" :imagen="ThisForm.bt_aceptar.imagen" />
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

<style scoped>
div.imagen {
  padding: 60px;
  width: 300px;
  margin: auto;
  background-color: white;
  border: 1px solid #00800040;
  border-radius: 6px;
}

.form > div{
  background-color: transparent !important;
  margin-bottom: 20px !important;
}

.form div, .form input{
  width: 100% !important;
  min-width: 100% !important;
  max-width: 100% !important;
  box-sizing: border-box !important;
}

.form .imgbutton{
  background-color: transparent !important;
  box-shadow: none !important;
  border: none !important;
  border-radius: 0 !important;
  width: 60px !important;
}

.form input{
  height: 30px !important;
  min-height: 30px !important;
  max-height: 30px !important;
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
