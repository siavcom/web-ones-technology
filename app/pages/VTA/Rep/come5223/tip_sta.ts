//////////////////////////////////////////////
// this Form was generated automatically for web-ones-technology
// BaseClass : optionGroup
// Class : tip_sta
// Description : Componente tipo de estatus (kardex, no procesados, procesados)
// Author : MGSR
// Creation :2025-08-08
// Update Date  :
/////////////////////////////////////////////
// import {optionGroup} from "@/classes/optionGroup";

import { OPTIONGROUP } from "@/classes/OptionGroup";
import { option } from "~/classes/Option";
//imports

export class tip_sta extends OPTIONGROUP {
  //public

  constructor() {
    super();
    this.prop.BaseClass = "optionGroup";
    this.prop.Name = "tip_sta";
    this.prop.Caption = "Estatus: ";
    // this.Option1.prop.Caption = "No";
    // this.Option1.position.Left = 5;
    this.Option1.prop.Caption = "Kardex";
    this.Option2.prop.Caption = "No procesados";
    this.Option3.prop.Caption = "Procesados";
    this.prop.Visible = true;
    this.prop.Value = 1;
    this.style.width = '550px'
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
  Option3 = new class extends option {
    constructor() {
      super(3);
    }
  }

}
