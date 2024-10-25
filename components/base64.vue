<template>
  <!--div class="divibutton" v-show="prop.Visible" :style="style"-->
  <span :id="Id + '_main_span'" class="divi imgButton" :title="This.prop.ToolTipText" :style="style"
    v-show="This.prop.Visible">

    <img v-if="Value.length > 0" :id="Id + '_img'" class="img" :src="Value" :alt="prop.Value" :disabled="prop.ReadOnly"
      :style="inputStyle" />

    <input :id="Id + '_input'" ref="fileInput" type="file" @change="readFile($event)" :disabled="This.prop.Disabled"
      :tabindex="prop.TabIndex" style="width:64px" :accept="inputStyle.accept" />

  </span>
</template>

<script setup lang="ts">
import { NuxtImg } from '#build/components';



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
    BaseClass: "base64";
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




const Component = toRef(() => props.prop.This)
//console.log('base64 Component=', Component.value)
const This = Component.value  // falta probar reactividad utilizando Component.value.This

const labelStyle = reactive(This.labelStyle)
const propType = computed(() => This.prop.Type.toLowerCase().trim())

const Id = This.prop.Name + props.Registro.toString().trim()
let thisElement: Element | null    //Elemento DOM
This.prop.htmlId = Id

const Value = ref(props.prop.Value)
const Valor = toRef(This.prop, "Value")
const Valid = ref(props.prop.Valid)
Valid.value = true
const Ref = ref(null) // Se necesita paratener referencia del :ref del componente  ref(props.prop.Ref)
let Help = false

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

const currentValue = ref('') // Arreglo de valor para capturar
const currentBase64 = ref('')



const fileInput = ref<HTMLInputElement | null>(null)
const files = ref()

function handleFileChange() {
  files.value = fileInput.value?.files
}

const readFile_2 = () => {

  console.log('<<<< readFile >>>>')
  //Value.value= fileInput.value?.files

  console.log('base64 fileInput=', fileInput, fileInput.value.value)
  const files = fileInput.value?.files //.files[0];
  console.log('base64 files[0]=', files[0])
  const name = files[0].name
  const type = files[0].type
  console.log('base64 file=', name, type)
  Value.value = 'data:' + type + ';base64,' + btoa(fileInput.value.value)
  console.log('base64 Value.value=', Value.value)

  // Value.value=Ref.value.file.files[0];

}

const readFile = ($event) => {
  // Reference to the DOM input element
  const input = $event.target;
  console.log('readFile', input)
  // Ensure that you have a file before attempting to read it
  if (input.files && input.files[0]) {
    // create a new FileReader to read this image and convert to base64 format
    let reader = new FileReader();
    // Define a callback function to run, when FileReader finishes its job

    reader.onload = (e) => {
      // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
      // Read image as base64 and set to imageData
      Value.value = e.target.result;

      emitValue(false, true, Value.value)

    }

    // Start the reader job - read file as a data url (base64 format)
    reader.readAsDataURL(input.files[0]);
  }
}


