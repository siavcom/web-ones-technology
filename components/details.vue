<!--   
&& ----------------------------------------------------------------------------------------------
&&              Siavcom Software S. de R.L. de C.V.
&& ----------------------------------------------------------------------------------------------
&& Autor    	: Ing. Fernando Cuadras Angulo
&& Sistema  	: Siavcom  							Version : 10.0  VUE
&& Programa 	: Detalle contenedor de componentes   		Mnemo   : details.vue
&& Ult. mod.	: Fernando Cuadras  				Fecha   : 25/Abr/2023
&& Evento		: 
&& Objeto		: VUE
&& Comentarios	: 
&& ----------------------------------------------------------------------------------------------
-->
<template>
  <!--transition name='Details'-->
  <div v-show="This.prop.Visible">
    <div class='details' :style="style">
      <details :id="Id + '_details'" class='detailsOpen' @toggle="toggle" :open='openDetail'>

        <summary>{{ This.prop.textLabel }}</summary>
        <!--VueForm class="cuerpo" v-bind:style="This.style" v-bind:position="This.position"-->

        <!--template v-slot:header-->
        <!--transition-group> -->
        <!-- @focusout="This.eventos.push('This.' + compHeader + '.valid()')"-->

        <div class='headerDetail'>
          <div v-for="(compHeader) in This.header">
            <!-- v-bind:Component="ref(This[compHeader])"-->
            <component v-if="This[compHeader].prop && This[compHeader].prop.Position == 'header'"
              :is="impComp(This[compHeader].prop.BaseClass)" v-model:Value="This[compHeader].prop.Value"
              v-model:Status="This[compHeader].prop.Status" :ShowError="This[compHeader].prop.ShowError"
              v-model:Key="This[compHeader].prop.Key"
              v-bind:Registro="!This[compHeader].Recno || This[compHeader].Recno == null ? 0 : This[compHeader].Recno"
              v-bind:prop="This[compHeader].prop" v-bind:style="This[compHeader].style"
              v-bind:position="This[compHeader].position"
              @focus.capture="ejeEvento(This[compHeader].prop.Map + '.when()')"
              @click="ejeEvento(This[compHeader].prop.Map + '.click()')"></component>
          </div>
        </div>
        <div class='mainDetail'>
          <!--TransitionGroup name='detailForm' tag='div'-->
          <div v-for="(compMain) in This.main" :key="compMain" style="z-index:0">
            <!--   @focusout="This.eventos.push('This.' + compMain + '.valid()')"
          v-bind:Show="true"
          
               v-bind:Component="ref(This[compMain])"    -->
            <component :is="impComp(This[compMain].prop.BaseClass)"
              :class="This.prop.Name + '_' + This[compMain].prop.Name" v-model:Value="This[compMain].prop.Value"
              v-model:Status="This[compMain].prop.Status" :ShowError="This[compMain].prop.ShowError"
              v-model:Key="This[compMain].prop.Key"
              v-bind:Registro="!This[compMain].Recno || This[compMain].Recno == null ? 0 : This[compMain].Recno"
              v-bind:prop="This[compMain].prop" v-bind:style="This[compMain].style"
              v-bind:position="This[compMain].position" @focus.capture="ejeEvento(This[compMain].prop.Map + '.when()')"
              @click="ejeEvento(This[compMain].prop.Map + '.click()')"></component>
          </div>
          <!--/TransitionGroup-->
        </div>
        <!--/template-->
        <!--template v-slot:footer
                   src="/Iconos/BotonRojo.png"
        This.prop.Status == 'A'
        -->
        <div class="footerDetail">
          <div v-show="This.prop.Status == 'A'">
            <nuxt-img class='circle' src="/Iconos/circle-green.svg" style="float:left" />
          </div>
          <div v-show="This.prop.Status != 'A'">
            <nuxt-img class='circle' src="/Iconos/circle-red.svg" style="float:left" />
          </div>

          <div v-for="(compFooter) in This.footer" style="zIndex:0">
            <!--div v-for="(obj, compFooter,key) in This" :key="obj.Index"
          
                      @focusout="This.eventos.push('This.' + compFooter + '.valid()')"
           v-bind:Component="ref(This[compFooter])"
          -->
            <component :is="impComp(This[compFooter].prop.BaseClass)" v-model:Value="This[compFooter].prop.Value"
              v-model:Status="This[compFooter].prop.Status" :ShowError="This[compFooter].prop.ShowError"
              v-model:Key="This[compFooter].prop.Key"
              v-bind:Registro="!This[compFooter].Recno || This[compFooter].Recno == null ? 0 : This[compFooter].Recno"
              v-bind:prop="This[compFooter].prop" v-bind:style="This[compFooter].style"
              v-bind:position="This[compFooter].position"
              @focus.capture="ejeEvento(This[compFooter].prop.Map + '.when()')"
              @click.stop.prevent="ejeEvento(This[compFooter].prop.Map + '.click()')"></component>
          </div>
        </div>
      </details>
    </div>
  </div>
  <!--/transition-->
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
  toRef,
  // onMounted,
  // onBeforeUpdate,
  // onUpdated,
  // onUnmounted,

} from "vue";
*/
const imgButton = resolveComponent('imgButton')
const comboBox = resolveComponent('comboBox')
const editText = resolveComponent('editText')
const textLabel = resolveComponent('textLabel')
const grid = resolveComponent('grid')
//const browse = resolveComponent('browse')
const browseLite = resolveComponent('browseLite')
//const details = resolveComponent('details')
const container = resolveComponent('container')
const embedPdf = resolveComponent('embedPdf')


