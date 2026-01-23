﻿//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// @baseClass  : editText
// @class : cer_cer
// Description : Componente cer_cer
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 20/11/25
// Update Date  :
/////////////////////////////////////////////
// import {editText} from "@/classes/editText";

import { CAPTURECOMPONENT } from "@/classes/CaptureComponent";

export class cer_cer extends CAPTURECOMPONENT {

  constructor() {
    super();
    this.prop.Caption = "Certificado";
    this.prop.BaseClass = "comboBox";

    this.prop.RowSourceType = 0;
    this.prop.RowSource = "comecer.num_cer,cer_cer";
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.prop.Capture = true;
    this.prop.updateKey = true;
    this.prop.ColumnWidths = "256px,0px";
    this.inputStyle.height = "17px";
    this.inputStyle.width = "256px";
    this.style.fontSize = "17px";
    this.style.fontWeight = "bold";
    this.style.width = 'auto'
    this.prop.ToolTipText = "Número de certificado";
    this.prop.ErrorMessage = "Certificado inválido";

    this.asignaRecno()

  }
  override async init() {
    await SQLExec("select num_cer,cer_cer from vi_cap_comecer union select 'CERTIFICADO NUEVO','XXXXXXXXX' ", 'comecer')
    // console.log('cer_cer=', await localSql('select num_cer ,cer_cer from comecer order by num_cer '))
    // this.prop.RowSource = 'select num_cer,cer_cer from comecer order by num_cer'
    //const data = await localSql('select num_cer,cer_cer from comecer order by num_cer limit 1')

    this.prop.RowSourceType = 2;
    //    this.prop.Value = data[0].cer_cer
    this.prop.ReadOnly = false;
  }

  override async when(num_cer?: boolean) {
    if (!num_cer) {
      this.prop.BaseClass = "comboBox";
      this.prop.ControlSource = "vi_cap_comecer.cer_cer";

    }
    this.prop.RowSourceType = 0
    super.when()
    await SQLExec("select num_cer,cer_cer from vi_cap_comecer union select 'CERTIFICADO NUEVO','XXXXXXXXX' ", 'comecer')
    // console.log('cer_cer=', await localSql('select num_cer ,cer_cer from comecer order by num_cer '))
    // this.prop.RowSource = 'select num_cer,cer_cer from comecer order by num_cer'
    //const data = await localSql('select num_cer,cer_cer from comecer order by num_cer limit 1')

    this.prop.RowSourceType = 2;
    //    this.prop.Value = data[0].cer_cer
    return true
  }

  override async valid(cer_cer?: string) {

    //  console.log('cer_cer=', this.prop.Value)

    if (cer_cer || this.prop.Value != 'XXXXXXXXX') {

      if (cer_cer)
        this.prop.Value = cer_cer
      await updateCampo(cer_cer, "vi_cap_comecer.cer_cer", this.Recno)
      return super.valid()
    }
    //  debugger
    if (this.prop.Value == 'XXXXXXXXX') {
      this.prop.Visible = false
      this.prop.RowSourceType = 0;

      this.Parent.num_cer.prop.Value = this.prop.Value
      this.Parent.num_cer.prop.Visible = true
      this.Parent.num_cer.prop.Focus = true
    }

    return true
  }


}