//////////////////////////////////////////////
// Clase : Optin de un OptionGroup
// Author : Fernando Cuadras Angulo
// Creacion : Mayo/2025
// Ult.Mod  : Junio/2023
/////////////////////////////////////////////
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { COMPONENT } from "@/classes/Component";
import { option } from './Option'

export class optionGroup extends COMPONENT {

  options: [] = []
  constructor() {
    super();
    this.prop.Type = "number";
    this.style.alignContent = "flex-start" //"flex-end",
    this.inputStyle.visibility = 'collapse';
    this.style.borderRadius = '1.5%'
    this.style.padding = '3%'
    this.style.width = 'min-content'
    this.style.border = '1px solid black';
    this.style.padding = '.1px';
    this.style.borderRadius = '3px';
    this.prop.Value = 1
  }

  addOption() {

    for (let index = 3; index <= this.prop.BottonCount; index++) {
      const element = 'Option' + index.toString()
      this[element] = new option()
      //this.prop.optionNumber.push(new option())
      this[element].prop.OptionNumber = index
      if (index == 1) {
        this[element].prop.Value = this.prop.Value
      }
    }
  }

  override async onChangeValue() {
    console.log('onChangeValue', this.prop.Value, this.options)
    for (let i = 1; i < this.options.length; i++) {   // apaga los demas checkbox
      const item = this.options[i]

      if (item.prop.OptionNumber == this.prop.Value) {

        if (item.prop.Value = 0) {
          item.prop.Value = 1

        }
      }
      else
        if (item.prop.Value == 1)
          item.prop.Value = 0;  // marca el seleccionado     
    }

    return;
  }

  public override async afterMounted() {


    for (let i = 1; i < this.options.length; i++) {   // apaga los demas checkbox
      const item = this.options[i]

      if (item.prop.OptionNumber == this.prop.Value) {
        if (item.prop.Value == 0) {
          item.prop.Value = 1
        }
      }
      else
        if (item.prop.Value == 1)
          item.prop.Value = 0;  // marca el seleccionado     
    }
  }

}