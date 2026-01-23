//////////////////////////////////////////////
// @baseClass  : component
// @class : rep_rep
// Description : Tipo de reporte
// @author: MGSR
// Creation : 2025/03/21
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { OPTIONGROUP } from "@/classes/OptionGroup";
import { option } from "~/classes/Option";
//imports
export class rep_rep extends OPTIONGROUP {
  //public

  constructor() {
    super();
    this.prop.BaseClass = "optionGroup";
    this.prop.Name = "rep_rep";
    this.prop.Caption = " ";
    // this.Option1.prop.Caption = "No";
    // this.Option1.position.Left = 5;
    this.op1.prop.Caption = "Solo con existencia";
    this.op2.prop.Caption = "Existencia en cero";
    this.op3.prop.Caption = "Todos";

    this.prop.Visible = true;
    this.prop.Value = 1;
    this.style.width = '400px'
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
  op3 = new class extends option {
    constructor() {
      super(3);
      this.prop.Value = 0
    }

  }

}
