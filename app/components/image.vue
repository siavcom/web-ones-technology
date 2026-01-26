<template>
  <span :id="Id + '_component'" class="divi imgButton" :title="This.prop.ToolTipText" :style="Styles.style"
    v-show="This.prop.Visible" @click.middle.stop="middleClick()">
    <img v-if="prop.Type = 'QR'" :id="Id + '_QR'" class=" mt-6 mb-2 rounded border" :src="Image.value"
      :alt="prop.Caption" @focus="onFocus" @focusout="lostFocus" />
    <img v-else :id="Id + '_img'" class="mt-6 mb-2 rounded border" :src="Value" :alt="prop.Caption" @focus="onFocus"
      @focusout="lostFocus" />
  </span>
</template>

<script setup lang="ts">
import { useQRCode } from '@vueuse/integrations/useQRCode'
// <img class="mt-6 mb-2 rounded border" :src="qrcode" alt="QR Code">
const props = defineProps<{
  //Value: string;
  Registro: 0;
  prop: {
    Click: false;
    ToolTipText: string;
    View: "";
    Field: "";
    Recno: "";
    Value: string;
    Placeholder: "";
    Format: "";
    InputMask: "";
    MaxLenght: 0;
    ReadOnly: false;
    Disabled: false;
    Tag: "";
    Sw_val: false;
    Capture: false;
    Name: "";
    Label: "";
    Type: "text";
    Visible: boolean;
    TabIndex: number;
    BaseClass: "imgButton";
    Image: "";
  };

}>();

const Component = toRef(() => props.prop.This)
const This = Component.value  // falta probar reactividad utilizando Component.value.This

const Este = props.prop.This
const captionStyle = reactive({ ...Este.captionStyle })
const inputStyle = reactive({ ...Este.inputStyle })
const style = reactive({ ...Este.style })
const Image = ref(props.prop.Image)
const focusIn = ref(0)


const Styles =
{
  captionStyle: captionStyle,
  inputStyle: inputStyle,
  style: style
}

//const Id = This.prop.Name + props.Registro.toString().trim()

const Id = This.prop.Name + '_' + Math.floor(Math.random() * 10000000).toString() //props.Registro.toString().trim()


This.Recno = props.Registro

const Value = ref(props.prop.Value)
const ToolTipText = ref(true)


/**********************************************
 * Watchers 
  
 ********************************************/

watch(
  () => props.prop.Value,
  (new_val, old_val) => {
    if (This.prop.Type = 'QR')
      console.log('image new_val:', new_val)

    Image.value = useQRCode(new_val, {
      errorCorrectionLevel: 'H',
      margin: 3,
    })

  },
  { deep: false }
);


////////////////////////////////////////
// Registro
// Nota: Lee de la base de datos local segun el valor de Registro
//       Se utiliza para el manejo de grid
///////////////////////////////////////
////////////////////////////////////////
// Registro
// Nota: Lee de la base de datos local segun el valor de Registro
//       Se utiliza para el manejo de grid
///////////////////////////////////////
watch(
  () => This.Recno, //props.Registro,
  async (new_val) => {

    if (focusIn.value == 1) // Si tiene el foco deshabilita el watch
      return

    console.log('image Watch This.Recno Name=', This.prop.Name, 'new_val=', new_val, 'This.Recno=', This.Recno)
    /*    if (sw_emitValue) { // Si se cambio desde el emitValue se ignora
          console.log('watch This.Recno editText Name=', This.prop.Name)
          return
        }
    */
    if (This.prop.ControlSource.length > 0 && This.Recno > 0) {
      readCampo(This.prop.ControlSource, This.Recno)
    }
    //29/Oct/2025 -- Se quita, daba problema en el grid
    //This.Recno = props.Registro
    //  This.recnoChange()

  },
  { deep: true }
);


