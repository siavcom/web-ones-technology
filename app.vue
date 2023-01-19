<template>
  <form class="MenuForm">
    <div class="sidebar" :class="isOpen ? 'open' : ''" :style="cssVars">
      <div class="logo-details" style="margin: 6px 14px 0 14px;">
        <img v-if="menuLogo" :src="menuLogo" alt="menu-logo" class="menu-logo icon">

        <!--i  v-else src="/Iconos/svg" class="bx icon" :class="menuIcon"></i-->
        <div class="logo_name">
          {{ menuTitle }}
        </div>
        <!--i class="bx" :class="isOpen ? 'bx-menu-alt-right' : 'bx-menu'" id="btn" @click="isOpen = !isOpen" /-->
        <img id="btn" class="bx" :src="isOpen ? '/Iconos/svg/bx-menu-alt-right.svg' : '/Iconos/svg/bx-menu.svg'"
          @click="isOpen = !isOpen">
      </div>

      <div
        style="display: flex ; flex-direction:column; justify-content: space-between; flex-grow: 1; max-height: calc(100% - 60px); ">
        <div id="my-scroll" style="margin: 6px 14px 0 14px;">
          <ul class="nav-list" style="overflow: visible;">
            <li v-if="isLoggedIn" @click="isOpen = true">
              <!--i class="bx bx-search" ></i-->
              <img src="/Iconos/svg/bx-search.svg" class="bx bx-search">
              <input type="text" :placeholder="searchPlaceholder"
                @input="$emit('search-input-emit', $event.target.value)">
              <span class="tooltip">{{ searchTooltip }}</span>
            </li>

            <!--span v-for="(menuItem, index) in menuItems" :key="index"-->

            <span v-for="(menuItem, index) in Items" :key="index">
              <!--li @click="menuItem.link=='#' ? routerPush(menuItem.path) : null"-->
              <li @click="obtSubMenu(menuItem.system)">
                <NuxtLink :to="menuItem.path" :target="menuItem.target">
                  <img class="bx" :src="'/Iconos/' + menuItem.icon" :class="menuItem.icon">
                  <span class="links_name">{{ menuItem.name }}</span>
                </NuxtLink>
                <span class="tooltip">{{ menuItem.tooltip || menuItem.name }}</span>
              </li>

              <span v-show="isOpen && subMen && subItemsMan.length > 0 && subItemsMan[0].system === menuItem.system">
                <li @click="isMan = !isMan">
                  <span class="links_options">{{ maintenance }}</span>
                  <img v-show="!isMan" class="ico" src="/Iconos/svg/bx-expand-vertical.svg">
                </li>
                <span v-for="(menuItem, index) in subItemsMan" v-if="isMan" :key="index">
                  <li v-if="menuItem.path.length > 1">
                    <NuxtLink :to="menuItem.path" :target="menuItem.target">
                      <span class="links_name">{{ menuItem.name }}</span>
                    </NuxtLink>

                    <!-- Hiperlink Tag  a :href="menuItem.link"-->
                    <span class="tooltip">{{ menuItem.tooltip || menuItem.name }}</span>
                  </li>
                </span>
              </span>

              <span v-show="isOpen && subMen && subItemsRep.length > 0 && subItemsRep[0].system === menuItem.system">
                <li text-align="end" @click="isRep = !isRep">
                  <span style="text-align:end" class="links_options">{{ reports }}</span>
                  <img v-show="!isRep" class="ico" src="/Iconos/svg/bx-expand-vertical.svg">
                </li>
                <span v-for="(menuItem, index) in subItemsRep" v-if="isRep" :key="index">
                  <li v-if="menuItem.path.length > 1">
                    <NuxtLink :to="menuItem.path">
                      <span class="links_name">{{ menuItem.name }}</span>
                    </NuxtLink>

                    <!-- Hiperlink Tag  a :href="menuItem.link"-->
                    <span class="tooltip">{{ menuItem.tooltip || menuItem.name }}</span>
                  </li>
                </span>
              </span>
              <span v-show="isOpen && subMen && subItemsPro.length > 0 && subItemsPro[0].system === menuItem.system">
                <li text-align="end" @click="isPro = !isPro">
                  <span class="links_options">{{ process }}</span>
                  <img v-show="!isPro" class="ico" src="/Iconos/svg/bx-expand-vertical.svg">
                </li>
                <span v-for="(menuItem, index) in subItemsPro" v-if="isPro" :key="index">
                  <li v-if="menuItem.path.length > 1">
                    <NuxtLink :to="menuItem.path">
                      <span class="links_name">{{ menuItem.name }}</span>
                    </NuxtLink>

                    <!-- Hiperlink Tag  a :href="menuItem.link"-->
                    <span class="tooltip">{{ menuItem.tooltip || menuItem.name }}</span>
                  </li>
                </span>
              </span>

              <!--li v-else>
                <img class="bx" :src="'/Iconos/'+menuItem.icon" :class="menuItem.icon" />
                <span class="links_name">{{ menuItem.name }}</span>
                <span class="tooltip">{{ menuItem.tooltip || menuItem.name }}</span>
              </li-->

            </span>
          </ul>
        </div>

        <div v-if="isLoggedIn" class="profile">
          <div class="profile-details">
            <img v-if="profileImg" :src="profileImg" alt="profileImg">
            <img v-else src="Iconos/svg/bxs-user-rectangle.svg" class="bx bxs-user-rectangle">
            <div class="name_job">
              <div class="name">
                {{ profileName }}
              </div>
              <div class="job">
                {{ profileRole }}
              </div>
            </div>
          </div>
          <!--i v-if="isExitButton" class="bx bx-log-out" id="log_out" @click.stop="$emit('button-exit-clicked')" /-->
          <img v-if="isExitButton" id="log_out" src="/Iconos/svg/bx-log-out.svg" class="bx bx-log-out"
            @click.stop="exit()">
        </div>
      </div>
    </div>

    <transition name="moveInUp">
      <div class="mainForm">
        <!--NuxtLayout-->
        <NuxtPage @updateStatus="updateStatus" @updateIsOpen="updateIsOpen" />
        <!--/NuxtLayout-->

      </div>
    </transition>
  </form>
