<template>
  <div
    v-if="props.prop.Visible && props.prop.RecordSource.length > 0 && props.db.value && props.db.value.View[prop.RecordSource]"
    class="divi" :style="style" ref="Ref">
    <label class="error" v-show="Error">{{ prop.ErrorMessage }}</label>
    <!--div class="tooltip"-->
    <!-- Grid  -->
    <form class="gridDatos">
      <!--label text-align="center">{{ prop.textLabel }}</label>  -->
      <h2>{{ prop.textLabel }}</h2>
      <div class="tabla">
        <table>
          <thead>
            <tr style="font-size: 13px">
              <th> </th>
              <th v-for="column in ThisGrid.elements" :key="column.Id">
                <!--Header:
                  -->
                <div v-show="ThisGrid[column.Name].prop.Visible">
                  <!--Imprime como etiqueta el header de cada columna-->
                  {{ ThisGrid[column.Name].textLabel }}
                </div>
              </th>
            </tr>
          </thead>
          <!-------------  Detalle   -----------------------
          
           && prop.Status == 'A' 
          -->

          <tbody v-show="ThisGrid.Form.prop.Status == 'A' && scroll.dataPage.length > 0">

            <!-------------  Renglones  -----------------------
              item.id + 1-->
            <!--   tr v-for="(recno, i) in props.db.value.View[prop.RecordSource]['recnoVal']" :key="i"-->
              <tr v-for="item in scroll.dataPage" :key="item.id">

                <td class='renNumber' style="min-width:20;max-width:20px; ">{{ item.recno }}</td>
                <!-------------  Columnas  ------------------------->
                <!--
                v-if="props.db.value.View[prop.RecordSource].recnoVal" 
                v-show="i != ThisGrid.Row"
                    -->

                <td v-for="col in ThisGrid.elements" :key="col.Id" style="padding:0">

                  <div v-show="ThisGrid[col.Name].prop.Status != 'I' && ThisGrid[col.Name].prop.Visible">
                    <!--template style="ThisGrid[col.Name].style" -->
                    <!--focus.capture.stop para que solo ejecute el evento en el componente actual
                      al obtener el foco asigna el renglon de captura-->
                    <div v-show="item.id != ThisGrid.Row" :style='{ "width": ThisGrid[col.Name].style.width }'>
                      <Transition name="columntext">
                      <textLabel v-bind:Show="item.id != ThisGrid.Row" v-bind:Recno="item.recno" v-bind:Id="item.id"
                        v-bind:prop="ThisGrid[col.Name].prop" v-bind:position="ThisGrid[col.Name].position"
                        v-bind:style="ThisGrid[col.Name].style" v-bind:db="db"
                        @focus.capture.stop="eventos.push(ThisGrid.prop.Map + '.asignaRenglon(' + item.id + ')')"
                        @click.stop @focusout.stop>
                      </textLabel>
                     </Transition>
                    </div>
                    <!--Componentes de captura
                      @focus se debe de poner capture para que funcione el focus en el componente Vue
                              y el when del componente typescript-->
                      <Transition name="columninput">
                      <div v-if="item.id == ThisGrid.Row" :style='{ "width": ThisGrid[col.Name].style.width }'>
                      <component :is="impComp(ThisGrid[col.Name].prop.BaseClass)"
                        v-model:Value="ThisGrid[col.Name].prop.Value" v-model:Status="ThisGrid[col.Name].prop.Status"
                        v-model:Key="ThisGrid[col.Name].prop.Key" v-model:Focus="ThisGrid[col.Name].Focus"
                        v-model:Recno="ThisGrid[col.Name].Recno" v-model:Valid="ThisGrid[col.Name].prop.Valid"
                        v-model:ShowError="ThisGrid[col.Name].prop.ShowError"
                        v-bind:Component="ref(ThisGrid.Form[col.Name])" v-bind:Registro="item.recno"
                        v-bind:prop="ThisGrid[col.Name].prop" v-bind:style="ThisGrid[col.Name].style"
                        v-bind:position="ThisGrid[col.Name].position" v-bind:db="db"
                        @focusout="eventos.push(ThisGrid.prop.Map + '.' + ThisGrid[col.Name].Name + '.valid()')"
                        @focus.capture="eventos.push(ThisGrid.prop.Map + '.' + ThisGrid[col.Name].Name + '.when()')"
                        :style="{ 'width': ThisGrid[col.Name].style.width }">

                      </component>
                    </div>
                  </Transition>
                  </div>
                </td>

                <!--td>
                <div class="left-btn hide-in-print" @click="borraRenglon(item.recno)">
                  <img src="/Iconos/delete.jpeg" width="23">

                </div>
              </td-->
              </tr>
            
            <tr>
              <td>
                <!-------------  Si el numero de Columnas es menor que 2 y da un click genera nuevo registro
                    @click="() => items.push({ key: Math.random(), ref: 'MyRef', desc: 'My description', qty: 1, price: 0 })"
                    v-if="ThisGrid.renglon<2 "


                 <div  v-if="i==ThisGrid.db.View.[prop.RecordSource].recno-1"
                    :ref="Status => { ThisGrid.prop.Status='A'}" >
                     Status={{i}} {{ThisGrid.db.View.[prop.RecordSource].recno}} {{ThisGrid.prop.Status}}
                 </div>

                   :ref="Status => { ThisGrid.prop.Status='A'}"

                  -->
              </td>
            </tr>

          </tbody>

        </table>
      </div>

      <!--span v-if="prop.ToolTipText" class="tooltiptext">
        {{
            prop.ToolTipText
        }}
      </span-->
      <!--/div tolltiptext-->
      <div class="break">
        <div class="controles" :disabled="!scroll.controls">

          <span v-if="scroll.bottom" width="40" @click="appendRow()">
            <img src="/Iconos/plus.jpeg" width="35">
          </span>

          <span v-show="ThisGrid.Row >= 0" width="40" class="left-btn hide-in-print"
            @click.capture.stop="borraRenglon()">
            <img src="/Iconos/delete.jpeg" width="35">
          </span>

          <span v-show="scroll.page > 0">
            <span @click.capture.stop="first()">
              <img src="/Iconos/first.png" width="30">
            </span>

            <span @click.capture.stop="previous()">
              <img src="/Iconos/previous.png" width="30">
            </span>

          </span>
          <span v-show="!scroll.bottom">
            <span @click.capture.stop="next()">
              <img src="/Iconos/next.png" width="30">
            </span>
            <span @click.capture.stop="last()">
              <img src="/Iconos/last.png" width="30">
            </span>
          </span>
        </div>
      </div> <!-- break to a new row -->
    </form>

  </div>
