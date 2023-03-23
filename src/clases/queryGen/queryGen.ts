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

//import { CONTAINER } from '@/classes/Container'
import { COMPONENT } from '@/classes/Component'
import {num_con} from './num_con'
import { query } from './query'
import { table } from './table/table'
import { bt_edit } from './bt_edit'
import { bt_add } from './bt_add'
import { bt_delete } from './bt_delete'


export class queryGen extends COMPONENT {

  ////////////////////////////////////
  // component imported
  ////////////////////////////////////
  public query = new query()
  public num_con= new num_con()
  public table = new table()
  public bt_edit = new bt_edit()
  public bt_add = new bt_add()
  public bt_delete = new bt_delete()
 
  eventos = [] // eventos a ejecutar en el stack
  estatus = []  // estatus de los componentes hijos


  constructor() {
    super()

    this.prop.Visible=true
    this.prop.BaseClass='container'
    this.prop.textLabel='Query Generator'
    //this.style.maxWidth='400px'
    this.style.display='block'

  }

}
