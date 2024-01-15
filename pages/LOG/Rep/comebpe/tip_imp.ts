//////////////////////////////////////////////
// BaseClass : component
// Class : tip_bpe
// Description : Tipo de impresion (T=todos, F=falta segunda pesada)
// Author : MGSR
// Creation : 2024-01-15
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from "@/classes/Component";
export class tip_imp extends COMPONENT {
  constructor() {
    super();

    this.prop.textLabel = "Pesadas incompletas ";
    this.prop.Type = "checkBox";
    this.prop.Value=0 
    this.style.width = "200px";
   
  }
}
