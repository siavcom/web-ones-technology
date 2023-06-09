<template>
  <div class="'wraper" v-show="prop.Visible">
    <div class='reportViewer'  :style="style">
      <iframe :src="BSource" :width="style.width" height="1200px" />
    </div>
  </div>
</template>

<script setup lang="ts">
/*
    <a :href="BSource">http</a>.

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
    Visible: false;
    TabIndex: number;
    BaseClass: "imgButton";
    Source: null;

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


}>();
const BSource = ref('')



watch(
  () => props.prop.Source,

  (new_val, old_val) => {
    console.log('embedPdf source', new_val, old_val)
    BSource.value = ''

    if (new_val != null) {
      //const blob = new Blob([JSON.stringify(new_val)],{type: 'application/pdf'})


      const blob = new Blob([new_val], { type: 'application/pdf' }); // JavaScript Blob


      //  BSource.value = URL.createObjectURL(blob);
      BSource.value = URL.createObjectURL(blob);





      // BSource.value = objectUrl
      /*  
      const blob = new Blob([new_val])
      console.log('embedPdf source blob', blob)
  
      const objectUrl = URL.createObjectURL(blob);
  
      BSource.value = objectUrl;
      */
    }
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
  background-color: #76a184;
  /*rgb(115, 181, 243);*/
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

