//////////////////////////////////////////////
// BaseClass : component
// Class : img_cpy
// Description : Imagen del producto en siavcom
// Author : El Fer Blocks
// Creation : 2024-10-31
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from "@/classes/Component";
export class img_cpy extends COMPONENT {
  constructor() {
    super();
    // this.prop.Value = "Close";
    this.prop.Capture = false;
    this.prop.BaseClass = "base64";
    this.prop.Caption = 'Cargar imagen'
    this.prop.ControlSource = 'vi_cap_comecpy.img_cpy'
    this.prop.ToolTipText = 'Imagen del producto'
    this.style.width = "128px";
    this.style.float = "right"
    this.style.borderRadius = '8px'
    this.style.marginLeft = '10px'
    this.style.color = 'black'

    this.inputStyle.width = '124px'
    //this.inputStyle.height = '124px'

    this.inputStyle.borderRadius = '8px'
    this.inputStyle.accept = "image/png, image/jpeg, image/jpg"
    this.inputStyle.marginBlockStart = 'auto'

  }

}
