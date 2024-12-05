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
  <!--header :style="{ 'display': 'inlineBlock' }"-->
  <div id='LoadingData' v-if="!mounted">

    <div class="splash-screen">
      <div class="spinner-wrapper">
        <div class="spinner">
          <p>..Loading Data..</p>
        </div>
      </div>
    </div>

  </div>
  <div v-else>
    <transition name='Mainform'>

      <div id='ThisForm' :class="ThisForm.prop.Status != 'A' ? 'disabled' : 'ThisForm'"
        :style="{ 'width': '-moz-available' }">
        <section class="pagina" :style="ThisForm.style">
          <div id='backGround' class='backGround'>
            <!--VueForm class="cuerpo" v-bind:style="ThisForm.style" v-bind:position="ThisForm.position"-->
            <section class="formheader">
              <slot name="header">

                <!--template v-slot:header-->
                <h2 class="header2" float="left">

                  <div id="titFor" class="titFor" :style="{ 'width': 'auto', 'font-size': '20px' }">
                    <label text-align="center">{{ ThisForm.prop.textLabel }}</label>
                    <!--label text-align="right">{{ ThisForm.prop.Name }}</label-->

                  </div>
                </h2>
                <!--transition-group> -->
                <!-- @focusout="ThisForm.eventos.push('ThisForm.' + compHeader + '.valid()')"
                   @focus.capture="ThisForm.eventos.push('ThisForm.' + compHeader + '.when()')"
              -->

                <div :id="'div_' + compHeader" v-for="( compHeader ) in ThisForm.header " :key="compHeader"
                  :class="compHeader" v-show='ThisForm[compHeader].prop.Visible'>
                  <component :id="'component_' + compHeader"
                    :is="impComponent(ThisForm[compHeader].prop.BaseClass, 'header')"
                    :ShowError="ThisForm[compHeader].prop.ShowError" :Registro="ThisForm[compHeader].Recno"
                    :prop="ThisForm[compHeader].prop" :style="ThisForm[compHeader].style"
                    :position="ThisForm[compHeader].position" :Value="ThisForm[compHeader].prop.Value" />
                </div>

              </slot>
            </section>
            <!--/template-->
            <!--template v-slot:main-->
            <!-- Despliega todo los componentes de la forma  
      && comp!='grid_datos'
      -->
            <section class="formmain">
              <slot name="main">

                <TransitionGroup name='detailForm'>

                  <div :id="Id + 'main_div_' + compMain" v-if="ThisForm.block.length == 0"
                    v-for="( compMain ) in ThisForm.main " :key="compMain" :class="compMain"
                    v-show='ThisForm[compMain].prop.Visible'>
                    <component :id="Id + '_mainComponent_' + compMain"
                      :is="impComponent(ThisForm[compMain].prop.BaseClass)"
                      v-model:Value="ThisForm[compMain].prop.Value" v-model:Status="ThisForm[compMain].prop.Status"
                      :Registro="ThisForm[compMain].Recno" :prop="ThisForm[compMain].prop"
                      :style="ThisForm[compMain].style" :position="ThisForm[compMain].position" />
                    <!--
                      
                       :ShowError="ThisForm[compMain].prop.ShowError" 
                    :inputStyle="ThisForm[compMain].inputStyle" 
                     @click.capture="ThisForm.eventos.push('ThisForm.' + compMain + '.click()')" -->
                  </div>

                  <!-----------------------------------------------------------
                 <-->

                  <div v-else :id="Id + 'block_divi_' + key" v-for="(block, key) in ThisForm.block" :key="key">
                    <label :style="block.titleStyle" v-if="block.title && block.prop.Visible">{{ block.title }}</label>
                    <div :id="Id + 'block_' + key" v-if="block.prop.Visible" :style="block.style">

                      <div v-for=" (component, key) in block.component" :key="key"
                        :id="Id + 'modal_hor_componentes_' + key + component.prop.Name" style="padding-bottom:2px">
                        <!--v-bind:Component="ref(Ele)"-->

                        <component :id="Id + '_blockComponent_' + key + component.prop.Name"
                          :is="impComponent(component.prop.BaseClass)" v-model:Value="component.prop.Value"
                          v-model:Status="component.prop.Status" :Registro="component.Recno" :prop="component.prop"
                          :style="component.style" :position="component.position">
                        </component>

                      </div>
                    </div>
                  </div>


                  <!-----------------------------------------------------------
                 <-->


                </TransitionGroup>
              </slot>
            </section>

            <!--/template-->
            <!--template v-slot:footer
               src="/Iconos/BotonRojo.png"
    ThisForm.prop.Status == 'A'
    -->
            <section class="formfooter">
              <!--Transition tag='div' -->
              <nuxt-img class='circle'
                :src="ThisForm.prop.Status == 'A' ? '/Iconos/svg/circle-green.svg' : '/Iconos/svg/circle-red.svg'"
                style="float:left" />
              <!--/Transition-->
              <slot name="footer">
                <!--                 @focusout="ThisForm.eventos.push('ThisForm.' + compFooter + '.valid()')" 
              v-bind:db="ref(ThisForm.db)"
              
              -->

                <div :id="'div_' + compFooter" v-for="( compFooter ) in ThisForm.footer " :class="compFooter"
                  v-show='ThisForm[compFooter].prop.Visible'>
                  <!--div v-for="(obj, compFooter,key) in ThisForm" :key="obj.Index"
                      @focus.capture="ThisForm.eventos.push('ThisForm.' + compFooter + '.when()')"
                -->
                  <component :id="'component_' + compFooter"
                    :is="impComponent(ThisForm[compFooter].prop.BaseClass, 'footer')"
                    v-model:Value="ThisForm[compFooter].prop.Value" v-model:Status="ThisForm[compFooter].prop.Status"
                    :ShowError="ThisForm[compFooter].prop.ShowError" v-model:Key="ThisForm[compFooter].prop.Key"
                    :Registro="ThisForm[compFooter].Recno" v-bind:prop="ThisForm[compFooter].prop"
                    :style="ThisForm[compFooter].style" :position="ThisForm[compFooter].position" />
                  <!--:inputStyle="ThisForm[compFooter].inputStyle"
                  @click="ThisForm.eventos.push('ThisForm.' + compFooter + '.click()')" -->
                </div>
              </slot>

              <div id="salir" class="salir" @click='clickSalir()'>

                <img id="icono_salir" class='img' src="/Iconos/svg/exit4-color.svg" style="float:right"
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
  </div>
  <!--/header-->
