//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class : log_usr
// Description : login
// Author : El Fer Blocks
// Creation : 2025-03-11
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { CAPTURECOMPONENT } from "@/classes/CaptureComponent";

export class log_usr extends CAPTURECOMPONENT {

   constructor() {
      super()

      this.prop.Caption = 'login'
      this.prop.Type = 'text'
      this.prop.BaseClass = 'editText'
      // this.prop.ControlSource = 'vi_cap_db_users.log_usr'
      this.prop.Placeholder = 'login'
      this.prop.ToolTipText = 'login'
      this.prop.MaxLength = 62
      this.prop.Capture = true
      this.prop.updateKey = true
      this.prop.ReadOnly = true
      this.inputStyle.width = "192px";
      this.prop.ErrorMessage = 'Usuario inválido';
   }

   override async when() {

      //    console.log('1) log_usr when Public', Public.value.Company)
      //      Public.value.Company = Public.value.Company + ' Company'

      this.Form.bt_newSesion.prop.Visible = false
      this.Form.bt_changePassword.prop.Visible = false
      this.Form.bt_delete.prop.Visible = false

      return true

   }
   override async valid() {

      if (this.prop.Value.length == 0) {
         return false
      }

      const pos = this.prop.Value.indexOf('@');
      if (pos > 0)
         this.prop.Value = this.prop.Value.slice(0, pos);

      this.prop.Value = this.prop.Value.toLowerCase().trim() + '@' + this.Form.mPublic.dbname;
      if (this.prop.Value.length > 64) {
         return false
      }

      return await super.valid();

   }

}
