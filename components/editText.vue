<template>
  <!--Se necesita el siguiente div para que funcione el siguiente v-show-->
  <div class="divi inputDivi" :style="divStyle" v-show="This.prop.Visible">
    <span class="etiqueta" v-if="prop.textLabel" :style="labelStyle">{{ prop.textLabel + " " }}</span>

    <!--mensajes de error y tooltip
    -->
    <!--div class="component" :style="prop.inputStyle"-->
    <!--number 
      @input.self="onInput" -->

    <!--number   pattern="([0-9]{1,15}).([0-9]{1,5})"-->

    <input :id="Id" v-if="propType == 'number'" class="number" type="text" :style="inputStyle" ref="Ref"
      :disabled="prop.Disabled" :min="prop.Min" :max="prop.Max" v-model="currentValue[focusIn]" :readonly="ReadOnly"
      :placeholder="prop.Placeholder" :tabindex="prop.TabIndex" @focusout="focusOut" @focus="onFocus"
      @input.self="onInput" @keypress="keyPress($event)">

    <!--spinner-->

    <input :id="Id" v-else-if="propType == 'spinner'" class="number" type="number" :style="inputStyle" ref="Ref"
      :disabled="prop.Disabled" :min="prop.Min" :max="prop.Max" v-model="This.prop.Value" :readonly="ReadOnly"
      :tabindex="prop.TabIndex" @keypress="keyPress($event)" @focus="onFocus" @input="emitValue(false)">

    <!--textArea -->
    <div v-else-if="propType == 'textarea'" :style="inputStyle">
      <textarea :id="Id" class="textArea" ref="Ref" :style="inputStyle" v-model="Value" :readonly="ReadOnly"
        :disabled="prop.Disabled" :placeholder="prop.Placeholder" :tabindex="prop.TabIndex" type="textArea"
        :rows="inputStyle.rows" :cols='inputStyle.cols' @keypress="keyPress($event)" @focusout="focusOut"
        @focus="onFocus"></textarea>
    </div>

    <!--fecha v-model="currentValue[1]"  v-model="currentDate" se utiliza el value para que con emit funcione-->
    <!--div v-else-if="propType.slice(0, 4) == 'date'"-->
    <input :id="Id" v-else-if="propType.slice(0, 4) == 'date'" class="date" ref="Ref" :style="inputStyle"
      :type="propType == 'date' ? 'date' : 'datetime-local'" :min="prop.Min" :max="prop.Max" v-model="currentDate"
      :disabled="prop.Disabled" :readonly="ReadOnly" :tabindex="prop.TabIndex" @keypress="keyPress($event)"
      @focusout="focusOut">
    <!--input v-show="focusIn == 0" class="text" :style="inputStyle" type="text" v-model="displayDate"
          :readonly="true" :placeholder="prop.Placeholder" @focus="onFocus"-->
    <!--/div-->


    <div class='json' v-else-if="propType == 'json'" ref="Ref">

      <!--span  v-if="currentJson[comp][data].type=='label'">{{ currentJson[comp][data].value + " " }}</span>
                <input v-if="currentJson[comp][data].type==!label"
                  v-model="currentJson[comp][data].value" :type="currentJson[comp][data].type" -->

      <!--TransitionGroup name='detailJson' tag="div"-->
      <details v-for="(    comp, index    ) in     compJson    " key:='index'>
        <summary :style="{ fontWeight: 'bold', height: inputStyle.height }" :key='index'><label>{{ comp.label }}
          </label>
        </summary>
        <input v-model="comp.value" :type="comp.type ? comp.type : 'text'" :readonly="comp.readOnly ? true : false"
          :style="comp.style ? comp.style : { width: 'auto', height: '13px' }" @focusout="focusOut">

      </details>
      <!--/TransitionGroup-->
    </div>

    <!--checkBox-->
    <!--div v-else-if="propType == 'checkBox'"-->
    <input :id="Id" v-else-if="propType == 'checkbox'" class="checkBox" type="checkbox" :style="inputStyle" ref="Ref"
      :readonly="ReadOnly" :disabled="prop.Disabled || ReadOnly" :tabindex="prop.TabIndex" v-model="checkValue"
      @focus="onFocus" @keypress="keyPress($event)">

    <!--label for=" checkbox">{{ checkValue }}</label-->
    <!--/div-->
    <!--Si es texto
        @focusout="focusOut"
           @change="change"
            :maxlength="prop.MaxLength" 
            :size="prop.MaxLength"
      -->
    <input :id="Id" v-else class="text" ref="Ref" :style="inputStyle" :type="propType" v-model.trim="Value"
      :readonly="ReadOnly" :disabled="prop.Disabled" :maxlength="MaxLength" :size="prop.MaxLength"
      :placeholder="prop.Placeholder" :tabindex="prop.TabIndex" @keypress="keyPress($event)" @focusout="focusOut"
      @focus="onFocus">

    <!--div class="mensajes" v-show="This.prop.Visible"-->
    <span class="tooltiptext" v-if="prop.ToolTipText.length > 0" v-show="ToolTipText && prop.Valid"
      :style="toolTipTextStyle">{{
    prop.ToolTipText
  }}</span>
    <span class="errorText" v-show="ShowError">{{ prop.ErrorMessage.length >= 1 ? prop.ErrorMessage : 'Invalid Input'
      }}</span>
    <!--/div--> <!--fin class=component -->
    <!--/div-->
  </div>
