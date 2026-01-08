//////////////////////////////////////////////
// Clase : tip_rep
// Descripcion : Si es =1 reporte detallado
// Author : Fernando Cuadras Angulo
// Creacion : 14/Sep/2023
// Ult.Mod  :
/////////////////////////////////////////////

///////////////////////////////////////

import { COMPONENT } from "@/classes/Component";

export class tip_imp extends COMPONENT {
  //  constructor(parent: Record<string, never>) {
  constructor() {
    super();
    this.prop.Type = "checkBox";
    this.prop.Caption = "Detalle de actividades";
    this.prop.Value = 0;
    //this.prop.TabIndex = 102;
    this.prop.Visible = false    // No muestra general o detallado
    this.prop.Disabled = false    // No muestra general o detallado

  }

  async init() {
    if (this.prop.Visible == false) return;
    if (this.Form.for_ori.length == 0)
      this.Form.for_ori = this.Form.for_imp.prop.Value.trim();
    if (this.Form.vis_ori.length == 0)
      this.Form.vis_ori = this.Form.vis_rep.trim();
    this.interactiveChange()
  }

  async interactiveChange() {

    if (this.prop.Value == 1) {
      // Detallado
      this.Form.for_imp.prop.Value = this.Form.for_ori + "_d";
      this.Form.vis_rep = this.Form.vis_ori + "_d";
      this.Form.tab_ord = "vi_rep_comepry_d";
      this.Form.des_fac.prop.Visible = true;
      this.Form.des_fac.prop.Disabled = false;
      this.Form.has_fac.prop.Visible = true;
      this.Form.has_fac.prop.Disabled = false;
      this.Form.op_est_tap.prop.Visibre = true;
      this.Form.op_est_tap.prop.Disable = false;
      this.Form.des_fac.prop.Value = this.Form.des_fec.prop.Value
      this.Form.ord_vis = "tpy_tpy,num_pry,tap_tap,ord_tap"

    } else {
      //General
      this.Form.for_imp.prop.Value = this.Form.for_ori + "_g";
      this.Form.vis_rep = this.Form.vis_ori + "_g";
      this.Form.tab_ord = "vi_rep_comepry_g";
      this.Form.des_fac.prop.Visible = false;
      this.Form.des_fac.prop.Disabled = true;
      this.Form.has_fac.prop.Visible = false;
      this.Form.has_fac.prop.Disabled = true;
      this.Form.op_est_tap.prop.Visibre = false;
      this.Form.op_est_tap.prop.Disable = true;
      this.Form.ord_vis = "tpy_tpy,num_pry"
    }

    this.Form.init()

    return;
  }
}

