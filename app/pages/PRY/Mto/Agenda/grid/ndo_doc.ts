//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// @baseClass  : COLUMN
// @class : ndo_doc
// Description : Numero de documento generado
// @author: El Fer Blocks
// Creation : 2024-02-12
// Update Date  : 
/////////////////////////////////////////////

import { COLUMN } from '@/classes/Column'

export class ndo_doc extends COLUMN {

  constructor() {
    super()

    this.prop.Type = 'number'
    this.prop.BaseClass = 'editText'
    this.prop.ControlSource = 'vi_cap_agenda.ndo_doc'
    this.prop.MaxLength = 16
    this.prop.Min = "0"
    this.prop.Max = "2147483647"
    this.prop.Decimals = 0
    this.prop.Capture = true
    this.prop.updateKey = false
    this.style.width = '64px'
  }
  async when() {
    if (this.Parent.tdo_tdo.prop.Value > '   ') {
      if (this.prop.Value == 0) {
        this.prop.Valid = false
      }
      this.prop.ReadOnly = false

    }
    return true

  }

  async valid() {
    if (this.prop.Value == 0)
      return false

    const est_old = this.Parent.est_apy.prop.Value
    if (est_old != 'F') {
      this.Parent.est_apy.prop.Value = 'F'
      if (await !this.Parent.est_apy.interactiveChange()) {
        this.Parent.est_apy.prop.Value = est_old
        this.prop.Value = 0
        return false
      }
    }

    // busca el codigo del cliente o proveedor 
    const proyecto = await this.Sql.localAlaSql(`select cod_nom from vi_cap_agenda where recno=${this.Parent.recno}`)
    const cod_nom = proyecto[0].cod_nom
    // busca el documento en el siavcom
    const res = await SQLExec(`select count(key_pri) as key_pri from vi_con_comedoc where  tdo_tdo='${this.Parent.tdo_tdo.prop.Value}' and ndo_doc=${this.prop.Value} and cod_nom='${cod_nom}'`)

    if (res[0].key_pri == 0) {
      this.Parent.est_apy.prop.Value = est_old
      this.prop.Value = 0
      return false
    }

    return true
  }
}
