//////////////////////////////////////////////
// This class COMPONENT was generated automatically by web-ones-technology
// @baseClass  : Component
// @class : fvi_prv
// Description : FECHA de vigencia de cotizacion del proveedor
// @author: El Fer Blocks
// Creation : 2024-03-21
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

export class fvi_prv extends COMPONENT {

  constructor() {
    super()

    // const nom_ind=renglon[i]['nom_ind']

    this.prop.Caption = 'Vigencia'
    this.prop.Type = 'date'
    this.prop.BaseClass = 'editText'
    this.prop.ControlSource = 'vi_cap_comecpy.fvi_prv'
    this.prop.Capture = true
    this.prop.updateKey = false
    this.prop.RowSource = ''      // 
    this.prop.RowSourceType = 0 //1-Value, 2-Alias, 3-Select SQL 5-Array
    this.prop.MaxLength = 0  // Columns number
    this.prop.BoundColumn = 0  // the result is bound to column number 2

  }
}
