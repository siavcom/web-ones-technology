<template>
  <div v-show="prop.Visible" class="divi" :style="style">
    <!--div class="mensajes" v-bind:style="componentStyle"-->
    <span class="etiqueta" :v-if="props.prop.textLabel > ' '">{{ prop.textLabel + " " }}</span>
    <!--div v-if="prop.Type == 'checkBox'" v-bind:style="componentStyle"-->
    <!--div v-if="prop.Type == 'checkBox'" class="prop.Type" v-text="prop.Value==1? '(x)':'( )'" /-->
    <input v-if="prop.Type == 'checkBox'" :class="prop.Type" style="componentStyle" readonly="true" type="checkBox"
      :checked="checked" />
    <!--/div>
      <div v-else-if="prop.Type == 'json'" v-bind:style="componentStyle"-->
    <!--div v-if="prop.Type == 'checkBox'" class="prop.Type" v-text="prop.Value==1? '(x)':'( )'" /-->
    <input v-else-if="prop.Type == 'json'" class="text" value='Data' style="componentStyle" readonly="true" />
    <!--/div>

      <div v-else-if="prop.Type == 'date'" v-bind:style="componentStyle"-->
    <input v-else-if="prop.Type == 'date'" class="text" type="date" style="componentStyle" readonly="true"
      v-model="Text" />
    <!--/div>

      <div v-else-if="prop.Type == 'datetime-local'" v-bind:style="componentStyle"-->
    <input v-else-if="prop.Type == 'datetime'" class="text" type="datetime-local" style="componentStyle"
      :format="This.prop.Format" readonly="true" v-model="Text" />
    <!--/div>
       
      <div v-else-->
    <input v-else v-show="Text != null" :class="prop.Type" :style="componentStyle" readonly="true" v-model="Text" />
    <!--/div-->
  </div>
  <!--/div-->
</template>


<!--textarea v-else-if="prop.Type == 'textArea'" class="text" 
v-model="Text" 
type="textArea" 
readonly="true" >
</textarea-->

<script setup lang="ts">
// Ult. Modificacion  
// 30/Sep/2022.- Fdo Cuadras

const emit = defineEmits(["update"]);
//import { localDb } from "@/classes/LocalDb";  // manejo del indexedDb

