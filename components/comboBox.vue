<template>
  <!--div v-if="prop.MultiSelect">Selected: {{ List }}</div-->
  <!--Se necesita el siguiente div para que funcione el siguiente v-show-->

  <div class="divi inputDivi" :style="divStyle" v-show="This.prop.Visible">
    <!--Etiqueta del componente -->
    <!--div class="mensajes" v-show="This.prop.Visible"-->
    <span class="etiqueta" v-if="prop.textLabel.length > 0" :style="labelStyle">{{ prop.textLabel + " " }}</span>
    <!--List Box -->
    <div v-if="prop.MultiSelect" class="multiSelect" @lostFocus="validList()" :style='multiSelectStyle'>
      <select v-model="List" multiple>
        <option class="option" v-for="(option, valueIndex) in columnas" :value="columnas[valueIndex].value">
          <!--Imprime Columnas -->
          <!--div class="columna"  v-for="(text, col) in option.text" :key="col"
            -->
          <input v-for="(text, col) in option.text" :style="{ 'width': width[col], 'text-align': 'left' }" class="input"
            :value="text" :disabled="prop.Disabled" :readonly="prop.ReadOnly" />
          <!--/div-->
        </option>
      </select>
    </div>

    <!--ComboBox 
        <input class="textInput" :readonly="+prop.Style == 2 || prop.ReadOnly" ref="Ref" type="text" :v-model="displayText"
          @focusout="focusOut" />{{ displayText }}
          textInputStyle
:style='comboStyle'
       inputBufferBuffer = '';
      -->
    <div v-else class="comboBox" ref="RefCombo" :style='comboStyle'>


      <input :id="Id" class="textInput" :style="inputStyle"
        :readonly="+prop.Style == 2 || prop.ReadOnly || prop.Disabled" :value="displayText" :tabindex="prop.TabIndex"
        ref="Ref" @keypress="keyPress($event)"
        @focus.prevent="toggle = false; This.Form.eventos.push(This.prop.Map + '.when()')" @focusout="emitValue()" />

      <!--span> {{ prop.Value }}</span-->
      <!--Valor seleccionado click-->

      <div v-show="!prop.ReadOnly && !prop.Disabled">

        <div class="toggle" v-if="toggle && (!prop.ReadOnly && !prop.Disabled)">
          <!--CheckBox -->
          <div class="columContainer" @focusout="toggle = !toggle" :style="columnContainer">
            <!--Columnas -->

            <div class="option" v-for="(option, valueIndex) in columnas" @mouseover="hover = true" :key="valueIndex"
              @mouseleave="hover = false" @click.stop="validClick(valueIndex)" :disabled="prop.ReadOnly">
              <!--Imprime Columnas -->

              <div class="columna" :disabled="prop.ReadOnly" v-for="(text, col) in option.text" :key="col" :style="{
    'width': width[col], 'text-align': 'left', 'z-index': toggleZIndex, 'height': '11px'
  }">
                <label class="optionLabel" v-text="text" :style:="columnLabelStyle" />
              </div>
            </div>
          </div>
        </div>
        <!--toggle click.prevent -->
        <img class="imagen" v-show="!prop.ReadOnly && !prop.Disabled"
          :src="toggle ? '/Iconos/svg/bx-left-arrow.svg' : '/Iconos/svg/bx-down-arrow.svg'" @click.stop="toggleClick" />

      </div>
    </div>
    <span class="tooltiptext" v-if="prop.ToolTipText.length > 0" v-show="ToolTipText && prop.Valid"
      :style="{ zIndex: zIndex + 10 }">{{ prop.ToolTipText }}</span>
    <span class="errorText" @focus.prevent="onFocus" v-show="!prop.Valid && ShowError">{{ prop.ErrorMessage }}</span>
  </div>
  <!--span v-if="prop.ShowValue">{{ prop.Value }}</span-->
  <!--/div-->
</template>

<script setup lang="ts">
// "update:Key", "update:Focus"
const emit = defineEmits(["update", "update:Value", "update:Valid", "update:Status", "update:displayText"]) //, "update:Ref", "update:Recno",
///////////////////////////////////////
// Variables comunes globales al componente
////////////////////////////////////

interface Props {
  //Recno: number;
  Registro: number;

  prop: {};
  style: {};
  position: {};
}

