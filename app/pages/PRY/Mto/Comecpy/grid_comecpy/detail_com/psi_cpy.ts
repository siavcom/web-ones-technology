//////////////////////////////////////////////
// Clase : psi_cpy
// Descripcion : Proveedor en ERP Siavcom
// @author: Fernando Cuadras Angulo
// Creacion : 14/Ags/2024
// Ult.Mod  : 14/Ags/2024
/////////////////////////////////////////////

///////////////////////////////////////

import { COMPONENT } from "@/classes/Component";

export class psi_cpy extends COMPONENT {
  constructor() {
    super();
    this.prop.Type = "checkBox";
    this.prop.Caption = "Proveedor interno ";
    this.prop.ControlSource = 'vi_cap_comecpy.psi_cpy'
    this.prop.Capture = true
    this.prop.ToolTipText = " El proveedor se encuentra en el ERP (Siavcom) ?"
  }

  async interactiveChange() {
    this.Parent.block[2].prop.Visible = !this.Parent.block[2].prop.Visible // interno
    this.Parent.block[3].prop.Visible = !this.Parent.block[3].prop.Visible // externo


  }

}
