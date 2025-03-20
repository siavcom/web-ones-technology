//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class :  propErrorMessage
// Description :Valor del textLabel
// Creation : 2023-07-20
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from "@/classes/Component";

export class ErrorMessages extends COMPONENT {

  constructor() {
    super();
    this.prop.textLabel = "Error Message";
    this.prop.ControlSource = "vi_cap_db_languages.errormessage";
    this.prop.Capture = true

    this.prop.BaseClass = "editText";
    this.inputStyle.width = "496px";
  }


}
