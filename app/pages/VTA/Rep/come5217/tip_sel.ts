//////////////////////////////////////////////
// this Form was generated automatically for web-ones-technology
// @baseClass  : optionGroup
// @class : tip_sel
// Description : Componente tipo de reporte 
// @author: MGSR
// Creation :2025-07-11
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
    this.prop.BaseClass = "OPTIONGROUP";
    this.prop.Name = "tip_sel";
    this.prop.Caption = "Por: ";
    this.Option1.prop.Caption = "Producto";
    this.Option2.prop.Caption = "Vendedor";
    this.Option3.prop.Caption = 'Cliente';
    this.Option4.prop.Caption = " Cliente por vendedor";
    this.Option5.prop.Caption = " Cliente por estado";
    this.Option6.prop.Caption = " Cliente con consignatario";
    this.prop.Visible = true;
    this.prop.Value = 1;
    //   this.style.width = "850px"
    this.containerStyle.maxWidth = "850px"
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
  Option5 = new class extends option {
    constructor() {
      super(5);
    }
  }
  Option6 = new class extends option {
    constructor() {
      super(6);
    }
  }
}
