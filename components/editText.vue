<template>
  <!--Se necesita el siguiente div para que funcione el siguiente v-show-->
  <div class="divi" :style="divStyle" v-show="This.prop.Visible">
    <div class="mensajes" v-show="This.prop.Visible">

      <span class="etiqueta" v-if="prop.textLabel">{{ prop.textLabel + " " }}</span>

      <!--mensajes de error y tooltip
    -->
      <!--div class="component" :style="prop.componentStyle"-->
      <!--number 
      @input.self="onInput" -->

      <!--number-->

      <input v-if="prop.Type == 'number'" class="number" type="text" :style="componentStyle" ref="Ref"
        :disabled="prop.Disabled" :min="prop.Min" :max="prop.Max" v-model="currentValue[focusIn]" :readonly="ReadOnly"
        :placeholder="prop.Placeholder" :tabindex="prop.TabIndex" @focusout="onBlur" @keypress="keyPress($event)"
        @focus="onFocus" @input.self="onInput" pattern="([0-9]{1,15}).([0-9]{1,5})">

      <!--spinner-->

      <input v-else-if="prop.Type == 'spinner'" class="number" type="number" :style="componentStyle" ref="Ref"
        :disabled="prop.Disabled" :min="prop.Min" :max="prop.Max" v-model="This.prop.Value" :readonly="ReadOnly"
        :tabindex="prop.TabIndex" @keypress="keyPress($event)" @focus="onFocus" @input="emitValue(false)">

      <!--textArea -->
      <div v-else-if="prop.Type == 'textArea'" :style="componentStyle">
        <textarea class="textArea" ref="Ref" :style="componentStyle" v-model="Value" :readonly="ReadOnly"
          :disabled="prop.Disabled" :placeholder="prop.Placeholder" :tabindex="prop.TabIndex" type="textArea"
          :rows="componentStyle.rows" :cols='componentStyle.cols' @keypress="keyPress($event)" @focusout="focusOut"
          @focus="onFocus"></textarea>
      </div>

      <!--fecha v-model="currentValue[1]"  v-model="currentDate" se utiliza el value para que con emit funcione-->
      <!--div v-else-if="prop.Type.slice(0, 4) == 'date'"-->
      <input v-else-if="prop.Type.slice(0, 4) == 'date'" class="date" ref="Ref" :style="componentStyle"
        :type="prop.Type == 'date' ? 'date' : 'datetime-local'" :min="prop.Min" :max="prop.Max" v-model="currentDate"
        :disabled="prop.Disabled" :readonly="ReadOnly" :tabindex="prop.TabIndex" @keypress="keyPress($event)"
        @focusout="onBlur">
      <!--input v-show="focusIn == 0" class="text" :style="componentStyle" type="text" v-model="displayDate"
          :readonly="true" :placeholder="prop.Placeholder" @focus="onFocus"-->
      <!--/div-->


      <div class='json' v-else-if="prop.Type == 'json'" ref="Ref" :style="componentStyle">

        <!--span  v-if="currentJson[comp][data].type=='label'">{{ currentJson[comp][data].value + " " }}</span>
                <input v-if="currentJson[comp][data].type==!label"
                  v-model="currentJson[comp][data].value" :type="currentJson[comp][data].type" -->

        <!--TransitionGroup name='detailJson' tag="div"-->
        <details v-for="( comp, index ) in  compJson " key:='index'>
          <summary :style="{ fontWeight: 'bold' }" :key='index'>{{ comp.label }} </summary>
          <input v-model="comp.value" :type="comp.type ? comp.type : 'text'" :readonly="comp.readOnly ? true : false"
            :style="comp.style ? comp.style : { width: 'auto' }" @focusout="onBlur">

        </details>
        <!--/TransitionGroup-->
      </div>

      <!--checkBox-->
      <!--div v-else-if="prop.Type == 'checkBox'"-->
      <input v-else-if="prop.Type == 'checkBox'" class="checkBox" type="checkbox" id="checkbox" :style="componentStyle"
        ref="Ref" :readonly="ReadOnly" :disabled="prop.Disabled || ReadOnly" :tabindex="prop.TabIndex"
        v-model="checkValue" @focus="onFocus">

      <!--label for="checkbox">{{ checkValue }}</label-->
      <!--/div-->
      <!--Si es texto
        @focusout="focusOut"
           @change="change"
            :maxlength="prop.MaxLength" 
            :size="prop.MaxLength"
      -->
      <input v-else class="text" ref="Ref" :style="componentStyle" :type="prop.Type" v-model.trim="Value"
        :readonly="ReadOnly" :disabled="prop.Disabled" :maxlength="prop.MaxLength" :size="prop.MaxLength"
        :placeholder="prop.Placeholder" :tabindex="prop.TabIndex"
        v-on:keyup.enter="$event.target.nextElementSibling.focus()" @keypress="keyPress($event)" @focusout="focusOut"
        @focus="onFocus">

      <span class="tooltiptext" v-if="prop.ToolTipText.length > 0" v-show="ToolTipText && prop.Valid"
        :style="{ zIndex: zIndex + 10 }">{{
          prop.ToolTipText
        }}</span>
      <span class="errorText" v-show="ShowError && prop.ErrorMessage.length > 1">{{ prop.ErrorMessage }}</span>
      <!--/div--> <!--fin class=component -->
    </div>
  </div>
