<!--   
 ----------------------------------------------------------------------------------------------
             Killo Soft
 ----------------------------------------------------------------------------------------------
 Autor    	: El Fer Blocks
 Sistema  	: Web-Ones-Technology 	Forma prinncipal  Ver 1.0 		Mnemo   : form.VUE
 Ult. mod.	: Fernando Cuadras  		Fecha   : 13/Dic/2022
 Objeto		: VUE
 Comentarios	: Genera la forma dinamicamente en base al ThisForm que se pasa del comeponente padre
 ----------------------------------------------------------------------------------------------
-->
<template>
  <!--header :style="{ 'display': 'inlineBlock' }"-->
  <div id='LoadingData' v-if="!mounted">
    <!--div class="progress-bar" :style="{ width: progreso + '%' }">Loaded {{progreso}} %</div>-->

    <div class="splash-screen">
      <div class="spinner-wrapper">
        <div class="spinner">
          <!--p>...`Loaded ${progress.value}%`... </p-->

        </div>
      </div>
    </div>

  </div>
  <div v-else @click.middle.stop="middleClick()">
    <transition name='Mainform'>

      <div id='ThisForm' class="form form_class1" :class="ThisForm.prop.Status != 'A' ? 'disabled' : 'ThisForm'"
        :style="{ 'width': '-moz-available' }">
        <section class="ThisForm form form_class2" :style="ThisForm.style">
          <div id='backGround' class='backGround form form_class3'>
            <!--VueForm class="cuerpo" v-bind:style="ThisForm.style" v-bind:position="ThisForm.position"-->
            <section class="formheader form form_class4" :style="ThisForm.headerStyle">
              <slot name="header" class="form form_class5">

                <!--template v-slot:header-->
                <h2 class="header2 form form_class6" float="left">
                  <div id="titFor" class="titFor form form_class7" :style="ThisForm.captionStyle">
                    <label text-align="center" class="form form_class8">{{ ThisForm.prop.Caption }}</label>
                  </div>
                </h2>

                <div :id="'div_' + compHeader" v-for="(compHeader) in ThisForm.header" :key="compHeader"
                  :class="compHeader" v-show='ThisForm[compHeader].prop.Visible' class="form form_class9">
                  <component :id="'component_' + compHeader" :is="impComponent(ThisForm[compHeader].prop.BaseClass)"
                    :Value="ThisForm[compHeader].prop.Value"
                    :Registro="!ThisForm[compHeader].Recno.isNaN(NaN) ? ThisForm[compHeader].Recno : 0"
                    :prop="ThisForm[compHeader].prop" :style="ThisForm[compHeader].style" class="form form_class10" />
                </div>

              </slot>
            </section>
            <!-- Despliega todo los componentes de la forma  -->
            <section class="formmain form form_class11" :style="ThisForm.mainStyle">
              <slot name="main" class="form form_class12">

                <TransitionGroup name='detailForm'>

                  <template v-if="ThisForm.block.length == 0">
                    <template v-for="(compMain) in ThisForm.main" :key="compMain">
                      <div :id="Id + '_' + compMain"
                        v-if="ThisForm[compMain].prop.Visible && !isFormCollapseElement(ThisForm[compMain])"
                        :class="compMain" class="form form_class14">
                        <component v-if="ThisForm[compMain].prop.Visible"
                          :is="impComponent(ThisForm[compMain].prop.BaseClass)"
                          v-model:Value="ThisForm[compMain].prop.Value"
                          :Registro="typeof ThisForm[compMain].Recno === 'number' ? ThisForm[compMain].Recno : 0"
                          :prop="ThisForm[compMain].prop" :style="ThisForm[compMain].style" class="form form_class15" />
                      </div>
                    </template>
                  </template>

                  <!--v-model:Status="ThisForm[compMain].prop.Status"-->
                  <!-------------------- Bloques contenedores de componentes ------------------------------------------>

                  <template v-else>
                    <template v-for="(block, key) in ThisForm.block" :key="key">
                      <div :id="Id + 'block_divi_' + key" class="form form_class16" :style="block.containerStyle"
                        v-if="block.prop.Visible && !isFormCollapseBlock(block)">
                        <label :style="block.titleStyle" class="form form_class17"
                          v-if="block.title && block.prop.Visible">{{ block.title }}</label>
                        <div :id="Id + 'block_' + key" :style="block.style" class="form form_class18">
                          <template v-for="(blockComp, key) in block.component" :key="key">
                            <div :id="Id + 'modal_hor_componentes_' + key + blockComp.prop.Name"
                              :style="blockComp.f19style" style="padding-bottom:2px"
                              v-if="!isBlockCollapseElement(block, blockComp)" class="responsive form form_class19">
                              <component v-if="blockComp.prop" :id="Id + '_blockComponent_' + key + blockComp.prop.Name"
                                :is="impComponent(blockComp.prop.BaseClass)" v-model:Value="blockComp.prop.Value"
                                :Registro="typeof blockComp.Recno == 'number' ? blockComp.Recno : 0"
                                :prop="blockComp.prop" :style="blockComp.style" class="form form_class20">
                              </component>
                              <!-- v-model:Status="component.prop.Status"-->
                            </div>
                          </template>

                          <template v-if="getBlockCollapseGroups(block).length > 0">
                            <details v-for="(group, groupKey) in getBlockCollapseGroups(block)"
                              :key="'block_collapse_' + key + '_' + groupKey" class="form form_class14"
                              v-show="group.prop ? group.prop.Visible : true"
                              :open="(group.open && group.canOpen !== false) ? true : false"
                              @toggle="handleCollapseToggle($event, group)" style="width: 100%; margin-top: 6px;">
                              <summary :style="{ cursor: group.canOpen !== false ? 'pointer' : 'not-allowed' }">{{
                                group.title ? group.title : 'Collapse' }}</summary>
                              <div :style="group.style ? group.style : {}">
                                <div v-for="(collapseComp, componentKey) in group.component"
                                  :key="'block_collapse_comp_' + key + '_' + groupKey + '_' + componentKey"
                                  :id="Id + '_blockCollapse_' + key + '_' + groupKey + '_' + collapseComp.prop.Name"
                                  style="padding-bottom:2px" class="responsive form form_class19">
                                  <component v-if="collapseComp.prop" :is="impComponent(collapseComp.prop.BaseClass)"
                                    v-model:Value="collapseComp.prop.Value"
                                    :Registro="typeof collapseComp.Recno == 'number' ? collapseComp.Recno : 0"
                                    :prop="collapseComp.prop" :style="collapseComp.style" class="form form_class20" />
                                </div>
                              </div>
                            </details>
                          </template>
                        </div>
                      </div>
                    </template>
                  </template>
                  <!------------------------------------------------------------->

                  <template v-if="formCollapseGroups.length > 0">
                    <details v-for="(group, groupKey) in formCollapseGroups" :key="'form_collapse_' + groupKey"
                      class="form form_class14" v-show="group.prop ? group.prop.Visible : true"
                      :open="(group.open && group.canOpen !== false) ? true : false"
                      @toggle="handleCollapseToggle($event, group)" style="width: 100%; margin-top: 6px;">
                      <summary :style="{ cursor: group.canOpen !== false ? 'pointer' : 'not-allowed' }">{{ group.title ?
                        group.title : 'Collapse' }}</summary>
                      <div :style="group.style ? group.style : {}">
                        <template v-for="(collapseItem, itemKey) in group.component"
                          :key="'form_collapse_item_' + groupKey + '_' + itemKey">
                          <!-- Componente o CONTAINER -->
                          <div v-if="collapseItem.prop && collapseItem.prop.BaseClass"
                            :id="Id + '_formCollapse_component_' + groupKey + '_' + itemKey + '_' + collapseItem.prop.Name"
                            style="padding-bottom:2px" class="responsive form form_class19">
                            <component v-if="collapseItem.prop" :is="impComponent(collapseItem.prop.BaseClass)"
                              v-model:Value="collapseItem.prop.Value"
                              :Registro="typeof collapseItem.Recno === 'number' ? collapseItem.Recno : 0"
                              :prop="collapseItem.prop" :style="collapseItem.style" class="form form_class20" />
                          </div>

                          <!-- Bloque / Container -->
                          <div v-else-if="collapseItem.component"
                            :id="Id + '_formCollapse_block_divi_' + groupKey + '_' + itemKey" class="form form_class16"
                            :style="collapseItem.containerStyle"
                            v-show="collapseItem.prop ? collapseItem.prop.Visible : true">
                            <label :style="collapseItem.titleStyle" class="form form_class17"
                              v-if="collapseItem.title && collapseItem.prop.Visible">{{ collapseItem.title }}</label>
                            <div :id="Id + '_formCollapse_block_' + groupKey + '_' + itemKey"
                              :style="collapseItem.style" class="form form_class18">
                              <template v-for="(blockComp, blockCompKey) in collapseItem.component" :key="blockCompKey">
                                <div
                                  :id="Id + '_formCollapse_modal_hor_componentes_' + groupKey + '_' + itemKey + '_' + blockCompKey + blockComp.prop.Name"
                                  :style="blockComp.f19style" style="padding-bottom:2px"
                                  v-if="!isBlockCollapseElement(collapseItem, blockComp)"
                                  class="responsive form form_class19">
                                  <component v-if="blockComp.prop"
                                    :id="Id + '_formCollapse_blockComponent_' + groupKey + '_' + itemKey + '_' + blockCompKey + blockComp.prop.Name"
                                    :is="impComponent(blockComp.prop.BaseClass)" v-model:Value="blockComp.prop.Value"
                                    :Registro="typeof blockComp.Recno == 'number' ? blockComp.Recno : 0"
                                    :prop="blockComp.prop" :style="blockComp.style" class="form form_class20">
                                  </component>
                                </div>
                              </template>

                              <template v-if="getBlockCollapseGroups(collapseItem).length > 0">
                                <details v-for="(blockGroup, blockGroupKey) in getBlockCollapseGroups(collapseItem)"
                                  :key="'form_collapse_block_collapse_' + groupKey + '_' + itemKey + '_' + blockGroupKey"
                                  class="form form_class14" v-show="blockGroup.prop ? blockGroup.prop.Visible : true"
                                  :open="(blockGroup.open && blockGroup.canOpen !== false) ? true : false"
                                  @toggle="handleCollapseToggle($event, blockGroup)"
                                  style="width: 100%; margin-top: 6px;">
                                  <summary
                                    :style="{ cursor: blockGroup.canOpen !== false ? 'pointer' : 'not-allowed' }">{{
                                      blockGroup.title ?blockGroup.title : 'Collapse' }}</summary>
                                  <div :style="blockGroup.style ? blockGroup.style : {}">
                                    <div v-for="(collapseComp, collapseCompKey) in blockGroup.component"
                                      :key="'form_collapse_block_collapse_comp_' + groupKey + '_' + itemKey + '_' + blockGroupKey + '_' + collapseCompKey"
                                      :id="Id + '_formCollapse_blockCollapse_' + groupKey + '_' + itemKey + '_' + blockGroupKey + '_' + collapseComp.prop.Name"
                                      style="padding-bottom:2px" class="responsive form form_class19">
                                      <component v-if="collapseComp.prop"
                                        :is="impComponent(collapseComp.prop.BaseClass)"
                                        v-model:Value="collapseComp.prop.Value"
                                        :Registro="typeof collapseComp.Recno == 'number' ? collapseComp.Recno : 0"
                                        :prop="collapseComp.prop" :style="collapseComp.style"
                                        class="form form_class20" />
                                    </div>
                                  </div>
                                </details>
                              </template>
                            </div>
                          </div>
                        </template>
                      </div>
                    </details>
                  </template>
                </TransitionGroup>
              </slot>
            </section>

            <!--/template-->
            <!--template v-slot:footer  -->
            <section class="formfooter form form_class21" :style="ThisForm.footerStyle">
              <!--Transition tag='div' -->
              <!-- <nuxt-img class='circle form form_class21'
                :src="ThisForm.prop.Status == 'A' ? '/Iconos/svg/circle-green.svg' : '/Iconos/svg/circle-red.svg'"
                style="float:left" /> -->
              <!--/Transition-->
              <slot name="footer" class="form form_class22">
                <!--                 @focusout="ThisForm.eventos.push('ThisForm.' + compFooter + '.valid()')" 
              v-bind:db="ref(ThisForm.db)"
                -->
                <div style="display:flex; justify-content: space-between;">
                  <template :id="'Form_footer_' + compFooter" v-for="(compFooter) in ThisForm.footer">
                    <div v-if="ThisForm[compFooter].prop.Visible" :class="compFooter" class="form  form_class23">
                      <component :is="impComponent(ThisForm[compFooter].prop.BaseClass)"
                        v-model:Value="ThisForm[compFooter].prop.Value"
                        :Registro="ThisForm[compFooter].Recno && !ThisForm[compFooter].Recno.isNaN(NaN) ? ThisForm[compFooter].Recno : 0"
                        :prop="ThisForm[compFooter].prop" :style="ThisForm[compFooter].style"
                        class="form form_class24" />

                      <!-- v-model:Status="ThisForm[compFooter].prop.Status"
                    @click="ThisForm.eventos.push('ThisForm.' + compFooter + '.click()')" -->
                    </div>
                  </template>
                </div>
              </slot>

              <div id="salir" class="salir form form_class25" @click='clickSalir()'>

                <img id="icono_salir" class='img form form_class26' src="/Iconos/svg/exit4-color.svg" :style="{
                  'float': 'right',
                  'word-wrap': 'break-word',
                  'font-size': '13px',
                  'color': 'green',
                  'width': '60px',
                }" />

              </div>

              <div class='login form form_class27' v-if="user != '' && id_con == '' && nom_emp != ''">
                <!--teleport to="#modal"-->User:{{ user }} Password:
                <input type="password" class="form form_class28" v-model.trim="password" @focusout="pass = password">
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
                  <component v-if="ThisForm[compFooter].prop.Visible" :id="Id + 'FooterComponent_' + compFooter"
                    :is="impComponent(ThisForm[compFooter].prop.BaseClass)"
                    v-model:Value="ThisForm[compFooter].prop.Value" v-model:Status="ThisForm[compFooter].prop.Status"
                    :Registro="ThisForm[compFooter].Recno" :prop="ThisForm[compFooter].prop"
                    :style="ThisForm[compFooter].style" :position="ThisForm[compFooter].position" />

