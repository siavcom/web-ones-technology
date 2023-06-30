<template>
  <div class="divibutton" v-show="prop.Visible" :style="style">
    <div class="mensajes">

      <button class='button' type="submit" v-show="prop.Visible" :disabled="prop.ReadOnly" :tabindex="prop.TabIndex"
        @focusout="focusOut" @focus="onFocus">
        <img class="img" :src="prop.Image" :alt="prop.Value" :disabled="prop.ReadOnly" />
        <label v-if="prop.Image.length > 0"
          :style="{ 'word-wrap': 'break-word', 'font-size': style.fontSize, 'color': style.color }"
          :disabled="prop.ReadOnly" v-show="prop.Visible">{{ prop.Value }}</label>
      </button>
      <span class="tooltiptext" v-if="prop.ToolTipText.length > 0" v-show="ToolTipText">{{
        prop.ToolTipText
      }}</span>
    </div>
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

    componentStyle: {
      background: "white";
      padding: "5px"; // Relleno
      color: "#b94295";
      width: "30px";
      height: "30px";
    };

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
const Value = ref(props.prop.Value)
const ToolTipText = ref(true)


watch(
  () => props.prop.Value,

  (new_val, old_val) => {
    console.log('Button cambio Value', new_val, old_val)
  },
  { deep: false }
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
}


/////////////////////////////////////////
// Metodo init Vfp
// Aqui debemos de asignar todos los Valores inciales del componente
// A pesar que nom_nom se pasa por referencia, se tuvo que definir en props para qu fuera reactivo
// Se tiene que emitir para que cambie el Valor en el template
/////////////////////////////////////////

const init = async () => {
  //await This.init()


  if (props.Registro > 0 && props.prop.ControlSource.length > 0) {

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


init(); // Ejecuta el init




</script>
<style scoped >

/* Tooltip and error container */
div.mensajes {
  position: relative;
/*  display: inline-block;*/
 /* border-bottom: 1px dotted black; /* If you want dots under the hoverable text */
  /*min-width: 50%; */
}

/* Tooltip text */
div.mensajes .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: #76a184 ;/*rgb(115, 181, 243);*/
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
  z-index: 2;

  /* Position the tooltip text */
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -60px;

  /* Fade in tooltip */
  opacity: 1;
  transition: opacity 0.2s ease;
  
}

/* Tooltip arrow */
div.mensajes .tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 2px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

/* Show the tooltip text when you mouse over the tooltip container */
div.mensajes:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}




.divibutton {
  border-radius: 10%;
  box-shadow: 0 4px 8px 0, 0 6px 20px 0;
  box-sizing: "border-box";
}

.button {
  background-color: bind("props.style.backgroundColor")
}
</style>

