//////////////////////////////////////////////
// This class COMPONENT was generated automatically by web-ones-technology
// @baseClass  : Component
// @class : cla_tca
// Description : CLAVE DEL INSUMO
// @author: El Fer Blocks
// Creation : 2024-03-21
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from '@/classes/Component'
//import { help } from '@/classes/Siavcom/cla_tca_help/help'
export class cla_tca extends COMPONENT {
  //public help = new help()

  constructor() {
    super()
    this.prop.Caption = 'Clave del cliente'
    this.prop.Type = 'text'
    this.prop.BaseClass = 'editText'
    this.prop.ControlSource = 'vi_cap_comecpy.cla_tca'
    this.prop.ToolTipText = "Clave que maneja el cliente"
    this.prop.MaxLength = 30

    this.prop.Capture = true
    this.prop.updateKey = false

    //  this.prop.Help = true;
    this.style.width = "max-content"
    this.inputStyle.width = "128px"
  }


  async when() {
    if (this.Parent.isi_cpy.prop.Value == 'S') {
      return true
    }
    return false

  }


  async valid() {
    const m = { cla_tca: this.prop.Value }

    //this.Form['man_comeisu']=
    const man_comeisu = await this.Sql.use('lla1_tca', m)

    if (man_comeisu.length > 0) {
      this.prop.Valid = true
      this.Parent.dea_tca.prop.Value = man_comeisu[0]['dea_tca']

    } else this.prop.Valid = false
    return this.prop.Valid
  }
}
