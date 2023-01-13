<!--   
&& ----------------------------------------------------------------------------------------------
&&              Siavcom Software S. de R.L. de C.V.
&& ----------------------------------------------------------------------------------------------
&& Autor    	: Ing. Fernando Cuadras Angulo
&& Sistema  	: Siavcom  							Version : 10.0  VUE
&& Programa 	: Forma prinncipal   		Mnemo   : form.VUE
&& Ult. mod.	: Fernando Cuadras  				Fecha   : 13/Dic/2022
&& Evento		: 
&& Objeto		: VUE
&& Comentarios	: Genera la forma dinamicamente en base al THISFORM que se pasa del comeponente padre
&& ----------------------------------------------------------------------------------------------
-->
<template>
  <form class="Main">
  <section class="pagina" :style="ThisForm.style">
    <div class='backGround'>
      <!--VueForm class="cuerpo" v-bind:style="ThisForm.style" v-bind:position="ThisForm.position"-->
      <slot name="header">

        <!--template v-slot:header-->
        <header class="header" float="left">
          <img class="logoVue" src="@/assets/logo.png" contain />
          <img class="logoEmp" src="/Iconos/Logo_Empresa.png" contain />
          <div class="nemPge">
            <label text-align="left">{{ ThisForm.db.nem_pge }}</label>
          </div>
          <div class="fpoPge">
            <label type="date" text-align="center">{{ ThisForm.prop.fpo_pge + ' ' + ThisForm.prop.Name }}</label>
          </div>
          <div class="titFor">
            <label text-align="center">{{ ThisForm.prop.textLabel }}</label>
          </div>
        </header>
        <div v-for="(compHeader) in ThisForm.header">

          <component v-if="ThisForm[compHeader].prop && ThisForm[compHeader].prop.Position == 'header'"
            :is="impComp(ThisForm[compHeader].prop.BaseClass)" v-bind:Component="ref(ThisForm[compHeader])"
            v-model:Value="ThisForm[compHeader].prop.Value" v-model:Status="ThisForm[compHeader].prop.Status"
            v-model:ShowError="ThisForm[compHeader].prop.ShowError" v-model:Key="ThisForm[compHeader].prop.Key"
            v-model:Focus="ThisForm[compHeader].Focus" v-model:Recno="ThisForm[compHeader].Recno"
            v-bind:Registro="ThisForm[compHeader].Recno == null ? 0 : ThisForm[compHeader].Recno"
            v-bind:prop="ThisForm[compHeader].prop" v-bind:style="ThisForm[compHeader].style"
            v-bind:position="ThisForm[compHeader].position"
            @focusout="ThisForm.eventos.push('ThisForm.' + compHeader + '.valid()')"
            @focus.capture="ThisForm.eventos.push('ThisForm.' + compHeader + '.when()')">
          </component>
        </div>

      </slot>
      <!--/template-->
      <!--template v-slot:main-->
      <!-- Despliega todo los componentes de la forma  
      && comp!='grid_datos'
      -->
      <section class="main">
        <slot name="main">

          <!-- @focus.capture -->

          <div v-for="(compMain) in ThisForm.main">
            <component :is="impComp(ThisForm[compMain].prop.BaseClass)" v-bind:Component="ref(ThisForm[compMain])"
              v-model:Value="ThisForm[compMain].prop.Value" v-model:Status="ThisForm[compMain].prop.Status"
              v-model:ShowError="ThisForm[compMain].prop.ShowError" v-model:Key="ThisForm[compMain].prop.Key"
              v-model:Focus="ThisForm[compMain].Focus" v-model:Recno="ThisForm[compMain].Recno"
              v-bind:Registro="ThisForm[compMain].Recno == null ? 0 : ThisForm[compMain].Recno"
              v-bind:prop="ThisForm[compMain].prop" v-bind:style="ThisForm[compMain].style"
              v-bind:position="ThisForm[compMain].position" v-bind:db="ref(ThisForm.db)"
              @focusout="ThisForm.eventos.push('ThisForm.' + compMain + '.valid()')"
              @focus.capture="ThisForm.eventos.push('ThisForm.' + compMain + '.when()')"
              @click="ThisForm.eventos.push('ThisForm.' + compMain + '.click()')"></component>
          </div>

        </slot>
      </section>

      <!--/template-->
      <!--template v-slot:footer
               src="/Iconos/BotonRojo.png"
    ThisForm.prop.Status == 'A'
    -->
      <section class="footer">
        <div v-show="ThisForm.prop.Status == 'A'">
          <img src="/Iconos/BotonVerde.png" style="float:left" />
        </div>
        <div v-show="ThisForm.prop.Status != 'A'">
          <img class='botonRojo' src="/Iconos/Stop_arrows.gif" style="float:left" />
        </div>
        <slot name="footer">


          <div v-for="(compFooter) in ThisForm.footer">
            <!--div v-for="(obj, compFooter,key) in ThisForm" :key="obj.Index"-->
            <component :is="impComp(ThisForm[compFooter].prop.BaseClass)" v-bind:Component="ref(ThisForm[compFooter])"
              v-model:Value="ThisForm[compFooter].prop.Value" v-model:Status="ThisForm[compFooter].prop.Status"
              v-model:ShowError="ThisForm[compFooter].prop.ShowError" v-model:Key="ThisForm[compFooter].prop.Key"
              v-model:Focus="ThisForm[compFooter].Focus" v-model:Recno="ThisForm[compFooter].Recno" v-bind:Registro="ThisForm[compFooter].Recno == null ? 0 :
              ThisForm[compFooter].Recno" v-bind:prop="ThisForm[compFooter].prop"
              v-bind:style="ThisForm[compFooter].style" v-bind:position="ThisForm[compFooter].position"
              v-bind:db="ref(ThisForm.db)" @focusout="ThisForm.eventos.push('ThisForm.' + compFooter + '.valid()')"
              @focus.capture="ThisForm.eventos.push('ThisForm.' + compFooter + '.when()')"
              @click.stop.prevent="ThisForm.eventos.push('ThisForm.' + compFooter + '.click()')"></component>
          </div>
        </slot>
      </section>

      <!--/template-->
      <!--/VueForm-->
    </div>
  </section>

  <!--teleport to="#modal"  >
      <laLogUsu
        v-model:Value="ThisForm.la_log_usu.prop.Value"
        v-bind:prop="ThisForm.la_log_usu.prop"
        v-bind:style="ThisForm.la_log_usu.style"
        v-bind:position="ThisForm.la_log_usu.position"
      />
      <pasUsu
        v-model:Value="ThisForm.pas_usu.prop.Value"
        v-model:Status="ThisForm.pas_usu.prop.Status"
        v-model:ErrorMessage="ThisForm.pas_usu.prop.ErrorMessage"
        v-bind:prop="ThisForm.pas_usu.prop"
        v-bind:style="ThisForm.pas_usu.style"
        v-bind:position="ThisForm.pas_usu.position"
        @focusout="ThisForm.pas_usu.valid()"
 
      />
  </teleport-->
