//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class : activa
// Description : Equipo
// Author : El Fer Blocks
// Creation : 2023-03-13
// Update Date  : 8/Mayo/2023
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from '@/classes/Component'

export class activa extends COMPONENT {

  constructor() {
    super()

    // const nom_ind=renglon[i]['nom_ind']

   // this.prop.textLabel = 'Filtro'
    this.prop.Type = 'checkBox'
    this.prop.BaseClass = 'editText'
    this.prop.textLabel='Se incluye en el reporte'
    this.prop.ControlSource = ''
    this.prop.Placeholder = ''
    this.prop.ToolTipText = ''
    this.prop.Position = 'main'
    this.prop.Capture = false
    this.prop.Value=0
 
  }

  async interactiveChange(){
    console.log('interactiveChange ',this.Name,this.prop.Value)
    if (this.prop.Value==1){
       this.Parent.nco_que.prop.Visible=true
       this.Parent.query.prop.Visible=true
       this.Parent.table.prop.Visible=false
       this.Parent.bt_edit.prop.Visible=true
       this.Parent.bt_add.prop.Visible=true
       this.Parent.bt_delete.prop.Visible=false
    }
       else   
     {
      this.Parent.nco_que.prop.Visible=false
      this.Parent.query.prop.Visible=false
      this.Parent.table.prop.Visible=false
      this.Parent.bt_edit.prop.Visible=false
      this.Parent.bt_add.prop.Visible=false
      this.Parent.bt_delete.prop.Visible=false

     }  

   return 

  }

  
}
