//////////////////////////////////////////////
// @baseClass  : component
// @class : bt_save
// Description : Obtiene el pdf de la cotizacion del proveedor
// @author: El Fer Blocks
// Creation : 2024-10-16
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from "@/classes/Component";
export class pdf_cpy extends COMPONENT {
  constructor() {
    super();
    // this.prop.Value = "Close";
    this.prop.Capture = false;
    this.prop.Caption = 'Cargar PDF'
    this.prop.BaseClass = "base64";
    this.inputStyle.width = '124px'
    this.inputStyle.height = '124px'

    this.style.float = "right"
  }


}
