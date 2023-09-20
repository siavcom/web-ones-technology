//////////////////////////////////////////////
// Clase : Form Base
// Author : Fernando Cuadras Angulo
// Creacion : Septiembre/2021
// Ult.Mod  : 18/Noviembre/2022
/////////////////////////////////////////////
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/*
import {
  inject,
  //getCurrentInstance,
  ref
} from "vue";
*/
import { COMPONENT } from "@/classes/Component";
import { VFPDB } from "@/classes/DataBase";
import { storeToRefs } from "pinia";

export class FORM extends COMPONENT {
  //Dom: any = getCurrentInstance();
  //Parent = {} //this.Dom.ctx; // Contexto
  //Form = {} //this.Parent.ThisForm // Thisform
  loading = true;
  eventos = []; // eventos a ejecutar en el stack
  estatus = []; // estatus de los componentes hijos
  Params = [];
  public db = new VFPDB(); // conexion a la base de datos
  Var = {};

  //messageBox = MessageBox
  //  constructor(parent: Record<string, never>) {
  constructor() {
    super();
    this.prop.BaseClass = "Form";

    this.prop.Map = this.constructor.name;
    this.prop.Position = " "; // No hay posicion ya que es una forma
    this.Form = this;

    this.style.width = "90%";
    this.style.height = "96%";
    // this.style.maxWidth = '100%'
    //    this.style.maxHeight='920px'

    // asigna los parametros de la llamada a esta forma (VFP parameters)
    const router = useRoute();
    const { params } = useRoute();

    for (const par in router.query) {
      this.Params.push(router.query[par]);
    }

    if (router.query.params) {
      // this.params=eval('['+router.query.params+']')
    }

    // asignamos en la clase db esta forma
    this.db.Form = this;

    const { Var } = storeToRefs(this.db.session); // variables publicas
    this.Var = Var.value;

    console.log("ThisForm Var=", this.Var, "Params=", this.Params);

    /*
    const promise = this._init()
    promise.then(() => {
 
      console.log(
        "Fin promesa ThisForm router Params===>",
        this.Params,
      
        "ThisForm.Var===>",
        this.Var
      );
      })
*/
  }

  /*
  async _init() {
    const RefVar = this.Var;
    console.log("ThisForm Var RefVar=", RefVar)

    for (const comp in RefVar) {
      const field = RefVar[comp];
      let Tipo = "";
      // Busca campo fecha
      if (
        typeof field == "string" &&
        +field.slice(0, 4) >= 1900 &&
        +field.slice(0, 4) <= 2100 &&
        field.slice(4, 5) == "-" &&
        +field.slice(5, 7) > 0 &&
        +field.slice(5, 7) < 13 &&
        field.slice(7, 8) == "-" &&
        +field.slice(8, 10) > 0 &&
        +field.slice(8, 10) < 32
      ){
        this.Var[comp] = await stringToDate(field);
        console.log(
          "ThisForm Var comp=",
          comp,
          'date Valor=',
          this.Var[comp]
        );
 

      }
    }
    
  }
*/
  //////////////////////////////
  // Salir de la forma
  //////////////////////////////
  /*
   clickSalir = async () => {
    if (await MessageBox("Salimos de la forma", 4, '') == 6){
      window.history.back()
     // window.close() // cierra la forma history.back(); // regresa forma anterior
  }}
  
*/
  public async afterMounted() {}
}
