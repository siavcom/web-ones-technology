//////////////////////////////////////////////
// Clase : Form Base
// Author : Fernando Cuadras Angulo
// Creacion : Septiembre/2021
// Ult.Mod  : 18/Noviembre/2022
/////////////////////////////////////////////

import { COMPONENT } from "@/classes/Component";
import { VFPDB } from "@/classes/DataBase";
import { storeToRefs } from "pinia";
import { compContainer } from "./FormComponents/compContainer";

export class FORM extends COMPONENT {
  public compContainer = new compContainer()

  //Dom: any = getCurrentInstance();

  loading = true;
  eventos = []; // eventos a ejecutar en el stack
  estatus = []; // estatus de los componentes hijos
  Params = [];
  db = new VFPDB(); // conexion a la base de datos
  publicVar = {};
  clickedElement = null;
  Development = false; // desarrollo
  dialect = "MSSQL";
  language = false
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

    openForm(ref(this));
    console.log("ThisForm publicVar=", this.publicVar, "Params=", this.Params);


  }
  /////////////////////////////////////////
  // After Mounted
  ////////////////////////////////////
  public override async onMounted_old() {
    this.prop.Status = "A";

    const m = {
      for_lan: this.prop.Name,
      lan_lan: this.publicVar.lan_lan ? this.publicVar.lan_lan : '   '
    }

    console.log("Form :", this.Name, "m=", m);

    // Si hay lenguaje y existe una traduccion   
    if (m.lan_lan > '   ' && await this.Sql.use('vi_cap_db_languages', m)) {
      this.language = true

      super.afterMounted();

    }
    //await this.Sql.execute(`select map_lan,wor_lan,tra_lan from vi_cap_db_languages \
    //  where lan_lan='${m.lan_lan}' and for_lan='${m.for_lan}' `, 'language'))



  }

  public unload() {
    console.log("Form :", this.Name, " unload");
  }
}
