//////////////////////////////////////////////
// this Form was generated automatically for web-ones-technology
// BaseClass : optionGroup
// Class : sep_fam
// Description : Componente sep_fam
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 03/06/25
// Update Date  :
/////////////////////////////////////////////
// import {optionGroup} from "@/classes/optionGroup";

import { OPTIONGROUP } from "@/classes/OptionGroup";
//imports

export class sep_fam extends OPTIONGROUP {
  //public

  constructor() {
    super();
    this.prop.BaseClass = "optionGroup";
    this.prop.Name = "sep_fam";
    this.prop.Caption = "Separamos familia";
    // this.Option1.prop.Caption = "No";
    // this.Option1.position.Left = 5;
    this.No.prop.Caption = "No";
    this.Si.prop.Caption = "Si";
    // this.Si.position.Left = 41;
    this.Si.prop.Name = "Si";
    this.Si.prop.Name = "No";
    this.prop.Visible = false;
    //propiedades
  }


  No = new class extends option {
    constructor() {
      super(1);
    }

    override async click() {
      super.click()
      this.Form.num_fam.prop.Visible = false
      this.Form.des_fam.prop.Visible = false
      this.Form.Captura_alm.prop.RecordSource = ''  // asignamos la tabla de captura de movimientos  

    }   // Fin Procedure
  }

  Si = new class extends option {
    constructor() {
      super(2);
    }

    override async click() {
      super.click()
      this.Form.num_fam.prop.Visible = true
      this.Form.des_fam.prop.Visible = true
      this.Form.Captura_alm.prop.RecordSource = ''  // asignamos la tabla de captura de movimientos  

    }   // Fin Procedure


    //metodo
  }

  override async when() {
    this.Form.Captura_alm.prop.RecordSource = ''  // asignamos la tabla de captura de movimientos 

    return true
  }   // Fin Procedure




}