/////////////////////////////////////////////////////////////////////
// emitValue
// Descripcion: emite hacia el componente padre el nuevo valor asignado
/////////////////////////////////////////////////////////////////
const emitValue = async (readCam?: boolean, isValid?: boolean, Valor?: string) => {

  const Type = propType.value
  const ControlSource = props.prop.ControlSource
  const pos = ControlSource.indexOf(".") + 1;

  let readValid = false
  if (!readCam) { // En valor viene el valor actual capturado

    if (This.Form.prop)
      This.Form.prop.Status = 'P'

    This.prop.Status = 'P'
    Status.value = 'P'
    emit("update:Status", 'P'); // actualiza el valor Status en el componente padre

    if (!Valor)
      Valor = This.prop.Value  // Si viene del watch This.prop.Value

    Valor = Value.value

    if (props.Registro > 0 && props.prop.ControlSource && props.prop.ControlSource.length > 2) {
      const Recno = props.Registro
      await This.Form.db.updateCampo(Valor, props.prop.ControlSource, Recno)
    }

    // Si no hay error
    This.prop.Valid = true
    if (!This.prop.ReadOnly && !This.prop.Disabled) {


      if (Value.value != Valor)
        Value.value = Valor


      This.prop.Value = Value.value

      emit("update:Value", Value.value); // actualiza el valor Value en el componente padre
      emit("update"); // actualiza el valor Value en el componente padre


      if (Type == 'spinner' || Type == 'checkbox')
        await This.interactiveChange()

      if (!isValid) {

        if (!await This.valid()) {


          displayError.value = true
          This.prop.ShowError = true
          This.prop.Valid = false

          // 7/Feb/2024       
          This.Form.prop.Status = 'A'
          select()
          This.prop.Status = 'A'
          return
        }


      }
      This.prop.Valid = true
      This.prop.Status = 'A'
      Status.value = 'A'
      emit("update:Status", 'A')
    }

    // Reasigamos valor de Value
    if (Value.value != Valor)
      Value.value = Valor

  }
  else {  // Si hay lectura de campo
    //console.log('base64 emitValue() 1) readCam Name=', props.prop.Name, 'Valor=', 'prop:value=', This.prop.Value)

    Valor = ''
    This.prop.Valid = true

    if (props.Registro == 0 || ControlSource.length == 0) { // limpia value
      if (ControlSource.length > 0 || props.prop.Value == null) {
        Value.value = ''
      } else
        Value.value = props.prop.Value // asignamos valor al Value.value
    }
    else {
      // leemos valor 

      let sw_dat = false

      if (pos > 1) {
        const Recno = props.Registro
        const data = await This.Form.db.readCampo(ControlSource, Recno)

        for (const campo in data) {

          if (campo == 'key_pri' && data.key_pri > 0)
            This.prop.Valid = true

          if (campo != 'key_pri' && data[campo] != null) {
            sw_dat = true

            Value.value = data[campo] // se regresaraq el valor con emi al v-model:Value

            if (!isValid) {
              readValid = true
            }
          }
        }
      }
      if (!sw_dat) { // No encontro dato
        Value.value = ''
      }
    }
    // Asigna valores a campos de captura

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

  if (This.prop.ValidOnRead && readValid) { // Se manda validar despues de leer el componente
    // await This.valid()  // 8/Feb/2024.- Se aumenta await
  }

  if (!This.prop.Valid) {

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
// focusOut
// Descripcion: Cuando pierda el foco el componente , actualizamo el valor en cursor local
/////////////////////////////////////////////////////////////////
const focusOut = async () => {
  if (This.prop.ReadOnly || This.prop.Disabled) {

    return
  }


  if (displayError.value) {
    displayError.value = false
    if (This.prop.ShowError)
      This.prop.ShowError = false
  }


  focusIn.value = 0 // Perdio el foco

  let sw_error = false
  const Type = propType.value

  //const contents = fs.readFileSync(path + nameFile, { encoding: 'base64' });
  //data = `data:image/${tipArchivo};base64,` + contents

  if (Type == 'base64') {
    Value.value = await JSON.stringify(currentBase64.value)
  }


  if (sw_error) {
    select()
    return
  }


  await emitValue(false, false, Value.value) //se puso await

  // emitValue() ///se puso await
  return

};


const click = () => {
  This.Form.eventos.push(This.prop.Map + '.click()')

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

      if (!This.Sql.View[tabla].est_tabla[campo]) {
        console.error('base64 onFocus() Error: No se encontro el campo', campo, 'en la vista', tabla)
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
  //nextTick(function () {

  // const element = document.getElementById(Id);
  // select()   // 4 Julio 2024

  return
}

const select = async () => {
  // console.log('base64 select Name=', This.prop.Name, 'thisElement=', thisElement)
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
    console.log('watch displayError base64 Name', This.prop.Name, 'displayError.value', displayError.value)
  },
  { deep: false }
);


////////////////////////////////////////
// ControlSource
///////////////////////////////////////
watch(
  () => props.prop.ControlSource, //props.prop.ControlSource,
  (new_val: any, old_val: any) => {

    console.log('base64 Watch ControlSource Name=', This.prop.Name, 'new_val =', new_val)
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

    // console.log('base64 Watch Registro Name=', This.prop.Name, 'new_val =', props.Registro)
    emitValue(true)
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
    if (!new_val) {
      return
    }
    This.prop.Focus = false
    console.log('Focus base64 Watch Name=', This.prop.Name)
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
      console.log('>>>  RefValue base64 Watch Name=', This.prop.Name, 'Value=', This.prop.Value, 'Value.value=', Value.value)

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

      Value.value = This.prop.Value
      await emitValue(false, This.prop.Valid) //se puso await

    }
  },
  { deep: true }
);


const handler = (event) => {
  if (event.which === 3) {
    console.warn("==================>>>>>>Right mouse down Map=", This.prop.Map);
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
  console.log('1) base64 onMounted Name=', This.prop.Name, 'thisElement=', thisElement)


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

  }
  await This.recnoChange()

  // si es el primer elemento a posicionarse
  if (props.prop.First || props.prop.Focus) {
    props.prop.First = false
    select()
    //    onFocus()
    return
  }
  // console.log('init base64 Name=', props.prop.Name, 'Value=', Value.value, 'currentValue=', currentValue.value[1], currentValue.value[0])
})




</script>

<style scoped>
.button {
  background-color: bind("props.style.backgroundColor")
}
</style>
