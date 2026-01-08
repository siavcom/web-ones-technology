//////////////////////////////////////////////
// This class COMPONENT was generated automatically by web-ones-technology
// BaseClass : Component
// Class : moc_dpy
// Description : MONEDA DE LA COTIZACION DEL PROVEEDOR
// Author : El Fer Blocks
// Creation : 2024-03-21
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from '@/classes/Component'

export class moc_cpy extends COMPONENT {

  constructor() {
    super()

    //  this.prop.Caption = 'Moneda' // Column Header
    this.prop.Type = 'number'
    this.prop.BaseClass = 'comboBox'
    this.prop.ControlSource = 'vi_cap_comecpy.moc_cpy'
    this.prop.ToolTipText = "Moneda de la cotizacion del proveedor"
    this.prop.Capture = true
    this.inputStyle.width = '64px'
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

  }

  public override onChangeValue(styles?: any) {
    if (this.Form.grid_comecpy.detail_vta.modal_vta) {
      return this.Form.grid_comecpy.detail_vta.modal_vta.pec_cpy.onChangeValue(styles)
    }
  }


}
