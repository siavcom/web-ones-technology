<template>
  <div class="divi" v-if="props.prop.Visible && props.prop.RecordSource.length > 1 && Db.View[prop.RecordSource]"
    :style="style" ref="Ref">
    <label class="error" v-show="Error">{{ prop.ErrorMessage }}</label>
    <!--div class="tooltip"-->
    <!-- Grid  -->
    <!--form class="gridDatos" -->
    <div class="gridDatos" :style="{ height: 'auto' }">

      <!--label text-align="center">{{ prop.textLabel }}</label>  -->
      <h2 v-if="prop.textLabel.length > 0">{{ prop.textLabel }}</h2>
      <div class="tabla">
        <table :style="{ lineHeight: '11px' }">
          <thead>
            <tr style="font-size: 13px">
              <th> </th>
              <th v-for="column in This.elements" :key="column.Id">
                <!--Header:
                  -->
                <div v-show="This[column.Name].prop.Visible">
                  <!--Imprime como etiqueta el header de cada columna-->
                  {{ This[column.Name].textLabel }}
                </div>
              </th>
            </tr>
          </thead>
          <!-------------  Detalle   -----------------------
          
           && prop.Status == 'A' 
          -->

          <tbody class='dataGrid' v-show="This.Form.prop.Status == 'A' && scroll.dataPage.length > 0">

            <!-------------  Renglones  -----------------------
              item.id + 1-->
            <!-- :style="{ lineHeight: '100%' }"   tr v-for="(recno, i) in props.db.value.View[prop.RecordSource]['recnoVal']" :key="i"-->
            <tr class='Rows' v-for="item in scroll.dataPage" :key="item.recno">

              <td class='renNumber' :style="{ height: '11px' }" :key="'Row_' + item.recno.toString()">{{ item.recno }}
              </td>
              <!-------------  Columnas  ------------------------->
              <!--
                v-if="props.db.value.View[prop.RecordSource].recnoVal" 
                v-show="i != This.Row"
                    -->

              <td v-for="col in This.elements" :key="item.recno.toString() + col.Name"
                :style='{ "height": This[col.Name].style.height, padding: 0 }'>

                <!--div v-show="true || (This[col.Name].prop.Status != 'I' && This[col.Name].prop.Visible)"-->
                <!--template style="This[col.Name].style" -->
                <!--focus.capture.stop para que solo ejecute el evento en el componente actual
                      al obtener el foco asigna el renglon de captura
                        @focus.capture.stop="eventos.push(`${This.prop.Map}.asignaRenglon(${item.id},'${col.Name}')`)"

                    
                    -->
                <!--Imprime renglones de solo los textos cuando no es captura 
                  
                  v-bind:Show="item.id != This.Row"
                                    -->
                <div v-show="item.id != This.Row" :key="'divText_' + item.recno.toString() + col.Name">
                  <!--Transition name="columntext"-->
                  <textLabel v-show="item.id != This.Row" :key="'TextValue_' + item.recno.toString() + col.Name"
                    v-bind:Registro="item.id != This.Row ? item.recno > 0 ? item.recno : 0 : 0" v-bind:Id="item.id"
                    v-bind:prop="This[col.Name].prop" v-bind:position="This[col.Name].position"
                    v-bind:style="This[col.Name].style"
                    @focus.capture.stop="ejeEvento(`${This.prop.Map}.asignaRenglon(${item.id},'${col.Name}')`)"
                    @click.stop @focusout.stop>
                  </textLabel>
                  <!--/Transition-->
                </div>
                <!--Componentes de captura
                      @focus se debe de poner capture para que funcione el focus en el componente Vue
                              y el when del componente typescript
                      Se quita el @focusout porque se hace el valid desde el componente
                      @focusout.capture="ejeEvento(This.prop.Map + '.' + This[col.Name].Name + '.valid()')"
                        v-bind:Component="ref(This.Form[col.Name])" 
                      v-bind:Show="true"
                    -->
                <!--Transition name="columninput"-->
                <!--div v-if="item.id == This.Row" :style='{ "width": This[col.Name].style.width }'-->
                <component v-if="item.id == This.Row" :is="impComp(This[col.Name].prop.BaseClass)"
                  :key="'Component_' + item.recno.toString() + col.Name" v-model:Value="This[col.Name].prop.Value"
                  v-model:Status="This[col.Name].prop.Status" v-model:Key="This[col.Name].prop.Key"
                  v-model:Focus="This[col.Name].Focus" v-model:Valid="This[col.Name].prop.Valid"
                  v-model:ShowError="This[col.Name].prop.ShowError" v-bind:Component="ref(This[col.Name])"
                  v-bind:Registro="item.recno > 0 || item.recno != null ? item.recno : 0"
                  v-bind:prop="This[col.Name].prop" v-bind:style="This[col.Name].style"
                  v-bind:position="This[col.Name].position"
                  @focus.capture="ejeEvento(This.prop.Map + '.' + This[col.Name].Name + '.when()')"
                  :style="{ 'width': This[col.Name].style.width }">

                </component>
                <!--/div-->
                <!--/Transition-->
                <!--/div-->
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
                    v-if="This.renglon<2 "


                 <div  v-if="i==This.db.View.[prop.RecordSource].recno-1"
                    :ref="Status => { This.prop.Status='A'}" >
                     Status={{i}} {{This.db.View.[prop.RecordSource].recno}} {{This.prop.Status}}
                 </div>

                   :ref="Status => { This.prop.Status='A'}"

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

          <span v-show="prop.addButton" width="40" @click="appendRow()">
            <img src="/Iconos/add-color.svg" width="35">
          </span>

          <span v-show="scroll.page > 0">

            <span @click.capture.stop="first()">
              <img src="/Iconos/first.svg" width="30">
            </span>

            <span @click.capture.stop="previous()">
              <img src="/Iconos/previous.svg" width="30">
            </span>

          </span>
          <span v-show="!scroll.bottom">
            <span @click="next()">
              <img src="/Iconos/next.svg" width="30">
            </span>
            <span @click="last()">
              <img src="/Iconos/last.svg" width="30">
            </span>
          </span>

          <span v-show="prop.deleteButton && This.Row >= 0" width="40" class="left-btn hide-in-print"
            @click="borraRenglon()">
            <img src="/Iconos/delete-row.svg" width="45">
          </span>

          <!-- click.capture.stop -->
          <span v-show="prop.saveData" @click="saveTable()">
            <img src="/Iconos/save-color1.svg" width="45">
          </span>

          <div v-for="(compFooter) in This.footer" style="zIndex:0">
            <!--div v-for="(obj, compFooter,key) in This" :key="obj.Index"
          
                      @focusout="This.eventos.push('This.' + compFooter + '.valid()')"
          v-bind:Show="true"
          -->
            <component :is="impComp(This[compFooter].prop.BaseClass)" v-bind:Component="ref(This[compFooter])"
              v-model:Value="This[compFooter].prop.Value" v-model:Status="This[compFooter].prop.Status"
              v-model:ShowError="This[compFooter].prop.ShowError" v-model:Key="This[compFooter].prop.Key"
              v-model:Focus="This[compFooter].Focus"
              v-bind:Registro="This[compFooter].Recno == null ? 0 : This[compFooter].Recno"
              v-bind:prop="This[compFooter].prop" v-bind:style="This[compFooter].style"
              v-bind:position="This[compFooter].position"
              @focus.capture="ejeEvento(This[compFooter].prop.Map + '.when()')"
              @click.stop.prevent="ejeEvento(This[compFooter].prop.Map + '.click()')"></component>
          </div>

        </div>
      </div> <!-- break to a new row -->
    </div> <!--/form-->

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
import container from "@/components/container.vue"
//import Grid from "vue-virtual-scroll-grid";

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
    deleteButton: true;
    addButton: true;
    saveData: true;
    updated: false;
    autoLoad: boolean;
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
  Registro: 0;
  Component: null;
  //db: any

}>();
// Valores componente padre
const Component = ref(props.Component)
//const ThisGrid = Component.value
const This: {} = Component.value
//This['estatus'] = []
const compStatus = reactive({})
var load_data = false //Verdadero cuando se debe cargar datos a la pagina
var RowInsert = false // Verdadero cuando ocurrio una insercion de renglon
const eventos = reactive([]);  // pila de eventos a ejecutar en forma sincrona

