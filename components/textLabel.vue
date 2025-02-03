<template>
  <div :id="Id + '_div_label'" v-show="prop.Visible" class="divi" :style="style">

    <div :id="Id + '_labelText'" class="etiqueta" v-if="prop.BaseClass != 'imgButton' && props.prop.textLabel > ' '"
      :style="labelStyle">{{ prop.textLabel +
        " " }}</div>


    <input :id="Id + '_checkBox'" v-if="prop.Type == 'checkBox'" class="checkBox" type="checkBox"
      :style="Styles.inputStyle" :checked="checkValue" readonly="true" />

    <input :id="Id + '_json'" v-else-if="prop.Type == 'json'" class="text" value='Data' :style="Styles.inputStyle"
      readonly="true" />
    <input :id="Id + '_date'" v-else-if="prop.Type == 'date'" class="text" type="date" :style="Styles.inputStyle"
      readonly="true" v-model="Text" />
    <input :id="Id + '_datetime'" v-else-if="prop.Type == 'datetime'" class="text" type="datetime-local"
      :style="Styles.inputStyle" :format="This.prop.Format" readonly="true" v-model="Text" />
    <button class='button' :id="Id + '_imgButton'" v-else-if="prop.BaseClass == 'imgButton'" :style="Styles.inputStyle">
      <img class="img" fit='inside' :src="prop.Image" :alt="prop.Value" />
      <label v-if="Text.length > 0"
        :style="{ 'word-wrap': 'break-word', 'font-size': style.fontSize, 'color': style.color }">{{ Text }}</label>
    </button>
    <input :id="Id + '_text'" v-else v-show="prop.Visible && Text != null" type="text" :style="Styles.inputStyle"
      readonly="true" v-model="Text" />

    <div v-if="Type != 'imgButton' && prop.Image > '    '">
      <nuxt-img :id="Id + '_imagen'" v-if="prop.BaseClass == 'imgButton' && prop.Image > '    '" class="img"
        :src="prop.Image" />
    </div>

    <textLabel :id="Id + '_component_' + compMain" v-for="( compMain ) in This.main " :key="compMain"
      :is="impComponent(This[compMain].prop.BaseClass)" v-model:Value="This[compMain].prop.Value"
      :ShowError="This[compMain].prop.ShowError" :Registro="Registro" :prop="This[compMain].prop"
      :style="This[compMain].style" :position="This[compMain].position">

    </textLabel>



  </div>
</template>


<script setup lang="ts">

const emit = defineEmits(["update", "update:checkValue"]);

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
    BaseClass: string;
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
  // inputStyle: {};
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
const Este = props.prop.This
const labelStyle = reactive({ ...Este.labelStyle })
const inputStyle = reactive({ ...Este.inputStyle })
const divStyle = reactive({ ...Este.style })

const Styles =
{
  labelStyle: labelStyle,
  inputStyle: inputStyle,
  style: divStyle
}


//const Id = This.prop.Name + props.Registro.toString().trim()


const Id = This.prop.Name + '_' + Math.floor(Math.random() * 10000000).toString() //props.Registro.toString().trim()



const Value = ref(props.prop.Value)

const Text = ref(null)
const Status = ref(props.prop.Status)

const columnas = reactive([{}]); // tiene todos los renglones del comboBox
Status.value = 'I'
const checkValue = ref(false)
const Type = ref(props.prop.Type.toLowerCase())

/*
const labelStyle = reactive(This.labelStyle)
const InputStyle = reactive({ ...props.inputStyle })
const refInputStyle = toRef(This.inputStyle)
*/



// el width y maxWidth de 99% fue lo mejor para los grid de columnas  
// con 97% se desalinea horizontalmente en el grid de columnas


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



const asignaResultado = async (valor?: string) => {
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
    //console.log('1) Buscando Valor TextLabel comboBox Name=', props.prop.Name, 'i=', i, 'columnas=', columnas[i].value, 'Value=', valor)

    //    if ((typeof columnas[i].value == 'string' && typeof Value.value == 'string' && Value.value.trim() == columnas[i].value.trim()) ||
    //        Value.value == columnas[i].value) {

    if (
      (typeof columnas[i].value == 'string' && typeof valor == 'string' && valor.trim() == columnas[i].value.trim()) ||
      valor == columnas[i].value) {
      // El objeto columna tiene dos campos value y text


      //displayText.value = typeof columnas[i]['text'][0] == 'string' ? columnas[i]['text'][0].trim() : columnas[i]['text'][0]  // asigna el resultado a mostrar

      Text.value = typeof columnas[i]['text'][0] == 'string' ? columnas[i]['text'][0].trim() : columnas[i]['text'][0]  // asigna el resultado a mostrar
      found = true
      // console.log('2] Buscando Valor Encontro Valor TextLabel comboBox Name=', props.prop.Name, 'i=', i, 'columnas=', columnas[i].value, 'Value=', valor)

    }
  }
  if (!found && columnas.length > 0) { // No se encontro el valor , asignara el primer valor
    //Value.value = columnas[0].value
    Text.value = typeof columnas[0]['text'][0] == 'string' ? columnas[0]['text'][0].trim() : columnas[0]['text'][0]
    //  console.log('TextLabelcomboBox Name=', props.prop.Name, 'No found ', 'Value=', Text.value)
  }
  /////////////////////////////////////////////////////////////////////

  await emitValue()
}