*/
//Vapor="true"
//<script lang="ts" setup >
import { storeToRefs } from 'pinia'
import { INIT } from "@/classes/Init";
//import { refreshNuxtData } from '#app'

const session = Session()
const { id_con, url, dialect, nom_emp, user, fpo_pge, pass } = storeToRefs(session)

/////////////////////////////////////////////////
// Componentes
// Nota : Se paso toda la carga de componentes a /conposables
/////////////////////////////////////////////////

/* 
///////////////////////////////////////////////////////////////////////
// Nuxt 4 :
//  -. Se debe de cambiar los componentes al directorio components/global 
//  -. Se debe de aumentar el Lazy al nombre de cada componente
//  -. En el htnl en :is=":is="ThisForm[compFooter].prop.BaseClass" pasar directamente el nombre del componente en el que se va a trabajar
//
///////////////////////////////////////////////////////////////////////

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
// Se tiene que mantener el nombre del ThisForm ya que cuando se hace un eval de todos los metodos se utiliza simepre ThisForm.<componente>.<method>
////////////////////////////////////
const emit = defineEmits(["updateIsOpen"])
const props = defineProps<{
  ThisForm: {};
}>();



// Original
//const ThisForm = reactive(new props.ThisForm) // no quitar el new

const Component = toRef(() => props.ThisForm)
const ThisForm = Component.value

const Este = ref(ThisForm)
const Estatus = ref(ThisForm.estatus)
const Valid = reactive(ThisForm.Valid)
//const Id = ThisForm.prop.Name

const Id = ThisForm.prop.Name + '_' + Math.floor(Math.random() * 1000).toString()
ThisForm.Id = Id

// Datos forma por forma . En app.vue esta useHead
useSeoMeta({
  title: ThisForm.prop.Name,
  ogTitle: 'Dessing and programing with web-ones-technology',
  //  description: 'This is my amazing site, let me tell you all about it.',
  //  ogDescription: 'This is my amazing site, let me tell you all about it.',
  //ogImage: '/public/favicon.ico',
  //  twitterCard: 'summary_large_image',
})

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
    console.log('<<<============Iniciamos evento=========>>> ', evento, ThisForm)

    resolve(eval(evento))
    reject((error) => {
      console.error('Hubo error al ejecutar evento', error)
    })
  })
}

//////////////////////////////////////////////////////////////////
//////////////// Whatchers ///////////////////////////////////////

////////////////////////////////
// revisa los eventos que hay a ejecutar, en caso que hay una estatus de un componente
// no ejecuta el evento
/////////////////////////////////
watch(
  () => ThisForm.eventos,
  async (new_val, old_val) => {
    if (ThisForm.eventos.length == 0) // 27/Dic/2024
      return

    for (const comp in ThisForm.estatus) {
      if (ThisForm.estatus[comp] != 'A') {
        console.warn('1) Form.vue Watch  Eventos Componente en proceso=', comp, 'Eventos=', ThisForm.eventos)
        return
      }
    }
    console.warn('Form.vue Watch  Eventos ')
    ejeEventos()
  }, { deep: true }
);

//////////////////////////////////////////////
// revisa los estatus de todos los componentes
watch(
  () => Estatus.value, //ThisForm.estatus,
  async (new_val, old_val) => {
    if (ThisForm.eventos.length == 0)
      return

    for (const comp in new_val) {
      //  console.log('Watch estatus ===>', comp, ThisForm.estatus[comp])

      if (ThisForm.estatus[comp] != 'A') {
        console.log('Proceso watch Estatus de componentes  comp. ', comp, 'estatus=', ThisForm.estatus[comp], 'Eventos', ThisForm.eventos = [])
        return
      }
    }
    console.log('Proceso watch Estatus de componentes ')
    ejeEventos()
  },
  { deep: true }
);

// Checa todas las validaciones que tienen todos los componentes el form 

watch(Valid, async (new_val) => {

  //  console.warn('============ Watch Valid=========> ', ThisForm.prop.Name, 'bt save=', ThisForm.bt_save.prop.Visible)
  if (ThisForm.prop.BaseClass.toLowerCase() !== 'captureform')
    return

  if (ThisForm.bt_modify.prop.Visible)
    return

  //if (ThisForm.Recno>0 && !ThisForm.bt_save.prop.Visible)
  //  return

  for (const i in ThisForm.main) {
    const comp = ThisForm.main[i]
    const Componente = ThisForm[comp]
    if (!Componente.prop.Valid && Componente.prop.Capture &&
      !Componente.prop.ReadOnly && Componente.prop.Visible == true &&
      (Componente.prop.BaseClass.toUpperCase() == 'EDITTEXT' ||
        Componente.prop.BaseClass.toUpperCase() == 'COMBOBOX')) {
      ///////////////
      let sw_found = false
      for (let I = 0; I < ThisForm.block.length && !sw_found; I++) {

        if (ThisForm.block[I].component) { // bloques horizontales

          for (let J = 0; J < ThisForm.block[I].component.length && !sw_found; J++) {
            console.log('============ Componente no validado invisible =========> ', ThisForm.block[I].component[J])
            if (ThisForm.block[I].component[J].prop.Visible == false && ThisForm.block[I].component[J].prop.Name == Componente.prop.Name) { // Aqui se podria hacer algo con el block
              sw_found = true
              console.log('============ Componente no validado invisible =========> ', comp, I, J)

              break
            }
          }

        } else {
          // bloques verticales
          if (ThisForm.block[I].prop.Visible == false && ThisForm.block[I].prop.Name == Componente.prop.Name) {
            console.log('============  Componente no validado invisible =========> bloque=', I)
            sw_found = true
            break
          }
        }


      }
      /* if (!sw_found) {
 
         ////////////////////
         console.warn('============ Componente no validado =========> ', comp, Componente.prop.Valid)
         //      ThisForm.bt_modify.prop.Visible = false
         ThisForm.bt_delete.prop.Visible = false
 
         return
       }*/
    }
  }
  /*
    const lon = Valid.length
    const This = this
    for (let i = 0; i < Valid.length; i++)
      if (!Valid[i].value) {
  
        console.log('1) Checando valid False', ThisForm.ValidName[i], Valid[i].value, 'Valid=')
  
        return
      }
  */
  // if (ThisForm.prop.Status == 'A')
  //ThisForm.bt_save.prop.Visible = true

  if (ThisForm.prop.autoUpdate)
    ThisForm.bt_saveClick()
  else
    ThisForm.bt_save.prop.Visible = true

},
  { deep: true }); //, flush: 'post'

