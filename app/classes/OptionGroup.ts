//////////////////////////////////////////////
// Clase : Optin de un OptionGroup
// @author: Fernando Cuadras Angulo
// Creacion : Mayo/2025
// Ult.Mod  : Junio/2023
/////////////////////////////////////////////
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { COMPONENT } from "@/classes/Component";
import { option } from './Option'

export class OPTIONGROUP extends COMPONENT {

  options: [] = []
  constructor() {
    super();
    this.prop.Type = "number";
    this.style.display = "flex"
    this.style.alignItems = "flex-start" //"flex-end",
    this.style.padding = '.1px';

    //this.inputStyle.visibility = 'collapse';  provoca que no aparesca en ciertos casos
    //this.style.borderRadius = '1.5%'
    // this.style.padding = '3%'
    // this.style.width = 'max-content'

    this.inputStyle.boxShadow = 'none',
      //   this.style.borderRadius = '3px';
      this.prop.Value = 1
    this.containerStyle.display = 'flex'
    this.containerStyle.flexWrap = 'wrap'
    //this.style.border = '1px solid black';
    this.style.border = "none"
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

  public override async onChangeValue() {

    for (let i = 1; i < this.options.length; i++) {   // apaga los demas checkbox
      const item = this.options[i]
      item.prop.Value = 0;  // marca el seleccionado     
      item.prop.ReadOnly = false
    }
    console.log("optionGroup Raul:", this.prop.Value)
  }
}