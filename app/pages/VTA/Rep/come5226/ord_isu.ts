//////////////////////////////////////////////
// this Form was generated automatically for web-ones-technology
// BaseClass : optionGroup
// Class : ord_isu
// Description : opciones de orden del cla_isu
// Author : MGSR
// Creation :2025-06-19
// Update Date  :
/////////////////////////////////////////////
// import {optionGroup} from "@/classes/optionGroup";

import { OPTIONGROUP } from "@/classes/OptionGroup";
//imports

export class ord_isu extends OPTIONGROUP {
  //public

  constructor() {
    super();
    this.prop.BaseClass = "optionGroup";
    this.prop.Name = "ord_isu";
    this.prop.Caption = " Insumo ordenado por: ";
    // this.Option1.prop.Caption = "No";
    // this.Option1.position.Left = 5;
    this.Option1.prop.Caption = "Captura";
    this.Option2.prop.Caption = "Clave de insumo";
    this.prop.Visible = true;
    this.prop.Value = 2;
    this.style.width = '380px'
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
