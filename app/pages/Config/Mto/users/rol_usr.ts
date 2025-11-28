//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class : rol_usr
// Description : Data base user role
// Author : El Fer Blocks
// Creation : 2025-03-11
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { CAPTURECOMPONENT } from "@/classes/CaptureComponent";
export class rol_usr extends CAPTURECOMPONENT {

   constructor() {
      super()

      this.prop.Caption = 'Rol en la base de datos'
      this.prop.ControlSource = 'vi_cap_db_users.rol_usr'
      this.prop.MaxLength = 64
      this.prop.Capture = true
      this.prop.updateKey = false
      this.prop.ReadOnly = true
      this.prop.ErrorMessage = 'Rol inválido'
   }

   override async valid() {
      await super.valid()
      console.log('rol_usr res ')
      const res = await SQLExec(`SELECT DATABASE_PRINCIPAL_ID('${this.prop.Value}')  as role`)
      console.log('rol_usr res', res)
      if (res.length == 0 || res[0].role == null)
         return false


      return true
   } // valid 
}
