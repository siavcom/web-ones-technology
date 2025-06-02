//////////////////////////////////////////////
// Clase : Optin de un OptionGroup
// Author : Fernando Cuadras Angulo
// Creacion : Mayo/2025
// Ult.Mod  : Junio/2023
/////////////////////////////////////////////
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { COMPONENT } from "@/classes/Component";

export class option extends COMPONENT {

  // textLabel = "";
  constructor(OptionNumber: number) {
    super();
    this.prop.Type = "checkBox";
    this.prop.OptionNumber = OptionNumber; // Posicion dentro del optionGroup
    this.prop.Value = 0

  }

  override async init() {
    this.Parent.options[this.prop.OptionNumber] = this
  }


  /*
    override async interactiveChange() {
      if (this.prop.Value == 1 && this.Parent.prop.OptionNumber != this.prop.OptionNumber)
        this.Parent.prop.Value = this.prop.OptionNumber
      return true
    }
  */
  override async click() {
    if (this.prop.Value == 1 && this.Parent.prop.Value != this.prop.OptionNumber)
      this.Parent.prop.Value = this.prop.OptionNumber

    const Name = this.prop.Name + 'Click'
    const opcion = this.Parent[Name]

    if (opcion)
      await opcion(this)
  }
}
