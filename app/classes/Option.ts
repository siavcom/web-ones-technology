//////////////////////////////////////////////
// Clase : Optin de un OptionGroup
// @author: Fernando Cuadras Angulo
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
    this.inputStyle.color = 'black';
    this.inputStyle.textAlign = 'center';
    this.inputStyle.appearance = 'none';

    if (OptionNumber == 1)
      this.prop.Value = 1
    else
      this.prop.Value = 0
  }

  override init = async () => {
    // asigna el componente al optionGroup con su numero de opcion
    this.Parent.options[this.prop.OptionNumber] = this

    // actualioza el valor del optionGroup Padre en caso que este sea el seleccionado
    if (this.prop.Value == 1)
      this.prop.ReadOnly = true

    if (this.prop.Value == 1 && this.Parent.prop.Value != this.prop.OptionNumber)
      this.Parent.prop.Value = this.prop.OptionNumber
  }

  ///////////////////////////////////////////
  // Evento : click
  ///////////////////////////////////////////

  override async click() { // Pone en el valor del padre el numero de opcion seleccionado

    if (this.prop.Value == 1 && this.Parent.prop.Value != this.prop.OptionNumber)
      this.Parent.prop.Value = this.prop.OptionNumber

    this.prop.ReadOnly = true
    const thisForm = this.Parent

    for (let i = 1; i < thisForm.options.length; i++) {   // apaga los demas checkbox
      const item = thisForm.options[i]
      if (item.prop.OptionNumber != this.prop.OptionNumber) {
        item.prop.Value = 0;  // marca el seleccionado     
        item.prop.ReadOnly = false
        //      item.inputStyle.background = 'radial-gradient(circle at center, #f2f2f2 50%, transparent 50%)';
      }
    }

  }

}
