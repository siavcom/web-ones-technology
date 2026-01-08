//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class : med_mov
// Description : Medida
// Author : El Fer Blocks
// Creation : 2024-03-21
// Update Date  : 2024-09-30
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from '@/classes/Component'
export class med_mov extends COMPONENT {
  med_mov = null
  override old_value = 0
  constructor() {
    super()

    this.prop.Caption = 'Unidad '
    this.prop.ControlSource = 'vi_cap_comecpy.uni_mov'
    this.prop.Capture = true
    this.style.width = '128px'
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 1;
    this.style.width = '125px'
    this.style.maxHeight = '25px'
    //  this.style.padding = '10px'
    this.inputStyle.width = '58px'
  }


  async when() {
    return await this.Form.grid_comecpy.med_mov.when()
  }


  /**
   * @description Valida la medida seleccionada, actualiza en la base de datos y vuelve a calcular el precio de venta.
   * @returns {Promise<boolean>} - true si la validacion fue exitosa.
   */
  async interactiveChange(): Promise<boolean> {
    this.Form.grid_comecpy.med_mov.prop.Value = this.prop.Value
    return await this.Form.grid_comecpy.med_mov.interactiveChange()

  }


}
