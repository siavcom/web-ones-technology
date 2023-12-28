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
    this.textLabel = "Valor VFP";
    this.prop.BaseClass = "editText";
    this.prop.ControlSource = "vi_cap_comedat.val_dat";
    this.prop.ToolTipText =
      "Valor incial en VPF al incertarse el registro nuevo en VUE";
    this.prop.Placeholder = "Valor inicial VFP";
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
