//////////////////////////////////////////////
// Clase : message
// Descripcion : Texto del Mensaje
// Author : Fernando Cuadras Angulo
// Creacion : Mayo/2022
// Ult.Mod  04/Marzo/2025
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from "@/classes/Column";

export class messageText extends COLUMN {

  constructor() {
    super();
    this.prop.Order = 3;
    this.prop.ColumnTextLabel = "Message Text";
    this.prop.BaseClass = "editText";
    this.prop.ControlSource = "vi_cap_db_messages.messagetext";
    this.style.width = "256px";
  }

}