///////////////////////////////////////////////////////////
////////////////////// Functions //////////////////////////

const ejeEventos = async () => {
  //console.log('Form ejeEventos ===>>> ', ThisForm.eventos)
  if (ThisForm.eventos[0] != 'XXXXX' && ThisForm.eventos[0] > '') {
    const evento = ThisForm.eventos[0]
    //  ThisForm.eventos[0] = 'XXXXX'
    ThisForm.eventos = []
    //console.log('ejeEventos ejecutara===>>> ', evento)
    await waitEval(evento)  // ejecuta evento de la lista
    //console.log('Borrara evento watch ThisForm.eventos===>>> ', evento)

    // borramos el evento
    const new_arr = []
    let num_eve = 0
    if (ThisForm.eventos.length > 1) {
      for (let i = 0; i < ThisForm.eventos.length; i++) {
        console.log('Eventos Restantes===>>> ', evento)
        if (ThisForm.eventos[i] != 'XXXXX' && ThisForm.eventos[i].length > 0) {
          new_arr[num_eve] = ThisForm.eventos[i]
          num_eve++
          //console.log('borramos eventos. Anexamos Evento ', ThisForm.eventos[i], ThisForm.eventos[i].length)

        }
      }
    }
    ThisForm.eventos = [...new_arr]
    console.log('############Evento terminado ############ Evento ejecutado==>>> ', evento, 'ThisForm.prop.Status=', ThisForm.prop.Status, 'Eventos restantes=', ThisForm.eventos.length, 'Eventos', ThisForm.eventos)
    //await eje_eve(evento)

  }
}