//const props = defineProps<{
const props = withDefaults(defineProps<Props>(), {
  Registro: 0,
  Component: null,
  // Value: undefined,
  prop: {

    BaseClass: "ComboBox",
    BoundColumn: 1, // Columna donde se tomara el Value

    Capture: true,
    ControlSource: "",
    ColumnCount: 0,
    ColumnWidths: "", //"75%,25%"

    /* componentStyle: {
       background: "white",
       cols: 100,
       color: "black",
       fontFamily: "Arial",
       fontSize: "13px", // automaticamente vue lo cambiara por font-size (para eso se utiliza la anotacion Camello)
       fontWeight: "normal",
       height: "85%",
       maxHeight: "auto",
       maxWidth: "100%",
       rows: 5,
       textAlign: "left",
       textTransform: "none",
       zIndex: 1, // profundidad
       width: "auto",
     },
     */

    List: [],

    Disabled: false,

    ErrorMessage: "",

    First: false,
    Focus: false,
    Format: "",

    InputMask: "",

    MaxLength: 0,
    MultiSelect: false,
    //Multiple: false,

    Name: "",

    Placeholder: "",

    ReadOnly: false,
    RowSource: "", // vi_cap_doc.tdo_tdo,des_tdo
    RowSourceType: 0, //1-Value, 2-Alias, 3-SQL Server,4- Local SQL, 5-Array


    Sorted: false,
    Status: "",
    ShowError: false,
    ShowValue: false,
    Style: 0, //0=DropDown Combo 2=DropDown List

    TabIndex: 0,
    Tag: "",
    textLabel: "",
    This: null,
    ToolTipText: "",
    Type: "text",

    Valid: false,
    Visible: true,
    Value: [String, Number, Date],


  },

  style: {
    background: "white",
    padding: "5px", // Relleno
    color: "#b94295",
    width: "auto",
    height: "30px",
    fontFamily: "Arial",
    fontSize: "13px", // automaticamente vue lo cambiara por font-size (para eso se utiliza la anotacion Camello)
    textAlign: "left",
    borderColor: "#000a01",
    borderWidth: "1px",
    zIndex: 1,

    // inputWidth: "inherit"
  },
  position: {
    position: "left", //left,right,center,absolute. Si es absulute poner Value left y top
    left: 0,
    Top: 0,
  },

})

const Value = ref(props.prop.Value)
const Recno = ref(0)
const Valid = ref(props.prop.Valid)
Valid.value = true
const ToolTipText = ref(true)

const Component = ref(props.prop.This)
const This = Component.value



const Id = This.prop.Name + props.Registro.toString()
let thisElement: Element | null
This.prop.htmlId = Id
const columnas = reactive([{}]); // tiene todos los renglones del comboBox
const displayText = ref("");
//const width = reactive([{}]);
const width = reactive(['60%', '20%', '20%']);

//const ReadOnly = ref(props.prop.ReadOnly)
//const Ref = ref(null)
const RefCombo = ref(null)

const Status = ref(props.prop.Status);
Status.value = 'I'
const toggle = ref(false)
const hover = ref(false)
const Focus = ref(props.prop.Focus)
//const First = ref(props.prop.First)

const ShowError = ref(false)
// Focus.value = false
const divStyle = reactive(props.style)
//divStyle.zIndex = 100 - This.prop.TabIndex



/*
const comboStyle = reactive(This.inputStyle) 


if (comboStyle.zIndex == 0)
  comboStyle.zIndex = 100 - This.prop.TabIndex
*/

const comboStyle = { //zIndex: 100 - This.prop.TabIndex,
  height: This.style.height
}

const zIndex = comboStyle.zIndex

// const inputStyle = reactive(props.inputStyle)

const inputStyle = reactive(This.inputStyle)


inputStyle.zIndex = zIndex


const toggleZIndex = comboStyle.zIndex + 1

const inputWidth = ref('auto')
const labelStyle = reactive(This.labelStyle)


const columnLabelStyle = {
  width: 'auto', //inputWidth.value,
  border: "1px solid rgb(0, 5, 2)",
  borderRadius: "5px",
  background: "white",
  color: "black",
  position: "relative",
  zIndex: comboStyle.zIndex + 1
}


const List = ref(props.prop.List)
const columnContainer = reactive({
  width: 'auto',
  height: 'auto',
  maxHeight: '200px',
  zIndex: comboStyle.zIndex + 1
})

let inputBuffer = ''


// let textInputStyle = {}
/*
if (props.prop.textInput.length > 0) {
  textInputStyle = props.prop.inputStyle
} else {
  textInputStyle = inputStyle

*/


//} fin textInput

