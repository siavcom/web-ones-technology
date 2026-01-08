//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class : fcu_pry
// Description : Culminacion
// Author : El Fer Blocks
// Creation : 2023-07-20
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { CAPTURECOMPONENT } from "@/classes/CaptureComponent";

export class fcu_pry extends CAPTURECOMPONENT {
  constructor() {
    super();

    this.prop.Caption = "Culminacion";
    this.prop.Type = "date";
    this.prop.BaseClass = "editText";
    this.prop.ControlSource = "vi_cap_comepry.fcu_pry";
    this.prop.ToolTipText = "FECHA DE CULMINACION";
    this.prop.Capture = true;
    this.prop.updateKey = false;
    //this.style.width = "auto";
  }
}
