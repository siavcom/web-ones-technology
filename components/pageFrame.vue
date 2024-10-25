<template>
  <div :id="Id + 'pageFrame'" class="wrapper" v-if="This.prop.Visible" :style="This.style">
    <button class='change__style' @click='changeStyle()'>Change Style</button>
    <tabs :mode="This.prop.Style">


      <slot name="componentes">
        <tab :id="'componentes_divi_' + key" v-for="(block, key) in This.block" :key="key" :title="block.title">
          {{ block.title }}
          <label v-if="block.title && block.prop.Visible">{{ block.title }}</label>
          <div :id="'block_' + key" v-if="block.prop.Visible" :style="block.style">

            <div v-for=" (component, key) in block.component" :key="key"
              :id="'modal_hor_componentes_' + key + component.prop.Name" style="padding-bottom:2px">
              <!--v-bind:Component="ref(Ele)"-->
              <component :id="'modal_componentes_' + key + component.prop.Name"
                :is="impComponent(component.prop.BaseClass)" v-model:Value="component.prop.Value"
                v-model:Status="component.prop.Status" :Registro="props.Registro" :prop="component.prop"
                :style="component.style" :position="component.position" @click.capture="component.click()">
              </component>

            </div>
          </div>
        </tab>

      </slot>


      <!--
            container




        
        
        original
        tab title="Tab 2">{{frame[2].title}}</tab>
        <tab title="Tab 3">{{frame[3].title}}</tab>
        <tab title="Tab 4">{{frame[4].title}}</tab-->
    </tabs>
  </div>
  <!--
    
  /*  script original
  <script>
  import Tab from './Tab.vue'
  import Tabs from './Tabs.vue'
  
  export default {
    components: {
      Tab,
      Tabs
    },
    data () {
      return {
        mode: 'dark'
      }
    },
    methods: {
      changeStyle () {
        if (this.mode === 'dark') {
          this.mode = 'light'
        } else {
          this.mode = 'dark'
        }
      }
    }
  }
  </script>

  
  -->

</template>

<script lang="ts" setup>
import { reactive } from 'vue';


//////////////////////////////////////////////
// Componentes
//////////////////////////////////////////////

const imgButton = defineAsyncComponent(() => import('@/components/imgButton.vue'))
const comboBox = defineAsyncComponent(() => import('@/components/comboBox.vue'))
const editText = defineAsyncComponent(() => import('@/components/editText.vue'))
const textLabel = defineAsyncComponent(() => import('@/components/textLabel.vue'))
const grid = defineAsyncComponent(() => import('@/components/grid.vue'))
const browseLite = defineAsyncComponent(() => import('~/components/browse.vue'))
const details = defineAsyncComponent(() => import('@/components/details.vue'))
const embedPdf = defineAsyncComponent(() => import('@/components/embedPdf.vue'))
const container = defineAsyncComponent(() => import('@/components/container.vue'))




interface Props {
  //Recno: number;
  Component: null;
  // Name,
  Registro: number;

  prop: {};
  style: {};
  position: {};
  pageFrame: [];
}

//const props = defineProps<{
const props = withDefaults(defineProps<Props>(), {
  //Name: '',
  Registro: 0,
  // Component: null,
  // Value: undefined,
  prop: {

    BaseClass: "container",
    BoundColumn: 1, // Columna donde se tomara el Value

    Capture: true,
    ControlSource: "",
    ColumnCount: 0,
    ColumnWidths: "", //"75%,25%"

    List: [],

    Disabled: false,

    ErrorMessage: "",

    First: false,
    Focus: false,
    Format: "",

    InputMask: "",

    MaxLength: 0,
    MultiSelect: false,
    //Multiple: false,

    Name: "",

    Placeholder: "",

    ReadOnly: false,
    RowSource: "", // vi_cap_doc.tdo_tdo,des_tdo
    RowSourceType: 0, //1-Value, 2-Alias, 3-SQL Server,4- Local SQL, 5-Array


    Sorted: false,
    Status: "",
    ShowError: false,
    ShowValue: false,
    Style: 0, //0=DropDown Combo 2=DropDown List

    TabIndex: 0,
    Tag: "",
    textLabel: "",
    This: null,
    ToolTipText: "",
    Type: "text",

    Valid: false,
    Visible: true,
    Value: [String, Number, Date],


  },

  style: {
    background: "white",
    padding: "5px", // Relleno
    color: "#b94295",
    width: "auto",
    height: "30px",
    fontFamily: "Arial",
    fontSize: "13px", // automaticamente vue lo cambiara por font-size (para eso se utiliza la anotacion Camello)
    textAlign: "left",
    borderColor: "#000a01",
    borderWidth: "1px",
    borderStyle: "solid",
    zIndex: 1,

    // inputWidth: "inherit"
  },
  position: {
    position: "left", //left,right,center,absolute. Si es absulute poner Value left y top
    left: 0,
    Top: 0,
  },


  pageFrame: [],

})

//const frame = reactive(props.pageFrame)



const Component = ref(props.prop.This)
const This = Component.value


const Id = This.Name + props.Registro.toString()
console.log('Container Name=', This.prop.Name, 'blocks=', This.block)
const Divi = ref(This.Divi)


const mode = ref('dark')

const changeStyle = () => {
  if (mode.value === 'dark') {
    mode.value = 'light'
  } else {
    mode.value = 'dark'
  }
}



/*
const elementArray = []
let i = 0
let j = 0
const ele = []
for (const ver in Divi.value) {
  i++
  for (const hor in Divi.value[ver]) {
    const PosVer = +ver.slice(0, 4)
    const PosHor = +hor.slice(0, 4)
 
    if (!ele[PosVer])
      ele[PosVer] = []
 
    ele[PosVer][PosHor] = Divi.value[ver][hor]
    j++
  }
}
 
const element = ref(ele)
console.log('Divi ele=>', element.value)
*/
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
    case 'details': {
      return details
      break
    }
    /*
        case 'container': {
          return container
          break
        }*/
    case 'embedpdf': {

      return embedPdf
      //return defineAsyncComponent(() => import('@/components/comboBox.vue'))  //import('@/components/${name}.vue'))

      break
    } case 'container': {

      return container
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


<style lang="css">
* {
  margin: 0;
  padding: 0;
  font-family: 'Karla', sans-serif;
}

.wrapper {
  width: 100%;
  min-height: 100vh;
  background-color: #f8f8f8;
  margin: 0;
  padding: 20px;
}

.change__style {
  background-color: #eee;
  font-size: 1em;
  margin-bottom: 10px;
  padding: 5px;
}
</style>