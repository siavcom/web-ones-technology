<template>
  <div :id="Id + '_div'" v-show="prop.Visible" class="divi" :style="style">
    <!--div class="mensajes" v-bind:style="inputStyle"    :style="{ maxHeight: style.maxHeight } -->
    <div :id="Id + '_span'" class="etiqueta" :v-if="props.prop.textLabel > ' '" :style="labelStyle">{{ prop.textLabel +
    " " }}</div>
    <!--div v-if="prop.Type == 'checkBox'" v-bind:style="inputStyle"-->
    <!--div v-if="prop.Type == 'checkBox'" class="prop.Type" v-text="prop.Value==1? '(x)':'( )'" /-->

    <input :id="Id + '_label'" v-if="prop.Type == 'checkBox'" class="checkBox" type="checkBox" :style="inputStyle"
      :checked="checkValue" />

    <input :id="Id + '_label'" v-else-if="prop.Type == 'json'" class="text" value='Data' :style="inputStyle"
      readonly="true" />
    <!--/div>

      <div v-else-if="prop.Type == 'date'" v-bind:style="inputStyle"-->
    <input :id="Id + '_label'" v-else-if="prop.Type == 'date'" class="text" type="date" :style="inputStyle"
      readonly="true" v-model="Text" />
    <!--/div>

      <div v-else-if="prop.Type == 'datetime-local'" v-bind:style="inputStyle"-->
    <input :id="Id + '_label'" v-else-if="prop.Type == 'datetime'" class="text" type="datetime-local"
      :style="inputStyle" :format="This.prop.Format" readonly="true" v-model="Text" />
    <!--/div>
       
      <div v-else-->
    <input :id="Id + '_label'" v-else class="text" v-show="prop.Visible && Text != null" type="text" :style="inputStyle"
      readonly="true" v-model="Text" />
    <!--/div-->
    <nuxt-img :id="Id + '_img'" v-if="prop.Image > '    '" class="img" :src="prop.Image" />

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

const emit = defineEmits(["update", "update:checkValue"]);
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
    Value: [String, Number, Date];
    Caption: string;
    Placeholder: "";
    Format: "";
    Image: "";
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
    Currency: '   '; //USD,EUR,MXN
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
    maxHeight: "auto"
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

const Id = This.prop.Name + props.Registro.toString().trim()

const labelStyle = reactive(This.labelStyle)
const Value = ref(props.prop.Value)

const Text = ref(null)
const Status = ref(props.prop.Status)

const columnas = reactive([{}]); // tiene todos los renglones del comboBox
Status.value = 'I'
const checkValue = ref(false)

const inputStyle = reactive(props.style)

if (inputStyle.width == 'auto')
  inputStyle.width = '100%'

if (inputStyle.maxWidth == 'auto')
  inputStyle.maxWidth = '97%'

if (inputStyle.maxHeight == 'auto')
  inputStyle.maxHeight = '97%'


/*
let medida = ''

if (inputStyle.width.search("px") > 0)
  medida = 'px'
if (inputStyle.width.search("%") > 0)
  medida = '%'

const textWidth = +inputStyle.width.replaceAll(medida, '') - 5
inputStyle.width = textWidth.toString() + medida
*/



//const zIndex = ref(props.style.zIndex)
//const inputWidth = ref('auto')
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


//////////////////////////////////////////////////////
// Asigna Resultado
/////////////////////////////////////////////////////

