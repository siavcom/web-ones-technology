<template>
  <!--Se necesita el siguiente div para que funcione el siguiente v-show-->
  <span :id="Id + '_main_span'" class="divi inputDivi" :title="This.prop.ToolTipText" :style="divStyle"
    v-show="This.prop.Visible">
    <span :id="Id + '_label'" class="etiqueta" v-if="prop.textLabel" :style="labelStyle">{{ prop.textLabel + " "
      }}</span>
    <!--number   pattern="([0-9]{1,15}).([0-9]{1,5})"-->
    <!--span :id="Id + '_span'" :title="This.prop.ToolTipText" v-show="This.prop.InputProp.Visible"-->
    <input :id="Id" v-if="propType == 'number'" class="number" type="text" :style="inputStyle" ref="Ref"
      :disabled="This.prop.Disabled" :min="prop.Min" :max="prop.Max" v-model.trim="currentValue[focusIn]"
      :readonly="This.prop.ReadOnly" :placeholder="prop.Placeholder" :tabindex="prop.TabIndex" @focusout="focusOut"
      @focus="onFocus" @input.self="onInput" @keypress="keyPress($event)" v-on:keyup.63="clickHelp()"
      v-on:keyup.enter="clickReturn()" @contextmenu="handler($event)">

    <!--  v-maska="maska" @maska="onMaska" data-maska-reversed
      :data-maska-number-fraction="props.prop.Decimals" data-maska-number-unsigned
      
    -->
    <!--spinner-->

    <input :id="Id" v-else-if="propType == 'spinner'" class="number" type="number" :style="inputStyle" ref="Ref"
      :disabled="This.prop.Disabled" :min="prop.Min" :max="prop.Max" v-model="This.prop.Value"
      :readonly="This.prop.ReadOnly" :tabindex="prop.TabIndex" @keypress="keyPress($event)" @focus="onFocus"
      @input="emitValue(false)" v-on:keyup.63="clickHelp()" v-on:keyup.enter="clickReturn()"
      @contextmenu="handler($event)">

    <!--textArea -->
    <div :id="Id" v-else-if="propType == 'textarea'" :style="inputStyle">
      <textarea :id="Id + '_textarea'" class="textArea" ref="Ref" spellcheck="false" :style="inputStyle" v-model="Value"
        :readonly="This.prop.ReadOnly" :disabled="This.prop.Disabled" :placeholder="prop.Placeholder"
        :tabindex="prop.TabIndex" type="textArea" :rows="inputStyle.rows" :cols='inputStyle.cols'
        @keypress="keyPress($event)" @focusout="focusOut" @focus="onFocus" @contextmenu="handler($event)"></textarea>
    </div>

    <!--fecha v-model="currentValue[1]"  v-model="currentDate" se utiliza el value para que con emit funcione-->
    <!--div v-else-if="propType.slice(0, 4) == 'date'"-->
    <input :id="Id" v-else-if="propType == 'date' || propType == 'datetime'" class="date" ref="Ref" :style="inputStyle"
      :type="propType == 'datetime' ? 'datetime-local' : 'date'" :min="prop.Min" :max="prop.Max" v-model="currentDate"
      :disabled="This.prop.Disabled" :readonly="This.prop.ReadOnly" :tabindex="prop.TabIndex"
      @keypress="keyPress($event)" @focusout="focusOut" v-on:keyup.63="clickHelp()" v-on:keyup.enter="clickReturn()"
      @contextmenu="handler($event)">
    <!--input v-show="focusIn == 0" class="text" :style="inputStyle" type="text" v-model="displayDate"
          :readonly="true" :placeholder="prop.Placeholder" @focus="onFocus"-->
    <!--/div-->


    <div :id="Id + '_div_json'" class='json' v-else-if="propType == 'json'" ref="Ref" :style="inputStyle">

      <!--span  v-if="currentJson[comp][data].type=='label'">{{ currentJson[comp][data].value + " " }}</span>
                <input v-if="currentJson[comp][data].type==!label"
                  v-model="currentJson[comp][data].value" :type="currentJson[comp][data].type" -->

      <!--TransitionGroup name='detailJson' tag="div"-->
      <details :id="Id + '_detail_' + key" v-for="(    comp, index, key    ) in compJson    " key:='index'>
        <summary :id="Id" :style="{ fontWeight: 'bold', height: inputStyle.height }" :key='index'>
          <label>{{ comp.label }}
          </label>
        </summary>
        <input :id="Id + '_json_input' + key" v-model="comp.value" :type="comp.type ? comp.type : 'text'"
          :readonly="comp.readOnly ? true : false" :style="comp.style ? comp.style : { width: 'auto', height: '13px' }"
          @focusout="focusOut" @contextmenu="handler($event)">

      </details>
      <!--/TransitionGroup-->
    </div>

    <!--checkBox-->

    <input :id="Id" v-else-if="propType == 'checkbox'" class="checkBox" type="checkbox" :style="inputStyle" ref="Ref"
      :readonly="This.prop.ReadOnly" :disabled="This.prop.Disabled || This.prop.ReadOnly" :tabindex="prop.TabIndex"
      v-model="checkValue" @click="clickCheckBox()" @focus="onFocus" @keypress="keyPress($event)"
      @contextmenu="handler($event)">

    <!--text-->
    <input :id="Id" v-else class="text" ref="Ref" spellcheck="false" :style="inputStyle" :type="propType"
      v-model.trim="Value" :readonly="prop.ReadOnly" :disabled="This.prop.Disabled" :maxlength="MaxLength"
      :size="prop.MaxLength" :placeholder="prop.Placeholder" :tabindex="prop.TabIndex" @keypress="keyPress($event)"
      @focusout="focusOut" @focus="onFocus" v-on:keyup.63="clickHelp()" v-on:keyup.enter="clickReturn()"
      @contextmenu="handler($event)" v-maska="maska" @maska="onMaska">
    <!--/span-->
    <!--div v-if="propType == 'number'">CurrentValue ={{ currentValue[focusIn] }} focusIn{{ focusIn }}</div-->
    <nuxt-img :id="Id + '_help'"
      v-if="!prop.This.prop.ReadOnly && !This.prop.Disabled && prop.Help && This.prop.InputProp.Visible"
      class='help_icon' src="/Iconos/help-svgrepo-com.svg" style="position:absolute;right:0px" width="20px"
      @click="clickHelp()" />

    <!--div class="mensajes" v-show="This.prop.Visible"-->
    <!--span class="tooltiptext" v-if="prop.ToolTipText.length > 0" v-show="ToolTipText && prop.Valid"
      :style="toolTipTextStyle">{{prop.ToolTipText}}</span-->
    <div :id="Id + '_error'" class="errorText" v-show="displayError">{{ prop.ErrorMessage.length >= 1 ?
      prop.ErrorMessage
      :
      'Invalid Input'
      }}</div>
    <!--/div--> <!--fin class=component -->
    <!--/div-->
    <!--Teleport to="body"
    v-bind:Component="ref(This[compMain])"
    -->
    <component :id="Id + '_component_' + compMain" v-for="( compMain ) in This.main " :key="compMain"
      :is="impComp(This[compMain].prop.BaseClass)" v-model:Value="This[compMain].prop.Value"
      :ShowError="This[compMain].prop.ShowError" :Registro="props.Registro" :prop="This[compMain].prop"
      :style="This[compMain].style" :position="This[compMain].position"
      @click.capture="This.Form.eventos.push(This[compMain].prop.Map + '.click()')">
    </component>
    <!--/Teleport-->
    <!--   @click.capture="This.eventos.push(This.map+'.' + compMain + '.click()')" -->
  </span>
