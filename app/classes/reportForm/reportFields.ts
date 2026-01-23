//////////////////////////////////////////////
// @baseClass  : component
// @class : reportFields
// Description : Muestra los campos del reporte por pantalla
// @author: El Fer Blocks
// Creation : 2023-10-16
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

//import { DETAILS } from '@/classes/Details'
import { COMPONENT } from '@/classes/Component'
import { con_report } from './con_report'

import { Grid } from './fields/grid'


export class reportFields extends COMPONENT {

  ////////////////////////////////////
  // component imported
  ////////////////////////////////////
  //public mensaje=new mensaje()


  public con_report = new con_report()
  public Grid = new Grid()

  eventos = [] // eventos a ejecutar en el stack
  estatus = []  // estatus de los componentes hijos

  constructor() {
    super()
    this.prop.Visible = true
    this.prop.Disabled = true
    this.prop.BaseClass = 'details'
    this.prop.Caption = 'Campos del reporte por pantalla'
    this.style.display = 'block'
    this.prop.TabIndex = 14
    this.prop.Visible = false
    this.style.width = 'auto'
  }


}

