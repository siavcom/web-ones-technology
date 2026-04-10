﻿//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// @baseClass  : editText
// @class : num_cer
// Description : Componente num_cer
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 20/11/25
// Update Date  :
/////////////////////////////////////////////
// import {editText} from "@/classes/editText";

export class num_cer extends CAPTURECOMPONENT {
  constructor() {
    super();

    // this.prop.ControlSource = "vi_cap_comecer.num_cer";
    // this.style.height = "13px";
    this.prop.Caption = "Certificado";
    this.style.fontSize = "17px";
    this.style.fontWeight = "bold";
    this.prop.ToolTipText = "Número de certificado";
    this.prop.Placeholder = "Número de certificado";
    this.prop.ErrorMessage = "Certificado inválido";
    this.prop.Capture = true;
    this.prop.updateKey = true;

    this.prop.Visible = false
    this.inputStyle.width = '254px'
    this.inputStyle.textTransform = "lowercase";
  }

  override async valid() {

    if (this.prop.Value.trim() == '')
      return false

    await updateCampo(cer_cer, "vi_cap_comecer.cer_cer", this.Recno)
    return super.valid()

    //    updateCampo(data, "vi_cap_comecer.cer_cer", this.Recno) 
  }

  //metodo
}