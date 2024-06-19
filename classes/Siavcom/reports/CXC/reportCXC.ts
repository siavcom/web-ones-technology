//////////////////////////////////////////////
// Clase : Forma para generar reportes
// Author : Fernando Cuadras Angulo
// Creacion : Marzo/2023
// Ult.Mod  : 18/OCT/2023
/////////////////////////////////////////////


// Importa las clases base a este espacio de trabajo
import { reportForm } from "@/classes/reportForm/reportForm"   
import { des_fec } from "./des_fec";
import { has_fec } from "./has_fec";


// Generamos la clase en memoria 
export class reportCXC extends reportForm {

  public des_fec= new des_fec()
  public has_fec= new has_fec()
  constructor() {
    super()
    // Asinamos el orden de captura ya que la clase base ya tiene componentes y hay que ponerlo adelante
    // de esos componentes 
    this.des_fec.prop.TabIndex=1
    this.has_fec.prop.TabIndex=2
    this.des_fec.prop.Disabled=true
    this.has_fec.prop.Visible=false
    this.prop.cam_pri = 'cod_nom' // campo de buqueda principal
    // Campos de orden de la vista
    this.fields = [
      ["cod_nom", "Código del cliente"],
      ["nom_nom", "Nombre del cliente"]
    ]
  }

async init() {
  await super.init()
   
   // this.des_fec.prop.Value =new Date() // await stringToDate(this.Form.publicVar.fpo_pge);
   // this.has_fec.prop.Value =new Date() // await stringToDate(this.Form.publicVar.fpo_pge);
   this.has_fec.prop.Value =this.Form.publicVar.fpo_pge;
   this.des_fec.prop.Value =await addDate(this.Form.publicVar.fpo_pge,-1,'M'); // resta un mes
  //  console.log("ThisForm des_fec=",this.des_fec.prop.Value,' has_fec', this.has_fec.prop.Value);
 }


}