//////////////////////////////////////////////////////
// Renderizado del combo box
/////////////////////////////////////////////////////
const renderComboBox = async () => {

  if (props.prop.RowSourceType < 1) return
  if (props.prop.Status == 'I') return
  if (props.prop.ColumnCount == 0) return

  if (!props.prop.RowSource || props.prop.RowSource.length < 2 || props.prop.RowSource == undefined) {
    return;
  }

  //console.log('textLabel render comboBox ', props.prop.Map, ' RowSource=', props.prop.RowSource)
  //console.log('1) textLabel renderComboBox', This.Name, 'Registro=', props.Registro, 'Valor=', Text.value, 'ControlSource=', props.prop.ControlSource)
  //console.log('inputStyle asignaResultado renderCombo',props.Name,Value)
  const RowSource: string = props.prop.RowSource


  // RowSourceType: 0, //1-Value, 2-Alias,3-Query SQL Server,4 -Query Local SQL , 5-Array
  // this.prop.RowSource = "camposView.ref_dat,cam_dat";

  if (props.prop.RowSourceType == 2) {   // Obtenemos el alias
    const pos = RowSource.indexOf(".") // posicion del punto
    if (pos < 2) return

    const alias = (pos > 2) ? RowSource.slice(0, pos) : ''
  }
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

      const pos = RowSource.indexOf(".") // posicion del punto
      const alias = (pos > 2) ? RowSource.slice(0, pos) : ''
      const ins_sql = 'select ' + RowSource + ' from ' + alias
      data = await This.Sql.localAlaSql(ins_sql)

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


  for (
    let ren = 0;
    ren < (props.prop.ColumnCount <= 1 ? val_col.length : val_col[0].length);
    ren++
  ) {
    // asignamos el Value del BoundColum 
    if (props.prop.ColumnCount <= 1) { // Si solo es una columna
      valor = val_col[ren] // si no hay valor , asigna el primer valor
      columnas[ren] = {
        value: val_col[ren],
        text: [val_col[ren]],
      };
      //columnas[ren].text[0]= props.prop.RowSource[ren]
    } else {
      if (props.prop.ControlSource.trim().length > 3)  // Si Hay controSource asigna el valor leido
        valor = Text.value //Value.value // null
      else
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

  //asignaResultado(valor)
  //console.log('2) textLabel renderComboBox', This.Name, 'Registro=', props.Registro, 'Valor=', valor, 'ControlSource=', props.prop.ControlSource)
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

  if (props.Registro > 0 && props.prop.ControlSource.length > 2) {

    const data = await This.Sql.readCampo(props.prop.ControlSource, props.Registro)
    // console.log('TextLabel Name=', props.prop.Name, 'data=', data)
    for (const campo in data) {
      if (campo != 'key_pri')
        Text.value = data[campo] != null ? data[campo] : ''
      // console.log('TextLabel Name=', props.prop.Name, 'Text=', Text.value)
    }
  }


  This.prop.Value = Text.value
  This.Recno = props.Registro


  if (This.onChangeValue) {
    await This.onChangeValue(ref(Styles))
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

  if (typeof Text.value == 'string')
    Text.value = Text.value.trim()

  //if (props.prop.Type == 'text' || props.prop.Type == 'textArea') {
  //  Text.value = Text.value.trim()



  await renderComboBox()
}

/*
//////////////////////////
//Si se cambia de afuera el valor del inputStyle
///////////////////////////////////////
watch(
  () => refInputStyle.value, //This.inputStyle
  (new_val: any, old_val: any) => {
    //  if (This.Recno != props.Registro)
    //    return
    console.log(Id, This.Recno, props.Registro, 'watch inputStyle name est_cpy ', 'Text=', Text.value, 'Old=', InputStyle.color, 'New=', new_val.color)

    if (This.Recno == props.Registro) {
      for (const prop in new_val) {
        if (new_val[prop] != InputStyle[prop]) {
          InputStyle[prop] = new_val[prop]
        }

      }
    }
  },
  { deep: true }
);

*/

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

  if (Styles.inputStyle.width == 'auto' && props.prop.Type.toLowerCase() != 'checkbox')
    Styles.inputStyle.width = '99%'

  if (props.prop.Type.toLowerCase() == 'checkbox')
    Styles.inputStyle.width = '20px'


  if (Styles.inputStyle.maxWidth == 'auto')
    Styles.inputStyle.maxWidth = '99%'

  if (Styles.inputStyle.maxHeight == 'auto')
    Styles.inputStyle.maxHeight = '99%'

  if (props.prop.Type == 'number')
    Styles.inputStyle.textAlign = 'right'

  Text.value = props.prop.Value

  if (This.prop.BaseClass == "imgButton")
    Type.value = 'imgButton'

  await readCampo()
  // console.log('Init TextLabel Name=', props.prop.Name, 'Text=', Text.value)
  //This.recnoChange()

}

init();
</script>
<style scoped>
.button {
  background-color: bind("props.style.backgroundColor")
}
</style>
