<template>
  <div :id="Id + '_component'" v-show="prop.Visible" class="divi" :style="style" @click.middle.stop="middleClick()">

    <div :id="Id + '_labelText'" class=" etiqueta" v-if="prop.BaseClass != 'imgButton' && props.prop.Caption > ' '"
      :style="captionStyle">{{ prop.Caption +
        " " }}</div>


    <input :id="Id + '_checkBox'" v-if="prop.Type == 'checkBox'" class="checkbox" type="checkBox"
      :style=Styles.inputStyle :checked="checkValue" readonly="true" :disabled=This.prop.Disabled />

    <input :id="Id + '_json'" v-else-if="prop.Type == 'json'" class="text" value='Data' :style="Styles.inputStyle"
      readonly="true" :disabled=This.prop.disabled />
    <input :id="Id + '_date'" v-else-if="prop.Type == 'date'" class="text" type="date" :style="Styles.inputStyle"
      readonly="true" :disabled=This.prop.disabled v-model="Text" />
    <input :id="Id + '_datetime'" v-else-if="prop.Type == 'datetime'" class="text" type="datetime-local"
      :style="Styles.inputStyle" :format="This.prop.Format" readonly="true" :disabled=This.prop.Disabled
      v-model="Text" />
    <button class='button' :id="Id + '_imgButton'" v-else-if="prop.BaseClass == 'imgButton'" :style="Styles.inputStyle">
      <img class="img" fit='inside' :src="prop.Image" :alt="prop.Value" />
      <label v-if="Text != null && Text.length > 0"
        :style="{ 'word-wrap': 'break-word', 'font-size': style.fontSize, 'color': style.color }">{{ Text }}</label>
    </button>
    <input :id="Id + '_text'" v-else v-show="prop.Visible && Text != null" type="text" :style="Styles.inputStyle"
      readonly="true" :disabled=This.prop.Disabled v-model="Text" />

    <div v-if="Type != 'imgButton' && prop.Image > '    '">
      <nuxt-img :id="Id + '_imagen'" v-if="prop.BaseClass == 'imgButton' && prop.Image > '    '" class="img"
        :src="prop.Image" />
    </div>

    <textLabel :id="Id + '_component_' + compMain" v-for="(compMain) in This.main" :key="compMain"
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
const captionStyle = reactive({ ...Este.captionStyle })
const inputStyle = reactive({ ...Este.inputStyle })
const divStyle = reactive({ ...Este.style })
//23/Enero/2026 - let noRegistro = ref(0)

// 30/Oct/2025
const Recno = props.Registro
const readOnlyInputStyle = reactive({ ...This.readOnlyInputStyle })
// Fin 30/Oct/2025

const Styles =
{
  captionStyle: captionStyle,
  inputStyle: inputStyle,
  style: divStyle
}

//const Id = This.prop.Name + props.Registro.toString().trim()

const Id = This.prop.Name + '_' + Math.floor(Math.random() * 1000).toString() //props.Registro.toString().trim()
This.Id = Id

//const key = ref(0)

const Value = ref(props.prop.Value)

const Text = ref(null)
const Status = ref(props.prop.Status)

const columnas = reactive([]); // tiene todos los renglones del comboBox
Status.value = 'I'
const checkValue = ref(false)
const Type = ref(props.prop.Type.toLowerCase())

let Render = false

let sw_ReadCampo = false

/*
const captionStyle = reactive(This.captionStyle)
const InputStyle = reactive({ ...props.inputStyle })
const refInputStyle = toRef(This.inputStyle)
*/



/////////////////////////////////////////////////////////////////////
// emitValue
// Descripcion: emite hacia el componente padre el nuavo valor asignado
/////////////////////////////////////////////////////////////////
const emitValue = async () => {

  Status.value = 'A'
  emit("update") // emite un update en el componente padre
  // console.log('textLabel emit Value ====>', props.prop.Value, props.prop.Status)
  if (This.onChangeValue) {
    //  console.log('textLabel emit onChangeValue ', This.prop.Name, This.prop.Value)
    await This.onChangeValue(ref(Styles))
  }

  return true;
};

