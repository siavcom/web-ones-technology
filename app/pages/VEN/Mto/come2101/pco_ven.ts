﻿//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// BaseClass : editText
// Class : pco_ven
// Description : Componente pco_ven
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 05/05/25
// Update Date  :
/////////////////////////////////////////////
// import {editText} from "@/classes/editText";

import { CAPTURECOMPONENT } from "@/classes/CaptureComponent";


export class pco_ven extends CAPTURECOMPONENT {

  constructor() {
    super();
    this.prop.Caption = '% de comisión'
    this.prop.Type = 'number';
    this.prop.ControlSource = "lla1_ven.pco_ven";
    this.prop.Capture = true
    this.prop.Decimals = 2
    this.inputStyle.width = "48px";
  }
  //metodo
}