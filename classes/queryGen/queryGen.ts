//////////////////////////////////////////////
// BaseClass : component
// Class : queryGenerator
// Description : Genera un Query para SQL
// Author : El Fer Blocks
// Creation : 2023-03-13
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

//import { DETAILS } from '@/classes/Details'
import { COMPONENT } from '@/classes/Component'
//import { mensaje } from './mensaje'
import { nco_que } from './nco_que'
import { activa } from './activa'
import { query } from './query'
import { Grid } from './table/grid'
import { bt_edit } from './bt_edit'
import { bt_add } from './bt_add'
import { bt_delete } from './bt_delete'

export class queryGen extends COMPONENT {

  ////////////////////////////////////
  // component imported
  ////////////////////////////////////
  //public mensaje=new mensaje()
  public activa = new activa()
  public nco_que = new nco_que()
  public query = new query()
  public Grid = new Grid()
  public bt_edit = new bt_edit()
  public bt_add = new bt_add()
  public bt_delete = new bt_delete()

  eventos = [] // eventos a ejecutar en el stack
  estatus = []  // estatus de los componentes hijos
  usu_que = 'ALL'   // usuario del query

  constructor() {
    super()
    this.prop.Visible = true
    this.prop.Disabled = true
    this.prop.BaseClass = 'details'
    this.prop.Caption = 'Condiciones generales'
    //this.style.maxWidth='400px'
    this.style.display = 'block'
    this.query.prop.Visible = false
    this.prop.appendRow = true
    this.prop.deleteRow = true
    this.prop.TabIndex = 14
    this.style.width = 'auto'

  }





}

