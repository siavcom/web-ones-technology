//////////////////////////////////////////////
// BaseClass : component
// Class : tip_doc
// Description : Tipo de documento cargo o abono
// Author : MGSR
// Creation : 2025-06-10
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { OPTIONGROUP } from "@/classes/OptionGroup";
import { option } from "~/classes/Option";
//imports
export class tip_doc extends OPTIONGROUP {
  //public

  constructor() {
    super();
    this.prop.BaseClass = "optionGroup";
    this.prop.Name = "tip_doc";
    this.prop.Caption = "Tipo ";
    // this.Option1.prop.Caption = "No";
    // this.Option1.position.Left = 5;
    this.C.prop.Caption = "Cargos";
    this.A.prop.Caption = "Abonos";

    this.prop.Visible = true;
    this.prop.Value = 1;
    this.style.width = '220px'
    //propiedades
  }


  C = new class extends option {
    constructor() {
      super(1);
      this.prop.Value = 1
    }

    override async click() {
      super.click()
      this.Form.cx_tdo_tdo.prop.RowSource =
        `select des_tdo,tdo_tdo,coa_tdo from now.loc_cometdo where coa_tdo='C' and cop_nom='${this.Form.Params[0].replaceAll("´", "")}' union select '  Todos ' as des_tdo,'?? ' as tdo_tdo,'T' as coa_tdo order by des_tdo`;
      return true;
    }

  }   // Fin Procedure

  A = new class extends option {
    constructor() {
      super(2);
      this.prop.Value = 0
    }


    override async click() {
      super.click()
      this.Form.cx_tdo_tdo.prop.RowSource =
        `select des_tdo,tdo_tdo,coa_tdo from now.loc_cometdo where coa_tdo='A' and cop_nom='${this.Form.Params[0].replaceAll("´", "")}' union select '  Todos ' as des_tdo,'?? ' as tdo_tdo,'T' as coa_tdo order by des_tdo`;
      return true;
    }
  }

}
