//////////////////////////////////////////////
// This class COMPONENT was generated automatically by web-ones-technology
// @baseClass  : Component
// @class : fvi_tca
// Description : FECHA DE COTIZACION DE PROVEEDOR
// @author: El Fer Blocks
// Creation : 2024-03-21
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from '@/classes/Component'

export class fvi_tca extends COMPONENT {

  constructor() {
    super()
    this.prop.Caption = 'Fecha de vigencia'
    this.prop.Type = 'date'
    this.prop.BaseClass = 'editText'
    this.prop.ControlSource = 'vi_cap_comecpy.fvi_tca'
  }
}