<template>
  <!--div class="divibutton" v-show="prop.Visible" :style="style"-->
  <span :id="Id + '_component'" class="divi imgButton" :title="This.prop.ToolTipText" :style="divStyle"
    v-show="This.prop.Visible" @click.middle.stop="middleClick()">


    <!-- The actual file input element, hidden from view -->
    <input type="file" ref="fileInput" @change="handleFileChange" :accept="inputStyle.accept" hidden />

    <!--input v-if="!prop.Disabled" :id="Id_get_file" ref="fileInput" type="file" @change="readFile($event)"
      :disabled="prop.ReadOnly" :tabindex="prop.TabIndex" style="display:none" :accept="inputStyle.accept" /-->
    <img
      v-if="Value.length > 0 && (accept.includes('png') || accept.includes('jpg') || accept.includes('jpeg') || accept.includes('ico') || accept.includes('bmp') || accept.includes('gif') || accept.includes('svg'))"
      :id="Id + '_img'" class="img" :src="Value" :alt="prop.Value" :disabled="prop.ReadOnly" :style="inputStyle" />
    <iframe v-if="Value.length > 0 && accept.includes('pdf')" :id="Id + '_pdf'" :src="Value" :width="inputStyle.width"
      :height="inputStyle.height" :title="This.prop.Caption" :style="inputStyle"></iframe>
    <!--   -->

    <!--button :id="Id" :style="captionStyle" :onclick="`document.getElementById('${Id_get_file}').click()`"
      :disabled="prop.ReadOnly || prop.Disabled">
      <img :id="Id + '_img'" class="img" v-if="prop.Image.length > 0" :src="prop.Image" />
      <label :id="Id + '_label_'" word-wrap: :onclick="`document.getElementById('${Id_get_file}').click()`">
        {{ prop.Caption.length > 0 ? prop.Caption : 'Load file' }}</label>
    </button-->

    <!-- Carga archivo -->

    <img v-if="Value.length > 0" :id="Id + '_bt_load'" class="img" src='/Iconos/svg/upload.svg' :alt="prop.Value"
      :disabled="prop.ReadOnly || prop.Disabled" style="width:32px;height:32px ;" @click="triggerFileInput"
      title="Load file" />
    <!-- Elimina archivo -->

    <img v-if="Value.length > 0" :id="Id + '_bt_delete'" class="img" src="/Iconos/svg/delete-color.svg"
      :alt="prop.Value" :disabled="prop.ReadOnly || prop.Disabled" style="width:32px;height:32px ;"
      @click.capture="bt_delete()" title="Delete file" />
    <div :id="'swal-container' + Id"></div>

  </span>
</template>

<script setup lang="ts">
//import { NuxtImg } from '#build/components';

///////////////////////////////////////
// Emits
//////////////////////////////////////

const emit = defineEmits(["update", "update:Value",
  "update:Valid", "update:Status", 'customChange']) //, "update:displayError", "update:Ref","update:Recno",


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
    Caption: string;
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
    Image: string;

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
  /*
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
    */
  position: {
    position: "left"; //left,right,center,absolute. Si es absulute poner Value left y top
    left: number;
    Top: number;
  };
  //db: any
}>();


const Component = toRef(() => props.prop.This)

const This = Component.value  // falta probar reactividad utilizando Component.value.This
const Este = props.prop.This
const captionStyle = reactive({ ...Este.captionStyle })
const inputStyle = reactive({ ...Este.inputStyle })
const divStyle = reactive({ ...Este.style })

const accept = computed(() => This.inputStyle.accept.toLowerCase().trim())

const Id = This.prop.Name + '_' + Math.floor(Math.random() * 1000).toString() //props.Registro.toString().trim()
let containerId = null

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

var oldVal = Value.value
const displayError = ref(false) // Se utiliza esta variable para mostrar el error y sea reactiva

const MaxLength = ref(props.prop.MaxLength)
let sw_MaxLength = false

if (divStyle.zIndex == 0)
  divStyle.zIndex = 100 - This.prop.TabIndex

if (divStyle.flexWrap == "wrap")
  divStyle.flexWrap = "nowrap"

if (divStyle.display == "inline-flex")
  divStyle.display = "block"

if (divStyle.display == "99%")
  divStyle.width = "auto"

const zIndex = divStyle.zIndex

inputStyle.zIndex = zIndex

const toolTipTextStyle = { zIndex: zIndex + 20 }
const focusIn = ref(0)
// 1. Create a ref for the input element to access it programmatically
// <input type="file" ref="fileInput" @change="handleFileChange" 

const fileInput = ref(null);

// const uploadedImageUrl = ref(null);