/////////////////////////////////////////////////////////////////////
// emitValue
// Descripcion: emite hacia el componente padre el nuevo valor asignado
/////////////////////////////////////////////////////////////////
const emitValue = async (readCam?: boolean, isValid?: boolean) => {

  toggle.value = false
  let readValid = false


  if (!readCam) {  // Graba en AlaSql , el dato se cambio desde fuera 
    This.prop.Status = 'P'
    Status.value = 'P'
    emit("update:Status", 'P'); // actualiza el valor Status en el componente padre


    // Si no viene del watch This.prop.Value
    let Valor = Value.value

    // console.log('comboBox emitValue writeCampo ', props.Registro, props.prop.ControlSource, '!isValid=', isValid, 'Value=', Value.value)

    if (props.Registro > 0 && props.prop.ControlSource && props.prop.ControlSource.length > 2) {
      await This.Form.db.updateCampo(Valor, props.prop.ControlSource, props.Registro)
      Value.value = Valor
    }
    // actualiza el valor Value en el componente padre para interactive change tenga el valor This.prop.Value
    This.prop.Value = Value.value
    //console.log('comboBox emitValue Name=', props.prop.Name, 'Value=', This.prop.Value, 'Value=', Value.value)

    // await This.interactiveChange()


    if (!isValid) {
      await This.interactiveChange()

      inputBuffer = ''
      This.prop.Valid = false
      if (await This.valid() == false) {
        // console.log('1) !Valid editText emitValue() Name', props.prop.Name, 'This.valid= false')
        ShowError.value = true
        if (This.prop.Valid)
          This.prop.Valid = false
        //Ref.value.select() 
        thisElement.select();

        This.prop.Status = 'A'
        Status.value = 'A'
        emit("update:Status", 'A'); // actualiza el valor Status en el componente padre
        return
      }
    }

  }
  else {  // Lectura de campo

    if (props.Registro > 0 && props.prop.ControlSource.length > 0) {
      // Actualizamos el registro del form

      This.prop.Valid = false
      //  if (This.Parent.Recno = !props.Registro)
      //    This.Parent.Recno = props.Registro

      const data = await This.Form.db.readCampo(props.prop.ControlSource, props.Registro)

      let sw_dat = false
      for (const campo in data) {

        if (campo == 'key_pri' && data.key_pri > 0)
          This.prop.Valid = true



        if (campo != 'key_pri') {
          sw_dat = true

          // if (props.Registro && This.Recno != props.Registro)
          //   This.Recno = props.Registro


          This.prop.Valid = true// ya se capturo algo , se apaga Valid
          Value.value = data[campo]
          //console.log('comboBox emitValue readCampo ', props.Registro, props.prop.ControlSource, '!isValid=', isValid, 'Value=', Value.value)

          if (!isValid) {
            readValid = true
          }
        }
      }
      if (!sw_dat) {

        Value.value = null  // asigna el primer Text valor

      }
    }

  }

  This.prop.Valid = true // dato valido para que el watch de This.prop.Value no se active
  This.prop.Status = 'A'
  Status.value = 'A'  // se necesita para que el watch padre funcione
  emit("update:Status", 'A'); // actualiza el valor Status en el componente padre
  //console.log('comboBox Name=',This.Name,'Value.value=',Value.value,' columns=====>>>',columnas)
  let found = false
  if (Value.value == null) {
    if (columnas[0] && typeof columnas[0].value == 'number')
      Value.value = 0
    else
      Value.value = ''
  }
  //console.log('ComboBox Name=', props.prop.Name, 'Value.value=', Value.value)


  for (let i = 0; i < columnas.length && !found; i++) {
    if (columnas && columnas[0]) {
      // console.log('Buscando Valor comboBox Name=', props.prop.Name, 'i=', i, 'columnas=', columnas[i].value, 'This.prop.Value=', This.prop.Value, 'Value.value=', Value.value)
      if (
        (typeof columnas[i].value == 'string' && Value.value.trim() == columnas[i].value.trim()) ||
        This.prop.Value == columnas[i].value) {
        // El objeto columna tiene dos campos value y text
        displayText.value = typeof columnas[i]['text'][0] == 'string' ? columnas[i]['text'][0].trim() : columnas[i]['text'][0]  // asigna el resultado a mostrar
        found = true
        //     console.log('Found comboBox Name=', props.prop.Name, 'found ', 'Value=', Value.value, 'displayText.value=', displayText.value)
      }
    } // else break
  }
  if (!found && columnas.length > 0) { // No se encontro el valor , asignara el primer valor
    Value.value = columnas[0].value
    displayText.value = typeof columnas[0]['text'][0] == 'string' ? columnas[0]['text'][0].trim() : columnas[0]['text'][0]
    console.log('comboBox Name=', props.prop.Name, 'No found ', 'Value=', Value.value)
  }
  This.prop.Value = Value.value

  // console.log('3 comboBox emitValue() Name', props.prop.Name, 'displayText.value=', displayText.value)


  //nextTick(function () {
  emit("update:Value", Value.value); // actualiza el valor Value en el componente padre
  emit("update:displayText", displayText.value); // actualiza el valor Value en el componente padre
  emit("update") // emite un update en el componente padre
  //})
  // })
  ToolTipText.value = true  // Activamos el ToolTipText
  ShowError.value = false  // Desactivamos mensaje de error
  //  console.log('2 comboBox emitValue() Name', props.prop.Name, 'This.prop.Value=', This.prop.Value, 'Text=', Text.value)

  if (This.prop.ValidOnRead && readValid) { // Se manda validar despues de leer el componente
    // console.log('comboBox emitValue valid() Name', props.prop.Name, 'This.prop.Value=', This.prop.Value)
    //  await This.interactiveChange()
    //  This.valid()

  }
  return true
}




