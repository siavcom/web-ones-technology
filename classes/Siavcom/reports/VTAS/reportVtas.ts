//////////////////////////////////////////////
// Clase : Forma para generar reportes
// Author : Fernando Cuadras Angulo
// Creacion : Marzo/2023
// Ult.Mod  : 25/Mayo/2023
/////////////////////////////////////////////


// Importa las clases base a este espacio de trabajo
import { reportForm } from "@/classes/reportForm/reportForm"
import { op_tdo_tdo } from "./op_tdo_tdo";
import { op_tcd_tcd } from "./op_tcd_tcd";
import { des_fec } from "./des_fec";
import { has_fec } from "./has_fec";
import { alm_rep } from "./alm_rep";
import { sep_fam } from "./sep_fam";
import { num_fam } from "./num_fam";
import { op_des_fam } from "./op_des_fam";
import { op_has_fam } from "./op_has_fam";

// Generamos la clase en memoria 
export class reportVtas extends reportForm {

  public op_tdo_tdo = new op_tdo_tdo()
  public des_fec = new des_fec()
  public has_fec = new has_fec()
  public op_tcd_tcd = new op_tcd_tcd()
  public alm_rep = new alm_rep()
  public sep_fam = new sep_fam()
  public num_fam = new num_fam()
  public op_des_fam = new op_des_fam()
  public op_has_fam = new op_has_fam()
  
  constructor() {
    super()
    // Asinamos el orden de captura ya que la clase base ya tiene componentes y hay que ponerlo adelante
    // de esos componentes 
    this.op_tdo_tdo.prop.TabIndex = 1
    this.op_tcd_tcd.prop.TabIndex = 2
    this.des_fec.prop.TabIndex = 3
    this.has_fec.prop.TabIndex = 4
    this.sep_fam.prop.TabIndex = 89
    this.num_fam.prop.TabIndex = 90
    this.op_des_fam.prop.TabIndex = 91
    this.op_has_fam.prop.TabIndex = 92
    this.des_dat.prop.InputMask = Public.value.ima_pge.trim()
    this.has_dat.prop.InputMask = Public.value.ima_pge.trim()
    this.op_tcd_tcd.prop.Visible = false
    this.op_tcd_tcd.prop.Disabled = true
    this.alm_rep.prop.Visible = false
    this.alm_rep.prop.Disabled = true
    this.sep_fam.prop.Visible = false
    this.num_fam.prop.Visible = false
    this.op_des_fam.prop.Visible = false
    this.op_has_fam.prop.Visible = false
    this.sep_fam.prop.Disabled = true
    this.num_fam.prop.Disabled = true
    this.op_des_fam.prop.Disabled = true
    this.op_has_fam.prop.Disabled = true

    this.prop.cam_pri = 'ndo_doc' // campo de buqueda principal
    // Campos de orden de la vista
    this.fields = [
      ["ndo_doc", "Número del documento", "0", "99999999"],
      ["cod_nom", "Cliente"],
      ["fec_doc", "Fecha "],
      ["fel_doc", "Fecha de captura"],
      ["fve_doc", "Fecha de vencimiento"]
    ]
  }

  async init_ant(sw_detallado?: boolean) {
    await super.init()

    // this.des_fec.prop.Value =new Date() // await stringToDate(this.Form.mPublic.fpo_pge);
    // this.has_fec.prop.Value =new Date() // await stringToDate(this.Form.mPublic.fpo_pge);
    console.log('=======>Reporte Venta ', sw_detallado)

    if (!sw_detallado) {
      this.has_fec.prop.Value = this.Form.mPublic.fpo_pge;
      this.des_fec.prop.Value = await addDate(this.Form.mPublic.fpo_pge, -1, 'M'); // resta un mes
    }
    //  console.log("ThisForm des_fec=",this.des_fec.prop.Value,' has_fec', this.has_fec.prop.Value);
  }



}
