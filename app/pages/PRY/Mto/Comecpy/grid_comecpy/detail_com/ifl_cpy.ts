//////////////////////////////////////////////
// Clase : ifl_cpy
// Descripcion : Insumo en ERP Siavcom
// Author : Fernando Cuadras Angulo
// Creacion : 26/Abril/2024
// Ult.Mod  :
/////////////////////////////////////////////

///////////////////////////////////////

import { COMPONENT } from "@/classes/Component";

export class ifl_cpy extends COMPONENT {
  constructor() {
    super();
    this.prop.Type = "checkBox";
    this.prop.Caption = "Incluye flete ";
    this.prop.ControlSource = 'vi_cap_comecpy.ifl_cpy'
    this.prop.Capture = true
    this.style.width = "105px"

  }

  async interactiveChange() {
  }
}