/*

watch(
  () => props.Registro,
  async () => {

    console.log('EditText Watch Registro Name=', This.prop.Name, 'new_val =', props.Registro)
    emitValue(true)
    This.Recno = props.Registro
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
    /*
    // Se pidio desde afuera el setFocus
    if (document.activeElement != thisElement) {
      console.log('editText Watch Focus Name=', This.prop.Name, 'thisElement=', thisElement)
      return thisElement.focus();
    }
     */
    This.click()

    /*
        //thisElement.focus({ focusVisible: true });
        setTimeout(function () {
          //thisElement.focus({ focusVisible: true });
          if (thisElement.select)
            thisElement.select();
    
        }, 300);
    
        */

    return

  },
  { deep: false }
)








////////////////////////////////////////////////////////////////////
// onFocus
// Descripcion: Cuando se cambie el valor del componente template (Value.value con el teclado),
//              tenemos que emitir hacia el padre el valor capturado (Value.value) y ejecutar el update
// Obs: el when() se llama desde el coponente parent 
/////////////////////////////////////////////////////////////////
const onFocus = async () => {

  // const click = Click == true ? true : false
  // Si esta en un grid checa sus estatus de todas las columnas
  ToolTipText.value = false
  if (This.Parent && This.Parent.BaseClass == "grid") {
    const grid = This.Parent

    for (const comp in grid.elements) {
      const compName = grid.elements[comp].Name
      // 24/Dic/2024 .- Se aumenta que sea componente Capture
      if (grid[compName].prop.Status != 'A' && grid[compName].prop.Capture && !grid[compName].prop.Valid) {
        return
      }
    }
    This.Parent.prop.Status = 'A'
  }

  if (This.prop.Disabled || This.prop.ReadOnly) {
    This.prop.Valid = true
    This.prop.Status = 'A'
    return
  }

  if (This.beforeWhen)
    await This.beforeWhen()

  if (!This.Help)
    This.Help = false

  This.prop.Focus = false
  This.prop.First = false

  //  if (focusIn.value == 1) { // 22/Enero/2026
  This.prop.Valid = true
  // await nextTick()
  focusIn.value = 1
  This.when()

  return
}

/////////////////////////////////////////////////////////////////////
// lostFocus
// Descripcion: Cuando pierda el foco el componente , actualizamo el valor en cursor local
/////////////////////////////////////////////////////////////////
const lostFocus = async () => {

  if (This.prop.ReadOnly || This.prop.Disabled) {
    return
  }

  for (const element of This.Parent.elements) {
    const comp = element.Name.toLowerCase().trim()

    if (This.Parent[comp] && This.Parent[comp].prop && comp.trim() != This.prop.Name.toLowerCase().trim()) {
      //   console.log('Checking component:', element, comp);
      if (This.Parent[comp].prop && This.Parent[comp].prop.Status == 'P' && This.Parent.Recno > 0) {
        console.warn('No esta validado el componente', comp)
        return
      }
    }
  }

  focusIn.value = 0 // Perdio el foco

}


onMounted(async () => {
  // Styles.captionStyle       :style="{ 'word-wrap': 'break-word', 'font-size': style.fontSize, 'color': style.color }"

  Styles.inputStyle.width = '100%' //  divStyle.width

  This.Recno = props.Registro
  console.log('Init imgButton Name=', props.prop.Name, 'Src=', props.prop.Image, 'props.Registro=', props.Registro)
  if (props.Registro > 0) {
    if (This.prop.ControlSource.length > 0 && This.Recno > 0) {

      readCampo(This.prop.ControlSource, This.Recno)
      This.prop.Valid = true
      This.prop.Status = 'A'
      //Status.value = 'A';  // Activo
      //  emit("update:Status", 'A'); // actualiza el valor Status en el componente padre. No se debe utilizar Status.Value
    }

  };
  This.afterMounted()
  // console.log('Init imgButton Name=', props.prop.Name, 'Src=', props.prop.Image, 'props.Registro=', props.Registro)
})
/*
onMounted(() => {
  init() // Ejecuta el init
});
*/

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

</script>
