//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class : pa2_usr
// Description : Password
// Author : El Fer Blocks
// Creation : 2025-03-11
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

export class pw2_usr extends COMPONENT {

   constructor() {
      super()

      this.prop.textLabel = 'Confirmación Password'
      this.prop.Type = 'password'

      this.prop.Placeholder = 'Confirm password'

      this.prop.MaxLength = 128

      this.prop.Capture = true
      this.prop.updateKey = false
      this.prop.ReadOnly = true
      this.prop.ErrorMessage = 'Los password no coinciden'
      this.inputStyle.width = "124px";
      this.style.width = "300px";
   }


   override async when() {
      return await this.Form.pw1_usr.valid()

   }

   override async valid() {
      if (this.prop.Value.trim() == '') {
         return true
      }
      if (this.prop.Value.trim() != this.Form.pw1_usr.prop.Value.trim()) {
         this.prop.Valid = false
         return
      }
      this.Form.bt_changePassword.prop.Visible = true
      return true
   }
}
