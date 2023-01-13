<template>
  <div class="divi" :style="estilo" :v-show="prop.Visible">
    <span class="etiqueta" v-if="prop.textLabel">{{ prop.textLabel + " " }}</span>
    <div v-if="prop.Type == 'checkbox'" class="Caption" v-text="Caption==1? '[x]':'[]'" />

    <div v-else class="Caption" v-text="Caption" />
    <input class="texto" readonly="true" :v-show="prop.Value > ' '" v-model="Value" />
  </div>
</template>

<script setup lang="ts">
import {
  //  defineEmits,
  //  defineProps,
  //  defineExpose,
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
const emit = defineEmits(["update", "update:Value", "update:Status", "update:ErrorMessage", "update:Key"]);
//import { localDb } from "@/classes/LocalDb";  // manejo del indexedDb

///////////////////////////////////////
// Propiedades del componente reactivas
////////////////////////////////////
const props = defineProps<{
  Recno: 0;
  prop: {
    ToolTipText: string;
    View: "";
    Field: "";
    Value: string;
    Caption: string;
    Placeholder: "";
    Format: "";
    InputMask: "";
    MaxLenght: 0;
    ReadOnly: false;
    Tag: "";
    Sw_val: false;
    Capture: true;
    Name: "";
    textLabel: "";
    Type: string;
    Visible: true;
    ControlSource: "";
    Status: string;
    ErrorMessage: string;
    TabIndex: number;
    Key: string;
    BaseClass: "label";
    Grid: false;


    //compAddress: any;
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
  };
  posicion: {
    position: "left"; //left,right,center,absolute. Si es absulute poner Value left y top
    left: number;
    Top: number;
  };
  db: any
}>();
const Status = ref(props.prop.Status)
Status.value = 'I'
const Value = ref(props.prop.Value);
const Caption = ref(props.prop.Caption);
defineExpose({ Caption });

////////////////////////////////////////////////////////////////////
// emitValue
// Descripcion: emite hacia el componente padre el nuavo valor asignado
/////////////////////////////////////////////////////////////////
const emitValue = async () => {
  Status.value = 'A'
  //console.log('EditBox antes emit Value ====>', props.prop.Value, Value.value)
  emit("update:Value", Value.value); // actualiza el valor Value en el componente padre
  emit("update:Status", 'A'); // actualiza el valor Status en el componente padre
  emit("update") // emite un update en el componente padre
  //console.log('EditBox despuest emit Value ====>', props.prop.Value, props.prop.Status)
  return true;
};


const readCampo = async (recno: number) => {
  if (Status.value == 'A') {
    Status.value = 'P'
    emit("update:Status", 'P'); // actualiza el valor Status en el componente padre. No se debe utilizar Status.Value
  }
  Value.value = await props.db.value.readCampo(props.prop.ControlSource, recno)
  console.log('Label===,', props.prop.Name, Value.value)
  await emitValue()

}




/////////////////////////////////////////
// Watchers : Triggers de templates
// Descripcion : Cuando cambia el Value de la propiedad del ControlSource, asigna el Value de
//                la vista a la propiedad de Value de la propiedad
// Notas : Si se tiene en props, se tiene que vigilar el cambio de props.prop.Value

////////////////////////////////////////
// ControlSource
///////////////////////////////////////
watch(
  () => props.prop.ControlSource,
  (new_val, old_val) => {
    if (new_val != old_val) {
      if (props.Recno > 0 && new_val > '    ') {

        Caption.value = props.db.value.readRenglon(new_val, props.Recno)
        emit("update") // emite un update en el componente padre

      }
    }


  },
  { deep: false }
)

////////////////////////////////////////
// Recno
// Nota: Lee de la base de datos local segun el valor de recno
///////////////////////////////////////
watch(
  () => props.Recno,
  (new_val, old_val) => {
    if (new_val = 0 && props.prop.ControlSource > ' ' && old_val > 0) {
      Value.value = ''
      emitValue()
      return

    }

    if (new_val != old_val && new_val > 0 && props.prop.ControlSource > ' ') {
      console.log('watch label recno====>>>', new_val, old_val)
      readCampo(new_val)
    }
    //    LocalDb.ControlSource = new_val;
    return

  },
  { deep: false }
);

// Si se tiene en props, se tiene que vigilar el cambio de props.nom_nom
/*
const observa = watch(
  () => props.prop.Caption,

  (new_val, old_val) => {
    const view = props.prop.View;
    const field = props.prop.Field;
    const recno = props.prop.Recno;
    Caption.value = props.prop.Caption;


    if (view > "" && view[recno][field] != new_val) {
      view[recno][field] = new_val;
    }
  },
  { deep: false }
);
*/
/////////////////////////////////////////
// Metodo init Vfp
// Aqui debemos de asignar todos los Valores inciales del componente
// A pesar que nom_nom se pasa por referencia, se tuvo que definir en props para qu fuera reactivo
// Se tiene que emitir para que cambie el Valor en el template
/////////////////////////////////////////

const init = async () => {
  console.log('Label type',props.prop.Type)
  if (props.Recno > 0 && props.prop.ControlSource.trim().length > 0) {
    Value.value = await readCampo(props.Recno)
    // console.log('textLabel ',props.prop.Name,Value.value)

    //    console.log('Init textLabel==>',props.prop.Name,Caption.value)

    //    emit("update") // emite un update en el componente padre
    // if (!props.prop.Grid) props.db.value.asignaComponente(props.prop.ControlSource, Value)
  }

  //Status.value = 'I';
  //Value.value = 0; // asignamos Valor inicial
};


init();
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--style scoped>
h1 {
  margin: 40px 0 0;
}
input {
  color: #42b960;
  width: "100px";
  height: "30px";
}
</style-->

