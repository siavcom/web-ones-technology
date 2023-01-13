<template>
  <!--div v-if="prop.MultiSelect">Selected: {{ List }}</div-->
  <div class="divi" :style="style" v-if="prop.Visible" :disabled="prop.Disabled || prop.ReadOnly">
    <!--Etiqueta del componente -->
    <div class="mensajes">
      <span class="etiqueta" v-if="prop.textLabel">{{ prop.textLabel + " " }}</span>
      <!--List Box -->
      <div v-if="prop.MultiSelect" class="multiSelect" @lostFocus="validList()">
        <select v-model="List"  multiple>
          <option class="option" v-for="(option, valueIndex) in columnas" :key="valueIndex"
            :value="columnas[valueIndex].value">
            <!--Imprime Columnas -->
            <!--div class="columna"  v-for="(text, col) in option.text" :key="col"
            -->
            <input v-for="(text, col) in option.text" :key="col" :style="{ 'width': width[col], 'text-align': 'left' }"
              class="input" :value="text" />
            <!--/div-->
          </option>
        </select>

      </div>

      <!--ComboBox -->

      <div v-else class="comboBox">
        <input class="text" ref="Ref" :readonly="prop.Style == 2 || prop.ReadOnly" type="text" :value="Resultado"
          @focusout="focusOut" stype="prop.style"/>

        <!--span> {{ prop.Value }}</span-->
        <!--Valor seleccionado click-->
        <div class="toggle" v-if="toggle && !prop.ReadOnly">
          <!--CheckBox -->
          <div class="option" v-for="(option, valueIndex) in columnas" :key="valueIndex" @mouseover="hover = true"
            @mouseleave="hover = false" @click="valid(valueIndex)"  :disabled="prop.ReadOnly">
            <!--Imprime Columnas -->
            <div class="columna" :disabled="prop.ReadOnly" v-for="(text, col) in option.text" :key="col"
              :style="{ 'width': width[col], 'text-align': 'left' }">
              <label class="label" v-text="text" />
            </div>
          </div>
        </div>
        <img class="imagen" v-if="!prop.Disabled && !prop.ReadOnly"
          :src="toggle ? '/Iconos/svg/bx-left-arrow.svg' : '/Iconos/svg/bx-down-arrow.svg'"
          @click.prevent="toggle = prop.ReadOnly == false ? !toggle.value : toggle.value" :tabindex="prop.TabIndex" />
      </div>
      <span class="tooltiptext" v-if="prop.ToolTipText.length > 0" v-show="ToolTipText && prop.Valid">{{
          prop.ToolTipText
      }}</span>
      <span class="errorText" @focus.prevent="onFocus" v-show="!prop.Valid && showError">{{ prop.ErrorMessage }}</span>
    </div>
    <span v-if="prop.ShowValue">{{ prop.Value }}</span>
  </div>

</template>

<script setup lang="ts">

import {
  //defineEmits,
  //defineProps,
  ref,
  reactive,
  //computed,
  //  onUnmounted,
  watch,
  //watchEffect,
  //render,
  //watchPostEffect,
  // watchSyncEffect,
  //  toRefs,
  // toRefs,
  //toRef,
  //onMounted,
  // onBeforeUpdate,
  // onUpdated,
  // onUnmounted,

} from "vue";

//import { localDb } from "@/classes/LocalDb";  // manejo del indexedDb
//import VueSimpleAlert from "vue3-simple-alert";
const emit = defineEmits(["update", "update:Value", "update:Valid", "update:Status", "update:Recno", "update:Key", "update:Focus"]) //, "update:Ref"
///////////////////////////////////////
// Variables comunes globales al componente
////////////////////////////////////

interface Props {
  Recno: number;
  Registro: number;
  //Component: object;
  prop: Object;
  style: Object;
  position: Object;
  db: any;
}


//const props = defineProps<{

