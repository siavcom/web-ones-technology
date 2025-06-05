//////////////////////////////////////////////
// Clase : reportCXC
// Author : Fernando Cuadras Angulo
// Creacion : Marzo/2023
// Ult.Mod  : 18/OCT/2023
/////////////////////////////////////////////


// Importa las clases base a este espacio de trabajo
import { reportForm } from "@/classes/reportForm/reportForm"
import { des_fec } from "./des_fec";
import { has_fec } from "./has_fec";
import { op_tdo_tdo } from "./op_tdo_tdo";
import { con_con } from "~/classes/reports/CXC/con_con";

// Generamos la clase en memoria 
export class reportCXC extends reportForm {

  public des_fec = new des_fec()
  public has_fec = new has_fec()
  public op_tdo_tdo = new op_tdo_tdo()
  public con_con = new con_con()
  constructor() {
    super()
    // Asinamos el orden de captura ya que la clase base ya tiene componentes y hay que ponerlo adelante
    // de esos componentes 
    this.des_fec.prop.TabIndex = 1
    this.has_fec.prop.TabIndex = 2
    this.op_tdo_tdo.prop.TabIndex = 3
    this.des_fec.prop.Disabled = true
    this.has_fec.prop.Visible = false
    this.op_tdo_tdo.prop.Visible = false
    this.op_tdo_tdo.prop.Disabled = true
    this.con_con.prop.Disabled = true
    this.con_con.prop.Visible = false
    var par_prg = this.Form.Params[0].replaceAll("´", "").toLowerCase()
    var nom_par = ''
    if (par_prg == "c")
      nom_par = 'clientes'
    else
      nom_par = 'proveedores'

    this.prop.cam_pri = 'cod_nom' // campo de buqueda principal
    // Campos de orden de la vista
    this.fields = [
      ["cod_nom", "Código del " + nom_par],
      ["nom_nom", "Nombre del " + nom_par],
      ["rfc_nom", "RFC del " + nom_par]

    ]

    const m = this.Form.mPublic;
    const des_mon = [
      m.pr1_pge,
      m.pr2_pge,
      m.pr3_pge,
      m.pr4_pge,
      m.pr5_pge,
    ];
    const num_mon = [1, 2, 3, 4, 5];
    this.Form.mon_rep.prop.RowSource = [des_mon, num_mon];
    this.Form.mon_rep.prop.Value = 1;
  }

  async init_ant(sw_detallado?: boolean) {
    await super.init()
    if (!sw_detallado) {
      this.has_fec.prop.Value = this.Form.mPublic.fpo_pge;
      this.des_fec.prop.Value = await addDate(this.Form.mPublic.fpo_pge, -1, 'D'); // resta un mes

    }
  }


}
