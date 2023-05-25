<template>
  <div class="divi"  v-bind:style="This.style">
    <div class="mensajes" v-show="This.prop.Visible" >

      <span class="etiqueta" v-if="prop.textLabel">{{ prop.textLabel + " " }}</span>

      <!--mensajes de error y tooltip
    :style="{ 'width': 'auto' }"
       :value.number="numberStr"
    -->
      <div class="component">
        <input v-if="prop.Type == 'number'" class="number" type="text" :style="prop.componentStyle" ref="Ref"
          :disabled="prop.Disabled" 
          :min="prop.Min" 
          :max="prop.Max" 
          :value="numberStr" 
          :readonly="prop.ReadOnly"
          :placeholder="prop.Placeholder" 
          :tabindex="prop.TabIndex" 
          @focusout="onBlur" 
          @keypress="keyPress($event)"
          @focus="onFocus" 
          @input="onInput" pattern="([0-9]{1,15}).([0-9]{1,5})">
        <!--spinner" -->
        <input v-else-if="prop.Type == 'spinner'" class="number" type="number" :style="prop.componentStyle" ref="Ref"
          :disabled="prop.Disabled"  
          :min="prop.Min" 
          :max="prop.Max" 
          v-model="Value" 
          :readonly="prop.ReadOnly"
          :placeholder="prop.Placeholder" :tabindex="prop.TabIndex" @keypress="keyPress($event)" @focusout="onBlur"
          @focus="onFocus" @input="onInput">
        <!--textArea" -->
        <textarea v-else-if="prop.Type == 'textArea'" class="text" :style="prop.componentStyle" ref="Ref"
          v-model.trim="Value" :readonly="prop.ReadOnly" :disabled="prop.Disabled" :placeholder="prop.Placeholder"
          :tabindex="prop.TabIndex" :type="prop.Type" :cols='style.cols' :maxlength="prop.MaxLength"
          @keypress="keyPress($event)" @focusout="focusOut" @focus="onFocus"></textarea>
        <!--fecha  -->
        <input v-else-if="prop.Type == 'date'" class="date" :style="prop.componentStyle" ref="Ref" :type="prop.Type"
          v-model.trim="Value" :disabled="prop.Disabled" :readonly="prop.ReadOnly" :placeholder="prop.Placeholder"
          :tabindex="prop.TabIndex" @keypress="keyPress($event)" @focusout="focusOut" @focus="onFocus">
        <!--checkBox-->

        <input v-else-if="prop.Type == 'checkBox'" class="checkBox" :type="prop.Type" :style="prop.componentStyle"
          ref="Ref" :value="checkValue" :readonly="prop.ReadOnly" :disabled="prop.Disabled || prop.ReadOnly"
          :tabindex="prop.TabIndex" @change="change" :checked="checkValue" @focusout="focusOut" @focus="onFocus">

        <!--Si es texto
            :maxlength="prop.MaxLength" 
            :size="prop.MaxLength"
      -->
        <input v-else class="text" ref="Ref" :style="prop.componentStyle" v-model.trim="Value" :readonly="prop.ReadOnly"
          :disabled="prop.Disabled" :maxlength="prop.MaxLength" :size="prop.MaxLength" :placeholder="prop.Placeholder"
          :tabindex="prop.TabIndex" :type="prop.Type" v-on:keyup.enter="$event.target.nextElementSibling.focus()"
          @keypress="keyPress($event)" @focusout="focusOut" @focus="onFocus">

        <span class="tooltiptext" v-if="prop.ToolTipText.length > 0" v-show="ToolTipText && prop.Valid">{{
          prop.ToolTipText
        }}</span>
        <span class="errorText" v-show="ShowError">{{ prop.ErrorMessage }}</span>
      </div>
    </div>
  </div>
</template>



<script setup lang="ts">
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
const emit = defineEmits(["update", "update:Value", "update:Valid", "update:Status", "update:Recno", "update:Key", "update:Focus", 'customChange']) //, "update:ShowError", "update:Ref"

//import { localDb } from "@/classes/LocalDb";  // manejo del indexedDb

