//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// @baseClass  : component
// @class : displayQr
// Description : despliga el valor QR para vincular el whatApp
// @author: El Fer Blocks
// Creation : 2025-18-Enero
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from "@/classes/Component";

export class DISPLAYQR extends COMPONENT {
  sw_peso: boolean = true
  constructor() {
    super();
    this.prop.BaseClass = 'image'
    this.prop.Caption = "QR de vinculacion";
    this.prop.Capture = false;
    this.prop.updateKey = false;
    this.prop.Type = 'QR'
    this.prop.Caption = 'WhatsApp QR code'

  }

}
