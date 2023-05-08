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
//import { mensaje } from './mensaje'
import {nco_que} from './nco_que'
import {activa}  from './activa'
import { query } from './query'
import { table } from './table/table'
import { bt_edit } from './bt_edit'
import { bt_add } from './bt_add'
import { bt_delete } from './bt_delete'

export class queryGen extends COMPONENT {

  ////////////////////////////////////
  // component imported
  ////////////////////////////////////
  //public mensaje=new mensaje()
  public activa= new activa()
  public nco_que= new nco_que()
  public query = new query()
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
    this.query.prop.Visible=false
    this.prop.appendRow=true
    this.prop.deleteRow=true
    this.prop.usu_que=''
     }
}