</template>

<script setup lang="ts">


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

// , "update:Focus","update:Key",
const emit = defineEmits(["update", "update:Value",
  "input:currentValue",  // "input:currentValue[1]",
  "input:currentDate", "input:displayDate",
  "update:checkValue", "update:Valid", "update:Status", 'customChange']) //, "update:ShowError", "update:Ref","update:Recno",


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

    Autofocus: false;

    BaseClass: "EditText";

    Capture: true;

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
     },*/

    ControlSource: string;
    Currency: '   '; //USD,EUR,MXN
    CurrencyDisplay: 'code'; //to use the ISO currency code.

    Decimals: number;
    Disabled: boolean;

    ErrorMessage: '';

    Field: "";
    First: boolean;
    Focus: boolean;
    Format: "";

    Grid: false;

    htmlId: string;

    InputMask: "";

    Key: string;

    MaxLength: 0;
    Min: number;
    Max: number;

    Name: string;
    Notation: 'standard'; //standard,scientific,enginniering,compact
    Nu: 'arab';//


    Placeholder: "";

    ReadOnly: false;

    Status: string;
    ShowError: boolean;

    Style: string; // decimal, currency,percent,unit

    TabIndex: number;
    Tag: "";
    textLabel: "";
    This: null;
    ToolTipText: string;
    Type: string;

    Valid: true;
    Value: [String, Number, Date];
    View: "";
    Visible: true;
    When: boolean;


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
    zIndex: 0

  };
  position: {
    position: "left"; //left,right,center,absolute. Si es absulute poner Value left y top
    left: number;
    Top: number;
  };
  //db: any
}>();


console.log('EditText init Name=', props.prop.Name)


const ReadOnly = computed(() => !props.prop.When || props.prop.ReadOnly ? true : false)

const Component = ref(props.prop.This)
const This = Component.value

const labelStyle = reactive(This.labelStyle)
const propType = This.prop.Type.toLowerCase().trim()
/*
if (propType != "checkbox" &&
  propType != "radio" &&
  propType != "json" &&
  propType != "spinner" &&
  propType != "date" &&
  propType != "time" &&
  propType != "datetime" &&
  propType != "password") propType = "text"

  */
const Id = This.prop.Name + props.Registro.toString().trim()
let thisElement: Element | null    //Elemento DOM
This.prop.htmlId = Id

const Value = ref(props.prop.Value)
const Valid = ref(props.prop.Valid)
Valid.value = true
const Ref = ref(null) // Se necesita paratener referencia del :ref del componente  ref(props.prop.Ref)

const Status = ref(props.prop.Status);
const ToolTipText = ref(true)
Status.value = 'I'
const Key = ref(props.prop.Key)

var oldVal = Value.value
const ShowError = ref(false)
const checkValue = ref(false)

const MaxLength = ref(props.prop.MaxLength)
let sw_MaxLength = false

const divStyle = reactive(props.style)

if (divStyle.zIndex == 0)
  divStyle.zIndex = 100 - This.prop.TabIndex

const zIndex = divStyle.zIndex

//const inputStyle = reactive(props.inputStyle)
const inputStyle = reactive(This.inputStyle)

inputStyle.zIndex = zIndex

const toolTipTextStyle = { zIndex: zIndex + 20 }
const focusIn = ref(0)

const currentValue = ref(['', '']) // Valor para capturar

