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
import { COMPONENT } from '@/classes/Component'

import { displayPdf } from './displayPdf'
import { bt_excel } from './bt_excel'
import { bt_close } from './bt_close'
import { bt_json } from './bt_json'
import { BROWSE } from "@/classes/Browse"
//import { browseResult } from './browseResult'

export class report extends COMPONENT {

  ////////////////////////////////////
  // component imported
  ////////////////////////////////////
  //public mensaje=new mensaje()

  public displayPdf = new displayPdf()
  public browse = new BROWSE()
  public bt_close = new bt_close()
  public bt_excel = new bt_excel()
  public bt_json = new bt_json()


  // eventos = [] // eventos a ejecutar en el stack
  // estatus = []  // estatus de los componentes hijos


  constructor() {
    super()
    this.prop.Disabled = true
    this.prop.Visible = false
    this.prop.BaseClass = 'details'
    this.prop.textLabel = 'Reporte'

    this.style.width = '100%'
    this.style.height = 'auto' //'1100px'

    this.style.display = 'block'


  }


}