// 2. Function to trigger the hidden file input's click event
// este trigger esta en un <img> que llama a @click="triggerFileInput" 
// y llama por medio del valor fileInput.value.click() , es el ref del <input type"file"
const triggerFileInput = () => {
  fileInput.value.click();
};

// 3. Handle the file selection and load the image for preview

const handleFileChange = (event) => {
  const file = event.target.files[0];
  // if (file && file.type.startsWith('image/')) {
  // Use the FileReader API to read the file and create a data URL for preview
  const reader = new FileReader();
  reader.onload = (e) => {
    Value.value = e.target.result;
    emitValue(false, false, Value.value)  // actuliza el valor Value en localAlaSql
    //uploadedImageUrl.value = e.target.result;
  };
  reader.readAsDataURL(file);

  // You can also use URL.createObjectURL(file) for a simpler preview URL
  // uploadedImageUrl.value = URL.createObjectURL(file);
  // } else {
  //   uploadedImageUrl.value = null;
  //   alert('Please select an image file.');
  // }
};

/*
const fileInput = ref<HTMLInputElement | null>(null)
const files = ref()

function handleFileChange() {
  files.value = fileInput.value?.files
}
*/

const bt_delete = async () => {
  // No funciona en componentes modales 
  //This.Form.containerId = document.getElementById(Id + '_component')
  This.Form.containerId = containerId // document.getElementById('swal-container' + Id)
  //console.log('bt_delete containerID', , 'swal-container ID=', 'swal-container' + Id, document.getElementById('swal-container' + Id))
  if (await MessageBox('Delete ?', 4, '') != 6)
    return

  Value.value = ''
  console.log('bt_delete Value.value', Value.value)
  emitValue(false, true, Value.value)
}

/*
const readFile = ($event) => {
  // Reference to the DOM input element
  if (This.prop.ReadOnly)
    return
  const input = $event.target;

  // Ensure that you have a file before attempting to read it

  if (input.files && input.files[0]) {
    // create a new FileReader to read this image and convert to base64 format
    let reader = new FileReader();
    // Define a callback function to run, when FileReader finishes its job

    reader.onload = (e) => {
      // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
      // Read image as base64 and set to imageData
      Value.value = e.target.result;

      emitValue(false, false, Value.value)
    }

    // Start the reader job - read file as a data url (base64 format)
    reader.readAsDataURL(input.files[0]);

  }
}

*/


/////////////////////////////////////////////////////////////////////
// emitValue
// Descripcion: emite hacia el componente padre el nuevo valor asignado
/////////////////////////////////////////////////////////////////
const emitValue = async (readCam?: boolean, isValid?: boolean, Valor?: string) => {

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
      await updateCampo(Valor, props.prop.ControlSource, Recno)
    }

    // Si no hay error
    //This.prop.Valid = true
    if (!This.prop.ReadOnly && !This.prop.Disabled) {

      if (Value.value != Valor)
        Value.value = Valor
      This.prop.Value = Value.value

      emit("update:Value", Value.value); // actualiza el valor Value en el componente padre
      //      emit("update"); // actualiza el valor Value en el componente padre

      if (!isValid) {

        if (!await This.valid()) {

          displayError.value = true
          This.prop.ShowError = true
          This.prop.Valid = false

          // 7/Feb/2024       
          This.Form.prop.Status = 'A'
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
        const Recno = This.Recno
        const data = await readCampo(This.prop.ControlSource, Recno)


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
  () => This.Recno,
  async () => {
    // console.log('base64 Watch Registro Name=', This.prop.Name, 'new_val =', props.Registro)
    emitValue(true)
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


const middleClick = () => {
  // console.log('middleClick')
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
//await callOnce(async () => {
onMounted(async () => {
  thisElement = document.getElementById(Id) // Obtiene el id de este componente en el DOM
  containerId = document.getElementById('swal-container' + Id)
  // console.log('1) base64 onMounted Name=', This.prop.Name, 'divStyle=', divStyle)

  inputStyle.width = '100%' //  divStyle.width
  if (This.prop.Image.length > 0) {
    inputStyle.boxShadow = ''
    divStyle.height = inputStyle.height
    divStyle.width = inputStyle.width
  }

  const result = await emitValue(true)
  This.Recno = props.Registro

  oldVal = Value.value   // asignamos el valor viejo

  await This.recnoChange()

  // si es el primer elemento a posicionarse
  if (props.prop.First || props.prop.Focus) {
    props.prop.First = false
    select()
    //    onFocus()
    return
  }

})


</script>

<style scoped>
.button {
  background-color: bind("props.style.backgroundColor")
}
</style>
