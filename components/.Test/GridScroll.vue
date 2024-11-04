<template>
  <div
    v-if="props.prop.Visible && props.prop.RecordSource.length > 0 && props.db.value && props.db.value.View[prop.RecordSource]"
    class="divi" :style="estilo" ref="Ref">

    <!--RecycleScroller-->

    <DynamicScroller :items="Db.View[prop.RecordSource]['recnoVal']" :item-size="25" :min-item-size="25" page-mode
      class="scroller" :prerender="10" key-field="id">


      <template #before>
        {{ prop.textLabel }}

      </template>




      <!-- slot que me da los renglones con el identificador item-->
      <template v-slot="{ item, index, active }">

        <DynamicScrollerItem :item="item" :active="active" :data-index="index" tag='tr'>






          <!--tr v-if="item == 1">
          <td>Renglon</td>
          <td v-for="(obj, elemento) in This">
         
            <div v-if="This[elemento] != null && This[elemento].BaseClass && This[elemento].BaseClass == 'Column'">
            
              {{ obj.textLabel }}
            </div>
          </td>

        </tr-->

          <tr>{{ item }}</tr>
          <!-- Columnasdiv v-for="cell in item" ><label>{{cell}}{{item}}</label></div-->

          <td v-for="(obj, col) in This" :key=obj.Order style="padding:0; text-align:center">

            <div v-if="This[col].BaseClass && This[col].BaseClass == 'Column' && This[col].prop.Status != 'I'">
              <!--template-->
              <KeepAlive>

                <textLabel v-bind:Recno="props.db.value.View[prop.RecordSource].recnoVal[index]"
                  v-bind:prop="This[col].prop" v-bind:estilo="This[col].estilo" v-bind:posicion="This[col].posicion"
                  v-bind:db="db">
                </textLabel>


              </KeepAlive>
              <!--/template-->
            </div>
          </td>
        </DynamicScrollerItem>
      </template>

      <template #after>
        temlplate finall
      </template>



    </DynamicScroller>
  </div>
</template>


<script setup lang="ts">

import {
  //  defineEmits,
  //  defineProps,
  //  defineExpose,
  ref,
  reactive,
  //  onUnmounted,
  watch,
  // toRefs,
  toRef,
  // onMounted,
  // onBeforeUpdate,
  // onUpdated,
  // onUnmounted,

} from "vue";


import { DynamicScroller, DynamicScrollerItem } from 'vue3-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

import imgButton from "/components/imgButton.vue"
import comboBox from "/components/comboBox.vue"
import editText from "/components/editText.vue"
import textLabel from "/components/textLabel.vue"

const emit = defineEmits(["update", "update:Value", "update:Status", "update:ErrorMessage", "update:Key", "update:Focus"]);
//import { localDb } from "@/classes/LocalDb";  // manejo del indexedDb