</template>

<script lang="ts" setup>
/*

                              <a :href="menuItem.link!='#'  ? menuItem.link : '#'">

                                  <!--i class="bx" :class="menuItem.icon || 'bx-square-rounded'" /-->
                                  <img class="bx" :src="'/Iconos/'+menuItem.icon" :class="menuItem.icon" />
                                  <span class="links_name">{{ menuItem.name }}</span>
                              </a>

*/
/*
import {
  //  defineEmits,
  // defineProps,
  //  defineExpose,
  ref,
  reactive,
  computed,
  //  onUnmounted,
  watch
  // toRefs,
  // toRef,
  // onMounted,
  // onBeforeUpdate,
  // onUpdated,
  // onUnmounted,

} from 'vue'
*/
//import router from '@/router'

// Utilizacion de Pinia 

// import store from '@/stores/index'
import { Session } from '@/stores/currentSession'
//import consolaGlobalInstance from 'consola';

/*
definePageMeta({
  name: 'posts'
})
*/

interface Props {
  isOpened: boolean;
  isMenuOpen: boolean;
  menuTitle: string;
  menuLogo: string;
  menuIcon: string;
  isPaddingLeft: boolean;
  menuOpenedPaddingLeftBody: string;
  menuClosedPaddingLeftBody: string;

  menuItems?: any[];
  Items: any[];

  //! Search

  searchPlaceholder: string;
  searchTooltip: string;

  //! Profile detailes
  profileImg: string;
  profileName: string;
  profileRole: string;
  isExitButton: boolean;
  isLoggedIn: boolean;
  maintenance: string;
  reports: string;
  process: string;

  // Style: Object
}
/* {
      bgColor: string;
      secondaryColor: string;
      homeSectionColor: string;
      logoTitleColor: string;
      iconsColor: string;
      itemsTooltipColor: string;
      searchInputTextColor:  string;
      menuItemsHoverColor:string;
      menuItemsTextColor: string;
      menuFooterTextColor: string;
  };

*/

