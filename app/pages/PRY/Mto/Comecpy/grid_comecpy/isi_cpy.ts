//////////////////////////////////////////////
// Clase : isi_cpy
// Descripcion : Insumo en ERP Siavcom
// @author: Fernando Cuadras Angulo
// Creacion : 26/Abril/2024
// Ult.Mod  :
// Nota : es del grid Principal
/////////////////////////////////////////////

///////////////////////////////////////

import { COLUMN } from "@/classes/Column";

export class isi_cpy extends COLUMN {
  //  constructor(parent: Record<string, never>) {
  constructor() {
    super();
    this.prop.BaseClass = 'comboBox'
    this.prop.ColumnTextLabel = "Insumo ";
    this.prop.ControlSource = 'vi_cap_comecpy.isi_cpy'
    this.prop.ToolTipText = " S=Siavcom ,N=Nuevo Insumo, E=Lista externo de precios (cotizador)"
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
    this.style.width = "128px"
  }
  override async interactiveChange() {

    if (this.prop.Value != 'S') {
      this.Parent.cla_isu.prop.Value = ''
      this.Parent.cla_isu.prop.Valid = true
    }
    // Asigna valor en Ventas y compras
    if (this.Parent.detail_vta.modal_vta.isi_cpy.prop.Value != this.prop.Value)
      this.Parent.detail_vta.modal_vta.isi_cpy.prop.Value = this.prop.Value
    if (this.Parent.detail_com.modal_com.isi_cpy.prop.Value != this.prop.Value)
      this.Parent.detail_com.modal_com.isi_cpy.prop.Value = this.prop.Value


    if (this.Parent.detail_vta.modal_vta.cla_isu.prop.Value != this.Parent.cla_isu.prop.Value)
      this.Parent.detail_vta.modal_vta.cla_isu.prop.Value = this.Parent.cla_isu.prop.Value
    if (this.Parent.detail_com.modal_com.cla_isu.prop.Value != this.Parent.cla_isu.prop.Value)
      this.Parent.detail_com.modal_com.cla_isu.prop.Value = this.Parent.cla_isu.prop.Value

    return true

  }

}
