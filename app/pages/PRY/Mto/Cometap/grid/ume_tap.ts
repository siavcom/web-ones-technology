//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : COLUMN
// Class : ume_tap
// Description : Unidad de medicion
// Author : El Fer Blocks
// Creation : 2024-02-12
// Update Date  : 4/Mar/2024
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COLUMN } from '@/classes/Column'

export class ume_tap extends COLUMN {

  constructor() {
    super()

    // const nom_ind=renglon[i]['nom_ind']

    this.prop.ColumnTextLabel = 'Se mide en' // Column Header
    this.prop.Type = 'text'
    this.prop.BaseClass = 'comboBox'
    this.prop.ControlSource = 'vi_cap_cometap.ume_tap'
    this.prop.RowSource = [
      [
        "Unidades",
        "Segundos",
        "Minutos",
        "Horas",
        "Dias",
        "Semanas",
        "Meses",
      ],
      ["U", "S", "M", "H", "D", "W", "O"],
    ];

    this.prop.RowSourceType = 5;
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.prop.Capture = true;
    this.prop.updateKey = false;

    this.prop.ColumnWidths = "84px,13px";
    this.inputStyle.width = "84px";
    this.style.width = "104px";

  }

}