const displayDate = ref('') // Valor para ver

const currentDate = ref('') // Valor para capturar

const currentJson = ref({})
const compJson = ref([])

//const outFocus = ref(true)

////////////////////////////////
// Formateador de numeros 
/////////////////////////////
/*
const Style=ref(props.prop.Style)
if (!Style.value) Style.value='decimal'

const Currency=ref(props.prop.Currency)
if (!Currency.value) Currency.value='   '

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
  if (!Currency) Currency = '   '
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
const emitValue = async (readCam?: boolean, isValid?: boolean, Valor?: string) => {

  const ControlSource = props.prop.ControlSource
  const pos = ControlSource.indexOf(".") + 1;

  //outFocus.value = true
  // let Valor = ''
  let readValid = false
  if (!readCam) { // En valor viene el valor actual capturado

    if (This.Form.prop)
      This.Form.prop.Status = 'P'

    This.prop.Status = 'P'
    Status.value = 'P'
    emit("update:Status", 'P'); // actualiza el valor Status en el componente padre

    // console.log('editText emitValue() 1) !readCam Name=', props.prop.Name, 'isValid=', isValid, 'Valor=', Valor,'Value.value=', Value.value)
    // Si no viene del watch This.prop.Value
    if (!Valor)
      Valor = This.prop.Value  // Si viene del watch This.prop.Value

    Valor = Value.value

    if (props.Registro > 0 && props.prop.ControlSource && props.prop.ControlSource.length > 2) {
      const Recno = props.Registro
      await This.Form.db.updateCampo(Valor, props.prop.ControlSource, Recno)
      // Value.value = Valor
    }

    // Si no hay error
    This.prop.Valid = true
    if (!This.prop.ReadOnly && !This.prop.Disabled) {
      if (Value.value != Valor)
        Value.value = Valor


      This.prop.Value = Value.value
      //  console.log('2) editText emitValue()  update localSQL Name=', props.prop.Name,'Value=',Value.value ,'This.prop.Value=',This.prop.Value)

      emit("update:Value", Value.value); // actualiza el valor Value en el componente padre
      emit("update"); // actualiza el valor Value en el componente padre


      if (propType == 'spinner' || propType == 'checkbox')
        await This.interactiveChange()

      if (!isValid) {
        // console.log('3.0) editText emitValue() Valid=false update localSQL Name=', props.prop.Name,'Value=',Value.value ,'This.prop.Value=',This.prop.Value)

        if (await This.valid() == false) {

          //ShowError.value = true
          This.prop.Valid = false

          // 7/Feb/2024       
          This.Form.prop.Status = 'A'
          onFocus()
          return
        } //else This.prop.Valid = true


      } // else This.prop.Valid = true


    }

    // Reasigamos valor de Value
    if (Value.value != Valor)
      Value.value = Valor

  }
  else {  // Si hay lectura de campo
    //console.log('editText emitValue() 1) readCam Name=', props.prop.Name, 'Valor=', 'prop:value=', This.prop.Value)

    Valor = ''
    This.prop.Valid = true

    if (props.Registro == 0 || ControlSource.length == 0) { // limpia value
      if (props.prop.Value == null) {
        switch (propType) {
          case 'number':
            Value.value = 0
            break;
          case 'checkbox':
            Value.value = 0
            break;
          case 'date':
            Value.value = '1900-01-01' //T00:00:00'
            break;
          case 'datetime':
            Value.value = '1900-01-01T00:00:00'
            break;
          default:
            Value.value = ''
        }
      } else
        Value.value = props.prop.Value // asignamos valor al Value.value
    }
    else {
      // leemos valor 

      let sw_dat = false

      if (pos > 1) {

        //console.log('editText readCampo ',props.prop.ControlSource,'Registro=',props.Registro,'Value=',Value.value,currentValue.value[1])
        const Recno = props.Registro
        const data = await This.Form.db.readCampo(ControlSource, Recno)
        // console.log('editText emitValue() 2) readCam Name=', props.prop.Name, 'data=', data)


        for (const campo in data) {

          if (campo == 'key_pri' && data.key_pri > 0)
            This.prop.Valid = true

          if (campo != 'key_pri') {
            sw_dat = true

            //if (props.Registro && This.Recno != props.Registro)
            //  This.Recno = props.Registro

            //This.prop.Valid = true// ya se capturo algo , se apaga Valid
            Value.value = data[campo]

            // console.log('editText emitValue readCampo ',props.prop.ControlSource,'!isValid=',isValid,'Value=',Value.value)

            if (!isValid) {
              readValid = true
            }
          }
        }
      }
      if (!sw_dat) { // No encontro dato

        switch (propType) {
          case 'number':
            Value.value = 0

            break;
          case 'checkbox':
            Value.value = 0
            break;
          case 'date':
            Value.value = '1900-01-01' //'T00:00:00'
            break;
          case 'datetime':
            Value.value = '1900-01-01T00:00:00'
            break;
          default:
            Value.value = ''

        }
      }
    }
    // Asigna valores a campos de captura

  }

  //console.log('4) editText emitValue() Fin Name=', props.prop.Name,'This.prop.Valid=',This.prop.Valid)
  switch (propType) {
    case 'number':
      if (Value.value == null)
        Value.value = 0
      currentValue.value[1] = Value.value.toString().trim()
      currentValue.value[0] = await numberFormat(Value.value, props.prop.Currency, props.prop.MaxLength, props.prop.Decimals)
      emit("input:currentValue")   //, currentValue.value[0]); // actualiza el valor Value en el componente padre
      break;
    case 'checkbox':
      //  checkValue.value = Value.value == 1 ? true : false
      //await This.interactiveChange()
      let check = Value.value == 0 ? false : true
      if (checkValue.value != check) {
        checkValue.value = check
        emit("update:checkValue", checkValue)
      }
      break;

    case 'json':
      //  checkValue.value = Value.value == 1 ? true : false
      //await This.interactiveChange()
      compJson.value = []
      currentJson.value = JSON.parse(Value.value)

      for (const comp in currentJson.value)
        compJson.value.push(currentJson.value[comp])

      break;

    case 'date':
      //console.log('editText emitValue() Name D', props.prop.ControlSource, 'Valor=',Valor,'Value=',Value.value)
      if (Value.value == '' || Value.value == null)
        Value.value = '1900-01-01'
      console.log('editText emitValue() Date Name ', props.prop.Name, 'Value=', Value.value)
      if (Value.value.length > 10)
        Value.value = Value.value.slice(0, 10) //+ 'T00:00:00'
      //   currentValue.value[1] = await stringToDate(Value.value)
      //   currentValue.value[0] = new Date(Value.value).toDateString()

      displayDate.value = new Date(Value.value).toDateString()

      currentDate.value = await stringToDate(Value.value)
      console.log('editText emitValue() Date Name ', props.prop.Name, 'CurrentDAte=', currentDate.value, 'Value=', Value.value)

      nextTick(function () {
        emit("input:displayDate", displayDate); // actualiza el valor Value en el componente padre
        emit("input:currentDate", currentDate); // actualiza el valor Value en el componente padre

      })
      break;

    case 'datetime':
      console.log('editText emitValue() Time Name ', props.prop.ControlSource, 'Valor=', Valor, 'Value=', Value.value)
      if (Value.value == '' || Value.value == null)
        Value.value = '1900-01-01T00:00:00'

      Value.value = Value.value.slice(0, 16)

      displayDate.value = new Date(Value.value)
      currentDate.value = await stringToTime(Value.value) //Value.value.slice(0, 19)
      nextTick(function () {
        emit("input:displayDate", displayDate); // actualiza el valor Value en el componente padre
        emit("input:currentDate", currentDate); // actualiza el valor Value en el componente padre

      })

      break;
    default:
      if (Value.value == null)
        Value.value = ''

  }

  // dato valido para que el watch de This.prop.Value no se active
  if (This.prop.Valid)
    This.prop.Status = 'A'

  if (This.Form.prop)
    This.Form.prop.Status = 'A'

  /////////////////////////////////////////
  // nextTick(function () {

  emit("update:Value", Value.value); // actualiza el valor Value en el componente padre
  emit("update") // emite un update en el componente padre
  // })
  ToolTipText.value = true  // Activamos el ToolTipText
  /* 
   console.log('editText emitValue() Name', props.prop.Name, 'Type=', propType,
    'This.prop.Value=', This.prop.Value,
    'currentValue.value=', currentValue.value[0], currentValue.value[1],
    'currentDate.value=', currentDate.value, displayDate.value,
    //    'checkValue=', checkValue.value,
    'ValidOnRead=', This.prop.ValidOnRead,
    'readValid', readValid,
    'First Focus=', This.prop.First || This.prop.Focus)
*/
  if (This.prop.ValidOnRead && readValid) { // Se manda validar despues de leer el componente
    // await This.valid()  // 8/Feb/2024.- Se aumenta await
  }

  if (!This.prop.Valid) {
    //   console.log('5) editText emitValue() ERRROR en Valid Name=', props.prop.Name)

    ShowError.value = true
    //const element = document.getElementById(Id);
    select() // Hace select en el componente    thisElement.select()
    //Ref.value.select() // Hace select en el componente
    return
  }

  Status.value = 'A'  // se necesita para que el watch padre funcione
  emit("update:Status", 'A'); // actualiza el valor Status en el componente padre
  This.prop.Status = 'A'
  return
}