</template>



<script setup lang="ts">
//import component from 'vue3-table-lite/ts';


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
const emit = defineEmits(["update", "update:Value",
  "input:currentValue",  // "input:currentValue[1]",
  "input:currentDate", "input:displayDate",
  "update:checkValue", "update:Valid", "update:Status", "update:Key", "update:Focus", 'customChange']) //, "update:ShowError", "update:Ref","update:Recno",


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
    When: boolean;
    componentStyle: {
      background: "white";
      padding: "5px"; // Relleno
      color: "#b94295";
      width: "200px";
      height: "30px";
      fontFamily: "Arial";
      fontSize: "13px"; // automaticamente vue lo cambiara por font-size (para eso se utiliza la anotacion Camello)
      textAlign: string;
      cols: "100";
      rows: "5";
    };

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
    zIndex: 1

  };
  position: {
    position: "left"; //left,right,center,absolute. Si es absulute poner Value left y top
    left: number;
    Top: number;
  };
  //db: any
}>();


const ReadOnly = computed(() => !props.prop.When || props.prop.ReadOnly ? true : false)

const Component = ref(props.prop.This)
const This = Component.value
const Value = ref(props.prop.Value)
//const Recno = ref(0)
const Valid = ref(props.prop.Valid)
Valid.value = true
const Ref = ref(null) // Se necesita paratener referencia del :ref del componente  ref(props.prop.Ref)
//const RefInput = ref(null) // Se necesita paratener referencia del :ref del componente  ref(props.prop.Ref)

const Status = ref(props.prop.Status);
const ToolTipText = ref(true)
Status.value = 'I'
const Key = ref(props.prop.Key)
//const Focus = ref(props.prop.Focus)
// Focus.value = false
//const First = ref(props.prop.First)

var oldVal = Value.value
const ShowError = ref(false) //ref(props.prop.ShowError)
const checkValue = ref(false)


