//////////////////////////////////////////////
// BaseClass : component
// Class : des_dat
// Description : desde que insumo
// Author : El Fer Blocks
// Creation : 2023-10-11
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { BROWSE } from "@/classes/Browse"
export class browse extends BROWSE {
  constructor() {
    super();
    this.prop.oneClick = true
  }


  async close() {
    this.prop.Visible = false


    if (this.Parent.bt_close) this.Parent.bt_close.click()
  }


}
