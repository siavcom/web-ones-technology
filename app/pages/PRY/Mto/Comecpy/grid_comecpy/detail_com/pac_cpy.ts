//////////////////////////////////////////////
// This class COMPONENT was generated automatically by web-ones-technology
// BaseClass : COLUMN
// BaseClass : Component
// Description : Paridad de la moneda cotizada
// Author : El Fer Blocks
// Creation : 2024-04-02
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from '@/classes/Component'

export class pac_cpy extends COMPONENT {

  constructor() {
    super()

    // const nom_ind=renglon[i]['nom_ind']

    this.prop.Caption = 'Paridad'
    this.prop.Type = 'number'
    this.prop.BaseClass = 'editText'
    this.prop.ControlSource = 'vi_cap_comecpy.pac_cpy'
    this.prop.Decimals = 5

    this.inputStyle.width = '90px'
    this.style.width = '146px'
  }

  override async when(): Promise<boolean> {
    const m = this.Sql.scatter(['mon_cpy'], 'vi_cap_comecpy')
    if (m.mon_cpy == '1') {
      this.prop.Value = 1
      return false
    }

    return true
  }



  override async valid() {
    return this.Form.grid_comecpy.detail_com.modal_com.pec_cpy.valid()
  }

}
