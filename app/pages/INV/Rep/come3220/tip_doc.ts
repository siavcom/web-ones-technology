//////////////////////////////////////////////
// BaseClass : component
// Class : tip_doc
// Description : Tipo de documento de entrada o salida
// Author : El Fer Blocks
// Creation : 2025-01-09
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
    this.E.prop.Caption = "Entradas";
    this.S.prop.Caption = "Salidas";

    this.prop.Visible = true;
    //    this.prop.Value = 2;
    this.style.width = '220px'
    //propiedades
  }


  E = new class extends option {
    constructor() {
      super(1);
      this.prop.Value = 0
    }
    override async click() {
      super.click()
      this.Form.in_tdo_tdo.prop.RowSource = " select des_tdo,tdo_tdo,inv_tdo from now.loc_cometdo where inv_tdo = 'E' union select '  Todos ' as des_tdo,'?? ' as tdo_tdo,'N' as inv_tdo order by des_tdo  "
      return true;
    }

  }   // Fin Procedure

  S = new class extends option {
    constructor() {
      super(2);
      this.prop.Value = 1
    }
    override async click() {
      super.click()
      this.Form.in_tdo_tdo.prop.RowSource = "select des_tdo,tdo_tdo,inv_tdo from now.loc_cometdo where inv_tdo = 'S' union select '  Todos ' as des_tdo,'?? ' as tdo_tdo,'N' as inv_tdo order by des_tdo "
      return true;
    }
  }

}