const props = withDefaults(defineProps<Props>(), {

  // const props=defineProps({
  isOpened: true,
  isMenuOpen: true,
  menuTitle: 'KilloSoft',
  menuLogo: '/Iconos/Logo_Empresa.png',
  menuIcon: 'bxl-c-plus-plus',
  isPaddingLeft: true,
  menuOpenedPaddingLeftBody: '250px',
  menuClosedPaddingLeftBody: '78px',
  maintenance: 'Mantenimiento',
  reports: 'Reportes',
  process: 'Procesos',
  menuItems: () => [
    /* {  // Estadisticas graficas del negocio
      link: '#',
      name: 'Dashboard',
      tooltip: 'Dashboard',
      icon: 'svg/bx-grid-alt.svg',
      path: '',
      type: 'L',
      system: ''
    },
    */
    {
      // link: 'http://siavcom.com.mx:38000/Login',
      name: 'Login',
      tooltip: 'Login',
      icon: 'svg/bx-user.svg',
      path: '/Login',
      type: 'P',
      system: ''
    },
    {
      link: '#',
      name: 'Messages',
      tooltip: 'Messages',
      icon: 'svg/bx-chat.svg',
      path: '/Message',
      type: 'L',
      system: ''
    }
    /*    {
      link: '#',
      name: 'File Manager',
      tooltip: 'Files',
      icon: 'svg/bx-folder.svg',
      path: '',
      type: 'L',
      system: ''
    },

    {
      link: '#',
      name: 'Saved',
      tooltip: 'Saved',
      icon: 'svg/bx-heart.svg',
      path: '',
      type: 'L',
      system: ''
    }
*/
  ],

  searchPlaceholder: 'Search...',
  searchTooltip: 'Search',

  profileImg: '/img/ElFerBlocks.jpg',
  profileName: 'El Fer Blocks',
  profileRole: 'Front/Back End & SQL developer ',
  isExitButton: true,
  isLoggedIn: false
  /*
    Style: {
      bgColor: '#7aac67',
      secondaryColor: '#1d1b31',
      homeSectionColor: '#e4e9f7',
      logoTitleColor: '#fff',
      iconsColor: '#fff',
      itemsTooltipColor: '#e4e9f7',
      searchInputTextColor: '#fff',
      menuItemsHoverColor: '#fff',
      menuItemsTextColor: '#fff',
      menuFooterTextColor: '#fff',
    }
  */
})

const Style = {
  bgColor: '#7aac67', //
  secondaryColor: '#7aac67', //     '#1d1b31',
  homeSectionColor: '#e4e9f7',
  logoTitleColor: '#fff',
  iconsColor: '#fff',
  itemsTooltipColor: '#e4e9f7',
  searchInputTextColor: '#fff',
  menuItemsHoverColor: '#fff',
  menuItemsTextColor: '#fff',
  menuFooterTextColor: '#fff'
}
// Borramos el app.$sessionStorage
// app.$sessionStorage.removeItem('id_con')
// app.$sessionStorage.removeItem('menu')
// app.$sessionStorage.removeItem('nom_emp')
// app.$sessionStorage.removeItem('url')
// app.$sessionStorage.removeItem('user')

const session = Session()
//let menu = []
const nom_emp = ref('')
const Prop = ref(props)
const Items = reactive(props.menuItems)
const itemLength = Items.length
const subItemsMan = reactive([])
const subItemsRep = reactive([])
const subItemsPro = reactive([])

const subMen = ref(false)
const isMan = ref(false)
const isRep = ref(false)
const isPro = ref(false)

// Idicamos si ya esta firmado


const isLoggedIn = ref(props.isLoggedIn)
// const session = getStore('session')

const isOpen = ref(props.isOpened)
isOpen.value = true


/*
$auth.$storage.setLocalStorage(key, val)
$auth.$storage.getState(key)
$auth.$storage.removeState(key)

this.$auth.$storage.setState(key, val)
this.$auth.$storage.getState(key)
this.$auth.$storage.removeState(key)

// Watch state changes
this.$auth.$storage.watchState('loggedIn', newValue => { })

*/

// sessionStorage.getItem('id_con')