</template>

<script lang="ts" setup>

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

/////////////////////////////////////////////////
// Componentes
// Nota : Se paso toda la carga de componentes a /conposables
/////////////////////////////////////////////////

//const MyButton = resolveComponent('MyButton')

/*
const imgButton = resolveComponent('imgButton.vue')
const comboBox = resolveComponent('comboBox.vue')
const editText = resolveComponent('editText.vue')
const textLabel = resolveComponent('textLabel.vue')
const grid = resolveComponent('grid.vue')
const browseLite = resolveComponent('browseLite.vue')
const details = resolveComponent('details.vue')
const embedPdf = resolveComponent('embedPdf.vue')
const container = resolveComponent('container.vue')
const modalContainer = resolveComponent('modalContainer.vue')

*/

/* 
///////////////////////////////////////////////////////////////////////
// Nuxt 4 :
//  -. Se debe de cambiar los componentes al directorio components/global 
//  -. Se debe de aumentar el Lazy al nombre de cada componente
//  -. En el htnl en :is=":is="ThisForm[compFooter].prop.BaseClass" pasar directamente el nombre del componente en el que se va a trabajar
//
///////////////////////////////////////////////////////////////////////

const imgButton = computed(() => resolveComponent('LazyimgButton.vue'))
const editText = computed(() => resolveComponent('LazyeditText.vue'))
const comboBox = computed(() => resolveComponent('LazycomboBox.vue'))
const textLabel = computed(() => resolveComponent('LazytextLabel.vue'))
const grid = computed(() => resolveComponent('Lazygrid.vue'))
const browseLite = computed(() => resolveComponent('LazybrowseLite.vue'))
const details = computed(() => resolveComponent('Lazydetails.vue'))
const embedPdf = computed(() => resolveComponent('LazyembedPdf.vue'))
const container = computed(() => resolveComponent('Lazycontainer.vue'))
const modalContainer = computed(() => resolveComponent('LazymodalContainer.vue'))

*/

