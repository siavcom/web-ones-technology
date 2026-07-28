//////////////////////////////////////////////
// Clase : Form Base
// @author: Fernando Cuadras Angulo
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
  //dialect = "MSSQL";
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
    this.style.background = 'antiquewhite'; // 'white';
    // this.style.minWidth = 'fit-content';
    this.style.minHeight = 'auto';
    this.style.backgroundColor = 'darkgray';
    this.style.borderRadius = '10px';
    this.captionStyle.color = 'black';
    /* margin-top: 250px; */
    // this.style.maxWidth = '100%'
    //    this.style.maxHeight='920px'

    // asigna los parametros de la llamada a esta forma (VFP parameters)

    /*
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
*/

    initSql(ref(this))  // Inicializa la conexion al SQLServer

    this.mPublic = { ...Public.value }

    //this.dialect = Public.value.dialect

    openForm(this); // sql composables 

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


  /////////////////////////////////////////
  // init Mounted
  ////////////////////////////////////
  public override async init() {

    const router = useRoute();
    const { params } = useRoute();
    console.log('ThisForm router=', router)

    for (const par in router.query) {
      let param = router.query[par]
      param = param.trim().replaceAll('´', "")
      if (left(param, 1) == "'")
        param = param.replace("'", "")
      if (right(param, 1) == "'")
        param = param.replace("'", "")

      this.Params.push(param);

    }

    console.log("ThisForm :", this.prop.Name, 'Params=', this.Form.Params, "dialect=", Public.value.dialect, 'Public.value=', Public.value);
  }
  /**
    * @description
    * Es llamado despues de que el componente es desmontado.
    * Se utiliza para liberar recursos.
    * @returns {Promise<void>}
    */
  public override onUnmounted() {
    console.log("Form onUnMounted Form:", this.Name);
    return
  }

  //  public unload() {
  //    console.log("Form unload:", this.Name, " unload");
  //  }

}

