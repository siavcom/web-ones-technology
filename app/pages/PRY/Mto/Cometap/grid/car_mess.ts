//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : COLUMN
// Class : carr_mess
// Description : Carrier del mensaje  
// Author : El Fer Blocks
// Creation : 2024-01-27
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COLUMN } from "@/classes/Column";

export class carr_mess extends COLUMN {
  constructor() {
    super();

    this.prop.ColumnTextLabel = "Mensaje al vendedor";

    this.prop.BaseClass = "comboBox";
    this.prop.ControlSource = "vi_cap_cometap.car_mess";

    this.prop.RowSource = [
      ["No enviar", "WhatsApp", "WhatsApp+Mail", "WhatsApp+MSN", "WhatsApp+Mail+MSN",
        "Mail", "Mail+MSN",
        "MSN"],
      [0, 1, 3, 5, 7,
        2, 6,
        4]
    ];
    this.prop.RowSourceType = 5; //1-Value, 2-Alias, 5-Array
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.prop.ColumnWidths = "150px,0px";

    this.prop.Capture = true;
    this.prop.updateKey = false;
    this.style.width = "128px";
    // this.style.zIndex = 1;
  }
  override async valid(): Promise<any> {
    console.log("Validando carr_mess", this.prop.Value);

    return true
  }


}