/////////////////////////////////////////////////////////////////////
// Numeros
// Descripcion: Cuando pierda el foco el componente , actualizamo el valor en cursor local
/////////////////////////////////////////////////////////////////
const Numeros = async ($event: { data: { toString: () => any; }; }) => {

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
// focusOut
// Descripcion: Cuando pierda el foco el componente , actualizamo el valor en cursor local
/////////////////////////////////////////////////////////////////
const focusOut = async () => {
  focusIn.value = 0  // Perdio el foco
  let sw_error = false

  if (propType == 'number') {
    if (+currentValue.value[1] < props.prop.Min) {
      currentValue.value[1] = props.prop.Min
      sw_error = true
    }
    if (+currentValue.value[1] > props.prop.Max) {
      currentValue.value[1] = props.prop.Max
      sw_error = true
    }
    typeNumber.value = 'text';
    Value.value = +currentValue.value[1]
  }

  if (propType == 'date') {
    //This.prop.Value = await dateToString(currentDate.value)
    if (currentDate.value < props.prop.Min) {
      currentDate.value = props.prop.Min
      sw_error = true
    }
    if (currentDate.value > props.prop.Max) {
      currentDate.value = props.prop.Max
      sw_error = true
    }

    Value.value = await dateToString(currentDate.value)
    if (sw_error) {
      This.prop.Focus = true
      return
    }
  }

  if (propType == 'datetime') {
    //This.prop.Value = await dateToString(currentDate.value)

    if (currentDate.value < props.prop.Min) {
      currentDate.value = props.prop.Min
      sw_error = true
    }
    if (currentDate.value > props.prop.Max) {
      currentDate.value = props.prop.Max
      sw_error = true
    }

    Value.value = currentDate.value.slice(0, 16)

  }

  if (propType == 'json') {
    Value.value = await JSON.stringify(currentJson.value)

  }

  if (sw_error) {
    This.prop.Focus = true
    return
  }

  if (propType == 'text') {
    if (props.style.textTransform == 'uppercase')
      Value.value = Value.value.toUpperCase()

    if (props.style.textTransform == 'lowercase')
      Value.value = Value.value.toLowerCase()
  }

  //console.log('focusOut editText Name', This.prop.Name, 'Value=', Value.value)
  await emitValue(false, false, Value.value) //se puso await

  // emitValue() ///se puso await
  return

};
/////////////////////////////////////////////////////////////////////
// KeyPress
// Descripcion: Cada tecla que se presiona en el input
/////////////////////////////////////////////////////////////////

const keyPress = ($event: { charCode: number; preventDefault: () => void; keycode: number; charCod: number; }) => {
  // <input       @keypress="keyPress($event)"
  // console.log('KeyPress===>', $event.charCode)

  if (ShowError.value) {
    ShowError.value = false
    if (This.prop.ShowError)
      This.prop.ShowError = false
  }
  // new KeyboardEvent('keydown', {
  if (propType != 'textarea' && $event.charCode == 13) //|| // Return
  // $event.charCode == 13 // Down Key  
  {
    const TabIndex = This.prop.TabIndex
    let lastIndex = 999999
    let nextFocus = ''
    for (const element of This.Parent.main) {
      const Tab = This.Parent[element].prop.TabIndex
      //console.log('KeyPres element =', This.Parent[element].prop.htmlId, Tab, TabIndex)

      if (Tab > TabIndex && Tab < lastIndex) {
        lastIndex = Tab
        nextFocus = This.Parent[element].prop.htmlId

      }
    }
    //const setElement = document.getElementById(nextFocus);
    console.log('KeyPres nextFocus =', nextFocus)

    $event.preventDefault();
    // Obtienee elemento a hacer el focus
    const nextElement = document.getElementById(nextFocus);
    // console.log('EditText keyPres Name',this.prop.Name=', setElement)
    if (nextElement)
      nextElement.focus()

    $event.keycode = 9;
    return $event.keycode;
    /*
   
   
       const TabIndex = This.prop.TabIndex
       //const next = $event.currentTarget.nextElementSibling;
       const form = document  //.getElementById('ThisForm')
       console.log('keyPress form===>', form)
       const index = [...form].indexOf($event.target);
       form.elements[index + 1].focus();
   
   
   
       let next = $event.currentTarget.nextSibling
       do {
         console.log('keyPress next ', 'Next===>>', next)
   
         if (next.tabIndex && next.tabIndex > TabIndex) {
           next.focus();
           break
         }
         next = next.nextSibling
   
       } while (next)
       */
  }
  // caracteres permitido en input numero
  if (propType == 'number') {
    // console.log('KeyPress number', $event.charCode)
    if (!(($event.charCode >= 48 &&
      $event.charCode <= 57) ||
      ($event.charCode == 46 && This.prop.Decimals > 0) || // punto con decimales
      ($event.charCode == 45 && +This.prop.Min < 0)  // Menor a cero)  
    ))
      return $event.preventDefault()
  }

  //    Status.value = 'P'  //Aqui me quedejjj
  //    emit("update:Status", 'P')
  if (This.prop.Status != 'P')
    This.prop.Status = 'P'
  Key.value = $event.charCode


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
// Obs: el when() se llama desde el coponente parent 
/////////////////////////////////////////////////////////////////
const onFocus = async () => {

  ToolTipText.value = false
  ShowError.value = false

  const ControlSource = props.prop.ControlSource
  const pos = ControlSource.indexOf(".") + 1;
  // Calcula la longitud maxima

  //  console.log('editText onFocus 1) Name=', This.prop.Name, 'Map', This.prop.Map, 'ControlSource', ControlSource, ' View=', This.Sql.View)


  if (pos > 1 && !sw_MaxLength) {
    sw_MaxLength = true
    const campo = ControlSource.slice(pos).trim(); // obtenemos el nombre del campo
    const tabla = ControlSource.slice(0, pos - 1).trim(); // obtenemos el nombre de la vista (queda hasta el punto)

    console.log('editText onFocus 1) Name=', This.prop.Name, 'Map', This.prop.Map, ' View=', This.Sql.View[tabla])

    const lon_campo = This.Sql.View[tabla].est_tabla[campo].lon_dat


    if (This.Sql.View[tabla].est_tabla[campo].tip_cam == 'STRING' && lon_campo < MaxLength.value) {

      MaxLength.value = lon_campo
    }
  }


  // ????????
  if (!This.prop.First && !This.prop.Focus) {
    if (This.prop.ShowError)
      This.prop.ShowError = false

    ShowError.value = false
    This.Form.eventos.push(This.prop.Map + '.when()')
    return
  }

  // El showError se apaga en el keyPress cuando es un input text, number o date 
  if ((propType == 'json' || propType == 'checkbox') && ShowError.value) {
    ShowError.value = false
    if (This.prop.ShowError)
      This.prop.ShowError = false
  }
  focusIn.value = 1
  This.prop.Focus = false
  This.prop.First = false

  emit("update:Value", Value.value)
  //nextTick(function () {

  // const element = document.getElementById(Id);
  select()
  return
}
const select = async () => {
  if (document.activeElement != thisElement) {


    console.log('editText focus Name=', This.prop.Name, 'Id=' + Id)
    // Ref.value.focus();
    // Ref.value.select();

    thisElement.focus({ focusVisible: true });
    thisElement.select();

  }
  setTimeout(function () {
    thisElement.focus({ focusVisible: true });
    thisElement.select();

  }, 0);
  //})
  return

}



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
  () => This.prop.Value, //This.prop.Value, //props.prop.Value, //Value.value,
  async (new_val: string | any[], old_val: any) => {
    if (This.prop.Status == 'P') // se cambio desde el mismo proceso
      return

    //  if (This.prop.Valid) return
    if (new_val != Value.value) {
      if (propType == 'date')
        if (new_val == Value.value)
          return
      //if (new_val.slice(0, 10) == Value.value.slice(0, 10))
      //  return


      // Value.value = This.prop.Value
      /*
      console.log('EditText Watch Name=', This.prop.Name,
        'prop.Valid =', This.prop.Valid,
        'Status=', This.prop.Status,
        'Value=', This.prop.Value, Value.value,
        'Valid=', This.prop.Valid,
        'checkValue=', checkValue.value)
        */

      Value.value = This.prop.Value
      await emitValue(false, This.prop.Valid) //se puso await

    }
  },
  { deep: false }
)



/////////////////////////////////////////////////////////////////////
// change checkValue.value
/////////////////////////////////////////////////////////////////
watch(
  () => checkValue.value, //props.prop.Value, //Value.value,
  async (new_val: any, old_val: any) => {

    if (new_val != old_val) {

      //  console.log('watch checkValue editText Name', This.prop.Name, 'Value.value', Value.value, 'new_val=', new_val, 'old_val=', old_val)
      This.prop.Value = new_val ? 1 : 0
    }
  },
  { deep: false }
)


/////////////////////////////////////////////////////////////////////
// change This.prop.ShowError
/////////////////////////////////////////////////////////////////
watch(
  () => This.prop.ShowError, //props.prop.Value, //Value.value,
  async (new_val: boolean) => {
    if (new_val)
      ShowError.value = new_val
    // console.log('watch editText Name', This.prop.Name, 'ShowError.value', new_val)
  },
  { deep: false }
)

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
 
    if (propType == 'number') {
      Value.value = +new_val
    }
 
    if (propType == 'date') {
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
 
      if (propType == 'checkBox') {
 
        checkValue.value = new_val == 1 ? true : false
        await This.interactiveChange()
        emitValue()
 
      }
 
      if (propType == 'spinner') {
        await This.interactiveChange()
        emitValue()
 
      }
      if (propType == 'number') {
        currentValue.value[1] = toNumberStr(Value.value)
        emitValue()
      }
 
 
    }
 
 
 
  },
  { deep: false }
)
 
