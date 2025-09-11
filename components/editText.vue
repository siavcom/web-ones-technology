<template>
  <!--Se necesita el siguiente div para que funcione el siguiente v-show-->
  <span :id="Id + '_main'" class=" divi inputDivi" :title="This.prop.ToolTipText" :style="Styles.style"
    v-show="This.prop.Visible" @click.middle.stop="middleClick()">
    <span :id="Id + '_label'" class=" etiqueta" v-if="prop.Caption" :style="Styles.captionStyle">{{ prop.Caption
      }}</span>

    <input :id="Id" v-if="propType == 'number'" class="number" type="text" inputmode="numeric" :style=Styles.inputStyle
      ref="Ref" :disabled="This.prop.Disabled" :min="prop.Min" :max="prop.Max" v-model.trim="currentValue[focusIn]"
      :readonly="This.prop.ReadOnly" :placeholder="prop.Placeholder" :tabindex="prop.TabIndex"
      onkeypress='return  event.charCode== 45 || event.charCode== 46 || event.charCode== 43 || (event.charCode >= 48 && event.charCode <= 57)'
      @focusout="lostFocus" @click.capture="onClick" @focus="onFocus" @keypress="keyPress($event)"
      v-on:keyup.63="clickHelp()" v-on:keyup.delete="Key = 127" v-on:keyup.13="Key = 13" v-on:keyup.backspace="Key = 8"
      @input.self="onInput">

    <!-- @input.self="onInput"
        
      onkeypress='return  event.charCode== 45 || event.charCode== 46 || event.charCode== 43 || (event.charCode >= 48 && event.charCode <= 57)'
      @focusout="lostFocus" @focus="onFocus" @keypress="keyPress($event)" v-on:keyup.63="clickHelp()"
      @click.middle.stop="middleClick()" v-on:keyup.delete="key = 127" v-on:keyup.13="key = 13"
      v-on:keyup.backspace="key = 8"
    v-maska="maska" @maska="onMaska"
      key != 45 && key != 46 && key != 43) && (key < 48 || key > 57)
    v-on:keyup.enter="clickReturn()" 
        v-maska="maska" @maska="onMaska" data-maska-reversed
      :data-maska-number-fraction="props.prop.Decimals" data-maska-number-unsigned
      
    -->
    <!--spinner-->

    <input :id="Id" v-else-if="propType == 'spinner'" class="number" type="number" :style=Styles.inputStyle ref="Ref"
      :disabled="This.prop.Disabled" :min="prop.Min" :max="prop.Max" v-model="This.prop.Value" :maxlength="MaxLength"
      :step="This.prop.Step" :readonly="This.prop.ReadOnly" :tabindex="prop.TabIndex" @keypress="keyPress($event)"
      @click.capture="onClick" @focus="onFocus" @input="emitValue(false)" v-on:keyup.63="clickHelp()">
    <!--v-on:keyup.enter="clickReturn()" -->
    <!--textArea -->
    <div :id="Id" v-else-if="propType == 'textarea'" :style=Styles.inputStyle>
      <textarea :id="Id + '_textarea'" class="textArea" ref="Ref" spellcheck="false" :style=Styles.inputStyle
        v-model="Value" :readonly="This.prop.ReadOnly" :disabled="This.prop.Disabled" :placeholder="prop.Placeholder"
        :tabindex="prop.TabIndex" type="textArea" :rows="Styles.inputStyle.rows" :cols='Styles.inputStyle.cols'
        @keypress="keyPress($event)" @click.capture="onClick" @focus="onFocus" @focusout="lostFocus"></textarea>
    </div>
    <!--fecha v-model="currentValue[1]"  v-model="currentDate" se utiliza el value para que con emit funcione-->
    <!--div v-else-if="propType.slice(0, 4) == 'date'"-->
    <input :id="Id" v-else-if="propType == 'date' || propType == 'datetime'" class="date" ref="Ref"
      :style=Styles.inputStyle :type="propType == 'datetime' ? 'datetime-local' : 'date'" :min="prop.Min"
      :max="prop.Max" v-model="currentDate" :disabled="This.prop.Disabled" :readonly="This.prop.ReadOnly"
      :tabindex="prop.TabIndex" @keypress="keyPress($event)" @click.capture="onClick" @focus="onFocus"
      @focusout="lostFocus" v-on:keyup.63="clickHelp()">
    <!--v-on:keyup.enter="clickReturn()" -->
    <!--input v-show="focusIn == 0" class="text" :style=Styles.inputStyle type="text" v-model="displayDate"
          :readonly="true" :placeholder="prop.Placeholder" @focus="onFocus"-->
    <!--/div-->
    <div :id="Id" class='json' v-else-if="propType == 'json'" ref="Ref" :style=Styles.style>
      <!--span  v-if="currentJson[comp][data].type=='label'">{{ currentJson[comp][data].value + " " }}</span>
                <input v-if="currentJson[comp][data].type==!label"
                  v-model="currentJson[comp][data].value" :type="currentJson[comp][data].type" -->

      <!--TransitionGroup name='detailJson' tag="div"-->
      <!--details-->
      <div :id="Id + '_detail_' + key" v-for="(comp, index, key) in compJson" key:='index' open='true'>
        <!--summary :id="Id" :style="{ fontWeight: 'bold', height: Styles.inputStyle.height }" :key='index'-->
        <label>{{ comp.label }}
        </label>
        <!--/summary-->
        <input :id="Id + '_json_input' + key" v-model="comp.value" :type="comp.type ? comp.type : 'text'"
          :readonly="comp.readOnly || This.prop.ReadOnly ? true : false"
          :disabled="comp.disabled || This.prop.Disabled ? true : false"
          :style="comp.style ? comp.style : { width: 'auto', height: '13px' }" @focusout="lostFocus">

      </div>
      <!--/details-->
      <!--/TransitionGroup-->
    </div>

    <!--   CHECKBOX   -->

    <input :id="Id" v-else-if="propType == 'checkbox'" class="checkbox" type="checkbox" :style=Styles.inputStyle
      ref="Ref" :readonly="This.prop.ReadOnly" :disabled="This.prop.Disabled || This.prop.ReadOnly"
      :tabindex="prop.TabIndex" v-model="checkValue" @click="clickCheckBox()" @focus="onFocus"
      @keypress="keyPress($event)">

    <!--  TEXT   -->
    <input :id="Id" v-else class="text" ref="Ref" spellcheck="false" :style=Styles.inputStyle :type="propType"
      v-model.trim="Value" :readonly="prop.ReadOnly" :disabled="This.prop.Disabled" :maxlength="MaxLength"
      :size="prop.MaxLength" :placeholder="prop.Placeholder" :tabindex="prop.TabIndex" @keypress="keyPress($event)"
      @focusout="lostFocus" @click="onClick" @focus="onFocus" v-on:keyup.63="clickHelp()" v-maska="maska"
      @maska="onMaska">
    <!--v-on:keyup.enter="clickReturn()" @click.capture="onClick"-->

    <!--/span-->
    <!--div v-if="propType == 'number'">CurrentValue ={{ currentValue[focusIn] }} focusIn{{ focusIn }}</div-->
    <img :id="Id + '_help'"
      v-if="!prop.This.prop.ReadOnly && !This.prop.Disabled && prop.Help && This.prop.InputProp.Visible"
      class='help_icon' src="/Iconos/svg/lupa.svg" :style=helpStyle @click.prevent="clickHelp()" />

    <div :id="Id + '_error'" class="errorText" v-show="displayError">{{ This.prop.ErrorMessage.toString().length >= 1 ?
      This.prop.ErrorMessage
      :
      '--- Invalid Input ---'
      }}</div>

    <!--Compponentes que no estan en bloque-->

    <div class="component_container" :style="containerStyle">
      <component :id="Id + '_component_' + compMain" v-for="(compMain) in This.main" :key="compMain"
        :is="impComponent(This[compMain].prop.BaseClass)" v-model:Value="This[compMain].prop.Value"
        :Registro="props.Registro" :prop="This[compMain].prop" :style="This[compMain].style"
        :position="This[compMain].position">
      </component>
    </div>

    <!--Compponentes en bloque-->
    <div :id="Id + 'componentes_divi_' + key" v-for="(block, key) in This.block" :key="key">
      <label v-if="block.title && block.prop.Visible">{{ block.title }}</label>
      <div :id="Id + 'block_' + key" v-if="block.prop.Visible" :style="block.style">

        <div v-for="(component, key) in block.component" :key="key"
          :id="Id + 'hor_componentes_' + key + component.prop.Name" style="padding-bottom:2px">
          <!--v-bind:Component="ref(Ele)"-->
          <component :id="Id + '_component_' + key + component.prop.Name" :is="impComponent(component.prop.BaseClass)"
            v-model:Value="component.prop.Value" v-model:Status="component.prop.Status" :Registro="props.Registro"
            :prop="component.prop" :position="component.position">
            <!--:style="component.style" :inputStyle="component.inputStyle"
                                               
                      @click.capture="component.click()"-->
          </component>
        </div>
      </div>
    </div>

    <!--/Teleport-->
    <!--   :ShowError="This[compMain].prop.ShowError" 
       
    @click.capture="This.eventos.push(This.map+'.' + compMain + '.click()')" 
           @click.capture="This.Form.eventos.push(This[compMain].prop.Map + '.click()')">-->
  </span>
