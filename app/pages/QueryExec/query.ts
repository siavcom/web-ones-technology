//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// @baseClass  : component
// @class : team
// Description : Equipo
// @author: El Fer Blocks
// Creation : 2023-02-17
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from "@/classes/Component";

export class query extends COMPONENT {
  constructor() {
    super();

    // const nom_ind=renglon[i]['nom_ind']

    this.prop.Caption = "Query SQL a ejecutar";
    this.prop.Type = "textArea";
    this.prop.BaseClass = "editText";
    this.prop.ControlSource = "";
    this.prop.Placeholder = "pon aqui el query SQL";
    this.prop.ToolTipText = "";

    this.prop.Capture = true;

  }

  //////////////////////////////////
  // event when
  ///////////////////////////////////

  async when() {
    this.Parent.browse.prop.RowSource = "";

    return true;
  }

  //////////////////////////////////
  // event click
  ///////////////////////////////////
  /*
  async click() {

  }
  */

  //////////////////////////
  // KeyPress
  // Descripcion: Cada tecla que se presiona en el input
  //////////////////////////
  /*
    public keyPress = async ($event) => {
    const key=super.keyPress($event)

   }
  */
}
