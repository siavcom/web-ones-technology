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
    if (OptionNumber == 1)
      this.prop.Value = 1
    else
      this.prop.Value = 0


    console.log('constructor OptionGroup option=', this.prop.OptionNumber, this.prop.Value)
  }

  override init() {
    this.Parent.options[this.prop.OptionNumber] = this

  }

  override async interactiveChange() {
    if (this.prop.Value == 1 && this.Parent.prop.OptionNumber != this.prop.OptionNumber)
      this.Parent.prop.Value = this.prop.OptionNumber
    return true
  }
}
