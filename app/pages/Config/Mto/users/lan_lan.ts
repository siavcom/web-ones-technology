//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class : lan_lan
// Description : Language
// Author : El Fer Blocks
// Creation : 2025-03-11
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { CAPTURECOMPONENT } from "@/classes/CaptureComponent";
export class lan_lan extends CAPTURECOMPONENT {

   constructor() {
      super()

      this.prop.Caption = 'Lenguaje'
      this.prop.Type = 'text'
      this.prop.BaseClass = 'editText'
      this.prop.ControlSource = 'vi_cap_db_users.lan_lan'
      this.prop.Placeholder = 'Language'
      this.prop.ToolTipText = 'Language'
      this.prop.MaxLength = 3
      this.prop.Min = "0"
      this.prop.Max = "2147483647"
      this.prop.Decimals = null
      this.prop.Capture = true
      this.prop.updateKey = false
      this.prop.ReadOnly = true


      // this.RecordSource="" oJo

      ///////////////////////// 
      // Props 
      /////////////////////////

      // this.prop.Valid=true
      // this.prop.Capture=false
      // this.prop.ControlSource=""
      // this.prop.Status= "I" // I)nitial, P)rocess , A)ctive

      // this.prop.Caption=""
      // this.prop.ToolTipText=""
      // this.prop.Value=""
      // this.prop.Placeholder=""
      // this.prop.Format=""
      // this.prop.InputMask=""
      // this.prop.ReadOnly=false
      // this.prop.Disabled=false
      // this.prop.Tag=""
      // this.prop.Key=0
      // this.prop.id=0
      // this.prop.ErrorMessage=""
      // this.prop.TabIndex=0
      // this.prop.BaseClass= "editText" //"comboBox","checkBox","label"
      // this.prop.Type: "text"  // "numeric","date","boolean"
      // this.prop.Visible=true
      // this.prop.Row=0
      // this.prop.Map=""
      // this.prop.Autofocus=false
      // this.prop.Position= 'main', // main, header , footer
      // this.prop.Image=""
      // this.prop.Focus=false
      // this.prop.First=false
      // this.prop.Last=false
      // this.prop.MaxLength=512

      //// Numeric data ////
      // this.prop.Step="1"
      // this.prop.Min="0"
      // this.prop.Max="999999999"
      // this.prop.Style= 'decimal' // decimal, currency,percent,unit
      // this.prop.Currency= '   ' //USD,EUR,MXN
      // this.prop.CurrencyDisplay = 'code' //to use the ISO currency code.
      // this.prop.Decimals = 2

      //// ComboBox ////
      // this.prop.RowSourceType=0 //1-Value, 2-Alias, 5-Array
      // this.prop.prop.RowSource = [] //[["Apple", "Banana"], ["A", "B"]]        // this.prop.MaxLength= 1
      // this.prop.BoundColumn= 2
      // this.prop.ColumnWidths= "50%,50%"


      //// Column grid ////
      // this.prop.Order = 2


      ///////////////////////// 
      // Style
      /////////////////////////
      //<<style>>

      // this.style.display="flex"

      // this.style.flexGrow="0"     /* do not grow   - initial value: 0 */
      // this.style.flexShrink="0"   /* do not shrink - initial value: 1 */
      // this.style.flexBasis= "auto" /* width/height  - initial value: auto */
      // this.style.flexWrap= "wrap"

      // this.style.background= "white"
      // this.style.color= "#b94295"
      // this.style.width= "auto"
      // this.style.maxWidth= "auto"
      // this.style.minWidth= "auto"
      // this.style.height= "auto"
      // this.style.fontSize= "13px" // automaticamente vue lo cambiara por font-size (para eso se utiliza la anotacion Camello)
      // this.style.fontFamily= "Arial"
      ////this.style.zIndex= 100  // profundidad
      // this.style.alignContent= "center"
      // this.style.textAlign= "left"
      // this.style.wordWrap= "break-word"
      // this.style.cols = "60"


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
