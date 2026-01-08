//////////////////////////////////////////////
// this Form was generated automatically for web-ones-technology
// BaseClass : optionGroup
// Class : tip_ped
// Description : Componente tip_ped
// Author : MGSR
// Creation :2025-06-19
// Update Date  :
/////////////////////////////////////////////
// import {optionGroup} from "@/classes/optionGroup";

import { OPTIONGROUP } from "@/classes/OptionGroup";
import { option } from "~/classes/Option";
//imports

export class tip_sel extends OPTIONGROUP {
  //public

  constructor() {
    super();
    this.prop.BaseClass = "optionGroup";
    this.prop.Name = "tip_sel";
    this.prop.Caption = "Agrupado por: ";
    // this.Option1.prop.Caption = "No";
    // this.Option1.position.Left = 5;
    this.Option1.prop.Caption = "Cliente";
    this.Option2.prop.Caption = "Vendedor";
    this.Option3.prop.Caption = "Vendedor/cliente";
    this.Option4.prop.Caption = "Estado/cliente";
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
  Option4 = new class extends option {
    constructor() {
      super(4);
    }
  }
}