</template>

<script setup lang="ts">

/*
----------------------------------------------------------------------------------------------
              Killo Soft
 ----------------------------------------------------------------------------------------------
 Autor    	: ElFerBlocks
 Sistema  	: Web-Ones  							Version : 1.0  VUE
 Programa 	: EditBox    		Mnemo   : editText.vue
 Ult.Mod :   11/Marzo/2025 se agrego el siguiente if
 Objeto		: VUE
 Comentarios	: Componente de edicion de texto
 ----------------------------------------------------------------------------------------------
*/

import { vMaska } from "maska/vue"
//import { Money } from "v-money3";

///////////////////////////////////////
// Emits
//////////////////////////////////////

const emit = defineEmits(["update", "update:Value",
  "input:currentValue",  // "input:currentValue[1]",
  "input:currentDate", "input:displayDate",
  "update:checkValue", "update:Valid", "update:Status", 'customChange']) //, "update:displayError", "update:Ref","update:Recno",


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

    Key: number;

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

  position: {
    position: "left"; //left,right,center,absolute. Si es absulute poner Value left y top
    left: number;
    Top: number;
  };

}>();

const Component = toRef(() => props.prop.This)
const This = Component.value  // falta probar reactividad utilizando Component.value.This

const Este = props.prop.This

const captionStyle = reactive({ ...This.captionStyle })
const inputStyle = reactive({ ...This.inputStyle })

const divStyle = reactive({ ...This.style })
const containerStyle = reactive({ ...This.containerStyle })

const invalidInputStyle = reactive({ ...This.invalidInputStyle })
const readOnlyInputStyle = reactive({ ...This.readOnlyInputStyle })

console.log('EditText readOnlyInputStyle=', readOnlyInputStyle)



/*
const captionStyle = reactive({ ...Este.captionStyle })
const inputStyle = reactive({ ...Este.inputStyle })

const divStyle = reactive({ ...Este.style })
const containerStyle = reactive({ ...Este.containerStyle })

const invalidInputStyle = reactive({ ...Este.invalidInputStyle })
const readOnlyInputStyle = reactive({ ...Este.readOnlyInputStyle })

*/

const Styles =
{
  captionStyle: captionStyle,
  inputStyle: inputStyle,
  style: divStyle,
  //invalidInputStyle: invalidInputStyle
}

const helpStyle = {
  // position: 'absolute',
  // left: inputStyle.width,
  marginTop: '1px',
  width: '20px',
  maxHeight: '20px',
  paddingLeft: '2px',
  alignContent: 'flex-start'
}

if (props.prop.Help)
  containerStyle.paddingLeft = "2px"


//const divStyle = reactive(props.style)

const propType = computed(() => This.prop.Type.toLowerCase().trim())

const Id = This.prop.Name + '_' + Math.floor(Math.random() * 10000000).toString() //props.Registro.toString().trim()


let thisElement: Element | null    //Elemento DOM
This.prop.htmlId = Id

const Value = ref(props.prop.Value)
//const Valor = toRef(This.prop, "Value")
//const Valid = ref(props.prop.Valid)
//Valid.value = true
const Ref = ref(null) // Se necesita paratener referencia del :ref del componente  ref(props.prop.Ref)
// let Help = false


const Status = ref(props.prop.Status);
const ToolTipText = ref(true)
Status.value = 'I'
const Key = ref(props.prop.Key)

