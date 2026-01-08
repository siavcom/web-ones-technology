//////////////////////////////////////////////
// This class COMPONENT was generated automatically by web-ones-technology
// BaseClass : Component
// Class : mop_prv
// Description : MONEDA DE Del PROVEEDOR
// Author : El Fer Blocks
// Creation : 2024-03-21
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from '@/classes/Component'

export class mop_prv extends COMPONENT {

  constructor() {
    super()

    this.prop.Caption = 'Moneda' // Column Header
    this.prop.Type = 'number'
    this.prop.BaseClass = 'comboBox'
    this.prop.ControlSource = 'vi_cap_comecpy.mop_prv'
    this.prop.ToolTipText = "Moneda del precio pactado con el proveedor"
    this.prop.Capture = true
    this.prop.Disabled = true
    this.style.width = '120px'
    this.inputStyle.width = '64px'


  }
  async init() {
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

}
