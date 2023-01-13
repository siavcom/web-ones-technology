<template>
  <div class="divbutton"  v-show="prop.Visible" :style="style">
    <div class="mensajes">
      <button class='button' type="submit" v-show="prop.Visible" :disabled="prop.ReadOnly" :tabindex="prop.TabIndex"
        
        @focusout="focusOut" @focus="onFocus" >
        <img class="img" :src="prop.Image" :alt="prop.Value" :disabled="prop.ReadOnly" 
         
        />
        <label v-if="prop.Image.length > 0" :style="{'word-wrap':'break-word','font-size':style.fontSize,'color':style.color }"
           :disabled="prop.ReadOnly"
          v-show="prop.Visible">{{prop.Value}}</label>
      </button>
      <span class="tooltiptext" v-if="prop.ToolTipText.length > 0" v-show="ToolTipText">{{ prop.ToolTipText }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">

import { 
  //toRefs, 
  //defineProps, ref, watch } from "vue";

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
    Image: ""
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

//const Value = ref(props.prop.Value);
//const { Value } = toRefs(props);
</script>
<style scoped >

.divbutton{
  border-radius: 10% ; 
  box-shadow: 0 4px 8px 0, 0 6px 20px 0;
  box-sizing: "border-box";
}
.button{
  background-color:bind("props.style.backgroundColor")
}
</style>