const toggleClick = async () => {
  if (!toggle.value)
    await This.when()
  if (!This.prop.ReadOnly)
    toggle.value = !toggle.value

  comboStyle.zIndex = toggle.value ? zIndex + 2 : zIndex
}
////////////////////////////////////////////////////////////////////
// KeyPress
// Descripcion: Cada tecla que se presiona en el input
/////////////////////////////////////////////////////////////////

const keyPress = ($event) => {

  if (ShowError.value)
    ShowError.value = false

  if (!ToolTipText.value)
    ToolTipText.value = false
  if ($event.charCode == 13) {

    //console.log('Enter keyPress=', $event.charCode)

    //$event.charCode = 9
    // window.event.keyCode = 9;
    //const next = $event.currentTarget.nextElementSibling;
    //$event.target.parentElement.nextSibling.children[1].focus()
    //next.focus();
    // emit('tab')
    emit('customChange', $event.target.value + String.fromCharCode(9))
    return

  }
  //console.log('comboBox Name=',This.Name,'Key=',$event.charCode)

  if ($event.charCode == 32) {
    inputBuffer = ''
    toggle.value = true

  }

  let Key: string = String.fromCharCode($event.charCode)
  Key = Key.toUpperCase()
  const buffer = inputBuffer + Key
  let found = false
  let pos = 0
  // Busca el valor donde estaba
  for (let j = 0; j < columnas.length && !found; j++) {
    if (displayText.value == columnas[j].text[0]) {
      pos = j
      found = true
    }
  }
  found = false
  for (let i = pos; i < columnas.length && !found; i++) {
    let valor = typeof columnas[i].text[0] == 'number' ? columnas[i].text[0].toString() : columnas[i].text[0]
    valor = valor.toUpperCase().slice(0, buffer.length)



    if (buffer == valor) {
      displayText.value = typeof columnas[i]['text'][0] == 'string' ? columnas[i]['text'][0].trim() : columnas[i]['text'][0]  // asigna el resultado a mostrar

      Value.value = columnas[i].value
      found = true
      inputBuffer = buffer
    }
  }
  if (!found)
    displayText.value = typeof columnas[0]['text'][0] == 'string' ? columnas[0]['text'][0].trim() : columnas[0]['text'][0]  // asigna el resultado a mostrar

}


/////////////////////////////////////////////////////////////////////
// focusOut
// Descripcion: Cuando pierda el foco el componente , actualizamo el valor en cursor local
/////////////////////////////////////////////////////////////////
const focusOut = async () => {
  emitValue()
  return
};




/////////////////////////////////////////////////////////////////////
// Valid
// Descripcion: Cuando se cambie el valor del componente template (Value.value con el teclado),
//              tenemos que emitir hacia el padre el valor capturado (Value.value) y ejecutar el update
/////////////////////////////////////////////////////////////////
const validClick = async (num_ren: number) => {
  toggle.value = false
  comboStyle.zIndex = zIndex

  Value.value = columnas[num_ren].value  // columnas tiene dos campos value y text
  //  console.log('ComboBox validClick',This.prop.Name,'num_ren=',num_ren,'Value=',Value.value )

  emitValue()
  return

};

/////////////////////////////////////////////////////////////////////
// ValidList
// Descripcion: Cuando se cambie el valor del componente template (Value.value con el teclado),
//              tenemos que emitir hacia el padre el valor capturado (Value.value) y ejecutar el update
/////////////////////////////////////////////////////////////////
const validList = async () => {
  toggle.value = false
  // if (!toggle.value) return

  for (let i = 0; i < List.value.length; i++) {
    if (i == 0)
      Value.value = ''
    else
      Value.value = Value.value + ','

    Value.value = Value.value + List.value[i]
  }
  emitValue()

  return

};

