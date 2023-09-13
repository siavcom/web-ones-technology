<template>
  <!--div v-if="prop.MultiSelect">Selected: {{ List }}</div-->
  <!--Se necesita el siguiente div para que funcione el siguiente v-show-->

  <div class="divi" :style="divStyle">
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
        <input class="textLabel" :readonly="prop.Style == 2 || prop.ReadOnly" ref="Ref" type="text" :v-model="Text"
          @focusout="focusOut" />{{ Text }}
      -->
      <div v-else class="comboBox" :style='prop.componentStyle'>

        <input class="textLabel" :style="TextLabel" :readonly="prop.Style == 2 || prop.ReadOnly" :value="Text"
          @focusout="focusOut" ref="Ref" />

        <!--span> {{ prop.Value }}</span-->
        <!--Valor seleccionado click-->
        <div class="toggle" v-if="toggle && !prop.ReadOnly">
          <!--CheckBox -->
          <div class="columContainer" @focusout="toggle = !toggle" :style="columnContainer">
            <div class="option" v-for="(option, valueIndex) in columnas" :key="valueIndex" @mouseover="hover = true"
              @mouseleave="hover = false" @click="valid(valueIndex)" :disabled="prop.ReadOnly">
              <!--Imprime Columnas -->

              <div class="columna" :disabled="prop.ReadOnly" v-for="(text, col) in option.text" :key="col"
                :style="{ 'width': width[col], 'text-align': 'left', 'z-index': toggleZIndex }">
                <label class="label" v-text="text" />
              </div>
            </div>
          </div>
        </div>
        <img class="imagen" v-show="!prop.ReadOnly"
          :src="toggle ? '/Iconos/svg/bx-left-arrow.svg' : '/Iconos/svg/bx-down-arrow.svg'"
          @click.prevent="toggle = prop.ReadOnly == false ? !toggle.value : toggle.value" :tabindex="prop.TabIndex" />
      </div>
      <span class="tooltiptext" v-if="prop.ToolTipText.length > 0" v-show="ToolTipText && prop.Valid">{{
        prop.ToolTipText
      }}</span>
      <span class="errorText" @focus.prevent="onFocus" v-show="!prop.Valid && ShowError">{{ prop.ErrorMessage }}</span>
    </div>
    <span v-if="prop.ShowValue">{{ prop.Value }}</span>
  </div>
</template>

<script setup lang="ts">

const emit = defineEmits(["update", "update:Value", "update:Valid", "update:Status", "update:Key", "update:Focus"]) //, "update:Ref", "update:Recno",
///////////////////////////////////////
// Variables comunes globales al componente
////////////////////////////////////

interface Props {
  //Recno: number;
  Registro: number;
  //Show: false;
  //Component: object;
  prop: {};
  style: {};
  position: {};
  //  db: any;
}


//const props = defineProps<{

