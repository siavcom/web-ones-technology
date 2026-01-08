//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// BaseClass : optionGroup
// Class : Tipo
// Description : Componente Tipo
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 29/05/25
// Update Date  :
/////////////////////////////////////////////
// import {optionGroup} from "@/classes/optionGroup";

import { OPTIONGROUP } from "@/classes/OptionGroup";
//imports

export class Tipo extends OPTIONGROUP {
  //public
  constructor() {
    super();
    this.prop.BaseClass = "optionGroup";
    this.prop.Name = "Tipo";
    this.prop.Caption = "Captura por:";

    this.Option1.prop.Caption = "Clave ";
    this.Option1.prop.Name = "Clave";
    this.Option2.prop.Caption = "Almacen";
    this.Option2.prop.Name = "Almacen";

    //propiedades
  }

  Option1 = new class extends option {
    constructor() {
      super(1);
    }

    // Evento   :Click 
    // Objeto  :Almacen 
    // Comentarios : 
    //  public async ClaveClick(This?: any) {
    public override async click(This?: any) {
      super.click() //ddodefault()
      if (!This) This = this


      if (This.prop.Value == 1) {
        this.Form.cla_isu.when()


      }
      else this.Parent.Option2.click()

    }   // Fin Procedure

  }

  Option2 = new class extends option {
    constructor() {
      super(2);
    }

    // public async AlmacenClick(This?: any) {
    public override async click(This?: any) {
      super.click()
      if (!This) This = this

      This.Form.cla_isu.prop.Visible = false
      This.Form.alm_tda.prop.Visible = true
      This.Form.des_cla.prop.Visible = true

      This.Form.has_cla.prop.Visible = true

      This.Form.sep_fam.prop.Visible = true
      This.Form.Captura_alm.prop.RecordSource = ''  // asignamos la tabla de captura de movimientos 
      This.Form.Captura_alm.c_cla_isu.prop.Visible = true
      This.Form.Captura_alm.c_cla_isu.prop.Disabled = false

      This.Form.Captura_alm.c_alm_tda.prop.Visible = false
      This.Form.Captura_alm.c_alm_tda.prop.Disabled = true


      this.Form.has_cla.prop.Value = strtran(Public.value.ima_pge, '!', 'Z')
      this.Form.has_cla.prop.Value = strtran(this.Form.has_cla.prop.Value, 'X', 'Z')


    }   // Fin Procedure

    //metodo
  }
}