//const Db = props.db.value // Vista que utilizara el grid
const Db = This.Form.db // Vista que utilizara el grid

//console.log('grid  view.value Db ====>',Db)
//const View=Db.View[props.prop.RecordSource] // Vista de captura de db
//console.log('grid  View ====>',props.prop.RecordSource,View)

// Valores propios
const Value = ref(props.prop.Value);
const Ref = ref(null) // Se necesita para tener referencia del :ref del componente  ref(props.prop.Ref)
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
  console.log('editBox focusout ', props.Name)
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
      console.log('Grid.vue watch Status load_data', load_data, 'Status=', new_val)
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
  async (RecordSource, old_val) => {

    if (props.prop.Visible && RecordSource.length > 1) {
      console.log('grid watch RecordSource ', RecordSource, Db.View[RecordSource])
      if (Db.View[RecordSource]) {
        if (Db.View[RecordSource].recnoVal.length == 0)  // No hay renglones
          await appendRow()

        //    loadData()
      }
    }
  }
  ,
  { deep: false }
);

watch(
  () => props.prop.Visible,
  async (Visible, old_val) => {

    // Si no hay renglones , aumenta un renglon
    if (Visible && props.prop.RecordSource.length > 1 && Db.View[props.prop.RecordSource]) {

      console.log('grid watch Visible ', props.prop.RecordSource, Db.View[props.prop.RecordSource])

      // si no hay datos, inserta renglon 
      if (Db.View[props.prop.RecordSource].recnoVal.length == 0)
        await appendRow()

      loadData()

    }
  },
  { deep: false }
);