*/

////////////////////////////////////////
// This.prop.Visible 
///////////////////////////////////////
watch(
  () => This.prop.Visible,
  (new_val: any, old_val: any) => {


    if (!new_val)
      divStyle.height = '0%'
    else
      divStyle.height = This.style.height
    //readCampo(props.Registro)

  },
  { deep: false }
);




This.prop.Visible

////////////////////////////////////////
// ControlSource
///////////////////////////////////////
watch(
  () => props.prop.ControlSource, //props.prop.ControlSource,
  (new_val: any, old_val: any) => {
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
  async () => {

    // console.log('EditText Watch Registro Name=', This.prop.Name, 'new_val =', props.Registro)
    emitValue(true)
    This.Recno = props.Registro
  },
  { deep: true }
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
        Value.value=propType=='numeric'? 0 : ''
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

/////////////////////////////////////////
// Metodo init 
/////////////////////////////////////////

//const init = async () => {
onMounted(async () => {
  thisElement = document.getElementById(Id) // Obtiene el id de este componente en el DOM
  console.log('EditText init Name=', This.prop.Name, 'Document element Id=' + Id)
  if (propType == 'date') {
    inputStyle.width = '120px'
    inputStyle.height = '20px'
    inputStyle.maxHeight = '20px'
  }
  if (propType == 'datetime-local') {
    inputStyle.width = '170px'
    inputStyle.height = '20px'
    inputStyle.maxHeight = '20px'
  }

  if (propType == 'json') {
    inputStyle.borderWidth = '1px'
    inputStyle.borderStyle = 'solid'
    inputStyle.borderRadius = '2px'
    divStyle.height = 'auto'
  }


  if (propType == 'number')
    inputStyle.textAlign = 'right'

  if (!This.prop.Visible)
    divStyle.height = '0%'

  const result = await emitValue(true)
  This.Recno = props.Registro

  oldVal = Value.value   // asignamos el valor viejo

  // si es el primer elemento a posicionarse
  if (props.prop.First || props.prop.Focus) {
    onFocus()
    return
  }
  // console.log('init editText Name=', props.prop.Name, 'Value=', Value.value, 'currentValue=', currentValue.value[1], currentValue.value[0])
})

/*
onUnmounted(() => {
  console.log('EditText Desmontado onUnMounted', This.prop.Name)

});



onMounted(() => {
  console.log('EditText Montado onMounted', This.prop.Name)
  init() // Ejecuta el init
});
*/
//init()

</script>