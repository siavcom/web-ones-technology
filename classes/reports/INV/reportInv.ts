//////////////////////////////////////////////
// Clase : Forma para generar reportes
// Author : Fernando Cuadras Angulo
// Creacion : Marzo/2023
// Ult.Mod  : 25/Mayo/2023
/////////////////////////////////////////////


// Importa las clases base a este espacio de trabajo
import { reportForm } from "@/classes/reportForm/reportForm"   
import { tdo_tdo } from "@/classes/reports/VTAS/tdo_tdo";
import { des_fec } from "@/classes/reports/VTAS/des_fec";
import { has_fec } from "@/classes/reports/VTAS/has_fec";
import { alm_rep } from "./alm_rep";


// Generamos la clase en memoria 
export class reportInv extends reportForm {

  public tdo_tdo= new tdo_tdo()  
  public des_fec= new des_fec()
  public has_fec= new has_fec()
  public alm_rep= new alm_rep()
  constructor() {
    super()
    // Asinamos el orden de captura ya que la clase base ya tiene componentes y hay que ponerlo adelante
    // de esos componentes 
    this.tdo_tdo.prop.TabIndex=1
    this.des_fec.prop.TabIndex=2
    this.has_fec.prop.TabIndex=3
    this.alm_rep.prop.TabIndex=4
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