const clickSalir = async () => {

  if (ThisForm.salir.click())
    await ThisForm.salir.click()
  else
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

/**
 * Despues ede montar la forma, asigna los estatus de los componentes
 * 
 */

// onBeforeMount(async () => {
onMounted(async () => {

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
            // Se quita el toRef para que quede con reactividad
            //ThisForm.estatus[componente] = ThisForm[componente].prop.Status // stack de estatus de componentes
          }
        }

      }

      const router = useRoute();
      const { params } = useRoute();

      for (const par in router.query) {
        let param = router.query[par]
        param = param.trim().replaceAll('´', "")
        if (left(param, 1) == "'")
          param = param.replace("'", "")
        if (right(param, 1) == "'")
          param = param.replace("'", "")

        ThisForm.Params.push(param);

      }
      console.log('ThisForm router=', router, 'Params=', ThisForm.Params)


      await ThisForm.Init()  // Se enlaza al Init Principal de la Forma base
      /*
          for (const i in ThisForm.elements) {
            const comp = ThisForm.elements[i].Name
            console.log('Vue Form',ThisForm.Name,' Component',comp)
            ThisForm.estatus[comp] = toRef(ThisForm[comp].prop, "Status"); // stack de estatus de componentes
    
          }
          */

      resolveFormCollapseMeta() // Reconstruye collapses definidos en el init

      mounted.value = true // Se incializo todo el arbol de componentes 

    });
  emit('updateIsOpen', true)
  /* }
   catch (error) {
     console.log('Error al inicializa la forma ', error)
   }
 */
  //Valid = toRef(ThisForm, "Valid")


  loading.value = false
  if (ThisForm.onMounted)
    await ThisForm.onMounted()
  ThisForm.afterMounted()

})
/////////////////
/*
onMounted(async (e) => {
  // focusIn.value = 0

  if (ThisForm.onMounted)
    await ThisForm.onMounted()

})
*/

