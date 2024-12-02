<template>
  <span :id="Id + '_main_span'" class="divi imgButton" :title="This.prop.ToolTipText" :style="Styles.style"
    v-show="This.prop.Visible">
    <button :id="Id + '_button'" class='button' v-show="prop.Visible" :disabled="prop.ReadOnly || prop.Disabled"
      :tabindex="prop.TabIndex" @focusout="focusOut" @click.stop="click">
      <img :id="Id + '_img'" class="img" :src="prop.Image" :alt="prop.Value" :disabled="prop.ReadOnly"
        :style="Styles.inputStyle" />
      <label :id="Id + '_label'" v-if="prop.Image.length > 0" :style="Styles.labelStyle" :disabled="prop.ReadOnly"
        v-show="prop.Visible">{{ prop.Value }}</label>
    </button>

    <component :id="Id + '_component_' + compMain" v-for="( compMain ) in This.main " :key="compMain"
      :is="impComponent(This[compMain].prop.BaseClass)" v-model:Value="This[compMain].prop.Value"
      :ShowError="This[compMain].prop.ShowError" :Registro="props.Registro" :prop="This[compMain].prop"
      :style="This[compMain].style" :position="This[compMain].position">
    </component>

  </span>
</template>

<script setup lang="ts">

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

  style: {
    background: "white";
    backgroundColor: "white";
    padding: "5px"; // Relleno
    color: "#b94295";
    width: "500px";
    height: "30px";
    fontFamily: "Arial";
    fontSize: "13px"; // automaticamente vue lo cambiara por font-size (para eso se utiliza la anotacion Camello)
    textAlign: "left";
    borderColor: "#000a01";
    borderWidth: "1px";
    zIndex: 1;
  };
  position: {
    position: "left"; //left,right,center,absolute. Si es absulute poner valor left y top
    left: number;
    Top: number;
  };

}>();

const Component = ref(props.prop.This)
const This = Component.value
const Este = props.prop.This
const labelStyle = reactive({ ...Este.labelStyle })
const inputStyle = reactive({ ...Este.inputStyle })
const style = reactive({ ...Este.style })

const Styles =
{
  labelStyle: labelStyle,
  inputStyle: inputStyle,
  style: style
}

const Id = This.prop.Name + props.Registro.toString().trim()

This.Recno = props.Registro

const Value = ref(props.prop.Value)
const ToolTipText = ref(true)


watch(
  () => props.prop.Value,

  (new_val, old_val) => {
    console.log('Button cambio Value', new_val, old_val)
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

/////////////////////////////////////////////////////////////////////
// focusOut
// Descripcion: Cuando pierda el foco el componente , actualizamo el valor en cursor local
/////////////////////////////////////////////////////////////////
const focusOut = async () => {

  ToolTipText.value = true  // Activamos el ToolTipText

};

const click = async () => {

  ToolTipText.value = false  // Activamos el ToolTipText
  // await This.when()
  if (!This.prop.Disabled && !This.prop.ReadOnly) {
    This.Form.eventos.push(This.prop.Map + '.click()')

  }
}


const onFocus = async () => {
  ToolTipText.value = false  // Activamos el ToolTipText
  if (!This.prop.Disabled) {
    This.Form.eventos.push(This.prop.Map + '.when()')
  }
}

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
  // console.log('Init imgButton Name=', props.prop.Name, 'Src=', props.prop.Image, 'props.Registro=', props.Registro)
})
/*
onMounted(() => {
  init() // Ejecuta el init
});
*/

</script>

<style scoped>
.button {
  background-color: bind("props.style.backgroundColor");

}
</style>
