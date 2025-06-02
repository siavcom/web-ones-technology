//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class : pw1_usr
// Description : Password
// Author : El Fer Blocks
// Creation : 2025-03-11
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

//import { COMPONENT } from "@/classes/Component";
export class pw1_usr extends COMPONENT {

   constructor() {
      super()

      this.prop.Caption = 'Password'
      this.prop.Type = 'Password'
      this.prop.Placeholder = 'password'

      this.prop.MaxLength = 128
      this.prop.Decimals = null
      this.prop.Capture = true
      this.prop.updateKey = false
      this.prop.ReadOnly = true
      this.prop.ErrorMessage = 'Password inválido'
      this.inputStyle.width = "124px";
      this.style.width = "300px";
   }

   override async when() {
      this.Form.bt_changePassword.prop.Visible = false

      return true
   }
   override async valid() {
      if (this.prop.Value.trim() == '') {
         this.prop.Valid = false
         return false

      }
      return true
   }


}