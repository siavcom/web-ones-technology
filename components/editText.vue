<template>
  <!--Se necesita el siguiente div para que funcione el siguiente v-show-->
  <div class="divi" v-bind:style="Style">
    <div class="mensajes" v-show="This.prop.Visible">

      <span class="etiqueta" v-if="prop.textLabel">{{ prop.textLabel + " " }}</span>

      <!--mensajes de error y tooltip
    -->
      <!--div class="component" :style="prop.componentStyle"-->
      <!--number 
      @input.self="onInput" -->

      <!--number--> 

        <input v-if="prop.Type == 'number'" class="number" type="text" :style="componentStyle" ref="Ref"
        :disabled="prop.Disabled" :min="prop.Min" :max="prop.Max" v-model="currentValue[focusIn]" :readonly="prop.ReadOnly"
        :placeholder="prop.Placeholder" :tabindex="prop.TabIndex" @focusout="onBlur" @keypress="keyPress($event)"
        @focus="onFocus" @input.self="onInput" pattern="([0-9]{1,15}).([0-9]{1,5})">

      <!--spinner-->
      <input v-else-if="prop.Type == 'spinner'" class="number" type="number" :style="componentStyle" ref="Ref"
        :disabled="prop.Disabled" :min="prop.Min" :max="prop.Max" v-model="This.prop.Value" :readonly="prop.ReadOnly"
        :placeholder="prop.Placeholder" :tabindex="prop.TabIndex" @keypress="keyPress($event)" @focusout="onBlur"
        @focus="onFocus" @input="This.prop.Valid=false">

      <!--textArea" -->
      <div v-else-if="prop.Type == 'textArea'" :style="componentStyle">
        <textarea  class="textArea" :style="componentStyle" ref="Ref"
        v-model="This.prop.Value" 
        :readonly="prop.ReadOnly" 
        :disabled="prop.Disabled" 
        :placeholder="prop.Placeholder"
        :tabindex="prop.TabIndex" type="textArea"
        :rows="componentStyle.rows" :cols='componentStyle.cols'
        @keypress="keyPress($event)" @focusout="focusOut" @focus="onFocus"></textarea>
      </div>

        <!--fecha  -->
      <input v-else-if="prop.Type == 'date'" class="date" :style="componentStyle" ref="Ref" type="date"
        v-model="currentValue" :disabled="prop.Disabled" :readonly="prop.ReadOnly" :placeholder="prop.Placeholder"
        :tabindex="prop.TabIndex" @keypress="keyPress($event)" @focusout="focusOut" @focus="onFocus">
      <!--checkBox-->
      <input v-else-if="prop.Type == 'checkBox'" class="checkBox" :type="prop.Type" :style="componentStyle" ref="Ref"
        :readonly="prop.ReadOnly" :disabled="prop.Disabled || prop.ReadOnly" :tabindex="prop.TabIndex"
        @change="change" :checked="checkValue" @focusout="focusOut" @focus="onFocus">

      <!--Si es texto 
            :maxlength="prop.MaxLength" 
            :size="prop.MaxLength"
      -->
      <input v-else class="text" ref="Ref" :style="componentStyle" v-model.trim="Value" :readonly="prop.ReadOnly"
        :disabled="prop.Disabled" :maxlength="prop.MaxLength" :size="prop.MaxLength" :placeholder="prop.Placeholder"
        :tabindex="prop.TabIndex" :type="prop.Type" v-on:keyup.enter="$event.target.nextElementSibling.focus()"
        @keypress="keyPress($event)" @focusout="focusOut" @focus="onFocus">

      <span class="tooltiptext" v-if="prop.ToolTipText.length > 0" v-show="ToolTipText && prop.Valid">{{
        prop.ToolTipText
      }}</span>
      <span class="errorText" v-show="ShowError && prop.ErrorMessage.length > 1">{{ prop.ErrorMessage }}</span>
      <!--/div--> <!--fin class=component -->
    </div>
  </div>
</template>



<script setup lang="ts">
import component from 'vue3-table-lite/ts';


//import {format} from "date-fns"

/*
import {
  //  defineEmits,
  //  defineProps,
  //  defineExpose,
  ref,
  reactive,
  //  onUnmounted,
  watch,
  // toRefs,
  //toRef,
  // onMounted,
  // onBeforeUpdate,
  // onUpdated,
  // onUnmounted,

} from "vue" */
//import { receiveMessageOnPort } from "worker_threads";
const emit = defineEmits(["update", "update:Value", "update:currentValue[0]","update:currentValue[1]", "update:Valid", "update:Status", "update:Key", "update:Focus", 'customChange']) //, "update:ShowError", "update:Ref","update:Recno",

