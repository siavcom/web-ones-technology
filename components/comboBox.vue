<template>
  <!--div v-if="prop.MultiSelect">Selected: {{ List }}</div-->
  <!--Se necesita el siguiente div para que funcione el siguiente v-show-->

  <div class="divi" :style="divStyle" v-show="This.prop.Visible">
    <!--Etiqueta del componente -->
    <div class="mensajes" v-show="This.prop.Visible">
      <span class="etiqueta" v-if="prop.textLabel.length > 0">{{ prop.textLabel + " " }}</span>
      <!--List Box -->
      <div v-if="prop.MultiSelect" class="multiSelect" @lostFocus="validList()" :style='prop.componentStyle'>
        <select v-model="List" multiple>
          <option class="option" v-for="(option, valueIndex) in columnas" :key="valueIndex"
            :value="columnas[valueIndex].value">
            <!--Imprime Columnas -->
            <!--div class="columna"  v-for="(text, col) in option.text" :key="col"
            -->
            <input v-for="(text, col) in option.text" :key="col" :style="{ 'width': width[col], 'text-align': 'left' }"
              class="input" :value="text" :disabled="prop.Disabled" :readonly="prop.ReadOnly" />
            <!--/div-->
          </option>
        </select>

      </div>

      <!--ComboBox 
        <input class="textLabel" :readonly="prop.Style == 2 || prop.ReadOnly" ref="Ref" type="text" :v-model="displayText"
          @focusout="focusOut" />{{ displayText }}
      -->
      <div v-else class="comboBox" :style='prop.componentStyle' ref="RefCombo">

        <input class="textLabel" :style="TextLabel" :readonly="prop.Style == 2 || prop.ReadOnly" :value="displayText"
          :tabindex="prop.TabIndex" ref="Ref" @keypress="keyPress($event)"
          @focus.prevent="toggle = false; inputBufferBuffer = ''" @focusout="emitValue()" />

        <!--span> {{ prop.Value }}</span-->
        <!--Valor seleccionado click-->
        <div class="toggle" v-if="toggle && !prop.ReadOnly">
          <!--CheckBox -->
          <div class="columContainer" @focusout="toggle = !toggle" :style="columnContainer">
            <div class="option" v-for="(option, valueIndex) in columnas" :key="valueIndex" @mouseover="hover = true"
              @mouseleave="hover = false" @click.stop="validClick(valueIndex)" :disabled="prop.ReadOnly">
              <!--Imprime Columnas -->

              <div class="columna" :disabled="prop.ReadOnly" v-for="(text, col) in option.text" :key="col"
                :style="{ 'width': width[col], 'text-align': 'left', 'z-index': toggleZIndex }">
                <label class="optionLabel" v-text="text" :style:="labelStyle" />
              </div>
            </div>
          </div>
        </div>
        <!--toggle click.prevent -->
        <img class="imagen" v-show="!prop.ReadOnly"
          :src="toggle ? '/Iconos/svg/bx-left-arrow.svg' : '/Iconos/svg/bx-down-arrow.svg'" @click="toggleClick" />
      </div>
      <span class="tooltiptext" v-if="prop.ToolTipText.length > 0" v-show="ToolTipText && prop.Valid"
        style="zIndex:zIndex+10">{{ prop.ToolTipText }}</span>
      <span class="errorText" @focus.prevent="onFocus" v-show="!prop.Valid && ShowError">{{ prop.ErrorMessage }}</span>
    </div>
    <span v-if="prop.ShowValue">{{ prop.Value }}</span>
  </div>
</template>

<script setup lang="ts">

