//////////////////////////////////////////////
// BaseClass : component
// Class : report
// Description : Muestra el resultado
// Author : El Fer Blocks
// Creation : 2023-05-25
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

//import { DETAILS } from '@/classes/Details'
import { CONTAINER } from '@/classes/Container'

import { displayPdf } from './displayPdf'

import { bt_close } from './bt_close'
//import { browseResult } from './browseResult'

export class report extends CONTAINER {

  ////////////////////////////////////
  // component imported
  ////////////////////////////////////
  //public mensaje=new mensaje()

  public displayPdf = new displayPdf()
  public bt_close = new bt_close()

  constructor() {
    super()
    this.prop.Disabled = true
    this.prop.Visible = false
    this.prop.BaseClass = 'container' //'details'
    this.prop.Caption = 'PDF'

    this.style.width = '100%'
    this.style.maxWidth = '1200px'

    this.style.height = 'auto'

    this.style.display = 'block'

    this.displayPdf.Position = [0, 0]
    this.bt_close.Position = [1, 0]

  }


}