var oldVal = ''
const displayError = ref(false) // Se utiliza esta variable para mostrar el error y sea reactiva
const checkValue = ref(false)

const MaxLength = ref(props.prop.MaxLength)
let sw_MaxLength = false



if (Styles.style.zIndex == 0)
  Styles.style.zIndex = 100 - This.prop.TabIndex

const zIndex = Styles.style.zIndex

Styles.inputStyle.zIndex = zIndex

const toolTipTextStyle = { zIndex: zIndex + 20 }
const focusIn = ref(0)

const currentValue = ref(['', '']) // Arreglo de valor para capturar

const displayDate = ref('') // Valor para ver

const currentDate = ref('') // Valor para capturar

const currentJson = ref({})
const compJson = ref([])

const typeNumber = ref('text');

let KeyPressed = false


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

// convierte "!" en "A" en el inpputMask (VFP)
maska.value.mask = maska.value.mask.replace(/!/gi, 'A')

const config = reactive({
  masked: false,
  prefix: This.prop.Currency,
  suffix: '',
  thousands: ',',
  decimal: '.',
  precision: This.prop.Decimals,
  disableNegative: false,
  disabled: This.prop.Disabled,
  min: +This.prop.Min,
  max: +This.prop.Max,
  allowBlank: false,
  minimumNumberOfCharacters: 0,
  shouldRound: true,
  focusOnRight: false,
})

