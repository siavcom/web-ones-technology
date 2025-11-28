//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class : mai_usr
// Description : Mail
// Author : El Fer Blocks
// Creation : 2025-03-11
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { CAPTURECOMPONENT } from "@/classes/CaptureComponent";
export class mai_usr extends CAPTURECOMPONENT {

   constructor() {
      super()

      this.prop.Caption = 'Mail'
      this.prop.Type = 'text'
      this.prop.BaseClass = 'editText'
      this.prop.ControlSource = 'vi_cap_db_users.mai_usr'
      this.prop.Placeholder = 'Mail'
      this.prop.ToolTipText = 'Mail'
      this.prop.MaxLength = 128

      this.prop.Capture = true
      this.prop.updateKey = false
      this.prop.ReadOnly = true

   }

   ////////////////////////////////// 
   // event when 
   ///////////////////////////////////

   override async when() {
      await super.when()
      /////////// put your code here ///////////// 
      return true
   }

   ////////////////////////////////// 
   // event valid 
   ///////////////////////////////////

   override async valid() {
      console.log('mai_usr valid')
      this.prop.Valid = super.valid()
      /////////// put your code here ///////////// 
      return this.prop.Valid
   }

   ////////////////////////////////// 
   // event click 
   ///////////////////////////////////
   /*
override async click() {

   }
   */

   //////////////////////////
   // KeyPress
   // Descripcion: Cada tecla que se presiona en el input
   //////////////////////////
   /*
   override async keyPress() {
  
    }
   */

   //////////////////////////
   // onChangeValue
   // Descripcion: Cada ves que cambia el valor del componente
   //////////////////////////
   /*
   override async onChangeValue() {
 
    }
   */

}
