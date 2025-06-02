//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class : dat_usr
// Description : Data
// Author : El Fer Blocks
// Creation : 2025-03-11
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { CAPTURECOMPONENT } from "@/classes/CaptureComponent";
export class dat_usr extends CAPTURECOMPONENT {

   constructor() {
      super()

      this.prop.Caption = 'Datos de usuario'
      this.prop.Type = 'json'
      this.prop.BaseClass = 'editText'
      this.prop.ControlSource = 'vi_cap_db_users.dat_usr'
      this.prop.ToolTipText = 'Datos generales'
      this.prop.Capture = true
      this.prop.updateKey = false
      this.prop.ReadOnly = true
      this.style.width = "60%"
   }
}
