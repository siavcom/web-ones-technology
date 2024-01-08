//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class : tp1_bpe
// Description : Fecha Hora Pesada 1
// Author : El Fer Blocks
// Creation : 2024-01-03
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { captureComponent } from "@/classes/captureComponent";

export class tp1_bpe extends captureComponent {
  constructor() {
    super();

    // const nom_ind=renglon[i]['nom_ind']

    this.prop.textLabel = "Pesada 1";
    this.prop.Type = "datetime";

    this.prop.ControlSource = "vi_cap_comebpe.tp1_bpe";
    this.prop.Capture = true;
    this.prop.updateKey = false;
    this.prop.ReadOnly = true;
    this.style.fontSize = "20px";
    this.style.fontWeight = "bold";
    this.style.width = "200px";
  }
  async when() {
    this.prop.ReadOnly = true;
    return false;
  }
}