var watchPropValue = false


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
  // currentValue.value[1] es le vsalor sin formatear

  const key = Key.value

  if (key == 8 || key == 127) { // BackSpace or Delete
    oldVal = currentValue.value[1]
    return
  }

  let TargetValue = +target.value

  if (key == 45) {// si puso un signo negativo y el valor es positivo
    currentValue.value[1] = '-' + currentValue.value[1].replaceAll('-', '')
    if (currentValue.value[1] == '-')
      return
    TargetValue = +currentValue.value[1]
  }


  // Si ya hay  un punto decimal
  if (typeof currentValue.value[1] == 'string' && currentValue.value[1].indexOf('.') >= 0) {
    const Decimales = currentValue.value[1].length - currentValue.value[1].indexOf('.') - 1
    if (Decimales > props.prop.Decimals) {
      currentValue.value[1] = oldVal
      return
    }
    if (currentValue.value[1].indexOf('.') == 0 && currentValue.value[1].length == 1) {
      currentValue.value[1] = '0.'
      return
    }
  }

  if (isNaN(TargetValue)) {
    currentValue.value[1] = oldVal
    return
  }
  //const len = TargetValue.length
  //Value.value = parseInt(TargetValue);

  let valorNumerico = parseFloat(TargetValue) // valor numerico   

  if (+valorNumerico < props.prop.Min) {
    currentValue.value[1] = oldVal
    return
  }
  if (+valorNumerico > props.prop.Max) {
    currentValue.value[1] = oldVal
    return
  }

  if (typeof currentValue.value[1] == 'string' && currentValue.value[1].indexOf('.') == -1 && +currentValue.value[1] == 0) {
    currentValue.value[1] = '0'
    return
  }

  if (+currentValue.value[1] != TargetValue) {
    currentValue.value[1] = TargetValue.toString() // valor numerico

  }

  currentValue.value[0] = parseFloat(TargetValue) // valor numerico
  oldVal = TargetValue.toString()
  //  console.log('Fin)==> EditBox onInput Name=', props.prop.Name, 'currentValue.value[1]=', currentValue.value[1], 'TargetValue=', TargetValue, 'key=', key, 'oldVal=', oldVal)

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
const emitValue = async (readCam?: boolean, isValid?: boolean, newValor?: string) => {
  if (This.Help) return // no emitir si hay ayuda
  const Type = propType.value

  // false,false,Value
  // console.log('editText emitValue() readCam=', readCam, 'isValid=', isValid, 'Valor=', Valor, 'Value.value=', Value.value)
  const ControlSource = props.prop.ControlSource
  const pos = ControlSource.indexOf(".") + 1;

  //outFocus.value = true
  // let Valor = ''
  let readValid = false
  // console.log('0) editText emitValue() Name=', props.prop.Name, 'Valor=', 'ReadCam=', readCam, 'This.prop.Value=', This.prop.Value, 'ControlSource=', props.prop.ControlSource, 'Recno=', props.Registro)

  if (!readCam) { // En valor viene el valor actual capturado

    // 24/Dic/2024  if (This.Form.prop)
    // 24/Dic/2024   This.Form.prop.Status = 'P'

    if (!watchPropValue) {
      This.prop.Status = 'P'
      //2/Sep/2025 Status.value = 'P'
      //2/Sep/2025 emit("update:Status", 'P'); // actualiza el valor Status en el componente padre

      // Si no viene del watch This.prop.Value
      if (!newValor)
        newValor = This.prop.Value  // Si viene del watch This.prop.Value

    }

    // console.log('----------- 1) editText emitValue() !readCam Name=', props.prop.Name, 'newValor=', newValor, 'ControlSource=', props.prop.ControlSource, 'Recno=', props.Registro)

    if (props.Registro > 0 && props.prop.ControlSource && props.prop.ControlSource.length > 2) {
      const Recno = props.Registro
      await This.Form.db.updateCampo(newValor, props.prop.ControlSource, Recno)
      // Value.value = Valor
    }

    This.prop.Valid = true

    if (!This.prop.ReadOnly && !This.prop.Disabled) {
      // console.log('isValid', isValid, '2) editText emitValue() !readCam Name=', props.prop.Name, 'This.prop.Value=', This.prop.Value, 'ControlSource=', props.prop.ControlSource, 'Recno=', props.Registro)

      Value.value = newValor

      // console.log('----------------2) editText emitValue() Valid=true update localSQL Name=', props.prop.Name, 'Value=', Value.value, 'newValor=', newValor, 'This.prop.Value = ', This.prop.Value)
      // if (Value.value != This.prop.Value)  // 14/Mar/2025
      //   This.prop.Value = Value.value // 14/Mar/2025

      //  console.log('2) editText emitValue()  update localSQL Name=', props.prop.Name,'Value=',Value.value ,'This.prop.Value=',This.prop.Value)

      emit("update:Value", Value.value); // actualiza el valor Value en el componente padre
      emit("update"); // actualiza el valor Value en el componente padre


      if (Type == 'spinner' || Type == 'checkbox')
        await This.interactiveChange()

      if (!isValid) {
        //console.clear()
        //console.log('3.3) editText emitValue() Valid=false update localSQL Name=', props.prop.Name, 'Value=', Value.value, 'This.prop.Value=', This.prop.Value)

        const newValue = This.prop.Value

        // Aqui me quede 30/Ags/2025
        if (!This.prop.ReadOnly && !await This.valid()) {

          console.log('3.3.1) editText emitValue() Valid=false update localSQL Name=', props.prop.Name, 'Value=', Value.value, 'This.prop.Value=', This.prop.Value)

          This.prop.Valid = false

          // 7/Feb/2024       
          //This.Form.prop.Status = 'A'
          //if (KeyPressed) {
          // focusIn.value    
          //select()  //  Quitamos 11/Ags/2025
          displayError.value = true
          This.prop.ShowError = true

          //}

          //          This.prop.Focus = true
          This.prop.Status = 'A'
          return
        } //else This.prop.Valid = true
        This.prop.Valid = true
        This.prop.Status = 'A'
        // 13/Marzo/2025 Si en el valid cambio el valor se sale para que con el watch prop.Value se actualice el valor
        if (newValue != This.prop.Value)
          return
      }

      // console.log('3.4) editText emitValue() Valid=true update localSQL Name=', props.prop.Name, 'Value=', Value.value, 'This.prop.Value=', This.prop.Value)
      // This.prop.Valid = true
      This.prop.Status = 'A'
      //2/Sep/2025  Status.value = 'A'
      //2/Sep/2025  emit("update:Status", 'A')
      //     console.log('--------------------------------------3) editText emitValue() Name=', props.prop.Name, 'Value=', Value.value, 'This.prop.Value=', This.prop.Value)

    }
    else
      This.prop.Valid = true
    //  displayError.value = false

    // Reasigamos valor de Value
    if (Value.value != newValor)
      Value.value = newValor
    /*
        Status.value = 'A'  // se necesita para que el watch padre funcione
        emit("update:Status", 'A'); // actualiza el valor Status en el componente padre
        This.prop.Status = 'A'
    */

  }
  else {  // Si hay lectura de campo
    //console.log('editText emitValue() 1) readCam Name=', props.prop.Name, 'Valor=', 'prop:value=', This.prop.Value)


    //    This.prop.Valid = true

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


      // console.log('1.1) editText emitValue !RaedName=', props.prop.Name, props.prop.ControlSource, '!isValid=', isValid, 'Value=', Value.value)

      let sw_dat = false

      if (pos > 1) {  // hay controlSource

        //console.log('editText readCampo ',props.prop.ControlSource,'Registro=',props.Registro,'Value=',Value.value,currentValue.value[1])
        const Recno = props.Registro
        const data = await This.Form.db.readCampo(ControlSource, Recno)
        //   console.log('2.0)  editText emitValue() readCam Name=', props.prop.Name, 'data=', data)

        for (const campo in data) {
          /*
                    if (campo == 'key_pri')
                      if (!This.prop.updateKey && data.key_pri == 0)
                        This.prop.Valid = false
            */

          if (campo != 'key_pri') {
            sw_dat = true

            //if (props.Registro && This.Recno != props.Registro)
            //  This.Recno = props.Registro

            //This.prop.Valid = true// ya se capturo algo , se apaga Valid
            Value.value = data[campo] // se regresaraq el valor con emi al v-model:Value

            //  This.prop.Value=Value.value

            //console.log('2.1) editText emitValue writeCampo Name=', props.prop.Name, props.prop.ControlSource, '!isValid=', isValid, 'Value=', Value.value)

            if (!isValid) {
              readValid = true
            }
          }
        }

      }
      if (!sw_dat && pos > 1) { // No encontro dato

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


  }

  // console.log('2.2) editText emitValue Name=', props.prop.Name, props.prop.ControlSource, '!isValid=', isValid, 'Value=', Value.value)

  if (This.onChangeValue) {
    await This.onChangeValue(ref(Styles))
  }

  //  console.log('2.2.0) editText emitValue Name=', props.prop.Name, props.prop.ControlSource, '!isValid=', isValid, 'Value=', Value.value)
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
          console.log('editText Json Name', props.prop.Name, 'currentJson Value=', currentJson.value)

        } catch (error) {
          await MessageBox('Error Invalid Json  :' + Value.value, 16, 'Error')
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
    //  console.log('2.2.1) editText emitValue Name=', props.prop.Name, props.prop.ControlSource, '!isValid=', isValid, 'Value=', Value.value)

  }

  // dato valido para que el watch de This.prop.Value no se active
  if (This.prop.Valid)
    This.prop.Status = 'A'


  /////////////////////////////////////////
  // nextTick(function () {

  //console.log('2.3)editText emitValue readCampo Name=', props.prop.Name, props.prop.ControlSource, '!isValid=', isValid, 'Value=', Value.value)

  // 11/Marzo/2025 se agrego el siguiente if
  //if (Value.value != This.prop.Value)
  //  Value.value = This.prop.Value

  //  console.log('Fin EditText emit Value Name=', This.prop.Name, 'Value=', This.prop.Value, Value.value, 'Valid=', This.prop.Valid, This.prop.Status)

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

  // Se comento 27 Febrero 2025
  /*
  if (!This.prop.Valid) {
   
    displayError.value = true
    This.prop.ShowError = true
    select() // Hace select en el componente    thisElement.select()
    return
  }
*/

  Status.value = 'A'  // se necesita para que el watch padre funcione
  //2/Sep/2025   emit("update:Status", 'A'); // actualiza el valor Status en el componente padre
  This.prop.Status = 'A'

  if (typeof This.prop.Value == 'number') {
    oldVal = This.prop.Value.toString()
  } else
    oldVal = This.prop.Value

  return
}

/*
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


*/
/////////////////////////////////////////////////////////////////////
// lostFocus
// Descripcion: Cuando pierda el foco el componente , actualizamo el valor en cursor local
/////////////////////////////////////////////////////////////////
const lostFocus = async () => {

  if (This.prop.ReadOnly || This.prop.Disabled) {
    return
  }

  for (const element of This.Parent.elements) {
    const comp = element.Name

    if (comp.trim() != This.prop.Name.trim()) {
      if (This.Parent[comp].prop.Status == 'P' && This.Parent.Recno > 0) {
        console.warn('No esta validado el componente', comp)
        return
      }
    }
  }
  /*
    if (displayError.value) {
      displayError.value = false
      if (This.prop.ShowError)
        This.prop.ShowError = false
    }
  */

  await asignaValue()

  // await emitValue(false, false, Value.value) //se puso await
  //console.log('editText onInput lostFocus() Name', props.prop.Name, 'Type=', propType.value, 'Value=', Value.value, 'currentValue.value=', currentValue.value[0])

  if (This.prop.Valid)
    focusIn.value = 0 // Perdio el foco
  return

}


