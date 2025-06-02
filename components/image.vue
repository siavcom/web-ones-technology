<template>
  <span :id="Id + '_main_span'" class="divi imgButton" :title="This.prop.ToolTipText" :style="Styles.style"
    v-show="This.prop.Visible" @click.middle.stop="middleClick()">
    <img v-if="prop.Type = 'QR'" :id="Id + '_QR'" class=" mt-6 mb-2 rounded border" :src="Image.value"
      :alt="prop.Caption" />
    <img v-else :id="Id + '_img'" class="mt-6 mb-2 rounded border" :src="Value" :alt="prop.Caption" />
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

const Component = ref(props.prop.This)
const This = Component.value
const Este = props.prop.This
const labelStyle = reactive({ ...Este.labelStyle })
const inputStyle = reactive({ ...Este.inputStyle })
const style = reactive({ ...Este.style })
const Image = ref(props.prop.Image)


const Styles =
{
  labelStyle: labelStyle,
  inputStyle: inputStyle,
  style: style
}

//const Id = This.prop.Name + props.Registro.toString().trim()

const Id = This.prop.Name + '_' + Math.floor(Math.random() * 10000000).toString() //props.Registro.toString().trim()


This.Recno = props.Registro

const Value = ref(props.prop.Value)
const ToolTipText = ref(true)


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
watch(
  () => props.Registro,
  async () => {

    // console.log('EditText Watch Registro Name=', This.prop.Name, 'new_val =', props.Registro)
    emitValue(true)
    This.Recno = props.Registro
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

onMounted(async () => {
  // Styles.labelStyle       :style="{ 'word-wrap': 'break-word', 'font-size': style.fontSize, 'color': style.color }"

  Styles.inputStyle.width = '100%' //  divStyle.width

  This.Recno = props.Registro

  if (props.Registro > 0) {
    if (props.prop.ControlSource.length > 0) {

      Status.value = 'P';  // en lectura
      emit("update:Status", 'P'); // actualiza el valor Status en el componente padre. No se debe utilizar Status.Value

      await readCampo(props.Registro)
      if (!props.prop.First) {

        //await emitValue()
      }
      Status.value = 'A';  // Activo
      emit("update:Status", 'A'); // actualiza el valor Status en el componente padre. No se debe utilizar Status.Value
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
