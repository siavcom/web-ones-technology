//////////////////////////////////////////////
// This class COMPONENT was generated automatically by web-ones-technology
// @baseClass  : Component
// @class : mco_dpy
// Description : MONEDA DE LA COTIZACION DEL PROVEEDOR
// @author: El Fer Blocks
// Creation : 2024-03-21
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from '@/classes/Component'

export class mon_mov extends COMPONENT {
  override old_value = 0
  constructor() {
    super()
    this.prop.Type = 'number'
    this.prop.BaseClass = 'comboBox'
    this.prop.ControlSource = 'vi_cap_comecpy.mon_mov'

    this.prop.Capture = true
    this.prop.updateKey = false
    this.style.maxWidth = "58px"
    this.inputStyle.maxWidth = "30px"
  }
  override async init() {
    const m = this.Form.mPublic
    // asigna valores de monedas
    this.prop.RowSource = [
      [m.de1_pge, m.de2_pge, m.de3_pge, m.de4_pge, m.de5_pge],
      [1, 2, 3, 4, 5]
    ];

    this.prop.RowSourceType = 5 //1-Value, 2-Alias, 3-Select SQL 5-Array
    this.prop.ColumnCount = 2  // Columns number
    this.prop.BoundColumn = 2  // the result is bound to column number 2
    this.prop.ControlSource = 'vi_cap_comecpy.mon_mov'
  }

  async when() {

    if (this.Parent.isi_cpy.prop.Value != 'S')
      this.prop.ReadOnly = true
    else
      this.prop.ReadOnly = false

    this.old_value = this.prop.Value
    return !this.prop.ReadOnly

  }

  public override onChangeValue(styles?: any) {
    if (this.Parent.pve_mov)
      this.Parent.pve_mov.onChangeValue(styles)
  }


  async valid() {
    const old_data = await this.Sql.scatter(['med_mov', 'mon_mov', 'pve_mov'], 'vi_cap_comecpy')
    old_data['mon_mov'] = this.old_value
    await this.Form.grid_comecpy.cla_isu.valid(old_data)
    this.old_value = this.prop.Value
    return true
  }

}
