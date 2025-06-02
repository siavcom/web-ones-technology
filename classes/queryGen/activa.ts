//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class : activa
// Description : Condicion Activa
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

    // this.prop.Caption = 'Filtro'
    this.prop.Type = 'checkBox'
    this.prop.BaseClass = 'editText'
    this.prop.Caption = 'Se incluye en el reporte'
    this.prop.Position = 'main'
    this.prop.Capture = false
    this.prop.Value = 0

  }

  async interactiveChange() {
    if (this.prop.Value == 1) {
      this.Parent.nco_que.prop.Visible = true
      this.Parent.query.prop.Visible = true
      this.Parent.Grid.prop.Visible = false
      this.Parent.bt_edit.prop.Visible = true
      this.Parent.bt_add.prop.Visible = true
      this.Parent.bt_delete.prop.Visible = false
      if (this.Parent.nco_que.prop.Value == 0)
        this.Parent.nco_que.prop.Value = 1
    }
    else {
      this.Parent.nco_que.prop.Visible = false
      this.Parent.query.prop.Visible = false
      this.Parent.Grid.prop.Visible = false
      this.Parent.bt_edit.prop.Visible = false
      this.Parent.bt_add.prop.Visible = false
      this.Parent.bt_delete.prop.Visible = false

    }

    return

  }


}
