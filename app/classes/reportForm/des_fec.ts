//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// @baseClass  : component
// @class : des_fec
// Description : desde que fecha
// @author: El Fer Blocks
// Creation : 2023-09-29
// Update Date  : 2025-06-30
/////////////////////////////////////////////


import { COMPONENT } from "@/classes/Component";
export class des_fec extends COMPONENT {
  constructor() {
    super();
    this.prop.Caption = "Desde la fecha";
    this.prop.Type = "date";

  }
  override async init() {
    // console.log('1) addInterval', addInterval('2025-03-01', "day", -29))
    let des_fec = Public.value.fpo_pge
    const mes_act = des_fec.slice(5, 7)

    do {
      des_fec = addDay(des_fec, -1)
    } while (+des_fec.slice(5, 7) == +mes_act)

    des_fec = addDay(des_fec, +1)

    this.prop.Value = des_fec
    console.log('des_fec init', this.prop.Value)
  }
  override async valid() {
    if (this.Parent.has_fec.prop.Value < this.prop.Value)
      this.Parent.has_fec.prop.Value = this.prop.Value;
    return true;
  }

}
