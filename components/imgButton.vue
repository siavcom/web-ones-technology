<template>
  <span :id="Id + '_component'" class="divi_imgButton" :title="This.prop.ToolTipText" :style="Styles.style"
    v-show="This.prop.Visible" @click.middle.stop="middleClick()">
    <!-- UButton -->
    <button :id="Id" :label="prop.Image.trim() == '' ? prop.Caption : ''" v-show="prop.Visible"
      :disabled="prop.ReadOnly || prop.Disabled" :style="Styles.captionStyle" :tabindex="prop.TabIndex" @focus="onFocus"
      @focusout="focusOut" @click.stop="click">
      <img :id="Id + '_img_'" class="img" v-if="prop.Image.length > 0" :src="prop.Image" :alt="prop.Value"
        :disabled="prop.ReadOnly || prop.Disabled" :style="Styles.inputStyle" @click.stop="click" />{{ prop.Image.length
          == 0 ? prop.Caption
          : '' }}
      <label :id="Id + '_label_'" v-if="prop.Image.length > 0" :style="Styles.captionStyle" word-wrap:
        :disabled="prop.ReadOnly || prop.Disabled" v-show="prop.Visible" @click.stop="click">{{ prop.Image.length > 0 ?
          prop.Caption : ''
        }}</label>
    </button>
    <!--/UButton-->

    <component :id="Id + '_component_' + compMain" v-for="(compMain) in This.main" :key="compMain"
      :is="impComponent(This[compMain].prop.BaseClass)" v-model:Value="This[compMain].prop.Value"
      :ShowError="This[compMain].prop.ShowError" :Registro="props.Registro" :prop="This[compMain].prop"
      :style="This[compMain].style" :position="This[compMain].position">
    </component>

  </span>
</template>

<script setup lang="ts">

const props = defineProps<{

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
const captionStyle = reactive({ ...Este.captionStyle })
const inputStyle = reactive({ ...Este.inputStyle })
const style = reactive({ ...Este.style })



const Styles =
{
  captionStyle: captionStyle,
  inputStyle: inputStyle,
  style: style
}

//const Id = This.prop.Name + props.Registro.toString().trim()

const Id = This.prop.Name + '_' + Math.floor(Math.random() * 10000000).toString() //props.Registro.toString().trim()
let thisElement: Element | null

This.prop.htmlId = Id

This.Id = Id
This.Recno = props.Registro

const ToolTipText = ref(true)

/////////////////////////////////////////////////////////////////////
// focusOut
// Descripcion: Cuando pierda el foco el componente , actualizamo el valor en cursor local
/////////////////////////////////////////////////////////////////
const focusOut = async () => {
  ToolTipText.value = true  // Activamos el ToolTipText
};
/*
const showVisible = async (visible: boolean) => {
  console.log('button ', this.prop.Name, visible)
  This.prop.Visible = true

};

This.show = ref(showVisible())
*/

const click = async () => {
  console.log('button click()', This.prop.Name, 'Disabled', This.prop.Disabled, 'ReadOnly', This.prop.ReadOnly)
  if (This.prop.Disabled || This.prop.ReadOnly)
    return
  // Si esta en un grid checa sus estatus de todas las columnas
  if (!await checkGrid())
    return

  if (This.prop.ReadOnly)
    return
  ToolTipText.value = false  // Activamos el ToolTipText
  // await This.when()
  if (!This.prop.Disabled) { // && This.Form.prop.BaseClass.toLowerCase() == 'form'
    await nextTick()

    This.Form.eventos.push(This.prop.Map + '.click()')
  }// else
  //This.click()

}

const onFocus = async () => {
  // Si esta en un grid checa sus estatus de todas las columnas
  if (!await checkGrid())
    return

  ToolTipText.value = false  // Desactivamos el ToolTipText
  if (!This.prop.Disabled) {
    This.Form.eventos.push(This.prop.Map + '.when()')
  }
}

const checkGrid = async () => {
  if (This.Parent.BaseClass != "grid")
    return true

  const grid = This.Parent
  //console.log('EditText onFocus Grid Name', This.prop.Name)
  for (const comp in grid.elements) {
    const compName = grid.elements[comp].Name
    // 24/Dic/2024 .- Se aumenta que sea componente Capture
    if (grid[compName].prop.Status != 'A' && grid[compName].prop.Capture && !grid[compName].prop.Valid) {
      console.log('EditText onFocus Grid Status comp=', compName, 'Estatus=', grid[compName].prop.Status)
      return false
    }
  }
  return true
}

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
    This.Recno = props.Registro
  },
  { deep: true }
);
/*
////////////////////////////////////////
// Hacer el set focus 
///////////////////////////////////////
watch(
  () => This.prop.Focus, //props.prop.Focus,
  (new_val: any, old_val: any) => {
    if (!new_val) {
      return
    }
    This.click()
    return
  },
  { deep: false }
)

*/
////////////////////////////////////////
// Hacer el set focus 
///////////////////////////////////////


watch(
  () => This.prop.Focus, //props.prop.Focus,
  (new_val: any, old_val: any) => {
    console.log('1)imgButton Watch Focus Name=', This.prop.Name, 'New Val', new_val)
    if (!new_val) {
      return
    }
    console.log('1)imgButton Watch Focus Name=', This.prop.Name)

    // Se pidio desde afuera el setFocus
    console.log('2.1) imgButton Watch Focus document.activeElement=', document.activeElement)
    console.log('2.2) imgButton Watch thisElement=', thisElement)

    //   if (thisElement.focus)
    thisElement.focus();

    setTimeout(function () {
      thisElement.focus({ focusVisible: true });
      // thisElement.select();

    }, 0);
    This.prop.Focus = false
    return
  },
  { deep: false }
)






onMounted(async () => {
  // Styles.captionStyle       :style="{ 'word-wrap': 'break-word', 'font-size': style.fontSize, 'color': style.color }"
  thisElement = document.getElementById(Id)  // Obtiene el id de este componente en el DOM
  Styles.inputStyle.width = '100%' //  divStyle.width

  This.Recno = props.Registro

  if (props.Registro > 0) {
    if (props.prop.ControlSource.length > 0) {
      await readCampo(props.prop.ControlSource, props.Registro)
    }

  };
  //  console.log('imgButton onMounted Name=', props.prop.Name, 'Src=', props.prop.Image, 'Style', Styles)
  if (This.prop.Image.length > 0) {
    Styles.inputStyle.boxShadow = ''
    Styles.style.height = Styles.inputStyle.height
    Styles.style.width = Styles.inputStyle.width
  }

  This.afterMounted()
  // console.log('Init imgButton Name=', props.prop.Name, 'Src=', props.prop.Image, 'props.Registro=', props.Registro)
})

const middleClick = () => {
  // console.log('middleClick')
  if (This.Form && This.Form.translateContainer)
    This.Form.translateContainer.open(ref(This))
}

onUnmounted(async () => {
  if (This.onUnmounted) await This.onUnmounted() //  console.log('ComboBox Desmontado onUnMounted', This.prop.Name, This.onUnmounted)
})

/*
const handler = (event) => {
  if (event.which === 1) {
    //if (This.Form)
    //  This.Form.translateContainer.open(ref(This))
  }
  event.preventDefault();
}

*/
</script>
