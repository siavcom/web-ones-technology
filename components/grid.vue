<template>
  <div :id="Id + '_main_divi_grid'" class="divi" v-if="props.prop.Visible && props.prop.RecordSource.length > 1"
    :style="divStyle" ref="Ref" @click.middle.stop="middleClick()">
    <label :id="Id + '_lable'" class=" error" v-show="Error">{{ prop.ErrorMessage }}</label>
    <!--div class="tooltip"-->
    <!-- Grid  -->
    <!--form class="gridDatos"  :style="{ height: 'auto', width: 'inherit' }" -->
    <div :id="Id + '_grid_datos'" class="gridDatos" :style="{ height: 'auto', width: '99.5%' }">

      <!--label text-align="center">{{ prop.ColumnTextLabel }}</label>  -->
      <h2 v-if="prop.Caption.length > 0">{{ prop.Caption }}</h2>

      <!-- v-if="scroll.dataPage && scroll.dataPage.length" -->

      <div :id="Id + '_div_grid_tabla'" class="tabla"
        :style="{ minHeight: '250px', height: 'fit-content', width: 'inherit' }">
        <table :id="Id + '_grid_tabla'" class="gridTable" :style="{ height: 'auto' }"> <!--lineHeight:11px-->
          <thead>
            <tr style="font-size: 13px">
              <th> </th>
              <th :id="Id + '_grid_th_column_header' + column.Name" v-for="column in This.elements" :key="column.Id"
                :style="{ height: prop.headerHeight, lineHeight: '15px' }">
                <!--Header:
                  -->
                <div :id="Id + '_div_grid_column_header' + column" v-show="This[column.Name].prop.Visible">
                  <!--Imprime como etiqueta el header de cada columna-->
                  {{ This[column.Name].prop.ColumnTextLabel }}
                </div>
              </th>
            </tr>
          </thead>
          <!---------------------------  Detalle  --------------------------------->
          <tbody :id="Id + '_grid_tbody'" v-show="This.Form.prop.Status == 'A' && scroll.dataPage.length > 0"
            style="height: auto">

            <!-------------  Renglones  ------------------------>
            <tr :id="Id + '_grid_tr_' + key" v-if="scroll.dataPage && scroll.dataPage.length > 0"
              v-for="(item, key) in scroll.dataPage" :key="item && item.recno ? item.recno : 0"
              :style="This.Row < 0 || item.id != This.Row ? trStyleInactive : trStyleActive">
              <!-- No utilizar vertical-aling en renNumber-->
              <td v-if="item" :id="Id + '_grid_td_row' + item.recno" class='renNumber' style="height: auto;"><label>{{
                item.recno
                  }}</label></td>
              <!-------------  Columnas  ------------------------->
              <td v-if="item" :id="Id + '_grid_td_column_' + item.recno + '_' + col.Name" v-for="col in This.elements"
                :key="item.recno.toString() + col.Name" :style='{ "height": This[col.Name].style.height, padding: 0 }'
                :headers="col.Name">

                <textLabel :id="Id + '_grid_textLabel_' + item.recno + '_' + col.Name" v-if="item.id != This.Row"
                  v-bind:Registro="item.id != This.Row ? item.recno > 0 ? item.recno : 0 : 0" v-bind:Id="item.id"
                  v-bind:prop="This[col.Name].prop" v-bind:position="This[col.Name].position"
                  v-bind:style="This[col.Name].style" @click.stop="asignaRenglon(item.id, col.Name)" @focusout.stop>
                </textLabel>
                <!--   @click.capture="asignaRenglon(`${This.prop.Map}.asignaRenglon(${item.id},'${col.Name}')`)" -->


                <!--/Transition-->

                <component :id="Id + '_grid_component_' + col.Name + '_' + item.recno" v-else
                  :is="impComponent(This[col.Name].prop.BaseClass)" v-model:Value="This[col.Name].prop.Value"
                  v-model:Key="This[col.Name].prop.Key"
                  v-bind:Registro="item.recno > 0 || item.recno != null ? item.recno : 0"
                  v-bind:prop="This[col.Name].prop" v-bind:style="This[col.Name].style"
                  v-bind:position="This[col.Name].position"
                  :style="{ 'width': This[col.Name].style.width, 'zIndex': This[col.Name].prop.ZIndex + 3 }">
                </component>
                <!--/div-->
                <!--/Transition-->
                <!--/div-->
              </td>

            </tr>

            <tr>
              <td>

              </td>
            </tr>

          </tbody>

        </table>
      </div>

      <!--div :id="Id + '_bottom'" class="break"-->
      <div :id="Id + '_bottom_controles'" class="controles" :disabled="!scroll.controls">

        <!-- click.capture.stop -->
        <span :id="Id + '_botton_controles_save'" title="Save all rows" v-show="prop.saveButton && This.prop.Valid"
          @click="saveTable()" :style="{ 'padding': '5px' }">
          <nuxt-img :id="Id + '_ botton_controles_save_img'" src="/Iconos/svg/save-color1.svg" width="40" />
        </span>

        <span :id="Id + '_botton_controles_add'" title="Insert row" v-show="prop.addButton && This.prop.Valid"
          :style="{ 'padding': '5px' }" @click="appendRow()">
          <nuxt-img :id="Id + '_otton_controles_add_img'" src="/Iconos/svg/add-color.svg" width="35" />
        </span>

        <span :id="Id + '_botton_controles_page'" v-show="scroll.page > 0 && This.prop.Valid">

          <span :id="Id + '_botton_controles_page_first'" title="First row" :style="{ 'padding': '5px' }"
            @click.capture.stop="first()">
            <nuxt-img :id="Id + '_botton_controles_page_first_img'" src="/Iconos/svg/first.svg" width="35" />
          </span>

          <span :id="Id + '_botton_controles_page_previus'" title="Previus page" :style="{ 'padding': '5px' }"
            @click.capture.stop="previous()">
            <nuxt-img :id="Id + '_botton_controles_page_previus_img'" src="/Iconos/svg/previous.svg" width="35" />
          </span>

        </span>
        <span :id="Id + '_botton_controles_one__page'" v-show="!scroll.bottom && This.prop.Valid">
          <span :id="Id + '_botton_controles_one__page_next'" title="Next page" @click="next()"
            :style="{ 'padding': '5px' }">
            <nuxt-img :id="Id + '_botton_controles_one__page_next_img'" src="/Iconos/svg/next.svg" width="35" />
          </span>
          <span :id="Id + '_botton_controles_one__page_last'" title="Last page" @click="last()"
            :style="{ 'padding': '5px' }">
            <nuxt-img :id="Id + '_botton_controles_one__page_last_img'" src="/Iconos/svg/last.svg" width="35" />
          </span>

        </span>


        <span :id="Id + '_botton_controles_delete_row'" title="Delete row" v-show="prop.deleteButton && This.Row >= 0"
          :style="{ 'padding': '5px' }" @click.stop="borraRenglon()">
          <nuxt-img :id="Id + '_botton_controles_delete_row_img'" src="/Iconos/svg/delete-color.svg" width="40" />
        </span>

        <span :id="Id + '_page_rows'">
          Rows to display
          <input ref="Ref" :id="Id + '_Rows_page_number'" type="number" v-model="scroll.rows" :step="1" min="5"
            max="500">
        </span>




        <!--
        <div :id="Id + '_footer_div_' + compFooter" v-for="(compFooter) in This.footer" style="zIndex:0">

          <component :id="Id + '_component_footer_' + compFooter" :is="impComponent(This[compFooter].prop.BaseClass)"
            v-model:Value="This[compFooter].prop.Value" v-model:Status="This[compFooter].prop.Status"
            v-model:ShowError="This[compFooter].prop.ShowError" v-model:Key="This[compFooter].prop.Key"
            v-bind:Registro="This[compFooter].Recno == null ? 0 : This[compFooter].Recno"
            v-bind:prop="This[compFooter].prop" v-bind:style="This[compFooter].style"
            v-bind:position="This[compFooter].position"
            @click.stop.prevent="ejeEvento(This[compFooter].prop.Map + '.click()')"></component>
        </div>
        -->
      </div>

    </div> <!--/form-->

  </div>
