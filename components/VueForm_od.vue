<template>
<section class="pagina" :style="estilo">
  <header class="header" float="left">
    <img class="logoVue" alt="Vue logo" src="../assets/logo.png" contain />
    <img class="logoEmp" :src="prop.log_emp" contain />
    <div class="nemPge">
      <label text-align="left">{{ prop.nem_pge }}</label>
    </div>
    <div class="fpoPge">
      <label type="date" text-align="right">{{ prop.fpo_pge + ' ' + prop.Name }}</label>
    </div>
    <div class="titFor">
      <label text-align="center">Titulo:{{ prop.Titulo }}</label>
    </div>
  </header>
  <body>
    <form>
      <transition name="modal">
        <div v-if="!ThisForm.prop.Login">
          <div class="overlay">
            <div id="modal" class="modal">
              <laLogUsu v-bind="ThisForm.la_log_usu" />
              <pasUsu
                v-model:Value="ThisForm.pas_usu.prop.Value"
                v-model:Status="ThisForm.pas_usu.prop.Status"
                v-model:ErrorMessage="ThisForm.pas_usu.prop.ErrorMessage"
                v-bind:prop="ThisForm.pas_usu.prop"
                v-bind:estilo="ThisForm.pas_usu.estilo"
                v-bind:posicion="ThisForm.pas_usu.posicion"
                @focusout="valid()"
              />
            </div>
          </div>
        </div>
      </transition>

      <section class="main">
        <slot name="main"></slot>
      </section>
    </form>
  </body>
  <section class="footer">
      <img v-if="prop.Status=='A'" src="/Iconos/BotonVerde.png" style="float:left" />
      <img v-if="prop.Status!='A'" src="/Iconos/BotonRojo.png" style="float:left" />
<slot name="footer"></slot>
    <!--span class="tooltip">
      <img class="bt_salir" :src="ThisForm.bt_salir.imagen.src" @click="clickSalir" />
      <span class="tooltiptext">
        {{
          ThisForm.bt_salir.prop.Valor
        }}
      </span>
    </span -->
  </section>
</section>
</template>

<script setup lang="ts">
//      <btSalir v-bind="VueForm.bt_salir" @click="clickSalir" />
//////////////////////////////////////////////////
/////////////////// VueForm //////////////////////
//////////////////////////////////////////////////
/*
&& ----------------------------------------------------------------------------------------------
&&              Siavcom Software S. de R.L. de C.V.
&& ----------------------------------------------------------------------------------------------
&& Autor    	: Ing. Fernando Cuadras Angulo
&& Sistema  	: Siavcom  							Version : 10.0  Web
&& Programa 	: Formas de datos  		  Mnemo   : VueForm.vue
&& Ult. mod.	: Fernando Cuadras  		Fecha   : 14/06/2021
&& Objeto		  : Vueform
&& Tipo			  : Form
&& Comentarios	: Forma principal de captura
&& ----------------------------------------------------------------------------------------------
*/

//    @change="$emit('update:Valor',$event.target.value)"
//   <h1>{{ Valor }}</h1>

//import { ThisForm } from "@/App.vue";
import {
  //defineProps,
  ref,
  onMounted,
  onUnmounted,
  watch,
  reactive,
  getCurrentInstance,
} from "vue";
import { useRoute } from "vue-router";

const This: any = getCurrentInstance();
const ThisCtx = This.ctx;
/////////////////////////////////////////////////
// Componentes
/////////////////////////////////////////////////

import laFpoPge from "./label.vue";
import laNemPge from "./label.vue";
import laTitFor from "./label.vue";
import btSalir from "./imgButton.vue";

import laLogUsu from "/components/label.vue";
import pasUsu from "/components/editText.vue";

//import laLogUsu from "./label.vue";

//////////////////////////////////////////////
// Clases Externas
//////////////////////////////////////////////
//import { VueSimpleAlert } from "vue3-simple-alert";
import { INIT } from "@/classes/Init";

//////////////////////////////////////////
// Clases
////////////////////////////////////
import { OpenDb } from "@/classes/OpenDB";


//////////////////////////////////////////////////
// Propiedades de los componentes
// Arbol de componentes de ThisForm segun Vfp //
//

