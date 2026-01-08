//////////////////////////////////////////////
// this Form was generated automatically for web-ones-technology
// BaseClass : optionGroup
// Class : tip_des
// Description : Tipo de reporte día,mensual,semanal,anual 
// Author : MGSR
// Creation :2025-07-16
// Update Date  :
/////////////////////////////////////////////
// import {optionGroup} from "@/classes/optionGroup";

import { OPTIONGROUP } from "@/classes/OptionGroup";
import { option } from "~/classes/Option";
import { addMonth, addYear, addDay } from "~/composables/Functions";
//imports

export class tip_des extends OPTIONGROUP {
  //public

  constructor() {
    super();
    this.prop.BaseClass = "OPTIONGROUP";
    this.prop.Name = "tip_des";
    this.prop.Caption = "Desglosado por: ";
    this.Option1.prop.Caption = "Día";
    this.Option2.prop.Caption = "Semana";
    this.Option3.prop.Caption = 'Mes';
    this.Option4.prop.Caption = " Año";
    this.prop.Visible = true;
    this.prop.Value = 1;
    //   this.style.width = "850px"
    this.containerStyle.maxWidth = "600px"
    //propiedades
  }


  Option1 = new class extends option {
    constructor() {
      super(1);
    }
    override async click() {
      super.click()
      this.Form.ini_sem.prop.Visible = false;
      this.Form.ini_sem.prop.Disabled = true;
      this.Form.fec_fin.prop.Value = addDay(this.Form.fec_ini.prop.Value, 13)

      return true;
    }

  }   // Fin Procedure

  Option2 = new class extends option {
    constructor() {
      super(2);
    }
    override async click() {
      super.click()
      //     this.Parent.ini_sem.valid();
      this.Form.ini_sem.prop.Visible = true;
      this.Form.ini_sem.prop.Disabled = false;
      this.Form.fec_fin.prop.Value = addDay(this.Form.fec_ini.prop.Value, (7 * 14))
      return true;
    }


  }


  Option3 = new class extends option {
    constructor() {
      super(3);
    }
    override async click() {
      super.click()
      this.Form.ini_sem.prop.Visible = false;
      this.Form.ini_sem.prop.Disabled = true;
      this.Form.fec_fin.prop.Value = addMonth(this.Form.fec_ini.prop.Value, 13)
      return true;
    }

  }
  Option4 = new class extends option {
    constructor() {
      super(4);
    }
    override async click() {
      super.click()
      this.Form.ini_sem.prop.Visible = false;
      this.Form.ini_sem.prop.Disabled = true;
      this.Form.fec_fin.prop.Value = addYear(this.Form.fec_ini.prop.Value, 13)
      return true;
    }

  }





}