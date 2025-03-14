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

      this.prop.textLabel = 'login'
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
      this.prop.ErrorMessage = 'Longitud inválida';
   }

   override async valid() {
      if (this.prop.Value.length == 0) {
         return false
      }

      const pos = this.prop.Value.indexOf('@');
      if (pos > 0)
         this.prop.Value = this.prop.Value.slice(0, pos);

      this.prop.Value = this.prop.Value.toLowerCase().trim() + '@' + this.Form.publicVar.dbname;
      if (this.prop.Value.length > 64) {
         return false
      }

      //  console.log('------- log_usr valid----------', this.prop.Value, this.prop.Name);
      return await super.valid();

   }

}
