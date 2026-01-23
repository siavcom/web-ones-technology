//////////////////////////////////////////////
// This class COMPONENT was generated automatically by web-ones-technology
// @baseClass  : Component
// Description : PRECIO DE VENTA
// @author: El Fer Blocks
// Creation : 2024-03-21
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from '@/classes/Component'

export class pv1_isu extends COMPONENT {

  constructor() {
    super()
    this.prop.Caption = 'Precio asociado/publico '
    this.prop.Type = 'number'
    this.prop.BaseClass = 'editText'
    this.prop.ControlSource = 'vi_cap_comecpy.pv1_isu'
    this.prop.Min = "0"
    this.prop.Max = "2147483647"
    this.prop.MaxLength = 12
    this.prop.Capture = false
    this.prop.ReadOnly = true
    this.prop.ToolTipText = 'Precio asociado/Precio publico'
    this.inputStyle.width = "92px"

  }
  override async onChangeValue(styles?: any) {
    this.prop.Decimals = this.Form.mPublic.dcp_pge
    const m = this.Form.mPublic
    const mon = [m.de1_pge, m.de2_pge, m.de3_pge, m.de4_pge, m.de5_pge]
    const n = await this.Sql.scatter(['mon_mov'], 'vi_cap_comecpy')
    this.prop.Currency = mon[n.mon_mov - 1]
  }

}