//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : COLUMN
// Class : equ_usu
// Description : equipo de trabajo
// Author : El Fer Blocks
// Creation : 2023-10-26
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { captureComponent } from "@/classes/captureComponent";

export class equ_equ extends captureComponent {
  constructor() {
    super();
    this.prop.Type = "text";
    this.prop.textLabel = "Equipo de trabajo";
    this.prop.BaseClass = "comboBox";
    this.prop.ControlSource = "vi_cap_comepry.equ_equ";
    this.prop.RowSourceType = 3;
    this.prop.RowSource =
      "select des_equ,equ_equ from vi_cap_db_equipo order by equ_equ";
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.style.zIndex = 3;
    this.prop.Capture = true;
    this.prop.updateKey = false;
    this.prop.componentStyle.width = "400px";
  }
}
