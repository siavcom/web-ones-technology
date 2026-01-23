//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// @baseClass  : component
// @class : des_cpy
// Description : DESCRIPCION DE LA PARTIDA A COTIZAR
// @author: El Fer Blocks
// Creation : 2024-03-21
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from '@/classes/Component'

export class des_cpy extends COMPONENT {

  constructor() {
    super()

    this.prop.Caption = 'Cotizar' // Column Header
    this.prop.Type = 'textArea'
    this.prop.ControlSource = 'vi_cap_comecpy.des_cpy'
    this.prop.MaxLength = 1024
    this.prop.Capture = true
    this.prop.Disabled = true
    this.prop.ToolTipText = "Descripción de la partida a cotizar"
    this.inputStyle.width = "654px"
    this.inputStyle.height = "auto"

  }

}
