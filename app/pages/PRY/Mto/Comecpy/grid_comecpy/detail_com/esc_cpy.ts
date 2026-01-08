//////////////////////////////////////////////
// This class COMPONENT was generated automatically by web-ones-technology
// BaseClass : Component
// Class : esc_dpy
// Description : ESTATUS DEL PROVEEDOR E=ESPERA P=PROCESO C=C0TIZADO
// Author : El Fer Blocks
// Creation : 2024-03-21
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from '@/classes/Component'

export class esc_cpy extends COMPONENT {

  constructor() {
    super()
    this.prop.Caption = 'Estatus de cotizacion compra'
    this.prop.BaseClass = 'comboBox'
    this.prop.ControlSource = 'vi_cap_comecpy.ect_cpy'
    this.prop.Capture = true
    this.prop.updateKey = false
    this.prop.RowSourceType = 5; //1-Value, 2-Alias,3-sql 5-Array
    this.prop.RowSource = [
      [
        "Espera",
        "Proceso",
        "Cotizado",
      ],
      ["E", "P", "C"],
    ];
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.style.width = '356px'
    this.inputStyle.width = '124px'

  }

  override async interactiveChange() {
    // Usuario de compra

    if (this.Parent.pec_cpy.prop.Value <= 0) {
      this.prop.Value = this.old_value
      return false
    }
    this.Parent.uco_cpy.prop.Value = this.Form.mPublic.log_usu


    return true

  }

  async onChangeValue(refInputStyle?: any) {
    // Se paso por referencia el inputStyle
    const inputStyle = !refInputStyle ? this.inputStyle : refInputStyle.value

    const value = this.prop.Value.trim()
    switch (value) {
      case 'C': {
        inputStyle.color = 'green'
        break
      }
      case 'E': {
        inputStyle.color = 'red'
        break
      }
      case 'P': {
        inputStyle.color = 'blue'
        break
      }
    }

  }


}
