//////////////////////////////////////////////
// Clase : Form Base
// Author : Fernando Cuadras Angulo
// Creacion : Septiembre/2021
// Ult.Mod  : 18/Noviembre/2022
/////////////////////////////////////////////

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
  db = new VFPDB(); // conexion a la base de datos
  publicVar = {};
  clickedElement = null;
  Development = false; // desarrollo
  dialect = "MSSQL";
  Recno = ref(999999999)

  //messageBox = MessageBox
  //  constructor(parent: Record<string, never>) {
  constructor() {
    super();
    this.prop.BaseClass = "Form";
    this.Sql = this.db;

    this.prop.Map = this.constructor.name;
    this.prop.Position = " "; // No hay posicion ya que es una forma
    this.Form = this;

    this.prop.Status = "I";

    //this.style.width = "99%";
    this.style.width = "-moz-available";
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

    const { Var, dialect } = storeToRefs(this.db.session); // variables publicas
    this.publicVar = Var.value;
    this.dialect = dialect.value;

    console.log("ThisForm publicVar=", this.publicVar, "Params=", this.Params);
  }
  /////////////////////////////////////////
  // After Mounted
  ////////////////////////////////////

  public async afterMounted() {
    this.prop.Status = "A";
  }

  public unload() {
    console.log("Form :", this.Name, " unload");
  }
}