const emit = defineEmits([ //"update", 
  "update:Value",
  "update:Status",
  "update:ErrorMessage",
  "update:Key"
]);

///////////////////////////////////////
// Propiedades del componente reactivas
////////////////////////////////////
const props = defineProps<{
  //Recno: 0;
  //Show: true;
  //Component: null;
  prop: {
    ToolTipText: string;
    View: "";
    Field: "";
    Value: string;
    Placeholder: "";
    Format: "";
    InputMask: "";
    MaxLenght: 0;
    ReadOnly: false;
    Tag: "";
    Sw_val: false;
    Capture: true;
    Name: "";
    textLabel: "";
    Type: "text";
    Visible: true;
    Disabled: boolean;
    ControlSource: string;
    Status: string;
    ErrorMessage: string;
    TabIndex: number;
    Key: string;
    BaseClass: "EditText";
    This: false;
    Autofocus: false;
    RecordSource: string;
    Rows: number;
    //    SetFocus:false;
    //compAddress: any;
  };

  style: {
    background: "white";
    padding: "5px"; // Relleno
    color: "#b94295";
    width: "500px";
    height: "30px";
    fontFamily: "Arial";
    fontSize: "13px"; // automaticamente vue lo cambiara por font-size (para eso se utiliza la anotacion Camello)
    textAlign: "left";
  };
  position: {
    position: "left"; //left,right,center,absolute. Si es absulute poner Value left y top
    left: number;
    Top: number;
  };
  // db: any

}>();
// Valores componente padre
const Component = ref(props.prop.This)
const This = Component.value

console.log(' Details This =====>', This)
This['estatus'] = []
var load_data = false //Verdadero cuando se debe cargar datos a la pagina
const eventos = reactive([]);  // pila de eventos a ejecutar en forma sincrona

const Db = This.Form.db

// Valores propios
const Value = ref(props.prop.Value);
const Ref = ref(null) // Se necesita paratener referencia del :ref del componente  ref(props.prop.Ref)
const Status = ref(props.prop.Status);
const ErrorMessage = ref(props.prop.ErrorMessage)
const Key = ref(props.prop.Key)
defineExpose({ Value, Status, ErrorMessage });  // para que el padre las vea
const Error = ref(false)
var sw_ini = true
var openDetail = ref(false)
//const Focus = ref(false)



const Id = This.prop.Name


const scroll = reactive({
  controls: false,
  dataPage: [],  // Elementos que compone la pagina Db.View[props.prop.RecordSource].recnoVal[elementNo]
  top: true,     //Pprincipio de la pagina
  bottom: false,  // Final de pagina
  page: 0,        // Numero de pagina desplegada
  rows: props.prop.Rows // Renglones que puede tener la pagina
})



//const LocalDb = new localDb();
/////////////////////////////////////////////////////////////////////
// emitValue
// Descripcion: emite hacia el componente padre el nuavo valor asignado
/////////////////////////////////////////////////////////////////
const emitValue = async () => {
  Status.value = 'A'
  //console.log('EditBox antes emit Value ====>', props.prop.Value, Value.value)
  emit("update:Value", Value.value); // actualiza el valor Value en el componente padre
  emit("update:Status", 'A'); // actualiza el valor Status en el componente padre
  //emit("update") // emite un update en el componente padre
  //console.log('EditBox despues emit Value ====>', props.prop.Value, props.prop.Status)
  return true;
};

const toggle = () => {
  if (sw_ini) {
    sw_ini = false
    return
  }

  This.prop.Disabled = !This.prop.Disabled
  if (openDetail != This.prop.Disabled)
    openDetail = This.prop.Disabled

  console.log('toggle', props.prop.Name, 'This.prop.Disabled', This.prop.Disabled, openDetail)
  This.click()
}
////////////////////////////////////////
// Hacer el set focus 
///////////////////////////////////////



