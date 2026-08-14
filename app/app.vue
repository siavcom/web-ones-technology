<template>
  <!--Para quitar los errores de hidratacion, se puso que solo haga render del lado del cliente-->
  <ClientOnly>
    <div class="menu">
      <div class="sidebar" :class="isOpen ? 'open' : ''" :style="cssVars">
        <div class="logo-details" style="margin: 6px 14px 0 14px;">
          <img v-if="Props.menuLogo" :src="Props.menuLogo" alt="menu-logo" class="menu-logo icon" />

          <!--i  v-else src="/Iconos/svg" class="bx icon" :class="menuIcon"></i-->
          <div class="logo_name">
            {{ menuTitle }}
          </div>
          <!--i class="bx" :class="isOpen ? 'bx-menu-alt-right' : 'bx-menu'" id="btn" @click="isOpen = !isOpen" /-->
          <nuxt-img id="btn" class="bx" :src="isOpen ? '/Iconos/svg/bx-menu-alt-right.svg' : '/Iconos/svg/bx-menu.svg'"
            @click="isOpen = !isOpen" />
        </div>

        <div
          style="display: flex ; flex-direction:column; justify-content: space-between; flex-grow: 1; max-height: calc(100% - 60px); ">
          <div id="my-scroll" style="margin: 6px 14px 0 14px;">
            <ClientOnly>
              <ul class="nav-list" style="overflow: visible;">
                <template v-if="false">
                  <li v-if="isLoggedIn" @click="isOpen = true">
                    <!--i class="bx bx-search" ></i-->
                    <nuxt-img src="/Iconos/svg/bx-search.svg" class="bx bx-search" />
                    <input type="text" :placeholder="Props.searchPlaceholder"
                      @input="$emit('search-input-emit', $event.target.value)">
                    <span class="tooltip">{{ Props.searchTooltip }}</span>
                  </li>
                </template>


                <!--span v-for="(menuItem, index) in menuItems" :key="index"-->

                <template v-for="(menuItem, index) in Items" :key="index">
                  <li v-if="!(isLoggedIn && menuItem.path && menuItem.path.path === '/Login')">
                    <!--li @click="menuItem.link=='#' ? routerPush(menuItem.path) : null"-->
                    <div @click="obtSubMenu(menuItem.system)">
                      <a href="#" @click.prevent="handleMenuNavigate(menuItem)">
                        <nuxt-img class="bx" v-if="menuItem.icon.length > 0" :src="menuItem.icon"
                          :class="menuItem.icon" />
                        <span class="links_name">{{ menuItem.name }}</span>
                      </a>
                      <span class="tooltip">{{ menuItem.tooltip || menuItem.name }}</span>
                    </div>
                    <ul class="sub-menu-Mantenance"
                      v-show="isOpen && subMen && subItemsMan.length > 0 && subItemsMan[0].system === menuItem.system"
                      :style="{ 'color': 'chartreuse' }">

                      <li @click="isMan = !isMan">
                        <span class="links_options">{{ Props.maintenance
                        }}</span>
                        <nuxt-img class="ico" :src="isMan ? '/Iconos/svg/minus.svg' : '/Iconos/svg/plus.svg'" />
                      </li>
                      <template v-for="(menuItem, index) in subItemsMan" v-if="isMan" :key="index">
                        <li>
                          <a href="#" @click.prevent="handleSubMenuNavigate(menuItem)">
                            <span class="links_name" :style="{ 'color': 'chartreuse' }">{{ menuItem.name }}</span>
                          </a>

                          <!-- Hiperlink Tag  a :href="menuItem.link"-->
                          <span class="tooltip">{{ menuItem.tooltip || menuItem.name }}</span>
                        </li>

                      </template>
                    </ul>
                    <ul class="sub-menu-Reports"
                      v-show="isOpen && subMen && subItemsRep.length > 0 && subItemsRep[0].system === menuItem.system"
                      :style="{ 'color': 'chartreuse' }">
                      <li text-align="end" @click="isRep = !isRep">
                        <span style="text-align:end" class="links_options">{{ Props.reports }}</span>
                        <nuxt-img class="ico" :src="isRep ? '/Iconos/svg/minus.svg' : '/Iconos/svg/plus.svg'" />
                      </li>
                      <span v-for="(menuItem, index) in subItemsRep" v-if="isRep" :key="index">
                        <li>
                          <a href="#" @click.prevent="handleSubMenuNavigate(menuItem)">
                            <span class="links_name" :style="{ 'color': 'chartreuse' }">{{ menuItem.name }}</span>
                          </a>

                          <!-- Hiperlink Tag  a :href="menuItem.link"-->
                          <span class="tooltip">{{ menuItem.tooltip || menuItem.name }}</span>
                        </li>
                      </span>
                    </ul>
                    <ul class="sub-menu-Process"
                      v-show="isOpen && subMen && subItemsPro.length > 0 && subItemsPro[0].system === menuItem.system"
                      :style="{ 'color': 'chartreuse' }">
                      <li text-align="end" @click="isPro = !isPro">
                        <span class="links_options">{{ Props.process }}</span>

                        <nuxt-img class="ico" :src="isPro ? '/Iconos/svg/minus.svg' : '/Iconos/svg/plus.svg'" />
                      </li>
                      <li v-if="isPro" :key="index">
                        <ul v-for="(menuItem, index) in subItemsPro">
                          <li>
                            <a href="#" @click.prevent="handleSubMenuNavigate(menuItem)">
                              <span class="links_name" :style="{ 'color': 'chartreuse' }">{{ menuItem.name }}</span>
                            </a>

                            <!-- Hiperlink Tag  a :href="menuItem.link"-->
                            <span class="tooltip">{{ menuItem.tooltip || menuItem.name }}</span>
                          </li>
                        </ul>

                      </li>
                    </ul>
                  </li>
                </template>
                <li>
                  <button v-if="Props.isExitButton && isLoggedIn" @click.stop="exit()" class="logout-btn"
                    title="Cerrar sesion">
                    <nuxt-img src="/Iconos/svg/bx-log-out.svg" class="logout-icon" width="20" />
                    <span class="logout-text">Cerrar sesion</span>
                  </button>
                </li>
              </ul>
            </ClientOnly>
          </div>

          <div v-if="isLoggedIn" class="profile hidden md:block">
            <div class="profile-details">
              <nuxt-img v-if="Props.profileImg" :src="Props.profileImg" alt="Props.profileImg" />
              <nuxt-img v-else src="/Iconos/svg/bxs-user-rectangle.svg" class="bx bxs-user-rectangle" />
              <div class="name_job">
                <div class="name">
                  {{ Props.profileName }}
                </div>
                <div class="job">
                  {{ Props.profileRole }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mainForm">

        <NuxtLayout name='header' :logoEmp="logoEmp" :nomEmp="nom_emp" :titleName="titleName" :fpo_pge="fpo_pge"
          :user="user" />
        <NuxtLayout name='default'>

          <NuxtPage />
        </NuxtLayout>
        <NuxtLayout name='footer' :user="user" :form="Props.form" />

      </div>
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>

/*
 <NuxtPage @updateStatus="updateStatus @updateIsOpen="updateIsOpen">
                              <a :href="menuItem.link!='#'  ? menuItem.link : '#'">

                                  <!--i class="bx" :class="menuItem.icon || 'bx-square-rounded'" /-->
                                  <nuxt-img class="bx" :src="'/Iconos/'+menuItem.icon" :class="menuItem.icon" />
                                  <span class="links_name">{{ menuItem.name }}</span>
                              </a>

*/

// Utilizacion de Pinia 
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from '#imports'

/*
interface Props_interface {
  isOpened: boolean;
  //isMenuOpen: boolean;
  // menuTitle: string;
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

*/
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

const Props = reactive({ //   withDefaults(defineProps<Props_interface>(), {

  isOpened: false,
  //isMenuOpen: true,
  // menuTitle: 'KilloSoftware',
  menuLogo: '/logos/Siavcom.png',
  menuIcon: 'bxl-c-plus-plus',
  isPaddingLeft: true,
  menuOpenedPaddingLeftBody: '250px',
  menuClosedPaddingLeftBody: '78px',
  maintenance: 'Mantenimiento',
  reports: 'Reportes',
  process: 'Procesos',
  menuItems: [] as Array<{ name: string; tooltip: string; icon: string; path: { path: string }; type: string; system: string }>,     //() => [

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

Props.menuItems.push(
  {
    // link: 'http://siavcom.com.mx:38000/Login',
    name: 'Login',
    tooltip: 'Login',
    icon: '/Iconos/svg/bx-user.svg',
    path: { path: '/Login' },
    type: 'P',
    system: ''
  })
Props.menuItems.push(
  {
    link: '#',
    name: 'Messages',
    tooltip: 'Messages',
    icon: '/Iconos/svg/bx-chat.svg',
    path: {},
    type: 'L',
    system: ''
  }
)

const menuTitle = 'KilloSoft'

const session = Session()
//const { data } = await useAsyncData('id', () => session.id_con)

const { id_con, user, nom_emp, menu, fpo_pge, logoEmp } = storeToRefs(session)  //pasa los elementos por referencia al Global

/*
await useAsyncData('logoEmp', () => session.fetchUser().then(() => true))
await useAsyncData('logoEmp', () => session.fetchUser().then(() => true))
await useAsyncData('logoEmp', () => session.fetchUser().then(() => true))
await useAsyncData('logoEmp', () => session.fetchUser().then(() => true))

console.log('session logoEmp=', logoEmp)
*/

const usrMenu = menu
//const Prop = ref(props)
const Items = reactive(Props.menuItems)  // son los que aparecen en el html

const itemLength = Items.length
let subItemsMan = reactive([])
let subItemsRep = reactive([])
let subItemsPro = reactive([])

const subMen = ref(false)
const isMan = ref(false)
const isRep = ref(false)
const isPro = ref(false)

// Idicamos si ya esta firmado

const isLoggedIn = ref(Props.isLoggedIn)

const isOpen = ref(Props.isOpened)
isOpen.value = false

/* ***********Titulos en las pestaÃ±as****************** */
const titleName = ref('')
titleName.value = 'Web-Ones Technologies'

const Title = computed(() => {
  return ` Titulo del programa`
  //${menuItem.name}

})

useHead({
  titleTemplate: (title) => `${titleName.value}`,
  /*
    script: [
      {
         src: 'https://www.scripts.com/some/other/script.js',
         body: true
       }
    ]
  */

});

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
  return isOpen.value ? '250px' : '0px'
})
// removeState
const exit = () => {
  // app.$sessionStorage.removeItem('id_con')
  id_con.value = ''
  nom_emp.value = ''
  const tam_act = Items.length
  Items.splice(itemLength, tam_act - itemLength)
  isLoggedIn.value = false
  usrMenu.value = []
  const router = useRouter();
  router.push("/");

  //window.location.reload();
  //router.clearRoutes();
  window.close();

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
/*const updateStatus = (loggedIn: boolean) => {
  //obtMenu()

}
*/
/// //////////////////////////////////////
// Obten Menu
/// ///////////////////////////////////////
const obtMenu = () => {

  // Borramos todos los elementos del menu
  while (Items.length > 2)
    Items.pop()

  // console.log('menu items====>',Items,user.value)
  isLoggedIn.value = true
  if (user.value.trim() == 'sa' || user.value.slice(0, 3) == 'sa@') {

    Items.push(
      {
        link: '#',
        name: 'SQL data diccionary',
        tooltip: 'Setting',
        icon: '/Iconos/svg/dictionary.svg',
        path: { path: '/SqlDictionary' },
        target: '', //'_blank',
        type: 'P',
        system: ''
      })
    Items.push(

      {
        // link: 'http://siavcom.com.mx:38000/Login',
        name: 'SQL Query',
        tooltip: 'SQL Query',
        icon: '/Iconos/svg/sql-query.svg',
        path: { path: '/QueryExec' },
        type: 'P',
        system: ''
      })

    Items.push(

      {
        // link: 'http://siavcom.com.mx:38000/Login',
        name: 'Web Form Generator',
        tooltip: 'Web Form Generator',
        icon: '/Iconos/svg/bx-spreadsheet.svg',
        path: { path: '/formGenerator' },
        type: 'P',
        system: ''
      })

  }

  for (let i = 0; usrMenu.value.length > 0 && usrMenu.value.length > i; i++) {
    // solo agrega menu principal
    if (usrMenu.value[i].tpr_prg === 'S') {
      let link = '#'
      const path = {
        path: '',
        params: {},
        query: {}
      }
      let target = ''        //'_blank' indica ventana nueva del explorador
      const type = usrMenu.value[i].tpr_prg
      const system = usrMenu.value[i].sis_sis
      const urlVue = ''

      if (usrMenu.value[i].prg_prg != null && usrMenu.value[i].prg_prg.trim() > ' ') {

        link = urlVue + '/' + usrMenu.value[i].prg_prg.trim()
        path.path = '/' + usrMenu.value[i].prg_prg.trim()
        var params = ''
        if (usrMenu.value[i].par_prg != null && usrMenu.value[i].par_prg.trim().length > 0)
          params = usrMenu.value[i].par_prg.trim()

        if (params.length > 0) {
          //console.log('Menu=', usrMenu.value[i].prg_prg.trim(), 'Params=', params)
        }

        let pos = params.indexOf(',') // Posicion de la primera coma
        let num_par = 1
        while (pos > 0) { // Recorremos todas las variables del indice
          let param = params.substring(0, pos)
          param = param.replaceAll("'", '')

          path.params['par' + num_par.toString()] = param // queda par1
          path.query['par' + num_par.toString()] = param  // queda par2
          params = params.substring(pos + 1)
          pos = params.indexOf(',')
          num_par++
        }
        if (params.length > 0) {
          params = params.replaceAll("'", '')
          params = params.trim()
          path.params['par' + num_par.toString()] = params
          path.query['par' + num_par.toString()] = params
        }

      }

      const icon = usrMenu.value[i].ico_prg.trim().length > 1 ? '/Iconos/' + usrMenu.value[i].ico_prg.trim() : '/Iconos/svg/bx-door-open.svg'
      const item = {
        link: '#',
        name: usrMenu.value[i].des_prg,
        tooltip: usrMenu.value[i].des_prg,
        icon,
        path: path,
        target: target,
        type: type,
        system: system
      }

      Items.push(item) // anexamos al menu
    }
  }

  console.log('Fin obtMenu Items=', Items)
}
/// //////////////////////////////////////
// Obten subMenu
/// ///////////////////////////////////////
const obtSubMenu = (system: string) => {
  // console.log('SubMenu Menu=', usrMenu.value)
  isOpen.value = true
  // console.log('SubMenu menu ====> system=', system)
  subMen.value = false
  isMan.value = false
  isRep.value = false
  isPro.value = false

  subItemsMan.length = 0 // borramos subItems
  subItemsRep.length = 0 // borramos subItems
  subItemsPro.length = 0 // borramos subItems
  const Man = []
  const Rep = []
  const Pro = []
  //const menu = session.menu

  // console.log('usrMenu.value[i].prg_prg', usrMenu.value)
  for (let i = 0; usrMenu.value.length > 0 && usrMenu.value.length > i; i++) {
    // solo agrega menu principal

    if (usrMenu.value[i].ico_prg == null)
      usrMenu.value[i].ico_prg = ' '

    if (usrMenu.value[i].sis_sis == system) {
      let link = '#'

      const path = {
        path: '',
        params: {},
        query: {}
      }

      const type = usrMenu.value[i].tpr_prg
      const system = usrMenu.value[i].sis_sis
      const urlVue = ' '

      // console.log('usrMenu.value[i].prg_prg', usrMenu.value[i])
      if (usrMenu.value[i].prg_prg != null && usrMenu.value[i].prg_prg.trim() > ' ') {
        link = urlVue + '/' + usrMenu.value[i].prg_prg.trim()
        path.path = '/' + usrMenu.value[i].prg_prg.trim()

        if (usrMenu.value[i].par_prg != null && usrMenu.value[i].par_prg.trim().length > 0) {

          //path.params = { par_uno: usrMenu.value[i].par_prg.trim() }

          path.query = { par_uno: usrMenu.value[i].par_prg.trim() }

          //console.log('SubMenu=', usrMenu.value[i].prg_prg.trim(), 'Path.params=', path.params)
        }
      }

      const item = {
        link: '#',
        name: usrMenu.value[i].des_prg,
        tooltip: usrMenu.value[i].des_prg,
        icon: '/Iconos/' + usrMenu.value[i].ico_prg.trim(),
        path: path,
        type,
        system
      }
      if (type === 'M') { Man.push(item) } // anexamos al menu Mantenimiento
      if (type === 'R') { Rep.push(item) } // anexamos al menu Reporte
      if (type === 'P') { Pro.push(item) } // anexamos al menu Procesos
    }
  }
  if (Man.length > 0 ||
    Rep.length > 0 ||
    Pro.length > 0) {
    subItemsMan = [...Man]
    subItemsRep = [...Rep]
    subItemsPro = [...Pro]
    subMen.value = true
    isOpen.value = true
    // console.log('SubMenu menu ====> subMen=', Man, Rep.Pro)
  }
}

/// //////////////////////////////////////
// Preserva variables GET al navegar
/// ///////////////////////////////////////
const getFullPath = (path: any) => {
  const route = useRoute();
  const fullPath = { ...path };
  
  if (route.query && Object.keys(route.query).length > 0) {
    fullPath.query = { ...route.query, ...(path.query || {}) };
  }
  
  return fullPath;
}

const navigateToPath = (path: any) => {
  const router = useRouter();
  const route = useRoute();
  const fullPath = getFullPath(path);
  
  // Si es el mismo path, forzar recarga completa
  if (route.path === fullPath.path) {
    const url = fullPath.path + (Object.keys(fullPath.query || {}).length > 0 
      ? '?' + new URLSearchParams(fullPath.query as any).toString() 
      : '');
    window.location.href = url;
  } else {
    router.push(fullPath);
  }
}

const handleMenuNavigate = (menuItem: any) => {
  titleName.value = menuItem.name;
  isOpen.value = menuItem.name == 'Login' ? true : false;
  navigateToPath(menuItem.path);
}

const handleSubMenuNavigate = (menuItem: any) => {
  titleName.value = menuItem.name;
  isOpen.value = false;
  navigateToPath(menuItem.path);
}

/// //////////////////////////////////////////////////////
// watch Value
//  Nota : Si se cambia el valor desde la forma principal, se debe de actualizar en el
//          Componente
/// ///////////////////////////////////////

watch(
  () => isOpen.value,
  () => {
    if (!Props.isPaddingLeft || !isOpen.value) {
      window.document.body.style.paddingLeft = '0px'
      return
    }

    window.document.body.style.paddingLeft = Props.menuOpenedPaddingLeftBody
  },
  { deep: false }
)

watch(
  () => menu.value, // usrMenu.value,
  (menu_new) => {

    if (id_con.value > '' && menu.value.length > 0) {
      obtMenu()
      return
    }

    while (Items.length > 2)
      Items.pop()

  },
  { deep: true }
)

/*
watch(
  () => id_con.value,
  (id_new, id_val) => {
    console.log('watch id', id_new, Items)
    if (Items.length < 3)
      obtMenu()

  },
  { deep: false }
)
*/
//////////////////////////////////////////////////
// Init
/////////////////////////////////////////////////

onMounted(async () => {

  //console.log('onMounted app.vue init obtMenu', id_con.value, menu.value)
  //if (id_con.value > '')// && Items.length < 3)
  //  obtMenu()
})

</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

.menu {
  background-color: #F5F5F5;

}

body {
  background-color: 'antiquewhite';
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

.sidebar li ul li {
  /* display: flex; */
  align-items: center;
  position: relative;
  cursor: pointer;
  margin-left: 10px;
}

.sidebar li ul li img {
  position: absolute;
  right: 10px;
  bottom: 13px;
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

.nav-list>li {
  padding: 10px 5px !important;
  border-radius: 6px !important;
  margin-bottom: 5px;
}

.sidebar li:hover {
  background-color: #00800040;
}

.sidebar>li:hover span {
  color: #ffffff !important;
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
  color: var(--icons-color);
}


.sidebar li a {
  display: flex;
  height: 100%;
  width: 100%;
  border-radius: 12px;
  align-items: center;
  text-decoration: none;
  transition: all 0.4s ease;
}


.sidebar li a .links_name {
  color: var(--menu-items-text-color);
  font-size: 18px;
  font-weight: 400;
  white-space: space;
  opacity: 0;
  pointer-events: none;
  transition: 0.4s;
}

sidebar li a .links_options {
  color: var(--menu-items-text-color);
  font-size: 15px;
  font-weight: 400;
  white-space: space;
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
  color: white;
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
  height: 20px;
  width: 20px;
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
  display: block;
  /* margin-left: v-bind("mainFormLeft"); */
  transition: all 1.5s ease;
}

.logout-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 10px 12px;
  border: 0;
  border-radius: 12px;
  background: #ffffff;
  color: #1f2937;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
}

.logout-btn:hover {
  background: #e2f0e7;
}

.logout-icon {
  filter: none;
  flex-shrink: 0;
}

.sidebar:not(.open) .logout-text {
  display: none;
}

.sidebar:not(.open) .logout-btn {
  width: 46px;
  height: 46px;
  padding: 0;
  margin: 0 auto;
}

.sidebar:not(.open) {
  width: 58px;
  background: transparent;
  box-shadow: none;
}

.sidebar:not(.open) #my-scroll,
.sidebar:not(.open) .profile,
.sidebar:not(.open) .logo_name,
.sidebar:not(.open) .menu-logo {
  display: none;
}

.sidebar:not(.open) .logo-details {
  margin: 10px 8px 0 8px !important;
  justify-content: flex-end;
}

.sidebar:not(.open) .logo-details #btn {
  position: relative;
  top: auto;
  right: -10px;
  transform: none;
  width: 42px;
  height: 42px;
  padding: 9px;
  border-radius: 999px;
  background: var(--bg-color);
}

.sidebar:not(.open) .tooltip {
  display: none;
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

@media (max-width: 768px) {
  .mainForm {
    margin-left: 0 !important;
  }

  .sidebar.open {
    width: min(86vw, 320px);
    background: var(--bg-color);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
  }

  .sidebar li .tooltip {
    display: none;
  }
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

@media (min-width: 992px) {
  .mainForm {
    margin: auto;
    width: 90%;
  }
}
</style>
