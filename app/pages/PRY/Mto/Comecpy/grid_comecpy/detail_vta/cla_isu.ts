//////////////////////////////////////////////
// This class COMPONENT was generated automatically by web-ones-technology
// @baseClass  : Component
// @class : cla_isu
// Description : CLAVE DEL INSUMO
// @author: El Fer Blocks
// Creation : 2024-03-21
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from '@/classes/Component'
import { help } from '@/classes/Siavcom/help/cla_isu/help'
export class cla_isu extends COMPONENT {
  public help = new help()

  constructor() {
    super()
    this.prop.Caption = 'Clave del Insumo'
    this.prop.Type = 'text'
    this.prop.BaseClass = 'editText'
    this.prop.ControlSource = 'vi_cap_comecpy.cla_isu'
    this.prop.MaxLength = 30
    this.prop.Capture = true
    this.prop.updateKey = false
    this.prop.ToolTipText = "Clave que tendra el insumo en el ERP (Siavcom)"
    this.prop.Placeholder = "Clave en el ERP (Siavcom)",

      this.prop.Help = true;
    this.inputStyle.width = "218px" // Son 28 puntos del icono de ayuda
    this.style.width = "352px"

  }

  async init() {
    this.prop.InputMask = this.Form.mPublic.ima_pge.trim()
  }


  async when() {
    if (this.Parent.isi_cpy.prop.Value == 'S') {

      this.prop.ErrorMessage = 'No existe la clave del insumo'
      return true
    }

    this.prop.ErrorMessage = 'Ya existe la clave del insumo'
    return false


  }

  async valid() {
    const m = await this.Sql.scatter(['med_mov', 'mon_mov', 'pve_mov'], 'vi_cap_comecpy')
    // Calcula el precio de venta
    this.Form.grid_comecpy.cla_isu.prop.Value = this.prop.Value
    const res = await this.Form.grid_comecpy.cla_isu.valid(m)

    if (this.Parent.isi_cpy.prop.Value == 'S')
      return await this.Form.grid_comecpy.cla_isu.valid(m)
    else
      return !await this.Form.grid_comecpy.cla_isu.valid(m)
  }

}
