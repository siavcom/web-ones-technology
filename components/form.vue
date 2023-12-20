<!--   
&& ----------------------------------------------------------------------------------------------
&&              Siavcom Software S. de R.L. de C.V.
&& ----------------------------------------------------------------------------------------------
&& Autor    	: Ing. Fernando Cuadras Angulo
&& Sistema  	: Siavcom  							Version : 10.0  VUE
&& Programa 	: Forma prinncipal   		Mnemo   : form.VUE
&& Ult. mod.	: Fernando Cuadras  				Fecha   : 13/Dic/2022
&& Objeto		: VUE
&& Comentarios	: Genera la forma dinamicamente en base al ThisForm que se pasa del comeponente padre
&& ----------------------------------------------------------------------------------------------
-->
<template>
  <div id='ThisForm' v-if="ThisForm.prop.Status != 'A'">

    <div class="splash-screen">
      <div class="spinner-wrapper">
        <div class="spinner">
          <p>..Loading Data..</p>
        </div>
      </div>
    </div>

  </div>

  <transition name='Mainform'>

    <div :class="ThisForm.prop.Status != 'A' ? 'disabled' : 'Main'" v-if="ThisForm.prop.Status != 'I'">
      <section class="pagina" :style="ThisForm.style">
        <div class='backGround'>
          <!--VueForm class="cuerpo" v-bind:style="ThisForm.style" v-bind:position="ThisForm.position"-->
          <slot name="header">

            <!--template v-slot:header-->
            <h2 class="header2" float="left">

              <div class="titFor">
                <label text-align="center">{{ ThisForm.prop.textLabel }}</label>
              </div>
            </h2>
            <!--transition-group> -->
            <!-- @focusout="ThisForm.eventos.push('ThisForm.' + compHeader + '.valid()')"-->

            <div v-for="(compHeader) in ThisForm.header" :key="compHeader" :class="compHeader"
              v-show='ThisForm[compHeader].prop.Visible'>
              <component :is="impComp(ThisForm[compHeader].prop.BaseClass,'header')"
                v-bind:Component="ref(ThisForm[compHeader])" v-model:Value="ThisForm[compHeader].prop.Value"
                v-model:Status="ThisForm[compHeader].prop.Status" v-model:ShowError="ThisForm[compHeader].prop.ShowError"
                v-model:Key="ThisForm[compHeader].prop.Key" v-model:Focus="ThisForm[compHeader].Focus"
                v-bind:Registro="ThisForm[compHeader].Recno" v-bind:prop="ThisForm[compHeader].prop"
                v-bind:style="ThisForm[compHeader].style" v-bind:position="ThisForm[compHeader].position"
                @focus.capture="ThisForm.eventos.push('ThisForm.' + compHeader + '.when()')"
                @click="ThisForm.eventos.push('ThisForm.' + compHeader + '.click()')">
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
              <!--                @focusout="ThisForm.eventos.push('ThisForm.' + compMain + '.valid()')" 
                                  v-bind:Show='true'
                    v-bind:db="ref(ThisForm.db)"
