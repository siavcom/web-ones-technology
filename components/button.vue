<template>
  <div class="img" :style="estilo" v-show="false" :disabled="prop.ReadOnly" :tabindex="prop.TabIndex">
    <div class="tooltip">
      <v-btn variant="flat" color="secondary" :icon="imagen.src" size="large">{{ prop.Value }}

      </v-btn>
      <!--button
        type="submit"
        :style="imagen">
        <nuxt-img
          class="img"
          :src="imagen.src"
          alt="prop.Value"
        />
        <label >{{
          prop.Value
        }}</label>
      </button-->

      <!--input
        type="image"
        class="imagen"
        :style="imagen"
        :src="imagen.src"
        v-model.trim="prop.Value"
        :disabled="prop.ReadOnly"
        :v-show="prop.Visible"
        :alt="prop.Value"
      /-->

      <span v-if="prop.ToolTipText" class="tooltiptext">{{
    prop.ToolTipText
  }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">

//import { toRefs,defineProps,ref,watch} from "vue";

//import { getCurrentInstance } from "vue";
//export const This = getCurrentInstance();

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
    Visible: true;
    TabIndex: number;
    BaseClass: "imgButton";
  };

  estilo: {
    background: "white";
    padding: "5px"; // Relleno
    color: "#b94295";
    width: "500px";
    height: "30px";
    fontFamily: "Arial";
    fontSize: "13px"; // automaticamente vue lo cambiara por font-size (para eso se utiliza la anotacion Camello)
    textAlign: "left";
    borderColor: "#000a01";
    borderWidth: "1px";
    zIndex: 1
  };
  posicion: {
    position: "left"; //left,right,center,absolute. Si es absulute poner valor left y top
    left: number;
    Top: number;
  };
  imagen: {
    src: ""
    //backgroundImage: string;
    //position: "bottoncenter";
    //width: "20px"; //    width: "100%", "50px"
    //height: "50px";
    //opacity: "0.3";
    //borderRadius: "4px";
    padding: "5px";
  };
}>();


watch(
  () => props.prop.Value,

  (new_val, old_val) => {
    console.log('Button cambio Value', new_val, old_val)
  },
  { deep: false }
);



//const Value = ref(props.prop.Value);
//const { Value } = toRefs(props);
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  margin: 40px 0 0;
}

div.img {
  background-color: rgb(255, 255, 255);
  box-shadow: 0 4px 8px 0, 0 6px 20px 0;
  box-sizing: border-box;
  width: 80px;
  height: auto;
  border-radius: 10%;
  padding: 0px;

}

/*input {
  border-width: 0px;
  width: 60px;
  height: 60px;
  
} */

button {
  border-width: 2px;
  width: auto;
  height: auto;
  padding: 5px;
  border-radius: 10%;
}
</style>
<!-- 

 -->