// if ($auth.$storage.getState('id_con')) {
//const id_con = ref(session.id_con)
/*
if (session.id_con && session.id_con.length > 0) {
//  const id_con = session.id_con
  let menu=[]
  nom_emp.value = session.nom_emp
  if (session.id_con.length > 0) {
    isLoggedIn.value = true

    Items.push(
      {
        link: '#',
        name: 'SQL diccionary',
        tooltip: 'Setting',
        icon: 'svg/bx-cog.svg',
        path: '/come9101',
        target: '',
        type: 'P',
        system: ''
      })

    menu = JSON.parse(session.menu)// lee menu de programas
    const url = session.url.trim()

    for (let i = 0; menu.length > i; i++) {
      // solo agrega menu principal
      if (menu[i].tpr_prg === 'S') {
        let link = '#'
        let path = ''
        let target = '_blank'
        const type = menu[i].tpr_prg
        const system = menu[i].sis_sis
        if (menu[i].prg_prg != null && menu[i].prg_prg.trim() > ' ') {
          link = url + '/' + menu[i].prg_prg.trim()
          path = '/' + menu[i].prg_prg.trim()
        }
        const item = {
          link: '#',
          name: menu[i].des_prg,
          tooltip: menu[i].des_prg,
          icon: menu[i].ico_prg,
          path,
          target,
          type,
          system
        }
        Items.push(item) // anexamos al menu
      }
    }

    // obtMenu(false)
  }
}
*/
const cssVars = computed(() => {
  return {
    '--bg-color': Style.bgColor,
    '--secondary-color': Style.secondaryColor,
    '--home-section-color': Style.homeSectionColor,
    '--logo-title-color': Style.logoTitleColor,
    '--icons-color': Style.iconsColor,
    '--items-tooltip-color': Style.itemsTooltipColor,
    '--serach-input-text-color': Style.searchInputTextColor,
    '--menu-items-hover-color': Style.menuItemsHoverColor,
    '--menu-items-text-color': Style.menuItemsTextColor,
    '--menu-footer-text-color': Style.menuFooterTextColor,
    '--this-form-left': '10%'
  }
}
)

const mainFormLeft = computed(() => {
  return isOpen.value ? '300px' : '120px' // '10%': '4%'
})
// removeState
const exit = () => {
  // app.$sessionStorage.removeItem('id_con')
  session.update('', '', '', '')
  nom_emp.value = ''
  const tam_act = Items.length
  Items.splice(itemLength, tam_act - itemLength)
  isLoggedIn.value = false
}
const back = () => window.history.back()
/*
const routerPush = (path: string) => {
  console.log('menu path===>', path)
  // router.push(path) //nuxt
}
*/
/// //////////////////////////////////////
// Actualiza isOpen
/// ///////////////////////////////////////
const updateIsOpen = () => {
  isOpen.value = false
}

/// //////////////////////////////////////
// Actualiza estatus Login
/// ///////////////////////////////////////
const updateStatus = (loggedIn: boolean) => {
  obtMenu()
  /*
  if (session.id_con) {
    let menu = []
    //const id_con = session.id_con
    nom_emp.value = session.nom_emp

    if (session.id_con.length > 0) {
      // Agregamos el diccionario de datos
      Items.push(
        {
          link: '#',
          name: 'SQL diccionary',
          tooltip: 'Setting',
          icon: 'svg/bx-cog.svg',
          path: 'come9101',
          type: 'P',
          system: ''
        })

      // agregamos Items pasados en props
      for (const item in Prop.value.Items) {
        Items.push(Prop.value.Items[item])
      }
      // Leemos el menu general en caso de que haya hecho login
      console.log('session ===>', session)

      if (session.menu.length > 0)
        menu = JSON.parse(session.menu)// lee menu de programas
      const url = session.url.trim()

      for (let i = 0; menu.length > i; i++) {
        // solo agrega menu principal
        if (menu[i].tpr_prg === 'S') {
          let link = '#'
          let path = ''
          const type = menu[i].tpr_prg
          const system = menu[i].sis_sis
          if (menu[i].prg_prg != null && menu[i].prg_prg.trim() > ' ') {
            link = url + '/' + menu[i].prg_prg.trim()
            path = menu[i].prg_prg.trim()
          }
          const item = {
            link: '#',
            name: menu[i].des_prg,
            tooltip: menu[i].des_prg,
            icon: menu[i].ico_prg,
            path,
            type,
            system
          }
          Items.push(item) // anexamos al menu
        }
      }
    } else {
      isLoggedIn.value = false
    }
  }
  isLoggedIn.value = false // loggedIn;
  */
}