emit
              -->
              <TransitionGroup name='detailForm'>
                <div v-for="(compMain) in ThisForm.main" :key="compMain" :class="compMain"
                  v-show='ThisForm[compMain].prop.Visible'>
                  <component :is="impComp(ThisForm[compMain].prop.BaseClass)" v-bind:Component="ref(ThisForm[compMain])"
                    v-model:Value="ThisForm[compMain].prop.Value" v-model:Status="ThisForm[compMain].prop.Status"
                    v-model:ShowError="ThisForm[compMain].prop.ShowError" v-model:Key="ThisForm[compMain].prop.Key"
                    v-model:Focus="ThisForm[compMain].Focus" :Registro="ThisForm[compMain].Recno"
                    v-bind:prop="ThisForm[compMain].prop" v-bind:style="ThisForm[compMain].style"
                    v-bind:position="ThisForm[compMain].position"
                    @focus.capture="ThisForm.eventos.push('ThisForm.' + compMain + '.when()')"
                    @click="ThisForm.eventos.push('ThisForm.' + compMain + '.click()')"></component>
                </div>
              </TransitionGroup>
            </slot>
          </section>

          <!--/template-->
          <!--template v-slot:footer
               src="/Iconos/BotonRojo.png"
    ThisForm.prop.Status == 'A'
    -->
          <section class="footer">
            <!--Transition tag='div' -->
            <img class='circle' :src="ThisForm.prop.Status == 'A' ? '/Iconos/circle-green.svg' : '/Iconos/circle-red.svg'"
              style="float:left" />
            <!--/Transition-->
            <slot name="footer">
              <!--                 @focusout="ThisForm.eventos.push('ThisForm.' + compFooter + '.valid()')" 
              v-bind:db="ref(ThisForm.db)"
              
              -->

              <div v-for="(compFooter) in ThisForm.footer" :class="compFooter" v-show='ThisForm[compFooter].prop.Visible'>
                <!--div v-for="(obj, compFooter,key) in ThisForm" :key="obj.Index"-->
                <component :is="impComp(ThisForm[compFooter].prop.BaseClass,'footer')"
                  v-bind:Component="ref(ThisForm[compFooter])" v-model:Value="ThisForm[compFooter].prop.Value"
                  v-model:Status="ThisForm[compFooter].prop.Status"
                  v-model:ShowError="ThisForm[compFooter].prop.ShowError" v-model:Key="ThisForm[compFooter].prop.Key"
                  v-model:Focus="ThisForm[compFooter].Focus" v-bind:Registro="ThisForm[compFooter].Recno"
                  v-bind:prop="ThisForm[compFooter].prop" v-bind:style="ThisForm[compFooter].style"
                  v-bind:position="ThisForm[compFooter].position"
                  @focus.capture="ThisForm.eventos.push('ThisForm.' + compFooter + '.when()')"
                  @click="ThisForm.eventos.push('ThisForm.' + compFooter + '.click()')"></component>
                <!--@click.stop.prevent-->
              </div>
            </slot>

            <div class="salir" @click='clickSalir()'>

              <img class='img' src="/Iconos/exit4-color.svg" style="float:right"
                :style="{ 'word-wrap': 'break-word', 'font-size': '13px', 'color': 'green', 'width': '60px' }" />

            </div>

            <div class='login' v-if="user != '' && id_con == '' && nom_emp != ''">
              <!--teleport to="#modal"-->User:{{ user }} Password:
              <input type="password" v-model.trim="password" @focusout="pass = password">
              <!--/teleport-->
            </div>

          </section>

          <!--/template-->
          <!--/VueForm-->
        </div>
      </section>
    </div>



  </transition>
</template>

<script  lang="ts" setup>
/*

            <TransitionGroup tag='div' >
              <div v-if="ThisForm.prop.Status == 'A'" key='green'>
                <!--svg width="100" height="100">
                  <circle cx="50" cy="50" r="8" stroke="green" stroke-width="4" fill="green" />
                </svg-->

                <img class='circle' :src="ThisForm.prop.Status == 'A'? '/Iconos/circle-green.svg' :'/Iconos/circle-red.svg'" style="float:left" />
              </div>
              <div v-else key="red">
                <!--svg width="100" height="100">
                  <circle cx="50" cy="50" r="8" stroke="red" stroke-width="4" fill="red" />
                </svg-->

                <img class='circle' src="/Iconos/circle-red.svg" style="float:left" />
              </div>
            </TransitionGroup>




*/
/*
definePageMeta({
  //layout: 'default',
 
  keepalive: true,

  //keepalive: {
  //  exclude: ['modal']
  //},

})
*/

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

import { storeToRefs } from 'pinia'
import { INIT } from "@/classes/Init";

