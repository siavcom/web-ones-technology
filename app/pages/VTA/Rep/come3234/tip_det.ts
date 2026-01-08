//////////////////////////////////////////////
// this Form was generated automatically for web-ones-technology
// BaseClass : OPTIONGROUP
// Class : tip_det
// Description : reporte detallado por cliente,cte/consignatario
// Author : MGSR
// Creation :2025-07-16
// Update Date  :
/////////////////////////////////////////////
// import {optionGroup} from "@/classes/optionGroup";

import { OPTIONGROUP } from "@/classes/OptionGroup";
import { option } from "~/classes/Option";
//imports

export class tip_det extends OPTIONGROUP {
  //public

  constructor() {
    super();
    this.prop.BaseClass = "optionGroup";
    this.prop.Name = "tip_det";
    this.prop.Caption = "Detallado por: ";
    // this.Option1.prop.Caption = "No";
    // this.Option1.position.Left = 5;
    this.Option1.prop.Caption = "Insumos";
    this.Option2.prop.Caption = "Cliente";
    this.Option3.prop.Caption = "Cliente/consignatario";
    this.prop.Visible = true;
    this.prop.Value = 1;
    this.style.width = '495px'
    //propiedades
  }


  Option1 = new class extends option {
    constructor() {
      super(1);
    }
    override async click() {
      super.click()
      this.Form.des_cte.prop.Visible = false;
      this.Form.des_cte.prop.Disabled = true;
      this.Form.has_cte.prop.Visible = false;
      this.Form.has_cte.prop.Disabled = true;
      return true;
    }


  }   // Fin Procedure

  Option2 = new class extends option {
    constructor() {
      super(2);
    }
    override async click() {
      super.click()
      this.Form.des_cte.prop.Visible = true;
      this.Form.des_cte.prop.Disabled = false;
      this.Form.has_cte.prop.Visible = true;
      this.Form.has_cte.prop.Disabled = false;
      return true;
    }

  }
  Option3 = new class extends option {
    constructor() {
      super(3);
    }
    override async click() {
      super.click()
      this.Form.des_cte.prop.Visible = true;
      this.Form.des_cte.prop.Disabled = false;
      this.Form.has_cte.prop.Visible = true;
      this.Form.has_cte.prop.Disabled = false;
      return true;
    }
  }
}