</template>


<script setup lang="ts">
/*
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
*/
////import { MessageBox } from '@/classes/Functions'

import imgButton from "@/components/imgButton.vue"
import comboBox from "@/components/comboBox.vue"
import editText from "@/components/editText.vue"
import textLabel from "@/components/textLabel.vue"
//import Grid from "vue-virtual-scroll-grid";
//const { $MessageBox } = useNuxtApp()
const emit = defineEmits(["update", "update:Value", "update:Status", "update:ErrorMessage", "update:Key", "update:Focus"]);
//import { localDb } from "@/classes/LocalDb";  // manejo del indexedDb

///////////////////////////////////////
// Propiedades del componente reactivas
////////////////////////////////////
const props = defineProps<{
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
    Rows: number;
    //    SetFocus:false;
    //compAddress: any;
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
  };
  position: {
    position: "left"; //left,right,center,absolute. Si es absulute poner Value left y top
    left: number;
    Top: number;
  };
  Recno: 0;
  Component: null;
  db: any

}>();
// Valores componente padre
const Component = ref(props.Component)
const ThisGrid = Component.value
console.log('Gridd ThisGrid=====>', ThisGrid)
ThisGrid['estatus'] = []
var load_data = false //Verdadero cuando se debe cargar datos a la pagina
var RowInsert = false // Verdadero cuando ocurrio una insercion de renglon
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


const scroll = reactive({
  controls: false,
  dataPage: [],  // Elementos que compone la pagina Db.View[props.prop.RecordSource].recnoVal[elementNo]
  top: true,     //Pprincipio de la pagina
  bottom: false,  // Final de pagina
  page: 0,        // Numero de pagina desplegada
  rows: props.prop.Rows // Renglones que puede tener la pagina
})




/*  position
static	Elements renders in order, as they appear in the document flow. ThisGrid is default.
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

    if (new_val == 'A') {
      if (old_val == 'I') {
        emitValue()
      }
      console.log('Grid.vue watch Status load_data', load_data)
      // si hay carga de datos
      if (load_data) {
        loadData()
      }

    }


  },
  { deep: false }
);

///////////////////////////////////////////////
// Cuando se cambia el RecordSource  
///////////////////////////////////////////////
watch(
  () => props.prop.RecordSource,
  (new_val, old_val) => {
    console.log('RecordSource scroll===>', scroll)
  }
  ,
  { deep: false }
);

watch(
  () => props.prop.Visible,
  async (new_val, old_val) => {
    /*   
      // Si no hay renglones , aumenta un renglon
      if (props.prop.Visible && Db.View[props.prop.RecordSource].recnoVal.length == 0){
         await appendRow()
         console.log('<=======Watch grid append Row Visible =======>', new_val,props.prop.Visible && Db.View[props.prop.RecordSource].recnoVal)
      }
   */

    if (props.prop.Visible && !old_val &&
      props.prop.RecordSource.length > 3) {
      //console.log('watch Visible ===>', scroll)

      loadData()

    }
  },
  { deep: false }
);