const session = Session()
const { id_con, url, dialect, nom_emp, user, fpo_pge, pass } = storeToRefs(session)

//const This: any = getCurrentInstance();
//const ThisCtx = This.ctx;
//const showModal=ref(false)
/////////////////////////////////////////////////
// Componentes
/////////////////////////////////////////////////

//const imgButton = resolveComponent('imgButton')
const imgButton = defineAsyncComponent(() =>
  import('@/components/imgButton.vue'))


//const comboBox = resolveComponent('comboBox')
const comboBox = defineAsyncComponent(() =>
  import('@/components/comboBox.vue'))


//const editText = resolveComponent('editText')
const editText = defineAsyncComponent(() =>
  import('@/components/editText.vue')
)


//const textLabel = resolveComponent('textLabel')
const textLabel = defineAsyncComponent(() =>
  import('@/components/textLabel.vue')
)


//const grid = resolveComponent('grid')
const grid = defineAsyncComponent(() =>
  import('@/components/grid.vue')
)

//const browse = resolveComponent('browse')

//const browseLite = resolveComponent('browseLite')
const browseLite = defineAsyncComponent(() =>
  import('@/components/browseLite.vue')
)


//const container = resolveComponent('container')
const container = defineAsyncComponent(() =>
  import('@/components/container.vue')
)


//const embedPdf = resolveComponent('embedPdf')
const embedPdf = defineAsyncComponent(() =>
  import('@/components/embedPdf.vue')
)

/////////////////////////////////////////
// Componentes dinamicos
// https://vuejs.org/guide/components/async.html#basic-usage
//////////////////////////////

/////////////////////////////////////////
// Manejo de errores personalizados 
/////////////////////////////////////////
/*
// desde cualquier parte de la aplicacion
if (!data.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
}


// Manejador de errores 
export default eventHandler(() => {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page Not Found'
  })
}



*/


///////////////////////////////////////
// Propiedades del componente .
//  Obtiene ThisForm  base desde Main.vue en cada directorio de cada pagina 
////////////////////////////////////
const emit = defineEmits(["updateIsOpen"])
const props = defineProps<{
  ThisForm: null;
}>();
const ThisForm = reactive(new props.ThisForm)


/*
let sw_session=true
let intento=0
do {
  try{
    const { id_con, url, dialect, nom_emp, user, fpo_pge, pass } = storeToRefs(session)
    sw_session=false
  } catch {
    intento++
    console.log('Esperando cargar session intento',intento)
  }

} while (sw_session)

*/

//pasa los elementos por referencia al Global

const password = ref('')
ThisForm.user = user.value
ThisForm.nom_emp = nom_emp.value
ThisForm.fpo_pge = fpo_pge.value


const loading = ref(true)



// asigna por referencia un Value de un objeto reactivo. Con toRefs hace todas las variables reactivas a referencia
//export const nom_nom_value = toRef(vi_lla1_nom[0], 'nom_nom')

