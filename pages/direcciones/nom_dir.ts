//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class : nom_dir
// Description : NOMBRE
// Author : El Fer Blocks
// Creation : 2022-12-28
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from '@/classes/Component'

export class nom_dir extends COMPONENT {

    constructor() {
        super()
   
       // const nom_ind=renglon[i]['nom_ind']
         
        this.prop.textLabel = 'NOMBRE'
        this.prop.Type ='text'
        this.prop.BaseClass = 'editText'
        this.prop.ControlSource = 'lla1_dir.nom_dir'
        this.prop.Placeholder = ''
        this.prop.ToolTipText =''
        this.prop.MaxLength=64
        this.prop.Min="0"
        this.prop.Max="999"
        this.prop.Decimals=0
        this.prop.Capture=true
        this.prop.updateKey=false
        //this.prop.TabIndex= 3
        this.style.width='100px'        
        // this.RecordSource="" oJo

        ///////////////////////// 
        // Props 
        /////////////////////////

        // this.Valid=true
        // this.Capture=false
        // this.ControlSource=""
        // this.Status= "I" // I)nitial, P)rocess , A)ctive

        // this.textLabel=""
        // this.ToolTipText=""
        // this.Value=""
        // this.Placeholder=""
        // this.Format=""
        // this.InputMask=""
        // this.ReadOnly=false
        // this.Disabled=false
        // this.Tag=""
        // this.Key=0
        // this.id=0
        // this.ErrorMessage=""
        // this.TabIndex=0
        // this.BaseClass= "editText" //"comboBox","checkBox","label"
        // this.Type: "text"  // "numeric","date","boolean"
        // this.Visible=true
        // this.Row=0
        // this.Map=""
        // this.Autofocus=false
        // this.Position= 'main', // main, header , footer
        // this.Image=""
        // this.Focus=false
        // this.First=false
        // this.Last=false
        // this.MaxLength=512

        //// Numeric data ////
        // this.Step="1"
        // this.Min="0"
        // this.Max="999999999"
        // this.Style= 'decimal' // decimal, currency,percent,unit
        // this.Currency= 'MXN' //USD,EUR,MXN
        // this.CurrencyDisplay = 'code' //to use the ISO currency code.
        // this.Decimals = 2

        //// ComboBox ////
        // this.RowSourceType=0 //1-Value, 2-Alias, 5-Array
        // this.prop.RowSource = [] //[["Apple", "Banana"], ["A", "B"]]        // this.ColumnCount= 1
        // this.BoundColumn= 2
        // this.ColumnWidths= "50%,50%"


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
        // this.style.zIndex= 100  // profundidad
        // this.style.alignContent= "center"
        // this.style.textAlign= "left"
        // this.style.wordWrap= "break-word"
        // this.style.cols = "60"


    }

    ////////////////////////////////// 
    // event when 
    ///////////////////////////////////
    
  async when() {
      if (this.prop.updateKey){ // Si es llave de actualizacion
        await this.Form.refreshComponent(false)
        }

        return !this.prop.ReadOnly
        //   await super.when() no hace falta el super porque en focus.capture lo hace 
    }
    

    ////////////////////////////////// 
    // event valid 
    ///////////////////////////////////
    
    async valid() {
      if (this.prop.updateKey) {
        if (this.Form.db.View[this.Form.prop.RecordSource].recCount>0)
           this.Form.sw_ini=false
        if (this.prop.Value.trim().length==0){
            this.prop.ErrorMessage='No permite datos en blanco'
            this.prop.ShowError=true
            this.prop.Valid=false
            return false
          } 
        
        this.prop.Valid=true
        await this.Form.valid()
      }
      this.prop.Valid=true
      return true
    }

    ////////////////////////////////// 
    // event click 
    ///////////////////////////////////
    /*
    async click() {

    }
    */

  //////////////////////////
  // KeyPress
  // Descripcion: Cada tecla que se presiona en el input
  //////////////////////////
  /*
    public keyPress = async ($event) => {
    const key=super.keyPress($event)

   }
  */
}
