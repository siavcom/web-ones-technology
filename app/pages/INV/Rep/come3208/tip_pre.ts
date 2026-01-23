//////////////////////////////////////////////
// @baseClass  : component
// @class : tip_pre
// Description : Tipo de lista de precios
// @author: El Fer Blocks
// Creation : 2023-09-20
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { OPTIONGROUP } from "@/classes/OptionGroup";
import { option } from "~/classes/Option";
//imports
export class tip_pre extends OPTIONGROUP {
  //public

  constructor() {
    super();
    this.prop.BaseClass = "optionGroup";
    this.prop.Name = "tip_pre";
    this.prop.Caption = "Lista de precios ";
    // this.Option1.prop.Caption = "No";
    // this.Option1.position.Left = 5;
    this.A.prop.Caption = "A";
    this.B.prop.Caption = "B";
    this.C.prop.Caption = "C"
    this.D.prop.Caption = "D";
    this.E.prop.Caption = "E";
    this.F.prop.Caption = "Reposición";
    this.G.prop.Caption = "Estandar";

    this.prop.Visible = true;
    this.prop.Value = 1;
    this.style.width = '550px'
    //propiedades
  }


  A = new class extends option {
    constructor() {
      super(1);

    }
  }   // Fin Procedure

  B = new class extends option {
    constructor() {
      super(2);
    }
  }
  C = new class extends option {
    constructor() {
      super(3);
    }
  }
  D = new class extends option {
    constructor() {
      super(4);
    }
  }
  E = new class extends option {
    constructor() {
      super(5);
    }
  }
  F = new class extends option {
    constructor() {
      super(6);
    }
  }
  G = new class extends option {
    constructor() {
      super(7);
    }
  }

}
//      ["A", "B", "C", "D", "E", "F", "G"],