</template>

<script setup lang="ts">
/*


v-on:keyup="function"
v-on:keyup.enter="clickEnter()"
Supported Keys: Following keys are supported:

    Enter key: .enter
    Tab key: .tab
    Delete key: .delete
    Esc key: .esc
    Up key: .up
    Down key: .down
    Left key: .left
    Right key: .right





*/


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


import { vMaska } from "maska/vue"


///////////////////////////////////////
// Componentes
//////////////////////////////////////

const imgButton = defineAsyncComponent(() => import('@/components/imgButton.vue'))
const comboBox = defineAsyncComponent(() => import('@/components/comboBox.vue'))
const editText = defineAsyncComponent(() => import('@/components/editText.vue'))
const textLabel = defineAsyncComponent(() => import('@/components/textLabel.vue'))
const grid = defineAsyncComponent(() => import('@/components/grid.vue'))
const browseLite = defineAsyncComponent(() => import('@/components/browseLite.vue'))
const details = defineAsyncComponent(() => import('@/components/details.vue'))
const embedPdf = defineAsyncComponent(() => import('@/components/embedPdf.vue'))
const container = defineAsyncComponent(() => import('@/components/container.vue'))
const modalContainer = defineAsyncComponent(() => import('@/components/modalContainer.vue'))

///////////////////////////////////////
// Emits
//////////////////////////////////////


