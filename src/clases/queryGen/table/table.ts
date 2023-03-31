//////////////////////////////////////////////
// BaseClass : Grid
// Class : table
// Description : Equipo
// Author : El Fer Blocks
// Creation : 2023-03-13
// Update Date  : 13/Mrzo/2023
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import {GRID} from  '@/classes/Grid'

////////////////////////////////
// Columns 
////////////////////////////////
import {ren_que} from './ren_que'
import {pai_que} from './pai_que'
import {cam_que} from './cam_que'

import {con_que} from './con_que'
import {val_que} from './val_que'
import {pad_que} from './pad_que'
import {uni_que} from './uni_que'


export class table extends GRID {
  public ren_que = new ren_que()
  public pai_que = new pai_que()
  public cam_que = new cam_que()
  public con_que = new con_que()
  public val_que = new val_que()
  public pad_que = new pad_que()
  public uni_que = new uni_que()

  constructor() {
    super()
    this.prop.Name = 'table'
    this.prop.Value = "";
    this.prop.Capture = false;
    this.prop.Valid = false;
    this.prop.BaseClass = 'Grid'
    this.prop.Position = 'main'
    this.prop.RecordSource=''
    this.style.fontSize = '16px'
    this.style.color = 'green'
    this.style.backgroundColor = 'white'

    this.prop.Capture = true
    //this.prop.updateKey=true


    // this.RecordSource="" oJo

    ///////////////////////// 
    // Props 
    /////////////////////////

    // this.prop.Valid=true
    // this.prop.Capture=false
    // this.prop.ControlSource=""
    // this.prop.Status= "I" // I)nitial, P)rocess , A)ctive

    // this.prop.textLabel=""
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
    // this.prop.Currency= 'MXN' //USD,EUR,MXN
    // this.prop.CurrencyDisplay = 'code' //to use the ISO currency code.
    // this.prop.Decimals = 2

    //// ComboBox ////
    // this.prop.RowSourceType=0 //1-Value, 2-Alias, 5-Array
    // this.prop.prop.RowSource = [] //[["Apple", "Banana"], ["A", "B"]]        // this.prop.ColumnCount= 1
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
    // this.style.zIndex= 100  // profundidad
    // this.style.alignContent= "center"
    // this.style.textAlign= "left"
    // this.style.wordWrap= "break-word"
    // this.style.cols = "60"


  }
}
