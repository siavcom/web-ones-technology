//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class : pla_cam
// Description : Placas
// Author : El Fer Blocks
// Creation : 2024-01-03
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from "@/classes/Component";

export class pla_cam extends COMPONENT {
  constructor() {
    super();

    // const nom_ind=renglon[i]['nom_ind']

    this.prop.textLabel = "Placas";
    this.prop.Type = "text";
    this.prop.BaseClass = "editText";
    this.prop.ControlSource = "vi_cap_comebpe.pla_cam";
    this.prop.Placeholder = "";
    this.prop.ToolTipText = "";
    this.prop.MaxLength = 10;
    this.prop.Capture = false;
    this.prop.updateKey = false;
    this.prop.ReadOnly = true;
    this.prop.Visible = false;
  }
  //////////////////////////////////
  // event when
  ///////////////////////////////////

  async when() {
    if (this.Form.tip_bpe.prop.Value == 0) {
      this.prop.ReadOnly = false;
    } else {
      this.prop.ReadOnly = true;
    }

    this.prop.Valid = true;
    return !this.prop.ReadOnly;
  }
}
