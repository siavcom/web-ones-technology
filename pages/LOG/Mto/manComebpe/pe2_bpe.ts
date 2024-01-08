//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class : pe2_bpe
// Description : Pesada 2
// Author : El Fer Blocks
// Creation : 2024-01-03
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { captureComponent } from "@/classes/captureComponent";

export class pe2_bpe extends captureComponent {
  constructor() {
    super();

    this.prop.Type = "number";

    this.prop.ControlSource = "vi_cap_comebpe.pe2_bpe";

    this.prop.Decimals = 0;
    this.prop.Capture = true;
    this.prop.updateKey = false;
    this.prop.ReadOnly = true;
    this.prop.Disabled = true;
    this.style.fontSize = "20px";
    this.style.fontWeight = "bold";
    this.style.width = "128px";
  }
  async when() {
    this.prop.ReadOnly = true;
    return false;
  }
}
