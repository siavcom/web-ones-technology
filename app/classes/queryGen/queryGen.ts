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
import { bt_view } from './bt_view'

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
  public bt_view = new bt_view()

  eventos = [] // eventos a ejecutar en el stack
  estatus = []  // estatus de los componentes hijos
  usu_que = 'ALL'   // usuario del query

  constructor() {
    super()
    this.prop.Visible = true
    this.prop.Disabled = true
    this.prop.BaseClass = 'details'
    this.prop.Caption = 'Generales'
    //this.style.maxWidth='400px'
    this.style.display = 'block'
    this.query.prop.Visible = false

    this.style.width = 'auto'

  }
  override async click(): Promise<void> {
    const name = this.prop.Name
    /*
    
        if (name != 'queryPri') {
          this.Parent.queryPri.prop.Disabled = false
          //this.Parent.queryPri.query.prop.Visible = false
        }
        if (name != 'queryUsu') {
          this.Parent.queryUsu.prop.Disabled = false
          //this.Parent.queryUsu.query.prop.Visible = false
        }
        if (name != 'queryGen') {
          this.Parent.queryGen.prop.Disabled = false
          //this.Parent.queryGen.query.prop.Visible = false
        }
    */
    console.log('Click ', name,)


    this.nco_que.interactiveChange()



  }

}

