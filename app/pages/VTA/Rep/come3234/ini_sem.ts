//////////////////////////////////////////////
// this Form was generated automatically for web-ones-technology
// BaseClass : optionGroup
// Class : ini_sem
// Description : En que inicia la semana (LMMJVSD) 
// Author : MGSR
// Creation :2025-07-16
// Update Date  :
/////////////////////////////////////////////
// import {optionGroup} from "@/classes/optionGroup";

import { OPTIONGROUP } from "@/classes/OptionGroup";
import { option } from "~/classes/Option";
//imports

export class ini_sem extends OPTIONGROUP {
  //public

  constructor() {
    super();
    this.prop.BaseClass = "OPTIONGROUP";
    this.prop.Name = "ini_sem";
    this.prop.Caption = "Semana inicia en: ";
    this.Option1.prop.Caption = "Lunes";
    this.Option2.prop.Caption = "Martes";
    this.Option3.prop.Caption = 'Miercoles';
    this.Option4.prop.Caption = " Jueves";
    this.Option5.prop.Caption = " Viernes";
    this.Option6.prop.Caption = " Sabado";
    this.Option7.prop.Caption = " Domingo";
    this.prop.Visible = true;
    //   this.style.width = "850px"
    this.containerStyle.maxWidth = "850px"
    //propiedades
  }


  Option1 = new class extends option {
    constructor() {
      super(1);
    }
    override async click() {
      super.click()
      //     this.Parent.ini_sem.valid();
      var dia = getDay(this.Form.fec_ini.prop.Value) + 1
      console.log('dia_semana=', dia)
      if (dia != 1)
        this.Form.fec_ini.prop.Value = addDay(this.Form.fec_ini.prop.Value, -(dia - 1))
      this.Form.fec_fin.prop.Value = addDay(this.Form.fec_ini.prop.Value, (7 * 14))
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
      var dia = getDay(this.Form.fec_ini.prop.Value) + 1
      console.log('dia_semana=', dia)
      if (dia != 2)
        this.Form.fec_ini.prop.Value = addDay(this.Form.fec_ini.prop.Value, -(dia - 2))
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
      //     this.Parent.ini_sem.valid();
      var dia = getDay(this.Form.fec_ini.prop.Value) + 1
      console.log('dia_semana=', dia)
      if (dia != 3)
        this.Form.fec_ini.prop.Value = addDay(this.Form.fec_ini.prop.Value, -(dia - 3))
      this.Form.fec_fin.prop.Value = addDay(this.Form.fec_ini.prop.Value, (7 * 14))
      return true;
    }
  }
  Option4 = new class extends option {
    constructor() {
      super(4);
    }
    override async click() {
      super.click()
      //     this.Parent.ini_sem.valid();
      var dia = getDay(this.Form.fec_ini.prop.Value) + 1
      console.log('dia_semana=', dia)
      if (dia != 4)
        this.Form.fec_ini.prop.Value = addDay(this.Form.fec_ini.prop.Value, -(dia - 4))
      this.Form.fec_fin.prop.Value = addDay(this.Form.fec_ini.prop.Value, (7 * 14))
      return true;
    }
  }
  Option5 = new class extends option {
    constructor() {
      super(5);
    }
    override async click() {
      super.click()
      //     this.Parent.ini_sem.valid();
      var dia = getDay(this.Form.fec_ini.prop.Value) + 1
      console.log('dia_semana=', dia)
      if (dia != 5)
        this.Form.fec_ini.prop.Value = addDay(this.Form.fec_ini.prop.Value, -(dia - 5))
      this.Form.fec_fin.prop.Value = addDay(this.Form.fec_ini.prop.Value, (7 * 14))
      return true;
    }
  }
  Option6 = new class extends option {
    constructor() {
      super(6);
    }
    override async click() {
      super.click()
      //     this.Parent.ini_sem.valid();
      var dia = getDay(this.Form.fec_ini.prop.Value) + 1
      console.log('dia_semana=', dia)
      if (dia != 6)
        this.Form.fec_ini.prop.Value = addDay(this.Form.fec_ini.prop.Value, -(dia - 6))
      this.Form.fec_fin.prop.Value = addDay(this.Form.fec_ini.prop.Value, (7 * 14))
      return true;
    }
  }
  Option7 = new class extends option {
    constructor() {
      super(7);
    }
    override async click() {
      super.click()
      //     this.Parent.ini_sem.valid();
      var dia = getDay(this.Form.fec_ini.prop.Value) + 1
      console.log('dia_semana=', dia)
      if (dia != 7)
        this.Form.fec_ini.prop.Value = addDay(this.Form.fec_ini.prop.Value, -(dia - 7))
      this.Form.fec_fin.prop.Value = addDay(this.Form.fec_ini.prop.Value, (7 * 14))
      return true;
    }
  }
}
