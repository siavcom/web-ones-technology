//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class : per_apy
// Description : Numero actividad periodo
// Author : El Fer Blocks
// Creation : 2023-12-05
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from "@/classes/Component";

export class per_apy extends COMPONENT {
  constructor() {
    super();

    this.prop.textLabel = "Periodo número ";
    this.prop.Type = "spinner";
    this.prop.Type = "number";
    this.prop.Value = 1;
    this.prop.MaxLength = 4;
    this.prop.Min = "0";
    this.prop.Max = "999";
    this.prop.Visible = false;
    this.style.width = "100px";
    this.style.fontSize = "17px";
    this.style.fontWeight = "bold";

    this.prop.componentStyle.width = "100px";
    this.prop.componentStyle.fontSize = "17px";
    this.prop.componentStyle.fontWeight = "bold";
  }

  //////////////////////////////////
  // event valid
  ///////////////////////////////////

  async valid() {
    this.Form.nom_ven.Recno = 0;
    if (this.prop.Value == 0) return true;

    const ven_ven = this.prop.Value;
    const m = { ven_ven };

    const data = await this.Form.db.use("lla1_ven", m);
    if (data.length == 0) {
      this.prop.Valid = false;
      return false;
    }
    this.Form.nom_ven.Recno = data[0].recno;
    this.prop.Valid = true;
    return true;
  }
}
