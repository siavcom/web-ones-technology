//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class : tra_bpe
// Description : Trasportista
// Author : El Fer Blocks
// Creation : 2024-01-03
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { captureComponent } from "@/classes/captureComponent";

export class tra_bpe extends captureComponent {
  constructor() {
    super();
    this.prop.textLabel = "Trasportista";
    this.prop.Type = "text";
    this.prop.BaseClass = "editText";
    this.prop.ControlSource = "vi_cap_comebpe.tra_bpe";
    this.prop.Placeholder = "Trasportista";
    this.prop.ToolTipText = "Trasportista";
    this.prop.MaxLength = 128;
    this.prop.Capture = true;
    this.prop.updateKey = false;
    this.prop.ReadOnly = true;
    this.prop.componentStyle.width = "512px"; // mas o menos 70 caracteres
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
