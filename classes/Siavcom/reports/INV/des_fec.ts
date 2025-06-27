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

    // console.log('1) addInterval', addInterval('2025-03-01', "day", -29))

    const dias = +this.Form.mPublic.fpo_pge.slice(8, 10)

    this.prop.Value = addDate(this.Form.mPublic.fpo_pge, -dias, 'D'); // resta dias
    //  console.log('4) des_fec stringToDate des_fec=', this.prop.Value)

  }
  override async interactiveChange() {
    if (this.Parent.has_fec.prop.Value < this.prop.Value)
      this.Parent.has_fec.prop.Value = this.prop.Value;
    return true;
  }

}
