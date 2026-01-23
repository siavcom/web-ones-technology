//////////////////////////////////////////////
// This class COMPONENT was generated automatically by web-ones-technology
// @baseClass  : Component
// @class : cla_isu
// Description : CLAVE DEL INSUMO en detalle de compra
// @author: El Fer Blocks
// Creation : 2024-03-21
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from '@/classes/Component'
import { help } from '@/classes/Siavcom/help/cla_isu/help'
import { des_isu } from './des_isu'
export class cla_isu extends COMPONENT {
  public help = new help()
  public des_isu = new des_isu()

  constructor() {
    super()
    this.prop.Caption = 'Clave '
    this.prop.Type = 'text'
    this.prop.BaseClass = 'editText'
    this.prop.ControlSource = 'vi_cap_comecpy.cla_isu'
    this.prop.MaxLength = 30
    this.prop.Capture = true
    this.prop.updateKey = false
    this.prop.ErrorMessage = 'No existe la clave del insumo'
    this.prop.Help = true;
    this.inputStyle.width = "218px" // Son 28 puntos del icono de ayuda
    this.style.width = "auto"
  }

  async init() {
    this.prop.InputMask = this.Form.mPublic.ima_pge.trim()
  }

  async when() {
    if (this.Parent.isi_cpy.prop.Value == 'S') {
      return true
    }
    return false

  }
  async valid() {
    if (this.Parent.isi_cpy.prop.Value == 'S') {


      const m = await this.Sql.scatter(['med_mov', 'mon_mov', 'pve_mov'], 'vi_cap_comecpy')
      // Calcula el precio de venta
      this.Form.grid_comecpy.cla_isu.prop.Value = this.prop.Value
      return await this.Form.grid_comecpy.cla_isu.valid(m)
    }

    const cla_isu = this.prop.Value
    if (cla_isu.trim().length == 0)
      return true

    const data = SQLExec(`select key_pri from man_comeisu where cla_isu='${cla_isu}'`)
    this.prop.ErrorMessage = 'Clave del insumo ya existe'
    if (data.length > 0)
      return false

    return true
  }
}