const props = defineProps<{
  //  Valor: string;
  prop: {
    nem_pge: "Empresa SA de CV";
    Titulo: " Vue Form";
    fpo_pge: "01/01/01";
    log_emp: "/img/Logo_Empresa.bmp";
    img_sal: "/Iconos/exit.png";
    BaseClass: "Form";
    Login: false;
    Status: 'A';
  };

  estilo: {
    display: "flex";
    background: "white";
    color: "#b94295";
    width: "1420px";
    height: "980px";
    fontSize: "13px"; // automaticamente vue lo cambiara por font-size (para eso se utiliza la anotacion Camello)
    position: "center"; //absolute,
    left: number;
    Top: number;
    backgroundImage: "/img/Logo_Empresa.bmp";
  };
}>();

const ThisForm = reactive({
  prop: {
    Name: "VueForm",
    Login: true,
  },
  estilo: {},
  posicion: {},
  imagen: {},
  la_log_usu: {
    prop: { Label: "Usuario " },
    estilo: {},
    posicion: {},
  },
  pas_usu: { prop: { Label: 'Contraseña', Type: 'password' }, estilo: {}, posicion: {} },
//  bt_salir: {
//    prop: { Valor: "Sale de la forma (cierra)" },
//    estilo: {},
//    posicion: { float: "right" },
//    imagen: { src: "/Iconos/exit.png" },
//  },
});
const num_int = ref(0)
//const login = ref(false);
//login.value = false;

// necesitamos esto para el manejador de eventos
const estatus = reactive({}); //reactive({})
const eventos = [];
//const parameters = {};
const route = useRoute();
// Now you can access params like:
//console.log('Parametros',route.params.id);
console.log("Vue Form  Parametros", route);
/*
export const  model: {
      prop: 'hidden',
      event: 'blur'
  }

*/
/////////////////////////////////////////
// Metodo init Vfp
// Aqui debemos de asignar todos los Valores inciales del componente que pertenecen al arbol
// A pesar que nom_nom se pasa por referencia, se tuvo que definir en props para qu fuera reactivo
// Se tiene que emitir para que cambie el Valor en el template
/////////////////////////////////////////
//const mounted = onMounted(() =>

const db = new OpenDb("siavcom.com.mx:38080/", "Demo", "user", "*****");


const Init = new INIT();

const init = async () => {
  await Init.Init()

    .then(async () => {
      if (!db.ver_con()) ThisForm.prop.Login = false // pregunta login
      else ThisForm.prop.Login = true // conexion activa
    })
    .finally(async () => {
      console.log("Inicio exitoso VueForm.vue");
    });
};

const OnMounted = onMounted(() => {
  //console.log("Componente Montado!");
});

const valid = async () => {
  //console.log("Valid pas_usu Status ===> ", This.Status);

  if (ThisForm.pas_usu.prop.Value.length == 0) {
    ThisForm.pas_usu.prop.ErrorMessage = "Digite contraseña";
    return;
  }
  db.pass = ThisForm.pas_usu.prop.Value;

  const id_con = await db.open();
  if (id_con.length < 4) {
    VueSimpleAlert.alert(
      "No hay conexión, usuario o contraseña invalidos ",
      "Error",
      "error"
    );
    num_int.value++;
    if (num_int.value == 5) window.close(); // numero maximo de intentos = 5
    return;
  }
  num_int.value = 0; // reinicializamos los numero de intentos
  //guardamos el id de conexión
  ThisForm.prop.Login = true; // apaga el teleport para cerrar ventana login

  return true;
}; // fin metodo valid

/////////////////////////////////////////
// Vfp onFocus
///////////////////////////////////////

/*
export const onFocus = () => {
  console.log("============>Enfoco el elemento<============= ");
};

export const onfocus=onFocus (() => {
  This.parent.ctx[props.prop.Name]("onFocus", props.Valor).then();
});
*/