/*
/////////////////////////////////////////////////////////////////////
// focusOut
// Descripcion: Cuando pierda el foco el componente , actualizamo el valor en cursor local
/////////////////////////////////////////////////////////////////
const focusOut = async () => {
  const valor = Value.value;
  if (props.prop.ControlSource && props.prop.ControlSource.length > 0) {
    // actualiza valor en localDb
    await props.db.value.updateCampo(valor, props.prop.ControlSource, props.Recno)
    //await LocalDb.update(valor).then(() => { 
    // })
  }
  console.log('editBox focusout ', props.Name)
  return await emitValue()
}
*/
//console.log('EditBox despuest emit Value ====>', props.prop.Value, props.prop.Status)
//return true;



/*
////////////////////////////////////////
// Hacer el set focus 
///////////////////////////////////////
watch(
  () => Focus.value,
  (new_val, old_val) => {
    console.log('EditText Set Focus', props.Name)
    if (Focus.value) {
      Ref.value.focus()
      Ref.value.select()
      Focus.value = false
      emit("update:Focus", false)
    }
  },
  { deep: false }
);

*/

///////////////////////////////////////////////
// Cuando cambia el estatus de Inicial a Activo, emite valores  
///////////////////////////////////////////////

watch(
  () => props.prop.Status,
  (new_val, old_val) => {

    if (new_val == 'A') {
      if (old_val == 'I') {
        emitValue()
      }
      console.log('This.vue watch Status load_data', load_data)
      // si hay carga de datos
      if (load_data) {
        loadData()
      }

    }


  },
  { deep: false }
);

///////////////////////////////////////////////
// Cuando se cambia el RecordSource  
///////////////////////////////////////////////
watch(
  () => props.prop.RecordSource,
  (new_val, old_val) => {
    console.log('RecordSource scroll===>', scroll)
  }
  ,
  { deep: false }
);

watch(
  () => props.prop.Visible,
  async (new_val, old_val) => {
    /*   
      // Si no hay renglones , aumenta un renglon
      if (props.prop.Visible && Db.View[props.prop.RecordSource].recnoVal.length == 0){
         await appendRow()
         console.log('<=======Watch grid append Row Visible =======>', new_val,props.prop.Visible && Db.View[props.prop.RecordSource].recnoVal)
      }
   */

    if (props.prop.Visible && !old_val &&
      props.prop.RecordSource.length > 3) {
      //console.log('watch Visible ===>', scroll)
      for (const componet in This) {



      }



    }
  },
  { deep: false }
);



/************************************************************************************ */
////////////////////////////////
// revisa los eventos que hay a ejecutar, en caso que hay una estatus de un componente
// no ejecuta el evento
/////////////////////////////////


watch(
  () => eventos,
  (new_val, old_val) => {
    if (eventos.length == 0)
      return

    console.log('Watch estatus eventos,status This===>', new_val, This.estatus)

    for (const comp in This.estatus) {

      if (This.estatus[comp] != 'A' && Status.value == 'A') {
        Status.value = 'P';  // Cambia el estatus del grid a Proceso
        emit("update:Status", 'P'); // actualiza el valor Status en el componente padre. No se debe utilizar Status.Value

        return
      }
    }

    const evenEjecutar = [...eventos]

    eventos.length = 0 // borramos los eventos
    console.log('Watch estatus eventos===>', evenEjecutar)

    for (let i = 0; i < evenEjecutar.length; i++) {
      console.log('Details watch ThisForm.eventos', This.Form.eventos)
      if (evenEjecutar[i].length > 0)
        This.Form.eventos.push(evenEjecutar[i]) // emitimos los eventos a la forma padre
    }
  }, { deep: true }
);

//////////////////////////////////////////////
// Revisa la pila de eventos de procesos a ejecutar.
//  Cuando ya no hay procesos a ejecutar y hay carga de datos, 
// carga los datos de la pagina
/////////////////////////////////////////////////
watch(
  () => This.Form.eventos,
  () => {
    if (!load_data) return
    if (This.Form.eventos.length == 0) {
      if (This.Form.prop.Status != 'A')
        return
      console.log('=====watch thisform.eventos loadData()=======')
      loadData()

    }
  },
  { deep: false }
);

//////////////////////////////////////////////
// revisa los estatus de todos los componentes
watch(
  () => This.estatus,
  (new_val, old_val) => {
    console.log('<=======Watch estatus componentes =======>', This.estatus)

    for (const comp in This.estatus) { // Recorre todos los estatus del grid

      if (This.estatus[comp] != 'A' && Status.value == 'A') { // Si alguno no esta activo
        Status.value = 'P';  // Cambia el estatus del gri a Proceso
        emit("update:Status", 'P'); // actualiza el valor Status en el componente padre. No se debe utilizar Status.Value

        return
      }
    }
    Status.value = 'A';  // Todos los componentes del grid esta Activo
    emit("update:Status", 'A'); // actualiza el valor Status en el componente padre. No se debe utilizar Status.Value

    if (eventos.length == 0) return
    for (let i = 0; i < eventos.length; i++)
      This.Form.eventos.push(eventos[i])

    eventos.length = 0 // borramos los eventos

  },
  { deep: true }
);