/////////////////////////////////////////////////////////////////////
// onFocus
// Descripcion: Cuando se cambie el valor del componente template (Value.value con el teclado),
//              tenemos que emitir hacia el padre el valor capturado (Value.value) y ejecutar el update
/////////////////////////////////////////////////////////////////
const onFocus = async () => {
  if (!props.prop.Valid) {    // = false; // old revisar si se necesita
    //   Valid.value = true

    //    if (props.Recno > 0) {
    if (Recno.value > 0) {

      const data = await This.Form.db.readCampo(props.prop.ControlSource, Recno.value, 'Old')
      let valor = ''

      for (const campo in data) {
        if (campo != 'key_pri')
          valor = data[campo]
      }

      if (props.prop.MultiSelect) { // Si es multi seleccion generaramos el arreglo
        console.log('Multiselect comboBox prop.Name=', props.prop.Name, 'valor=', valor)
        List.value = eval('[' + valor.trim() + ']')
        This.prop.Value = Value.value
        emit("update:Value", Value.value)

      }
      else {
        Value.value = valor
        This.prop.Value = Value.value
        emit("update:Value", Value.value)
      }
    }
    Valid.value = true
  }
  //ReadOnly.value=await !This.when()
  //console.log('Onfocus comboBox prop.Name=', props.prop.Name, 'Value=', Value.value)

  emit("update:Valid", true)

  if (!This.prop.First && !This.prop.Focus)
    return

  This.prop.Focus = false
  This.prop.First = false
  ShowError.value = false

  //const element = document.getElementById(Id);

  if (document.activeElement != thisElement) {
    // Ref.value.focus();
    // Ref.value.select();

    thisElement.focus({ focusVisible: true });
    thisElement.select();

  }
  setTimeout(function () {
    thisElement.focus({ focusVisible: true });
    thisElement.select();

  }, 0);

}



//////////////////////////////////////////////////////
// Renderizado del combo box
/////////////////////////////////////////////////////
const renderComboBox = async (readData?: boolean) => {
  //console.log('1) render combobox ===>>', This.Name, 'Value=', Value.value)
  // if (props.prop.Status == 'I') return



  // 9/Feb/2024 borra las columnas si las tiene 
  while (columnas.length > 0) {
    columnas.pop()
  }
  /*
  for (let ren = 0; ren < columnas.length; ren++) {
    // Borra todos los renglones
    delete columnas[ren];
  }
  */


  if (props.prop.RowSourceType < 1) return
  if (props.prop.ColumnCount == 0) return
  if (!props.prop.RowSource || !props.prop.RowSource.length || props.prop.RowSource.length < 1) return;

  ColumnWidth(props.prop.ColumnWidths) // asigna tamaño de columnas

  //console.log('ComboBox renderiza  ===>>', props.Name,props.prop.Status)

  const BoundColumn =
    (!props.prop.BoundColumn ? 1 : props.prop.BoundColumn) - 1;

  // Numero de columnas
  const ColumnCount = !props.prop.ColumnCount ? 1 : props.prop.ColumnCount;
  /*  9/Feb/2024 se quito y se mando arriba
    for (let ren = 0; ren < columnas.length; ren++) {
      // Borra todos los renglones
      delete columnas[ren];
    }
   */


  ///////////////////////
  // generamos un arreglo dependiendo del RowSourceType

  let val_col: any = [];  // valores de columna
  let RowSource = props.prop.RowSource

  const rowSourceType = props.prop.RowSourceType;

  // console.log('ComboBox renderiza ', props.prop.Name, ' RowSource ===>>', RowSource, 'rowSourceType=', rowSourceType)

  //const sql = props.db
  let data = []
  switch (rowSourceType) {

    case 1:    // Value o por valor directamente 

      {
        RowSource = "'" + props.prop.RowSource + "'"
        RowSource = RowSource.replaceAll(',', "','");
        //let pos=0;
        //pos= props.prop.RowSource.indexOf() // similar at VFP

        const Values = eval("[" + RowSource + "]"); // por medio del eval generamos el arreglo
        if (props.prop.ColumnCount == 1) {  // si solo tiene una columna
          val_col = Values;
        } else {  // Si tiene mas de una columna
          let ren = 0; // renglon
          let ele = 0; // numero de elemento
          while (ele < Values.length) {
            // recorremos todos los elementos
            for (
              let col = 0;
              col < props.prop.ColumnCount;
              col++ // recorre columna por columna
            ) {
              val_col[ren][col] = Values[ele];
              ele++; // incrementamos el elemento
            }
          }
          ren++; // incrementamos el renglon
        }
        break;
      }

    case 2: { // Alias
      const pos = RowSource.indexOf(".") // posicion del punto

      // Obtenemos el alias
      const alias = (pos > 2) ? RowSource.slice(0, pos) : ''

      // aqui me quede (arreglar lectura por alias)
      const ins_sql = 'select ' + RowSource + ' from ' + alias
      data = await This.Form.db.localSql(ins_sql)
      // console.log('comboBox data ===>', ins_sql, data)

      break
    }
    case 3: {   // SQL Server Query
      data = await This.Form.db.execute(RowSource, 'MEMVAR')

      break
    }
    case 4: { // local SQL Query

      data = await This.Form.db.localAlaSql(RowSource)
      break
    }
    case 5: {
      // Array , solo copiamos el arreglo
      val_col = RowSource;

      break;
    }
    case 6: {
      // Field
      break;
    }
  }

  //    if (data[0]) {
  if ((rowSourceType >= 2 && rowSourceType <= 4)) {
    if (data.length == 0) {
      console.warn('1) No data to render in ComboBox Name=', This.prop.Name, 'RowSource=', RowSource, ' RowSourceType=', props.prop.RowSourceType)
      return
    }

    for (const nom_obj in data[0]) {
      const renglon = []
      for (let ren = 0; ren < data.length; ren++) {
        renglon.push(data[ren][nom_obj])
      }
      val_col.push(renglon)
    }
  }


  // }
  // else
  //  console.warn('2) No data to render in ComboBox Name=', This.prop.Name, 'RowSource=', props.prop.RowSource, ' RowSourceType=', props.prop.RowSourceType)


  if (val_col.length == 0) {
    console.warn('2) No data to render in ComboBox Name=', This.prop.Name, 'RowSource=', props.prop.RowSource, ' RowSourceType=', props.prop.RowSourceType)
    return
  }


  for (let ren = 0; ren < (props.prop.ColumnCount <= 1 ? val_col.length : val_col[0].length); ren++) {
    // asignamos el Value del BoundColum 
    if (props.prop.ColumnCount <= 1) { // Si solo es una columna

      columnas[ren] = {
        value: val_col[ren],
        text: [val_col[ren]],
      };
    } else {

      columnas[ren] = {  // asignamos el valor segun el BoundColumn
        value: val_col[BoundColumn][ren], // asignamos el valor segun BoundCoulumn
        text: [],   // un arreglo vacio y se llenara con el numero de columnas del resultado
      };
      // console.log("Antes de Asigna option columnCount ===>",props.prop.ColumnCount);
      for (let col = 0; col < props.prop.ColumnCount; col++) { // recorremos todas las columnas
        //console.log("Asigna option ===>",props.prop.RowSource,ren,col);

        columnas[ren].text[col] = val_col[col][ren]; // asignamos los valore text de todas las demas columnas
        // console.log("Asigna option ===>",ren,col.props.prop.RowSource[col][ren]);
      }

    }
  }

  //console.log('2) render combobox ===>>', This.Name, 'Value=', Value.value)

  await emitValue(true, true)
  This.prop.Status = 'A'
  Status.value = 'A'
  emit("update:Status", 'A'); // actualiza el valor Status en el componente padre
  //console.log('3) render combobox ===>>', This.Name, 'Value=', Value.value)
  return

}

