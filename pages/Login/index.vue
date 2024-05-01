<template>
  <div class="LoginForm">
    <div class="imagen">
      <div v-if="ThisForm.prop.Status != 'A'">
        <div class="splash-screen">
          <div class="spinner-wrapper">
            <div class="spinner">
              <p>.......... Loading Login ..........</p>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="prose w-full max-w-2xl h-9">
        <component id="emp_emp" :is="impComp(ThisForm.emp_emp.prop.BaseClass)" :Registro="0"
          :prop="ThisForm.emp_emp.prop" :style="ThisForm.emp_emp.style" :position="ThisForm.emp_emp.position" />
        <component id="log_usu" :is="impComp(ThisForm.log_usu.prop.BaseClass)"
          v-model:Status="ThisForm.log_usu.prop.Status" :component="ref(ThisForm.log_usu)" :Registro="0"
          :prop="ThisForm.log_usu.prop" :style="ThisForm.log_usu.style" :position="ThisForm.log_usu.position" />
        <component id="pas_usu" :is="impComp(ThisForm.pas_usu.prop.BaseClass)"
          v-model:Value="ThisForm.pas_usu.prop.Value" v-model:Status="ThisForm.pas_usu.prop.Status"
          :component="ref(ThisForm.pas_usu)" :Registro="0" :prop="ThisForm.pas_usu.prop" :style="ThisForm.pas_usu.style"
          :position="ThisForm.pas_usu.position" />
        <component id="bt_aceptar" :is="impComp(ThisForm.bt_aceptar.prop.BaseClass)" class="aceptar" :Registro="0"
          :component="ref(ThisForm.bt_aceptar)" :prop="ThisForm.bt_aceptar.prop" :style="ThisForm.bt_aceptar.style"
          :position="ThisForm.bt_aceptar.position" :imagen="ThisForm.bt_aceptar.imagen" @click.stop="bt_aceptar" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
/*
import {
  ref,
  reactive,
  watch,
  } from "vue";
*/

import { storeToRefs } from 'pinia'
// ///////////////////////////////////////////////
// Componentes
// ///////////////////////////////////////////////
import imgButton from '@/components/imgButton.vue'
import comboBox from '@/components/comboBox.vue'
import editText from '@/components/editText.vue'
// import textLabel from '@/components/textLabel.vue'


// ////////////////////////////////////////////
// Clases Externas typescript
// ////////////////////////////////////////////


import { INIT } from '@/classes/Init'
import { form } from './login'

// ////////////////////////////////////////////////
// Propiedades de los componentes
// Arbol de componentes de ThisForm segun Vfp //
//

// const This: any = getCurrentInstance()
// const ThisCtx = This.ctx

const ThisForm = reactive(new form())
//const emit = defineEmits(['updateStatus'])



const session = Session()
//const { data } = await useAsyncData('id', () => session.id_con)

const { id_con } = storeToRefs(session)  //pasa los elementos por referencia al Global

/// //////////////////////////////////////////////////////
// watch id
/// ///////////////////////////////////////

watch(
  () => id_con.value,
  (new_val, old_val) => {
    if (new_val == '')
      return
    if (new_val != old_val)
      window.history.back() // regresa a la pagina anterior   


  },
  { deep: false }
)

const bt_aceptar = () => {
  ThisForm.bt_aceptar.click()
}

// ////////////   Clase Base de datos ///////////////////////////////
const Init = new INIT() // solo se puso para evitar de errores que tenia

const init = async () => {

  await Init.Init()
    .then(async () => {
      //        ThisForm.Init(ref(ThisForm))  // Pasamos por referencia  al init de la clase el ThisForm
      await ThisForm.Init()
    })
    .finally(async () => {
      ThisForm.Status = 'A'
      console.log('Fin Login Form exitoso', ThisForm)
    })
}

init()

/// ///////////////////////////////////
//  Importa componentes dinamicos
/// ///////////////////////////////////
const impComp = (name: string) => {
  switch (name) {
    case 'editText': {
      //      return defineAsyncComponent(() => import('@/components/editText.vue'))  //import('@/components/${name}.vue'))
      return editText
      break
    }
    case 'comboBox': {
      return comboBox
      // return defineAsyncComponent(() => import('@/components/comboBox.vue'))  //import('@/components/${name}.vue'))
      break
    }


    case 'imgButton': {
      return imgButton
      // return defineAsyncComponent(() => import('@/components/comboBox.vue'))  //import('@/components/${name}.vue'))
      break
    }

    default: {
      return editText
      // return defineAsyncComponent(() => import('@/components/editText.vue'))  //import('@/components/${name}.vue'))
      break
    }
  }

  //    return defineAsyncComponent(() => import('@/components/editText.vue'))  //import('@/components/${name}.vue'))
}

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
  height: 220x;
  width: 180px;

  background-image: url("/logos/Logo_Empresa.png");
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