///////////////////////////////////////
// Propiedades del componente reactivas
////////////////////////////////////
const props = defineProps<{
  item: Object,
  prop: {
    ToolTipText: string;
    View: "";
    Field: "";
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
    textLabel: "";
    Type: "text";
    Visible: true;
    ControlSource: string;
    Status: string;
    ErrorMessage: string;
    TabIndex: number;
    Key: string;
    BaseClass: "EditText";
    Grid: false;
    Autofocus: false;
    RecordSource: string;
    //    SetFocus:false;
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
  Recno: 0;
  Component: null;
  db: any
}>();
// Valores componente padre

const Component = toRef(() => props.prop.This)
const This = Component.value
console.log('Gridd This=====>', This)
This['estatus'] = []
const eventos = reactive([]);  // pila de eventos a ejecutar en forma sincrona

const Db = props.db.value // Vista que utilizara el grid

//console.log('grid  view.value Db ====>',Db)
//const View=Db.View[props.prop.RecordSource] // Vista de captura de db
//console.log('grid  View ====>',props.prop.RecordSource,View)

// Valores propios
const Value = ref(props.prop.Value);
const Ref = ref(null) // Se necesita paratener referencia del :ref del componente  ref(props.prop.Ref)
const Status = ref(props.prop.Status);
const ErrorMessage = ref(props.prop.ErrorMessage)
const Key = ref(props.prop.Key)
defineExpose({ Value, Status, ErrorMessage });  // para que el padre las vea
const Error = ref(false)
const Focus = ref(false)

/*  position
static	Elements renders in order, as they appear in the document flow. This is default.
absolute	The element is positioned relative to its first positioned (not static) ancestor element
fixed	The element is positioned relative to the browser window
relative	The element is positioned relative to its normal position, so "left:20" adds 20 pixels to the element's LEFT position
sticky	The element is positioned based on the user's scroll position
A sticky element toggles between relative and fixed, depending on the scroll position. It is positioned relative until a given offset position is met in the viewport - then it "sticks" in place (like position:fixed).

Note: Not supported in IE/Edge 15 or earlier. Supported in Safari from version 6.1 with a Webkit prefix.
initial	Sets this property to its default value. Read about initial
inherit	Inherits this property from its parent element. Read about inherit
*/

// funciona para cualquier comoponente de este componente

/////////////////////////////////////////
// Metodo KeyPres Vfp
// Este metodo se corre cada ves que se teclea cualquier cosa en el componente
// Similar al keypress si  no esta el lasy
/////////////////////////////////////////

// string : String,
//texto: Number,
//boleano: Boolean,
// arreglo: Array,
// objeto: Object,
//fecha: Date,
//simbolo: Symbol,
// valida: Function,

// arreglo1: Object,
// default: () => {},
//    arreglo2: Array,
//    default: () => [],

// Vue dice no utilizar "this" dentro del setup segun Vue
// al pasarle props se podra tomar todos los Valuees de props anteriormente definidos
// como props.Value
//The second argument passed to the setup function is the context. The context is a normal JavaScript object that exposes
// three component properties:
// Attributes (Non-reactive object)
//    console.log(context.attrs)
// Slots (Non-reactive object)
//    console.log(context.slots)
// Emit Events (Method)
//    console.log(context.emit)
//setup(props,context)
//setup(props, { attrs, slots, emit })
// Setup funciona de la misma forma que el actual data(), devolviendo un objeto con las propiedades
// que serán usadas en el template:
// Inicio Setup


/////////////////////////////////////////
// Metodo Release Vfp
/////////////////////////////////////////
/*
const onUnmounted = () => {
  //  console.log("Component unmounted!");
};
*/

//const LocalDb = new localDb();
/////////////////////////////////////////////////////////////////////
// emitValue
// Descripcion: emite hacia el componente padre el nuavo valor asignado
/////////////////////////////////////////////////////////////////
const emitValue = async () => {
  Status.value = 'A'
  //console.log('EditBox antes emit Value ====>', props.prop.Value, Value.value)
  emit("update:Value", Value.value); // actualiza el valor Value en el componente padre
  emit("update:Status", 'A'); // actualiza el valor Status en el componente padre
  emit("update") // emite un update en el componente padre
  //console.log('EditBox despues emit Value ====>', props.prop.Value, props.prop.Status)
  return true;
};



/*
/////////////////////////////////////////////////////////////////////
// focusOut
// Descripcion: Cuando pierda el foco el componente , actualizamo el valor en cursor local
/////////////////////////////////////////////////////////////////
const focusOut = async () => {
  const valor = Value.value;
  if (props.prop.ControlSource && props.prop.ControlSource.length > 0) {
    // actualiza valor en localDb
    await props.db.value.updateCampo(valor, props.prop.ControlSource, props.Recno)
    //await LocalDb.update(valor).then(() => { 
    // })
  }
  console.log('editBox focusout ', props.prop.Name)
  return await emitValue()
}
*/
//console.log('EditBox despuest emit Value ====>', props.prop.Value, props.prop.Status)
//return true;


/////////////////////////////////////////////////////////////////////
// KeyPress
// Descripcion: Cada tecla que se presiona en el input
/////////////////////////////////////////////////////////////////

const keyPress = ($event) => {
  // <input       @keypress="keyPress($event)"
  const key = $event.charCode
  emit("update:Key", Key)
  Key.value = key
}

/*
/////////////////////////////////////////////////////////////////////
// onFocus
// Descripcion: Cuando se cambie el valor del componente template (Value.value con el teclado),
//              tenemos que emitir hacia el padre el valor capturado (Value.value) y ejecutar el update
/////////////////////////////////////////////////////////////////
const onFocus = async () => {
  Error.value = false; // old revisar si se necesita
  ErrorMessage.value = ''; // borramos el mensaje de error

  if (Status.value == 'P') return // ya se habia hecho el foco
  Status.value = 'P';  // en foco
  //console.log('onFocus elemento ===>', props.prop.Name, 'P')
  emit("update:Status", 'P'); // actualiza el valor Status en el componente padre. No se debe utilizar Status.Value
  emit("update:ErrorMessage", '')
  emit("update")

}

*/
////////////////////////////////////////
// Watchers : Triggers de templates
// Descripcion : Cuando cambia el Value de la propiedad del ControlSource, asigna el Value de
//                la vista a la propiedad de Value de la propiedad
// Notas : Si se tiene en props, se tiene que vigilar el cambio de props.prop.Value
/*
////////////////////////////////////////
// ControlSource
///////////////////////////////////////
watch(
  () => props.prop.ControlSource,
  (new_val, old_val) => {
    if (new_val != old_val) {
      if (props.Recno > 0 && new_val.trim().length) {

        Value.value = props.db.value.readRenglon(new_val, props.Recno)
        emitValue()
      }
    }
    //    LocalDb.ControlSource = new_val;


  },
  { deep: false }
);

*/
/*
////////////////////////////////////////
// Recno
// Nota: Lee de la base de datos local segun el valor de recno
///////////////////////////////////////
watch(
  () => props.Recno,
  (new_val, old_val) => {
    if (new_val != old_val && new_val > 0 && props.prop.ControlSource > ' ') {
      console.log('Watch Grid Recno', new_val)
      Value.value = props.db.value.readCampo(props.prop.ControlSource, new_val)
    }
    emitValue()
    //    LocalDb.ControlSource = new_val;


  },
  { deep: false }
);
*/


/*
/////////////////////////////////////////
// ErrorMesagge
watch(
  () => props.prop.ErrorMessage,
  (new_val, old_val) => {
    if (new_val.length == 0)
      Error.value = false
    else
      Error.value = true;

    //console.log('Watch Mensage de error==>', new_val, Error.value)

  },
  { deep: false }
);
*/
/*
/////////////////////////////////////////////////////////
// watch Value
//  Nota : Si se cambia el valor desde la forma principal, se debe de actualizar en el
//          Componente
//////////////////////////////////////////
watch(
  () => props.prop.Value,
  (new_val, old_val) => {
    Value.value = new_val
    //   console.log('watch value',new_val)
  },
  { deep: false }
);
*/
/*
////////////////////////////////////////
// Hacer el set focus 
///////////////////////////////////////
watch(
  () => Focus.value,
  (new_val, old_val) => {
    console.log('EditText Set Focus', props.prop.Name)
    if (Focus.value) {
      Ref.value.focus()
      Ref.value.select()
      Focus.value = false
      emit("update:Focus", false)
    }
  },
  { deep: false }
);

*/

///////////////////////////////////////////////
// Cuando cambia el estatus de Inicial a Activo, emite valores  
///////////////////////////////////////////////

watch(
  () => props.prop.Status,
  (new_val, old_val) => {

    if (new_val == 'A' && old_val == 'I') {
      emitValue()
    }
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



  for (const componente in This) {
    if (
      This[componente].prop &&       // Si tiene propiedades
      This[componente].prop.Capture &&  // Si es componete de captura
      This[componente].prop.Capture == true
    ) {
      This.estatus[componente] = toRef(This[componente].prop, "Status"); // stack de estatus de componentes
    }
  }
  console.log('Init Grid==>', props.prop.Name)


  // if (props.prop.Name=='des_dat')  Ref.value.autofocus=true
  //Status.value = 'I';
  //Value.value = 0; // asignamos Valor inicial
};

/************************************************************************************ */
////////////////////////////////
// revisa los eventos que hay a ejecutar, en caso que hay una estatus de un componente
// no ejecuta el evento
/////////////////////////////////


watch(
  () => eventos,
  (new_val, old_val) => {

    if (eventos.length == 0) return
    //console.log('Watch eventos===>',This.eventos)
    for (const comp in This.estatus) {
      //console.log('Watch estatus ===>', comp, This.estatus[comp])

      if (This.estatus[comp] != 'A' && Status.value == 'A') {
        Status.value = 'P';  // Cambia el estatus del gri a Proceso
        emit("update:Status", 'P'); // actualiza el valor Status en el componente padre. No se debe utilizar Status.Value

        return
      }
      if (eventos.length == 0) return

      for (let i = 0; i < eventos.length; i++) {
        console.log('Grid watch eventos', eventos[i])
        //This.Form.eventos.push(eventos[i])
      }
      eventos.length = 0 // borramos los eventos
      console.log('Grid watch eventos limpia eventos', eventos)


    }
  }, { deep: true }
);


//////////////////////////////////////////////
// revisa los estatus de todos los componentes
watch(
  () => This.estatus,
  (new_val, old_val) => {
    console.log('<=======Watch estatus =======>')

    for (const comp in This.estatus) { // Recorre todos los estatus del grid

      if (This.estatus[comp] != 'A' && Status.value == 'A') { // Si alguno no esta activo
        Status.value = 'P';  // Cambia el estatus del gri a Proceso
        emit("update:Status", 'P'); // actualiza el valor Status en el componente padre. No se debe utilizar Status.Value

        return
      }
    }
    Status.value = 'A';  // Todos los componentes del grid esta Activo
    emit("update:Status", 'A'); // actualiza el valor Status en el componente padre. No se debe utilizar Status.Value
    if (eventos.length == 0) return
    for (let i = 0; i < eventos.length; i++)
      console.log('Grid watch eventos', eventos[i])

    //      This.Form.eventos.push(eventos[i])
    eventos.length = 0 // borramos los eventos
    console.log('Grid watch estatus limpia eventos', eventos)


  },
  { deep: true }
);


//////////////////////////////////////////////
// revisa los estatus de todos los componentes
/*
watch(
  () => View,
  (new_val, old_val) => {
    console.log('<=======Watch grid View =======>',new_val)

     },
  { deep: false }
);

*/


//************************************************** */
init(); // Ejecuta el init

//////////////////////////////////////
//  Importa componentes dinamicos
////////////////////////////////////// 
const impComp = ((name: string) => {
  switch (name) {
    case 'editText': {
      //      return defineAsyncComponent(() => import('@/components/editText.vue'))  //import('@/components/${name}.vue'))
      return editText
      break;
    }
    case 'comboBox': {
      return comboBox
      //return defineAsyncComponent(() => import('@/components/comboBox.vue'))  //import('@/components/${name}.vue'))
      break;
    }
    case 'grid': {
      return grid
      //return defineAsyncComponent(() => import('@/components/comboBox.vue'))  //import('@/components/${name}.vue'))
      break;
    }

    case 'imgButton': {
      return imgButton
      //return defineAsyncComponent(() => import('@/components/comboBox.vue'))  //import('@/components/${name}.vue'))
      break;
    }



    default: {
      return editText
      //return defineAsyncComponent(() => import('@/components/editText.vue'))  //import('@/components/${name}.vue'))
      break;
    }
  }

  //    return defineAsyncComponent(() => import('@/components/editText.vue'))  //import('@/components/${name}.vue'))
})




</script>

<style scoped>
h1 {
  margin: 40px 0 0;
}

div.tabla {
  /*position: absolute; */
  /* no borrar se utiliza junto con div.option position:relative*/
  border: 1px solid rgb(0, 5, 2);
  border-radius: 1%;
  max-height: 300px;
  max-width: 900px;
  overflow-y: auto;
  overflow-x: auto;
  width: 100%;
}

input {
  border: 2px solid rgb(0, 5, 2);
  color: #18e94c;
  width: "100px";
  height: "30px";
  background: #f7f8f7;
  padding: "5px";
  border-radius: 5%;
}

/* Tooltip container */
.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
  /* If you want dots under the hoverable text */
}

/* Tooltip text */
.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: #555;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;

  /* Position the tooltip text */
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -60px;

  /* Fade in tooltip */
  opacity: 0;
  transition: opacity 0.3s;
}

/* Tooltip arrow */
.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--style scoped src="/components/styles.css" /-->




<!--
<template>
  <div>
    <RecycleScroller :items="rows" :item-size="32" class="scroller" key-field="id">
      <template slot-scope="{ item }">
        <div class="flex">
          <div class="cell" v-for="cell in item.fields" :key="cell.id">{{ cell }}</div>
        </div>
      </template>
    </RecycleScroller>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {
      rows: []
    };
  },
  mounted() {
    setTimeout(() => {
      this.rows = new Array(10000).fill().map(createRow.bind(this));
    }, 1000);
  }
};

function createRow(val, idx) {
  return {
    id: idx,
    fields: new Array(15).fill("Lorem")
  };
}
</script>

<style>
.scroller {
  height: 80vh;
  overflow-y: auto;
}

.flex {
  display: flex;
}

.cell {
  flex: 1;
}
</style>
-->