// en html en :is="imgButtonr" pasar directamente el nombre del componente en el que se va a trabajar
/*
const imgButton = defineAsyncComponent(() => import('@/components/imgButton.vue'))
const editText = defineAsyncComponent(() => import('@/components/editText.vue'))
const comboBox = defineAsyncComponent(() => import('@/components/comboBox.vue'))
const textLabel = defineAsyncComponent(() => import('@/components/textLabel.vue'))
const grid = defineAsyncComponent(() => import('@/components/grid.vue'))
const browseLite = defineAsyncComponent(() => import('~/components/browse.vue'))
const details = defineAsyncComponent(() => import('@/components/details.vue'))
const embedPdf = defineAsyncComponent(() => import('@/components/embedPdf.vue'))
const container = defineAsyncComponent(() => import('@/components/container.vue'))
const modalContainer = defineAsyncComponent(() => import('@/components/modalContainer.vue'))
const base64 = defineAsyncComponent(() => import('@/components/base64.vue'))


*/
/////////////////////////////////////////
// Componentes dinamicos
// https://vuejs.org/guide/components/async.html#basic-usage
//////////////////////////////



///////////////////////////////////////
// Propiedades del componente .
//  Obtiene ThisForm  base desde Main.vue en cada directorio de cada pagina 
////////////////////////////////////
const emit = defineEmits(["updateIsOpen"])
const props = defineProps<{
  ThisForm: null;
}>();
const ThisForm = reactive(new props.ThisForm) // no quitar el new 
const Id = ThisForm.prop.Name
// Datos forma por forma . En app.vue esta useHead
useSeoMeta({
  title: ThisForm.prop.Name,
  ogTitle: 'Dessing and programing with web-ones-technology',
  //  description: 'This is my amazing site, let me tell you all about it.',
  //  ogDescription: 'This is my amazing site, let me tell you all about it.',
  //ogImage: '/public/favicon.ico',
  //  twitterCard: 'summary_large_image',
})


//console.warn(router.query.params)
//console.warn(router.currentRoute[query])



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

const router = useRouter();

ThisForm.params = router.currentRoute.value.query  // Obtiene los Parametros de la URL

const loading = ref(true)

// asigna por referencia un Value de un objeto reactivo. Con toRefs hace todas las variables reactivas a referencia
//export const nom_nom_value = toRef(vi_lla1_nom[0], 'nom_nom')

//ThisThisForm.refs.fea_nom.Value=ahora;
//console.log('Fecha ahora ====>',ThisThisForm.refs.fea_nom.Value);


////////////////////////////////////////////
// Metodos propios
////////////////////////////////////////////


const waitEval = async (evento: string) => {
  return new Promise((resolve, reject) => {
    // Se tiene que pasar por referencia donde esta el ThisForm 

    //const ThisForm = form.value //ya que se trabajo solo en ambiente local
    console.log('<<<============Iniciamos evento=========>>> ', evento, ThisForm.eventos)

    resolve(eval(evento))
    reject((error) => {
      console.error('Hubo error al ejecutar evento', error)
    })
  })


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


const mounted = ref(false)
onBeforeMount(async () => {

  //onMounted(async () => {

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


      await ThisForm.Init()  // Se enlaza al Init Principal de la Forma base
      /*
          for (const i in ThisForm.elements) {
            const comp = ThisForm.elements[i].Name
            console.log('Vue Form',ThisForm.Name,' Component',comp)
            ThisForm.estatus[comp] = toRef(ThisForm[comp].prop, "Status"); // stack de estatus de componentes
    
          }
          */

      mounted.value = true // Se incializo todo el arbol de componentes 

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

})

onUnmounted(() => {
  ThisForm.unload(); // <div>
})



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