</form>
</template>

<script  lang="ts" setup>
//   @click.stop.prevent="push_eve('ThisForm.btAceptar.click()')"

//   @keypress ="ThisForm.nom_tab.keyPress($event)"   llamar el keypress
//.stop.prevent

/*
import {
  nextTick,
  ref,
  toRef,
  reactive,
  computed,
  //  onMounted,
  //  onUpdated,
  //  onUnmounted,
  watch,
  //  isRef,
  //  isReactive,
  //  isReadonly,
  //  isProxy,
  // inject,
  // provide,
  //getCurrentInstance,
  defineAsyncComponent,
  //defineProps,
} from "vue";
*/
import { INIT } from "@/classes/Init";
//const This: any = getCurrentInstance();
//const ThisCtx = This.ctx;
//const showModal=ref(false)
/////////////////////////////////////////////////
// Componentes
/////////////////////////////////////////////////

import imgButton from "@/components/imgButton.vue"
import comboBox from "@/components/comboBox.vue"
import editText from "@/components/editText.vue"

import textLabel from "@/components/textLabel.vue"
import grid from "@/components/grid.vue"
// import grid from "/components/GridScrollStatic.vue"
// import grid from "/components/gridVirtualList.vue"  Dejo de utilizar el item mode
//import grid from "/components/GridScrollInfinite.vue"
//import grid from "/components/VirtualScrollGrid.vue"
/////////////////////////////////////////
// Componentes dinamicos
// https://vuejs.org/guide/components/async.html#basic-usage
//////////////////////////////