//ColumWidth
const ColumnWidth = (columnas: string) => {
  columnas = "['" + columnas.replaceAll(",", "','") + "']"


  let columnWidth = []
  eval('columnWidth=' + columnas)

  for (let col = 0; col < columnWidth.length; col++) {
    width[col] = columnWidth[col];
  }

}

////////////////////////////////////////////////////////////////
//                          Watchers                          //
////////////////////////////////////////////////////////////////

////////////////////////////////////////
// This.prop.Visible 
///////////////////////////////////////
watch(
  () => This.prop.Visible,
  (new_val, old_val) => {
    //console.log('watch This.prop.Visible =', new_val)
    if (!new_val)
      comboStyle.height = '0%'
    else
      comboStyle.height = This.style.height
    //readCampo(props.Registro)

  },
  { deep: false }
);


////////////////////////////////////////
// Registro
// Nota: Lee de la base de datos local segun el valor de Registro
//       Se utiliza para el manejo de grid
///////////////////////////////////////
watch(
  () => props.Registro,
  async (new_val, old_val) => {
    if (new_val != old_val) {
      //console.log('ComboBox Watch Registro Name=', This.prop.Name, 'new_val =', new_val, old_val)
      emitValue(true, true)
      This.Recno = props.Registro
    }
  },
  { deep: false }
);


////////////////////////////////////////
// watch Valid
///////////////////////////////////////
watch(
  () => props.prop.Valid,
  (new_val, old_val) => {
    if (!props.prop.Valid) ShowError.value = true
  },
  { deep: false }
);

////////////////////////////////////////
// Hacer el set focus 
///////////////////////////////////////
/* watch(
  () => Focus.value,
  (new_val, old_val) => {
    if (!Focus.value) return
    //    console.log('ComboBox Set Focus', props.Name)
    if (Focus.value) {
      //      Ref.value.focus()
      //Ref.value.select()
      Focus.value = false
      emit("update:Focus", false)
    }
  },
  { deep: false }
);
*/
watch(
  () => This.prop.Focus, //props.prop.Focus,
  (new_val: any, old_val: any) => {
    if (!new_val) {
      return
    }
    This.prop.Focus = false
    onFocus()
    return

  },
  { deep: false }
)

////////////////////////////////////////
// Da click para renderizar 
///////////////////////////////////////