</template>


<script setup lang="ts">
/*   Cambios en el componente
   4/Dic/2024   .- Se quito el loadData
*/

const emit = defineEmits(["update", "update:Value", "update:Status", "update:ErrorMessage", "update:Key"]);

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
    headerHeight: string;
  };
  /*
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
    */
  position: {
    position: "left"; //left,right,center,absolute. Si es absulute poner Value left y top
    left: number;
    Top: number;
  };
  Registro: 0;
  //Component: null;
  //db: any

}>();
// Valores componente padre
//const Component = ref(props.prop.Component)
const Component = ref(props.prop.This)
//const ThisGrid = Component.value

const This = Component.value  // falta probar reactividad utilizando Component.value.This
const Prop = ref(This.prop) // Propiedades del componente

const Este = props.prop.This
const captionStyle = reactive({ ...Este.captionStyle })
const inputStyle = reactive({ ...Este.inputStyle })
const divStyle = reactive({ ...Este.style })
//const Id = This.prop.Name + props.Registro.toString().trim()

const Id = This.prop.Name + '_' + Math.floor(Math.random() * 10000000).toString() //props.Registro.toString().trim()


const compStatus = reactive({})
const compValid = reactive({})      // Arreglo de validacion de los componentes
var load_data = false //Verdadero cuando se debe cargar datos a la pagina
var RowInsert = false // Verdadero cuando ocurrio una insercion de renglon
const eventos = reactive([]);  // pila de eventos a ejecutar en forma sincrona

