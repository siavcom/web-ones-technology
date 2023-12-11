//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class : fec_pry
// Description : Fecha
// Author : El Fer Blocks
// Creation : 2023-07-20
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { captureComponent } from "@/classes/captureComponent";

export class fec_pry extends captureComponent {
  constructor() {
    super();

    // const nom_ind=renglon[i]['nom_ind']

    this.prop.textLabel = "Fecha";
    this.prop.Type = "date";
    this.prop.BaseClass = "editText";
    this.prop.ControlSource = "vi_cap_comepry.fec_pry";

    this.prop.ToolTipText = "FECHA DE PROYECTO";

    this.prop.Capture = true;
    this.prop.updateKey = false;
    this.style.width = "140px";
  }
}
