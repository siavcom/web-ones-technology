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

import { container } from '@/classes/Container'
import { query } from './query'
import { table } from './table/table'
import { bt_edit } from './bt_edit'
import { bt_add } from './bt_add'
import { bt_delete } from './bt_delete'


export class queryGen extends container {

  ////////////////////////////////////
  // component imported
  ////////////////////////////////////

  //public query = new query()
 // public table = new table()
  public bt_edit = new bt_edit()
 // public bt_add = new bt_add()
 // public bt_delete = new bt_delete()
 

  constructor() {
    super()

  }

}