const props = withDefaults(defineProps<Props>(), {

  /// columnas: any;
  // Value: string;
  Recno: 0,
  Registro: 0,
  //Component: null;
  prop: {
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

    style: {
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
    zIndex: 2,

    // inputWidth: "inherit"
  },
  position: {
    position: "left", //left,right,center,absolute. Si es absulute poner Value left y top
    left: 0,
    Top: 0,
  },
  db: null,

  // colStyle: [
  //   {
  //     width: "100px";
  //   },
  //   {
  //     width: "100px";
  //   },
  //   {
  //     width: "100px";
  //   }
  // ];
})

//  Original }>();


//const Component = ref(props.Component)

const Value = ref(props.prop.Value)
const Recno = ref(props.Recno)
const Valid = ref(props.prop.Valid)
Valid.value = true
const ToolTipText = ref(true)

//const This = Component.value
const columnas = reactive([{}]); // tiene todos los renglones del comboBox
const Resultado = ref("");
//const width = reactive([{}]);
const width = reactive(['60%', '20%', '20%']);

const Ref = ref(null)

const Status = ref(props.prop.Status);
Status.value = 'I'
const toggle = ref(false)
const hover = ref(false)
const Focus = ref(props.prop.Focus)
const showError = ref(false)


Focus.value = false
const zIndex= ref(props.style.zIndex)

const comboZIndex =zIndex.value+1
const toggleZIndex=zIndex.value+2
zIndex.value=zIndex.value+1
const inputWidth = ref('auto')
const List = ref(props.prop.List)


/////////////////////////////////////////
// Metodo on change Vfp cuando es Value por referencia
/////////////////////////////////////////

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
  emit("update:Recno", props.Registro)
  emit("update") // emite un update en el componente padre
 console.log('EditBox despuest emit Value ====>', props.prop.Value, props.prop.Status)
  return true;
};


