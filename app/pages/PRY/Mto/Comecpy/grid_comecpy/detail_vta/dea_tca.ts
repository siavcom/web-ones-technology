//////////////////////////////////////////////
// This class COMPONENT was generated automatically by web-ones-technology
// @baseClass  : Component
// @class : dea_tca
// Description : deescripcion del insumo con el proveedor
// @author: El Fer Blocks
// Creation : 2024-03-21
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from '@/classes/Component'


export class dea_tca extends COMPONENT {

  constructor() {
    super()

    // const nom_ind=renglon[i]['nom_ind']

    this.prop.Caption = 'Descripcion '
    this.prop.Type = 'textArea'
    this.prop.BaseClass = 'editText'
    this.prop.ControlSource = 'vi_cap_comecpy.dea_tca'

    this.prop.Capture = true
    this.style.cols = "192"
    this.style.width = "max-content"
    this.inputStyle.width = "380px"
    this.inputStyle.height = "40px"


  }
}