onUnmounted(async () => {

  if (ThisForm && ThisForm.onUnmounted) await ThisForm.onUnmounted() //  console.log('ComboBox Desmontado onUnMounted', This.prop.Name, This.onUnmounted)
})

const middleClick = () => {
  console.log('middleClick')

  ThisForm.translateContainer.open(ref(ThisForm))
}

const handler = (event) => {
  console.log('2) editText handler event.which=', event.which)

  if (event.which === 1)
    ThisForm.translateContainer.open(ref(ThisForm))
  event.preventDefault();
}

const NextTick = (ins: string) => {
  console.log('NextTick', ins)
  nextTick(function () { waitEval(ins) });
}

const blockCollapseCache = new WeakMap<object, { groups: any[]; elementMap: Record<string, boolean> }>()

const getComponentName = (component: any): string => {
  if (!component) return ''
  if (component.Name && typeof component.Name == 'string') return component.Name
  if (component.prop && component.prop.Name && typeof component.prop.Name == 'string') return component.prop.Name
  return ''
}

const resolveBlockCollapseMeta = (block: any): { groups: any[]; elementMap: Record<string, boolean> } => {
  if (!block || typeof block != 'object') {
    return { groups: [], elementMap: {} }
  }

  if (blockCollapseCache.has(block)) {
    return blockCollapseCache.get(block) as { groups: any[]; elementMap: Record<string, boolean> }
  }

  const groups = block.collapseContainer && block.collapseContainer.length > 0 ? block.collapseContainer : []
  const resolvedGroups: any[] = []
  const elementMap: Record<string, boolean> = {}

  for (const groupIndex in groups) {
    const group = groups[groupIndex]
    if (!group) continue

    if (!group.prop) {
      group.prop = { Visible: true }
    }

    if (group.canOpen === undefined || group.canOpen === null) {
      group.canOpen = true
    }

    const groupComponents: any[] = []
    const groupElements = group.elements && group.elements.length > 0 ? group.elements : []

    for (const elementIndex in groupElements) {
      const collapseElement = groupElements[elementIndex]
      let componentRef: any = null

      if (typeof collapseElement == 'string') {
        for (const blockCompIndex in block.component) {
          const blockComp = block.component[blockCompIndex]
          if (getComponentName(blockComp) == collapseElement) {
            componentRef = blockComp
            break
          }
        }
      }
      else if (collapseElement && collapseElement.prop) {
        componentRef = collapseElement
      }

      if (componentRef && componentRef.prop) {
        groupComponents.push(componentRef)
        const componentName = getComponentName(componentRef)
        if (componentName.length > 0) {
          elementMap[componentName] = true
        }
      }
    }

    group.component = groupComponents
    if (group.component.length > 0) {
      resolvedGroups.push(group)
    }
  }

  const meta = { groups: resolvedGroups, elementMap }
  blockCollapseCache.set(block, meta)
  return meta
}

