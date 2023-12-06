//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : COLUMN
// Class : ema_tap
// Description : Equipo de trabajo que se mandara msm
// Author : El Fer Blocks
// Creation : 2023-10-26
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COLUMN } from "@/classes/Column";

export class ema_tap extends COLUMN {
  constructor() {
    super();
    this.textLabel = "Enviar mail";
    this.prop.BaseClass = "comboBox";
    this.prop.ControlSource = "vi_cap_cometap.ema_tap";

    this.prop.RowSourceType = 4;
    this.prop.RowSource =
      "select des_equ,equ_equ from Now.equipos order by des_equ";
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;

    this.prop.ColumnWidths = "200px,100px";
    this.style.width = "220px";
  }
}