watch(
  () => toggle.value,
  (new_val, old_val) => {
    if (new_val)
      divStyle.zIndex = props.style.zIndex + 1
    else
      divStyle.zIndex = props.style.zIndex


    // console.log('toggle.value', props.Name, old_val, new_val)
    if (!old_val && new_val) onFocus()
  },
  { deep: false }
);

/////////////////////////////////////////////////////////
// watch Value
//////////////////////////////////////////

// Si se cambia de afuera
watch(
  () => This.prop.Value, //This.prop.Value, //props.prop.Value, //Value.value,
  async (new_val, old_val) => {

    //    console.log('ComboBox Watch Value Name=', This.prop.Name, 'Value=', Value.value, 'New=', new_val, 'Old=', old_val)

    if (new_val != Value.value) {
      Value.value = This.prop.Value
      emitValue(false, This.prop.Valid)
    }
  },
  { deep: true }
)


///////////////////////////////////////
// ControlSource
///////////////////////////////////////
watch(
  () => props.prop.ControlSource,
  (new_val, old_val) => {

    if (new_val != old_val) {
      emitValue(true, true)
    }

  },
  { deep: false }
);

///////////////////////////////////////
// RowSoure
///////////////////////////////////////
watch(
  () => props.prop.RowSource,
  (new_val, old_val) => {

    if (new_val != old_val) {
      renderComboBox(true)
    }
  },
  { deep: true }
);

///////////////////////////////////////
// RowSourceType
///////////////////////////////////////

watch(
  () => props.prop.RowSourceType,

  (new_val, old_val) => {
    // if (props.prop.RowSourceType < 1 || props.prop.RowSource.length < 2) return

    // console.log('ComboBox RowSourceType===>>', new_val)
    if (new_val != old_val) {
      //console.log('ComboBox renderiza por cambio enRowSourceType ===>>', new_val)
      renderComboBox(true)
    }
  },
  { deep: false }
);
///////////////////////////////////////
// Sorted
///////////////////////////////////////


watch(
  () => props.prop.Sorted,

  (new_val, old_val) => {
    if (new_val != old_val) {
      //console.log('ComboBox renderiza por cambio en Sorted ===>>', new_val)
      renderComboBox(true);
    }
  },
  { deep: false }
);

///////////////////////////////////////
// ColumCount
///////////////////////////////////////

watch(
  () => props.prop.ColumnCount,

  (new_val, old_val) => {
    if (new_val != old_val) {
      // console.log('ComboBox renderiza por cambio en ColumnCount ===>>', new_val)
      renderComboBox(true);
    }
  },
  { deep: false }
);

///////////////////////////////////////
// ColumnWidths
///////////////////////////////////////
watch(
  () => props.prop.ColumnWidths,

  (new_val, old_val) => {
    // console.log('Watch ColumnWidths', new_val)

    if (new_val != old_val) {
      ColumnWidth(new_val)
    }

  },
  { deep: false }
);

///////////////////////////////////////
// BoundColum
///////////////////////////////////////
watch(
  () => props.prop.BoundColumn,

  (new_val, old_val) => {
    if (new_val != old_val) {
      renderComboBox(true);
    }
  },
  { deep: false }
);

///////////////////////////////////////
//width
///////////////////////////////////////

watch(
  () => props.style.width,

  (new_val, old_val) => {
    // console.log("Cambio tamaÃ±o ", inputWidth.value);
    if (new_val != old_val) {
      if (props.style.width.substr(-2, 2) == 'px') {
        const len = props.style.width.length - 2
        const width: number = +props.style.width.substr(0, len) - 30
        inputWidth.value = width.toString() + 'px'
        //console.log("Cambio tamaÃ±o 2", inputWidth.value);
      }


    }
  },
  { deep: false }
);

/////////////////////////////////////////
// Metodo init 
/////////////////////////////////////////

//const init = async () => {
onMounted(async () => {
  console.log('comboBox onMounted', This.prop.Init)


  thisElement = document.getElementById(Id)


  // textInputStyle.zIndex = zIndex

  if (This.prop.Init) {


    inputStyle.height = 'fit-content'

    let textWidth = 0

    if (inputStyle.width.search("px") > 0) {
      textWidth = +inputStyle.width.replaceAll('px', '') - 30
      inputStyle.width = textWidth.toString() + 'px'

    }
    if (inputStyle.width.search("%") > 0) {
      textWidth = +inputStyle.width.replaceAll('%', '') - 5
      inputStyle.width = textWidth.toString() + '%'
    }

    if (props.prop.Type == 'date') {
      inputStyle.width = '100px'
      inputStyle.height = '20px'
      inputStyle.maxHeight = '20px'
    }
    if (props.prop.Type == 'number')
      inputStyle.textAlign = 'right'

    if (!This.prop.Visible) {
      comboStyle.height = '0%'
      //console.log('comboStyle Visible', comboStyle.height)
    }

  }
  console.log('init comboBox Name=', props.prop.Name, 'Value=', This.prop.Value, 'displayText=', displayText.value)

  const result = await renderComboBox()

  This.Recno = props.Registro



  //oldVal = Value.value   // asignamos el valor viejo
  // si es el primer elemento a posicionarse
  // si es el primer elemento a posicionarse
  if (props.prop.First || props.prop.Focus) {
    onFocus()

  }
  This.prop.Init = false
})

