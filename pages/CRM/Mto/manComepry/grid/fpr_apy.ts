///////////////////////////////////////
// base class
///////////////////////////////////////

import { COLUMN } from "@/classes/Column";

export class fpr_apy extends COLUMN {
  /**
   *  //////////////////////////////////////////////
   * This class component was generated automatically by web-ones-technology
   * BaseClass : COLUMN
   * Class : fpr_apy
   * Description : Fecha de programacion
   * Author : El Fer Blocks
   * Creation : 2023-07-10
   * Update Date  :
   *    ///////////////////////////////////////////
   * Creates an instance of fpr_apy.
   * @memberof fpr_apy
   */
  constructor() {
    super();

    this.textLabel = "Fecha programada"; // Column Header
    this.prop.Type = "datetime";
    this.prop.ControlSource = "vi_cap_comeapy.fpr_apy";

    this.prop.Capture = true;
    this.prop.updateKey = false;
    // this.style.zIndex = 1;
    // this.prop.componentStyle.width = "180px";
    this.style.width = "210px";
  }
}
