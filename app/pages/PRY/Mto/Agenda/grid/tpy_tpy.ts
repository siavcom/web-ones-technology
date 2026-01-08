//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : COLUMN
// Class : tpy_tpy
// Description : Tipo de proyecto
// Author : El Fer Blocks
// Creation : 2024-02-12
// Update Date  : 15/Feb/2024
/////////////////////////////////////////////

import { COLUMN } from '@/classes/Column'

export class tpy_tpy extends COLUMN {

  constructor() {
    super()
    this.prop.ColumnTextLabel = 'Proyecto' // Column Header
    this.prop.Type = 'text'
    this.prop.BaseClass = 'comboBox'
    this.prop.ControlSource = 'vi_cap_agenda.tpy_tpy'
    this.prop.RowSourceType = 4;
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.prop.updateKey = true;
    this.prop.Disabled = true

    this.inputStyle.fontSize = "17px";
    this.inputStyle.fontWeight = "bold";
    this.style.width = "200px";
    this.style.fontSize = "17px";
    this.style.fontWeight = "bold";
  }


}