const emit = defineEmits(["update", "update:Value", "update:Valid", "update:Status", "update:Key", "update:Focus", "update:displayText"]) //, "update:Ref", "update:Recno",
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
  prop: {
    This: null,
    Name: "",
    textLabel: "",
    ToolTipText: "",
    Value: "",
    ControlSource: "",
    Placeholder: "",
    Format: "",
    InputMask: "",
    MaxLength: 0,
    ReadOnly: false,
    Disabled: false,
    Tag: "",
    Valid: false,
    Capture: true,
    Type: "text",
    Visible: true,
    RowSource: "", // vi_cap_doc.tdo_tdo,des_tdo
    RowSourceType: 0, //1-Value, 2-Alias, 3-SQL Server,4- Local SQL, 5-Array
    ColumnCount: 0,
    ColumnWidths: "", //"75%,25%"
    Sorted: false,
    BoundColumn: 1, // Columna donde se tomara el Value
    //Multiple: false,
    Status: "",
    ErrorMessage: "",
    ShowError: false,
    ShowValue: false,
    TabIndex: 0,
    BaseClass: "ComboBox",
    Style: 0, //0=DropDown Combo 2=DropDown List
    Focus: false,
    First: false,
    MultiSelect: false,
    List: [],

    componentStyle: {
      background: "white",
      padding: "5px",
      color: "#b94295",
      width: "auto",
      height: "30px",
      fontFamily: "Arial",
      fontSize: "13px",
      textAlign: "left",
    },

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

const columnas = reactive([{}]); // tiene todos los renglones del comboBox
const displayText = ref("");
//const width = reactive([{}]);
const width = reactive(['60%', '20%', '20%']);

//const ReadOnly = ref(props.prop.ReadOnly)
const Ref = ref(null)
const RefCombo = ref(null)

const Status = ref(props.prop.Status);
Status.value = 'I'
const toggle = ref(false)
const hover = ref(false)
const Focus = ref(props.prop.Focus)
//const First = ref(props.prop.First)

const ShowError = ref(false)
Focus.value = false

const divStyle = reactive(props.style)
const zIndex = divStyle.zIndex
divStyle.zIndex = zIndex + 2

const toggleZIndex = divStyle.zIndex + 1

const inputWidth = ref('auto')
const labelStyle = ref({
  width: inputWidth.value,
  border: "1px solid rgb(0, 5, 2)",
  borderRadius: "5px",
  background: "white",
  color: "black",
  position: "relative",
  zIndex: toggleZIndex
})


const List = ref(props.prop.List)
const columnContainer = reactive({
  width: 'auto',
  height: 'auto',
  maxHeight: '200px',
  zIndex: toggleZIndex
})

let inputBuffer = ''


const TextLabel = ref({})
if (props.prop.textLabel.length > 0) {
  TextLabel.value = props.prop.componentStyle
} else {
  TextLabel.value = props.style


  //TextLabel.width = props.style.width
  TextLabel.value.height = 'fit-content'

  let medida = ''

  if (TextLabel.value.width.search("px") > 0)
    medida = 'px'
  if (TextLabel.value.width.search("%") > 0)
    medida = '%'

  let textWidth = +TextLabel.value.width.replaceAll(medida, '') - 30
  TextLabel.value.width = textWidth.toString() + medida
}

/////////////////////////////////////////////////////////////////////
// emitValue
// Descripcion: emite hacia el componente padre el nuevo valor asignado
/////////////////////////////////////////////////////////////////
const emitValue = async (readCam?: boolean, isValid?: boolean) => {

  toggle.value = false
  This.prop.Status = 'P'
  let readValid = false

  Status.value = 'P'
  emit("update:Status", 'P'); // actualiza el valor Status en el componente padre

  if (!readCam) {  // Graba en AlaSql , el dato se cambio desde fuera 
    // Si no viene del watch This.prop.Value
    let Valor = Value.value

    // console.log('comboBox emitValue writeCampo ', props.Registro, props.prop.ControlSource, '!isValid=', isValid, 'Value=', Value.value)

    if (props.Registro > 0 && props.prop.ControlSource && props.prop.ControlSource.length > 2) {
      await This.Form.db.updateCampo(Valor, props.prop.ControlSource, props.Registro)
      Value.value = Valor
    }
    // actualiza el valor Value en el componente padre para interactive change tenga el valor This.prop.Value

    emit("update:Value", Value.value);
    await This.interactiveChange()

    if (!isValid) {
      inputBuffer = ''
      This.prop.Valid = false
      if (await This.valid() == false) {
        // console.log('1) !Valid editText emitValue() Name', props.prop.Name, 'This.valid= false')
        ShowError.value = true
        if (This.prop.Valid)
          This.prop.Valid = false
        Ref.value.select()
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
        if (campo != 'key_pri') {
          sw_dat = true

          if (props.Registro && This.Recno != props.Registro)
            This.Recno = props.Registro


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

  /////////////////////////////////////////
  //nextTick(function () {
  //emit("update:formatValue", currentValue.value[0]); // actualiza el valor Value en el componente padre

  //  console.log('2 comboBox emitValue() Name', props.prop.Name, 'This.prop.Value=', This.prop.Value)

  //const result = await asignaResultado(Value.value)
  //////------------------- Asigna Resultado

  //console.log('comboBox Name=',This.Name,'Value.value=',Value.value,' columns=====>>>',columnas)
  let found = false
  for (let i = 0; i < columnas.length && !found; i++) {
    //    console.log('comboBox Name=',This.Name,'i=',i, 'columnas=',columnas[i].value,'Value=',Value.value)
    if ((typeof columnas[i].value == 'number' && Value.value == columnas[i].value) ||
      (!(typeof columnas[i].value == 'number') && Value.value.trim() == columnas[i].value.trim())) { // El objeto columna tiene dos campos value y text
      displayText.value = columnas[i]['text'][0]  // asigna el resultado a mostrar
      found = true
    }

  }
  if (!found) { // No se encontro el valor , asignara el primer valor
    Value.value = columnas[0].value
    displayText.value = columnas[0]['text'][0]
  }
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
    console.log('comboBox emitValue valid() Name', props.prop.Name, 'This.prop.Value=', This.prop.Value)
    This.interactiveChange()
    This.valid()

  }


  Status.value = 'A'  // se necesita para que el watch padre funcione
  emit("update:Status", 'A'); // actualiza el valor Status en el componente padre


  return true
}
const toggleClick = async () => {
  if (!toggle.value)
    await This.when()
  if (!This.prop.ReadOnly)
    toggle.value = !toggle.value

  divStyle.zIndex = toggle.value ? zIndex + 2 : zIndex
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
      displayText.value = columnas[i]['text'][0]  // asigna el resultado a mostrar
      Value.value = columnas[i].value
      found = true
      inputBuffer = buffer
    }
  }
  if (!found)
    displayText.value = columnas[0]['text'][0]  // asigna el resultado a mostrar

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
// Focus Out
// Se do click fuera focusOut click
// checar canvas.removeEventListener
//////////////////////////////////////////////////////////////////////

function myClick(e) {
  // console.log('myClick ComboBox focus in and out ',e.target)
  // to remove
  if (This.prop.Disabled || !This.prop.Visible)
    return

  const clickedEl = e.target;
  if (RefCombo && RefCombo.value != null)
    if (!RefCombo.value.contains(clickedEl)) {
      toggle.value = false
      // console.log(This.prop.Name,'ComboBox focus  out ',toggle.value)
    }

}

window.addEventListener('mousedown', myClick);

onUnmounted(() => {
  window.removeEventListener('mousedown', myClick); // <div>
})


/////////////////////////////////////////////////////////////////////
// Valid
// Descripcion: Cuando se cambie el valor del componente template (Value.value con el teclado),
//              tenemos que emitir hacia el padre el valor capturado (Value.value) y ejecutar el update
/////////////////////////////////////////////////////////////////
const validClick = async (num_ren: number) => {
  toggle.value = false
  divStyle.zIndex = zIndex

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
  ToolTipText.value = false
  ShowError.value = false
  if (!props.prop.Valid) {    // = false; // old revisar si se necesita
    //   Valid.value = true

    //    if (props.Recno > 0) {
    if (Recno.value > 0) {

      if (Status.value != 'P') { // actualiza su estatus a proceso
        Status.value = 'P';  // en foco
        emit("update:Status", 'P'); // actualiza el valor Status en el componente padre. No se debe utilizar Status.Value
        emit("update")
      }
      const data = await This.Form.db.readCampo(props.prop.ControlSource, Recno.value, 'Old')
      let valor = ''
      let sw_key = false

      if (props.prop.MultiSelect) { // Si es multi selectccion generaramos el arreglo
        List.value = eval('[' + Value.value.trim() + ']')
        Value.value = data
        emit("update:Value", Value.value)
        Valid.value = true

      }
      else {


        for (const campo in data) {
          if (campo != 'key_pri')
            valor = data[campo]
          else sw_key = true
        }
        if (sw_key) {
          Value.value = valor
          emit("update:Value", Value.value)
        }
      }
      Valid.value = true
    }
    //ReadOnly.value=await !This.when()
    emit("update:Valid", true)
  }
}


//////////////////////////////////////////////////////
// Renderizado del combo box
/////////////////////////////////////////////////////
const renderComboBox = async (readData?: boolean) => {


  if (props.prop.RowSourceType < 1) return
  // if (props.prop.Status == 'I') return
  if (props.prop.ColumnCount == 0) return
  if (!props.prop.RowSource || !props.prop.RowSource.length || props.prop.RowSource.length < 1) return;
  //try {
  const RowSource: string = props.prop.RowSource
  const pos = RowSource.indexOf(".") // posicion del punto

  // Obtenemos el alias
  const alias = (pos > 2) ? RowSource.slice(0, pos) : ''

  ColumnWidth(props.prop.ColumnWidths) // asigna tamaño de columnas

  //console.log('ComboBox renderiza  ===>>', props.Name,props.prop.Status)

  const BoundColumn =
    (!props.prop.BoundColumn ? 1 : props.prop.BoundColumn) - 1;

  // Numero de columnas
  const ColumnCount = !props.prop.ColumnCount ? 1 : props.prop.ColumnCount;

  //console.log('Bound Column',!(props.prop.BoundColumn)) ;
  for (let ren = 0; ren < columnas.length; ren++) {
    // Borra todos los renglones
    delete columnas[ren];
  }
  ///////////////////////
  // generamos un arreglo dependiendo del RowSourceType

  let val_col: any = [];  // valores de columna
  const tip_rst = props.prop.RowSourceType;
  //const sql = props.db
  let data = []
  switch (tip_rst) {

    case 1:    // Value o por valor directamente 

      {
        let RowSource = "'" + props.prop.RowSource + "'"
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

      // aqui me quede (arreglar lectura por alias)
      const ins_sql = 'select ' + RowSource + ' from ' + alias
      data = await This.Form.db.localSql(ins_sql)
      // console.log('comboBox data ===>', ins_sql, data)

      break
    }
    case 3: {   // SQL Server Query
      data = await This.Form.db.execute(props.prop.RowSource, 'MEMVAR')
      if (data == null) {
        console.warn('comoBox Render', This.name, 'RowSource', props.prop.RowSource)
        return
      }
      break
    }
    case 4: { // local SQL Query
      data = await This.Form.db.localAlaSql(props.prop.RowSource)
      if (data == null) {
        console.warn('comoBox Render', This.name, 'RowSource', props.prop.RowSource)
        return
      }
      break
    }
    case 5: {
      // Array , solo copiamos el arreglo
      val_col = props.prop.RowSource;

      break;
    }
    case 6: {
      // Field
      break;
    }
  }
  if (data[0]) {
    if ((tip_rst == 2 || tip_rst == 3) && data.length > 0) {
      for (const nom_obj in data[0]) {
        const renglon = []
        for (let ren = 0; ren < data.length; ren++) {
          renglon.push(data[ren][nom_obj])
        }
        val_col.push(renglon)
      }
    }
  } else
    console.warn('ComboBox Name=', This.prop.Name, ' No data in ', This.prop.ControlSource)

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

  //console.log('render combobox ===>>', This.Name)

  emitValue(true)
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
    console.log('watch This.prop.Visible =', new_val)
    if (!new_val)
      divStyle.height = '0%'
    else
      divStyle.height = This.style.height
    //readCampo(props.Registro)

  },
  { deep: false }
);



////////////////////////////////////////
// ControlSource
///////////////////////////////////////
watch(
  () => props.prop.ControlSource, //props.prop.ControlSource,
  (new_val, old_val) => {
    if (new_val != old_val)
      emitValue(true)
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
      // console.log('EditText Watch Registro Name=', This.prop.Name,'new_val =', new_val, old_val)
      emitValue(true)
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
watch(
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


////////////////////////////////////////
// Da click para renderizar 
///////////////////////////////////////

watch(
  () => toggle.value,
  (new_val, old_val) => {

    // console.log('toggle.value', props.Name, old_val, new_val)
    if (new_val == true) onFocus()
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

    if (new_val != old_val) {
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
      emitValue(true)
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
    if (props.prop.RowSourceType < 1 || props.prop.RowSource.length < 2) return

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
    // console.log("Cambio tamaño ", inputWidth.value);
    if (new_val != old_val) {
      if (props.style.width.substr(-2, 2) == 'px') {
        const len = props.style.width.length - 2
        const width: number = +props.style.width.substr(0, len) - 30
        inputWidth.value = width.toString() + 'px'
        //console.log("Cambio tamaño 2", inputWidth.value);
      }


    }
  },
  { deep: false }
);

/////////////////////////////////////////
// Metodo init 
/////////////////////////////////////////

const init = async () => {

  if (props.prop.Type == 'date') {
    componentStyle.width = '100px'
    componentStyle.height = '20px'
    componentStyle.maxHeight = '20px'
  }
  if (props.prop.Type == 'number')
    componentStyle.textAlign = 'right'

  if (!This.prop.Visible) {
    divStyle.height = '0%'
    console.log('divStyle Visible', divStyle.height)
  }

  const result = await renderComboBox()
  //const result = await emitValue(true)


  //console.log('init comboBox Name=', props.prop.Name, 'Value=', This.prop.Value, 'displayText=', displayText.value)


  //oldVal = Value.value   // asignamos el valor viejo
  // si es el primer elemento a posicionarse
  if (props.prop.First) {

    This.prop.First = false
    if (Ref.value != null) {
      Ref.value.select() // Hace foco con select
      console.log('First init comboBox Name=', props.prop.Name, 'Value=', Value.value)

    }
    //Ref.value.focus()  // hace el foco como primer elemento

  }
}

init();
</script>



<style scoped >
/*  elemento click check*/
img.imagen {
  width: 19px;
  height: 18px;
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
  order: 1px solid rgb(0, 5, 2);
  border-radius: 5px;
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

<!-- 
list box 

<script>
export default {
  data() {
    return {
      selected: 'A',
      options: [
        { text: 'One', value: 'A' },
        { text: 'Two', value: 'B' },
        { text: 'Three', value: 'C' }
      ]
    }
  }
}
</script>

<template>
  <select v-model="selected" multiple>
    <option v-for="option in options" :value="option.value">
      <input style="width:50px;color:red; border-radius: 10px;background-color: #f2f4f5;" :value="option.text" /> 
      <input style="width:50px;color:red;" :value=" option.value "/>
    </option>
  </select>

	<div>Selected: {{ selected }}</div>
</template>



 -->