const asignaValue = async () => {
  const Type = propType.value

  if (Type == 'number') {
    typeNumber.value = 'text';

    const valor = +currentValue.value[1]  // 13/Ene/2024
    if (isNaN(valor))
      currentValue.value[1] = 0
    // console.log('1) asignaValue editText Name', This.prop.Name, 'Value=', Value.value, 'currentValue=', currentValue.value[0], currentValue.value[1])


    Value.value = +currentValue.value[1]  //13/Ene/2024
    if (Value.value < +props.prop.Min)
      This.prop.Valid = false

    if (Value.value > +props.prop.Max)

      This.prop.Valid = false

    //  console.log('2) asignaValue editText Name', This.prop.Name, 'Value=', Value.value, 'currentValue=', currentValue.value[0], currentValue.value[1])


  }

  if (Type == 'date') {
    //This.prop.Value = await dateToString(currentDate.value)
    if (currentDate.value < props.prop.Min) {
      currentDate.value = props.prop.Min
      This.prop.Valid = false
    }
    if (currentDate.value > props.prop.Max) {
      currentDate.value = props.prop.Max
      This.prop.Valid = false
    }

    Value.value = await dateToString(currentDate.value)
  }

  if (Type == 'datetime') {
    //This.prop.Value = await dateToString(currentDate.value)

    if (currentDate.value < props.prop.Min) {
      currentDate.value = props.prop.Min
      This.prop.Valid = false

    }
    if (currentDate.value > props.prop.Max) {
      currentDate.value = props.prop.Max
      This.prop.Valid = false
    }

    Value.value = currentDate.value.slice(0, 16)

  }

  if (Type == 'json') {
    Value.value = await JSON.stringify(currentJson.value)
  }

  if (Type == 'text') {
    if (This.style.textTransform == 'uppercase')
      Value.value = Value.value.toUpperCase()

    if (This.style.textTransform == 'lowercase')
      Value.value = Value.value.toLowerCase()
  }

  This.prop.Value = Value.value
  await emitValue() ///se puso await
  return

};

const clickCheckBox = () => {

  This.prop.Value = checkValue.value ? 0 : 1
  // console.log('clickCheckBox editText Name', This.prop.Name, 'Value=', This.prop.Value)

  This.click()

}

/////////////////////////////////////////////////////////////////////
// KeyPress
// Descripcion: Cada tecla que se presiona en el input
/////////////////////////////////////////////////////////////////

const keyPress = ($event: {
  charCode: number;
  preventDefault: () => void;
  keycode: number; charCod: number;

}) => {
  // <input       @keypress="keyPress($event)"
  KeyPressed = true
  //  console.log('1) >>>>>KeyPress===>', $event.target, $event.target.value)
  const char = +$event.charCode
  const Type = propType.value
  if (displayError.value) {
    displayError.value = false
    if (This.prop.ShowError)
      This.prop.ShowError = false
  }


  // oprimió ? (help)
  if ((Type == 'text' || Type == 'number' || Type == 'date') && char == 63) { // '?'
    //console.log('1) Help KeyPres==>', $event.charCode)
    //$event.preventDefault()
    clickHelp()
    $event.keycode = 0;
    return $event.keycode;
  }

  // new KeyboardEvent('keydown', {
  if (Type != 'textarea' && $event.charCode == 13) { //|| // Return
    //   console.log('1.1) nextElement KeyPres==>', $event.charCode)
    return nextElement() //clickReturn()
  }
  // caracteres permitido en input numero

  if (This.prop.Status != 'P')
    This.prop.Status = 'P'

  Key.value = $event.charCode
  This.prop.Key = $event.charCode


  /*
    if (Type == 'number') {
      const cha = String.fromCharCode(This.prop.Key) // obtiene el caracter
      console.log('onMaska keyPress char=', cha)
      const valueText = Value.value.toString()
  
      const pos = valueText.indexOf('.')
      if (cha == '.' && pos > 0)
        return
     
    }
  
  */

  This.keyPress()

  //console.log('3)>>>>>KeyPress===>', char, 'Type=', Type)

}

// $event.charCode == 13 // Down Key  
const nextElement = async () => {  //clickReturn

  const TabIndex = This.prop.TabIndex
  let lastIndex = 999999
  let nextFocus = ''

  if (This.Parent != null)
    if (This.Parent)
      console.log('EditText nextElement Name=', This.prop.Name, 'This.Parent=', This.Parent)


  for (const element in This.Parent) { //.main
    //console.log('EditText nextElement element=', element)
    if (This.Parent[element] != undefined && This.Parent[element].prop && This.Parent[element].prop.Visible &&
      !This.Parent[element].prop.Disabled) {
      const Tab = This.Parent[element].prop.TabIndex

      if (Tab > TabIndex && Tab < lastIndex) {
        lastIndex = Tab
        nextFocus = This.Parent[element].prop.htmlId
        break
      }
    }
  }

  if (nextFocus == '')
    return

  //  console.log('nextElement editText Name', This.prop.Name, 'TabIndex=', This.prop.TabIndex)
  // $event.preventDefault();
  // Obtienee elemento a hacer el focus
  const nextElement = document.getElementById(nextFocus);
  // console.log('EditText keyPres Name',this.prop.Name=', setElement)
  if (nextElement) {
    //  console.log('clickReturn nextFocus =', nextFocus)
    nextElement.focus()
    //  nextElement.focus()

    //$event.keycode = 9;
    return // $event.keycode;
  }

}


/**
 * Agrega el evento click al array de eventos del form
 * @return {void}
 */

const onClick = () => {
  // console.log('EditText onClick Name', This.prop.Name)
  This.Form.eventos.push(This.prop.Map + '.click()')

}

