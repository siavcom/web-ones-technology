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
    //  this.prop.Value = 0
    // this.inputStyle.color = 'black';
    // this.inputStyle.textAlign = 'center';
    // this.inputStyle.appearance = 'none';
    this.prop.ReadOnly = false
    this.prop.Disabled = false
    if (OptionNumber == 1)
      this.prop.Value = 1
    else
      this.prop.Value = 0
  }

  override init = async () => {
    // asigna el componente al optionGroup con su numero de opcion
    this.Parent.options[this.prop.OptionNumber] = this

    // actualioza el valor del optionGroup Padre en caso que este sea el seleccionado
    // if (this.prop.Value == 1)
    //   this.prop.ReadOnly = true

    if (this.prop.Value == 1 && this.Parent.prop.Value != this.prop.OptionNumber)
      this.Parent.prop.Value = this.prop.OptionNumber
  }

  ///////////////////////////////////////////
  // Evento : click
  ///////////////////////////////////////////

  override async click() { // Pone en el valor del padre el numero de opcion seleccionado
    this.prop.Value = 1;  // marca el seleccionado     
    this.prop.ReadOnly = true
    console.log("option Raul:", this.prop.Value)
  }

}