/////////////////////////////////////////////////////////////////////
// focusOut
// Descripcion: Cuando pierda el foco el componente , actualizamo el valor en cursor local
/////////////////////////////////////////////////////////////////
const focusOut = async () => {
  const valor = Value.value;

  if (props.prop.ControlSource && props.prop.ControlSource.length > 3) {
    await props.db.value.updateCampo(valor, props.prop.ControlSource, props.Recno)
  }
  ToolTipText.value = true  // Activamos el ToolTipText
  toggle.value = false
  console.log('ComboBox  focusOut===>', Value.value)
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
    asignaResultado()

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
  Ref.value.select()

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
  showError.value = false
  if (!props.prop.Valid) {    // = false; // old revisar si se necesita
    //   Valid.value = true

    if (props.Recno > 0) {
      const data = await props.db.value.readCampo(props.prop.ControlSource, props.Recno, 'Old')
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
    emit("update:Valid", true)
  }
  /*
  if (props.prop.Type == 'number') {
      numberStr.value = Value.value;
      type.value = 'number';
    };
  */
  if (Status.value == 'P') return // ya se habia hecho el foco
  Status.value = 'P';  // en foco
  //console.log('onFocus elemento ===>', props.prop.Name, 'P')
  emit("update:Status", 'P'); // actualiza el valor Status en el componente padre. No se debe utilizar Status.Value
  emit("update")
}
//////////////////////////////////////////
// Lee el campo desde SQL Local
////////////////////////////////////////

const readCampo = async (recno: number) => {
  if (Status.value == 'A') {
    Status.value = 'P'
    emit("update:Status", 'P'); // actualiza el valor Status en el componente padre. No se debe utilizar Status.Value
  }
  const data = await props.db.value.readCampo(props.prop.ControlSource, recno)
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
  if (props.prop.Status == 'I') return
  if (props.prop.ColumnCount == 0) return;
  if (props.prop.RowSourceType == 0) return;
  if (!props.prop.RowSource || props.prop.RowSource.length < 1) return;

  const BoundColumn =
    (!props.prop.BoundColumn ? 1 : props.prop.BoundColumn) - 1; // Si no hay valor de columna donde asignar el valor
  // recorre todo los renglones en columnas

  // console.log("AsignaResultado  valor,columnas ======>",valor, columnas)

  if (valor) {
    //  console.log("ComboBox AsignaResultado valor columnas =======>", props.prop.Name,valor,columnas)


    for (let i = 0; i < columnas.length; i++) {
      if (valor == columnas[i].value) { // El objeto columna tiene dos campos value y text
        // console.log("Busca Value =======>", i, new_val);

        // Encontro la posicion del value
        // console.log("Encontro el Value =======>",BoundColumn,columnas[i].text[0]);

        //Resultado.value = columnas[i].text[0];
        Resultado.value = columnas[i]['text'][0];  // asigna el resultado a mostrar
        //     Value.value = valor // Resultado.value;  // Asigna el valor al componente
        //console.log("AsignaResultado  Value =======>",props.prop.Name, Resultado.value, valor)
      }
    }
  }
  else {  //aqui me quede checar cuando es por arreglo genra el value con array
    // console.log("ComboBox AsignaResultad Value.vale columnas =======>", props.prop.Name,Value.value,columnas)

    for (let i = 0; i < columnas.length; i++) {
      //      if (Value.value == columnas[i]['text'][0]) { // El objeto columna tiene dos campos value y text
      if (Value.value == columnas[i]['value'][0] || Value.value == columnas[i]['value']) {  // { // El objeto columna tiene dos campos value y text
        // if (Value.value == columnas[i]['value']) { // El objeto columna tiene dos campos value y text

        // console.log("Busca Value =======>", i, new_val);

        // Encontro la posicion del value
        // console.log("Encontro el Value =======>",BoundColumn,columnas[i].text[0]);

        //Resultado.value = columnas[i].text[0];
        // console.log("ComboBox AsignaResultado columnas =======>", props.prop.Name,props.prop.Value,columnas[i].text[0])


        Resultado.value = columnas[i]['text'][0]   // asigna el resultado a mostrar
        //     Value.value = valor // Resultado.value;  // Asigna el valor al componente
        //console.log("AsignaResultado  Value =======>",props.prop.Name, Resultado.value, valor)
      }
    }
  }
  emitValue()
}

//////////////////////////////////////////////////////
// Renderizado del combo box
/////////////////////////////////////////////////////
const renderComboBox = async () => {
  
  if (props.prop.RowSourceType < 1) return
  if (props.prop.Status == 'I') return
  if (props.prop.ColumnCount == 0) return
  if (props.prop.RowSourceType == 0) return
  if (!props.prop.RowSource || props.prop.RowSource.length < 1) return;
  
  const RowSource: string = props.prop.RowSource
  const pos = RowSource.indexOf(".") // posicion del punto

  // Obtenemos el alias
  const alias = (pos > 2) ? RowSource.slice(0, pos) : ''

  ColumnWidth(props.prop.ColumnWidths) // asigna tamaño de columnas

  //console.log('ComboBox renderiza  ===>>', props.prop.Name,props.prop.Status)

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
  const sql = props.db
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
      data = await sql.value.localSql(ins_sql)
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
      data = await sql.value.execute(props.prop.RowSource,'MEMVAR')


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

  if (tip_rst == 2 || tip_rst == 3) {
    for (const nom_obj in data[0]) {
      const renglon = []
      for (let ren = 0; ren < data.length; ren++) {
        renglon.push(data[ren][nom_obj])
      }
      val_col.push(renglon)
    }
  }

  // recorremos todas los renglones si es solo un columna val_col.length si no 
  // toma el tamaño del arreglo solo de la primer columna
  var valor = null

  if (props.prop.ControlSource > ' ')  // Si Hay controSource asigna el valor leido
    valor = Value.value // null

  for (
    let ren = 0;
    ren < (props.prop.ColumnCount <= 1 ? val_col.length : val_col[0].length);
    ren++
  ) {
    // asignamos el Value del BoundColum 
    if (props.prop.ColumnCount <= 1) { // Si solo es una columna
      valor = val_col[ren] // si no hay valor , asigna el primer valor

      // Si solo tiene una columna
      columnas[ren] = {
        value: val_col[ren],
        text: [val_col[ren]],
      };
      //columnas[ren].text[0]= props.prop.RowSource[ren]
    } else {
      if (!valor)
        valor = val_col[BoundColumn][ren] // si no hay valor , asigna el primer valor

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
  // console.log('Columnas del comboBox',columnas)
  //props.prop.Value = valor

  //console.log("Asigna render Combo box columnas", columnas);
  //console.log('ComboBox Renderiza column ===>', props.prop.Name, columnas)

  Value.value = valor

  asignaResultado(valor)


  if (props.prop.MultiSelect) { // Si es multi selectccion generaramos el arreglo
        List.value = eval('[' + Value.value.trim() + ']')
        Value.value = data
        emit("update:Value", Value.value)
        Valid.value = true

      }

};


//////////////////////////////////////////////////////
// Watchers : Triggers de templates .Cambios en los modos del combo box
// Descripcion : Cuando cambia el valor de una propiedad que afecte el contenido
// Notas : Si se tiene en props, se tiene que vigilar el cambio de props.prop.Value
//////////////////////////////////////////////////////
/*
watchEffect(() => {
  console.log('WatchEffect ComboBox '+props.prop.Name,props.prop.Status)
  //renderComboBox()
  },
   {
    flush: 'pre'
  })


watchPostEffect(() => {
  console.log('WatchPostEffect ComboBox '+props.prop.Name,props.prop.Value)
  //renderComboBox()
  })

watchSyncEffect(() => {
  console.log('WatchSyncEffect ComboBox '+props.prop.Name,props.prop.Status)
  //renderComboBox()asignaResultado
  })

*/
//watchPostEffect()


////////////////////////////////////////
// watch Valid
///////////////////////////////////////

watch(
  () => props.prop.Valid,
  (new_val, old_val) => {
    if (!props.prop.Valid) showError.value = true
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
    console.log('ComboBox Set Focus', props.prop.Name)
    if (Focus.value) {
      //      Ref.value.focus()
      Ref.value.select()
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

    // console.log('toggle.value', props.prop.Name, old_val, new_val)
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
      //      console.log('Watch Estatus Renderiza por cambio de estatus==>', props.prop.Name, old_val, new_val)

      renderComboBox()
    }
  },
  { deep: false }
);


//Value
watch(
  () => props.prop.Value,
  (new_val, old_val, onClean) => {
    //console.log('Watch prop.Value ComboBox===>', new_val)
    // asigna la columna que tiene el resultado
    asignaResultado()

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
      // console.log('Watch comboBox ControlSource=')
      if (props.Recno > 0 && props.prop.ControlSource > ' ') {
        readCampo(props.Recno)
        //Value.value = props.db.value.readRenglon(new_val, props.Recno)
        //emitValue()
      }
    }
    //    LocalDb.ControlSource = new_val;


  },
  { deep: false }
);


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



/*
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
    if (props.prop.RowSourceType < 1) return
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
  //console.log('Tamaño Columnas =',new_val)
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
      console.log("Cambio tamaño de columnas==>", width[col]);
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
    console.log("Cambio tamaño ", inputWidth.value);
    if (new_val != old_val) {
      if (props.style.width.substr(-2, 2) == 'px') {
        const len = props.style.width.length - 2
        const width: number = +props.style.width.substr(0, len) - 30
        inputWidth.value = width.toString() + 'px'
        console.log("Cambio tamaño 2", inputWidth.value);
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

  if (props.Registro > 0 && props.prop.ControlSource.length > 1) {

    Status.value = 'P';  // en lectura
    emit("update:Status", 'P'); // actualiza el valor Status en el componente padre. No se debe utilizar Status.Value

    //    Vue.nextTick(() => {
    //       console.log(this.show, this.$refs.content);
    //     });

    await readCampo(props.Registro)
    //Value.value = await props.db.value.readCampo(props.prop.ControlSource, props.Recno)
    //   if (!props.prop.Autofocus) {
    if (!props.prop.First) {

      await emitValue()
    }
  }
  //console.warn('comboBox prop',props.prop)
  // const ref = Ref
  // emit("update:Ref", Ref); // actualiza el valor del Ref al componente padre


  //  oldVal = Value.value   // asignamos el valor viejo

  // si es el primer elemento a posicionarse
  renderComboBox()
  if (props.prop.First) {
    emit("update:Value", Value.value); // actualiza el valor Value en el componente padre
    emit("update") // emite un update en el componente padre
    // onFocus()
    Ref.value.focus()  // hace el foco como primer elemento
    //Ref.value.select()
    return
  }// else  await emitValue()
  //console.log('Init comboBox==>', props.prop.Name)



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
  border :1px;
  
}
.divi {
  z-index: v-bind('zIndex')

}

div.comboBox {
  display: flex;
  order: 1px solid rgb(0, 5, 2);
  border-radius: 5px;
  z-index: v-bind('comboZIndex');
 
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
  color:#292b2a;   /* #0b0c0c negro;   #7a18e9; morado*/
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