////////////////////////////////////////////////////////////////////
// onFocus
// Descripcion: Cuando se cambie el valor del componente template (Value.value con el teclado),
//              tenemos que emitir hacia el padre el valor capturado (Value.value) y ejecutar el update
// Obs: el when() se llama desde el coponente parent 
/////////////////////////////////////////////////////////////////
const onFocus = async () => {

  // const click = Click == true ? true : false
  // Si esta en un grid checa sus estatus de todas las columnas
  if (This.beforeWhen)
    await This.beforeWhen()

  if (This.Parent && This.Parent.BaseClass == "grid") {
    const grid = This.Parent
    //console.log('EditText onFocus Grid Name', This.prop.Name)
    for (const comp in grid.elements) {
      const compName = grid.elements[comp].Name
      // 24/Dic/2024 .- Se aumenta que sea componente Capture
      if (grid[compName].prop.Status != 'A' && grid[compName].prop.Capture && !grid[compName].prop.Valid) {
        return
      }
    }
  }

  if (!This.Help)
    This.Help = false

  // Cuando esta en un grid y se hace foco a un renglon que no tiene el foco, se debe de correr en when  
  // al hacer el appendRow pone los ReadOnly en false en todos los componentes del grid


  if (This.prop.ReadOnly || This.prop.Disabled) {

    //thisElement.next(':input').focus();
    This.prop.Status = 'A'
    return
  }
  /*
    if (Styles.inputStyle.background != This.inputStyle.background)
      Styles.inputStyle.background = This.inputStyle.background
  */
  //  if (Styles.inputStyle.background != inputStyle.background)

  // Styles.inputStyle.background = inputStyle.background

  //  KeyPressed = false

  // textValue[0]  perdio foco, textValue[1] obtiene el foco
  // Si es la primera vez que se hace foco
  //  let sw_when = false
  if (focusIn.value == 0) {
    await emitValue(true)
    //   sw_when = true
    focusIn.value = 1
    //Asignamos  el background del input originañ
  }

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

      if (!This.Sql.View[tabla].est_tabla[campo]) {
        console.error('editText onFocus() Error: No se encontro el campo', campo, 'en la vista', tabla)
        return
      }
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

  if (focusIn.value == 1) { // sw_when 11/Ags/2025

    await nextTick()

    This.Form.eventos.push(This.prop.Map + '.when()')

    /*      if (Clicked) {
            This.Form.eventos.push(This.prop.Map + '.click()')
            console.log('1)====> when cam_dat=', This.prop.Name, 'Clicked=', Clicked)
          }
      */
    //   })
    // select() // 8/Ags/2025 Se quito 

  }


  //nextTick(function () {

  // const element = document.getElementById(Id);
  // select()   // 4 Julio 2024

  return
}


const clickHelp = async () => {

  if (focusIn.value == 0)
    await onFocus()

  if (This.prop.Help) {
    //   console.log('1) clickHelp')
    // This.Form.eventos.push(This.prop.Map + '.help.open()')
    await This.help.open()


  }
}
const select = async () => {
  // console.log('editText select Name=', This.prop.Name, 'thisElement=', thisElement)
  This.prop.Focus = false
  /*
    if (document.activeElement != thisElement) {
      // Ref.value.focus();
      // Ref.value.select();
  
      thisElement.focus({ focusVisible: true });
      // thisElement.select();
  
      
    }
    */
  setTimeout(function () {
    //thisElement.focus({ focusVisible: true });
    if (thisElement.select)
      thisElement.select();  // setSelectionRange(selectionStart, selectionEnd, selectionDirection)
  }, 300);

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
    if (!This.prop.ShowError && displayError.value)
      displayError.value = false
    console.log('Component=', This.prop.Name, 'displayError=', displayError.value)
  },
  { deep: false }
);


watch(
  () => This.prop.InputMask,
  () => {
    maska.value.mask = This.prop.InputMask.replace(/!/gi, 'A')
  },
  { deep: false }
);

/////////////////////////////////////////////////////////////////////
// change This.prop.Enabled
/////////////////////////////////////////////////////////////////
watch(
  () => This.prop.Enabled,
  () => {
    if (This.prop.Disabled != !This.prop.Enabled)
      This.prop.Disabled = !This.prop.Enabled

  },
  { deep: false }
);


