//////////////////////////////////////////////
// This class COMPONENT was generated automatically by web-ones-technology
// @baseClass  : Component
// @class : dse_isu
// Description : deescripcion del insumo en Siavcom
// @author: El Fer Blocks
// Creation : 2024-03-21
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from '@/classes/Component'


export class des_isu extends COMPONENT {

  constructor() {
    super()

    // const nom_ind=renglon[i]['nom_ind']

    //this.prop.Caption = 'Descripcion '
    this.prop.Type = 'textArea'
    this.prop.ControlSource = 'vi_cap_comecpy.des_isu'
    this.prop.MaxLength = 1024
    this.prop.Capture = true
    this.prop.Disabled = true
    this.inputStyle.width = "675px"
    this.inputStyle.height = "30px"

  }
}