//ThisThisForm.refs.fea_nom.Value=ahora;
//console.log('Fecha ahora ====>',ThisThisForm.refs.fea_nom.Value);

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
async function eje_eve_old(numero: number) {
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

      // LLamamos el evento a ejecutar en forma sincrona
      // Necesitamos pasar por referencia el ThisForm


      //      waitEval(ThisForm.eventos[0], ref(ThisForm)).

      const evento = ThisForm.eventos[0]

      ThisForm.eventos[0] = 'A'
      // ejecutamos el evento 
      waitEval(evento, ref(ThisForm))

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
  })/*
    .
    then(() => {
      // borramos el evento

      const new_arr = []
      // No incluimos el evento 0
      let num_eve = 0
      if (ThisForm.eventos.length > 1) {
        for (let i = 0; i < ThisForm.eventos.length; i++) {
          if (ThisForm.eventos[i] !='XXXXX' && ThisForm.eventos[i].length > 0) {
            new_arr[num_eve] = ThisForm.eventos[i]
            num_eve++
            console.log('borramos eventos. Anexamos Evento ', ThisForm.eventos[i], ThisForm.eventos[i].length)

          }
        }
      }
      ThisForm.eventos = [...new_arr]
      if (ThisForm.eventos.length == 0)
        ThisForm.prop.Status = 'A'

      console.log('############Evento terminado ############ ', evento, ThisForm.prop.Status, ThisForm.eventos.length, ThisForm.eventos)

    }) */
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

        console.log('watch ThisForm.eventos comp. ', comp, 'estatus=', ThisForm.estatus[comp])
        return
      }
    }
    if (ThisForm.eventos[0] != 'XXXXX' && ThisForm.eventos[0] > '') {
      const evento = ThisForm.eventos[0]
      ThisForm.eventos[0] = 'XXXXX'
      if (evento > '') {
        console.log('Comienza watch ThisForm.eventos===>>> ', evento)

        await waitEval(evento)
        console.log('Borrara evento watch ThisForm.eventos===>>> ', evento)

        // borramos el evento
        const new_arr = []
        let num_eve = 0
        if (ThisForm.eventos.length > 1) {
          for (let i = 0; i < ThisForm.eventos.length; i++) {
            if (ThisForm.eventos[i] != 'XXXXX' && ThisForm.eventos[i].length > 0) {
              new_arr[num_eve] = ThisForm.eventos[i]
              num_eve++
              console.log('borramos eventos. Anexamos Evento ', ThisForm.eventos[i], ThisForm.eventos[i].length)

            }
          }
        }
        ThisForm.eventos = [...new_arr]
        if (ThisForm.eventos.length == 0)
          ThisForm.prop.Status = 'A'

        console.log('############Evento terminado ############ ', evento, ThisForm.prop.Status, ThisForm.eventos.length, ThisForm.eventos)

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
        ThisForm.prop.Status = 'P'
        return
      }
    }

    console.log('Form watch status ', ThisForm.eventos[0])

    if (ThisForm.eventos[0] != 'XXXXX' && ThisForm.eventos[0] > '') {
      if (ThisForm.eventos[0] > '') {
        const evento = ThisForm.eventos[0]
        ThisForm.eventos[0] = 'XXXXX'
        if (evento > '') {
          await waitEval(evento)

        }
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

const clickSalir = async () => {
  if (await MessageBox("Salimos de la forma", 4, '') == 6) {
    window.history.back()
    // window.close() // cierra la forma history.back(); // regresa forma anterior
  }
}






const nextFocus = async ($event) => {
  let nextElement = $event.explicitOriginalTarget.nextSibling
  console.log('Edit nextElement ', nextElement)

  while (nextElement && nextElement.tagName != 'INPUT') {

    nextElement = nextElement.nextSibling
    console.log('Edit nextElement', nextElement)

  }
  if (nextElement)
    nextElement.focus()

  console.log('Edit ', nextElement)

}




const Init = new INIT();  // solo se puso para evitar de errores que tenia 

const init = async () => {
  // await ThisForm.init()
  // try {


  await Init.Init()
    .then(() => {
    })
    .finally(async () => {

      for (const componente in ThisForm) {
        if (ThisForm[componente] !== undefined && ThisForm[componente] !== null) {

          if (
            ThisForm[componente].prop &&       // Si tiene propiedades
            ThisForm[componente].prop.Capture &&  // Si es componente de captura
            ThisForm[componente].prop.Capture == true
          ) {
            //console.log('Form asigna ref a componente=',componente)
            // if (ThisForm[componente].Ref)
            // console.log('RefHtml===>', componente, ThisForm[componente].Ref.$el)
            ThisForm.estatus[componente] = toRef(ThisForm[componente].prop, "Status"); // stack de estatus de componentes

          }
        }

      }

      //console.warn(router.query.params)
      //console.warn(router.currentRoute[query])

      await ThisForm.Init()  // Se enlaza al Init Principal de la Forma base
      /*
          for (const i in ThisForm.elements) {
            const comp = ThisForm.elements[i].Name
            console.log('Vue Form',ThisForm.Name,' Component',comp)
            ThisForm.estatus[comp] = toRef(ThisForm[comp].prop, "Status"); // stack de estatus de componentes
    
          }
          */
    });
  emit('updateIsOpen', true)
  /* }
   catch (error) {
     console.log('Error al inicializa la forma ', error)
   }
 */
  console.log('ThisForm Finish Update  ', ThisForm)
  loading.value = false
  await ThisForm.afterMounted()

}
await init()


//var result = x === true ? "passed" : "failed";


//const vi_cap_comedat = computed(() => Views.value.vi_cap_comedat ? Views.value.vi_cap_comedat.recnoVal : [])
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
// '@/components/' + name + '.vue')


const impComp = ((name: string, pos?: string) => {

  //return eval(name)

  switch (name.toLowerCase().trim()) {
    case 'edittext': {
      // console.log('Importo edittext')
      return editText
      break;
    }
    case 'combobox': {
      return comboBox
      break;
    }
    case 'grid': {
      return grid
      break;
    }

    case 'imgbutton': {
      return imgButton
      break;
    }

    case 'browse': {
      //console.log('Importo Browse')
      return browseLite
      break;
    }

    case 'browselite': {

      // console.log('Importo BrowseLite')
      return browseLite
      break;
    }

    case 'textlabel': {
      return textLabel
      break
    }
    case 'container': {
      return container
      break
    }


    case 'embedpdf': {

      return embedPdf
      //return defineAsyncComponent(() => import('@/components/comboBox.vue'))  //import('@/components/${name}.vue'))

      break
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


.Mainform-enter-active,
.Mainform-leave-active {
  transition: opacity 1s ease;
}

.Mainform-enter-from,
.Mainform-leave-to {
  opacity: 0;
}

.detail-form-enter-active,
.detail-form-leave-active {
  transition: all 1.5s ease;
}

.detail-form-enter-from,
.detail-form-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.detailForm2-transition-group {
  transition: all 0.5s ease;
}

/*
div.contenedor {
  background: white;
  color: #b94295;
  min-width: 375px;
  min-height: 812px;
  background-image: "/logos/Logo_Empresa.png";
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
  border: #dcede5 3px solid;
  z-index: 999;
  /*    opacity: 1;*/
}

img.logoEmp {
  float: right;

  /*border: 1px solid #ddd;*/
  padding: 1px;
  width: 64px;
}

img.circle {
  width: 18px;
}

section.footer {
  display: flex;
  /*  flex;*/
  /*flex-direction: column; */
  align-items: last baseline;
  /*center;*/
  justify-content: space-around;
  /*width: 100%;*/
  height: fit-content;
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


.disabled {
  pointer-events: none;
  opacity: 0.4;
}

/* Spinner   
.splash-screen {
   background: #f2f0ee;
    width: 60vw;
    height: 60vh;
  position: fixed;
  z-index: 50;    
}

.spinner-wrapper {
  position: absolute;
  left: 50%;
  top: 50%;

  transform: translate(-50%, -50%);
}
.spinner {
  width: 80px;
  height: 80px;
  margin: 100px auto;
  background-color: #e45447;

  border-radius: 100%;
  -webkit-animation: sk-scaleout 1s infinite ease-in-out;
  animation: sk-scaleout 1s infinite ease-in-out;
}

@-webkit-keyframes sk-scaleout {
  0% {
    -webkit-transform: scale(0);
  }
  100% {
    -webkit-transform: scale(1);
    opacity: 0;
  }
}

@keyframes sk-scaleout {
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 0;
  }
}

*/
</style>