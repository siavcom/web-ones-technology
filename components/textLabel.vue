<template>
  <div v-if="prop.Visible" class="divi" :style="prop.Style">
    <div class="mensajes">
      <span class="etiqueta" v-if="prop.textLabel">{{ prop.textLabel + " " }}</span>
      <!--div v-if="prop.Type == 'checkBox'" class="prop.Type" v-text="prop.Value==1? '(x)':'( )'" /-->
        <input v-if="prop.Type == 'checkBox'" :class="prop.Type" readonly="true" type="checkBox" :checked="checked" />
        <input v-else readonly="true" :class="prop.Type" :v-show="Text > ' '" v-model="Text" />
    </div>
  </div>
</template>


<script setup lang="ts">
// Ult. Modificacion  
// 30/Sep/2022.- Fdo Cuadras


import {
  //  defineExpose,
  ref,
  reactive,
  // computed,
  //  onUnmounted,
  watch,
  //  toRefs,
  // toRefs,
  //toRef,
  // onMounted,
  // onBeforeUpdate,
  // onUpdated,
  // onUnmounted,

} from "vue";
const emit = defineEmits(["update"]);
//import { localDb } from "@/classes/LocalDb";  // manejo del indexedDb

///////////////////////////////////////
// Propiedades del componente reactivas
////////////////////////////////////
const props = defineProps<{
  Recno: 0;
  Show: false;
  prop: {
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
    RowSourceType: 0; //1-Value, 2-Alias, 3-Local SQL 5-Array
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
  db: any
}>();

const Value = ref(props.prop.Value)

const Text = ref('')
const Status = ref(props.prop.Status)
const Caption = ref(props.prop.Caption)
const Aling = ref('left')

//Recno.value = 0
//defineExpose({ Caption });
//const This = Component.value
const columnas = reactive([{}]); // tiene todos los renglones del comboBox
Status.value = 'I'
const checked=ref(false)
////////////////////////////////
// Formateador de numeros 
/////////////////////////////

const toNumberStr = (n) => {
  let Style = props.prop.Style
  let Currency = props.prop.Currency
  let MinimumFractionDigits = props.prop.Decimals
  /* if (!Style) Style = 'decimal'
  if (!Currency) Currency = 'MXN'
  if (!MinimumFractionDigits) MinimumFractionDigits = 2*/
  //console.log('textLabel Digits===>',props.prop.Name,props.prop.Decimals,MinimumFractionDigits)



  return new Intl.NumberFormat('en-US', {
    style: Style,
    currency: Currency,
    minimumFractionDigits: MinimumFractionDigits,
    maximumFractionDigits: MinimumFractionDigits,
  }).format(n);
};



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
const asignaResultado = (valor: string) => {


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


  for (let i = 0; i < columnas.length; i++) {
    if (valor == columnas[i].value) { // El objeto columna tiene dos campos value y text
      Text.value = columnas[i]['text'][0];  // asigna el resultado a mostrar
    }
  }

  emitValue()
}

//////////////////////////////////////////////////////
// Renderizado del combo box
/////////////////////////////////////////////////////
const renderComboBox = async () => {
  // 30/Sep/2022 se aumenta la linea 
  if (props.prop.RowSourceType == 0) return;

  if (props.prop.Status == 'I') return;

  if (props.prop.ColumnCount == 0) {
    emitValue()
    return
  };
  if (props.prop.RowSourceType == 0) return;
  if (!props.prop.RowSource || props.prop.RowSource.length == 0) return;

  //ColumnWidth(props.prop.ColumnWidths) // asigna tama??o de columnas

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



    case 2: {
      // Alias

      const Values = eval("[" + props.prop.RowSource + "]");  // generamos un arreglo con los valores
      // Obtenemos la vista sql
      const pos = Values[0].indexOf(".");

      if (pos == 1) return; // si no hay definida vista
      // el primer elemento tiene el nombre de la tabla local, se obtiene y se quita del primer elemento
      const nom_tab = Values[0].slice(0, pos); // obtenemos el nombre de la tabla
      Values[0] = Values[0].slice(pos); // Quitamos el nombre de la tabla (similar al left se le indica de que posicion hacia adelante)

      //        const resultado = await selectLocalDb(nom_tab);// hacemos select a la tabla local
      // aqui me quede (arreglar lectura por alias)
      const data = await props.db.value.localSql(props.prop.RowSource)

      break;
    }
    case 3: {
      //console.log('ComboBox db sql =======>>', sql.value)
      const data = await props.db.value.localSql(props.prop.RowSource)
      // Generamos el arreglo 
      for (const nom_obj in data[0]) {
        const renglon = []
        for (let ren = 0; ren < data.length; ren++) {
          renglon.push(data[ren][nom_obj])

        }
        //console.log('ComboBox renglon',renglon)

        val_col.push(renglon)
      }
      /*
            console.log('ComboBox sql No registros',val_col[0].length)
      
            for (let i=0 ;i<val_col[0].length ;i++) 
                console.log('ComboBox sql resultado =>', data.length,val_col[0][i],val_col[1][i])
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

  // recorremos todas los renglones si es solo un columna val_col.length si no 
  // toma el tama??o del arreglo solo de la primer columna
  var valor = null

  if (props.prop.ControlSource > ' ')  // Si Hay controSource asigna el valor leido
    valor = Text.value // null
  //valor = Value.value // null

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

      columnas[ren] = {  // asignmos el valor segun el BoundColumn
        value: val_col[BoundColumn][ren],
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
  // console.log('textLabel render', Text.value)

  asignaResultado(valor)
  //emitValue()
};

/*
const readCampo = async () => {
  if (props.Recno > 0 && props.prop.ControlSource.length > 2) {
    Text.value = await props.db.value.readCampo(props.prop.ControlSource, props.Recno)
    if (props.prop.Type == 'number') {
      Text.value = toNumberStr(Text.value);
    
    }
  }


  renderComboBox()

}
*/

const readCampo = async () => {
  if (props.Recno > 0 && props.prop.ControlSource.length > 2) {
    const data = await props.db.value.readCampo(props.prop.ControlSource, props.Recno)
    for (const campo in data) {
      if (campo != 'key_pri') Text.value = data[campo]
    }
  }
  if (props.prop.Type == 'number') {
    Text.value = toNumberStr(Text.value);
  }
  if (props.prop.Type == 'checkBox'){
     checked.value=Text.value==1 ? true:false
    //console.log('checkBox ReadValue =',props.prop.Name,Text.value)
  }




  renderComboBox()
}

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

    if (props.Show) readCampo()
  },
  { deep: false }
)


watch(
  () => props.Recno,
  (new_val, old_val) => {
    if (old_val!=new_val) readCampo()
   
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

  //console.log('TextLabel propiedades ID',props.Recno)
  readCampo()
  //readCampo()

}

init();
</script>

<!-- Add "scoped" attribute to limit CSS to this component only 
<style scoped> 
input[ class="number"] {
  text-align: right;
}
</style>


<style scoped> 
input.number {
 
  text-align: right;
}
</style>



-->