const loadData = async () => {
  console.log('details load Data')

}



////////////////////////////////
// Aumenta la pila de eventos a ejecutar de la forma principal
// En caso que hay una estatus de un componente
// no ejecuta el evento
/////////////////////////////////
const ejeEvento = (newEvento: string) => {
  console.log('Details ejeEvento', newEvento)

  for (const comp in This.estatus) {

    if (This.estatus[comp] != 'A' && Status.value == 'A') {
      Status.value = 'P';  // Cambia el estatus del grid a Proceso
      emit("update:Status", 'P'); // actualiza el valor Status en el componente padre. No se debe utilizar Status.Value

      //        return
    }
  }

  This.Form.eventos.push(newEvento) // emitimos los eventos a la forma padre

}






/////////////////////////////////////////
// Metodo init Vfp
// Aqui debemos de asignar todos los Valores inciales del componente
// A pesar que nom_nom se pasa por referencia, se tuvo que definir en props para qu fuera reactivo
// Se tiene que emitir para que cambie el Valor en el template
/////////////////////////////////////////

const init = async () => {


  if (This.propDisabled == false) {
    detail.setAttribute("close", "");
    const detail = document.getElementById(Id + "_details")
  }
  for (const componente in This) {
    console.log('Details.vue Init This==>', componente, This[componente])
    if (This[componente] != null || This[componente] !== undefined) {
      if (
        This[componente].prop &&       // Si tiene propiedades
        This[componente].prop.Capture &&  // Si es componete de captura
        This[componente].prop.Capture == true
      ) {
        This.estatus[componente] = toRef(This[componente].prop, "Status"); // stack de estatus de componentes
      }
    }
  }
  console.log('Fin Details.vue Init This==>', This)

}

init() // Ejecuta el init

//////////////////////////////////////
//  Importa componentes dinamicos
////////////////////////////////////// 
const impComp = ((name: string, pos?: string) => {

  //return eval(name)

  switch (name.toLowerCase().trim()) {
    case 'edittext': {
      //console.log('Details Importo edittext')
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
      console.log('Importo Browse')
      return browseLite
      break;
    }

    case 'browselite': {

      console.log('Importo BrowseLite')
      return browseLite
      break;
    }

    case 'textlabel': {
      return textLabel
      break
    }
    /*
    case 'details': {
      return details
      break
    }
   */

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
<style scoped>
div.details {

  justify-content: center;
  align-items: center;
  border: 1px solid rgb(0, 5, 2);
  width: 100%;
  border-radius: 5px;
  padding: 10px 10px 10px 10px;
}

div.detailsOpen {
  align-content: baseline;
}


/*
div.contenedor {
  background: white;
  color: #b94295;
  min-width: 375px;
  min-height: 812px;
  background-image: "/logos/Logo_Empresa.png";
  margin-top: 30%;

}
*/
header {
  color: #9ef1a5;
  height: 20px;
  border: black;
  border-width: 1px;
  padding: 0 10x;
}




.modal {
  width: 300px;
  margin: 0px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px 3px;
  transition: all 0.2s ease-in;
  font-family: Helvetica, Arial, sans-serif;
  /*z-index: 999;*/
}

.fadeIn-enter {
  opacity: 0;
}

.fadeIn-leave-active {
  opacity: 0;
  transition: all 0.2s step-end;
}

.fadeIn-enter .modal,
.fadeIn-leave-active.modal {
  transform: scale(1.1);
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #00000094;
  z-index: 999;
  transition: opacity 0.2s ease;
}


div.footerDetail {
  display: flex;
  /*  flex;*/
  /*flex-direction: column; */
  align-items: last baseline;
  /*center;*/
  justify-content: space-around;
  /*width: 100%;*/
  height: auto;
  background-color: #c8e0ce;
  border: 1px solid rgb(0, 0, 0);
  border-radius: 6px;
  height: fit-content;
  z-index: 0;
  /*flex-direction: row-reverse; */
}

div.mainDetail {
  /*display: flex;*/
  /*  flex;*/
  /*flex-direction: column; */
  /*align-items: left; */
  /*center;*/
  /*justify-content: space-around;
   width: 100%;
   height: 100%;
  */
  text-align: left;
  background-color: #f2f4ef;
  /*border: 1px solid rgb(0, 0, 0);
  border-radius: 6px; */
  z-index: 1;
}

img.circle {
  width: 18 px;
  max-height: 18px;

}
</style>
