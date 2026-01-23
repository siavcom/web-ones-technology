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

import { CAPTURECOMPONENT } from "@/classes/CaptureComponent";

export class fec_pry extends CAPTURECOMPONENT {
  constructor() {
    super();

    // const nom_ind=renglon[i]['nom_ind']

    this.prop.Caption = "Fecha";
    this.prop.Type = "date";
    this.prop.BaseClass = "editText";
    this.prop.ControlSource = "vi_cap_comepry.fec_pry";

    this.prop.ToolTipText = "FECHA DE PROYECTO";

    this.prop.Capture = true;
    this.prop.updateKey = false;
    // this.style.width = "2560px";
  }
}
