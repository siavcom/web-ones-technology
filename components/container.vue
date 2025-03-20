<template>

  <!--div id="mask" class="mask" v-if="This.prop.Visible"-->
  <div :id="Id + 'container'" class="container" v-if="This.prop.Visible" :style="divStyle"
    @click.middle.stop="middleClick()">

    <!--section class=" mainContainer"-->

    <div :id="Id + 'header'" class="header">
      <slot name="header">{{ This.prop.ColumnTextLabel }}</slot>
    </div>

    <div :id="Id + 'body'" class="body" style="width: 99%">
      <div v-if="!This.block || This.block.length == 0" :id="Id + 'no_block'">
        <slot name="componentes">
          <div :id="Id + '_componentes'" v-if="Divi" v-for="(Ver, key) in Divi" :key="Ver"
            :style="{ 'display': 'inline-flex' }">
            <div :id="Id + 'hor_componentes_' + key + Ele.prop.Name" v-for="(Ele) in Ver" :key="Ele"
              :style="{ 'padding-bottom': '2px', 'width': '100%' }">
              <component :id="Id + '_Ver_componentes_' + key + Ele.prop.Name" :is="impComponent(Ele.prop.BaseClass)"
                v-model:Value="Ele.prop.Value" v-model:Status="Ele.prop.Status" :Registro="Ele.Recno" :prop="Ele.prop"
                :style="Ele.style" :position="Ele.position"></component>
            </div>
            <!-- @click.capture="Ele.click()"-->
          </div>

        </slot>
      </div>
      <div v-else :id="Id + 'blocks'">
        <slot name="componentes">
          <div :id="'componentes_divi_' + key" v-for="(block, key) in This.block" :key="key">
            <div :id="'block_' + key" v-if="block.prop.Visible" :style="block.style">
              <label :style="block.titleStyle" v-if="block.prop.Visible && block.title">{{ block.title }}</label>
              <div v-for="(component, key) in block.component" :key="key"
                :id="'modal_hor_componentes_' + key + component.prop.Name" style="padding-bottom:2px">
                <!--v-bind:Component="ref(Ele)"-->
                <component :id="'modal_componentes_' + key + component.prop.Name"
                  :is="impComponent(component.prop.BaseClass)" v-model:Value="component.prop.Value"
                  v-model:Status="component.prop.Status" :Registro="props.Registro" :prop="component.prop"
                  :position="component.position">
                </component>
                <!-- @click.capture="component.click()"
                :inputStyle="component.inputStyle"-->
              </div>
            </div>
          </div>

        </slot>

      </div>
      <!--/section-->
    </div>
    <!--/div-->
  </div>
</template>

<script lang="ts" setup>



interface Props {
  Registro: number;
  prop: {};
  // style: {};
  position: {};
}

//const props = defineProps<{
const props = withDefaults(defineProps<Props>(), {

  Registro: 0,
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
    */
  position: {
    position: "left", //left,right,center,absolute. Si es absulute poner Value left y top
    left: 0,
    Top: 0,
  },

})
/*
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


*/
//const Component = ref(props.prop.This)
const Component = toRef(() => props.prop.This)
const This = Component.value
const Este = props.prop.This
const labelStyle = reactive({ ...Este.labelStyle })
const inputStyle = reactive({ ...Este.inputStyle })
const divStyle = reactive({ ...Este.style })


//const Id = This.Name + props.Registro.toString()

const Id = This.prop.Name + '_' + Math.floor(Math.random() * 10000000).toString() //props.Registro.toString().trim()
//console.log('Container Name=', This.prop.Name, 'blocks=', This.block, 'Style=', divStyle)
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
