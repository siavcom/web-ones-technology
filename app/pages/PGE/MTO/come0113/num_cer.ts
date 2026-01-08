﻿//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// BaseClass : editText
// Class : num_cer
// Description : Componente num_cer
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 20/11/25
// Update Date  :
/////////////////////////////////////////////
// import {editText} from "@/classes/editText";


export class num_cer extends COMPONENT {
  constructor() {
    super();

    // this.prop.ControlSource = "vi_cap_comecer.num_cer";
    // this.style.height = "13px";
    this.prop.Caption = "Certificado";
    this.style.fontSize = "17px";
    this.style.fontWeight = "bold";
    this.prop.ToolTipText = "Número de certificado";
    this.prop.ErrorMessage = "Certificado inválido";
    this.prop.Value = '                    '
    this.prop.Visible = false
    this.inputStyle.width = '254px'
    this.inputStyle.textTransform = "lowercase";
  }

  override async valid() {
    if (this.prop.Key == 27 || this.prop.Value == 'XXXXXXXXX') {
      this.Parent.cer_cer.prop.Visible = true
      this.prop.Visible = false
      this.Parent.prop.Focus = true
      return true
    }
    // debugger
    const param = { pal_enc: this.prop.Value.toUpperCase() }
    const data = await $fetch('/api/SiavcomServer',
      {
        method: 'post',    // Se necesita para que haga la llamada y retorne los datos
        body: {
          call: 'enc_pal',
          params: param
        },
      }
    )

    if (data.length > 0) {
      this.Parent.cer_cer.prop.Value = data

      if (await this.Parent.cer_cer.valid(data)) {
        this.prop.Visible = false
        this.Parent.cer_cer.prop.BaseClass = "editText";
        this.Parent.cer_cer.prop.ControlSource = "";
        this.Parent.cer_cer.prop.Value = this.prop.Value
        this.Parent.cer_cer.prop.Visible = true
        this.Parent.fve_cer.prop.Focus = true
        return true
      }
      //    updateCampo(data, "vi_cap_comecer.cer_cer", this.Recno) 
    }
    return false
  }





  //metodo
}