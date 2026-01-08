//////////////////////////////////////////////
// BaseClass : component
// Class : dia_ppe
// Description : dias por cada periodo
// Author : El Fer Blocks
// Creation : 2023-10-25
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from '@/classes/Component'
export class dia_ppe extends COMPONENT {

  constructor() {
    super()

    this.prop.Type = 'spinner'
    this.prop.Caption = "Días por periodo"
    this.prop.Value = 7
    this.prop.Min = 1
    this.prop.Max = 30
    this.prop.Visible = true
    this.inputStyle.width = '40px'
    //  this.style.zIndex=3  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente

  }
  //   
}
