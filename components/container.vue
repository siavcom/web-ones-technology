<template>

  <!--div id="mask" class="mask" v-if="This.prop.Visible"-->
  <div :id="Id + 'container'" class="container" v-if="This.prop.Visible" :style="This.style">

    <!--section class="mainContainer"-->

    <div :id="Id + 'header'" class="header">
      <slot name="header">{{ This.textLabel }}</slot>
    </div>

    <div :id="Id + 'body'" class="body">
      <div v-if="!This.block || This.block.length == 0" :id="Id + 'no_block'">
        <slot name="componentes">
          <div :id="Id + 'componentes' + key" v-if="Divi" v-for="(Ver, key) in Divi" :key="Ver"
            :style="{ 'display': 'inline-flex' }">
            <div :id="Id + 'hor_componentes_' + key + Ele.prop.Name" v-for=" (Ele) in Ver" :key="Ele"
              :style="{ 'padding-bottom': '2px', 'width': '100%' }">
              <component :id="Id + 'componentes_' + key + Ele.prop.Name" :is="impComponent(Ele.prop.BaseClass)"
                v-model:Value="Ele.prop.Value" v-model:Status="Ele.prop.Status" :Registro="Ele.Recno" :prop="Ele.prop"
                :style="Ele.style" :position="Ele.position" @click.capture="Ele.click()"></component>
            </div>
          </div>

        </slot>
      </div>
      <div v-else :id="Id + 'blocks'">
        <slot name="componentes">
          <div :id="'componentes_divi_' + key" v-for="(block, key) in This.block" :key="key">
            <div :id="'block_' + key" v-if="block.prop.Visible" :style="block.style">
              <label v-if="block.prop.Visible && block.title">{{ block.title }}</label>
              <div v-for=" (component, key) in block.component" :key="key"
                :id="'modal_hor_componentes_' + key + component.prop.Name" style="padding-bottom:2px">
                <!--v-bind:Component="ref(Ele)"-->
                <component :id="'modal_componentes_' + key + component.prop.Name"
                  :is="impComponent(component.prop.BaseClass)" v-model:Value="component.prop.Value"
                  v-model:Status="component.prop.Status" :Registro="props.Registro" :prop="component.prop"
                  :style="component.style" :inputStyle="component.inputStyle" :position="component.position"
                  @click.capture="component.click()">
                </component>

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
  //Recno: number;
  Component: null;
  // Name,
  Registro: number;

  prop: {};
  style: {};
  inputStyle: {};
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

})

const Component = ref(props.prop.This)
const This = Component.value

const Id = This.Name + props.Registro.toString()
console.log('Container Name=', This.prop.Name, 'blocks=', This.block)
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
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