const divStyle = reactive(props.style)
const zIndex = divStyle.zIndex
const componentStyle = reactive(props.prop.componentStyle)
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

  focusIn.value = 0  // Perdio el foco
  if (props.prop.Type == 'number') {

    //    Value.value = +currentValue.value[1]

    // This.prop.Value = +currentValue.value[1]
    Value.value = +currentValue.value[1]

    typeNumber.value = 'text';
  }
  if (props.prop.Type == 'date') {
    //This.prop.Value = await dateToString(currentDate.value)
    Value.value = await dateToString(currentDate.value)

  }
  if (props.prop.Type == 'datetime') {
    //This.prop.Value = await dateToString(currentDate.value)
    Value.value = currentDate.value
  }

  if (props.prop.Type == 'json') {
    Value.value = await JSON.stringify(currentJson.value)

    //g(currentDate.value)
  }

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
const emitValue = async (readCam?: boolean, isValid?: boolean, Valor?: string) => {

  //outFocus.value = true
  if (This.Form.prop)
    This.Form.prop.Status = 'P'

  This.prop.Status = 'P'
  let readValid = false
  Status.value = 'P'
  emit("update:Status", 'P'); // actualiza el valor Status en el componente padre
  // let Valor = ''
  if (!readCam) { // En valor viene el valor actual capturado

    // console.log('editText emitValue() 1) !readCam Name=', props.prop.Name, 'isValid=', isValid, 'Valor=', Valor,'Value.value=', Value.value)
    // Si no viene del watch This.prop.Value
    if (!Valor)
      Valor = This.prop.Value  // Si viene del watch This.prop.Value

    Valor = Value.value

    /*

    if (!isValid) {

    if (!Valor)
      Valor=This.prop.Value  // Si viene del watch This.prop.Value
    switch (props.prop.Type) {
      case 'number':
        if (!currentValue.value[1]) {
          currentValue.value[1] = ''
          currentValue.value[0] = ''
        }
        Valor = +currentValue.value[1]
        break;
      case 'checkBox':

        Valor = checkValue.value ? 1 : 0
        break;

      case 'json':
        Valor = ''
        let fields = '[';
        for (let i = 0; g < currentJson.value.length; i++) {

          for (const campo in currentJson.value[g]) {
            const d = currentJson.value[campo]
            const field = {
              [campo]:
              {
                component: { type: "label", label: "Field", value: d.component.value },
                header: { type: "editText", label: "Header", value: d.header.value },
                enabled: { type: "checkBox", label: "Enabled", value: d.enabled.value },
                position: { type: "edittext", label: "Position", value: d.position.value }
              }
            }

            fields = fields + JSON.stringify(field) + ','
            // m.yes_report=1
            // m.header_report=m.des_cam
          }
        }
        Valor = fields + ']'

        break;


      case 'date':
        //          if (!currentValue.value[1]) {
        //            currentValue.value[1] = await stringToDate('')
        //            currentValue.value[0] = new Date().toISOString().substring(0, 10)
        //}
        //          Valor = await dateToString(currentValue.value[1])

        displayDate.value = new Date().toISOString()
        currentDate.value = await stringToDate()
        Valor = '1900-01-01'

        break;
      default:
        Valor = This.prop.Value //  Value.value
        break;
    }
    console.log('editText emitValue() 2) !readCam Name=', props.prop.Name, 'Valor=', Valor, 'prop:value=', This.prop.Value)

  } // elseValor = props.prop.Value

        */



    if (props.Registro > 0 && props.prop.ControlSource && props.prop.ControlSource.length > 2) {
      await This.Form.db.updateCampo(Valor, props.prop.ControlSource, props.Registro)
      // Value.value = Valor
    }

    // Si no hay error
    This.prop.Valid = true
    if (!This.prop.ReadOnly && !This.prop.Disabled) {
      if (Value.value != Valor)
        Value.value = Valor

      // This.prop.Value=Valor // Actualizamos el This.prop.Value para que el Valid Funcione

      //  console.log('1) editText emitValue()  update localSQL Name=', props.prop.Name,'Value=',Value.value ,'This.prop.Value=',This.prop.Value)

      This.prop.Value = Value.value
      //  console.log('2) editText emitValue()  update localSQL Name=', props.prop.Name,'Value=',Value.value ,'This.prop.Value=',This.prop.Value)

      emit("update:Value", Value.value); // actualiza el valor Value en el componente padre
      emit("update"); // actualiza el valor Value en el componente padre


      if (props.prop.Type == 'spinner' || props.prop.Type == 'checkBox')
        await This.interactiveChange()

      if (!isValid) {
        // console.log('3.0) editText emitValue() Valid=false update localSQL Name=', props.prop.Name,'Value=',Value.value ,'This.prop.Value=',This.prop.Value)

        if (await This.valid() == false) {
          //  console.log('3.1) editText emitValue() Valid=false update localSQL Name=', props.prop.Name,'Value=',Value.value ,'This.prop.Value=',This.prop.Value)

          //          ShowError.value = true
          This.prop.Valid = false
          /*
                    This.prop.Status = 'A'
                    Status.value = 'A'
                    emit("update:Status", 'A'); // actualiza el valor Status para que funcione el watch en el componente padre
                    This.Form.prop.Status = 'A'
                 
                    Ref.value.select() // Hace select en el componente
                     return
                   */
        } //else This.prop.Valid = true


      } // else This.prop.Valid = true


    }

    // Reasigamos valor de Value
    if (Value.value != Valor)
      Value.value = Valor

  }
  else {  // Lectura de campo
    //console.log('editText emitValue() 1) readCam Name=', props.prop.Name, 'Valor=', 'prop:value=', This.prop.Value)


    Valor = ''
    This.prop.Valid = true

    if (props.Registro == 0 || props.prop.ControlSource.length == 0) { // limpia value
      if (props.prop.Value == null) {
        switch (props.prop.Type) {
          case 'number':
            Value.value = 0
            break;
          case 'checkBox':
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
      //  if (This.Parent.Recno = !props.Registro)
      //    This.Parent.Recno = props.Registro

      //console.log('editText readCampo ',props.prop.ControlSource,'Registro=',props.Registro,'Value=',Value.value,currentValue.value[1])
      const data = await This.Form.db.readCampo(props.prop.ControlSource, props.Registro)
      // console.log('editText emitValue() 2) readCam Name=', props.prop.Name, 'data=', data)

      let sw_dat = false
      for (const campo in data) {
        if (campo != 'key_pri') {
          sw_dat = true

          if (props.Registro && This.Recno != props.Registro)
            This.Recno = props.Registro

          //This.prop.Valid = true// ya se capturo algo , se apaga Valid
          Value.value = data[campo]

          // console.log('editText emitValue readCampo ',props.prop.ControlSource,'!isValid=',isValid,'Value=',Value.value)

          if (!isValid) {
            readValid = true
          }
        }
      }
      if (!sw_dat) { // No encontro dato

        switch (props.prop.Type) {
          case 'number':
            Value.value = 0

            break;
          case 'checkBox':
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


  switch (props.prop.Type) {
    case 'number':
      currentValue.value[1] = Value.value.toString()
      currentValue.value[0] = await numberFormat(Value.value, props.prop.Currency, props.prop.MaxLength, props.prop.Decimals)
      emit("input:currentValue")   //, currentValue.value[0]); // actualiza el valor Value en el componente padre
      break;
    case 'checkBox':
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
      if (Value.value == '')
        Value.value = '1900-01-01'

      Value.value = Value.value.slice(0, 10) //+ 'T00:00:00'
      //   currentValue.value[1] = await stringToDate(Value.value)
      //   currentValue.value[0] = new Date(Value.value).toDateString()

      displayDate.value = new Date(Value.value).toDateString()
      currentDate.value = await stringToDate(Value.value)
      nextTick(function () {
        emit("input:displayDate", displayDate); // actualiza el valor Value en el componente padre
        emit("input:currentDate", currentDate); // actualiza el valor Value en el componente padre

      })

      break;

    case 'datetime':
      //console.log('editText emitValue() Name D', props.prop.ControlSource, 'Valor=',Valor,'Value=',Value.value)
      if (Value.value == '')
        Value.value = '1900-01-01T00:00:00'

      //   currentValue.value[1] = await stringToDate(Value.value)
      //   currentValue.value[0] = new Date(Value.value).toDateString()

      displayDate.value = new Date(Value.value).toTimeString()
      currentDate.value = Value.value.slice(0, 19)
      nextTick(function () {
        emit("input:displayDate", displayDate); // actualiza el valor Value en el componente padre
        emit("input:currentDate", currentDate); // actualiza el valor Value en el componente padre

      })

      break;




  }

  //console.log('5) editText emitValue() Fin Name=', props.prop.Name,'This.prop.Valid=',This.prop.Valid)


  //Valid.value = true

  //  This.prop.Valid = true // dato valido para que el watch de This.prop.Value no se active
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
  console.log('editText emitValue() Name', props.prop.Name, 'Type=', props.prop.Type,
    'This.prop.Value=', This.prop.Value,
    'currentValue.value=', currentValue.value[0], currentValue.value[1],
    'currentDate.value=', currentDate.value, displayDate.value,
    //    'checkValue=', checkValue.value,
    'ValidOnRead=', This.prop.ValidOnRead,
    'readValid', readValid,
    'focusIn=', focusIn.value)

  if (This.prop.ValidOnRead && readValid) { // Se manda validar despues de leer el componente
    This.valid()
  }

  if (!This.prop.Valid) {
    //   console.log('5) editText emitValue() ERRROR en Valid Name=', props.prop.Name)

    ShowError.value = true
    Ref.value.select() // Hace select en el componente
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
// focusOut
// Descripcion: Cuando pierda el foco el componente , actualizamo el valor en cursor local
/////////////////////////////////////////////////////////////////
const focusOut = async () => {
  focusIn.value = 0  // Perdio el foco
  //This.prop.Value=Value.value
  await emitValue(false, false, Value.value) //se puso await

  // emitValue() ///se puso await
  return

};
/////////////////////////////////////////////////////////////////////
// KeyPress
// Descripcion: Cada tecla que se presiona en el input
/////////////////////////////////////////////////////////////////

const keyPress = ($event) => {
  // <input       @keypress="keyPress($event)"
  //console.log('KeyPress===>', $event.charCode)
  if (ShowError.value)
    ShowError.value = false

  if (!ToolTipText.value)
    ToolTipText.value = false
  if ($event.charCode == 13) {

    //console.log('Enter keyPress=', $event.charCode)

    //$event.charCode = 9
    // window.event.keyCode = 9;
    //const next = $event.currentTarget.nextElementSibling;
    //$event.target.parentElement.nextSibling.children[1].focus()
    //next.focus();
    // emit('tab')
    Key.value = $event.charCode
    emit('customChange', $event.target.value + String.fromCharCode(9))

    // emit('customChange', event.target.value.toUpperCase())

    // new KeyboardEvent('keydown', {
    //      keyCode: 40
    //  })

    //revisar esto
    // $event.dispatchEvent(new KeyboardEvent('keyTab', { 'key': 'a' }));

  } else {
    //    Status.value = 'P'  //Aqui me quede
    //    emit("update:Status", 'P')
    if (This.prop.Status != 'P')
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
  //console.log('editText onFocus ', props.prop.Name, props.prop.ReadOnly)
  ToolTipText.value = false
  ShowError.value = false
  focusIn.value = 1
  emit("update:Value", Value.value)
  Ref.value.focus()
  Ref.value.select()


  if (props.prop.Type.slice(0, 4) == 'date') {
    This.prop.Focus = true
    // Ref.value.focus() // hace select en el input
  }

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
/*
const readCampo = async (recno: number) => {

  if (props.Registro == 0) { // limpia value
    if (props.prop.Type == 'number')
      Value.value = 0
    else
      Value.value = ''

    return
  }
  // console.log('editText readCampo ',props.prop.ControlSource,'Registro=',props.Registro,'Value=',Value.value,currentValue.value[1])

  const data = await This.Form.db.readCampo(props.prop.ControlSource, props.Registro)
  This.prop.Valid = true // dato valido para que el watch de This.prop.Value no se active
  for (const campo in data) {
    if (campo != 'key_pri') {
      Value.value = data[campo]

    }
  }
  emitValue(true)
  return true
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
  () => This.prop.Value, //This.prop.Value, //props.prop.Value, //Value.value,
  async (new_val, old_val) => {
    if (This.prop.Status == 'P') // se cambio desde el mismo proceso
      return

    //  if (This.prop.Valid) return
    if (new_val != old_val) {
      if (This.prop.Type == 'date')
        if (new_val.slice(0, 10) == Value.value.slice(0, 10))
          return
      // Value.value = This.prop.Value
      /*
      console.log('EditText Watch Name=', This.prop.Name,
        'prop.Valid =', This.prop.Valid,
        'Status=', This.prop.Status,
        'Value=', This.prop.Value, Value.value,
        'Valid=', This.prop.Valid,
        'checkValue=', checkValue.value)
        */
      //      if (Value.value == This.prop.Value)
      //         await emitValue(false, true) //se puso await
      //      else
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
  async (new_val, old_val) => {

/*
    if (new_val)
      This.prop.Value = 1
    else
      This.prop.Value = 0
*/  if (new_val != old_val) {
      // Value.value=new_val ? 1 : 0
      //  console.log('watch checkValue editText Name', This.prop.Name, 'Value.value', Value.value, 'new_val=', new_val, 'old_val=', old_val)
      This.prop.Value = new_val ? 1 : 0
    }
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
// This.prop.Visible 
///////////////////////////////////////
watch(
  () => This.prop.Visible,
  (new_val, old_val) => {


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
  (new_val, old_val) => {
    if (new_val != old_val)
      emitValue(true)
    //readCampo(props.Registro)


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
  async (new_val, old_val) => {
    console.log('EditText Watch Registro Name=', This.prop.Name, 'new_val =', new_val, old_val)

    if (new_val != old_val) {
      console.log('EditText Watch Registro Name=', This.prop.Name, 'new_val =', new_val, old_val)
      emitValue(true)
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
    if (!new_val) {
      return
    }

    This.prop.Focus = false
    onFocus()
    return
    ToolTipText.value = false
    ShowError.value = false
    focusIn.value = 1

    This.prop.Focus = false
    //emit("update:Focus", false)
    emit("update:Value", Value.value)
    emit("input:currentValue") //[0]", currentValue.value[0])
    //emit("input:currentValue[1]", currentValue.value[1])
    emit("input:displayDate", displayDate.value)
    emit("input:currentDate", currentDate.value)

    // console.log('EditText Set Focus', This.prop.Name)
    // Ref.value.focus()
    Ref.value.select()

  },
  { deep: false }
)

/////////////////////////////////////////
// Metodo init 
/////////////////////////////////////////

const init = async () => {

  if (props.prop.Type == 'date') {
    componentStyle.width = '120px'
    componentStyle.height = '20px'
    componentStyle.maxHeight = '20px'
  }
  if (props.prop.Type == 'datetime-local') {
    componentStyle.width = '170px'
    componentStyle.height = '20px'
    componentStyle.maxHeight = '20px'
  }

  if (props.prop.Type == 'json') {
    componentStyle.borderWidth = '1px'
    componentStyle.borderStyle = 'solid'
    componentStyle.borderRadius = '2px'
    divStyle.height = 'auto'
  }


  if (props.prop.Type == 'number')
    componentStyle.textAlign = 'right'

  if (!This.prop.Visible)
    divStyle.height = '0%'



  const result = await emitValue(true)


  oldVal = Value.value   // asignamos el valor viejo

  // si es el primer elemento a posicionarse
  if (props.prop.First) {
    This.prop.First = false
    if (Ref.value != null)
      console.log('First init editText Name=', props.prop.Name, 'Value=', Value.value, 'currentValue=', currentValue.value[1], currentValue.value[0])
    // Ref.value.focus()  // hace el foco como primer elemento
    onFocus()
    //   Ref.value.select() // Hace foco con select
    return
  }

  console.log('init editText Name=', props.prop.Name, 'Value=', Value.value, 'currentValue=', currentValue.value[1], currentValue.value[0])
}

init() // Ejecuta el init
</script>