////////////////////////////////
// revisa los eventos que hay a ejecutar, en caso que hay una estatus de un componente
// no ejecuta el evento
/////////////////////////////////

watch(
  () => eventos,
  (new_val, old_val) => {

    for (const comp in compStatus) {
      //console.log('Watch estatus ===>', comp, compStatus[comp])

      if (compStatus[comp] != 'A' && Status.value == 'A') {
        console.log('Grid watch eventos comp=', comp, 'Estatus=', compStatus[comp])
        Status.value = 'P';  // Cambia el estatus del grid a Proceso
        emit("update:Status", 'P'); // actualiza el valor Status en el componente padre. No se debe utilizar Status.Value

        return
      }
      if (eventos.length == 0) {
        // Status.value = 'A';  // Cambia el estatus del grid a Proceso
        // emit("update:Status", 'A'); // actualiza el valor Status en el componente padre. No se debe utilizar Status.Value
        //aqui voy
        //  console.log('Grid Watch eventos ===>', load_data, This.Form.eventos.length)
        return
      }
      const evenEjecutar = eventos[0]
      eventos.length = 0 // borramos los eventos
      This.Form.eventos.push(evenEjecutar) // emitimos los eventos a la forma padre

    }
  }, { deep: true }
);

//////////////////////////////////////////////
// Revisa la pila de eventos de procesos a ejecutar.
//  Cuando ya no hay procesos a ejecutar y hay carga de datos, 
// carga los datos de la pagina
/////////////////////////////////////////////////
watch(
  () => This.Form.eventos,
  () => {
    // console.log('=====watch thisform.eventos =======', eventos, load_data)


    if (!load_data) return
    if (This.Form.eventos.length == 0) {
      if (This.Form.prop.Status != 'A')
        return
      //  console.log('=====watch thisform.eventos loadData()=======')
      loadData()

    }
  },
  { deep: false }
);



//////////////////////////////////////////////
// revisa los estatus de todos los componentes
watch(
  () => compStatus,
  (new_val, old_val) => {


    for (const comp in compStatus) { // Recorre todos los estatus del grid

      if (compStatus[comp] != 'A' && Status.value == 'A') { // Si alguno no esta activo
        console.log('Grid watch estatus comp=', comp, 'Estatus', compStatus[comp], 'This.Row=', This.Row)
        Status.value = 'P';  // Cambia el estatus del grid a Proceso
        emit("update:Status", 'P'); // actualiza el valor Status en el componente padre. No se debe utilizar Status.Value

        return
      }
    }
    Status.value = 'A';  // Todos los componentes del grid esta Activo
    emit("update:Status", 'A'); // actualiza el valor Status en el componente padre. No se debe utilizar Status.Value

    if (eventos.length == 0) return
    for (let i = 0; i < eventos.length; i++)
      This.Form.eventos.push(eventos[i])

    eventos.length = 0 // borramos los eventos

  },
  { deep: true }
);


//////////////////////////////////////////////
// This.Row
/////////////////////////////////////////////////
watch(
  () => This.Row,
  () => {

    if (This.Row <= -10) { // hubo insercion de renglon
      RowInsert = true
      last()
    }
    console.log('RowInsert Watch Grid This.Row =', This.Row)

  },
  { deep: false }
);

