//////////////////////////////////////////////
// BaseClass : component
// Class : has_cla
// Description : Hasta que insumo
// Author : MGSR
// Creation : 2025/jul/09
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from "@/classes/Component";
export class has_cla extends COMPONENT {
  constructor() {
    super();

    this.prop.Caption = "Hasta  que insumo";
    this.prop.Type = "string";
    this.prop.MaxLength = 30;
    this.prop.Value = "ZZZZZZZZZZZZZZZ";
    this.prop.ErrorMessage = 'Dato menor al anterior'
    this.prop.InputMask = Public.value.ima_pge.trim()

    //this.style.zIndex=3  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente
  }

  override async valid() {
    if (this.prop.Value < this.Parent.des_cla.prop.Value) {
      //await MessageBox('Fecha inválida',6,'Error')
      return false
    }
    else
      return true

  }
}

