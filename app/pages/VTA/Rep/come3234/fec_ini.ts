//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// @baseClass  : component
// @class : fec_ini
// Description : desde que fecha
// @author: El Fer Blocks
// Creation : 2023-09-29
// Update Date  : 2025-06-30
/////////////////////////////////////////////


import { COMPONENT } from "@/classes/Component";
export class fec_ini extends COMPONENT {
  constructor() {
    super();
    this.prop.Caption = "Desde la fecha";
    this.prop.Type = "date";

  }
  override async init() {
    // console.log('1) addInterval', addInterval('2025-03-01', "day", -29))
    const dias = +this.Form.mPublic.fpo_pge.slice(8, 10) - 1
    this.prop.Value = addDay(this.Form.mPublic.fpo_pge, -dias); // resta dias

  }
  override async valid() {
    if (this.Parent.fec_fin.prop.Value < this.prop.Value)
      this.Parent.fec_fin.prop.Value = this.prop.Value;

    if (this.Form.tip_des.prop.Value == 1)
      this.Form.fec_fin.prop.Value = addDay(this.Form.fec_ini.prop.Value, 13)
    if (this.Form.tip_des.prop.Value == 2) {
      var dia = getDay(this.prop.Value) + 1
      console.log('dia_semana=', dia)
      if (dia != this.Form.ini_sem.prop.Value)
        this.Form.fec_ini.prop.Value = addDay(this.Form.fec_ini.prop.Value, -(dia - this.Form.ini_sem.prop.Value))
      this.Form.fec_fin.prop.Value = addDay(this.Form.fec_ini.prop.Value, (7 * 14))
    }
    if (this.Form.tip_des.prop.Value == 3)

      this.Form.fec_fin.prop.Value = addMonth(this.Form.fec_ini.prop.Value, 13)

    if (this.Form.tip_des.prop.Value == 4)

      this.Form.fec_fin.prop.Value = addYear(this.Form.fec_ini.prop.Value, 13)

  }


}