//const editText = defineAsyncComponent(() =>
  //import('@/components/editText.vue')
//)


/////////////////////////////////////////
// Programa base en typeScript
/////////////////////////////////////////

//import { THISFORM } from '/src/views/come9101/ThisForm.ts'
///////////////////////////////////////
// Propiedades del componente .
//  Obtiene ThisForm  base desde Main.vue en cada directorio de cada pagina 
////////////////////////////////////
const emit = defineEmits(["updateIsOpen"])
const props = defineProps<{
  THISFORM: null;
}>();

const ThisForm = reactive(new props.THISFORM);
//var num_eve = 0
//var eventos=[]

//const refe = reactive({})

//const estatus = reactive({}); //estatus de proceso de cada componente actualizable de la base de datos
//const eventos = reactive([]);  // pila de eventos a ejecutar en forma sincrona



// asigna por referencia un Value de un objeto reactivo. Con toRefs hace todas las variables reactivas a referencia
//export const nom_nom_value = toRef(vi_lla1_nom[0], 'nom_nom')

//ThisThisForm.refs.fea_nom.Value=ahora;
//console.log('Fecha ahora ====>',ThisThisForm.refs.fea_nom.Value);

function mouseleave() {
  alert("¡Has sacado el ratón del botón!");
}
function beforeUpdate() {
  console.log("¡Antes de actualizar en padre!");
}

function sleep(sleepDuration: number) {
  const now = new Date().getTime();
  while (new Date().getTime() < now + sleepDuration) {
    /* Do nothing */
  }
}

////////////////////////////////////////////
// Metodos propios
////////////////////////////////////////////
/////////////////////////////////////////////////////
// Ejecuta los eventos que hay en la pila de eventos
async function eje_eve(numero: number) {
  try {
    //console.log('Entra a eje_eve', ThisForm.eventos[0])


    if (ThisForm.eventos.length > 0) {
      // corremos el stack de eventos a ejecutar
      for (const nom_com in ThisForm.estatus) { //
        // console.log('eje_eve estaus ', nom_com, ThisForm.estatus[nom_com])
        if (ThisForm.estatus[nom_com] != "A") return; // Si el estatus del componente esta en Proceso se sale
      }

      ThisForm.prop.Status = 'P'  // Prende el foco rojo mientras ejecuta cada evento
      // Wait for eval wrapper


      const waitEval = (evento: string, form) => {
        return new Promise((resolve, reject) => {
          // Se tiene que pasar por referencia donde esta el ThisForm 

          const ThisForm = form.value //ya que se trabajo solo en ambiente local
          console.log('<<<============Iniciamos evento=========>>> ', evento, ThisForm.eventos)

          resolve(eval(evento))
          reject((error) => {
            console.error('Hubo error al ejecutar evento', error)
          })
        }).
          then(() => {
            // borramos el evento

            const new_arr = []
            // No incluimos el evento 0
            let num_eve = 0
            if (ThisForm.eventos.length > 1) {
              for (let i = 0; i < ThisForm.eventos.length; i++) {
                if (ThisForm.eventos[i].length > 0) {
                  new_arr[num_eve] = ThisForm.eventos[i]
                  num_eve++
                  console.log('ejeEvento eventos ', evento, ThisForm.eventos[i], ThisForm.eventos[i].length)

                }
              }
            }
            ThisForm.eventos = [...new_arr]
            if (ThisForm.eventos.length == 0)
              ThisForm.prop.Status = 'A'

            console.log('############Evento terminado ############ ', evento, ThisForm.prop.Status, ThisForm.eventos.length, ThisForm.eventos)

          });
      }

      /*
          const waitFn = (fn, form) => {
      
            // Wait for new Function wrapper
            //const waitFn = (ev) => {
            // new Function('resolve', ev)(resolve); // si no se le pone el return el scope es local
            console.log('ThisForm promise===>', ThisForm)
            return new Promise((resolve, reject) => {
              return new Function('resolve', ` return ${fn}`)(resolve);
            });
          };
         */


      // LLamamos el evento a ejecutar en forma sincrona
      // Necesitamos pasar por referencia el ThisForm


      //      waitEval(ThisForm.eventos[0], ref(ThisForm)).

      const evento = ThisForm.eventos[0]

      ThisForm.eventos[0] = 'A'
      // ejecutamos el evento 
      waitEval(evento, ref(ThisForm))
      /*
      .
        then(() => {
        
 
          //   nextTick()
        }).
        finally(() => {

        })
        */
      //  console.log('Stack de eventos', ThisForm.eventos)  // borramos el evento


    }

  }
  catch (error) {
    console.log('Error al ejecutar evento ', error)
  }
}



