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

export class cer_cer extends CAPTURECOMPONENT {
  captionBackup: string = '';

  constructor() {
    super();
    this.prop.Caption = "Certificado";
    this.prop.BaseClass = "comboBox";
    this.prop.ToolTipText = "Número de certificado";
    this.prop.Placeholder = "Número de certificado";

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
    this.captionBackup = this.prop.Caption;
    await SQLExec("select num_cer,cer_cer from vi_cap_comecer union select 'CERTIFICADO NUEVO','XXXXXXXXX' ", 'comecer')
    // console.log('cer_cer=', await localSql('select num_cer ,cer_cer from comecer order by num_cer '))
    // this.prop.RowSource = 'select num_cer,cer_cer from comecer order by num_cer'
    //const data = await localSql('select num_cer,cer_cer from comecer order by num_cer limit 1')

    this.prop.RowSourceType = 2;
    //    this.prop.Value = data[0].cer_cer
    this.prop.ReadOnly = false;
  }

  override async when(num_cer?: boolean) {
    /*
        if (!num_cer) {
          this.prop.BaseClass = "comboBox";
          this.prop.ControlSource = "vi_cap_comecer.cer_cer";
        }
    */
    this.Parent.con_pwd.prop.ReadOnly = true
    this.Parent.pwd_cer.prop.ReadOnly = true
    this.Parent.key_cer.prop.Visible = false
    this.Parent.pem_cer.prop.Visible = false

    this.Parent.con_pwd.prop.Value = ''
    this.Parent.pwd_cer.prop.Value = ''
    this.Parent.key_cer.prop.Value = ''
    this.Parent.pem_cer.prop.Value = ''

    this.prop.RowSourceType = 0
    if (this.prop.BaseClass === "editText") {
      return true
    }
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

    if (this.Recno > 100) {
      return true
    }

    //if (this.Recno < 100 && cer_cer || this.prop.Value != 'XXXXXXXXX') {
    if (this.prop.Value.trim() == '') {
      this.prop.BaseClass = "comboBox";
      this.when()
      this.prop.Focus = true
      return true
    }

    if (this.prop.Value != 'XXXXXXXXX') {
      if (this.prop.BaseClass == "editText") {
        const data = await $fetch('/api/SiavcomServer',
          {
            method: 'post',    // Se necesita para que haga la llamada y retorne los datos
            body: {
              call: 'enc_pal',
              params: { pal_enc: this.prop.Value }
            },

          })

        console.log('der_cer data=', data)
        if (data && data.length > 0) {
          await SQLExec(`select num_cer,cer_cer from vi_cap_comecer union select '${this.prop.Value}','${data}' `, 'comecer')
          this.prop.BaseClass = "comboBox";
          this.prop.RowSourceType = 2;
          this.prop.Value = data;
        }

      }

      // if (cer_cer)
      //   this.prop.Value = cer_cer
      //await updateCampo(cer_cer, "vi_cap_comecer.cer_cer", this.Recno)

      const Valid = await super.valid()

      if (Valid == true) {

        const m = await currentValue('key_pri', 'vi_cap_comecer')
        if (m.key_pri == 0) {

          nextTick(() => {
            this.Form.fve_cer.prop.ReadOnly = false
            this.Form.fve_cer.prop.Focus = true
            this.Form.con_pwd.prop.ReadOnly = false
            this.Form.pwd_cer.prop.ReadOnly = false
            this.Form.pwd_cer.prop.Valid = false

          })
        }
      }
      return Valid

    }
    //this.prop.Visible = false
    this.prop.RowSourceType = 0;
    this.prop.BaseClass = "editText";
    this.prop.Value = ''
    //this.Parent.con_pwd.prop.ReadOnly = false
    //this.Parent.pwd_cer.prop.ReadOnly = false
    nextTick(() => {
      this.prop.Focus = true
    })
    //this.Parent.num_cer.prop.Value = ''
    // this.Parent.num_cer.prop.Visible = true
    // this.Parent.num_cer.prop.Focus = true

    return true
  }

}