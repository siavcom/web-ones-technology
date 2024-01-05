//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class : des_mar
// Description : Marca
// Author : El Fer Blocks
// Creation : 2024-01-03
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from "@/classes/Component";

export class des_mar extends COMPONENT {
  constructor() {
    super();

    // const nom_ind=renglon[i]['nom_ind']

    this.prop.textLabel = "Marca";
    this.prop.Type = "text";
    this.prop.BaseClass = "editText";
    this.prop.ControlSource = "vi_cap_comebpe.des_mar";
    this.prop.Capture = false;
    this.prop.updateKey = false;
    this.prop.ReadOnly = true;
    this.style.width = "256px";
    this.prop.Visible = false;
  }
}