///////////////////////////////////////
// Propiedades del componente reactivas
// Notas : 
//  Registro se necesita porque cuando se tiene un  grid con 
//  muchos componentes, c/componente Vue tiene su propio registro,
//  el Recno pertenece al los componentes  de captura  del ThisForm  
////////////////////////////////////
const props = defineProps<{
  Recno: number;
  Registro: number;  // Se pone para el manejo de grid
  Show: true;
 // Component: null;
  prop: {
    This:null;
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
    Name: "";
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
      textAlign: "left";
    };


    //    SetFocus:false;
    //compAddress: any;
  };

  style: {
    background: "white";
    padding: "5px"; // Relleno
    color: "#b94295";
    width: "200px";
    height: "30px";
    fontFamily: "Arial";
    fontSize: "13px"; // automaticamente vue lo cambiara por font-size (para eso se utiliza la anotacion Camello)
    textAlign: "left";
    cols: "100"
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
const Recno = ref(props.Recno)
const Valid = ref(props.prop.Valid)
Valid.value = true
const Ref = ref(null) // Se necesita paratener referencia del :ref del componente  ref(props.prop.Ref)
const Status = ref(props.prop.Status);
const ToolTipText = ref(true)
Status.value = 'I'
const Key = ref(props.prop.Key)
const Focus = ref(props.prop.Focus)
// Focus.value = false
const First = ref(props.prop.First)
const ReadOnly=ref(props.prop.ReadOnly)

var oldVal = Value.value
const ShowError =ref(false) //ref(props.prop.ShowError)
const checkValue = ref(false)

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

const numberStr = ref(0); //Value.value

function toNumberString(num) {
  if (Number.isInteger(num)) {
    return num + ".0"
  } else {
    return num.toString();
  }
}

const onInput = ({ target }) => {
  if (target.value.length == 0) return

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
  numberStr.value = parseFloat(target.value)
  //Value.value = parseFloat(target.value)
  //   console.log('onInput number',target.value)
  oldVal = target.value
}
/*
  const onFocusN = () => {
      numberStr.value = Value.value;
      type.value = 'number';
      onFocus()
    };

  */
const onBlur = () => {
  //     numberStr.value = toNumberStr(Value.value)
  //  numberStr.value = toNumberString(props.prop.Value) //toNumberStr
  Value.value = +numberStr.value
  numberStr.value = toNumberString(numberStr.value) //toNumberStr
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

// funciona para cualquier comoponente de este componente

/////////////////////////////////////////
// Metodo KeyPres Vfp
// Este metodo se corre cada ves que se teclea cualquier cosa en el componente
// Similar al keypress si  no esta el lasy
/////////////////////////////////////////

// string : String,
//texto: Number,
//boleano: Boolean,
// arreglo: Array,
// objeto: Object,
//fecha: Date,
//simbolo: Symbol,
// valida: Function,

// arreglo1: Object,
// default: () => {},
//    arreglo2: Array,
//    default: () => [],

// Vue dice no utilizar "this" dentro del setup segun Vue
// al pasarle props se podra tomar todos los Valuees de props anteriormente definidos
// como props.Value
//The second argument passed to the setup function is the context. The context is a normal JavaScript object that exposes
// three component properties:
// Attributes (Non-reactive object)
//    console.log(context.attrs)
// Slots (Non-reactive object)
//    console.log(context.slots)
// Emit Events (Method)
//    console.log(context.emit)
//setup(props,context)
//setup(props, { attrs, slots, emit })
// Setup funciona de la misma forma que el actual data(), devolviendo un objeto con las propiedades
// que serán usadas en el template:
// Inicio Setup


/////////////////////////////////////////
// Metodo Release Vfp
/////////////////////////////////////////
/*
const onUnmounted = () => {
  //  console.log("Component unmounted!");
};
*/

/////////////////////////////////////////////////////////////////////
// emitValue
// Descripcion: emite hacia el componente padre el nuavo valor asignado
/////////////////////////////////////////////////////////////////
const emitValue = async () => {
  Status.value = 'A'
  //console.log('EditBox antes emit Value  ====>', props.prop.Name, props.Registro, props.Recno)
  Recno.value = props.Registro
  emit("update:Value", Value.value); // actualiza el valor Value en el componente padre
  emit("update:Status", 'A'); // actualiza el valor Status en el componente padre
  emit("update:Valid", Valid.value)
  emit("update:Recno", props.Registro) // se emite en el Recno actual al ThisForm
  // emit("update") // emite un update en el componente padre
  // console.log('EditBox despuest emit Value ====>', props.prop.Value, props.prop.Status)
  return true;
};


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
//  console.log('checkBox change 1',checkValue.value,Value.value)

  checkValue.value = !checkValue.value
  if (checkValue.value)
      Value.value=1
  else    
      Value.value=0

 
}

/////////////////////////////////////////////////////////////////////
// focusOut
// Descripcion: Cuando pierda el foco el componente , actualizamo el valor en cursor local
/////////////////////////////////////////////////////////////////
const focusOut = async () => {

  if (props.prop.Type == 'checkBox') {
    Value.value = checkValue.value ? 1 : 0
    //console.log('checkBox focusOut =',checkValue.value,Value.value)
  }

  if (props.Recno > 0 && props.prop.ControlSource && props.prop.ControlSource.length > 3) {
   
    // actualiza valor en localDb
    const valor = props.prop.Type == 'number' || props.prop.Type == 'checkBox' ? +Value.value : Value.value
    // Actualiza el alaSQL el dato
    await This.Form.db.updateCampo(valor, props.prop.ControlSource, props.Recno)
//    await props.db.value.updateCampo(valor, props.prop.ControlSource, props.Recno)
  }
  ToolTipText.value = true  // Activamos el ToolTipText
  console.log('Valid updateCampo===>', Value.value, This)
 
  await emitValue()

  if (This.valid  ){
    const error=await This.valid()
    ShowError.value=!error
    console.log('EditText valid',ShowError)
  }
  return 

};
/////////////////////////////////////////////////////////////////////
// KeyPress
// Descripcion: Cada tecla que se presiona en el input
/////////////////////////////////////////////////////////////////

const keyPress = ($event) => {
  // <input       @keypress="keyPress($event)"

  if ($event.charCode == 13) {
    //$event.charCode = 9
    // window.event.keyCode = 9;
    Key.value = $event.charCode
    /*
        let nextElement=$event.explicitOriginalTarget.nextSibling
        console.log('Edit nextElement ',nextElement)
    
        while (nextElement && nextElement.tagName!='INPUT'){
    
          nextElement=nextElement.nextSibling
          console.log('Edit nextElement',nextElement)
    
        }   
        if (nextElement)
              nextElement.focus()
    
        console.log('Edit ',nextElement)
    
    */
    //$event.target.value=$event.target.value+String.fromCharCode(9)
    emit('customChange', $event.target.value + String.fromCharCode(9))


  } else

    Key.value = $event.charCode
}


/////////////////////////////////////////////////////////////////////
// onFocus
// Descripcion: Cuando se cambie el valor del componente template (Value.value con el teclado),
//              tenemos que emitir hacia el padre el valor capturado (Value.value) y ejecutar el update
/////////////////////////////////////////////////////////////////
const onFocus = async () => {
  //console.log('editText onFocus ', props.prop.Name, props.prop.ReadOnly)
  ToolTipText.value = false
  ShowError.value = false
 // emit("update:ShowError", false)

  if (!props.prop.Valid) {    // = false; // old revisar si se necesita

    if (props.Recno > 0) {
      const data = await This.Form.db.readCampo(props.prop.ControlSource, props.Recno, 'Old')
//      const data = await props.db.value.readCampo(props.prop.ControlSource, props.Recno, 'Old')

      let valor = ''
      let sw_key = false
      for (const campo in data) {
        if (campo != 'key_pri')
          valor = data[campo]
        else sw_key = true
      }
      if (sw_key) {
        Value.value = valor
        emit("update:Value", Value.value)
      }
      Valid.value = true
    }
    emit("update:Valid", true)
  }


  if (props.prop.Type == 'number') {
    numberStr.value = props.prop.Value //Value.value
    typeNumber.value = 'number'

  };

if (This.prop.Status == 'P') return // ya se habia hecho el foco

  Status.value = 'P';  // en foco
  //This.prop.Status='P'
  //console.log('onFocus elemento ===>', props.prop.Name, 'P')
  emit("update:Status", 'P'); // actualiza el valor Status en el componente padre. No se debe utilizar Status.Value
//  console.log('editText status despues ',This.Name,This.prop.Status,Status.value)

}


//////////////////////////////////////////
// Lee el campo desde SQL Local
////////////////////////////////////////

const readCampo = async (recno: number) => {
  if (Status.value == 'A') {
    Status.value = 'P'
    emit("update:Status", 'P'); // actualiza el valor Status en el componente padre. No se debe utilizar Status.Value
  }
  if (recno != props.Recno) Recno.value = recno
  const data = await This.Form.db.readCampo(props.prop.ControlSource, recno)
  //const data = await props.db.value.readCampo(props.prop.ControlSource, recno)
  
  for (const campo in data) {
    if (campo != 'key_pri') Value.value = data[campo]
  }

  if (props.prop.Type == 'number')
  console.log('editText readCampo Value', Value.value)

    numberStr.value = toNumberStr(Value.value)
    console.log('editText readCampo numberStr', numberStr.value)


  if (props.prop.Type == 'checkBox') {
    checkValue.value = Value.value == 1 ? true : false
    //console.log('checkBox ReadValue =',props.prop.Name,checkValue.value,Value.value)
  }
  emitValue()

}

const changeValue=async (new_val:number)=>{
    if (new_val!=Value.value)
          Value.value=new_val 

   if (props.prop.Type == 'checkBox') {

      checkValue.value = new_val == 1 ? true : false
      await This.interactiveChange()
      emitValue()

    }

    if (props.prop.Type == 'spinner') {
      await This.interactiveChange()
      emitValue()

    }

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
  () =>props.prop.Value, //Value.value,
  (new_val, old_val) => {
    // if (props.prop.Value != Value.value)
   //   Value.value = props.prop.Value
   console.log('editText watch props.prop.Value',This.Name,new_val)
   changeValue(new_val)
    
  },
  { deep: false }
);

watch(
  () =>Value.value,
  (new_val, old_val) => {
   // if (props.prop.Value != Value.value)
   //   Value.value = props.prop.Value
   console.log('editText watch Value.value',This.Name,new_val)

   changeValue(new_val)
    
  },
  { deep: false }
);





////////////////////////////////////////
// ControlSource
///////////////////////////////////////
watch(
  () => props.prop.ControlSource,
  (new_val, old_val) => {
    if (new_val != old_val) {
      if (props.Recno > 0 && new_val.trim().length) {
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

    if (Recno.value != props.Registro)
      Recno.value = props.Registro

    if (props.Registro == 0) {
      Value.value = '' //props.prop.Type='numeric'? 0: ''
      emitValue()
      return

    }
    if (new_val != old_val
      && props.prop.ControlSource > ' '
      && props.Registro > 0) {
      // console.log('Watch EditText Recno=', new_val)
      readCampo(props.Registro)
    }
    //    LocalDb.ControlSource = new_val;

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
  () => props.prop.Focus,
  (new_val, old_val) => {
    if (!props.prop.Focus) return
    console.log('EditText Set Focus', props.prop.Name)
    Ref.value.focus()
      //      Ref.value.select()
    Focus.value = false
    emit("update:Focus", false)
  },
  { deep: false }
);

///////////////////////////////////////////////
// Cuando cambia el estatus de Inicial a Activo, emite valores  
///////////////////////////////////////////////

watch(
  () => props.prop.Status,
  (new_val, old_val) => {

    if (new_val == 'A' && old_val == 'I') {
      emitValue()
    }
  },
  { deep: false }
);

/////////////////////////////////////////
// Metodo init Vfp
// Aqui debemos de asignar todos los Valores inciales del componente
// A pesar que nom_nom se pasa por referencia, se tuvo que definir en props para qu fuera reactivo
// Se tiene que emitir para que cambie el Valor en el template
/////////////////////////////////////////

const init = async () => {


  if (props.Registro > 0 && props.prop.ControlSource.length > 0) {

    Status.value = 'P';  // en lectura
    emit("update:Status", 'P'); // actualiza el valor Status en el componente padre. No se debe utilizar Status.Value

    //    Vue.nextTick(() => {
    //       console.log(this.show, this.$refs.content);
    //     });

    await readCampo(props.Registro)
    //Value.value = await props.db.value.readCampo(props.prop.ControlSource, props.Recno)
    //   if (!props.prop.Autofocus) {
    if (!props.prop.First) {

      //console.log('Init EditText', props.prop.Name, props.prop.Value)
      await emitValue()
    }
  }
  else {
    if (props.prop.Type == 'number') numberStr.value = toNumberStr(props.prop.Value)
    if (props.prop.Type == 'checkBox') checkValue.value = props.prop.Value==1 ? true: false
  }
  // const ref = Ref
  // emit("update:Ref", Ref); // actualiza el valor del Ref al componente padre


  oldVal = Value.value   // asignamos el valor viejo

  // si es el primer elemento a posicionarse
  if (props.prop.First) {
    First.value=false
    emit("update:Value", Value.value); // actualiza el valor Value en el componente padre
    //emit("update") // emite un update en el componente padre
    Ref.value.focus()  // hace el foco como primer elemento
    //Ref.value.select()
    return
  }// else  await emitValue()

};


init(); // Ejecuta el init

</script>
