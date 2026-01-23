//////////////////////////////////////////////
// this Form was generated automatically for web-ones-technology
// @baseClass  : OPTIONGROUP
// @class : tip_exp
// Description : reporte en importes o unidades
// @author: MGSR
// Creation :2025-07-16
// Update Date  :
/////////////////////////////////////////////
// import {optionGroup} from "@/classes/optionGroup";

import { OPTIONGROUP } from "@/classes/OptionGroup";
import { option } from "~/classes/Option";
//imports

export class tip_exp extends OPTIONGROUP {
  //public

  constructor() {
    super();
    this.prop.BaseClass = "optionGroup";
    this.prop.Name = "tip_exp";
    this.prop.Caption = "Expresado en: ";
    // this.Option1.prop.Caption = "No";
    // this.Option1.position.Left = 5;
    this.Option1.prop.Caption = "Unidades";
    this.Option2.prop.Caption = "Importes";
    this.prop.Visible = true;
    this.prop.Value = 1;
    this.style.width = '295px'
    //propiedades
  }


  Option1 = new class extends option {
    constructor() {
      super(1);

    }
  }   // Fin Procedure

  Option2 = new class extends option {
    constructor() {
      super(2);
    }
  }

}
