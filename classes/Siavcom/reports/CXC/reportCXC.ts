//////////////////////////////////////////////
// Clase : reportCXC
// Author : Fernando Cuadras Angulo
// Creacion : Marzo/2023
// Ult.Mod  : 18/OCT/2023
/////////////////////////////////////////////


// Importa las clases base a este espacio de trabajo
import { reportForm } from "@/classes/reportForm/reportForm"
import { cx_tdo_tdo } from "./cx_tdo_tdo";
import { cx_tcd_tcd } from "./cx_tcd_tcd";
import { con_con } from "./con_con";

// Generamos la clase en memoria 
export class reportCXC extends reportForm {

  public cx_tdo_tdo = new cx_tdo_tdo()
  public cx_tcd_tcd = new cx_tcd_tcd()
  public con_con = new con_con()
  constructor() {
    super()
    // Asinamos el orden de captura ya que la clase base ya tiene componentes y hay que ponerlo adelante
    // de esos componentes 
    this.des_fec.prop.TabIndex = 1
    this.has_fec.prop.TabIndex = 2
    this.cx_tdo_tdo.prop.TabIndex = 3
    this.des_fec.prop.Disabled = true
    this.has_fec.prop.Visible = false
    this.cx_tdo_tdo.prop.Visible = false
    this.cx_tdo_tdo.prop.Disabled = true
    this.cx_tcd_tcd.prop.Visible = false
    this.cx_tcd_tcd.prop.Disabled = true
    this.con_con.prop.Disabled = true
    this.con_con.prop.Visible = false
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


    var par_prg = this.Form.Params[0].replaceAll("´", "").toLowerCase()
    var nom_par = ''
    if (par_prg == "c")
      nom_par = 'clientes'
    else
      nom_par = 'proveedores'

    this.prop.cam_pri = 'cod_nom' // campo de buqueda principal
    // Campos de orden de la vista
    this.fields = [
      ["cod_nom", "Código del " + nom_par, "'000000'", "'999999'"],
      ["nom_nom", "Nombre del " + nom_par, "''", "'ZZZZZZZZZZZZZ'"],
      ["rfc_nom", "RFC del " + nom_par, "''", "'ZZZZZZZZZZZZZ'"]

    ]
  }

  async init_ant(sw_detallado?: boolean) {
    await super.init()
    if (!sw_detallado) {
      this.has_fec.prop.Value = this.Form.mPublic.fpo_pge;
      this.des_fec.prop.Value = await addDate(this.Form.mPublic.fpo_pge, -1, 'D'); // resta un mes

    }
  }


}
