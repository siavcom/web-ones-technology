//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class : tit_pry
// Description : Titulo
// Author : El Fer Blocks
// Creation : 2023-07-20
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from "@/classes/Component";

export class tit_pry extends COMPONENT {
  constructor() {
    super();

    // const nom_ind=renglon[i]['nom_ind']

    this.prop.Caption = "Titulo del proyecto";
    this.prop.Type = "text";
    this.prop.BaseClass = "editText";
    this.prop.ControlSource = "vi_cap_comepry.tit_pry";
    this.prop.Disabled = true
    this.inputStyle.width = "600px";

  }



}