/// //////////////////////////////////////
// Obten Menu
/// ///////////////////////////////////////
const obtMenu = (sw_ini?: boolean) => {
      //id_con.value = session.id_con
    let menu=[]
    nom_emp.value = session.nom_emp
    //console.log('watch  lee menu Items', Items,Items.length)

    
    if (Items.length > 2) {
      const num_ele = Items.length - 2

      Items.splice(2, num_ele)
    }

    if (session.id_con.length === 0) {
      isLoggedIn.value = false
      return

    }
    isLoggedIn.value = true



    Items.push(
      {
        link: '#',
        name: 'SQL diccionary',
        tooltip: 'Setting',
        icon: 'svg/bx-cog.svg',
        path: '/come9101',
        target: '', //'_blank',
        type: 'P',
        system: ''
      })



    //menu = JSON.parse(session.menu)// lee menu de programas
    menu =session.menu// lee menu de programas
   // console.log('Menu completo',menu)
 
    const url = session.url.trim()

    for (let i = 0; menu.length > i; i++) {
      // solo agrega menu principal
      if (menu[i].tpr_prg === 'S') {
        let link = '#'
        let path = ''
        let target = ''        //'_blank' indica ventana nueva del explorador
        const type = menu[i].tpr_prg
        const system = menu[i].sis_sis
        if (menu[i].prg_prg != null && menu[i].prg_prg.trim() > ' ') {
          link = url + '/' + menu[i].prg_prg.trim()
          path = '/' + menu[i].prg_prg.trim()
        }
        const item = {
          link: '#',
          name: menu[i].des_prg,
          tooltip: menu[i].des_prg,
          icon: menu[i].ico_prg,
          path,
          target,
          type,
          system
        }
        Items.push(item) // anexamos al menu
      }
    }
    console.log('Menu =====>',Items)
}
/// //////////////////////////////////////
// Obten subMenu
/// ///////////////////////////////////////
const obtSubMenu = (system: string) => {
  isMan.value = false

  isRep.value = false

  isPro.value = false

  subItemsMan.length = 0 // borramos subItems
  subItemsRep.length = 0 // borramos subItems
  subItemsPro.length = 0 // borramos subItems
  const menu=session.menu
  for (let i = 0; menu.length > i; i++) {
    // solo agrega menu principal
    if (menu[i].sis_sis === system) {
      let link = '#'
      let path = ''
      const type = menu[i].tpr_prg
      const system = menu[i].sis_sis
      const url = ' '
      if (menu[i].prg_prg != null && menu[i].prg_prg.trim() > ' ') {
        link = url + '/' + menu[i].prg_prg.trim()
        path = menu[i].prg_prg.trim()
      }
      const item = {
        link: '#',
        name: menu[i].des_prg,
        tooltip: menu[i].des_prg,
        icon: menu[i].ico_prg,
        path,
        type,
        system
      }
      if (type === 'M') { subItemsMan.push(item) } // anexamos al menu Mantenimiento
      if (type === 'R') { subItemsRep.push(item) } // anexamos al menu Reporte
      if (type === 'P') { subItemsPro.push(item) } // anexamos al menu Procesos
    }
  }
  if (subItemsMan.length > 0 ||
    subItemsRep.length > 0 ||
    subItemsPro.length > 0) {
    subMen.value = true
    isOpen.value = true
  }
}


//////////////////////////////////////////////////
// Init
/////////////////////////////////////////////////
console.log('=========Session============',session.id_con)
if (session.id_con && session.id_con.length > 0) {
  obtMenu()
} 


/// //////////////////////////////////////////////////////
// watch Value
//  Nota : Si se cambia el valor desde la forma principal, se debe de actualizar en el
//          Componente
/// ///////////////////////////////////////

watch(
  () => isOpen,
  (new_val, old_val) => {
    window.document.body.style.paddingLeft = props.isOpened && props.isPaddingLeft ? props.menuOpenedPaddingLeftBody : props.menuClosedPaddingLeftBody
  },
  { deep: false }
)