/*
onMounted(() => {
  
  init() // Ejecuta el init
});
*/

onUnmounted(() => {
  window.removeEventListener('mousedown', myClick); // <div>
})

/////////////////////////////////////////////////////////////////////
// Focus Out
// Se do click fuera focusOut click
// checar canvas.removeEventListener
//////////////////////////////////////////////////////////////////////

function myClick(e) {
  // console.log('myClick ComboBox focus in and out ',e.target)
  // to remove
  if (This.prop.Disabled || !This.prop.Visible || !toggle.value)
    return
  const clickedEl = e.target;
  if (RefCombo && RefCombo.value != null)
    if (!RefCombo.value.contains(clickedEl)) {
      if (toggle.value)
        toggle.value = false
      // console.log(This.prop.Name,'ComboBox focus  out ',toggle.value)
    }

}


window.addEventListener('mousedown', myClick);

</script>



<style scoped>
/*  elemento click check*/
img.imagen {
  width: 17px;
  height: auto;
  border-radius: 20%;
  border: 2px;
  vertical-align: bottom;
  border-style: solid;
  border-color: black;
  margin-left: -2px;
  background: #76a184;

  /* margin-bottom: 5px;
  margin-top: 5px;
  margin-left: 5px;
  margin-right: 5px;*/
}


.multiSelect {

  /* z-index: 2;*/
  border-radius: 5px;
  border: 1px;

}


div.comboBox {
  display: flex;
  /* order: 1px solid rgb(0, 5, 2);
  border-radius: 5px; */

}


div.textInput {
  display: flex;
  order: 1px solid rgb(0, 5, 2);
  border-radius: 3px;
  /* z-index: v-bind('comboZIndex'); */

}


input.input {
  background-color: initial;
  order: 1px solid rgb(0, 5, 2);
  border-radius: 5px;
}


input.label {
  width: v-bind("inputWidth");
  border: 1px solid rgb(0, 5, 2);
  border-radius: 5px;
  background: white;
  color: black;
  position: relative;
  /* z-index: 10;*/
}

/* Cambia el background cuando solo es de lectura */
input.label.ReadOnly {
  background: rgb(212, 212, 212);
  /* disabled color */

  /* visibility: visible;
  opacity: 1;*/
}

/*input.label:disabled {
    color: black;
    background : white;
     
}
*/
div.toggle {
  position: absolute;
  /* no borrar se utiliza junto con div.option position:relative*/
  border: 1px solid rgb(0, 5, 2);
  border-radius: 2%;
  overflow: hidden;
  height: 700%;
  overflow-y: auto;
  width: 110%;
  height: auto;
  top: 20px;
  left: -5%;
  z-index: v-bind('toggleZIndex');
}

/* css de la lista de combo box*/
div.option {
  box-shadow: 0 4px 8px 0, 0 6px 20px 0;
  cursor: pointer;
  display: flex;
  justifyContent: space-around;
  position: relative;
  /* no borrar se utiliza junto con div.toggle position:absolute*/
  /* border: 1px solid rgb(0, 5, 2);*/
  padding: 5px 10px;
  /* espacio top left right booton ,vertical horizontal */

  background: #e3e6e4;
  color: #292b2a;
  /* #0b0c0c negro;   #7a18e9; morado*/
  /*este es el color que toman los elementos desplegados**/
  /*display: table-row;   /*list-item;  /* inline-block;

 /* margin-left: -60px; */
  /* bottom: 125%;
 /* left: 50%;
  margin-left: -60px;*/
  opacity: 1;
  /* z-index: v-bind("props.style.zIndex" ); */
  /* v-bind('zIndex') la capa en la cual se presenta donde 0 la mas abajo */
  right: 0%;
  min-width: 100%;
  max-width: 100%;
  width: 100%;
  z-index: v-bind('toggleZIndex')
    /* transition: opacity 0.3s;*/
}

div.option:hover {
  background: rgb(231, 238, 231);
}

select[multiple]:focus option:checked {
  background: rgb(163, 193, 168) linear-gradient(0deg, rgb(163, 193, 168) 0%, rgb(163, 193, 168) 100%);
}



/*div class='column'*/
</style>
