//////////////////////////////////////////////
// BaseClass : component
// Class : csf_pry
// Description : Constacia de situacion fiscal SAT
// Author : El Fer Blocks
// Creation : 2024-10-31
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from "@/classes/Component";
export class csf_pry extends COMPONENT {
  constructor() {
    super();
    // this.prop.Value = "Close";
    this.prop.Capture = false;
    this.prop.BaseClass = "base64";
    this.prop.Caption = 'Cargar CSF'
    this.prop.ControlSource = 'vi_cap_comepry.csf_pry'
    this.prop.ToolTipText = 'Constacia de situacion fiscal SAT'
    this.style.width = "315px";
    this.style.color = 'black'
    this.style.borderRadius = '5px'
    this.style.marginBlockStart = '2px';

    this.inputStyle.width = 'max-content'
    //this.inputStyle.height = "92px"
    this.inputStyle.borderRadius = '5px'
    this.inputStyle.accept = "application/pdf"
    this.inputStyle.marginBlockStart = 'auto'
    this.inputStyle.width = 'auto'
    this.inputStyle.height = '124px'


  }

}