//import { localDb } from "@/classes/LocalDb";  // manejo del indexedDb

///////////////////////////////////////
// Propiedades del componente reactivas
// Notas : 
//  Registro se necesita porque cuando se tiene un  grid con 
//  muchos componentes, c/componente Vue tiene su propio registro,
//  el Recno pertenece al los componentes  de captura  del ThisForm  
////////////////////////////////////
const props = defineProps<{
  //Recno: number;
  Registro: number;  // Se pone para el manejo de grid
  // Show: true;
  // Component: null;
  prop: {
    This: null;
    ToolTipText: string;
    View: "";
    Field: "";
    Value: string;
    Placeholder: "";
    Format: "";
    InputMask: "";
    MaxLength: 0;
    ReadOnly: false;
    Disabled: boolean;
    Tag: "";
    Valid: true;
    Capture: true;
    Name: string;
    textLabel: "";
    Type: string;
    Visible: true;
    ControlSource: string;
    Status: string;
    ErrorMessage: '';
    ShowError: boolean;
    TabIndex: number;
    Key: string;
    BaseClass: "EditText";
    Grid: false;
    Autofocus: false;
    Min: number;
    Max: number;
    Focus: boolean;
    First: false;
    Notation: 'standard'; //standard,scientific,enginniering,compact
    Style: string; // decimal, currency,percent,unit
    Currency: 'MXN'; //USD,EUR,MXN
    CurrencyDisplay: 'code'; //to use the ISO currency code.
    Decimals: number;
    Nu: 'arab';//
    componentStyle: {
      background: "white";
      padding: "5px"; // Relleno
      color: "#b94295";
      width: "200px";
      height: "30px";
      fontFamily: "Arial";
      fontSize: "13px"; // automaticamente vue lo cambiara por font-size (para eso se utiliza la anotacion Camello)
      textAlign: string;
      cols:"100";
      rows:"5";
    };


    //    SetFocus:false;
    //compAddress: any;
  };

  style: {
    background: "white";
    padding: "5px"; // Relleno
    color: "#b94295";
    width: "auto";
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
//const Recno = ref(0)
const Valid = ref(props.prop.Valid)
Valid.value = true
const Ref = ref(null) // Se necesita paratener referencia del :ref del componente  ref(props.prop.Ref)
const RefInput = ref(null) // Se necesita paratener referencia del :ref del componente  ref(props.prop.Ref)

const Status = ref(props.prop.Status);
const ToolTipText = ref(true)
Status.value = 'I'
const Key = ref(props.prop.Key)
const Focus = ref(props.prop.Focus)
// Focus.value = false
const First = ref(props.prop.First)
const ReadOnly = ref(props.prop.ReadOnly)

var oldVal = Value.value
const ShowError = ref(false) //ref(props.prop.ShowError)
const checkValue = ref(false)


const Style = reactive(props.style)
const componentStyle = reactive(props.prop.componentStyle)
const focusIn = ref(0)
const currentValue = ref([]) // Valor para capturar
const outFocus = ref(true)

currentValue.value[0] = ''
////////////////////////////////
// Formateador de numeros 
/////////////////////////////
/*
const Style=ref(props.prop.Style)
if (!Style.value) Style.value='decimal'

const Currency=ref(props.prop.Currency)
if (!Currency.value) Currency.value='MXN'

const MinimumFractionDigits=ref(props.prop.Decimals) 
if (!MinimumFractionDigits.value) MinimumFractionDigits.value=2

const type = ref('text');
const toNumberStr = (n) => {
  return new Intl.NumberFormat('en-US', {
    style: Style.value,
    currency: Currency.value,
    minimumFractionDigits: MinimumFractionDigits.value,
    maximumFractionDigits: MinimumFractionDigits.value,
   
   
    
  }).format(n);
};
*/

const typeNumber = ref('text');

const toNumberStr = async (n: number) => {
  let Style = props.prop.Style
  let Currency = props.prop.Currency
  let MinimumFractionDigits = props.prop.Decimals
  /* if (!Style) Style = 'decimal'
  if (!Currency) Currency = 'MXN'
  if (!MinimumFractionDigits) MinimumFractionDigits = 2*/
  //console.log('textLabel Digits===>',props.Name,props.prop.Decimals,MinimumFractionDigits)

  return new Intl.NumberFormat('en-US', {
    // style: Style,
    // currency: Currency,
    notation: 'standard'
    // Para redondeo
    //maximumFractionDigits: 2,
    //  roundingIncrement: 5,


  }).format(n);
};




/*
async function toNumberString(num) {
  if (Number.isInteger(num)) {
    return num + ".0"
  } else {
    return num.toString();
  }
}

*/

// Formateo de valores
const onInput = ({ target }) => {

  if (target.value == '0') {
    Value.value = 0
    return
  }

  const valor = target.value.replace(/[^0-9.]/g, "").trim()  // solo admite numeros y punto decimal


  if (valor.length == 0) {
    target.value = oldVal
    return
  }
  else
    target.value = valor

  const len = target.value.length
  //Value.value = parseInt(target.value);
  let punto = target.value.indexOf('.');
  /*
     let count = 0;
     while (p !== -1) {
       count++;
       p = target.value.indexOf('.', p + 1);
     }
 */
  // busca si se digito mas de un punto
  if (punto !== -1 && target.value.indexOf('.', punto + 1) !== -1) {
    target.value = target.value.substr(0, len - 1) // quitamos el segundo punto
  }
  currentValue.value[1] = parseFloat(target.value)
  //Value.value = parseFloat(target.value)
  //   console.log('onInput number',target.value)
  oldVal = target.value
}


const onBlur = async () => {
  Value.value = +currentValue.value[1]
  typeNumber.value = 'text';
  focusOut()
};




/*  position
static	Elements renders in order, as they appear in the document flow. This is default.
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
// Descripcion: emite hacia el componente padre el nuevo valor asignado
/////////////////////////////////////////////////////////////////
const emitValue = async () => {
  This.prop.Status = 'A'
  outFocus.value = true
  Status.value = 'A'

  let Valor = ''

  if (props.prop.Type == 'checkBox') {
    
   //  checkValue.value = Value.value == 1 ? true : false
    await This.interactiveChange()
  }


  if (props.prop.Type == 'number') {
     if (Valor != currentValue.value[1]) {
      Valor=Value.value
      currentValue.value[1] = Value.value.toString()
      currentValue.value[0] = await numberFormat(Value.value, props.prop.Currency, props.prop.MaxLength, props.prop.Decimals)
    }

  }

  if (props.prop.Type == 'date') {
    Valor = await await stringToDate(Value.value)
    if (Valor != currentValue.value[1])
      currentValue.value[1] = Valor
  }

  //nextTick(function () {
  //emit("update:formatValue", currentValue.value[0]); // actualiza el valor Value en el componente padre
  emit("update:currentValue[0]", currentValue.value[0]); // actualiza el valor Value en el componente padre
  emit("update:Value", Value.value); // actualiza el valor Value en el componente padre
  emit("update:Status", 'A'); // actualiza el valor Status en el componente padre
  emit("update:Valid", Valid.value)
  // emit("update:Recno", props.Registro) // se emite en el Recno actual al ThisForm
  // emit("update") // emite un update en el componente padre
  // })
  ToolTipText.value = true  // Activamos el ToolTipText
  ShowError.value = false  // Desactivamos mensaje de error
  return true
}


/////////////////////////////////////////////////////////////////////
// Numeros
// Descripcion: Cuando pierda el foco el componente , actualizamo el valor en cursor local
/////////////////////////////////////////////////////////////////
const Numeros = async ($event) => {

  let stringValue = $event.data.toString()
  //x =x.replace(/\D/g, '') 
  //Value.value.split('/\D/g').join('');
  //
  let regex = /^\d*(\.\d{1,2})?$/

  console.log('Numeros Value ====>', Value.value)


  if (!stringValue.match(regex)) {
    let Valor = Value.value
    console.log('Numeros Not match ====>', Value.value, Valor)

    //   Value.value = oldVal

  }
  else {

    // Value.value=+(Valor)

    oldVal = Value.value

  }

}

/////////////////////////////////////////////////////////////////////
// change
// Descripcion: Cuando pierda el foco el componente , actualizamo el valor en cursor local
/////////////////////////////////////////////////////////////////
const change = async () => {
  if (props.prop.ReadOnly) {
    return
  }
  
  console.log('checkBox change 1',checkValue.value,This.prop.Value)

  checkValue.value = !checkValue.value
  if (checkValue.value)
    This.prop.Value = 1
  else
    This.prop.Value = 0

 console.log('checkBox change 2',checkValue.value,This.prop.Value)



    emitValue()


}

/////////////////////////////////////////////////////////////////////
// focusOut
// Descripcion: Cuando pierda el foco el componente , actualizamo el valor en cursor local
/////////////////////////////////////////////////////////////////
const focusOut = async () => {
  focusIn.value = 0  // Perdio el foco
  Status.value = 'P'  //Aqui me quede
  emit("update:Status", 'P')
 // console.log('editBox focusout', This.prop.ControlSource, 'Registro=', props.Registro, 'valor=', Value.value)
/*
  if (props.prop.Type == 'checkBox') {
    Value.value = checkValue.value ? 1 : 0
  }
 */
  if (props.Registro > 0 && props.prop.ControlSource && props.prop.ControlSource.length > 2) {

    // actualiza valor en localDb

    let valor = props.prop.Type == 'number' || props.prop.Type == 'checkBox' ? +currentValue.value[1] : Value.value

    if (props.prop.Type == 'date')
      valor = await dateToString(currentValue.value[1])

    console.log('editBox updateCampo', This.prop.ControlSource, 'valor=', valor)

    Value.value = valor

    // Se quita porque se activa en el watch de This.props.Value se graba el dato
    await This.Form.db.updateCampo(valor, props.prop.ControlSource, props.Registro)

  }

  // Necesita aqui el emit para que refleje los cambios 

  emit("update:Value", Value.value); // actualiza el valor Value en el componente padre

  //  await emitValue()

  if (!This.prop.ReadOnly && !This.prop.Disabled && await This.valid() == false) {
    ShowError.value = true
    This.prop.Valid = false
    Status.value = 'A'  //Aqui me quede
    emit("update:Status", 'A')
    return
  }

  emitValue()
  console.log('EditText Valid', This.prop.Name, 'ShowError=', ShowError.value, 'Status=', This.prop.Status)


  return

};
/////////////////////////////////////////////////////////////////////
// KeyPress
// Descripcion: Cada tecla que se presiona en el input
/////////////////////////////////////////////////////////////////

const keyPress = ($event) => {
  // <input       @keypress="keyPress($event)"
  console.log('KeyPress===>', $event.charCode)

  if ($event.charCode == 13) {
    console.log('=====KeyPress Enter======')
    //$event.charCode = 9
    // window.event.keyCode = 9;
    //const next = $event.currentTarget.nextElementSibling;
    //$event.target.parentElement.nextSibling.children[1].focus()
    //next.focus();
    // emit('tab')
    Key.value = $event.charCode
    emit('customChange', $event.target.value + String.fromCharCode(9))
    $event.dispatchEvent(new KeyboardEvent('keyTab', { 'key': 'a' }));

  } else {
    //    Status.value = 'P'  //Aqui me quede
    //    emit("update:Status", 'P')
    This.prop.Status = 'P'
    Key.value = $event.charCode
  }
}
/*
const focusInput = async () => {
  outFocus.value = false
  RefInput.value.select() //focus() // Hace foco con select

}
*/
/////////////////////////////////////////////////////////////////////
// onFocus
// Descripcion: Cuando se cambie el valor del componente template (Value.value con el teclado),
//              tenemos que emitir hacia el padre el valor capturado (Value.value) y ejecutar el update
/////////////////////////////////////////////////////////////////
const onFocus = async () => {
  //console.log('editText onFocus ', props.Name, props.prop.ReadOnly)
  focusIn.value = 1
  emit("update:currentValue[1]", currentValue.value[1]); // actualiza el valor Value en el componente padre
  ToolTipText.value = false
  ShowError.value = false

  
  return
  /* if (!props.prop.Valid) {    // = false; // old revisar si se necesita
 
     if (props.Registro > 0) {
 
       if (Status.value != 'P') { // actualiza su estatus a proceso
         Status.value = 'P';  // en foco
         emit("update:Status", 'P'); // actualiza el valor Status en el componente padre. No se debe utilizar Status.Value
         emit("update")
       }
 
       //  const data = await This.Form.db.readCampo(props.prop.ControlSource, props.Recno, 'Old')
       readCampo()
     }
   
   }
   */
}

//////////////////////////////////////////
// Lee el campo desde SQL Local
////////////////////////////////////////

const readCampo = async (recno: number) => {
  //  if (recno != props.Recno) Recno.value = recno
  // if (recno != Recno.value) Recno.value = recno
  //  if (Recno.value=0) return

  //  if (This.Recno == 0) return

  if (props.Registro == 0) { // limpia value
    if (props.prop.Type == 'number')
      Value.value = 0
    else
      Value.value = ''

    return
  }
  // console.log('editText readCampo ',props.prop.ControlSource,'Registro=',props.Registro,'Value=',Value.value,currentValue.value[1])

  //  const data = await This.Form.db.readCampo(props.prop.ControlSource, Recno.value)
  const data = await This.Form.db.readCampo(props.prop.ControlSource, props.Registro)
  This.prop.Valid = true // dato valido para que el watch de This.prop.Value no se active
  for (const campo in data) {
    if (campo != 'key_pri') {
      //      This.prop.Valid = false // ya se capturo algo , se apaga Valid
      Value.value = data[campo]

    }
  }
  /*
  if (props.prop.Type == 'number') {
    currentValue.value[1] = await toNumberStr(Value.value)
    
  }

  if (props.prop.Type == 'date') {
    currentValue.value[1] = await stringToDate(Value.value)
   
  }

  // console.log('editText readCampo True', props.prop.ControlSource, 'Registro=', props.Registro, 'Value=', Value.value, currentValue.value[1])
  */
  emitValue()
  return true
}
/*
const changeValue = async (type: boolean) => {

  if (props.prop.Type == 'checkBox') {

    checkValue.value = new_val == 1 ? true : false
    await This.interactiveChange()
    //    emitValue()

  }

  if (props.prop.Type == 'spinner') {
    await This.interactiveChange()
    //    emitValue()

  }
  emitValue()


}
*/
////////////////////////////////////////
// Watchers : Triggers de templates
// Descripcion : Cuando cambia el Value de la propiedad del ControlSource, asigna el Value de
//                la vista a la propiedad de Value de la propiedad
// Notas : Si se tiene en props, se tiene que vigilar el cambio de props.prop.Value


/////////////////////////////////////////////////////////
// watch Value
//  Nota : Si se cambia el valor desde la forma principal, se debe de actualizar en el
//          Componente
//////////////////////////////////////////

// Si se cambia de afuera
watch(
  () =>This.prop.Value, //This.prop.Value, //props.prop.Value, //Value.value,
  async (new_val, old_val) => {
    console.log('EditText Watch Name=', This.prop.Name,
       'prop.Valid =',This.prop.Valid,
       'Status=', This.prop.Status, 
       'Value=', This.prop.Value, 
       'CurrentValue=', currentValue.value[1])

    if (This.prop.Valid) return

    if (props.prop.Type == 'spinner') {
        This.interactiveChange()
        return
    }


    // se cambia en alasql
    //    if (props.Recno > 0 && props.prop.ControlSource && props.prop.ControlSource.length > 2) {

      if (new_val != Value.value)
      Value.value = new_val

    if (!This.prop.Valid && props.Registro > 0 && props.prop.ControlSource && props.prop.ControlSource.length > 2) {
      // actualiza valor en localDb
      const valor = props.prop.Type == 'number' || props.prop.Type == 'checkBox' ? +Value.value : Value.value
      // Actualiza el alaSQL el dato
      Status.value = 'P'

      await This.Form.db.updateCampo(valor, props.prop.ControlSource, props.Registro)

    }
    This.prop.Valid = true
    if (Value.value != new_val)
      Value.value = new_val
    // Necesita aqui el emit para que refleje los cambios 

    // Si existe un error en la validacion del componente padre
    if (await This.valid() == false) {
      ShowError.value = true
      This.prop.Valid = false
      Status.value = 'P'
      emit("update:Status", 'P')
    } else emitValue()

  },
  { deep: true }
)
/* 
   if (This.prop.Valid) // tiene un dato valido
      return


*/
/////////////////////////////////////////////////////////
// watch currentValue
//  Nota : Si se cambia el valor desde la forma principal, se debe de actualizar en el
//          Componente
//////////////////////////////////////////

// Si se cambia de afuera
/*
watch(
  () => currentValue.value[1], //props.prop.Value, //Value.value,
  async (new_val, old_val) => {

    if (props.prop.Type == 'number') {
      Value.value = +new_val
    }

    if (props.prop.Type == 'date') {
      Value.value = await dateToString(new_val)
    }
    console.log('watch currentValue ', new_val,'Value.value=',Value.value)

    await emitValue()

  },
  { deep: false }
)
*/





/*


watch(
  () => Value.value,
  async (new_val, old_val) => {

    if (props.prop.Value != Value.value) {

      if (props.prop.Type == 'checkBox') {

        checkValue.value = new_val == 1 ? true : false
        await This.interactiveChange()
        emitValue()

      }

      if (props.prop.Type == 'spinner') {
        await This.interactiveChange()
        emitValue()

      }
      if (props.prop.Type == 'number') {
        currentValue.value[1] = toNumberStr(Value.value)
        emitValue()
      }


    }



  },
  { deep: false }
)

*/


////////////////////////////////////////
// ControlSource
///////////////////////////////////////
watch(
  () => props.prop.ControlSource, //props.prop.ControlSource,
  (new_val, old_val) => {
    if (new_val != old_val) {
      //  if (props.Recno > 0 && new_val.trim().length) {
      if (props.Registro > 0 && new_val.trim().length) {

        readCampo(props.Registro)
      }
    }

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
  (new_val, old_val) => {
    // if (Recno.value != props.Registro)
    //   Recno.value = new_val

    if (new_val == 0) {
      Value.value = props.prop.Type == 'number' ? 0 : ''
      emitValue()
      return

    }
    if (new_val != old_val
      && props.prop.ControlSource > ' '
      && props.Registro > 0) {
      //console.log('watch Registro EditBox ', This.prop.Name, 'new_val=', new_val, 'This.Reco=', This.Recno)
      readCampo(new_val)
    }

  },
  { deep: false }
);

/*
////////////////////////////////////////
// Recno
// Nota: Lee de la base de datos local segun el valor de recno
///////////////////////////////////////
watch(
  () => props.Recno,
  (new_val, old_val) => {

    if (props.prop.ControlSource > ' ') {
      if (new_val==0){
        Value.value=props.prop.Type=='numeric'? 0 : ''
        emitValue()
        return
      }

    }
  },
  { deep: false }
);
*/


////////////////////////////////////////
// Hacer el set focus 
///////////////////////////////////////
watch(
  () => This.prop.Focus, //props.prop.Focus,
  (new_val, old_val) => {
    if (!props.prop.Focus) return
    console.log('EditText Set Focus', This.prop.Name)
    //Ref.value.focus()
    Ref.value.select()
    Focus.value = false
    emit("update:Focus", false)
  },
  { deep: false }
)
/*
///////////////////////////////////////////////
// Cuando cambia el estatus de Inicial a Activo, emite valores  
///////////////////////////////////////////////

watch(
  () => props.prop.Status,
  (new_val, old_val) => {
    if (new_val==old_val)
       return
    if (new_val == 'A' && old_val == 'I') {
      emitValue()
    }
  },
  { deep: false }
);
*/

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

  if (props.Registro > 0 && props.prop.ControlSource.length > 0) {
    //    Status.value = 'P';  // en lectura
    //    emit("update:Status", 'P'); // actualiza el valor Status en el componente padre. No se debe utilizar Status.Value

    //    Vue.nextTick(() => {
    //       console.log(this.show, this.$refs.content);
    //     });

    await readCampo(props.Registro)
    This.Form.Recno = props.Registro
  }
  else {

    if (props.prop.Type != 'number' && (props.prop.Value == null || props.prop.Value == undefined || props.prop.Value === ""))
      Value.value = ''

    if (props.prop.Type == 'number') {
      Value.value = (props.prop.Value == null || props.prop.Value == undefined) ? 0 : +props.prop.Value
    }
  }
  await emitValue()


  oldVal = Value.value   // asignamos el valor viejo

  // si es el primer elemento a posicionarse
  if (props.prop.First) {
    console.log('First init editText Name=', props.prop.Name, 'Value=', Value.value, 'currentValue=', currentValue.value[1], currentValue.value[0])

    First.value = false
    // emit("update:Value", Value.value); // actualiza el valor Value en el componente padre
    //emit("update") // emite un update en el componente padre
    //Ref.value.focus()  // hace el foco como primer elemento
    if (Ref && Ref != null)
      Ref.value.select() // Hace foco con select
    return
  }
  // else
  //  if (props.Registro == 0)
  //    await emitValue()

  console.log('init editText Name=', props.prop.Name, 'Value=', Value.value, 'currentValue=', currentValue.value[1], currentValue.value[0])
}

init() // Ejecuta el init
</script>