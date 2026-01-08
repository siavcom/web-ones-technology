//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class : ver_cpy
// Description : Número
// Author : El Fer Blocks
// Creation : 2023-07-20
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from "@/classes/Component";

export class ver_cpy extends COMPONENT {
  constructor() {
    super();

    // const nom_ind=renglon[i]['nom_ind']

    this.prop.Caption = "Versión de la cotización";
    this.prop.Type = "number";
    this.prop.BaseClass = "editText";
    this.prop.ControlSource = 'vi_cap_comepry.ver_cpy'
    this.prop.MaxLength = 4;
    this.prop.Min = "0";
    this.prop.Max = "9999";
    this.prop.Decimals = 0;
    this.prop.Disabled = true;
    this.inputStyle.width = "64px";
    this.inputStyle.fontSize = "17px";
    this.inputStyle.fontWeight = "bold";

    this.style.width = "250px";
    this.style.fontSize = "17px";
    this.style.fontWeight = "bold";
    this.prop.Value = 1;
  }

  //////////////////////////////////
  // event when
  ///////////////////////////////////

  async when() {
    this.Form.grid_comecpy.prop.RecordSource = "";
    this.Form.grid_comecpy.prop.Visible = false

    this.Form.bt_clonar.prop.Visible = false
    this.Form.bt_cotizacion.prop.Visible = false

    if (this.prop.Value == 0)
      this.prop.Value = 1

    const data = await SQLExec(`         
           select max(ver_cpy) as ver_cpy from man_comecpy where tpy_tpy='${this.Form.tpy_tpy.prop.Value}' \
           and num_pry=${this.Form.num_pry.prop.Value}`);

    if (!data[0])
      return false

    if (data[0].ver_cpy == null) {
      this.prop.Value = 1
      this.prop.ReadOnly = true
      return true
    } else {
      // this.prop.Value = data[0].ver_cpy == null ? 1 : data[0].ver_cpy + 1
      this.prop.Max = (this.prop.Value + 1).toString()

    }

    this.prop.ReadOnly = false
    return true;
  }

  async valid(): Promise<boolean> {
    this.Form.grid_comecpy.prop.RecordSource = "";
    this.Form.grid_comecpy.prop.Visible = false

    if (this.prop.Value == 0) {
      this.prop.Value = 1
    }
    this.Form.bt_cotizacion.prop.Visible = true
    return true
  }
}