const props = withDefaults(defineProps<Props>(), {

  /// columnas: any;
  // Value: string;
  // Recno: 0,
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
    RowSourceType: 0, //1-Value, 2-Alias, 3-SQL Server 5-Array
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




//const Component = ref(props.Component)

const Value = ref(props.prop.Value)
const Recno = ref(0)
const Valid = ref(props.prop.Valid)
Valid.value = true
const ToolTipText = ref(true)

const Component = ref(props.prop.This)
const This = Component.value

const columnas = reactive([{}]); // tiene todos los renglones del comboBox
const Text = ref("");
//const width = reactive([{}]);
const width = reactive(['60%', '20%', '20%']);

//const ReadOnly = ref(props.prop.ReadOnly)
const Ref = ref(null)

const Status = ref(props.prop.Status);
Status.value = 'I'
const toggle = ref(false)
const hover = ref(false)
const Focus = ref(props.prop.Focus)
const First = ref(props.prop.First)

const ShowError = ref(false)


Focus.value = false
const zIndex = ref(props.style.zIndex)

const comboZIndex = zIndex.value
const toggleZIndex = zIndex.value + 2
//zIndex.value = zIndex.value + 1
const inputWidth = ref('auto')
const List = ref(props.prop.List)
const columnContainer = reactive({
  width: 'auto',
  height: 'auto',
  maxHeight: '200px'
})
const divStyle = reactive(props.style)
divStyle.zIndex = props.style.zIndex + 1

//const TextLabel = reactive(props.prop.componentStyle)

const TextLabel=ref({})
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
//TextLabel.width = 'fit-content'

/*
const LabelStyle = reactive(props.style)

LabelStyle.width = props.prop.componentStyle.width

medida = ''

if (LabelStyle.width.search("px") > 0)
  medida = 'px'
if (LabelStyle.width.search("%") > 0)
  medida = '%'
*/
//textWidth = +TextStyle.width.replaceAll(medida, '') - 30
//LabelStyle.width = textWidth.toString() + medida




/////////////////////////////////////////////////////////////////////
// emitValue
// Descripcion: emite hacia el componente padre el nuavo valor asignado
/////////////////////////////////////////////////////////////////
const emitValue = async () => {
  Status.value = 'A'
  //console.log('ComboBox emit Value ====>', Value.value)
  Recno.value = props.Registro
  emit("update:Value", Value.value); // actualiza el valor Value en el componente padre
  emit("update:Status", 'A'); // actualiza el valor Status en el componente padre
  emit("update:Valid", Valid.value)
  // emit("update:Recno", props.Registro)
  emit("update") // emite un update en el componente padre
  //console.log('EditBox despuest emit Value ====>', props.prop.Value, props.prop.Status)
  return true;
};


/////////////////////////////////////////////////////////////////////
// focusOut
// Descripcion: Cuando pierda el foco el componente , actualizamo el valor en cursor local
/////////////////////////////////////////////////////////////////
const focusOut = async () => {

  await asignaResultado()

  const valor = Value.value;

  if (props.prop.ControlSource && props.prop.ControlSource.length > 3) {
    console.log('comboBox updateCampo', valor, props.prop.ControlSource, Recno.value)
    //    await This.Form.db.updateCampo(valor, props.prop.ControlSource, props.Recno)
    await This.Form.db.updateCampo(valor, props.prop.ControlSource, Recno.value)

  }
  ToolTipText.value = true  // Activamos el ToolTipText
  toggle.value = false
  console.log('ComboBox  focusOut===>', Value.value, Text.value)

  if (This.valid && await This.valid() == false)
    ShowError.value = true

  Status.value = 'A'  //Aqui me quede
  emit("update:Status", 'A')

  console.log('ComboBox Valid', This.Name, 'ShowError=', ShowError.value, 'Status=', This.prop.Status)



  return

};

/////////////////////////////////////////////////////////////////////
// Valid
// Descripcion: Cuando se cambie el valor del componente template (Value.value con el teclado),
//              tenemos que emitir hacia el padre el valor capturado (Value.value) y ejecutar el update
/////////////////////////////////////////////////////////////////
const valid = async (num_ren: number) => {
  toggle.value = false
  // if (!toggle.value) return
  //console.log('ComboBox  dio Click===>', columnas[num_ren].value)
  Value.value = columnas[num_ren].value  // columnas tiene dos campos value y text

  // emit("update:Value", columnas[num_ren].value); // actualiza el valor Value en el componente padre 
  // emit("update") // emite un update en el componente padre
  focusOut()


  // await emitValue()
  //Ref.value.select()

  //  Ref.value.focus()
  //  if(props.prop.Style==2) return
  //  Ref.value.select()
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
  asignaResultado()
  // await emitValue()
  //Ref.value.select()

  //  Ref.value.focus()
  //  if(props.prop.Style==2) return
  //  Ref.value.select()
  return
};

/////////////////////////////////////////////////////////////////////
// onFocus
// Descripcion: Cuando se cambie el valor del componente template (Value.value con el teclado),
//              tenemos que emitir hacia el padre el valor capturado (Value.value) y ejecutar el update
/////////////////////////////////////////////////////////////////
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
  /*
  if (props.prop.Type == 'number') {
      numberStr.value = Value.value;
      type.value = 'number';
    };
  */
}
//////////////////////////////////////////
// Lee el campo desde SQL Local
////////////////////////////////////////

const readCampo = async (recno: number) => {
  // if (Status.value == 'A') {
  //   Status.value = 'P'
  //   emit("update:Status", 'P'); // actualiza el valor Status en el componente padre. No se debe utilizar Status.Value
  // }

  if (recno != Recno.value) Recno.value = recno
  const data = await This.Form.db.readCampo(props.prop.ControlSource, Recno.value)
  if (Recno.value != recno) Recno.value = recno

  for (const campo in data) {
    if (campo != 'key_pri') Value.value = data[campo]
  }
  renderComboBox()
}

/////////////////////////////////////////
// Metodo onMounted
/////////////////////////////////////////
/*
const OnMounted = onMounted(() => {
  renderComboBox();
});
*/


//////////////////////////////////////////////////////
// Asigna Resultado
/////////////////////////////////////////////////////
const asignaResultado = (valor?: string) => {
  // console.log('ComboBox asignaResultado ',This.Name,props.prop.Value,VisualViewport    )

  if (props.prop.Status == 'I') return
  if (props.prop.ColumnCount == 0) return;
  if (props.prop.RowSourceType == 0) return;
  if (!props.prop.RowSource || props.prop.RowSource.length < 1) return
  if (columnas.length == 0) return
  if (columnas[0] == undefined) return

  const BoundColumn =
    (!props.prop.BoundColumn ? 1 : props.prop.BoundColumn) - 1; // Si no hay valor de columna donde asignar el valor
  // recorre todo los renglones en columnas


  if (!valor)
    valor = Value.value

  // if (valor) {
  if (typeof valor == 'string') {
    valor = valor.trim()
    if (valor == '')
      valor = columnas[0]['text'][0]  // asigna el primer Text valor
  }



  //console.log('ComboBox asignaResultado columnas ',This.Name,columnas[0],valor)
  for (let i = 0; i < columnas.length; i++) {

    if ((typeof columnas[i].value == 'number' && valor == columnas[i].value) ||
      (!(typeof columnas[i].value == 'number') && valor == columnas[i].value.trim())) { // El objeto columna tiene dos campos value y text
      Text.value = columnas[i]['text'][0]  // asigna el resultado a mostrar
      console.log("ComboBox asignaResultado Encontro el Value =======>", Text.value, Value.value);
      if (Value.value != valor)
        Value.value = valor
    }


  }
  // emit("update:Resultado", Text.value)
  /* }
  
   else {  //aqui me quede checar cuando es por arreglo genera el value con array
     console.log('comoBox ', This.Name, 'value=', Value.value)
     if ((Value.value == '' || Value.value == null) && columnas.length > 0)
       Value.value = columnas[0]['value']
 
     for (let i = 0; i < columnas.length; i++) {
       try {
         console.log('comboBox columna asigna sin valor', i, This.Name, columnas[i].value,columnas[i].value)        //      if (Value.value == columnas[i]['text'][0]) { // El objeto columna tiene dos campos value y text
         if (Value.value == columnas[i]['value']) {
           // if (Value.value == columnas[i]['value']) { // El objeto columna tiene dos campos value y text
 
           Text.value = columnas[i]['text'][0]   // asigna el resultado a mostrar
           //     Value.value = valor // Text.value;  // Asigna el valor al componente
         }
       } catch (error) {
         console.error('comboBox ', error)
       }
 
     }
     emitValue()
   }
   */
  //console.log("AsignaResultado  Value =======>",props.Name, Text.value, valor)
  emitValue()

}

//////////////////////////////////////////////////////
// Renderizado del combo box
/////////////////////////////////////////////////////
const renderComboBox = async () => {

  if (props.prop.RowSourceType < 1) return
  if (props.prop.Status == 'I') return
  if (props.prop.ColumnCount == 0) return
  if (!props.prop.RowSource || !props.prop.RowSource.length || props.prop.RowSource.length < 1) return;
  //try {
  const RowSource: string = props.prop.RowSource
  const pos = RowSource.indexOf(".") // posicion del punto

  // Obtenemos el alias
  const alias = (pos > 2) ? RowSource.slice(0, pos) : ''

  ColumnWidth(props.prop.ColumnWidths) // asigna tamaÃ±o de columnas

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
      console.log('comboBox data ===>', ins_sql, data)
      /*
        for (const nom_obj in data[0]) {
          const renglon = []
          for (let ren = 0; ren < data.length; ren++) {
            renglon.push(data[ren][nom_obj])
          }
          val_col.push(renglon)
        }
        */
      break
    }
    case 3: {
      //const data = await sql.value.localSql(props.prop.RowSource)
      // llama la vista en el servidor de SQL
      //data = await sql.value.execute(props.prop.RowSource, alias == '' ? 'MEMVAR' : alias)
      data = await This.Form.db.execute(props.prop.RowSource, 'MEMVAR')
      //console.log('ComboBox render data', data)
      if (data == null) {
        console.warn('comoBox Render', This.name, 'RowSource', props.prop.RowSource)

        return


      }


      /*
            // Recorremos las columnas que traiga el resultado 
            for (const nom_obj in data[0]) {
              const renglon = []
              // recorremos todos los renglones que tenga el data
              for (let ren = 0; ren < data.length; ren++) {
                renglon.push(data[ren][nom_obj])
              }
              val_col.push(renglon)
            }
      */
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
  // renglon 0 ["Inventarios", "Cuentas por cobrar", "Cuentas por pagar", "Ventas","Compras","Vendedores","Estadisticas","Cierres y utilerias","Parametros generales","Contabilidad","Control vehicular","Logistica"],
  // renglon 1 ["IN",          "CC",                 "CP",                 "VE",   "CO",     "VN",         "ES",         "CI",                 "PG",                 "CT",            "CV",               "LO" ],

  if ((tip_rst == 2 || tip_rst == 3) && data.length > 0) {
    for (const nom_obj in data[0]) {
      const renglon = []
      for (let ren = 0; ren < data.length; ren++) {
        renglon.push(data[ren][nom_obj])
      }
      val_col.push(renglon)
    }
  }

  // recorremos todas los renglones si es solo un columna val_col.length si no 
  // toma el tamaÃ±o del arreglo solo de la primer columna

  //if (props.prop.ControlSource > ' ')  // Si Hay controSource asigna el valor leido
  // let  valor = Value.value // null

  for (let ren = 0; ren < (props.prop.ColumnCount <= 1 ? val_col.length : val_col[0].length); ren++) {
    // asignamos el Value del BoundColum 
    if (props.prop.ColumnCount <= 1) { // Si solo es una columna

      columnas[ren] = {
        value: val_col[ren],
        text: [val_col[ren]],
      };
      //columnas[ren].text[0]= props.prop.RowSource[ren]
    } else {
      //  if (!valor)
      //    valor = val_col[BoundColumn][ren] // si no hay valor , asigna el primer valor

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

  // Busca valor inicial
  let valIni = columnas[0].value
  let sw_val = false

  for (let i = 0; i < columnas.length; i++) {

    //  console.log('ComboBox Busca valor ', This.Name, Value.value, columnas[i].value)

    if (typeof Value.value == 'number' && Value.value == columnas[i].value) {
      sw_val = true
      break
    }

    if (!(typeof Value.value == 'number')) {
      const value = columnas[i].value
      if (value.length > 0 && Value.value.length > 0 && Value.value.trim() == value.trim()) {
        sw_val = true
        break
      }
    }

  }
  if (!sw_val) Value.value = valIni


  // asignaResultado(Value.value)
  console.log('render combobox asigna resultado===>>', This.Name)
  asignaResultado()


  if (props.prop.MultiSelect) { // Si es multi selectccion generaramos el arreglo
    List.value = eval('[' + Value.value.trim() + ']')
    Value.value = data
    emit("update:Value", Value.value)
    Valid.value = true

  } else
    This.prop.Valid = true // Se toma como validado
  /* }
   
   catch (error) {
     console.error('ComboBox ', error)
 
   }
   */
}



////////////////////////////////////////
// Registro
// Nota: Lee de la base de datos local segun el valor de Registro
//       Se utiliza para el manejo de grid
///////////////////////////////////////
watch(
  () => props.Registro,
  (new_val, old_val) => {

    if (Recno.value != props.Registro)
      Recno.value = new_val

    if (new_val == 0) {
      Value.value = props.prop.Type == 'number' ? 0 : ''
      emitValue()
      return

    }
    if (new_val != old_val
      && props.prop.ControlSource > ' '
      && props.Registro > 0) {
      console.log('watch Registro ComboBox'), This.Name, new_val

      readCampo(new_val)
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
    console.log('ComboBox Set Focus', props.Name)
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

///////////////////////////////////
// Cuando cambia el estatus de Inicial a Activo 
//////////////////////

watch(
  () => props.prop.Status,
  (new_val, old_val) => {


    if (new_val == 'A' && old_val == 'I') {
      //      console.log('Watch Estatus Renderiza por cambio de estatus==>', props.Name, old_val, new_val)

      renderComboBox()
    }
  },
  { deep: false }
);


//Value
watch(
  () => props.prop.Value,
  (new_val, old_val) => {
    console.log('Watch prop.Value ComboBox===>', new_val, Value.value)
    // asigna la columna que tiene el resultado
    if (new_val != Value.value)
      asignaResultado(new_val)


  },
  { deep: false }
);

// ControlSource
///////////////////////////////////////
// ControlSource
///////////////////////////////////////
watch(
  () => props.prop.ControlSource,
  (new_val, old_val) => {

    if (new_val != old_val) {
      //      if (props.Recno > 0 && props.prop.ControlSource > ' ') {
      if (Recno.value > 0 && props.prop.ControlSource > ' ') {

        readCampo(Recno.value)
      }
    }
    //    LocalDb.ControlSource = new_val;


  },
  { deep: false }
);

/*

////////////////////////////////////////
// Registro
// Nota: Lee de la base de datos local segun el valor de recno
///////////////////////////////////////
watch(
  () => props.Registro,
  (new_val, old_val) => {
    if (props.prop.ControlSource > ' ') {
      if (Recno.value != props.Registro)
        Recno.value = props.Registro
      if (props.Registro == 0) {
        Value.value = ''
        emitValue()
        return

      }

      if (new_val != old_val && new_val > 0) {
        // console.log('Watch EditText Recno=', new_val)
        readCampo(props.Registro)
      }
      //    LocalDb.ControlSource = new_val;

    }
  },
  { deep: false }
);



watch(
  () => props.prop.ControlSource,
  (new_val, old_val) => {
    LocalDb.ControlSource = new_val;
  },
  { deep: true }
);
*/

// RowSoure
watch(
  () => props.prop.RowSource,
  (new_val, old_val) => {
    if (new_val.length < 2 || props.prop.RowSourceType < 1)
      return

    if (new_val != old_val) {
      //console.log('ComboBox renderiza por cambio enRowSource ===>>', new_val)
      renderComboBox()
    }
  },
  { deep: true }
);
//RowSourceType
watch(
  () => props.prop.RowSourceType,

  (new_val, old_val) => {
    if (props.prop.RowSourceType < 1 || props.prop.RowSource.length < 2) return

    // console.log('ComboBox RowSourceType===>>', new_val)
    if (new_val != old_val) {
      //console.log('ComboBox renderiza por cambio enRowSourceType ===>>', new_val)
      renderComboBox()
    }
  },
  { deep: false }
);

//Sorted
watch(
  () => props.prop.Sorted,

  (new_val, old_val) => {
    if (new_val != old_val) {
      //console.log('ComboBox renderiza por cambio en Sorted ===>>', new_val)

      renderComboBox();
    }
  },
  { deep: false }
);
//ColumCount
watch(
  () => props.prop.ColumnCount,

  (new_val, old_val) => {
    if (new_val != old_val) {
      // console.log('ComboBox renderiza por cambio en ColumnCount ===>>', new_val)

      renderComboBox();
    }
  },
  { deep: false }
);

//ColumWidth
const ColumnWidth = (new_val) => {
  //console.log('TamaÃ±o Columnas =',new_val)
  const columnWidth = eval('["' + new_val.replace(",", '","') + '"]');


  for (let col = 0; col < columnWidth.length; col++) {
    width[col] = columnWidth[col];
  }
}

watch(
  () => props.prop.ColumnWidths,

  (new_val, old_val) => {
    console.log('Watch ColumnWidths', new_val)

    if (new_val != old_val) {
      ColumnWidth(new_val)
      /*
      const columnWidth = eval('["' + new_val.replace(",", '","') + '"]');

      for (let col = 0; col < columnWidth.length; col++) {
        width[col] = columnWidth[col] + "%";
      console.log("Cambio tamaÃ±o de columnas==>", width[col]);
      }
      */
    }

  },
  { deep: false }
);


//BoundColum
watch(
  () => props.prop.BoundColumn,

  (new_val, old_val) => {
    if (new_val != old_val) {
      //console.log('ComboBox renderiza por cambio en BoundCoulmn ===>>', new_val)

      renderComboBox();
    }
  },
  { deep: false }
);

//width
watch(
  () => props.style.width,

  (new_val, old_val) => {
    console.log("Cambio tamaÃ±o ", inputWidth.value);
    if (new_val != old_val) {
      if (props.style.width.substr(-2, 2) == 'px') {
        const len = props.style.width.length - 2
        const width: number = +props.style.width.substr(0, len) - 30
        inputWidth.value = width.toString() + 'px'
        console.log("Cambio tamaÃ±o 2", inputWidth.value);
      }


    }
  },
  { deep: false }
);

/////////////////////////////////////////////
// Computed
/////////////////////////////////////////////
/*
const getZIndex = computed(() => {
  return props.style.zIndex;
})
*/



/////////////////////////////////////////
// Metodo init Vfp
// Aqui debemos de asignar todos los Valores inciales del componente
// A pesar que nom_nom se pasa por referencia, se tuvo que definir en props para qu fuera reactivo
// Se tiene que emitir para que cambie el Valor en el template
/////////////////////////////////////////

const init = async () => {
  // await This.init()
  if (props.Registro > 0 && props.prop.ControlSource.length > 1) {

    Status.value = 'P';  // en lectura
    emit("update:Status", 'P'); // actualiza el valor Status en el componente padre. No se debe utilizar Status.Value

    //    Vue.nextTick(() => {
    //       console.log(this.show, this.$refs.content);
    //     });

    await readCampo(props.Registro)
    //Value.value = await props.db.value.readCampo(props.prop.ControlSource, props.Recno)
    //   if (!props.prop.Autofocus) {
    This.Form.Recno = props.Registro

    Status.value = 'A'  // Activo


    emit("update:Status", 'A'); // actualiza el valor Status en el componente padre. No se debe utilizar Status.Value

  } else {

    await renderComboBox()

  }
  if (props.prop.First) {
    First.value = false
    //   emit("update:Value", Value.value); // actualiza el valor Value en el componente padre
    //emit("update") // emite un update en el componente padre
    // onFocus()
    console.log('ComboBox Set focus', Ref.value)
    Ref.value.select()  // hace el foco como primer elemento

    // Ref.value.focus()  // hace el foco como primer elemento
    //Ref.value.select()
    return
  }
};



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

.divi {
  z-index: v-bind('zIndex')
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

/*
.columna {
  z-index: v-bind('toggleZIndex')
}
*/
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
  top: 0px;
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
