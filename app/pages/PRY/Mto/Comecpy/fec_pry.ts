//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// @baseClass  : component
// @class : fec_pry
// Description : Fecha
// @author: El Fer Blocks
// Creation : 2023-07-20
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from "@/classes/Component";

export class fec_pry extends COMPONENT {
  constructor() {
    super();

    // const nom_ind=renglon[i]['nom_ind']

    this.prop.Caption = "Fecha";
    this.prop.Type = "date";
    this.prop.BaseClass = "editText";
    this.prop.ControlSource = "vi_cap_comepry.fec_pry";
    this.prop.Disabled = true

    // this.style.width = "2560px";
  }
}