////////////////////////////////////////
// Watchers : Triggers de templates
////////////////////////////////////////
/////////////////////////////////////////////////////
// Ejecuta los eventis que hay en la pila de eventos
function eje_eve() {
  while (eventos.length > 0) {
    // corremos el stack de eventos a ejecutar
    for (const nom_com in estatus) {
      //
      console.log("Revizando estatus eje_eve ====>", estatus[nom_com]);
      if (estatus[nom_com] != "A") return; // si hay algo en proceso se sale
    }
    console.log("ejecutara Evento  ====>", eventos[0]);
    eval(eventos[0]); //(); // emitimos el primer evento.Tiene que llevar () para que funcione

    eventos.splice(0, 1); // borramos el evento
    console.log("Eventos en cola", eventos);
  }
}

/////////////////////////////////////////////////////
// Incerta el evento a ejecutar en la pila de eventos
function push_eve(nom_eve: string) {
  eventos.push(nom_eve);
  eje_eve();
}

//////////////////////////////////////////////
// revisa los estatus de todos los componentes
watch(
  () => estatus,
  (new_val, old_val) => {
    eje_eve(); // Ejecutara pila de eventos
  },
  { deep: true }
);

// Si se tiene en props, se tiene que vigilar el cambio de props.nom_nom
const clickSalir = () => {
  
//  VueSimpleAlert.confirm("Salimos de la forma").then(() => {

Swal({
      title: 'Salimos de la forma ',
      reverseButtons: true,
      showConfirmButton: true,
      showCancelButton: true,
      showDenyButton: true,
      icon: 'question',
    }).then((result) => {
      console.log('Mensaje result',result)
      if (result.value) {
        window.history.back(); // regresa forma anterior
      }
    });
    return

  //process.exit();
  // window.open('','_parent','');
  // window.close();  // cierra la sesion del navegador
};

////////////////////////////////////////
// Watchers : Triggers de templates
////////////////////////////////////////
// Si se tiene en props, se tiene que vigilar el cambio de props.nom_nom
watch(
  () => props.prop.Login,

  (new_val, old_val) => {
    ThisForm.prop.Login = new_val;
  },
  { deep: false }
);

init();
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #08315a;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
/*
div.contenedor {
  background: white;
  color: #b94295;
  min-width: 375px;
  min-height: 812px;
  background-image: "/img/Logo_Empresa.bmp";
  margin-top: 30%;

}
*/
header {
  color: #9ef1a5;
  height: 75px;
  border: black;
  border-width: 1px;
  padding: 0 10x;
}
img.logoVue {
  float: left;
  border: 1px solid #ddd;
  padding: 5px;
  width: 64px;
}
div.nemPge {
  float: left;
  width: 20%;
  color: #42b960;
  font-size: 11px;
  font-family: Arial;
  text-align: left;
}

div.titFor {
  float: center;
  color: #42b960;
  font-size: 18px;
  font-family: Arial;
  width: 65%;
}

div.fpoPge {
  float: right;
  width: 70px;
  color: #42b960;
  font-size: 11px;
  font-family: Arial;
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

div.password {
  font-family: myriad-pro, sans-serif;
  position: fixed;
  top: 20%;

  width: max-content;
  height: max-content;
  padding: 30px;
  background-color: #fff;
  border-radius: 20px;
  border: #42b960 3px solid;
  z-index: 999;
  /*    opacity: 1;*/
}

img.logoEmp {
  float: right;
  border: 1px solid #ddd;
  padding: 5px;
  width: 64px;
}

section.footer {
  display: flex; /*  flex;*/
  /*flex-direction: column; */
  align-items: center; /*center;*/
  justify-content: space-around;
  /*width: 100%;*/
  height: 90px;
  background-color: #c8e0ce;
  border: 1px solid rgb(0, 0, 0);
  border-radius: 6px;
}

img.bt_salir {
  background-color: rgb(255, 255, 255);
  box-shadow: 0 4px 8px 0, 0 6px 20px 0;
  box-sizing: border-box;
  /* width: 80px;*/
  height: auto;
  border-radius: 10%;
  padding: 5px;
  /*align-self: flex-end;*/
  /*position: absolute; /*"relative,static,absolute,sticky,fixed*/
  /* float: inline-end /**/
}

/* Tooltip container */
.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black; /* If you want dots under the hoverable text */
}

/* Tooltip text */
.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: #555;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;

  /* Position the tooltip text */
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -60px;

  /* Fade in tooltip */
  opacity: 0;
  transition: opacity 0.3s;
}

/* Tooltip arrow */
.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}
</style>
