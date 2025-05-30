//////////////////////////////////////////////
// Clase : Forma para generar reportes
// Author : Fernando Cuadras Angulo
// Creacion : Marzo/2023
// Ult.Mod  : 25/Mayo/2023
/////////////////////////////////////////////


// Importa las clases base a este espacio de trabajo
import { reportForm } from "@/classes/reportForm/reportForm"
import { des_fec } from "./des_fec";
import { has_fec } from "./has_fec";
import { alm_rep } from "./alm_rep";
import { tip_imp } from "./tip_imp";
import { op_des_fam } from "./op_des_fam";
import { op_has_fam } from "./op_has_fam";
import { sep_fam } from "./sep_fam";
import { num_fam } from "./num_fam";
import { des_isu } from "./des_isu";
import { has_isu } from "./has_isu";

// Generamos la clase en memoria 
export class reportInv extends reportForm {

  public des_fec = new des_fec()
  public has_fec = new has_fec()
  public alm_rep = new alm_rep()
  public tip_imp = new tip_imp()
  public op_des_isu = new des_isu()
  public op_has_isu = new has_isu()
  public sep_fam = new sep_fam()
  public num_fam = new num_fam()
  public op_des_fam = new op_des_fam()
  public op_has_fam = new op_has_fam()

  constructor() {
    super()
    // Asinamos el orden de captura ya que la clase base ya tiene componentes y hay que ponerlo adelante
    // de esos componentes 
    this.des_fec.prop.TabIndex = 1
    this.has_fec.prop.TabIndex = 2
    this.alm_rep.prop.TabIndex = 3
    this.tip_imp.prop.TabIndex = 4
    this.op_des_isu.prop.TabIndex = 5
    this.op_has_isu.prop.TabIndex = 6
    this.op_has_isu.prop.Value = "ZZZZZZZZZZ"
    this.op_des_isu.prop.Value = " "
    this.sep_fam.prop.TabIndex = 7
    this.num_fam.prop.TabIndex = 90
    this.num_fam.prop.Value = 1
    this.op_des_fam.prop.TabIndex = 91
    this.op_has_fam.prop.TabIndex = 92
    //this.has_fam.prop.Type = "string"
    //this.has_fam.prop.MaxLength=10
    //this.has_fam.prop.Value = " "
    //this.has_fam.prop.textLabel = "Hasta "
    // this.has_fam.style.width='100px'
    // this.has_fam.inputStyle.width='50px'


    this.prop.cam_pri = 'cla_isu' // campo de buqueda principal
    // Campos de orden de la vista
    this.fields = [
      ["cla_isu", "Clave", "''", "'ZZZZZZZZZZ'"],
      ["des_isu", "Descripción", , "''", "'ZZZZZZZZZZ'"],
      ["sku_isu", "SKU", , "''", "'ZZZZZZZZZZ'"]

    ]


  }

  async init() {
    await super.init()

    // this.des_fec.prop.Value =new Date() // await stringToDate(this.Form.mPublic.fpo_pge);
    // this.has_fec.prop.Value =new Date() // await stringToDate(this.Form.mPublic.fpo_pge);
    this.has_fec.prop.Value = this.Form.mPublic.fpo_pge;
    this.des_fec.prop.Value = await addDate(this.Form.mPublic.fpo_pge, -1, 'M'); // resta un mes

    //  console.log("ThisForm des_fec=",this.des_fec.prop.Value,' has_fec', this.has_fec.prop.Value);
  }


}