const waitEval = async (evento: string) => {
  return new Promise((resolve, reject) => {
    // Se tiene que pasar por referencia donde esta el ThisForm 

    //const ThisForm = form.value //ya que se trabajo solo en ambiente local
    console.log('<<<============Iniciamos evento=========>>> ', evento, ThisForm.eventos)

    resolve(eval(evento))
    reject((error) => {
      console.error('Hubo error al ejecutar evento', error)
    })
  }).
    then(() => {
      // borramos el evento

      const new_arr = []
      // No incluimos el evento 0
      let num_eve = 0
      if (ThisForm.eventos.length > 1) {
        for (let i = 0; i < ThisForm.eventos.length; i++) {
          if (ThisForm.eventos[i].length > 0) {
            new_arr[num_eve] = ThisForm.eventos[i]
            num_eve++
            console.log('ejeEvento eventos ', evento, ThisForm.eventos[i], ThisForm.eventos[i].length)

          }
        }
      }
      ThisForm.eventos = [...new_arr]
      if (ThisForm.eventos.length == 0)
        ThisForm.prop.Status = 'A'

      console.log('############Evento terminado ############ ', evento, ThisForm.prop.Status, ThisForm.eventos.length, ThisForm.eventos)

    });
}






////////////////////////////////
// revisa los eventos que hay a ejecutar, en caso que hay una estatus de un componente
// no ejecuta el evento
/////////////////////////////////
watch(
  () => ThisForm.eventos,
  async (new_val, old_val) => {

    if (ThisForm.eventos.length == 0) {
      ThisForm.prop.Status = 'A'
      return
    }

    for (const comp in ThisForm.estatus) {
      if (ThisForm.estatus[comp] != 'A') {
        return
      }

      if (ThisForm.eventos[0] > '') {
        const evento = ThisForm.eventos[0]
        ThisForm.eventos[0] = ''
        if (evento > '')
          await waitEval(evento)
        //await eje_eve(evento)
      }
    }
  }, { deep: true }
);


//////////////////////////////////////////////
// revisa los estatus de todos los componentes
watch(
  () => ThisForm.estatus,
  async (new_val, old_val) => {
    console.log('<=======Watch estatus eje_eve=======>')

    for (const comp in ThisForm.estatus) {
      //  console.log('Watch estatus ===>', comp, ThisForm.estatus[comp])

      if (ThisForm.estatus[comp] != 'A') {
        return
      }
    }
    if (ThisForm.eventos.length > 0 && ThisForm.eventos[0] != '') {
      if (ThisForm.eventos[0] > '') {
        const evento = ThisForm.eventos[0]
        ThisForm.eventos[0] = ''
        if (evento > '')
          await waitEval(evento)
        //await eje_eve(evento)
      }
      // eje_eve(2)
    }

  },
  { deep: true }
);


