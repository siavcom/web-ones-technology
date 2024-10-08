<template>
  <div class="divibutton" v-show="prop.Visible" :style="style">
    <!--div class="mensajes"-->
    <!--type="submit"-->
    <button class='button' v-show="prop.Visible" :disabled="prop.ReadOnly || prop.Disabled" :tabindex="prop.TabIndex"
      @focusout="focusOut" @focus="onFocus" :style="inputStyle">
      <img class="img" :src="prop.Image" :alt="prop.Value" :disabled="prop.ReadOnly" />
      <label v-if="prop.Image.length > 0"
        :style="{ 'word-wrap': 'break-word', 'font-size': style.fontSize, 'color': style.color }"
        :disabled="prop.ReadOnly" v-show="prop.Visible">{{ prop.Value }}</label>
    </button>
    <span class="tooltiptext" v-if="prop.ToolTipText.length > 0" v-show="ToolTipText">{{
      prop.ToolTipText
      }}</span>
    <!--/div-->
  </div>
</template>

<script setup lang="ts">
/*

<v-btn
 
      color="yellow"
      icon><v-icon>prop.Image</v-icon>
           

      </v-btn>



*/
/*import { 
   //toRefs,
   //defineProps,
   ref, watch } from "vue";
*/
const props = defineProps<{
  //Value: string;
  Registro: 0;
  prop: {
    Click: false;
    ToolTipText: string;
    View: "";
    Field: "";
    Recno: "";
    Value: string;
    Placeholder: "";
    Format: "";
    InputMask: "";
    MaxLenght: 0;
    ReadOnly: false;
    Disabled: false;
    Tag: "";
    Sw_val: false;
    Capture: false;
    Name: "";
    Label: "";
    Type: "text";
    Visible: boolean;
    TabIndex: number;
    BaseClass: "imgButton";

    Image: "";

    /* componentStyle: {
      background: "white";
      padding: "5px"; // Relleno
      color: "#b94295";
      width: "30px";
      height: "30px";
    };*/

  };

  style: {
    background: "white";
    backgroundColor: "white";
    padding: "5px"; // Relleno
    color: "#b94295";
    width: "500px";
    height: "30px";
    fontFamily: "Arial";
    fontSize: "13px"; // automaticamente vue lo cambiara por font-size (para eso se utiliza la anotacion Camello)
    textAlign: "left";
    borderColor: "#000a01";
    borderWidth: "1px";
    zIndex: 1;
  };
  position: {
    position: "left"; //left,right,center,absolute. Si es absulute poner valor left y top
    left: number;
    Top: number;
  };
  // imagen: {
  //   src: ""
  //backgroundImage: string;
  //position: "bottoncenter";
  //width: "20px"; //    width: "100%", "50px"
  //height: "50px";
  //opacity: "0.3";
  //borderRadius: "4px";
  //   padding: "5px";
  // };
}>();


const Component = ref(props.prop.This)
const This = Component.value
const inputStyle = reactive(This.inputStyle)
//inputStyle.width = This.style.width
//inputStyle.height = This.style.height


if (inputStyle.width == 'auto')
  inputStyle.width = '100%'
This.Recno = props.Registro

const Value = ref(props.prop.Value)
const ToolTipText = ref(true)


watch(
  () => props.prop.Value,

  (new_val, old_val) => {
    console.log('Button cambio Value', new_val, old_val)
  },
  { deep: false }
);


////////////////////////////////////////
// Registro
// Nota: Lee de la base de datos local segun el valor de Registro
//       Se utiliza para el manejo de grid
///////////////////////////////////////
watch(
  () => props.Registro,
  async () => {

    // console.log('EditText Watch Registro Name=', This.prop.Name, 'new_val =', props.Registro)
    emitValue(true)
    This.Recno = props.Registro
  },
  { deep: true }
);



/////////////////////////////////////////////////////////////////////
// focusOut
// Descripcion: Cuando pierda el foco el componente , actualizamo el valor en cursor local
/////////////////////////////////////////////////////////////////
const focusOut = async () => {

  ToolTipText.value = true  // Activamos el ToolTipText

};

const onFocus = async () => {

  ToolTipText.value = false  // Activamos el ToolTipText
  await This.when()
  if (!This.prop.Disabled && !This.prop.ReadOnly) {
    This.Form.eventos.push(This.prop.Map + '.click()')

  }
}




/////////////////////////////////////////
// Metodo init Vfp
// Aqui debemos de asignar todos los Valores inciales del componente
// A pesar que nom_nom se pasa por referencia, se tuvo que definir en props para qu fuera reactivo
// Se tiene que emitir para que cambie el Valor en el template
/////////////////////////////////////////

const init = async () => {

  This.Recno = props.Registro

  if (props.Registro > 0) {
    if (props.prop.ControlSource.length > 0) {

      Status.value = 'P';  // en lectura
      emit("update:Status", 'P'); // actualiza el valor Status en el componente padre. No se debe utilizar Status.Value

      await readCampo(props.Registro)
      if (!props.prop.First) {

        //await emitValue()
      }
      Status.value = 'A';  // Activo
      emit("update:Status", 'A'); // actualiza el valor Status en el componente padre. No se debe utilizar Status.Value
    }

  };
  // console.log('Init imgButton Name=', props.prop.Name, 'Src=', props.prop.Image, 'props.Registro=', props.Registro)
}

onMounted(() => {
  init() // Ejecuta el init
});


</script>

<style scoped>
.button {
  background-color: bind("props.style.backgroundColor")
}
</style>
