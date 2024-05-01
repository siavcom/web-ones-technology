<template>
  <Teleport to="body">
    <Transition name="modal">
      <div :id="'modal_mask' + This.prop.Name" class="modal-mask" v-if="This.prop.Visible">
        <div :id="'modal_container' + This.prop.Name" class="modal-container" :style="This.style">

          <!--section class="mainContainer"-->

          <div :id="'modal_header' + This.prop.Name" class="modal-header">
            <slot name="header">{{ This.textLabel }}</slot>
          </div>


          <div :id="'modal_body' + This.prop.Name" class="modal-body">
            <slot name="componentes">
              <div :id="'modal_componentes' + key" v-if="Divi" v-for="(Ver, key) in  Divi" :key="Ver">
                <div :id="'modal_hor_componentes_' + key + Ele.prop.Name" v-for=" (Ele) in  Ver" :key="Ele"
                  style="padding-bottom:2px">
                  <component :id="'modal_componentes_' + key + Ele.prop.Name" :is="impComp(Ele.prop.BaseClass)"
                    v-bind:Component="ref(Ele)" v-model:Value="Ele.prop.Value" v-model:Status="Ele.prop.Status"
                    v-model:Focus="Ele.Focus" :Registro="Ele.Recno" :prop="Ele.prop" :style="Ele.style"
                    :position="Ele.position" @click.capture="Ele.click()"></component>

                </div>
              </div>

            </slot>
          </div>
          <!--/section-->
        </div>
      </div>

    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>

//////////////////////////////////////////////
// Componentes
//////////////////////////////////////////////

const imgButton = defineAsyncComponent(() => import('@/components/imgButton.vue'))
const comboBox = defineAsyncComponent(() => import('@/components/comboBox.vue'))
const editText = defineAsyncComponent(() => import('@/components/editText.vue'))
const textLabel = defineAsyncComponent(() => import('@/components/textLabel.vue'))
const grid = defineAsyncComponent(() => import('@/components/grid.vue'))
const browseLite = defineAsyncComponent(() => import('@/components/browseLite.vue'))
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
}

//const props = defineProps<{
const props = withDefaults(defineProps<Props>(), {
  //Name: '',
  Registro: 0,
  Component: null,
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

})

const Component = ref(props.Component)
const This = props.Component.value // Component.value
const Id = This.Name + props.Registro.toString()
const Divi = ref(This.Divi)
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

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 300px;
  margin: auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>