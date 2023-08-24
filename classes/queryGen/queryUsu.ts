//////////////////////////////////////////////
// BaseClass : queryGen
// Class : queryPri
// Description : Genera un Query usuario
// Author : El Fer Blocks
// Creation : 2023-03-13
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { queryGen} from './queryGen'

export class queryUsu extends queryGen {

  constructor(){
   super()
   this.usu_que = ''
   this.prop.Disabled = false
   this.query.prop.Visible=false
   }

}

