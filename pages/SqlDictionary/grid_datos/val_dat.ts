//////////////////////////////////////////////
// Clase : vue_dat
// Descripcion : Valor incial en typescript incertarse el registro nuevo en VUE
// Author : Fernando Cuadras Angulo
// Creacion : Mayo/2022
// Ult.Mod  02/Mayo /2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from "@/classes/Column";

export class val_dat extends COLUMN {
  //  constructor(parent: Record<string, never>) {
  constructor() {
    super();
    //       this.prop.Order = 3
    this.prop.ColumnTextLabel = "Valor VFP";
    this.prop.BaseClass = "editText";
    this.prop.ControlSource = "vi_cap_comedat.val_dat";
    this.prop.ToolTipText =
      "Valor incial en VPF al incertarse el registro nuevo";
    this.prop.Placeholder = "Valor inicial VFP";
    this.style.width = "100px"; /* width/height  - initial value: auto */
  }
  //////////////////////////////////
  // Evento When
  ///////////////////////////////////
  async when() {
    this.prop.Valid = true
    if (!this.prop.ReadOnly! && !await this.Parent.cam_dat.when()) {
      this.prop.ReadOnly = true
      this.prop.Valid = true
    }

    return !this.prop.ReadOnly
  }
}
