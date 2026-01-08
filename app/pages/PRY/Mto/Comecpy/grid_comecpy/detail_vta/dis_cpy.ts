//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class : dis_cpy
// Description : Datos Json delo isnumo segun proveedor
// Author : El Fer Blocks
// Creation : 2025-02-03
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from "@/classes/Component";

export class dis_cpy extends COMPONENT {
  constructor() {
    super();
    this.prop.Type = "json";
    this.prop.Caption = 'Datos del insumo lista del proveedor';
    this.prop.ControlSource = "vi_cap_comecpy.dis_cpy";
    this.style.width = "99%";
    this.inputStyle.width = "min-content";
    this.inputStyle.display = 'flex';
    this.inputStyle.flexWrap = 'wrap';

  }

  override async when() {

    if (this.prop.Value == null) {

      this.prop.Value = JSON.stringify(this.Sql.vi_cap_comecpy.val_def.dis_cpy);

    }
    return true;
  }
}