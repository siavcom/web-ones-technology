//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class : bas_bpe
// Description : Numero de bascula
// Author : El Fer Blocks
// Creation : 2024-01-03
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { captureComponent } from "@/classes/captureComponent";
export class bas_bpe extends captureComponent {
  constructor() {
    super();

    // const nom_ind=renglon[i]['nom_ind']

    this.prop.textLabel = "Bascula";
    this.prop.Type = "number";
    this.prop.ControlSource = "vi_cap_comebpe.bas_bpe";
    this.prop.Min = "1";
    this.prop.Max = "100";
    this.prop.Decimals = 0;
    this.prop.Capture = true;
    this.prop.updateKey = true;
    this.prop.Value = 1;

    this.prop.componentStyle.width = "64px";
    this.prop.componentStyle.fontSize = "17px";
    this.prop.componentStyle.fontWeight = "bold";
    this.style.fontSize = "17px";
    this.style.fontWeight = "bold";
    this.prop.First = true;
  }
}