const asignaResultado = (valor?: string) => {
  //console.log('inputStyle asignaResultado ',props.Name,valor)
  if (props.prop.Status == 'I') return
  if (props.prop.ColumnCount == 0) return;
  if (props.prop.RowSourceType == 0) return;
  if (!props.prop.RowSource || props.prop.RowSource.length < 1) return;

  const BoundColumn =
    (!props.prop.BoundColumn ? 1 : props.prop.BoundColumn) - 1; // Si no hay valor de columna donde asignar el valor
  // recorre todo los renglones en columnas

  // console.log("AsignaResultado  valor,columnas ======>",valor, columnas)

  ///////////////////////// Se aumento 5/Feb/2024 //////////////////////
  let found = false

  for (let i = 0; i < columnas.length && !found; i++) {
    // console.log('Buscando Valor TextLabel comboBox Name=', props.prop.Name, 'i=', i, 'columnas=', columnas[i].value, 'Value=', Value.value)
    if (
      (typeof columnas[i].value == 'string' && valor.trim() == columnas[i].value.trim()) ||
      valor == columnas[i].value) {
      // El objeto columna tiene dos campos value y text
      Text.value = typeof columnas[i]['text'][0] == 'string' ? columnas[i]['text'][0].trim() : columnas[i]['text'][0]  // asigna el resultado a mostrar
      found = true
    }
  }
  if (!found && columnas.length > 0) { // No se encontro el valor , asignara el primer valor
    //Value.value = columnas[0].value
    Text.value = typeof columnas[0]['text'][0] == 'string' ? columnas[0]['text'][0].trim() : columnas[0]['text'][0]
    //  console.log('TextLabelcomboBox Name=', props.prop.Name, 'No found ', 'Value=', Text.value)
  }
  /////////////////////////////////////////////////////////////////////



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
  // console.log('textLabel render comboBox ', props.prop.Name, ' RowSource=', props.prop.RowSource.length)

  //console.log('inputStyle asignaResultado renderCombo',props.Name,Value)
  const RowSource: string = props.prop.RowSource
  const pos = RowSource.indexOf(".") // posicion del punto

  // Obtenemos el alias
  const alias = (pos > 2) ? RowSource.slice(0, pos) : ''

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

      break
    }
    case 3: {
      data = await This.Form.db.execute(props.prop.RowSource, 'MEMVAR')
      break
    }
    case 4: { // local SQL Query
      data = await This.Form.db.localAlaSql(props.prop.RowSource)
      if (data == null) {
        //  console.warn('comoBox Render', This.name, 'RowSource', props.prop.RowSource)
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
  //console.log('Text Label render data=', data)
  if (data[0]) {

    if (tip_rst >= 2 || tip_rst <= 4) {
      for (const nom_obj in data[0]) {
        const renglon = []
        for (let ren = 0; ren < data.length; ren++) {
          renglon.push(data[ren][nom_obj])
        }
        val_col.push(renglon)
      }
    }
  }
  else
    console.warn('TextLabel combobox Name=', This.prop.Name, ' No data in ', This.prop.ControlSource)

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
  //Text.value = valor
  //console.log('TextLabel combobox Name=', This.prop.Name, 'Text.Value=', Text.value,' valor=',valor)

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

const readCampo = async () => {
  //console.log('textLabel readCampo',This.Name,'Registro=',props.Registro,'ControlSource=',props.prop.ControlSource)

  if (props.Registro > 0 && props.prop.ControlSource.length > 2) {
    const data = await This.Form.db.readCampo(props.prop.ControlSource, props.Registro)
    for (const campo in data) {
      if (campo != 'key_pri')
        Text.value = data[campo] != null ? data[campo] : ''
      console.log('TextLabel Name=', props.prop.Name, 'Text=', Text.value)
    }
  }
  if (props.prop.Type == 'number') {
    //Text.value = toNumberStr(Text.value);
    Text.value = await numberFormat(+Text.value, props.prop.Currency, props.prop.MaxLength, props.prop.Decimals)

  }
  if (props.prop.Type == 'date' && Text.value != null) {
    //Text.value = toNumberStr(Text.value);
    Text.value = Text.value.slice(0, 10)
  }
  if (props.prop.Type == 'datetime' && Text.value != null) {
    //Text.value = toNumberStr(Text.value);
    Text.value = Text.value.slice(0, 16)
  }

  if (props.prop.Type == 'checkBox') {
    //checkValue.value = Text.value == 1 ? true : false
    let check = Text.value == 0 ? false : true
    if (checkValue.value != check) {
      checkValue.value = check
    }
    emit("update:checkValue", checkValue)

  }

  if (props.prop.Type == 'text' || props.prop.Type == 'textArea') {
    Text.value = Text.value.trim()

  }

  renderComboBox()
}

watch(
  () => props.Registro,
  async (new_val, old_val) => {
    // console.log('inputStyle watch Registro', old_val, new_val)
    if (old_val != new_val && new_val > 0) {
      await readCampo()
      This.recnoChange()
    }
    if (new_val == 0)
      Text.value = ''

  },
  { deep: false }
)

/////////////////////////////////////////
// Metodo init Vfp
// Aqui debemos de asignar todos los Valores inciales del componente
// A pesar que nom_nom se pasa por referencia, se tuvo que definir en props para qu fuera reactivo
// Se tiene que emitir para que cambie el Valor en el template
/////////////////////////////////////////

const init = async () => {

  if (props.prop.Type == 'number')
    inputStyle.textAlign = 'right'

  await readCampo()
  This.recnoChange()

}

init();
</script>