const emit = defineEmits(["update", "update:Value",
  "input:currentValue",  // "input:currentValue[1]",
  "input:currentDate", "input:displayDate",
  "update:checkValue", "update:Valid", "update:Status", 'customChange']) //, "update:displayError", "update:Ref","update:Recno",



console.log('editText Meta Server===>', import.meta.server)
console.log('editText Meta Client====>', import.meta.client)

///////////////////////////////////////
// Propiedades del componente reactivas
// Notas : 
//  Registro se necesita porque cuando se tiene un  grid con 
//  muchos componentes, c/componente Vue tiene su propio registro,
//  el Recno pertenece al los componentes  de captura  del ThisForm  
////////////////////////////////////
const props = defineProps<{
  //Recno: number;
  //Component: any;
  Value: any;
  Registro: number;  // Se pone para el manejo de grid
  // Block: number;
  // displayError: boolean;
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

    Help: false;

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
    RefValue: null;

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
    Value: string;
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


//const ReadOnly = computed(() => !props.prop.When ||props.prop.ReadOnly ? true : false)


const Component = toRef(() => props.prop.This)
//console.log('editText Component=', Component.value)
const This = Component.value  // falta probar reactividad utilizando Component.value.This

const labelStyle = reactive(This.labelStyle)
const propType = computed(() => This.prop.Type.toLowerCase().trim())
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
const Valor = toRef(This.prop, "Value")
const Valid = ref(props.prop.Valid)
Valid.value = true
const Ref = ref(null) // Se necesita paratener referencia del :ref del componente  ref(props.prop.Ref)

const Status = ref(props.prop.Status);
const ToolTipText = ref(true)
Status.value = 'I'
const Key = ref(props.prop.Key)

var oldVal = Value.value
const displayError = ref(false) // Se utiliza esta variable para mostrar el error y sea reactiva
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

const currentValue = ref(['', '']) // Arreglo de valor para capturar

const displayDate = ref('') // Valor para ver

const currentDate = ref('') // Valor para capturar

const currentJson = ref({})
const compJson = ref([])

const typeNumber = ref('text');

const maska = ref({
  mask: props.prop.InputMask,

  tokens: {
    //'!': { pattern: /[0-9a-zA-Z]/, transform: (chr: string) => chr.toUpperCase() },
    // X represents alphanumeric characters 0 - 9, a - z and A - Z
    'X': { pattern: /[0-9a-zA-Z]/ },

    // S represents alphabets a - z and A - Z
    'S': { pattern: /[a-zA-Z]/ },

    // A represents alphabets a - z and A - Z transformed to uppercase
    'A': { pattern: /[0-9a-zA-Z]/, transform: (chr: string) => chr.toUpperCase() }, //uppercase: true },

    // a represents alphabets a - z and A - Z transformed to lowercase
    'a': { pattern: /[0-9a-zA-Z]/, transform: (chr: string) => chr.toLowerCase() },   //lowercase: true },

    '9': { pattern: /[0-9]/ }, // :[0-9]:repeated" 
  }

})

/*
if (props.prop.InputMask.trim().length == 0)
  maska.value.mask = '*'.repeat(props.prop.MaxLength)
*/

// convierte "!" en "A" en el inpputMask (VFP)
maska.value.mask = maska.value.mask.replace(/!/gi, 'A')

//console.log('EditBox name=', props.prop.Name, 'maska.value.mask=', maska.value.mask)


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
  let key = Key.value

  console.log('1) EditBox onInput Name=', props.prop.Name, 'key=', key)


  if ((key < 48 || key > 57) && // no es un numero 
    (key != 46 && key != 45)) // no es punto y no es signo menos
  {

    const char = String.fromCharCode(key)
    target.value = target.value.replace(char, '')

  }

  if (key == 45) {// si es signo menos pero no permite negativos
    target.value = target.value.replace('-', '')
    if (target.value.indexOf('-') >= 0) {
      target.value = target.value.replace('-', '')
      key = 0
    }
  }
  /*
  const valor = target.value.replace(/[^0-9.]/g, "").trim()  // solo admite numeros y punto decimal
    console.log('onInput ', valor)
    if (valor.length == 0) {
      target.value = oldVal
      return
    }
    else
      target.value = valor
  
  */

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
  if (punto >= 0) {
    if (target.value.indexOf('.', punto + 1) > 0)
      target.value = target.value.substr(0, len - 1) // quitamos el segundo punto
    else { // checa decimales
      const decimales = target.value.substr(punto + 1)
      if (decimales.length > This.prop.Decimals)
        target.value = target.value.substr(0, len - 1)
    }
  }

  if (key == 45) // si puso un signo negativo
    target.value = '-' + target.value

  let valorNumerico = parseFloat(target.value) // valor numerico   

  console.log('2) EditBox onInput Name=', props.prop.Name, 'valorNumerico=', valorNumerico)

  if (+valorNumerico < props.prop.Min)
    target.value = target.value.substr(0, len - 1)

  if (+valorNumerico > props.prop.Max)
    target.value = target.value.substr(0, len - 1)

  currentValue.value[1] = target.value // valor numerico
  currentValue.value[0] = parseFloat(target.value) // valor numerico

  // console.log('EditBox onInput Name=', props.prop.Name, 'currentValue.value[0]=', currentValue.value[0])

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
  const Type = propType.value

  // false,false,Value
  // console.log('editText emitValue() readCam=', readCam, 'isValid=', isValid, 'Valor=', Valor, 'Value.value=', Value.value)
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

      //  console.log('3.1) editText emitValue() Valid=true update localSQL Name=', props.prop.Name, 'Value=', Value.value, 'This.prop.Value=', This.prop.Value)

      if (Value.value != Valor)
        Value.value = Valor


      This.prop.Value = Value.value
      //  console.log('2) editText emitValue()  update localSQL Name=', props.prop.Name,'Value=',Value.value ,'This.prop.Value=',This.prop.Value)

      emit("update:Value", Value.value); // actualiza el valor Value en el componente padre
      emit("update"); // actualiza el valor Value en el componente padre


      if (Type == 'spinner' || Type == 'checkbox')
        await This.interactiveChange()

      if (!isValid) {
        //  console.log('3.3) editText emitValue() Valid=false update localSQL Name=', props.prop.Name, 'Value=', Value.value, 'This.prop.Value=', This.prop.Value)

        if (!await This.valid()) {

          //  console.log('3.3.1) editText emitValue() Valid=false update localSQL Name=', props.prop.Name, 'Value=', Value.value, 'This.prop.Value=', This.prop.Value)

          displayError.value = true
          This.prop.ShowError = true
          This.prop.Valid = false

          // 7/Feb/2024       
          This.Form.prop.Status = 'A'
          select()
          //          This.prop.Focus = true
          This.prop.Status = 'A'
          return
        } //else This.prop.Valid = true


      }
      //  console.log('3.4) editText emitValue() Valid=true update localSQL Name=', props.prop.Name, 'Value=', Value.value, 'This.prop.Value=', This.prop.Value)
      This.prop.Valid = true
      This.prop.Status = 'A'
      Status.value = 'A'
      emit("update:Status", 'A')



    }

    // Reasigamos valor de Value
    if (Value.value != Valor)
      Value.value = Valor
    /*
        Status.value = 'A'  // se necesita para que el watch padre funcione
        emit("update:Status", 'A'); // actualiza el valor Status en el componente padre
        This.prop.Status = 'A'
    */


  }
  else {  // Si hay lectura de campo
    //console.log('editText emitValue() 1) readCam Name=', props.prop.Name, 'Valor=', 'prop:value=', This.prop.Value)

    Valor = ''
    This.prop.Valid = true

    if (props.Registro == 0 || ControlSource.length == 0) { // limpia value
      if (ControlSource.length > 0 || props.prop.Value == null) {
        switch (Type) {
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
            Value.value = data[campo] // se regresaraq el valor con emi al v-model:Value

            //  This.prop.Value=Value.value

            // console.log('editText emitValue readCampo ',props.prop.ControlSource,'!isValid=',isValid,'Value=',Value.value)

            if (!isValid) {
              readValid = true
            }
          }
        }
      }
      if (!sw_dat) { // No encontro dato

        switch (Type) {
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

  // console.log('4) editText emitValue() Fin Name=', props.prop.Name, 'Type=', Type, 'Value = ', Value.value)
  switch (Type) {
    case 'number':

      if (Value.value == null)
        Value.value = 0

      currentValue.value[1] = +Value.value //.toString().trim() // Captura
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
      if (Value.value.trim().length > 5) {
        try {
          currentJson.value = JSON.parse(Value.value)
        } catch (error) {
          await MessageBox('Error Invalid Json  :' + Value.value, 'Error')
          currentJson.value = []
        }
      }

      for (const comp in currentJson.value)
        compJson.value.push(currentJson.value[comp])

      break;

    case 'date':
      //console.log('editText emitValue() Name D', props.prop.ControlSource, 'Valor=',Valor,'Value=',Value.value)
      if (Value.value == '' || Value.value == null)
        Value.value = '1900-01-01'
      // console.log('editText emitValue() Date Name ', props.prop.Name, 'Value=', Value.value)
      if (Value.value.length > 10)
        Value.value = Value.value.slice(0, 10) //+ 'T00:00:00'
      //   currentValue.value[1] = await stringToDate(Value.value)
      //   currentValue.value[0] = new Date(Value.value).toDateString()

      displayDate.value = new Date(Value.value).toDateString()

      currentDate.value = await stringToDate(Value.value)
      // console.log('editText emitValue() Date Name ', props.prop.Name, 'CurrentDAte=', currentDate.value, 'Value=', Value.value)

      nextTick(function () {
        emit("input:displayDate", displayDate); // actualiza el valor Value en el componente padre
        emit("input:currentDate", currentDate); // actualiza el valor Value en el componente padre

      })
      break;

    case 'datetime':
      //  console.log('editText emitValue() Time Name ', props.prop.ControlSource, 'Valor=', Valor, 'Value=', Value.value)
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
   console.log('editText emitValue() Name', props.prop.Name, 'Type=', Type,
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

    displayError.value = true
    This.prop.ShowError = true
    select() // Hace select en el componente    thisElement.select()
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

  //console.log('Numeros Value ====>', Value.value)


  if (!stringValue.match(regex)) {
    let Valor = Value.value
    // console.log('Numeros Not match ====>', Value.value, Valor)

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
  focusIn.value = 0 // Perdio el foco
  let sw_error = false
  const Type = propType.value
  if (Type == 'number') {
    /*
    if (+currentValue.value[0] < props.prop.Min) {
      currentValue.value[0] = props.prop.Min
      sw_error = true
    }
   
    if (+currentValue.value[0] > props.prop.Max) {
      currentValue.value[0] = props.prop.Max
      sw_error = true
    }
      */

    typeNumber.value = 'text';
    Value.value = +currentValue.value[0]
    console.log('focusOut editText Name', props.prop.Name, 'Value=', Value.value)
  }

  if (Type == 'date') {
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
      select()
      // This.prop.Focus = true
      return
    }
  }

  if (Type == 'datetime') {
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

  if (Type == 'json') {
    Value.value = await JSON.stringify(currentJson.value)

  }

  if (sw_error) {
    select()
    //This.prop.Focus = true
    return
  }

  if (Type == 'text') {
    if (props.style.textTransform == 'uppercase')
      Value.value = Value.value.toUpperCase()

    if (props.style.textTransform == 'lowercase')
      Value.value = Value.value.toLowerCase()
  }

  //console.log('focusOut editText Name', This.prop.Name, 'Value=', Value.value)
  //console.log('editText focusout ', props.prop.Name, 'Value=', Value.value, 'currentValue=', currentValue.value)

  await emitValue(false, false, Value.value) //se puso await

  // emitValue() ///se puso await
  return

};

const clickCheckBox = () => {

  This.prop.Value = checkValue.value ? 0 : 1
  console.log('clickCheckBox editText Name', This.prop.Name, 'Value=', This.prop.Value)

  This.click()

}



/////////////////////////////////////////////////////////////////////
// KeyPress
// Descripcion: Cada tecla que se presiona en el input
/////////////////////////////////////////////////////////////////

const keyPress = ($event: { charCode: number; preventDefault: () => void; keycode: number; charCod: number; }) => {
  // <input       @keypress="keyPress($event)"
  const char = +$event.charCode
  const Type = propType.value
  if (displayError.value) {
    displayError.value = false
    if (This.prop.ShowError)
      This.prop.ShowError = false
  }


  // console.log('>>>>>KeyPress===>', char, 'Type=', Type)
  // oprimió ? (help)
  if ((Type == 'text' || Type == 'number' || Type == 'date') && char == 63) { // '?'
    console.log('1) Help KeyPres==>', $event.charCode)
    //$event.preventDefault()
    clickHelp()
    $event.keycode = 0;
    return $event.keycode;
  }

  // new KeyboardEvent('keydown', {
  if (Type != 'textarea' && $event.charCode == 13) //|| // Return
    return // clickReturn()

  // caracteres permitido en input numero

  if (This.prop.Status != 'P')
    This.prop.Status = 'P'

  Key.value = $event.charCode


}

// $event.charCode == 13 // Down Key  
const clickReturn = async () => {
  await emitValue(false) // Emite valores al parent y valida

  if (!This.prop.Valid)
    return

  console.log('clickReturn editText Name', This.prop.Name, 'TabIndex=', This.prop.TabIndex)
  const TabIndex = This.prop.TabIndex
  let lastIndex = 999999
  let nextFocus = ''


  for (const element of This.Parent.main) {


    if (This.Parent[element].prop && This.Parent[element].prop.Visible &&
      !This.Parent[element].prop.Disabled) {
      const Tab = This.Parent[element].prop.TabIndex

      if (Tab > TabIndex && Tab < lastIndex) {
        lastIndex = Tab
        nextFocus = This.Parent[element].prop.htmlId
        break
      }
    }
  }


  // $event.preventDefault();
  // Obtienee elemento a hacer el focus
  const nextElement = document.getElementById(nextFocus);
  // console.log('EditText keyPres Name',this.prop.Name=', setElement)
  if (nextElement) {
    console.log('clickReturn nextFocus =', nextFocus)
    nextElement.focus()
    nextElement.focus()

    //$event.keycode = 9;
    return // $event.keycode;
  }

}


/////////////////////////////////////////////////////////////////////
// onFocus
// Descripcion: Cuando se cambie el valor del componente template (Value.value con el teclado),
//              tenemos que emitir hacia el padre el valor capturado (Value.value) y ejecutar el update
// Obs: el when() se llama desde el coponente parent 
/////////////////////////////////////////////////////////////////
const onFocus = async () => {
  // No se permite el focus si es solo lectura
  if (This.prop.ReadOnly) {
    if (!This.prop.Disabled) {
      This.prop.Disabled = true
      setTimeout(function () {
        This.prop.Disabled = false

      }, 100);
    }
    //thisElement.next(':input').focus();
    return
  }

  if (focusIn.value == 0) { //!This.prop.First && !This.prop.Focus && 
    This.Form.eventos.push(This.prop.Map + '.when()')
  }


  // currentValue[0]  perdio foco, currentValue[1] obtiene el foco
  focusIn.value = 1  // cambia el valor en el input number 
  This.prop.Focus = false
  This.prop.First = false

  const Type = propType.value
  ToolTipText.value = false
  //  displayError.value = false

  const ControlSource = props.prop.ControlSource
  const pos = ControlSource.indexOf(".") + 1;

  // Calcula la longitud maxima
  if (pos > 1 && !sw_MaxLength) {
    sw_MaxLength = true
    const campo = ControlSource.slice(pos).trim(); // obtenemos el nombre del campo
    const tabla = ControlSource.slice(0, pos - 1).trim(); // obtenemos el nombre de la vista (queda hasta el punto)


    let lon_campo = This.prop.Value.length
    if (This.Sql.View[tabla] && This.Sql.View[tabla].est_tabla) {

      lon_campo = This.Sql.View[tabla].est_tabla[campo].lon_dat
      if (This.Sql.View[tabla].est_tabla[campo].tip_cam == 'STRING' && lon_campo < MaxLength.value) {

        MaxLength.value = lon_campo
      }
    }
  }

  // El displayError se apaga en el keyPress cuando es un input text, number o date 
  if ((Type == 'json' || Type == 'checkbox') && displayError.value) {
    displayError.value = false
    if (This.prop.ShowError)
      This.prop.ShowError = false
  }


  emit("update:Value", Value.value)
  //nextTick(function () {

  // const element = document.getElementById(Id);
  // select()   // 4 Julio 2024

  return
}
const clickHelp = async () => {
  This.prop.ShowError = false
  This.prop.Valid = true
  console.log('1) editText help Name=', This.prop.Name)
  if (focusIn.value == 0)
    await onFocus()

  if (This.help) {
    console.log('2) editText help Name=', This.prop.Name, This.help)
    await This.help.open()
  }

}
const select = async () => {
  // console.log('editText select Name=', This.prop.Name, 'thisElement=', thisElement)
  This.prop.Focus = false

  if (document.activeElement != thisElement) {
    // Ref.value.focus();
    // Ref.value.select();

    thisElement.focus({ focusVisible: true });
    // thisElement.select();

    setTimeout(function () {
      //thisElement.focus({ focusVisible: true });
      if (thisElement.select)
        thisElement.select();

    }, 300);



  }
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


/////////////////////////////////////////////////////////////////////
// change This.prop.ShowError
/////////////////////////////////////////////////////////////////
watch(
  () => This.prop.ShowError,
  () => {
    if (displayError.value != This.prop.ShowError)
      displayError.value = This.prop.ShowError
    //if (This.Form.error && new_val) {
    //  displayError.value = false
    //}

    // This.Parent.error = new_val
    console.log('watch displayError editText Name', This.prop.Name, 'displayError.value', displayError.value)
  },
  { deep: false }
);



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
);

////////////////////////////////////////
// This.prop.Visible 
///////////////////////////////////////
/*
watch(
  () => This.prop.Visible,
  (new_val: any, old_val: any) => {
 
 
    if (!new_val)
      divStyle.height = '0%'
    else
      divStyle.height = This.style.height
 
  },
  { deep: false }
);
 
*/
////////////////////////////////////////
// ControlSource
///////////////////////////////////////
watch(
  () => props.prop.ControlSource, //props.prop.ControlSource,
  (new_val: any, old_val: any) => {

    console.log('EditText Watch ControlSource Name=', This.prop.Name, 'new_val =', new_val)
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
    This.recnoChange()
  },
  { deep: true }
);

////////////////////////////////////////
// Registro
// Nota: Lee de la base de datos local segun el valor de Registro
//       Se utiliza para el manejo de grid
///////////////////////////////////////
/*
watch(
  () => This.prop.Recno,
  async () => {
    console.log('EditText Watch Recno Name=', This.prop.Name, 'new_val =', This.prop.Recno)
  },
  { deep: true }
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
    console.log('Focus editText Watch Name=', This.prop.Name)
    select()
    //onFocus()
    return

  },
  { deep: false }
)


////////////////////////////////////////
//
///////////////////////////////////////
watch(
  () => Valor, //props.prop.Focus,
  (new_val: any, old_val: any) => {

    if (propType.slice(0, 4) == 'date')
      console.log('>>>  RefValue EditText Watch Name=', This.prop.Name, 'Value=', This.prop.Value, 'Value.value=', Value.value)

    Value.value = This.prop.RefValue.value

    return

  },
  { deep: false }
)

//////////////////////////
//Si se cambia de afuera el valor
///////////////////////////////////////
watch(
  () => This.prop.Value, //This.prop.Value, //props.prop.Value, //Value.value,

  async (new_val: any, old_val: any) => {



    if (This.prop.Status == 'P') // se cambio desde el mismo proceso
      return

    //  if (This.prop.Valid) return
    if (new_val != Value.value) {
      //     console.log(' >>>>>   EditText Watch Name=', This.prop.Name, 'Status=', This.prop.Status, 'Value=', This.prop.Value, 'Value.value=', Value.value)

      /*
       if (propType == 'date')
         if (new_val == Value.value)
           return
         */
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
  { deep: true }
);

////////////////////////////////////////////////////////////////////
// change This.prop.Type
/////////////////////////////////////////////////////////////////
watch(
  () => This.prop.Type, //props.prop.Value, //Value.value,
  async (new_val: boolean) => {

    console.log('EditText Watch Name=', This.prop.Name, 'new_val Type=', new_val)
    styleAssing()
  },
  { deep: false }
);


const onMaska = (event: CustomEvent<MaskaDetail>) => {
  console.log('onMaska=', {
    masked: event.detail.masked,
    unmasked: event.detail.unmasked,
    completed: event.detail.completed
  })
}




const styleAssing = async () => {
  const Type = propType.value

  if (Type == 'date') {
    inputStyle.width = '120px'
    inputStyle.height = '20px'
    inputStyle.maxHeight = '20px'
  }
  if (Type == 'datetime-local') {
    inputStyle.width = '170px'
    inputStyle.height = '20px'
    inputStyle.maxHeight = '20px'
  }

  if (Type == 'json') {
    inputStyle.borderWidth = '1px'
    inputStyle.borderStyle = 'solid'
    inputStyle.borderRadius = '2px'
    divStyle.height = 'auto'
  }
  if ((Type == 'textarea' || Type == 'text') && inputStyle.width == 'auto') {
    //  console.log('2) EditText Name=', This.prop.Name, 'inputStyle.width =', inputStyle.width)

    inputStyle.width = '100%'
  }

  if (Type == 'number')
    inputStyle.textAlign = 'right'

  if (Type == 'checkbox')
    inputStyle.width = '20px'


}
/**
 * Handler for right click event on the component
 *
 * @param {MouseEvent} event - the event
 */
const handler = (event) => {
  if (event.which === 3) {
    console.log("==================>>>>>>Right mouse down ", This.prop.Map);
  }
  event.preventDefault();
}
/////////////////////////////////////////
// Metodo init 
/////////////////////////////////////////

//const init = async () => {
onMounted(async () => {
  thisElement = document.getElementById(Id) // Obtiene el id de este componente en el DOM

  styleAssing()

  if (!This.prop.Visible)
    divStyle.height = '0%'

  if (!This.prop.RefValue == null)
    Value.value = This.prop.RefValue.value

  const result = await emitValue(true)
  This.Recno = props.Registro

  oldVal = Value.value   // asignamos el valor viejo


  const ControlSource = props.prop.ControlSource
  const pos = ControlSource.indexOf(".") + 1;

  if (pos > 2) {
    const campo = ControlSource.slice(pos).trim(); // obtenemos el nombre del campo
    const tabla = ControlSource.slice(0, pos - 1).trim(); // obtenemos el nombre de la vista (queda hasta el punto)

    /*
    if (This.Sql.View[tabla]) {
      const Recno = toRef(This.Sql.View[tabla].recno)
      console.log('xxxxxx editText init Name=', This.prop.Name, 'campo:', campo, 'tabla:', tabla, 'recno:', This.Recno)
 
    }
     */
  }
  await This.recnoChange()

  // si es el primer elemento a posicionarse
  if (props.prop.First || props.prop.Focus) {
    props.prop.First = false
    select()
    //    onFocus()
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


/////////////////////////////////////////////////
// Componentes
/////////////////////////////////////////////////


//const imgButton = resolveComponent('imgButton')
//const comboBox = resolveComponent('comboBox')
//const editText = resolveComponent('editText')
//const textLabel = resolveComponent('textLabel')
//const grid = resolveComponent('grid')
//const browse = resolveComponent('browse')

//const browseLite = resolveComponent('browseLite')
//const details = resolveComponent('details')
//const embedPdf = resolveComponent('embedPdf')

//import * from '@/components/imports/components'




//////////////////////////////////////
//  Importa componentes dinamicos
////////////////////////////////////// 
// '@/components/' + name + '.vue')


const impComp = ((name: string, pos?: string) => {

  //return eval(name)

  switch (name.toLowerCase().trim()) {
    case 'edittext': {
      // console.log('Importo edittext')
      return editText
      break;
    }
    case 'combobox': {
      return comboBox
      break;
    }
    case 'grid': {
      return grid
      break;
    }

    case 'imgbutton': {
      return imgButton
      break;
    }

    case 'browse': {

      return browseLite
      break;
    }

    case 'browselite': {


      return browseLite
      break;
    }

    case 'textlabel': {
      return textLabel
      break
    }
    case 'details': {
      return details
      break
    }

    case 'container': {
      return container
      break
    }

    case 'modalcontainer': {
      return modalContainer
      break
    }

    case 'embedpdf': {
      return embedPdf
      //return defineAsyncComponent(() => import('@/components/comboBox.vue'))  //import('@/components/${name}.vue'))

      break
    }
    default: {
      return editText
      //return defineAsyncComponent(() => import('@/components/editText.vue'))  //import('@/components/${name}.vue'))
      break;
    }
  }

  //    return defineAsyncComponent(() => import('@/components/editText.vue'))  //import('@/components/${name}.vue'))
})


</script>