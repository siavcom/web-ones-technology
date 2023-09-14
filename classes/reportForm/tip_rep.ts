//////////////////////////////////////////////
// Clase : tip_rep
// Descripcion : Si es =1 reporte detallado
// Author : Fernando Cuadras Angulo
// Creacion : 14/Sep/2023
// Ult.Mod  :
/////////////////////////////////////////////

///////////////////////////////////////

import { COMPONENT } from "@/classes/Component";

export class tip_rep extends COMPONENT {
  //  constructor(parent: Record<string, never>) {
  constructor() {
    super();
    this.prop.Type = "checkBox";
    this.prop.textLabel = "Reporte detallado";
    this.prop.Value = 0;
    this.prop.TabIndex = 10;
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
    } else {
      //General
      this.Form.for_imp.prop.Value = this.Form.for_ori + "_g";
      this.Form.vis_rep = this.Form.vis_ori + "_g";
    }
    console.log('tip_rep Valid',this.Form.for_imp.prop.Value, this.Form.vis_rep)

    return ;
  }
}
