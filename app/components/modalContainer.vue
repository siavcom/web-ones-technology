<template>
  <ClientOnly>

    <Teleport to="#teleports">
      <!--UContainer Dio problemas . Cambio la toda la apariencia--> <!--Transition-->

      <div :id="Id + '_modal_mask'" class="modal-mask" v-if="This.prop.Visible">

        <div :id="Id + '_modal_container'" class="modal-container" :style="This.style"
          @click.middle.stop="middleClick()">

          <span :id="Id + 'label'" class=" modal-header" :style="This.captionStyle">
            <label name="header">{{ This.prop.Caption }}</label>
          </span>
          <div :id="Id + 'modal_body'" class="modal-body">
            <slot name="componentes">
              <div :id="Id + 'componentes_divi_' + key" v-for="(block, key) in This.block" :key="key">
                <label v-if="block.title && block.prop.Visible">{{ block.title }}</label>
                <div :id="Id + 'block_' + key" v-if="block.prop.Visible" :style="block.style">

                  <div v-for="(component, key) in block.component" :key="key"
                    :id="Id + 'modal_hor_componentes_' + key + component.prop.Name" style="padding-bottom:2px">
                    <!--v-bind:Component="ref(Ele)"-->
                    <component :id="Id + 'modal_componentes_' + key + component.prop.Name"
                      :is="impComponent(component.prop.BaseClass)" v-model:Value="component.prop.Value"
                      :Registro="props.Registro" :prop="component.prop" :style="component.style"
                      :position="component.position">

                      <!--:style="component.style" :inputStyle="component.inputStyle"
                                               
                      @click.capture="component.click()"-->
                    </component>
                  </div>
                </div>
              </div>

            </slot>
          </div>
          <!--/section-->
        </div>

      </div>

      <!--/Transition-->
      <!--/UContainer-->
    </Teleport>

  </ClientOnly>
</template>

<script lang="ts" setup>


interface Props {
  Registro: number;

  prop: {};
  style: {};
  position: {};

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
    Value: '',


  },
  /*
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
    
    inputStyle: {
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
  */
})

const Component = ref(props.prop.This)
const This = Component.value // Component.value
const Este = props.prop.This
const captionStyle = reactive({ ...Este.captionStyle })
const inputStyle = reactive({ ...Este.inputStyle })
//const divStyle = This.prop.style // reactive({ ...Este.style })

//const Id = This.Name + props.Registro.toString()

const Id = This.prop.Name + '_' + Math.floor(Math.random() * 10000000).toString() //props.Registro.toString().trim()


//console.log('10 modalContainer Name=', This.prop.Name, 'divStyle=', divStyle, 'Id=', Id)

/**********************
 
//const Divi = ref(This.Divi)
// Generamos la Matriz Divi de forma dinamica para mostrar los elementos



// Buscamos cuantos Divi hay que generar
const arr = [];

let j = 0
for (let i = 0; i < This.Divi.length; i++) {
  if (This.Divi[i]) {
    arr[j] = []
    j++
  }
}


//const arr =await  Dime2D(j) // Create Array(j);


//const Divi = ref([[], [], []])
const Divi = ref(arr)
let x = 0

for (let i = 0; i < This.Divi.length; i++) {
  if (This.Divi[i]) {
    let y = 0
    for (let j = 0; j < This.Divi[i].length; j++) {
      if (This.Divi[i][j]) {
        console.log('1) modalContainer x,y=', x, y, This.Divi[i][j])
        Divi.value[x][y] = This.Divi[i][j]
        // console.log('2) modalContainer Divi=', Divi.value[x][y])
        y++
      }
    }
    x++
  }
}

console.log('modalContainer Divis=', This.Divi, Divi.value)

  ********************************/


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
/*
const compImport = {}
const impComp = ((name: string, pos?: string) => {

  const comp = name.toLowerCase().trim()
  if (!compImport[comp])
    compImport[comp] = defineAsyncComponent(() => import(`@/components/${name}.vue`))
    

  return compImport[comp]

})
*/


//init();
const middleClick = () => {
  // console.log('middleClick')
  if (This.Form && This.Form.translateContainer)
    This.Form.translateContainer.open(ref(This))
}


const handler = (event) => {
  if (event.which === 1) {
    //if (This.Form)
    //  This.Form.translateContainer.open(ref(This))

  }
  event.preventDefault();
}




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

.modal-container-old {
  /*width: 300px;*/
  margin: auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  overflow: auto;

  scrollbar-color: deeppink indigo;
  scrollbar-width: thin;
  scrollbar-gutter: auto;

}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
  width: 100%;
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