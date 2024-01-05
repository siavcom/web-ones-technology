//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class : pe1_bpe
// Description : Pesada Uno
// Author : El Fer Blocks
// Creation : 2024-01-03
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { captureComponent } from "@/classes/captureComponent";

export class pe1_bpe extends captureComponent {
  constructor() {
    super();

    // const nom_ind=renglon[i]['nom_ind']

    this.prop.Type = "number";
    this.prop.BaseClass = "textLabel";
    this.prop.ControlSource = "vi_cap_comebpe.pe1_bpe";
    this.prop.Decimals = 0;
    //    this.prop.Capture = true;
    this.prop.updateKey = false;
    this.prop.ReadOnly = true;
    this.prop.Disabled = true;
    this.style.fontSize = "20px";
    this.style.fontWeight = "bold";
    this.style.width = "200px";
  }
}
