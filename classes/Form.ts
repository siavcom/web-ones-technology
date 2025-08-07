//////////////////////////////////////////////
// Clase : Form Base
// Author : Fernando Cuadras Angulo
// Creacion : Septiembre/2021
// Ult.Mod  : 18/Noviembre/2022
/////////////////////////////////////////////

import { COMPONENT } from "@/classes/Component";
//import { VFPDB } from "@/classes/DataBase";
import { storeToRefs } from "pinia";
import { translateContainer } from "./translateContainer/translateContainer";
export class FORM extends COMPONENT {
  public translateContainer = new translateContainer()

  //Dom: any = getCurrentInstance();

  loading = true;
  eventos = []; // eventos a ejecutar en el stack
  estatus = []; // estatus de los componentes hijos
  Params = [];
  //db = new VFPDB(); // conexion a la base de datos
  mPublic = {};
  clickedElement = null;
  Development = false; // desarrollo
  dialect = "MSSQL";
  language = false
  Recno = ref(999999999)


  headerStyle = {
    display: 'flex',
    alignItems: 'last baseline',

    justifyContent: 'space-around',

    height: 'fit-content',
    backgroundColor: '#ebf8ee',
    border: '1px solid rgb(0, 0, 0)',
    borderRadius: '6px',

    /*  flex;
    flex-direction: column; 
    center;
    width: 100%;*/

  }



  mainStyle = {
    textAlign: 'left',
    backgroundColor: '#f2f4ef',
    border: '1px solid rgb(0, 0, 0)',
    borderRadius: '6px',

    zIndex: '1',

    /*border: 1px solid rgb(0, 0, 0);
      border-radius: 6px; */
    /*display: flex;*/
    /*  flex;*/
    /*flex-direction: column; */
    /*align-items: left; */
    /*center;*/
    /*justify-content: space-around;
    width: 100%;
    height: 100%;
    */

  }

  footerStyle = {
    display: 'flex',
    alignItems: 'last baseline',
    justifyContent: 'space-around',
    height: 'fit-content',
    backgroundColor: '#c8e0ce',
    border: '1px solid rgb(0, 0, 0)',
    borderRadius: '6px',
    zIndex: '2',

    /*  flex;*/
    /*flex-direction: column; */
    /*center;*/
    /*width: 100%;*/

  }



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

    /*********** Style **********************/
    //this.style.width = "99%";
    this.style.width = "-moz-available";
    this.style.height = "96%";
    this.style.background = 'white';

    this.style.minWidth = '375px';
    this.style.minHeight = '812px';

    /* margin-top: 250px; */



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
    // this.Sql.Form = this;

    initSql(ref(this))  // Inicializa la conexion al SQLServer

    // const { Var, dialect } = storeToRefs(this.db.session); // variables publicas
    const { Var, dialect } = storeToRefs(this.Sql.session); // variables publicas

    for (const comp in Public.value)
      if (Var.value[comp])
        Public.value[comp] = Var.value[comp];


    this.mPublic = Public.value;
    this.dialect = dialect.value;
    console.log("ThisForm :", this.prop.Name, "dialect=", this.dialect, 'Public=', Public.value, 'this.mPublic=', this.mPublic);

  }



  public salir = new class {
    constructor() {

    }

    public async click() {
      if (await MessageBox("Salimos de la forma", 4, '') == 6) {

        window.history.back()
        // window.close() // cierra la forma history.back(); // regresa forma anterior
      }

    }
  }

  /*   /////////////////////////////////////////
    // After Mounted
    ////////////////////////////////////
    public override async onMounted_old() {
      this.prop.Status = "A";
  
      const m = {
        for_lan: this.prop.Name,
        lan_lan: this.mPublic.lan_lan ? this.mPublic.lan_lan : '   '
      }
  
      console.log("Form :", this.Name, "m=", m);
  
      // Si hay lenguaje y existe una traduccion   
      if (m.lan_lan > '   ' && await this.Sql.use('vi_cap_db_languages', m)) {
        this.language = true
  
        super.afterMounted();
  
      }
      //await SQLExec(`select map_lan,wor_lan,tra_lan from vi_cap_db_languages \
      //  where lan_lan='${m.lan_lan}' and for_lan='${m.for_lan}' `, 'language'))
  
  
  
    }
   */
  public unload() {
    console.log("Form :", this.Name, " unload");
  }




}