/////////////////////////////////////////////////////////////////////
// change This.prop.ShowError
/////////////////////////////////////////////////////////////////
watch(
  () => This.prop.nextFocus,
  () => {
    if (This.prop.nextFocus) {
      nextElement()
      This.prop.nextFocus = false
    }
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
      Styles.style.height = '0%'
    else
      Styles.style.height = This.style.height
 
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

    // console.log('EditText Watch ControlSource Name=', This.prop.Name, 'new_val =', new_val)
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
  () => This.Recno, //props.Registro,
  async () => {
    //    console.log('EditText Watch prop.Registro Name=', This.prop.Name)
    await emitValue(true)
    This.Recno = props.Registro
    This.recnoChange()
  },
  { deep: true }
);


////////////////////////////////////////
// Hacer el set focus 
///////////////////////////////////////


watch(
  () => This.prop.Focus, //props.prop.Focus,
  (new_val: any, old_val: any) => {
    //console.log('1)EditText Watch Focus Name=', This.prop.Name, This.prop.Focus)
    if (!new_val) {
      return
    }
    /*
       En comboBox se utiliza 
       onFocus()
       return
    */

    // Se pidio desde afuera el setFocus

    if (document.activeElement != thisElement) {
      thisElement.select();

    }
    setTimeout(function () {
      thisElement.focus({ focusVisible: true });
      thisElement.select();


    }, 0);



    /*  Se cambio 4/Sep/2025
        if (thisElement != null && document.activeElement != thisElement)
          return thisElement.focus();
    
        select()
    */
    return
  },
  { deep: false }
)

/*13/Marzo/2025
////////////////////////////////////////
//
///////////////////////////////////////
watch(
  () => Valor,
  (new_val: any, old_val: any) => {

    if (propType.value.slice(0, 4) == 'date')
      console.log('>>>  RefValue EditText Watch Name=', This.prop.Name, 'Value=', This.prop.Value, 'Value.value=', Value.value)
    console.log(' EditText Watch Valor Name=', This.prop.Name, 'Value=', This.prop.Value, Value.value, 'Valid=', This.prop.Valid, This.prop.Status)


    Value.value = This.prop.RefValue.value

    return

  },
  { deep: false }
)
*/

////////////////////////////////////////
// Si se cambia This.prop.Value desde afuera del componente 
///////////////////////////////////////
watch(
  () => This.prop.Value, //This.prop.Value, //props.prop.Value, //Value.value,

  async (new_val: any, old_val: any) => {


    if (new_val == Value.value)
      return



    if (watchPropValue) // Si se cambio desde el emitValue se ignora
      return

    if (new_val === undefined || new_val === null) {
      switch (Type) {
        case 'number':
          new_val = 0
          break;
        case 'checkbox':
          new_val = 0
          break;
        case 'date':
          new_val = '1900-01-01' //T00:00:00'
          break;
        case 'datetime':
          new_val = '1900-01-01T00:00:00'
          break;
        default:
          new_val = ''
      }

    }

    watchPropValue = true

    //console.log('1) EditText Watch Value Name=', This.prop.Name, 'this.Value=', This.prop.Value, 'Value=', Value.value, 'watchPropValue=', watchPropValue, This.prop.Status)

    if (This.prop.Status == 'P') {// No se ha salido del componente

      ///////////  24/Marzo2025     Se cambia compara Value.value por new_val
      switch (This.prop.Type) {
        case 'number':

          currentValue.value[1] = +new_val //.toString().trim() // Captura
          currentValue.value[0] = await numberFormat(+new_val, This.prop.Currency, This.prop.MaxLength, This.prop.Decimals)

          //          emit("input:currentValue")   //, currentValue.value[0]); // actualiza el valor Value en el componente padre
          break;
        case 'checkbox':
          let check = new_val == 0 ? false : true
          if (checkValue.value != check) {
            checkValue.value = check
            //            emit("update:checkValue", checkValue)
          }
          break;

        case 'json':
          compJson.value = []
          if (new_val.trim().length > 5) {
            try {
              currentJson.value = JSON.parse(new_val)
            } catch (error) {
              await MessageBox('Error Invalid Json  :' + new_val, 'Error')
              currentJson.value = []
            }
          }

          for (const comp in currentJson.value)
            compJson.value.push(currentJson.value[comp])

          break;

        case 'date':
          if (new_val == '')
            new_val = '1900-01-01'
          if (new_val.length > 10)
            new_val = new_val.slice(0, 10) //+ 'T00:00:00'
          displayDate.value = new Date(new_val).toDateString()

          currentDate.value = await stringToDate(new_val)
          /*
                    nextTick(function () {
                      emit("input:displayDate", displayDate); // actualiza el valor Value en el componente padre
                      emit("input:currentDate", currentDate); // actualiza el valor Value en el componente padre
          
                    })
          */
          break;

        case 'datetime':
          if (new_val == '')
            new_val = '1900-01-01T00:00:00'

          new_val = new_val.slice(0, 16)

          displayDate.value = new Date(new_val)
          currentDate.value = await stringToTime(new_val)
          break;


      }


      /*  Modificado 24/Marzo/2025  
          Value.value = This.prop.Value
          switch (This.prop.Type) {
            case 'number':
    
              if (Value.value == null)
                Value.value = 0
    
              currentValue.value[1] = +Value.value //.toString().trim() // Captura
              currentValue.value[0] = await numberFormat(Value.value, This.prop.Currency, This.prop.MaxLength, This.prop.Decimals)
    
              //          emit("input:currentValue")   //, currentValue.value[0]); // actualiza el valor Value en el componente padre
              break;
            case 'checkbox':
              let check = Value.value == 0 ? false : true
              if (checkValue.value != check) {
                checkValue.value = check
                //            emit("update:checkValue", checkValue)
              }
              break;
    
            case 'json':
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
              if (Value.value == '' || Value.value == null)
                Value.value = '1900-01-01'
              if (Value.value.length > 10)
                Value.value = Value.value.slice(0, 10) //+ 'T00:00:00'
              displayDate.value = new Date(Value.value).toDateString()
    
              currentDate.value = await stringToDate(Value.value)
            
              break;
    
            case 'datetime':
              if (Value.value == '' || Value.value == null)
                Value.value = '1900-01-01T00:00:00'
    
              Value.value = Value.value.slice(0, 16)
    
              displayDate.value = new Date(Value.value)
              currentDate.value = await stringToTime(Value.value) //Value.value.slice(0, 19)
    
              break;
            default:
              if (Value.value == null)
                Value.value = ''
    
          }
    
    */

    }

    //  if (This.prop.Valid) return

    // Si el valor nuevo es diferente al anterior
    // if (new_val != Value.value) {
    // console.log('--------Fin 1) EditText Watch This.prop.Value Name=', This.prop.Name, 'Value=', This.prop.Value, 'new_val', new_val, 'Status=', This.prop.Status)
    await emitValue(false, true, new_val)  // This.prop.Valid) //se puso await
    watchPropValue = false
    if (This.prop.Valid && This.onChangeValue) {
      //console.log('watch emit Value comboBox onChangeValue Name=', props.prop.Name, 'Value=', This.prop.Value)
      if (This.onChangeValue) {
        await This.onChangeValue(ref(Styles))
      }


    }
    //console.log('--------Fin 2) EditText Watch This.prop.Value Name=', This.prop.Name, 'Value=', This.prop.Value, Value.value, 'Status=', This.prop.Status)
    // }
  },
  { deep: true }
);

////////////////////////////////////////////////////////////////////
// change This.prop.Type
/////////////////////////////////////////////////////////////////
watch(
  () => This.prop.Type, //props.prop.Value, //Value.value,
  async (new_val: boolean) => {

    if (Value.value !== This.prop.Value) {
      Value.value = This.prop.Value
    }

    styleAssing()
  },
  { deep: false }
);

////////////////////////////////////////////////////////////////////
// change This.prop.Valid   
// Change background color of input whene not Valid
/////////////////////////////////////////////////////////////////
watch(
  () => This.prop.Valid, //props.prop.Value, //Value.value,
  async (new_val: boolean, old_val: boolean) => {
    Valid()
  },
  { deep: false }
);


////////////////////////////////////////////////////////////////////
// change This.prop.ReadOnly
// Change background color of input whene ReadOnly
/////////////////////////////////////////////////////////////////
watch(
  () => This.prop.ReadOnly, //props.prop.Value, //Value.value,
  async (new_val: boolean, old_val: boolean) => {

    ReadOnly()

  },
  { deep: false }
);

////////////////////////////////////////////////////////
// Cambia el estilo del input segun su validacion
////////////////////////////////////////////////////////
const Valid = () => {
  const estilo = This.inputStyle
  const invalid = This.invalidInputStyle
  const readOnly = This.readOnlyInputStyle
  ReadOnly()
  if (This.prop.ReadOnly) {
    return
  }

  Styles.inputStyle.background = estilo.background
  Styles.inputStyle.opacity = estilo.opacity

  if (This.prop.Valid) {
    console.log('watch VALID This.prop.Valid Name=', props.prop.Name)

    Styles.inputStyle.border = estilo.border
    if (This.Parent.Valid[This.refValid]) // predemos el arreglo de validaciones para el watch
      This.Parent.Valid[This.refValid].value = true   // 

    //This.Valid.value[This.refValue]=true 
    //Comp.refValid = this.Valid.value.length-1

  } else {

    Styles.inputStyle.border = invalid.border

    if (This.Parent.Valid[This.refValid]) //  This.Parent.prop.BaseClass == 'Form' predemos el arreglo de validaciones para el watch
      This.Parent.Valid[This.refValid].value = false
  }

}
////////////////////////////////////////////////////////
// Cambia el estilo del input segun si es de solo lectura
////////////////////////////////////////////////////////
const ReadOnly = () => {
  if (This.prop.ReadOnly) {
    //      Styles.inputStyle = { ...This.readOnlyInputStyle }

    Styles.inputStyle.background = readOnlyInputStyle.background
    Styles.inputStyle.opacity = readOnlyInputStyle.opacity
    displayError.value = false // Apagamos mensaje de error
  }
  else {
    //Styles.inputStyle = { ...This.inputStyle }
    Styles.inputStyle.background = This.inputStyle.background
    Styles.inputStyle.opacity = This.inputStyle.opacity
  }

}
// 


const onMaska = (event: CustomEvent<MaskaDetail>) => {
  console.log('onMaska=',
    {
      //masked: event.detail.masked,
      // unmasked: event.detail.unmasked,
      // completed: event.detail.completed
    }

  )
}

const styleAssing = async () => {

  const Type = propType.value.toLowerCase()

  if (Type == 'date') {
    Styles.inputStyle.width = '120px'
    Styles.inputStyle.height = '18px'
    Styles.inputStyle.maxHeight = '20px'
  }
  if (Type == 'datetime-local') {
    Styles.inputStyle.width = '170px'
    Styles.inputStyle.height = '18px'
    Styles.inputStyle.maxHeight = '20px'
  }

  if (Type == 'json') {
    Styles.style.borderWidth = '1px'
    Styles.style.borderStyle = 'solid'
    Styles.style.height = 'auto'
    Styles.style.borderRadius = '4px'
    Styles.style.color = 'black'
  }


  if (Type == 'textarea' || Type == 'text') {
    //  console.log('2) EditText Name=', This.prop.Name, 'Styles.inputStyle.width =', Styles.inputStyle.width)
    if (Styles.inputStyle.width == 'auto')
      Styles.inputStyle.width = '100%'
    Styles.inputStyle.textAlign = 'left'
  }

  if (Type == 'number')
    Styles.inputStyle.textAlign = 'right'

  if (Type == 'checkbox') {

    Styles.inputStyle.width = '13px'
    Styles.inputStyle.borderRadius = '50%';  // No quitar esto porque quita el circulo
  }

}
/**
 * Handler for right click event on the component
 *
 * @param {MouseEvent} event - the event
 */
const middleClick = () => {
  console.log('middleClick')
  if (This.Form && This.Form.translateContainer)
    This.Form.translateContainer.open(ref(This))
}

const handler = (event) => {
  if (event.which === 1) {
    //if (This.Form)
    //  This.Form.translateContainer.open(ref(This))

  }
  event.preventDefault();
}
/////////////////////////////////////////
// Metodo init 
/////////////////////////////////////////

//const init = async () => {
//await callOnce(async () => {

onMounted(async () => {
  thisElement = document.getElementById(Id) // Obtiene el id de este componente en el DOM

  styleAssing()

  if (propType.value == 'text' || propType.value == 'number' || propType.value == 'checkbox')
    Styles.inputStyle.maxHeight = Styles.style.fontSize
  if (propType.value == 'number')
    Styles.inputStyle.textAlign = 'right'

  if (propType.value.toLowerCase == 'checkbox') {

    // Styles.inputStyle.padding = '5px';
    // Styles.inputStyle.marginRight = '5px';
    //Styles.inputStyle.border = '1px solid #D6D6D6';
    //  Styles.inputStyle.borderRadius = '50%';
    //  Styles.inputStyle.cursor = 'pointer';
    //   Styles.inputStyle.background = 'radial-gradient(circle at center, #f2f2f2 50%, transparent 50%)';
    //   Styles.inputStyle.backgroundRepeat = 'no-repeat';
    //   Styles.inputStyle.backgroundPosition = 'center';
    //   Styles.inputStyle.backgroundSize = '5px 5px';
    //   Styles.inputStyle.width = '5px';

  }


  if (propType.value == 'textarea')
    Styles.captionStyle.alignContent = 'flex-start'

  if (!This.prop.Visible)
    Styles.style.height = '0%'

  if (!This.prop.RefValue == null)
    Value.value = This.prop.RefValue.value

  const result = await emitValue(true)
  This.Recno = props.Registro

  if (typeof Value.value == 'number')
    oldVal = Value.value.toString()   // asignamos el valor viejo  
  else
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

  // console.log('1) editText onMounted Name=', This.prop.Name, 'Value=', Value.value)

  This.afterMounted()

  await This.recnoChange()
  This.prop.Status = 'A'

  // si es el primer elemento a posicionarse
  if (props.prop.First || props.prop.Focus) {
    // This.prop.First = false
    This.prop.Focus = false
    This.prop.Focus = true
    // props.prop.First = false
    // props.prop.Focus = false
    // props.prop.Focus = true

    // select()
    //    onFocus()
    return
  }

  Valid()


})

onBeforeMount(async () => {

  // console.log('2) editText onBeforeMount Name=', This.prop.Name)
  // if (This.init)
  //   await This.init()
})


onMounted(async () => {
  if (This.onMounted) await This.onMounted()
})

onUnmounted(async () => {
  if (This.onUnmounted) await This.onUnmounted() //  console.log('ComboBox Desmontado onUnMounted', This.prop.Name, This.onUnmounted)
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


</script>
<style scoped>
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