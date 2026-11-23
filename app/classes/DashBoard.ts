//////////////////////////////////////////////
// Clase : Form Base
// @author: Fernando Cuadras Angulo
// Creacion : Septiembre/2021
// Ult.Mod  : 18/Noviembre/2022
/////////////////////////////////////////////

import { COMPONENT } from "@/classes/Component";
export class FORM extends COMPONENT {

  //Dom: any = getCurrentInstance();

  loading = true;
  // estatus = []; // estatus de los componentes hijos
  Params = [];
  //db = new VFPDB(); // conexion a la base de datos
  mPublic = {};
  clickedElement = null;
  Development = false; // desarrollo
  //dialect = "MSSQL";
  language = false
  //Recno = ref(0)

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
    justifyContent: 'space-between',
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
    this.Recno = ref(0)
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

    initSql(ref(this))  // Inicializa la conexion al SQLServer

    this.mPublic = { ...Public.value }

    openForm(this); // sql composables 

  }

  async cargaDatos() {

    const data = await SQLExec(`exec p_pedidos_dia '[1,12,33]','2023-01-01','2023-05-31'`)
    console.log('Dashboard data=', data)
  }


}

