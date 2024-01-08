//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class : cho_bpe
// Description : hofer
// Author : El Fer Blocks
// Creation : 2024-01-09
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { captureComponent } from "@/classes/captureComponent";

export class cho_bpe extends captureComponent {
  constructor() {
    super();

    this.prop.textLabel = "Chofer/licencia";
    this.prop.Type = "text";
    this.prop.BaseClass = "editText";
    this.prop.ControlSource = "vi_cap_comebpe.cho_bpe";
    this.prop.Placeholder = "Chofer, conductor o No Licencia";
    this.prop.MaxLength = 128;
    this.prop.Capture = true;
    this.prop.updateKey = false;
    this.prop.ReadOnly = true;
    this.prop.Visible = false;
    this.prop.componentStyle.width = "512px"; // mas o menos 35 caracteres
  }
  //////////////////////////////////
  // event when
  ///////////////////////////////////

  async when() {
    if (this.Form.tip_bpe.prop.Value == 1) {
      this.prop.ReadOnly = false;
    } else {
      this.prop.ReadOnly = true;
    }

    this.prop.Valid = true;
    return !this.prop.ReadOnly;
  }
}