const getBlockCollapseGroups = (block: any): any[] => {
  return resolveBlockCollapseMeta(block).groups
}

const isBlockCollapseElement = (block: any, component: any): boolean => {
  const compName = getComponentName(component)
  if (compName.length == 0) return false
  return resolveBlockCollapseMeta(block).elementMap[compName] == true
}

const formCollapseGroups = ref<any[]>([])
const formCollapseComponentSet = ref<Set<any>>(new Set())
const formCollapseBlockSet = ref<Set<any>>(new Set())

const resolveFormCollapseMeta = () => {
  const groups = ThisForm.collapseContainer && ThisForm.collapseContainer.length > 0
    ? ThisForm.collapseContainer
    : []

  const resolved: any[] = []
  const componentSet = new Set<any>()
  const blockSet = new Set<any>()

  for (const groupIndex in groups) {
    const group = groups[groupIndex]
    if (!group) continue

    if (!group.prop) {
      group.prop = { Visible: true }
    }

    if (group.canOpen === undefined || group.canOpen === null) {
      group.canOpen = true
    }

    const componentArray: any[] = []
    const elements = group.elements && group.elements.length > 0 ? group.elements : []

    for (const elementIndex in elements) {
      const collapseElement = elements[elementIndex]
      let componentRef: any = null

      if (typeof collapseElement == 'number' && ThisForm.block && ThisForm.block[collapseElement]) {
        componentRef = ThisForm.block[collapseElement]
        blockSet.add(componentRef)
      }
      else if (typeof collapseElement == 'string' && ThisForm[collapseElement]) {
        componentRef = ThisForm[collapseElement]
        componentSet.add(componentRef)
      }
      else if (collapseElement && typeof collapseElement == 'object') {
        if (collapseElement.component !== undefined) {
          componentRef = collapseElement
          blockSet.add(componentRef)
        }
        else if (collapseElement.prop) {
          componentRef = collapseElement
          componentSet.add(componentRef)
        }
      }

      if (componentRef && componentRef.prop) {
        componentArray.push(componentRef)
      }
    }

    group.component = componentArray
    if (group.component.length > 0) {
      resolved.push(group)
    }
  }

  formCollapseGroups.value = resolved
  formCollapseComponentSet.value = componentSet
  formCollapseBlockSet.value = blockSet
}

const isFormCollapseElement = (component: any): boolean => {
  return formCollapseComponentSet.value.has(component)
}

const isFormCollapseBlock = (block: any): boolean => {
  return formCollapseBlockSet.value.has(block)
}

const handleCollapseToggle = (event: any, group: any) => {
  if (group && group.canOpen === false) {
    event.target.open = false
  }
}

resolveFormCollapseMeta()

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