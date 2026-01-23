//////////////////////////////////////////////
// this Form was generated automatically for web-ones-technology
// @baseClass  : optionGroup
// @class : tip_ped
// Description : Componente tip_ped
// @author: MGSR
// Creation :2025-06-19
// Update Date  :
/////////////////////////////////////////////
// import {optionGroup} from "@/classes/optionGroup";

import { OPTIONGROUP } from "@/classes/OptionGroup";
//imports

export class tip_ped extends OPTIONGROUP {
  //public

  constructor() {
    super();
    this.prop.BaseClass = "optionGroup";
    this.prop.Name = "tip_ped";
    this.prop.Caption = "Pedidos";
    // this.Option1.prop.Caption = "No";
    // this.Option1.position.Left = 5;
    this.Option1.prop.Caption = "Por entregar";
    this.Option2.prop.Caption = "Entregados";
    this.Option3.prop.Caption = "Todos";
    this.prop.Visible = true;
    this.prop.Value = 3;
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
  Option3 = new class extends option {
    constructor() {
      super(3);
    }
  }
}