//////////////////////////////////////////////
// revisa los estatus del grid de datos
/*
watch(
  () => grid_datos,
  (new_val, old_val) => {
    for (const comp in grid_datos) {
      //      console.log('Watch grid_datos  ===>', comp, grid_datos[comp])

      if (grid_datos[comp] != 'A') {
        ThisForm.estatus.grid_datos = 'P'
        //      console.log('Watch grid_datos.estatus ===>', estatus.grid_datos)

        return
      }
    }
    ThisForm.estatus.grid_datos = 'A'
  },
  { deep: true }
);



*/
const Init = new INIT();  // solo se puso para evitar de errores que tenia 

const init = async () => {
  try {
    console.log('Comenzamos====>', ThisForm.prop.Name)
    await Init.Init()
      .then(() => {
      })
      .finally(async () => {
        console.log('No hubo error')


        console.log('ThisForm init ThisForm', ThisForm)
        for (const componente in ThisForm) {
          
          if (ThisForm[componente]!== undefined ) {
            console.log('ThisForm init componente ', componente)
            if (
              ThisForm[componente].prop &&       // Si tiene propiedades
              ThisForm[componente].prop.Capture &&  // Si es componente de captura
              ThisForm[componente].prop.Capture == true
            ) {
              // if (ThisForm[componente].Ref)
              // console.log('RefHtml===>', componente, ThisForm[componente].Ref.$el)
              ThisForm.estatus[componente] = toRef(ThisForm[componente].prop, "Status"); // stack de estatus de componentes

            }
          }

        }
        console.log("Inicio exitoso ====>", ThisForm)  //ThisForm,
        await ThisForm.Init()  // Se enlaza al Init Principal de la Forma base

      });
    emit('updateIsOpen', true)
  }
  catch (error) {
    console.log('Error al inicializa la forma ', error)
  }

}

init()

//var result = x === true ? "passed" : "failed";


//const vi_cap_dat = computed(() => Views.value.vi_cap_dat ? Views.value.vi_cap_dat.recnoVal : [])
/*
const sub_total = computed(() => items.reduce((acc, item) => acc += item.qty * item.price, 0))
 
const total = computed(() => sub_total.value * (1 + tax_percent / 100) + shipping)
 
const valor_computed = computed((ref_com,recno) => ThisForm.db.readAla(ref_com.value.ControlSource,recno) )
 
const computed_key= (recno) => {
  console.log('Computed key',recno)
if (recno>0 ) return recno
else return 0} 
*/

////////////////////////////////////

//const editText =computed(()  => defineAsyncComponent(() => import('@/components/editText.vue')))

//const view = computed(() => defineAsyncComponent(() => import(`/src/components/${state.view}.vue`)))
//const view = computed(() => defineAsyncComponent(() => import(`/src/components/${state.view}.vue`)))
//const editText=defineAsyncComponent(() => import('@/components/editText.vue'))  //import('@/components/${name}.vue'))
//const editText=() => import('@/components/editText.vue')  //import('@/components/${name}.vue'))


//////////////////////////////////////
//  Importa componentes dinamicos
////////////////////////////////////// 
const impComp = ((name: string) => {
  switch (name) {
    case 'editText': {
      //      return defineAsyncComponent(() => import('@/components/editText.vue'))  //import('@/components/${name}.vue'))
      return editText
      break;
    }
    case 'comboBox': {
      return comboBox
      //return defineAsyncComponent(() => import('@/components/comboBox.vue'))  //import('@/components/${name}.vue'))
      break;
    }
    case 'grid': {
      return grid
      //return defineAsyncComponent(() => import('@/components/comboBox.vue'))  //import('@/components/${name}.vue'))
      break;
    }

    case 'imgButton': {
      return imgButton
      //return defineAsyncComponent(() => import('@/components/comboBox.vue'))  //import('@/components/${name}.vue'))
      break;
    }



    default: {
      return editText
      //return defineAsyncComponent(() => import('@/components/editText.vue'))  //import('@/components/${name}.vue'))
      break;
    }
  }

  //    return defineAsyncComponent(() => import('@/components/editText.vue'))  //import('@/components/${name}.vue'))
})



