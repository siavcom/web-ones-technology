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

//import { CONTAINER } from '@/classes/Container'
import { COMPONENT } from '@/classes/Component'
import { browseResult } from './browseResult'
import {displayPdf} from './displayPdf'
import { bt_excel } from './bt_excel'
import { bt_close} from './bt_close'
import { bt_json} from './bt_json'

export class report extends COMPONENT {

  ////////////////////////////////////
  // component imported
  ////////////////////////////////////
  //public mensaje=new mensaje()
  
  public browseResult = new browseResult()
  public displayPdf = new displayPdf()
  public bt_close= new bt_close()
  public bt_excel = new bt_excel()
  public bt_json = new bt_json()
  
  
 
  eventos = [] // eventos a ejecutar en el stack
  estatus = []  // estatus de los componentes hijos
  
  
  constructor() {
    super()
    this.prop.Disabled=true
    this.prop.Visible=false
    this.prop.BaseClass='container'
    this.prop.textLabel='Reporte'
    this.style.width='1200px'

    this.style.display='block'
    
     }
}