//const Sql = props.db.value // Vista que utilizara el grid
const Sql = This.Form.db // Vista que utilizara el grid

//console.log('grid  view.value Sql ====>',Sql)
//const View=Sql.View[props.prop.RecordSource] // Vista de captura de db
//console.log('grid  View ====>',props.prop.RecordSource,View)

// Valores propios
const Value = ref(props.prop.Value);
const Ref = ref(null) // Se necesita para tener referencia del :ref del componente  ref(props.prop.Ref)
const Status = ref(props.prop.Status);
const ErrorMessage = ref(props.prop.ErrorMessage)
const Key = ref(props.prop.Key)

const Column = ref(This.Column) // Columna actual ''
defineExpose({ Value, Status, ErrorMessage });  // para que el padre las vea
const Error = ref(false)

//let First = ''
let firstElement = ''

//const Focus = ref(false)
const trStyleActive =
  { backgroundColor: 'antiquewhite' }

const trStyleInactive =
  { backgroundColor: 'white' }




const scroll = reactive({
  controls: false,
  dataPage: [],  // Elementos que compone la pagina Sql.View[props.prop.RecordSource].recnoVal[elementNo]
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

    if (new_val == 'A' && old_val != 'A') {
      emitValue()
      // si hay carga de datos
      if (load_data) {

        loadData()
      }

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
        console.log('Grid watch eventos eventos=', new_val, ' comp=', comp, 'Status=', compStatus[comp])
        //   Status.value = 'P';  // Cambia el estatus del grid a Proceso
        //   emit("update:Status", 'P'); // actualiza el valor Status en el componente padre. No se debe utilizar Status.Value

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
/* Se quito 17/Dic/2024
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
      console.log('=====watch thisform.eventos loadData()=======')
      //  4/Dic/2024   .- Se quito el loadData
      // loadData()

    }
  },
  { deep: false }
);

*/

//////////////////////////////////////////////
// revisa los estatus de todos los componentes
watch(
  () => compStatus,
  (new_val, old_val) => {


    for (const comp in compStatus) { // Recorre todos los estatus del grid

      if (compStatus[comp] != 'A' && Status.value == 'A' && !This[comp].prop.Disabled && This[comp].prop.Visible) { // Si alguno no esta activo
        //Status.value = 'P';  // Cambia el estatus del grid a Proceso
        console.log('-- Grid watch estatus Name=', This.Name, ' comp = ', comp, 'Status=', compStatus[comp], 'This.Row = ', This.Row)

        //   emit("update:Status", 'P'); // actualiza el valor Status en el componente padre. No se debe utilizar Status.Value

        //  return
      }
    }
    Status.value = 'A';  // Todos los componentes del grid esta Activo
    emit("update:Status", 'A'); // actualiza el valor Status en el componente padre. No se debe utilizar Status.Value
    return
    /*
      if (eventos.length == 0) return
      for (let i = 0; i < eventos.length; i++)
        This.Form.eventos.push(eventos[i])
  
      eventos.length = 0 // borramos los eventos
  */
  },
  { deep: true }
);


//////////////////////////////////////////////
// revisa las validaciones de todos los componentes
//////////////////////////////////////////////
watch(
  () => compValid,
  (new_val, old_val) => {
    // console.log('1)  Grid watch compValid Row=', This.Row, RowInsert)
    for (const comp in compValid) { // Recorre todos los estatus del grid
      if (!compValid[comp] && !This[comp].prop.Disabled && This[comp].prop.Visible) { // Si alguno no esta validado
        console.log('-- Grid watch compValid NO validado comp = ', This[comp].prop.Name, 'Disabled', This[comp].prop.Disabled)

        if (This.prop.Valid)
          This.prop.Valid = false

        return
      }
      if (!compValid[comp])
        compValid[comp] = true
    }
    This.prop.Valid = true
    //console.log('------>>>>>>  Grid watch compValid Vaid=', This.prop.Valid, 'Row=', This.Row,)
  },
  { deep: true }
);

///////////////////////////////////////////////
// Cuando se cambia el RecordSource  
///////////////////////////////////////////////
watch(
  () => Prop.RecordSource,
  async (RecordSource, old_val) => {

    console.log('1) Grid watch Vsible  RecordSource=', RecordSource)

    if (This.prop.Visible && This.prop.RecordSource.length > 1) {
      console.log('1) Grid watch RecordSource loadData() RecordSource=', This.prop.RecordSource, Sql.View[RecordSource])


      // inicializamos scroll
      scroll.page = 0
      scroll.dataPage = []  // Elementos que compone la pagina Sql.View[props.prop.RecordSource].recnoVal[elementNo]
      scroll.top = true     //Pprincipio de la pagina
      scroll.bottom = false // Final de pagina

      if (Sql.View[This.prop.RecordSource]) {
        if (Sql.View[This.prop.RecordSource].recnoVal.length == 0 && This.prop.saveButton)  // No hay renglones
          await appendRow()

      }
      else
        await loadData()
    }
  }
  ,
  { deep: true }
);


watch(
  () => Prop.Visible,
  async (new_val, old_val) => {

    console.log('1) Grid watch Vsible  RecordSource=', new_val)

    // Si no hay renglones , aumenta un renglon
    if (This.prop.Visible && props.prop.RecordSource.length > 1) {

      scroll.page = 0
      scroll.dataPage = []  // Elementos que compone la pagina Sql.View[props.prop.RecordSource].recnoVal[elementNo]
      scroll.top = true     //Pprincipio de la pagina
      scroll.bottom = false // Final de pagina
      console.log('1) Grid watch Vsible loadData() RecordSource=', This.prop.RecordSource, Sql.View[RecordSource])
      if (Sql.View[This.prop.RecordSource]) {
        if (Sql.View[This.prop.RecordSource].recnoVal.length == 0 && This.prop.saveButton)  // No hay renglones
          await appendRow()

      } else
        await loadData()

    }
  },
  { deep: true }
);




//////////////////////////////////////////////
// This.Row
/////////////////////////////////////////////////
watch(
  () => This.Row,
  async (new_data, old_data) => {

    //"item.recno > 0 || item.recno != null ? item.recno : 0"

    if (This.Row == -100) return

    console.log('1) Grid watch Row = ', This.Row)

    if (This.Row == -1) {  // Recarga datos
      console.log('2) dele row Grid watch Row = ', This.Row)

      //load_data = true
      await last() // carga el ultimo renglon
      //await loadData()
      console.log('3) dele row Grid watch Row = ', This.Row)
      //restableceStatus()

      //if (scroll.dataPage.length > 0)
      //  This.Row = 0


      return
    }

    if (This.Row <= -10) { // hubo insercion de renglon

      if (RowInsert)
        return
      // console.log('2) Insert Grid watch Row = ', This.Row)

      //await loadData()

      await last(true)
      RowInsert = true

      //console.log('3) Insert Grid watch Row = ', This.Row)

      if (scroll.dataPage[scroll.dataPage.length - 1]) {
        const Row = scroll.dataPage[scroll.dataPage.length - 1].id
        await asignaRenglon(Row, firstElement)
      }

      //RowInsert = false

      //This.Row = scroll.dataPage[rows].id

      return


    } else {
      const alias = This.prop.RecordSource
      This.Sql.View[alias].recno = This.Row + 1
      await This.Sql.bof(alias)
      await This.Sql.eof(alias)
    }

    // ponemos todos los campos de captura en ReadOnly=false

    if (This.Row >= 0) {

      // console.log('2) Grid watch Row = ', This.Row, 'Column.value=', Column.value, 'RowInsert=', RowInsert)
      for (let i = 0; i < This.main.length; i++) {
        const comp = This.main[i]
        This[comp].prop.ReadOnly = false;
        This[comp].prop.Valid = !RowInsert

        if (Column.value > '' && comp == Column.value) {
          //     Aqui mero   . Checar que ya este montaDOM EL COMPONENTE PARA HACER EL FOCO
          //   console.log('2) Grid watch Row Focus = ', This.Row)
          if (!This[comp].prop.Focus) {
            This[comp].prop.Focus = true
            Column.value = ''
          }
        }
      }
      if (RowInsert) {
        RowInsert = false
      }


    }

  },
  { deep: false }
);


////////////////////////////////
// Aumenta la pila de eventos a ejecutar de la forma principal
// En caso que hay una estatus de un componente
// no ejecuta el evento
/////////////////////////////////
//const asignaRenglon = (newEvento: string) => {
const asignaRenglon = async (Row: number, ColumnName: string) => {

  // console.log('asignaRenglon Row=', Row, ' ColumnName=', ColumnName, ' This.Row=', This.Row, 'Column.value=', Column.value)
  // This.Form.eventos.push(This.prop.Map + `.asignaRenglon(${Row},'${ColumnName}' )`)
  // return


  if (This.Row >= 0) { // Si hay un renglon seleccionado, checa las validaciones
    //   console.log('asignaRenglon LocalAla=', await localAlaSql(`select  * from ${This.prop.RecordSource} `))
    for (const columna of This.elements) {

      if (!This[columna.Name].prop.Valid)
        return This[columna.Name].setFocus() // Se posiciona el cursor en el componente no validado
    }
  }

  This.Row = Row;
  Column.value = ColumnName

}

const asignaStyle = (style: {}, itemId: string) => {
  const Id = +itemId
  //nsole.log('asignaStyle itemId=', style, itemId)
  if (style !== undefined) {
    if (Math.trunc(itemId / 2) == (itemId / 2))
      style.backgroundColor = 'antiquewhite'
    else
      style.backgroundColor = 'white'
  }
  return style

}

/////////////////////////////////////////
// Metodo loadDataFromServer
// Descripcion : se trae datos desde el servidor
/////////////////////////////////////////

const loadData = async (Pos?: number) => {
  // console.log('1) Grid loadData() RecordSource=', props.prop.RecordSource, 'Pos=', Pos, 'RowInsert=', RowInsert)

  if (This.prop.RecordSource.length < 2) return
  /*
    for (let i = 0; i < This.main.length && First == ''; i++) { // Recorre todos los estatus del grid
      if (!This[This.main[i]].prop.Disabled)
        First = This[This.main[i]].prop.Name
    }
  
  */

  This.Row = -100   // Quita la posicion actual del renglon

  load_data = false

  if (!scroll.rows || scroll.rows == 0) scroll.rows = 10

  const Rows = scroll.rows

  // Se inserto un renglon
  if (RowInsert) {

    let page = Sql.View[props.prop.RecordSource].recnoVal.length / scroll.rows
    page = Math.trunc(page)
    if (scroll.page != page)
      scroll.page = page
  }

  This.Form.prop.Status = 'P'
  while (scroll.dataPage.length > 0)
    scroll.dataPage.pop() // borramos todos los renglones

  try {

    if (!Sql || props.prop.RecordSource.length < 2
      || Sql.View[props.prop.RecordSource].recnoVal.length == 0) {
      console.warn(' Grid loadData() No hay datos en la vista o no existe la vista=', props.prop.RecordSource)
      scroll.page = 0
      scroll.top = false
      scroll.bottom = false
      if (props.prop.RecordSource.length > 1)
        scroll.controls = true
      else
        scroll.controls = false

      This.Form.prop.Status = 'A'
      return false

    }
    // const result = []

    scroll.bottom = false

    if (scroll.page == 0)
      scroll.top = true
    else
      scroll.top = false
    let RowNumber = 0
    for (let i = 0; i < Rows; i++) {
      const elementNo = ((scroll.page) * Rows) + i
      if (Sql.View[props.prop.RecordSource].recnoVal[elementNo]) {
        scroll.dataPage[i] = Sql.View[props.prop.RecordSource].recnoVal[elementNo]
        // console.log('loadData() elementNo=', elementNo, ' scroll.dataPage[i]=', scroll.dataPage[i])
        RowNumber = i
      }

      else {  // borra los elementos que ya no existen
        //    scroll.dataPage.slice(i, Rows - 1 - i)
        if (i == 0) { // No hay datos, le asigna el ultimo elemento
          scroll.dataPage[i] = Sql.View[props.prop.RecordSource].recnoVal[elementNo - 1]
          scroll.dataPage.length = 1 // Solo dejamos  el ultimo elemento

        } else {

          scroll.dataPage.length = i // Borramos todos los elementos restantes
        }
        scroll.bottom = true

        break
      }

    }
    // console.log('3) loadData() RowNumber=', RowNumber, 'scroll.dataPage=', scroll.dataPage, 'SQL', Sql.View[props.prop.RecordSource].recnoVal)

    if (RowInsert)
      return

    for (let i = 0; i < This.main.length; i++) {
      const comp = This.main[i]
      This[comp].prop.Valid = true
    }
    This.prop.Valid = true
    //console.log('4) loadData() compValid This.prop.Valid=', This.prop.Valid, ' This.Row=', This.Row)

    // This.Row = -1
    /*
    if (RowInsert) {
     
      // This.Row = RowNumber
      console.log('3) loadData() RowInsert RowNumber=', RowNumber, ' This.Row=', This.Row)
      for (const comp of This.main) {
        if (First == '') {
          First = comp
        }
        This[comp].prop.Valid = false // Ponemos no validado todos los componentes
      }
      nextTick(() => {
        console.log("4) loadData() RowInsert asignaRenglon row ", This.Row, " Columna=", First, scroll);

        This[First].prop.Focus = true;
      });
      RowInsert = false
    }
  */


  } catch (err) {
    console.warn('Error loadData ', err)
    //    scroll.noResult = true;
    //    scroll.message = "Error loading data";
  }


  restableceStatus()
  This.Form.prop.Status = 'A'
  scroll.controls = true

}

const restableceStatus = async () => {
  for (const comp in compStatus)
    compStatus[comp] == 'A'
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

const last = async (insert?: boolean) => {

  scroll.controls = false
  // if (scroll.bottom && !RowInsert) return
  //  console.log('2.5) Insert Grid last() scroll.page=', scroll.page, 'View=', Sql.View[props.prop.RecordSource].recnoVal.length, 'scroll.rowa', scroll.rows)

  scroll.page = Sql.View[props.prop.RecordSource].recnoVal.length / scroll.rows

  scroll.page = Math.trunc(scroll.page)

  //console.log('2.6) Insert Grid last() scroll.page=', scroll.page, 'View=', Sql.View[props.prop.RecordSource].recnoVal.length)

  await loadData(1)


  // await asignaRenglon(scroll.dataPage[rows].id, First)

  /*
    nextTick(() => {
  
      for (let i = 0; i < This.main.length; i++) {
        const comp = This.main[i]
        This[comp].prop.Valid = false;
      }
      return
    })
  
  */



  /*
  if (insert) {
    if (!This[This.main[0]].prop.First)
      This[This.main[0]].prop.First = true;

    const rows = scroll.dataPage.length - 1
    This.Row = scroll.dataPage[rows].id

    for (let i = 0; i < This.main.length; i++) { // Recorre todos los estatus del grid
      if (This[This.main[i]].prop.Capture && !This[This.main[i]].prop.Disabled)  // Solo campos de captura
        This[This.main[i]].prop.Valid = false
    }

  }

  */
  scroll.bottom = true

}

const appendRow = async () => {
  scroll.controls = false
  if (This.Row >= 0) {
    for (let i = 0; i < This.main.length; i++) { // Recorre todos los estatus del grid
      const comp = This.main[i]

      if (This[comp].prop.Capture && !This[comp].prop.Valid) { // Si alguno no esta Validado
        if (!This[comp].valid()) {
          //  console.log('before appendRow Not valid', comp, This[comp].prop.Valid)
          This[comp].prop.Focus = true
          return
        }
      }
    }
  }
  //await last()
  await This.appendRow()  // Llama en la clase grid.ts y pondra This.Row=-10
  /*  18/Jun/2025 
    if (scroll.dataPage[scroll.dataPage.length - 1]) {
      const Row = scroll.dataPage[scroll.dataPage.length - 1].id
      await asignaRenglon(Row, First)
    }
  */

}

//  await last(true) 

const borraRenglon = async (recno?: number) => {
  scroll.controls = false
  if (!recno) {

    if (This.Row < 0) return
    // busca a cual recno pertenece el This.Row


    //  console.log('borraRenglon data Page====>', This.Row, scroll.dataPage)

    for (let i = 0; i < scroll.dataPage.length; i++) {
      //  console.log('Grid.vue borraRenglon This.row=', This.Row, ' scroll.dataPage=', scroll.dataPage[i])
      if (scroll.dataPage[i].id == This.Row) {
        recno = scroll.dataPage[i].recno
        break
      }
    }
    if (!recno) return

  }

  eventos.push(This.prop.Map + '.deleteRow(' + recno + ')')

  /*
  if (await MessageBox(`Borramos renglon ${recno}`, 4, '') == 6) {
    This.prop.Status = 'A'
    await restableceStatus()
    eventos.push(This.prop.Map + '.deleteRow(' + recno + ')')
    This.Row = -1 // Quitamos la posicion del renglon
    load_data = true

  }
*/


}

/*
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
*/
const saveTable = async () => {

  if (This.Row >= 0) {
    // Checa si estan validadas todas las columnas
    for (let i = 0; i < This.main.length; i++) {

      // Si es campo de captura
      if (This[This.main[i]].prop.Capture == true && !This[This.main[i]].prop.Valid) {

        console.warn('Grid SaveTable No valid Column=', This[This.main[i]].prop.Name)
        This[This.main[i]].prop.Focus = true
        return

      }

    }
  }
  //if (This.Row < 0) return
  scroll.controls = false
  //const { $MessageBox } = useNuxtApp()
  // console.log('Grid SaveTable', This.prop.Name, 'Map=', This.prop.Map)

  eventos.push(This.prop.Map + '.grabaTabla()')

  //load_data = true
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


onMounted(async () => {
  //  console.log('1) Init Grid==>', This.Name, 'autoLoad=', props.prop.autoLoad, 'main', This.main)

  // await This.init()

  //  for (const comp in This.elements) {
  for (let i = 0; i < This.main.length; i++) {
    const comp = This.main[i]
    if (i == 0)
      firstElement = comp
    if (This[comp].sw_translate)
      This[comp].translate()


    if (This[comp].prop.Capture == true)  // Si es componete de captura
    {

      if (This[comp].prop.First)
        firstElement = comp

      //  compStatus[comp] = toRef(This[comp].prop, "Status"); // stack de estatus de componentes
      compStatus[comp] = toRef(This[comp].prop, "Status"); // stack de estatus de componentes
      compValid[comp] = toRef(This[comp].prop, "Valid"); // stack de estatus de componentes

    }

  }

  //if (firstElement.length == 0) {

  //  This[This.elements[0].Name].prop.First = true
  // }
  // if (props.Name=='des_dat')  Ref.value.autofocus=true
  //Status.value = 'I';
  //Value.value = 0; // asignamos Valor inicial



  if (props.prop.autoLoad) // Si tiene autoLoad, llama valid de este grid para abrir tabla de captura 
    await This.valid()


  if (props.prop.RecordSource.length > 1 && Sql.View[props.prop.RecordSource])
    await loadData()

  console.log('2) Init Grid==>', This.Name, 'autoLoad=', props.prop.autoLoad, 'main', This.main,
    'RecordSource=', props.prop.RecordSource)


  This.prop.Valid = true // Asignamos el valor de validacion del grid
  scroll.controls = true

})


//init(); // Ejecuta el init


const middleClick = () => {
  // console.log('grid middleClick', This)
  if (This.Form && This.Form.translateContainer)
    This.Form.translateContainer.open(ref(This))
}

const handler = (event) => {
  if (event.which === 1) {
    //if (This.Form)
    //  This.Form.translateContainer.open(ref(This))
  }
  event.preventDefault();
}

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

div.tabla {
  /*position: absolute; */
  /* no borrar se utiliza junto con div.option position:relative*/
  border: 1px solid rgb(0, 5, 2);
  border-radius: 1%;
  max-height: 350px;
  /* max-width: 960px; */
  overflow-y: auto;
  overflow-x: auto;
  width: 99%;

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



table {
  /* Not required only for visualizing */
  border-collapse: collapse;
  width: 100%;

}

table.gridTable {
  border-collapse: collapse;
  width: fit-content;
}

table thead tr th {
  /* you could also change td instead th depending your html code */
  background-color: rgb(229, 247, 244);
  position: sticky;
  z-index: 100;
  top: 0;
  /* border: 1px solid rgb(0, 5, 2);*/
  border-left: .5px solid rgb(0, 5, 2);
  border-right: .5px solid rgb(0, 5, 2);
  /*border-bottom: 1px solid rgb(0, 5, 2);*/

  padding: 1em;
}

td {

  border-left: .5px solid rgb(0, 5, 2);
  border-right: .5px solid rgb(0, 5, 2);
  height: 9px;

  /*  border: 1px solid rgb(0, 5, 2);*/
  /* Not required only for visualizing
  padding: 1em; 
   */
}

::-webkit-scrollbar {
  width: 12px;
  /* width of the entire scrollbar */
}

::-webkit-scrollbar-track {
  background: orange;
  /* color of the tracking area */
}

::-webkit-scrollbar-thumb {
  background-color: blue;
  /* color of the scroll thumb */
  border-radius: 20px;
  /* roundness of the scroll thumb */
  border: 3px solid orange;
  /* creates padding around scroll thumb */
}
</style>