/************************************************************************************ */
////////////////////////////////
// revisa los eventos que hay a ejecutar, en caso que hay una estatus de un componente
// no ejecuta el evento
/////////////////////////////////


watch(
  () => eventos,
  (new_val, old_val) => {

    for (const comp in ThisGrid.estatus) {
      //console.log('Watch estatus ===>', comp, ThisGrid.estatus[comp])

      if (ThisGrid.estatus[comp] != 'A' && Status.value == 'A') {
        Status.value = 'P';  // Cambia el estatus del grid a Proceso
        emit("update:Status", 'P'); // actualiza el valor Status en el componente padre. No se debe utilizar Status.Value

        return
      }
      if (eventos.length == 0) {
        // Status.value = 'A';  // Cambia el estatus del grid a Proceso
        // emit("update:Status", 'A'); // actualiza el valor Status en el componente padre. No se debe utilizar Status.Value
        //aqui voy
        //  console.log('Grid Watch eventos ===>', load_data, ThisGrid.Form.eventos.length)
        return
      }
      const evenEjecutar = eventos[0]
      eventos.length = 0 // borramos los eventos
      ThisGrid.Form.eventos.push(evenEjecutar) // emitimos los eventos a la forma padre

    }
  }, { deep: true }
);

//////////////////////////////////////////////
// Revisa la pila de eventos de procesos a ejecutar.
//  Cuando ya no hay procesos a ejecutar y hay carga de datos, 
// carga los datos de la pagina
/////////////////////////////////////////////////
watch(
  () => ThisGrid.Form.eventos,
  () => {
    if (!load_data) return
    if (ThisGrid.Form.eventos.length == 0) {
      if (ThisGrid.Form.prop.Status != 'A')
        return
      console.log('=====watch thisform.eventos loadData()=======')
      loadData()

    }
  },
  { deep: false }
);



//////////////////////////////////////////////
// revisa los estatus de todos los componentes
watch(
  () => ThisGrid.estatus,
  (new_val, old_val) => {
    console.log('<=======Watch estatus componentes =======>', ThisGrid.estatus)

    for (const comp in ThisGrid.estatus) { // Recorre todos los estatus del grid

      if (ThisGrid.estatus[comp] != 'A' && Status.value == 'A') { // Si alguno no esta activo
        Status.value = 'P';  // Cambia el estatus del gri a Proceso
        emit("update:Status", 'P'); // actualiza el valor Status en el componente padre. No se debe utilizar Status.Value

        return
      }
    }
    Status.value = 'A';  // Todos los componentes del grid esta Activo
    emit("update:Status", 'A'); // actualiza el valor Status en el componente padre. No se debe utilizar Status.Value

    if (eventos.length == 0) return
    for (let i = 0; i < eventos.length; i++)
      ThisGrid.Form.eventos.push(eventos[i])

    eventos.length = 0 // borramos los eventos

  },
  { deep: true }
);

/////////////////////////////////////////
// Metodo loadDataFromServer
// Descripcion : se trae datos desde el servidor
/////////////////////////////////////////


const loadData = async () => {
  ThisGrid.Row = -1
  load_data = false

  ThisGrid.Form.prop.Status = 'P'
  while (scroll.dataPage.length > 0)
    scroll.dataPage.pop() // borramos arreglon


  try {

    if (!Db || props.prop.RecordSource.length < 3
      || Db.View[props.prop.RecordSource].recnoVal.length == 0
    ) {
      scroll.controls = false
      scroll.page = 0
      scroll.top = false
      scroll.bottom = false
      if (props.prop.RecordSource.length > 2) {
        scroll.controls = true
      }

      return false

    }
    const result = []
    if (!scroll.rows || scroll.rows == 0) scroll.rows = 10

    const Rows = scroll.rows
    if (scroll.page == 0) scroll.top = true
    else scroll.top = false

    scroll.bottom = false

    for (let i = 0; i < Rows; i++) {
      const elementNo = ((scroll.page) * Rows) + i
      if (Db.View[props.prop.RecordSource].recnoVal[elementNo]) {
        scroll.dataPage[i] = Db.View[props.prop.RecordSource].recnoVal[elementNo]
      }

      else {  // borra los elementos que ya no existen
        //    scroll.dataPage.slice(i, Rows - 1 - i)
        if (i == 0) { // No hay datos, le asigna el ultimo elemento
          scroll.dataPage[i] = Db.View[props.prop.RecordSource].recnoVal[elementNo - 1]
          scroll.dataPage.length = 1 // Solo dejamos  el ultimo elemento

        } else {

          scroll.dataPage.length = i // Borramos todos los elementos restantes
        }
        scroll.bottom = true


        break
      }


    }

    console.log('loadData scroll', scroll)

    if (RowInsert) { // Se inserto un renglon, calcula la posicion donde quedo
      const ult_ele = scroll.dataPage.length - 1
      //ThisGrid.Row = scroll.dataPage[ult_ele].id
      RowInsert = false
    }
    console.log('loadData Sin error')
  } catch (err) {
    console.warn('Error loadData ', err)
    //    scroll.noResult = true;
    //    scroll.message = "Error loading data";
  }

  ThisGrid.Form.prop.Status = 'A'
  scroll.controls = true

}

