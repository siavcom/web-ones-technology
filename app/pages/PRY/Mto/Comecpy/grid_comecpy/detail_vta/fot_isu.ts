//////////////////////////////////////////////
// @baseClass  : component
// @class : fot_isu
// Description : Imagen del producto en siavcom
// @author: El Fer Blocks
// Creation : 2024-10-31
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from "@/classes/Component";
export class fot_isu extends COMPONENT {
  constructor() {
    super();
    // this.prop.Value = "Close";

    this.prop.BaseClass = "base64";
    this.prop.Caption = 'Cargar imagen'
    this.prop.ControlSource = 'vi_cap_comecpy.fot_isu'
    this.prop.ToolTipText = 'Imagen del producto'
    this.prop.Capture = false;
    this.prop.Disabled = true


    this.style.float = "right"
    this.style.borderRadius = '8px'
    this.style.marginLeft = '10px'
    this.style.color = 'black'

    this.inputStyle.borderRadius = '8px'
    this.inputStyle.marginBlockStart = 'auto'
    this.inputStyle.width = '124px'
    this.inputStyle.height = '124px'
  }

}