////////////////////////////////
// Aumenta la pila de eventos a ejecutar de la forma principal
// En caso que hay una estatus de un componente
// no ejecuta el evento
/////////////////////////////////
const ejeEvento = (newEvento: string) => {
  console.log('Grid ejeEvento', newEvento)

  for (const comp in compStatus) {
    // console.log('Grid ejeEvento comp=', comp, compStatus[comp])

    if (compStatus[comp] != 'A' && Status.value == 'A') {


      // console.log('Grid ejeEvento Status comp=', comp, 'Estatus=', compStatus[comp])

      Status.value = 'P';  // Cambia el estatus del grid a Proceso
      emit("update:Status", 'P'); // actualiza el valor Status en el componente padre. No se debe utilizar Status.Value

      //        return
    }
  }

  console.log('Grid ejeEvento Form.eventos', This.Form.eventos)
  This.Form.eventos.push(newEvento) // emitimos los eventos a la forma padre
}





/////////////////////////////////////////
// Metodo loadDataFromServer
// Descripcion : se trae datos desde el servidor
/////////////////////////////////////////


const loadData = async () => {
  //This.Row = -1
  load_data = false

  if (!scroll.rows || scroll.rows == 0) scroll.rows = 10

  const Rows = scroll.rows

  // Se inserto un renglon
  if (RowInsert) {
    console.log('loadData() RowInsert')
    let page = Db.View[props.prop.RecordSource].recnoVal.length / scroll.rows
    page = Math.trunc(page)
    if (scroll.page != page)
      scroll.page = page
  }

  This.Form.prop.Status = 'P'
  while (scroll.dataPage.length > 0)
    scroll.dataPage.pop() // borramos arreglon

  try {

    if (!Db || props.prop.RecordSource.length < 2
      || Db.View[props.prop.RecordSource].recnoVal.length == 0
    ) {
      scroll.controls = false
      scroll.page = 0
      scroll.top = false
      scroll.bottom = false
      if (props.prop.RecordSource.length > 1) {
        scroll.controls = true
      }
      This.Form.prop.Status = 'A'
      return false

    }
    const result = []


    scroll.bottom = false

    if (scroll.page == 0)
      scroll.top = true
    else
      scroll.top = false
    let RowNumber = 0
    for (let i = 0; i < Rows; i++) {
      const elementNo = ((scroll.page) * Rows) + i
      if (Db.View[props.prop.RecordSource].recnoVal[elementNo]) {
        scroll.dataPage[i] = Db.View[props.prop.RecordSource].recnoVal[elementNo]
        RowNumber = i
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
    This.Row = -1
    if (RowInsert) {
      RowInsert = false
      let First = ''
      This.Row = RowNumber
      for (const comp of This.main) {
        if (First == '') {
          First = comp
        }
        This[comp].prop.Valid = false // Ponemos no validado todos los componentes
      }
      nextTick(() => {
        console.log("asignaRenglon row ", This.Row, " Columna=", First);
        This[First].prop.Focus = true;

      });
      This.Form.prop.Status = 'A'
      return
    }

  } catch (err) {
    console.warn('Error loadData ', err)
    //    scroll.noResult = true;
    //    scroll.message = "Error loading data";
  }

  This.Form.prop.Status = 'A'


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
  if (scroll.bottom && !RowInsert) return
  scroll.page = Db.View[props.prop.RecordSource].recnoVal.length / scroll.rows

  scroll.page = Math.trunc(scroll.page)
  //if (scroll.page > 0) scroll.page--

  loadData()
  scroll.bottom = true

}

const appendRow = async () => {
  scroll.controls = false

  // console.log('1) appendRow')
  if (This.Row >= 0) {

    //for (let i = 0; i < This.main.length; i++) { // Recorre todos los estatus del grid

    for (const comp of This.main) { // Recorre todos los estatus del grid

      //      if (!This[This.main[i]].prop.Valid) { // Si alguno no esta Validado
      if (!This[comp].prop.Valid) { // Si alguno no esta Validado
        // console.warn('appendRow column not validate= ', comp)
        This[comp].prop.Focus = true
        return
      }
    }
  }

  await This.appendRow()  // Llama en la clase grid.ts

  last()
  if (!This[This.main[0]].prop.First)
    This[This.main[0]].prop.First = true;

  const rows = scroll.dataPage.length - 1
  This.Row = scroll.dataPage[rows].id




  //eventos.push(This.prop.Map + '.appendRow()')

  // load_data = true
  // RowInsert = true  // indicamos que hubo insercion de renglon

  /*


    // Si era el ultimo elemento de la pagina
    if (scroll.bottom) {
      scroll.bottom = false
      last()
    }
    else
      load_data = true
  
  
    const ult_ele = scroll.dataPage.length - 1
    This.Row = scroll.dataPage[ult_ele].id
  */
}


const borraRenglon = async (recno?: number) => {
  scroll.controls = false
  if (!recno) {
    //console.log('borraRenglon data Page====>',This.Row,scroll.dataPage)

    if (This.Row < 0) return
    // busca a cual recno pertenece el This.Row
    for (let i = 0; scroll.dataPage.length - 1; i++) {

      if (scroll.dataPage[i].id == This.Row) {
        recno = scroll.dataPage[i].recno
        break
      }
    }
    if (!recno) return

  }
  //const { $MessageBox } = useNuxtApp()
  if (await MessageBox(`Borramos renglon ${recno}`, 4, '') == 6) {
    eventos.push(This.prop.Map + '.deleteRow(' + recno + ')')

    This.Row = -1 // Quitamos la posicion del renglon
    console.log('delete borramos load_data', load_data)
    load_data = true

  }
}

const saveRow = async (recno?: number) => {
  scroll.controls = false
  if (!recno) {
    //console.log('borraRenglon data Page====>',This.Row,scroll.dataPage)

    // if (This.Row < 0) return
    // busca a cual recno pertenece el This.Row
    for (let i = 0; scroll.dataPage.length - 1; i++) {

      if (scroll.dataPage[i].id == This.Row) {
        recno = scroll.dataPage[i].recno
        break
      }
    }
    if (!recno) return

  }
  //const { $MessageBox } = useNuxtApp()
  if (await MessageBox(`Borramos renglon ${recno}`, 4, '') == 6) {
    eventos.push(This.prop.Map + '.deleteRow(' + recno + ')')

    This.Row = -1 // Quitamos la posicion del renglon
    console.log('delete borramos load_data', load_data)
    load_data = true

  }
}

const saveTable = async () => {
  console.log('Grid ', This.Name, 'SaveTable', This.Row)
  if (This.Row >= 0) {

    for (let i = 0; i < This.main.length; i++) {
      if (!This[This.main[i]].prop.Valid) { // Si no validado
        This[This.main[i]].prop.Focus = true
        return

      }

    }
  }
  //if (This.Row < 0) return
  scroll.controls = false
  //const { $MessageBox } = useNuxtApp()
  eventos.push(This.prop.Map + '.grabaTabla()')
  load_data = true
}


/*
const autoLoad = async (RecordSource: string) => {
  //scroll.controls = false

  if ( !await This.valid())  // Hace valid en la clase  grid.ts
     return
  // Si no hay renglones

  load_data = true

  // loadData()        
  // load_data = true
  // RowInsert = true  // indicamos que hubo insercion de renglon
  return
}
*/

/////////////////////////////////////////
// Metodo init Vfp
// Aqui debemos de asignar todos los Valores inciales del componente
// A pesar que nom_nom se pasa por referencia, se tuvo que definir en props para qu fuera reactivo
// Se tiene que emitir para que cambie el Valor en el template
/////////////////////////////////////////

const init = async () => {

  console.log('Init Grid==>', props.Name, 'autoLoad=', props.prop.autoLoad, 'main', This.main)

  // await This.init()
  let firstElement = ''
  //  for (const comp in This.elements) {
  for (let i = 0; i < This.main.length; i++) {
    const comp = This.main[i]

    if ( //  This[componente].prop.Capture &&  // Si es componete de captura
      This[comp].prop.Capture == true
    ) {
      if (This[comp].prop.First)
        firstElement = comp


      //  compStatus[comp] = toRef(This[comp].prop, "Status"); // stack de estatus de componentes
      compStatus[comp] = toRef(This[comp].prop, "Status"); // stack de estatus de componentes

    }

  }

  //if (firstElement.length == 0) {

  //  This[This.elements[0].Name].prop.First = true
  // }
  // if (props.Name=='des_dat')  Ref.value.autofocus=true
  //Status.value = 'I';
  //Value.value = 0; // asignamos Valor inicial



  if (props.prop.autoLoad) // Si tiene autoLoad, llama valid de este grid
    await This.valid()

  if (props.prop.RecordSource.length > 1 && Db.View[props.prop.RecordSource])
    loadData()



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
