<template>
  <div class="img" :style="estilo" v-show="false" :disabled="prop.ReadOnly" :tabindex="prop.TabIndex">
    <div class="tooltip">
      <v-btn variant="flat" color="secondary" :icon="imagen.src" size="large">{{ prop.Value }}

      </v-btn>
      <!--span v-if="prop.ToolTipText" class="errortext">{{
        prop.ToolTipText
        }}</span-->
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


const Component = toRef(() => props.prop.This)
//console.log('editText Component=', Component.value)
const This = Component.value  // falta probar reactividad utilizando Component.value.This

const Este = props.prop.This
const captionStyle = reactive({ ...Este.captionStyle })
const inputStyle = reactive({ ...Este.inputStyle })
const divStyle = reactive({ ...Este.style })
const containerStyle = reactive({ ...Este.containerStyle })

const Id = This.prop.Name + '_' + Math.floor(Math.random() * 10000000).toString() //props.Registro.toString().trim()


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