///////////////////////////////////////
// Propiedades del componente reactivas
////////////////////////////////////
const props = defineProps<{
  //Recno: 0;
  Registro: 0;
  //Show: false;
  prop: {
    This: null;
    ToolTipText: string;
    View: "";
    Field: "";
    Value: "";
    Caption: string;
    Placeholder: "";
    Format: "";
    InputMask: "";
    MaxLenght: 0;
    ReadOnly: false;
    Tag: "";
    Valid: false;
    Capture: true;
    Name: "";
    textLabel: "";
    Type: string;
    Visible: true;
    ControlSource: "";
    Key: string;
    BaseClass: "label";
    Grid: false;
    MaxLength: 0;
    RowSource: ""; // vi_cap_doc.tdo_tdo,des_tdo
    RowSourceType: number; //1-Value, 2-Alias, 3-Local SQL 5-Array
    ColumnCount: 0;
    ColumnWidths: string;
    Sorted: false;
    BoundColumn: 1; // Columna donde se tomara el Value
    Multiple: false;
    Status: string;
    ErrorMessage: string;
    ShowValue: false;
    TabIndex: number;


    Notation: 'standard'; //standard,scientific,enginniering,compact
    Style: string; // decimal, currency,percent,unit
    Currency: 'MXN'; //USD,EUR,MXN
    CurrencyDisplay: 'code'; //to use the ISO currency code.
    Decimals: number;
    Nu: 'arab';//


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
  //db: any
}>();

const Component = ref(props.prop.This)
const This = Component.value

const Value = ref(props.prop.Value)

const Text = ref(null)
const Status = ref(props.prop.Status)
const Caption = ref(props.prop.Caption)
const Aling = ref('left')

//const Style=ref(props.style)
//Style.value.width=props.style.width 


//defineExpose({ Caption });
//const This = Component.value
const columnas = reactive([{}]); // tiene todos los renglones del comboBox
Status.value = 'I'
const checked = ref(false)



const componentStyle = reactive(props.style)

//componentStyle.width = props.style.width
componentStyle.height = 'fit-content'
if (componentStyle.width == 'auto')
  componentStyle.width = '100%'

let medida = ''

if (componentStyle.width.search("px") > 0)
  medida = 'px'
if (componentStyle.width.search("%") > 0)
  medida = '%'

let textWidth = +componentStyle.width.replaceAll(medida, '') - 5
componentStyle.width = textWidth.toString() + medida






//const toggle = ref(false)
//const hover = ref(false)

//const zIndex = ref(props.style.zIndex)
const inputWidth = ref('auto')
/////////////////////////////////////////////////////////////////////
// emitValue
// Descripcion: emite hacia el componente padre el nuavo valor asignado
/////////////////////////////////////////////////////////////////
const emitValue = async () => {

  Status.value = 'A'
  emit("update") // emite un update en el componente padre
  //console.log('EditBox despuest emit Value ====>', props.prop.Value, props.prop.Status)
  return true;
};


////////////////////////////////////////
// Watchers : Triggers de templates
// Descripcion : Cuando cambia el Value de la propiedad del ControlSource, asigna el Value de
//                la vista a la propiedad de Value de la propiedad
// Notas : Si se tiene en props, se tiene que vigilar el cambio de props.prop.Value




//////////////////////////////////////////////////////
// Asigna Resultado
/////////////////////////////////////////////////////

const asignaResultado = (valor?: string) => {
  //console.log('componentStyle asignaResultado ',props.Name,valor)
  if (props.prop.Status == 'I') return
  if (props.prop.ColumnCount == 0) return;
  if (props.prop.RowSourceType == 0) return;
  if (!props.prop.RowSource || props.prop.RowSource.length < 1) return;

  const BoundColumn =
    (!props.prop.BoundColumn ? 1 : props.prop.BoundColumn) - 1; // Si no hay valor de columna donde asignar el valor
  // recorre todo los renglones en columnas

  // console.log("AsignaResultado  valor,columnas ======>",valor, columnas)

  if (valor) {
    //  console.log("ComboBox AsignaResultado valor columnas =======>", props.Name,valor,columnas)
    for (let i = 0; i < columnas.length; i++) {
      if (valor == columnas[i].value) { // El objeto columna tiene dos campos value y text
        // console.log("Busca Value =======>", i, new_val);

        // Encontro la posicion del value

        //Resultado.value = columnas[i].text[0];
        Text.value = columnas[i]['text'][0];  // asigna el resultado a mostrar
        //     Value.value = valor // Resultado.value;  // Asigna el valor al componente
        //console.log("AsignaResultado  Value =======>",props.Name, Resultado.value, valor)
      }
    }
  }
  else {  //aqui me quede checar cuando es por arreglo genera el value con array


    for (let i = 0; i < columnas.length; i++) {
      try {
        //      if (Value.value == columnas[i]['text'][0]) { // El objeto columna tiene dos campos value y text
        if (Value.value == columnas[i]['value'][0] || Value.value == columnas[i]['value']) {  // { // El objeto columna tiene dos campos value y text
          // Encontro la posicion del value
          // console.log("Encontro el Value =======>",BoundColumn,columnas[i].text[0]);

          //Resultado.value = columnas[i].text[0];
          // console.log("ComboBox AsignaResultado columnas =======>", props.Name,props.prop.Value,columnas[i].text[0])


          Text.value = columnas[i]['text'][0]   // asigna el resultado a mostrar
          //     Value.value = valor // Resultado.value;  // Asigna el valor al componente
          //console.log("AsignaResultado  Value =======>",props.Name, Resultado.value, valor)
        }
      } catch {
        console.error('comboBox columnas', columnas[i])
      }

    }
  }

  emitValue()
}




//////////////////////////////////////////////////////
// Asigna Resultado
/////////////////////////////////////////////////////
const asignaResultado2 = (valor: string) => {

  if (props.prop.Status == 'I') return

  // console.log('asignaResultado textLabel ColumnCount=0  ===>', props.prop.ColumnCount)
  if (props.prop.ColumnCount == 0) {  // Si no es tipo comboBox
    emitValue()
    return
  }
  if (props.prop.RowSourceType == 0) return;
  if (!props.prop.RowSource || props.prop.RowSource.length == 0) return;

  const BoundColumn =
    (!props.prop.BoundColumn ? 1 : props.prop.BoundColumn) - 1; // Si no hay valor de columna donde asignar el valor
  // recorre todo los renglones en columnas


  //console.log('texLabel asignaResultado ',valor,columnas)
  for (let i = 0; i < columnas.length; i++) {
    if (valor == columnas[i].value) { // El objeto columna tiene dos campos value y text
      Text.value = columnas[i]['text'][0]  // asigna el resultado a mostrar
      //console.log('texLabel asignaResultado escogio ',Text.value)
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
  if (!props.prop.RowSource || props.prop.RowSource.length < 2 || props.prop.RowSource == undefined) return;
  console.log('textLabel render comboBox ', props.prop.Name, ' RowSource=', props.prop.RowSource.length)
  try {
    //console.log('componentStyle asignaResultado renderCombo',props.Name,Value)
    const RowSource: string = props.prop.RowSource
    const pos = RowSource.indexOf(".") // posicion del punto

    // Obtenemos el alias
    const alias = (pos > 2) ? RowSource.slice(0, pos) : ''

    //ColumnWidth(props.prop.ColumnWidths) // asigna tamaño de columnas

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
        data = await This.Form.db.execute(props.prop.RowSource, 'MEMVAR')
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
      valor = Text.value //Value.value // null

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
    //console.log('ComboBox Renderiza column ===>', props.Name, columnas)

    Text.value = valor

    asignaResultado(valor)

    //  ** ojo falta el multi select
    /*
    if (props.prop.MultiSelect) { // Si es multi selectccion generaramos el arreglo
      List.value = eval('[' + Value.value.trim() + ']')
      Value.value = data
      emit("update:Value", Value.value)
      Valid.value = true

    }
    */



  }
  catch (error) {
    console.error('ComboBox ', error)

  }
}

const readCampo = async () => {
  //console.log('textLabel readCampo',This.Name,'Registro=',props.Registro,'ControlSource=',props.prop.ControlSource)

  if (props.Registro > 0 && props.prop.ControlSource.length > 2) {
    const data = await This.Form.db.readCampo(props.prop.ControlSource, props.Registro)
    for (const campo in data) {
      if (campo != 'key_pri')
        Text.value = data[campo] != null ? data[campo] : ''
    }
  }
  if (props.prop.Type == 'number') {
    //Text.value = toNumberStr(Text.value);
    Text.value = await numberFormat(+Text.value, props.prop.Currency, props.prop.MaxLength, props.prop.Decimals)

  }
  if (props.prop.Type == 'date') {
    //Text.value = toNumberStr(Text.value);
    Text.value = Text.value.slice(0, 10)
  }
  if (props.prop.Type == 'datetime') {
    //Text.value = toNumberStr(Text.value);
    Text.value = Text.value.slice(0, 16)

  }

  if (props.prop.Type == 'checkBox') {
    checked.value = Text.value == 1 ? true : false
    //console.log('checkBox ReadValue =',props.Name,Text.value)
  }
  console.log('TextLabel Name=', props.Name, 'Text=', Text.value)

  renderComboBox()
}
/*
watch(
  () => props.prop.Visible,
  (new_val, old_val) => {
    console.log('textLabel Visible', props.prop.Visible)
  },
  { deep: false }
)

watch(
  () => props.Show,
  (new_val, old_val) => {
    if (new_val!=old_val) { 
        console.log('componentStyle watch Show')
        if (props.Show) readCampo()
    }
  },
  { deep: false }
)
*/

watch(
  () => props.Registro,
  (new_val, old_val) => {
    console.log('componentStyle watch Registro', old_val, new_val)
    if (old_val != new_val && new_val > 0) readCampo()

    if (new_val == 0)
      Text.value = ''
  },
  { deep: false }
)

/////////////////////////////////////////////
// Computed
/////////////////////////////////////////////

//const getZIndex = computed(() => {
//  return props.style.zIndex;
//})

/////////////////////////////////////////
// Metodo init Vfp
// Aqui debemos de asignar todos los Valores inciales del componente
// A pesar que nom_nom se pasa por referencia, se tuvo que definir en props para qu fuera reactivo
// Se tiene que emitir para que cambie el Valor en el template
/////////////////////////////////////////

const init = async () => {

  if (props.prop.Type == 'number')
    componentStyle.textAlign = 'right'

  readCampo()

}

init();
</script>