//////////////////////////////////////////////////////
// Asigna Resultado
/////////////////////////////////////////////////////
const asignaResultado = async (valor?: string) => {
  // console.log('textLabel asignaResultado ', props.prop.Name, valor)
  // if (props.prop.Status == 'I') return
  // if (props.prop.ColumnCount == 0) return;

  //onsole.log('textLabel Name=', props.prop.Name, 'asignaResultado props.prop.RowSource=', props.prop.RowSource, typeof props.prop.RowSource)

  // RowSource puede ser array

  if (Text.value === undefined || Text.value === null) {
    switch (props.prop.Type.toLowerCase()) {
      case 'number':
        Text.value = 0
        break;
      case 'checkbox':
        Text.value = 0
        checkValue.value = false
        break;
      case 'date':
        Text.value = '1900-01-01' //T00:00:00'
        break;
      case 'datetime':
        Text.value = '1900-01-01T00:00:00'
        break;
      default:
        Text.value = ''
    }

  }

  switch (props.prop.Type.toLowerCase()) {
    case 'number':
      Text.value = await numberFormat(+Text.value, props.prop.Currency, props.prop.MaxLength, props.prop.Decimals)
      break;
    case 'date':
      Text.value = Text.value.slice(0, 10)
      break;
    case 'datetime':
      //Text.value = toNumberStr(Text.value);
      Text.value = Text.value.slice(0, 16)
      break;
    case 'checkbox':

      let check = Text.value == 0 ? false : true
      if (checkValue.value != check) {
        checkValue.value = check
      }
      emit("update:checkValue", checkValue)
      // console.log('checkBox TextLabel Name=', This.prop.Name, 'checkValue=', checkValue.value)
      break;
  }
  if (props.prop.RowSourceType == 0 ||
    typeof props.prop.RowSource == 'object' ? props.prop.RowSource.length < 1 : props.prop.RowSource.trim().length < 3) {
    return;
  }

  valor = Text.value



  const BoundColumn =
    (!props.prop.BoundColumn ? 1 : props.prop.BoundColumn) - 1; // Si no hay valor de columna donde asignar el valor
  // recorre todo los renglones en columnas

  // console.log("AsignaResultado  valor,columnas ======>",valor, columnas)


  if (props.prop.RowSourceType < 1) return
  // if (props.prop.Status == 'I') return
  if (props.prop.ColumnCount == 0) return

  if (!props.prop.RowSource || props.prop.RowSource.length < 2 || props.prop.RowSource == undefined) {
    return;
  }


  if (props.prop.RowSourceType > 0 && props.prop.ColumnCount > 0 &&
    props.prop.RowSource.length > 0 && !Render) {
    await renderComboBox()
    // console.log('Render 1) textLabel Name=', props.prop.Name, 'Text.value=', Text.value, 'Value=', This.prop.Value, 'columns=', columnas)


  }

  ///////////////////////// Se aumento 5/Feb/2024 //////////////////////
  let found = false
  // console.log('1) textLabel Name=', props.prop.Name, 'Text.value=', Text.value, 'Value=', This.prop.Value, 'columns=', columnas)

  //   console.log('textLabel Name=', props.prop.Name, 'columns=', columnas)
  for (let i = 0; columnas.length > 0 && i < columnas.length && !found; i++) {
    //console.log('1) Buscando Valor TextLabel comboBox Name=', props.prop.Name, 'i=', i, 'columnas=', columnas[i].value, 'Value=', valor)

    //    if ((typeof columnas[i].value == 'string' && typeof Value.value == 'string' && Value.value.trim() == columnas[i].value.trim()) ||
    //        Value.value == columnas[i].value) {



    if (columnas[i].value) {
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
  }
  if (!found && columnas.length > 0 && columnas[0].text) { // No se encontro el valor , asignara el primer valor
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
  // if (props.prop.Status == 'I') return
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
      data = await SQLExec(props.prop.RowSource, 'MEMVAR') //This.Form.db.
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
  // else
  //   console.warn('TextLabel combobox Name=', This.prop.Name, ' No data in ', This.prop.ControlSource)

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


  //console.log('2) textLabel renderComboBox', This.Name, 'Registro=', props.Registro, 'Valor=', valor, 'ControlSource=', props.prop.ControlSource)

  //30/Oct/2025
  //  asignaResultado(valor)

  //  ** ojo falta el multi select
  /*
  if (props.prop.MultiSelect) { // Si es multi selectccion generaramos el arreglo
    List.value = eval('[' + Value.value.trim() + ']')
    Value.value = data
    emit("update:Value", Value.value)
    Valid.value = true

  }
  */
  Render = true

}





// Leemos el valor segun el recno


const readValue = async (on_Mounted?: boolean) => {

  //  if (This.BaseClass == 'Column' && This.Parent.Recno > 0 && This.Parent.Recno != props.Registro)
  //    return


  if (!on_Mounted && This.BaseClass == 'Column' && This.Parent.Recno > 0 && This.Parent.Recno != props.Registro)
    return
  //console.log('2) readValue This.prop.Name=', This.prop.Name, 'This.Parent.Recno=', This.Parent.Recno, 'props.Registro=', props.Registro)


  if (props.Registro > 0 && props.prop.ControlSource.length > 2) {
    console.log('TextLabel Name=', props.prop.Name, 'Recno=', props.Registro)
    const data = await readCampo(props.prop.ControlSource, props.Registro)
    sw_ReadCampo = true
    for (const campo in data) {
      if (campo != 'key_pri') {
        Text.value = data[campo] != null ? data[campo] : ''
        This.prop.Value = Text.value
      }
      // console.log('TextLabel Name=', props.prop.Name, 'Text=', Text.value)
    }
  }

  await asignaResultado()
  sw_ReadCampo = false

  return

}


watch(
  () => This.prop.RowSource,
  async (new_val, old_val) => {

    if (This.BaseClass == 'Column' && This.Parent.Recno > 0 && This.Parent.Recno != props.Registro)
      return
    // renderComboBox()
    await readValue()
    //await asignaResultado()
  },
  { deep: false }
)

watch(
  () => This.prop.RowSourceType,
  async (new_val, old_val) => {

    if (This.BaseClass == 'Column' && This.Parent.Recno > 0 && This.Parent.Recno != props.Registro)
      return
    //renderComboBox()
    await asignaResultado()
  },
  { deep: false }
)


watch(
  () => props.Registro,
  async (new_val, old_val) => {
    if (This.BaseClass == 'Column' && This.Parent.Recno > 0 && This.Parent.Recno != props.Registro)
      return


    if (old_val != new_val && new_val > 0) {
      await readValue()
    }
    if (new_val == 0)
      Text.value = ''

  },
  { deep: false }
)

watch(
  () => This.prop.ControlSource,
  async (new_val, old_val) => {
    if (This.BaseClass == 'Column' && This.Parent.Recno > 0 && This.Parent.Recno != props.Registro)
      return
    // console.log('====================1) textLabel watch ControlSource Name=', This.prop.Name)
    //  console.log('watch controlSource', new_val, old_val)
    await readValue()

  },
  { deep: false }
)

////////////////////////////////////////
// Si se cambia This.prop.Value desde afuera del componente 
///////////////////////////////////////
watch(
  () => This.prop.Value, //This.prop.Value, //props.prop.Value, //Value.value,
  async (new_val: any, old_val: any) => {


    if (sw_ReadCampo) // || new_val == Value.value)
      return

    if (This.BaseClass == 'Column')//&& This.Parent.Recno != props.Registro)
      return

    // si se cambia el valor desde afuera del componente, actualiza su valor interno y el campo en la base de datos
    //  key.value++
    Text.value = new_val
    if (props.Registro > 0 && props.prop.ControlSource.length > 2)
      await updateCampo(new_val, props.prop.ControlSource, props.Registro)
    //  key.value--
    asignaResultado()
    return
  },
  { deep: true }
);

////////////////////////////////////////////////////////////////////
// change This.prop.ReadOnly
// Change background color of input whene ReadOnly
// 30/Oct/2025
/////////////////////////////////////////////////////////////////
watch(
  () => This.prop.ReadOnly, //props.prop.Value, //Value.value,
  async (new_val: boolean, old_val: boolean) => {
    if (This.BaseClass == 'Column' || Recno != props.Registro)
      return

    ReadOnly() //

  },
  { deep: false }
);

////////////////////////////////////////////////////////
// Cambia el estilo del input segun si es de solo lectura
////////////////////////////////////////////////////////
const ReadOnly = () => {
  if (This.prop.ReadOnly) {
    //      Styles.inputStyle = { ...This.readOnlyInputStyle }

    Styles.inputStyle.background = readOnlyInputStyle.background
    Styles.inputStyle.opacity = readOnlyInputStyle.opacity
  }
  else {
    //Styles.inputStyle = { ...This.inputStyle }
    Styles.inputStyle.background = This.inputStyle.background
    Styles.inputStyle.opacity = This.inputStyle.opacity
  }
}


/////////////////////////////////////////
// Metodo init Vfp
// Aqui debemos de asignar todos los Valores inciales del componente
// A pesar que nom_nom se pasa por referencia, se tuvo que definir en props para qu fuera reactivo
// Se tiene que emitir para que cambie el Valor en el template
/////////////////////////////////////////
onMounted(async () => {
  //const init = async () on_mounted=true
  if (Styles.inputStyle.width == 'auto' && props.prop.Type.toLowerCase() != 'checkbox')
    Styles.inputStyle.width = '99%'

  if (props.prop.Type.toLowerCase() == 'checkbox') {

    Styles.inputStyle.width = '13px'
    Styles.inputStyle.borderRadius = '50%';
    Styles.captionStyle.alignContent = "center";

  }
  if (Styles.inputStyle.maxWidth == 'auto')
    Styles.inputStyle.maxWidth = '99%'

  if (Styles.inputStyle.maxHeight == 'auto')
    Styles.inputStyle.maxHeight = '99%'

  if (props.prop.Type == 'number')
    Styles.inputStyle.textAlign = 'right'

  Text.value = props.prop.Value

  if (This.prop.BaseClass == "imgButton")
    Type.value = 'imgButton'


  //await renderComboBox()

  console.log('onMounted 1) textLabel Name=', This?.prop?.Name, 'props.Registro=', props.Registro)

  await readValue(true)
  /*
    if (This.prop.ControlSource.length > 2) {
      const pos = This.prop.ControlSource.indexOf(".") + 1;
      if (pos > 1) {
  
        const tabla = This.prop.ControlSource.slice(0, pos - 1).trim(); // obtenemos el nombre de la vista (queda hasta el punto)
  
     
        //23/Enero/2026 noRegistro = toRef(This.Sql.View[tabla], 'recno')
        
  
      }
    }
  
  */
  await This.afterMounted()

  // console.log('Init TextLabel Name=', props.prop.Name, 'Text=', Text.value)
  //This.recnoChange()

})


</script>

<style scoped>
.button {
  background-color: bind("props.style.backgroundColor")
}

.checkbox {
  text-align: center;
  appearance: none;
  height: 31px;
  width: 31px;
  padding: 6px;
  /* adjust this to control the space between border and background */
  margin-right: 12px;
  border: 3px solid #D6D6D6;
  border-radius: 50%;
  cursor: pointer;
  background-color: #f2f2f2;
  background-clip: content-box;
  box-sizing: border-box;
  background: radial-gradient(circle at center, #f2f2f2 50%, transparent 50%);

}

.checkbox:checked {
  background-color: black;
  background: radial-gradient(circle at center, black 50%, transparent 50%);
}
</style>
