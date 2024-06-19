//////////////////////////////////////////////
// Clase : Forma para generar reportes
// Author : Fernando Cuadras Angulo
// Creacion : Marzo/2023
// Ult.Mod  : 25/Mayo/2023
/////////////////////////////////////////////


// Importa las clases base a este espacio de trabajo
import { reportForm } from "@/classes/reportForm/reportForm"   
import { tdo_tdo } from "./tdo_tdo";
import { des_fec } from "./des_fec";
import { has_fec } from "./has_fec";


// Generamos la clase en memoria 
export class reportVtas extends reportForm {

  public tdo_tdo= new tdo_tdo()  
  public des_fec= new des_fec()
  public has_fec= new has_fec()
  constructor() {
    super()
    // Asinamos el orden de captura ya que la clase base ya tiene componentes y hay que ponerlo adelante
    // de esos componentes 
    this.tdo_tdo.prop.TabIndex=1
    this.des_fec.prop.TabIndex=2
    this.has_fec.prop.TabIndex=3
    this.prop.cam_pri = 'ndo_doc' // campo de buqueda principal
    // Campos de orden de la vista
    this.fields = [
      ["ndo_doc", "Número del documento","0","99999999"],
      ["fec_doc", "Fecha "],
      ["cod_nom", "Cliente"],
      ["fel_doc", "Fecha de captura"],
      ["fve_doc", "Fecha de vencimiento"]
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
