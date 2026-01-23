//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// @baseClass  : component
// @class : per_pry
// Description : Periodicidad
// @author: El Fer Blocks
// Creation : 2023-07-20
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COLUMN } from '@/classes/Column'


export class per_pry extends COLUMN {
  constructor() {
    super();
    this.prop.ColumnTextLabel = "Periodo";
    this.prop.BaseClass = "comboBox";
    this.prop.ControlSource = "vi_cap_agenda.per_pry";
    this.prop.RowSourceType = 5; //1-Value, 2-Alias,3-sql 5-Array
    this.prop.RowSource = [
      ["Unico", "Mes", "Semestre", "Año", "Semana"],
      ["U", "M", "S", "A", "W"],
    ];
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.prop.ColumnWidths = "75%,25%";
    this.prop.Capture = false;
    this.prop.updateKey = false;
    this.prop.Disabled = true
    this.inputStyle.width = "64px";
    this.style.width = "64px";
  }
}