//init();
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #08315a;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

/*
div.contenedor {
  background: white;
  color: #b94295;
  min-width: 375px;
  min-height: 812px;
  background-image: "/img/Logo_Empresa.bmp";
  margin-top: 30%;

}
*/
header {
  color: #9ef1a5;
  height: 75px;
  border: black;
  border-width: 1px;
  padding: 0 10x;
}

img.logoVue {
  float: left;
  /*  border: 1px solid #ddd;*/
  padding: 1px;
  width: 55px;
}

div.nemPge {
  float: left;
  width: 20%;
  color: #42b960;
  font-size: 11px;
  font-family: Arial;
  text-align: left;
}

div.titFor {
  float: center;
  color: #42b960;
  font-size: 18px;
  font-family: Arial;
  width: 65%;
}

div.fpoPge {
  float: right;
  width: 70px;
  color: #42b960;
  font-size: 11px;
  font-family: Arial;
}

.modal {
  width: 300px;
  margin: 0px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px 3px;
  transition: all 0.2s ease-in;
  font-family: Helvetica, Arial, sans-serif;
  /*z-index: 999;*/
}

.fadeIn-enter {
  opacity: 0;
}

.fadeIn-leave-active {
  opacity: 0;
  transition: all 0.2s step-end;
}

.fadeIn-enter .modal,
.fadeIn-leave-active.modal {
  transform: scale(1.1);
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #00000094;
  z-index: 999;
  transition: opacity 0.2s ease;
}

div.password {
  font-family: myriad-pro, sans-serif;
  position: fixed;
  top: 20%;

  width: max-content;
  height: max-content;
  padding: 30px;
  background-color: #fff;
  border-radius: 20px;
  border: #42b960 3px solid;
  z-index: 999;
  /*    opacity: 1;*/
}

img.logoEmp {
  float: right;

  /*border: 1px solid #ddd;*/
  padding: 1px;
  width: 64px;
}

section.footer {
  display: flex;
  /*  flex;*/
  /*flex-direction: column; */
  align-items: last baseline;
  /*center;*/
  justify-content: space-around;
  /*width: 100%;*/
  height: 90px;
  background-color: #c8e0ce;
  border: 1px solid rgb(0, 0, 0);
  border-radius: 6px;
  z-index: 0;
  /*flex-direction: row-reverse; */
}

section.main {
  /*display: flex;*/
  /*  flex;*/
  /*flex-direction: column; */
  /*align-items: left; */
  /*center;*/
  /*justify-content: space-around;
   width: 100%;
   height: 100%;
  */
  text-align: left;
  background-color: #f2f4ef;
  /*border: 1px solid rgb(0, 0, 0);
  border-radius: 6px; */
  z-index: 1;
}

img.bt_salir {
  background-color: rgb(255, 255, 255);
  box-shadow: 0 4px 8px 0, 0 6px 20px 0;
  box-sizing: border-box;
  /* width: 80px;*/
  height: auto;
  border-radius: 10%;
  padding: 5px;
  /*align-self: flex-end;*/
  /*position: absolute; /*"relative,static,absolute,sticky,fixed*/
  /* float: inline-end /**/
}

/* Tooltip container */
.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
  /* If you want dots under the hoverable text */
}

/* Tooltip text */
.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: #555;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;

  /* Position the tooltip text */
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -60px;

  /* Fade in tooltip */
  opacity: 0;
  transition: opacity 0.3s;
}

/* Tooltip arrow */
.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}
</style>
