//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// @baseClass  : component
// @class : med_mov
// Description : Medida
// @author: El Fer Blocks
// Creation : 2024-03-21
// Update Date  : 2024-09-12
// Observations : Es en el detail_com
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from '@/classes/Component'
export class med_mov extends COMPONENT {
  med_mov = []  // arreglo de las medidas
  cla_isu = ''
  constructor() {
    super()

    this.prop.Caption = 'Unidad' // Column Header
    this.prop.ToolTipText = 'Unidad a cotizar '
    this.prop.ControlSource = 'vi_cap_comecpy.uni_mov'
    this.prop.Capture = true
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 1;
    this.style.width = '115px'
    this.style.maxHeight = '25px'
    this.style.padding = '10px'
    this.inputStyle.width = '64px'
  }

  async when() {
    return await this.Form.grid_comecpy.med_mov.when()
  }

  async interactiveChange(): Promise<boolean> {
    this.Form.grid_comecpy.med_mov.prop.Value = this.prop.Value
    return await this.Form.grid_comecpy.med_mov.interactiveChange()

  }
}
