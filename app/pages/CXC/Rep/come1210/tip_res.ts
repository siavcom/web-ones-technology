//////////////////////////////////////////////
// @baseClass  : component
// @class : tip_res
// Description : Tipo de documentos saldados, no saldados o todos
// @author: MGSR
// Creation : 2025-06-09
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { OPTIONGROUP } from "@/classes/OptionGroup";
import { option } from "~/classes/Option";
//imports
export class tip_res extends OPTIONGROUP {
  //public

  constructor() {
    super();
    this.prop.BaseClass = "optionGroup";
    this.prop.Name = "tip_res";
    this.prop.Caption = "Tipo ";
    // this.Option1.prop.Caption = "No";
    // this.Option1.position.Left = 5;
    this.S.prop.Caption = "Saldados";
    this.N.prop.Caption = "No saldados";
    this.T.prop.Caption = "Todos";
    this.prop.Visible = true;
    this.prop.Value = 3;
    this.style.width = '320px'
    //propiedades
  }


  S = new class extends option {
    constructor() {
      super(1);
      this.prop.Value = 0
    }

  }   // Fin Procedure

  N = new class extends option {
    constructor() {
      super(2);
      this.prop.Value = 0
    }

  }
  T = new class extends option {
    constructor() {
      super(3);
      this.prop.Value = 1
    }

  }


}




