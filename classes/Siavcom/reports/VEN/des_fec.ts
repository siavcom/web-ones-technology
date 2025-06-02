//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class : des_fec
// Description : desde que fecha
// Author : El Fer Blocks
// Creation : 2023-09-29
// Update Date  :
/////////////////////////////////////////////


import { COMPONENT } from "@/classes/Component";
export class des_fec extends COMPONENT {
  constructor() {
    super();
    this.prop.Caption = "Desde la fecha";
    this.prop.Type = "date";
    this.prop.Value = '1900-01-01'

  }
  override async init() {
    this.prop.Value = await addDate(this.Form.mPublic.fpo_pge, -1, 'M'); // resta un mes
  }
  async interactiveChange() {

    this.Parent.has_fec.prop.Value = this.prop.Value;
    return true;
  }



}
