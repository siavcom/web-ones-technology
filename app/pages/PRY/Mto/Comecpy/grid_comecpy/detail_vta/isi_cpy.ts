//////////////////////////////////////////////
// Clase : isi_cpy
// Descripcion : Insumo en ERP Siavcom
// Author : Fernando Cuadras Angulo
// Creacion : 26/Abril/2024
// Ult.Mod  :
/////////////////////////////////////////////

///////////////////////////////////////

import { COMPONENT } from "@/classes/Component";

export class isi_cpy extends COMPONENT {
  constructor() {
    super();
    this.prop.BaseClass = 'comboBox'
    this.prop.Caption = "Insumo ";

    this.prop.ControlSource = 'vi_cap_comecpy.isi_cpy'
    this.prop.ToolTipText = " S=Siavcom ,N=Nuevi Insumo, E=Lista externo de precios (cotizador)"
    this.prop.RowSourceType = 5; //1-Value, 2-Alias,3-sql 5-Array
    this.prop.RowSource = [
      [
        "del Siavcom",
        "Nuevo",
        "Lista externa de precios"
      ],
      ["S", "N", "E"],
    ];
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.prop.ColumnWidths = "128px,32px";
    this.style.width = "224px"
    this.inputStyle.width = "176px"


    //this.prop.TabIndex = 102;
    this.prop.Disabled = true    // No muestra general
  }


  async interactiveChange() {
    this.Form.grid_comecpy.isi_cpy.prop.Value = this.prop.Value
    return await this.Form.grid_comecpy.isi_cpy.interactiveChange()
  }
}
