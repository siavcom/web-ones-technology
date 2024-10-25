<template>
  <div class="divi" :style="style" :v-show="prop.Visible">
    <!--Mensaje de error -->
    <label v-show="Error">{{ prop.ErrorMessage }}</label>
    <div class="tooltip">
      <!--Etiqueta del componente -->

      <span class="etiqueta" v-if="prop.Label">{{ prop.Label + " " }}</span>
      <!--Input del componente -->
      <div class="optionButton" v-for="(items, valueIndex) in componente" :key="valueIndex">
        <input class='optionButton' :value="items.prop.PickValue" v-model="Valor" @change="valid" @focus="onFocus"
          :v-show="items.prop.Visible" :disabled="prop.ReadOnly" type="radio">
        <label>{{ items.prop.Caption }}</label>
      </div>
    </div>
    <span v-if="prop.ToolTipText" class="errortext">
      {{
        prop.ToolTipText
      }}
    </span>
    <!--/div-->
  </div>
</template>


<script setup lang="ts">
/*
        @change="valid"
        @focus="onFocus"
        :disabled="prop.ReadOnly"
        :v-show="prop.Visible"
        :placeholder="prop.Placeholder"
        type="text ? prop.Type : 'text'"


*/
/*import {
  defineEmits,
  defineProps,
  ref,
  //  onUnmounted,
  watch,
  //  toRefs,
  // toRefs,
  //toRef,
  // onMounted,
  // onBeforeUpdate,
  // onUpdated,
  // onUnmounted,

} from "vue";
*/
const emit = defineEmits(["update", "update:Value", "update:Status", "update:ErrorMessage"]);
import { localDb } from "@/classes/LocalDb";  // manejo del indexedDb

///////////////////////////////////////
// Propiedades del componente reactivas
////////////////////////////////////
const props = defineProps<{

  prop: {
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
    Capture: true;
    Name: "";
    Label: "";
    Type: "text";
    Visible: true;
    ControlSource: string;
    Status: string;
    ErrorMessage: '';
  };

  style: {
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
    display: "inlineFlex"
  };
  position: {
    position: "left"; //left,right,center,absolute. Si es absulute poner Value left y top
    left: number;
    Top: number;
  };
  componente: Record<string, never>;
}>();
const Valor = ref('')
const Value = ref(props.prop.Value);
const Status = ref(props.prop.Status);
const Error = ref(false)
const ErrorMessage = ref(props.prop.ErrorMessage)


const LocalDb = new localDb();

/////////////////////////////////////////////////////////////////////
// Valid
// Descripcion: Cuando se cambie el valor del componente template (Value.value con el teclado),
//              tenemos que emitir hacia el padre el valor capturado (Value.value) y ejecutar el update
/////////////////////////////////////////////////////////////////
const valid = async () => {
  Value.value = Valor.value;
  console.log('Entro al valid del Option Group', Value.value)
  /*
  emit("update:Value", Value.value); // actualiza el valor en el componente padre
    emit("update") // emite un update en el componente padre
  
    if (Value.value > '') return;
  */
  const valor = Value.value;
  if (props.prop.ControlSource && props.prop.ControlSource.length > 0) {
    await LocalDb.update(valor).then(() => { // actualiza valor en localDb
    })
  }
  Status.value = 'A'
  console.log('EditBox antes emit Value ====>', props.prop.Value, props.prop.Status)
  emit("update:Value", Value.value); // actualiza el valor  en el componente padre
  emit("update:Status", 'A'); // actualiza el valor en el componente padre
  emit("update") // emite un update en el componente padre


  console.log('EditBox despuest emit Value ====>', props.prop.Value, props.prop.Status)
  return true;
};

/////////////////////////////////////////////////////////////////////
// onFocus
// Descripcion: Cuando se cambie el valor del componente template (Value.value con el teclado),
//              tenemos que emitir hacia el padre el valor capturado (Value.value) y ejecutar el update
/////////////////////////////////////////////////////////////////
const onFocus = () => {
  Status.value = 'P';  // en proceso
  Error.value = false;
  ErrorMessage.value = '';

  //emit("update:Status", Status.value); // actualiza el valor en el componente padre


  // eslint-disable-next-line no-undef
  emit("update:Status", 'P'); // actualiza el valor en el componente padre. No se debe utilizar Status.Value
  emit("update:ErrorMessage", '')
  emit("update")
  console.log('On Focus status  ===>', props.prop.Status, props.prop.ErrorMessage)
}

////////////////////////////////////////
// Watchers : Triggers de templates
// Descripcion : Cuando cambia el Value de la propiedad del ControlSource, asigna el Value de
//                la vista a la propiedad de Value de la propiedad
// Notas : Si se tiene en props, se tiene que vigilar el cambio de props.prop.Value

////////////////////////////////////////
// ControlSource
watch(
  () => props.prop.ControlSource,
  (new_val, old_val) => {
    LocalDb.ControlSource = new_val;
  },
  { deep: false }
);

/////////////////////////////////////////
// ErrorMesagge
watch(
  () => props.prop.ErrorMessage,
  (new_val, old_val) => {
    if (new_val.length == 0)
      Error.value = false
    else
      Error.value = true;

    console.log('Watch Mensage de error==>', new_val, Error.value)
  },
  { deep: false }
);

/////////////////////////////////////////////////////////
// watch Value
//  Nota : Si se cambia el valor desde la forma principal, se debe de actualizar en el
//          Componente
//////////////////////////////////////////

watch(
  () => props.prop.Value,
  (new_val, old_val) => {
    console.log('optionGroup watch Value Valor==>', new_val)
    Valor.value = new_val;

  },
  { deep: false }
);

/////////////////////////////////////////
// Metodo init Vfp
// Aqui debemos de asignar todos los Valores inciales del componente
// A pesar que nom_nom se pasa por referencia, se tuvo que definir en props para qu fuera reactivo
// Se tiene que emitir para que cambie el Valor en el template
/////////////////////////////////////////
const init = async () => {
  //Value.value = 0; // asignamos Valor inicial
};


init(); // Ejecuta el init
</script>

<style scoped>
/*  elemento click check*/
div.optionButton {
  display: contents;
  /* margin-bottom: 5px;
  margin-top: 5px;
  margin-left: 5px;
  margin-right: 5px;*/
}
</style>