watch(
  () => session.id_con,
  (new_val, old_val) => {


    obtMenu()
    //id_con.value = session.id_con
 /*
    let menu=[]
    nom_emp.value = session.nom_emp
    //console.log('watch  lee menu Items', Items,Items.length)

    
    if (Items.length > 2) {
      const num_ele = Items.length - 2

      Items.splice(2, num_ele)
    }

    if (session.id_con.length === 0) {
      isLoggedIn.value = false
      return

    }
    isLoggedIn.value = true



    Items.push(
      {
        link: '#',
        name: 'SQL diccionary',
        tooltip: 'Setting',
        icon: 'svg/bx-cog.svg',
        path: '/come9101',
        target: '', //'_blank',
        type: 'P',
        system: ''
      })



    //menu = JSON.parse(session.menu)// lee menu de programas
    menu =session.menu// lee menu de programas
   // console.log('Menu completo',menu)
 
    const url = session.url.trim()

    for (let i = 0; menu.length > i; i++) {
      // solo agrega menu principal
      if (menu[i].tpr_prg === 'S') {
        let link = '#'
        let path = ''
        let target = ''        //'_blank' indica ventana nueva del explorador
        const type = menu[i].tpr_prg
        const system = menu[i].sis_sis
        if (menu[i].prg_prg != null && menu[i].prg_prg.trim() > ' ') {
          link = url + '/' + menu[i].prg_prg.trim()
          path = '/' + menu[i].prg_prg.trim()
        }
        const item = {
          link: '#',
          name: menu[i].des_prg,
          tooltip: menu[i].des_prg,
          icon: menu[i].ico_prg,
          path,
          target,
          type,
          system
        }
        Items.push(item) // anexamos al menu
      }
    }
    */
    console.log('Menu =====>',Items)

    // obtMenu(false)
  },
  { deep: false }
)



</script>

<style  scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}


body {
  transition: all 0.5s ease;
}

.bx {
  filter: invert(1);
}

.ico {
  filter: invert(1);
  transform: scale(.4) translate(0px, 30px);
}

.menu-logo {
  width: 30px;
  margin: 0 10px 0 10px;
}

.sidebar {
  position: relative;
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  min-height: min-content;
  /* overflow-y: auto; */
  width: 78px;
  background: var(--bg-color);
  /* padding: 6px 14px 0 14px; */
  z-index: 99;
  transition: all 0.5s ease;
}

.sidebar.open {
  width: 250px;
}

.sidebar .logo-details {
  height: 60px;
  display: flex;
  align-items: center;
  position: relative;
}

.sidebar .logo-details .icon {
  opacity: 0;
  transition: all 0.5s ease;
}

.sidebar .logo-details .logo_name {
  color: var(--logo-title-color);
  font-size: 20px;
  font-weight: 600;
  opacity: 0;
  transition: all 0.5s ease;
}

.sidebar.open .logo-details .icon,
.sidebar.open .logo-details .logo_name {
  opacity: 1;
}

.sidebar .logo-details #btn {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  font-size: 22px;
  transition: all 0.4s ease;
  font-size: 23px;
  text-align: center;
  cursor: pointer;
  transition: all 0.5s ease;
}

.sidebar.open .logo-details #btn {
  text-align: right;
}

.sidebar i {
  color: var(--icons-color);
  height: 60px;
  min-width: 50px;
  font-size: 28px;
  text-align: center;
  line-height: 60px;
}

.sidebar .nav-list {
  margin-top: 20px;
  /* margin-bottom: 60px; */
  /* height: 100%; */
  /* min-height: min-content; */
}

.sidebar li {
  position: relative;
  margin: 8px 0;
  list-style: none;
}

.sidebar li .tooltip {
  position: absolute;
  top: -20px;
  left: calc(100% + 15px);
  z-index: 3;
  background: var(--items-tooltip-color);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 15px;
  font-weight: 400;
  opacity: 0;
  white-space: nowrap;
  pointer-events: none;
  transition: 0s;
}

.sidebar li:hover .tooltip {
  opacity: 1;
  pointer-events: auto;
  transition: all 0.4s ease;
  top: 50%;
  transform: translateY(-50%);
}

.sidebar.open li .tooltip {
  display: none;
}

.sidebar input {
  font-size: 15px;
  color: var(--serach-input-text-color);
  font-weight: 400;
  outline: none;
  height: 50px;
  width: 100%;
  width: 50px;
  border: none;
  border-radius: 12px;
  transition: all 0.5s ease;
  background: var(--secondary-color);
}

