//////////////////////////////////////////////
// BaseClass : component
// Class : tip_fec
// Description : Fecha para validar el vencimiento
// Author : MGSR
// Creation : 2025-06-09
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { OPTIONGROUP } from "@/classes/OptionGroup";
import { option } from "~/classes/Option";
//imports
export class tip_fec extends OPTIONGROUP {
  //public

  constructor() {
    super();
    this.prop.BaseClass = "optionGroup";
    this.prop.Name = "tip_fec";
    this.prop.Caption = "Por fecha de: ";
    // this.Option1.prop.Caption = "No";
    // this.Option1.position.Left = 5;
    this.op1.prop.Caption = "Expedición";
    this.op2.prop.Caption = "Vencimiento";
    this.prop.Visible = true;
    this.prop.Value = 2;
    this.style.width = '350px'
    //propiedades
  }


  op1 = new class extends option {
    constructor() {
      super(1);
      this.prop.Value = 0
    }

  }   // Fin Procedure

  op2 = new class extends option {
    constructor() {
      super(2);
      this.prop.Value = 1
    }

  }


} //


