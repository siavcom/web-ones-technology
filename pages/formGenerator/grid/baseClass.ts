//////////////////////////////////////////////
// Clase : tip_dat
// Descripcion : Tipo de dato
// Author : Fernando Cuadras Angulo
// Creacion : Mayo/2022
// Ult.Mod  16/Junio/2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from "@/classes/Column";

export class baseClass extends COLUMN {
  //  constructor(parent: Record<string, never>) {
  constructor() {
    super();
    this.prop.Order = 2;
    this.textLabel = "Tipo Componente ";
    this.prop.BaseClass = "comboBox";
    this.prop.ToolTipText = "Tipo de componente de captura ";
    this.prop.Placeholder = "Tipo de componente de captura";
    this.prop.RowSource = [
      ["editBox", "ComboBox", "checkBox", "Label", "I"],
      ["E", "C", "B", "L", "I"],
    ]; // vi_cap_doc.tdo_tdo,des_tdo
    this.prop.ControlSource = "vi_cap_for.baseclass";
    this.prop.RowSourceType = 5; //1-Value, 2-Alias, 5-Array
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.prop.Value = "E";
    // this.style.zIndex = 2
    this.prop.ColumnWidths = "95%,0%";
    this.style.width = "100px"; /* width/height  - initial value: auto */
  }

  //////////////////////////////////
  // Evento When
  ///////////////////////////////////
  async when() {
    this.prop.ReadOnly = await !this.Parent.cam_dat.when();
    return !this.prop.ReadOnly;
    //   await super.when(row)
  }
}
