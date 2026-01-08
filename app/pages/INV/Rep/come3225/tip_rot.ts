//////////////////////////////////////////////
// BaseClass : component
// Class : tip_rot
// Description : Tipo de rotacion
// Author : MGSR
// Creation : 2025/03/21
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { OPTIONGROUP } from "@/classes/OptionGroup";
import { option } from "~/classes/Option";
//imports
export class tip_rot extends OPTIONGROUP {
  //public

  constructor() {
    super();
    this.prop.BaseClass = "optionGroup";
    this.prop.Name = "tip_rot";
    this.prop.Caption = " ";
    // this.Option1.prop.Caption = "No";
    // this.Option1.position.Left = 5;
    this.op1.prop.Caption = "Sin movimientos";
    this.op2.prop.Caption = "Con movimientos";

    this.prop.Visible = true;
    this.prop.Value = 1;
    this.style.width = '300px'
    //propiedades
  }


  op1 = new class extends option {
    constructor() {
      super(1);
      this.prop.Value = 1
    }
  }   // Fin Procedure

  op2 = new class extends option {
    constructor() {
      super(2);
      this.prop.Value = 0
    }

  }

}