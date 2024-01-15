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
    this.prop.textLabel = "Desde la fecha";
    this.prop.Type = "datetime";
    this.prop.Value = "2020-01-01T00:00";
  }
  async valid() {
    this.Form.has_fec.prop.Min = this.prop.Value;
  }
}