const first = async () => {
  scroll.controls = false
  if (scroll.top) return
  scroll.page = 0
  loadData()
}


const previous = async () => {
  scroll.controls = false
  if (scroll.top) return
  scroll.page--
  loadData()

}

const next = async () => {
  scroll.controls = false
  if (scroll.bottom) return
  scroll.page++
  loadData()

}

const last = async () => {
  scroll.controls = false
  if (scroll.bottom) return
  scroll.page = Db.View[props.prop.RecordSource].recnoVal.length / scroll.rows

  scroll.page = Math.trunc(scroll.page)
  //if (scroll.page > 0) scroll.page--

  loadData()
  scroll.bottom = true

}

const appendRow = async (recno?: number) => {
  scroll.controls = false
  //await ThisGrid.appendRow()
  eventos.push(ThisGrid.prop.Map + '.appendRow()')
  load_data = true
  RowInsert = true  // indicamos que hubo insercion de renglon

  /*
    // Si era el ultimo elemento de la pagina
    if (scroll.bottom) {
      scroll.bottom = false
      last()
    }
    else
      load_data = true
  
  
    const ult_ele = scroll.dataPage.length - 1
    ThisGrid.Row = scroll.dataPage[ult_ele].id
  */
}


const borraRenglon = async (recno?: number) => {
  scroll.controls = false
  if (!recno) {
    //console.log('borraRenglon data Page====>',ThisGrid.Row,scroll.dataPage)

    if (ThisGrid.Row < 0) return
    // busca a cual recno pertenece el ThisGrid.Row
    for (let i = 0; scroll.dataPage.length - 1; i++) {

      if (scroll.dataPage[i].id == ThisGrid.Row) {
        recno = scroll.dataPage[i].recno
        break
      }
    }
    if (!recno) return

  }
  //const { $MessageBox } = useNuxtApp()
  if (await MessageBox(`Borramos renglon ${recno}`, 4, '') == 6) {
    eventos.push(ThisGrid.prop.Map + '.deleteRow(' + recno + ')')

    ThisGrid.Row = -1 // Quitamos la posicion del renglon
    console.log('delete borramos load_data', load_data)
    load_data = true

  }
}

/////////////////////////////////////////
// Metodo init Vfp
// Aqui debemos de asignar todos los Valores inciales del componente
// A pesar que nom_nom se pasa por referencia, se tuvo que definir en props para qu fuera reactivo
// Se tiene que emitir para que cambie el Valor en el template
/////////////////////////////////////////

const init = async () => {

  for (const componente in ThisGrid) {
    if (ThisGrid[componente] !== undefined) {
      if (
        ThisGrid[componente].prop &&       // Si tiene propiedades
        ThisGrid[componente].prop.Capture &&  // Si es componete de captura
        ThisGrid[componente].prop.Capture == true
      ) {
        ThisGrid.estatus[componente] = toRef(ThisGrid[componente].prop, "Status"); // stack de estatus de componentes
      }
    }
  }
  console.log('Init Grid==>', props.prop.Name)

  // if (props.prop.Name=='des_dat')  Ref.value.autofocus=true
  //Status.value = 'I';
  //Value.value = 0; // asignamos Valor inicial
};

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

.columntext-enter-active,
.columntext-leave-active {
  transition: all .5s ease;
}

.columntext-enter-from,
.columntext-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.columninput-enter-active,
.columninput-leave-active {
  transition: all .5s ease;
}

.columninput-enter-from,
.columninput-leave-to {
  opacity: 0;
  transform: translateX(30px);
}




table {
  display: block;
  margin-top: 5px;
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

div.controles {
  /*position: absolute; */
  /* no borrar se utiliza junto con div.option position:relative*/
  border: 1px solid rgb(0, 5, 2);
  background-color: rgb(229, 247, 244);
  border-radius: 1%;
  overflow-y: auto;
  overflow-x: auto;
  width: auto;
}

/*
input {
  border: 2px solid rgb(0, 5, 2);
  color: #18e94c;
  width: "100px";
  height: "30px";
  background: #f7f8f7;
  padding: "5px";
  border-radius: 5%;
}
*/
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--style scoped src="/components/styles.css" /-->
