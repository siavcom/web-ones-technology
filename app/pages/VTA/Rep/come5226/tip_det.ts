//////////////////////////////////////////////
// this Form was generated automatically for web-ones-technology
// @baseClass  : optionGroup
// @class : tip_det
// Description : tipo de reporte POS 3M o detallado especial SHEL)
// @author: MGSR
// Creation :2025-08-12
// Update Date  :
/////////////////////////////////////////////
// import {optionGroup} from "@/classes/optionGroup";

import { OPTIONGROUP } from "@/classes/OptionGroup";
import { option } from "~/classes/Option";
//imports

export class tip_det extends OPTIONGROUP {
  //public

  constructor() {
    super();
    this.prop.BaseClass = "optionGroup";
    this.prop.Name = "tip_det";
    this.prop.Caption = "Tipo: ";
    // this.Option1.prop.Caption = "No";
    // this.Option1.position.Left = 5;
    this.Option1.prop.Caption = "POS 3M";
    this.Option2.prop.Caption = "Detallado";
    this.prop.Visible = true;
    this.prop.Value = 1;
    this.style.width = '220px'
    //propiedades
  }

  Option1 = new class extends option {
    constructor() {
      super(1);

    }
    override async click() {
      super.click()
      this.Form.ord_isu.prop.Visible = false;
      this.Form.ord_isu.prop.Disabled = true;
    }
  }   // Fin Procedure

  Option2 = new class extends option {
    constructor() {
      super(2);
    }
    override async click() {
      super.click()
      this.Form.ord_isu.prop.Visible = true;
      this.Form.ord_isu.prop.Disabled = false;
    }
  }

}
