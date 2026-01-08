//////////////////////////////////////////////
// this Form was generated automatically for web-ones-technology
// BaseClass : optionGroup
// Class : tip_sel
// Description : Componente tipo de reporte 
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
    var tip_cop = 'VE', nom_cop = 'Cliente'
    this.Option1.prop.Caption = "Documento";
    this.Option2.prop.Caption = "Vendedor";
    this.Option3.prop.Caption = nom_cop;
    this.Option4.prop.Caption = "Vendedor/" + nom_cop;
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