.sidebar.open input {
  padding: 0 20px 0 50px;
  width: 100%;
}

.sidebar .bx-search {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  font-size: 22px;
  background: var(--secondary-color);
  color: var(--icons-color);
}

.sidebar.open .bx-search:hover {
  background: var(--secondary-color);
  color: var(--icons-color);
}

.sidebar .bx-search:hover {
  background: var(--menu-items-hover-color);
  color: var(--bg-color);
}

.sidebar li a {
  display: flex;
  height: 100%;
  width: 100%;
  border-radius: 12px;
  align-items: center;
  text-decoration: none;
  transition: all 0.4s ease;
  background: var(--bg-color);
}

.sidebar li a:hover {
  background: var(--menu-items-hover-color);
}

.sidebar li a .links_name {
  color: var(--menu-items-text-color);
  font-size: 15px;
  font-weight: 400;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: 0.4s;
}

sidebar li a .links_options {
  color: var(--menu-items-text-color);
  font-size: 15px;
  font-weight: 400;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: 0.4s;
}

.sidebar.open li a .links_name {
  opacity: 1;
  pointer-events: auto;
}

.sidebar li a:hover .links_name,
.sidebar li a:hover i {
  transition: all 0.5s ease;
  color: var(--bg-color);
}

.sidebar li i {
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  border-radius: 12px;
}

.sidebar div.profile {
  position: relative;
  height: 60px;
  width: 78px;
  /* left: 0;
    bottom: 0; */
  padding: 10px 14px;
  background: var(--secondary-color);
  transition: all 0.5s ease;
  overflow: hidden;
}

.sidebar.open div.profile {
  width: 250px;
}

.sidebar div .profile-details {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
}

.sidebar div img {
  height: 45px;
  width: 45px;
  object-fit: cover;
  border-radius: 6px;
  margin-right: 10px;
}

.sidebar div.profile .name,
.sidebar div.profile .job {
  font-size: 15px;
  font-weight: 400;
  color: var(--menu-footer-text-color);
  white-space: nowrap;
}

.sidebar div.profile .job {
  font-size: 12px;
}

.sidebar .profile #log_out {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  background: var(--secondary-color);
  width: 100%;
  height: 60px;
  line-height: 60px;
  border-radius: 0px;
  transition: all 0.5s ease;
}

.sidebar.open .profile #log_out {
  width: 50px;
  background: var(--secondary-color);
  opacity: 0;
}

.sidebar.open .profile:hover #log_out {
  opacity: 1;
}

.sidebar.open .profile #log_out:hover {
  opacity: 1;
  color: red;
}

.sidebar .profile #log_out:hover {
  color: red;
}

.home-section {
  position: relative;
  background: var(--home-section-color);
  min-height: 100vh;
  top: 0;
  left: 78px;
  width: calc(100% - 78px);
  transition: all 0.5s ease;
  z-index: 2;
}

.sidebar.open~.home-section {
  left: 250px;
  width: calc(100% - 250px);
}

.home-section .text {
  display: inline-block;
  color: var(--bg-color);
  font-size: 25px;
  font-weight: 500;
  margin: 18px;
}

.my-scroll-active {
  overflow-y: auto;
}

.nomEmp {
  display: inline-block;
  color: var(--bg-color);
  font-size: 25px;
  font-weight: 500;
  margin: 18px;
  text-align: center;
}

.mainForm {
  position: relative;
  display: flex;
  margin-left: v-bind("mainFormLeft");
  transition: all 0.5s ease;
}

#my-scroll {
  overflow-y: auto;
  height: calc(100% - 60px);
}

#my-scroll::-webkit-scrollbar {
  display: none;
  /* background-color: rgba(255, 255, 255, 0.2);
    width: 10px;
    border-radius:5px  */
}

/* #my-scroll::-webkit-scrollbar-thumb{
    background-color: red;
    border-radius:5px
  }
  #my-scroll::-webkit-scrollbar-button:vertical:start:decrement{
    display:none;
  }
  #my-scroll::-webkit-scrollbar-button:vertical:end:increment{
    display:none;
  } */
@media (max-width: 420px) {
  .sidebar li .tooltip {
    display: none;
  }

}

.moveInUp-enter-active {
  opacity: 0;
  transition: opacity 1s ease-in;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
