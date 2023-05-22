<template>
  <form class="LoginForm">
    <div class="imagen">
      <div class="DatosUsuario">
        <!-- ref='esteComponente' los nombre no deben ser igual a <esteComponente -->

        <component
          :is="impComp(ThisForm.emp_emp.prop.BaseClass)"
          v-model:Value = "ThisForm.emp_emp.prop.Value"
          v-model:Status="ThisForm.emp_emp.prop.Status"
          v-model:ErrorMessage="ThisForm.emp_emp.prop.ErrorMessage"
          v-model:Key="ThisForm.emp_emp.prop.Key"
          v-model:Recno="ThisForm.emp_emp.Recno"
          :component="ref(ThisForm.emp_emp)"
          :Registro="0"
          :prop="ThisForm.emp_emp.prop"
          :style="ThisForm.emp_emp.style"
          :position="ThisForm.emp_emp.position"
          :db="null"
          :recno="0"
          @focusout="ThisForm.emp_emp.valid()"
        />
        <component
          :is="impComp(ThisForm.log_usu.prop.BaseClass)"
          v-model:Value="ThisForm.log_usu.prop.Value"
          v-model:Status="ThisForm.log_usu.prop.Status"
          v-model:ErrorMessage="ThisForm.log_usu.prop.ErrorMessage"
          v-model:Key="ThisForm.log_usu.prop.Key"
          v-model:Recno="ThisForm.log_usu.Recno"
          :component="ref(ThisForm.log_usu)"
          :Registro="0"
          :prop="ThisForm.log_usu.prop"
          :style="ThisForm.log_usu.style"
          :position="ThisForm.log_usu.position"
          :db="null"
          :recno="0"
          @keypress="ThisForm.log_usu.keyPress($event)"
          @focusout="ThisForm.log_usu.valid()"
        />
        <component
          :is="impComp(ThisForm.pas_usu.prop.BaseClass)"
          v-model:Value="ThisForm.pas_usu.prop.Value"
          v-model:Status="ThisForm.pas_usu.prop.Status"
          v-model:ErrorMessage="ThisForm.pas_usu.prop.ErrorMessage"
          v-model:Key="ThisForm.pas_usu.prop.Key"
          v-model:Recno="ThisForm.pas_usu.Recno"
          :component="ref(ThisForm.pas_usu)"
          :Registro="0"
          :prop="ThisForm.pas_usu.prop"
          :style="ThisForm.pas_usu.style"
          :position="ThisForm.pas_usu.position"
          :db="null"
          :recno="0"
          @focusout="ThisForm.pas_usu.valid()"
        />
        <component
          :is="impComp(ThisForm.bt_aceptar.prop.BaseClass)"
          class="aceptar"
          :component="ref(ThisForm.bt_aceptar)"
          :prop="ThisForm.bt_aceptar.prop"
          :style="ThisForm.bt_aceptar.style"
          :position="ThisForm.bt_aceptar.position"
          :imagen="ThisForm.bt_aceptar.imagen"
          @click.stop.prevent="ThisForm.bt_aceptar.Click()"
        />
      </div>
    </div>
  </form>
</template>

<script  lang="ts" setup>
/*
import {
  ref,
  reactive,
  watch,
  } from "vue";
*/
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
const emit = defineEmits(['updateStatus'])

/// //////////////////////////////////////////////////////
// watch Login
/// ///////////////////////////////////////

watch(
  () => ThisForm.prop.Login,
  (new_val, old_val) => {
    console.log('Login ', new_val)
    if (ThisForm.prop.Login) { emit('updateStatus', true) }
  },
  { deep: false }
)

// ////////////   Clase Base de datos ///////////////////////////////
const Init = new INIT() // solo se puso para evitar de errores que tenia

const init = async () => {
     await Init.Init()
    .then(async () => {
      //        ThisForm.Init(ref(ThisForm))  // Pasamos por referencia  al init de la clase el ThisForm
      await ThisForm.Init() 
    })
    .finally(async () => {
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
  /* width: auto;
  height: auto; */
}

div.imagen {
  align-content: center;
  border: 2px solid green;
  border-radius: 10px;
  padding: 60px;
  background-color: #f2f4f5;
  height: 220x;
  width: 180px;
  /* 
  background-image: url("/public/img/Logo_Empresa.png");*/
  background-image: url("/img/Logo_Empresa.png");
  /* opacity: 0.5;*/
}

div.DatosUsuario {
  opacity: 1;
  background-color: transparent;
  align-content: start;
  text-align: start;
  /*

    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

  height: 10px;
    width: 10px;
    background-image: "@/assets/favicon.ico"
  width: 300px;
  align-content: center;
  text-align: center;
  background-color: #f2f4f5;
  box-sizing: content-box;
  border-width: 2px;
  border-radius: 6px;
  border-color: black;
  padding: 5px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-content: flex-start;
*/
  /*margin-left: auto;*/
}
</style>
