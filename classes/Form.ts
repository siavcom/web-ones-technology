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
  // estatus = []; // estatus de los componentes hijos
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
    width: 'auto',
    fontSize: '20px',
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
    zIndex: '5',
    display: 'flex',
    flexWrap: 'wrap'

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
    zIndex: '1',

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
    this.style.height = "auto" //"96%";
    this.style.background = 'white';
    this.style.minWidth = 'fit-content';
    this.style.minHeight = 'auto';
    this.style.backgroundColor = 'darkgray';
    this.style.borderRadius = '10px';
    this.captionStyle.color = 'black';
    /* margin-top: 250px; */
    // this.style.maxWidth = '100%'
    //    this.style.maxHeight='920px'

    // asigna los parametros de la llamada a esta forma (VFP parameters)
    const router = useRoute();
    const { params } = useRoute();

    for (const par in router.query) {
      let param = router.query[par]
      param = param.trim().replaceAll('´', "")
      if (left(param, 1) == "'")
        param = param.replace("'", "")
      if (right(param, 1) == "'")
        param = param.replace("'", "")

      this.Params.push(param);
    }

    if (router.query.params) {
      // this.params=eval('['+router.query.params+']')
    }

    // asignamos en la clase db esta forma
    // this.Sql.Form = this;

    initSql(ref(this))  // Inicializa la conexion al SQLServer

    const { dialect } = storeToRefs(this.Sql.session);

    // Variables publicas
    const session = Session()
    const { Var } = storeToRefs(session) // leemos variables publicas desde la base de datos

    Public.value.des_mon1[1] = Var.value.de1_pge
    Public.value.des_mon1[2] = Var.value.de2_pge
    Public.value.des_mon1[3] = Var.value.de3_pge
    Public.value.des_mon1[4] = Var.value.de4_pge
    Public.value.des_mon1[5] = Var.value.de5_pge

    Public.value.pro_mon1[1] = Var.value.pr1_pge
    Public.value.pro_mon1[2] = Var.value.pr2_pge
    Public.value.pro_mon1[3] = Var.value.pr3_pge
    Public.value.pro_mon1[4] = Var.value.pr4_pge
    Public.value.pro_mon1[5] = Var.value.pr5_pge

    Public.value.des_imp1[0] = Var.value.di0_pge
    Public.value.des_imp1[1] = Var.value.di1_pge
    Public.value.des_imp1[2] = Var.value.di2_pge
    Public.value.des_imp1[3] = Var.value.di3_pge
    Public.value.des_imp1[4] = Var.value.di4_pge
    Public.value.des_imp1[5] = Var.value.di5_pge

    //        dec_mon1: ["", "", "", "", ""],
    Public.value.val_mon1[1] = Var.value.va1_pge
    Public.value.val_mon1[2] = Var.value.va2_pge
    Public.value.val_mon1[3] = Var.value.va3_pge
    Public.value.val_mon1[4] = Var.value.va4_pge
    Public.value.val_mon1[5] = Var.value.va5_pge

    for (const comp in Public.value) {
      if (Var.value[comp]) {
        Public.value[comp] = Var.value[comp];

      }
    }
    this.mPublic = { ...Public.value }

    this.dialect = dialect.value;
    console.log("ThisForm :", this.prop.Name, "dialect=", this.dialect, 'this.mPublic=', this.mPublic);

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

