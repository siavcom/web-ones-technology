//////////////////////////////////////////////
// BaseClass : component
// Class : reportFields
// Description : Muestra los campos del reporte por pantalla
// Author : El Fer Blocks
// Creation : 2023-10-16
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

//import { CONTAINER } from '@/classes/Container'
import { COMPONENT } from '@/classes/Component'
import { Grid} from './fields/grid'


export class reportFields extends COMPONENT {

  ////////////////////////////////////
  // component imported
  ////////////////////////////////////
  //public mensaje=new mensaje()
  public Grid = new Grid()
 
  eventos = [] // eventos a ejecutar en el stack
  estatus = []  // estatus de los componentes hijos
     
  constructor() {
    super()
    this.prop.Visible=true
    this.prop.Disabled=false
    this.prop.BaseClass='container'
    this.prop.textLabel='Campos del reporte por pantalla'
    this.style.display='block'
    this.prop.TabIndex=14
    this.prop.Visible=false
     }
 

}

