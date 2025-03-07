//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class : propPlaceHolder
// Description :Valor del textLabel
// Creation : 2023-07-20
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from "@/classes/Component";

export class PlaceHolder extends COMPONENT {

  constructor() {
    super();
    this.prop.textLabel = "Place Holder";
    this.prop.ControlSource = "vi_cap_db_languages.placeholder";
    this.prop.Capture = true
    this.prop.BaseClass = "editText";
    this.inputStyle.width = "496px";
  }


}
