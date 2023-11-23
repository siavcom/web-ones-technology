//////////////////////////////////////////////
// BaseClass : component
// Class : Grid
// Description :Actividades de un proyecto
// Author : El Fer Blocks
// Creation : 2023-03-13
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

//import { CONTAINER } from '@/classes/Container'
import { COMPONENT } from '@/classes/Component'
import { Grid} from './grid/grid'

export class grid_tap extends COMPONENT {

  ////////////////////////////////////
  // component imported
  ////////////////////////////////////
/**
 * Description :Actividades de un proyecto
 *
 * @memberof manComepry/ThisForm
 */
public Grid = new Grid()
 
  constructor() {
    super()
    this.prop.Visible=true
    this.prop.Disabled=true
    this.prop.BaseClass='container'
    this.prop.textLabel='Actividades del proyecto'
    this.prop.Disabled=true
    this.prop.Visible=false
    this.style.display='block'
   
   }

}

