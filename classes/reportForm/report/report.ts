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
import { bt_excel } from './bt_excel'
import { bt_close } from './bt_close'
import { bt_json } from './bt_json'
import { displayBrowse } from "./displayBrowse"
//import { browseResult } from './browseResult'

export class report extends CONTAINER {

  ////////////////////////////////////
  // component imported
  ////////////////////////////////////
  //public mensaje=new mensaje()

  public displayPdf = new displayPdf()
  public displayBrowse = new displayBrowse()

  public bt_excel = new bt_excel()
  public bt_json = new bt_json()
  public bt_close = new bt_close()


  // eventos = [] // eventos a ejecutar en el stack
  // estatus = []  // estatus de los componentes hijos


  constructor() {
    super()
    this.prop.Disabled = true
    this.prop.Visible = false
    this.prop.BaseClass = 'container' //'details'
    this.prop.textLabel = 'Reporte'

    this.style.width = '100%'
    this.style.maxWidth = '1200px'

    this.style.height = 'auto'

    this.style.display = 'block'


    this.displayPdf.Position = [0, 0]
    this.displayBrowse.Position = [0, 1]

    this.bt_close.Position = [1, 2]
    this.bt_excel.Position = [1, 0]
    this.bt_json.Position = [1, 1]

  }


}
