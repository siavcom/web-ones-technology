﻿//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// BaseClass : editText
// Class : ven_ven
// Description : Componente ven_ven
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 05/05/25
// Update Date  :
/////////////////////////////////////////////
// import {editText} from "@/classes/editText";

import { CAPTURECOMPONENT } from "@/classes/CaptureComponent";
import { help } from '@/classes/Siavcom/help/ven_ven/help'


export class ven_ven extends CAPTURECOMPONENT {
  public help = new help()

  constructor() {
    super();
    this.prop.Caption = "Vendedor";
    this.prop.Type = 'number'
    this.prop.ControlSource = "vi_cap_comeven.ven_ven";
    this.prop.ToolTipText = "Número de vendedor";
    this.prop.Value = 0
    this.prop.Min = "0"
    this.prop.Max = "99999"
    this.prop.Decimals = 0

    this.prop.updateKey = true
    this.prop.Help = true;
    this.inputStyle.width = "64px";
    this.prop.ErrorMessage = "Vendedor inválido";
    this.prop.First = true
    //    this.prop.Help = true;
  }

  override async valid() {
    if (this.prop.Value == 0) {

      return false

    }
    return super.valid()
  }


  //metodo
}