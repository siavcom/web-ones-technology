//////////////////////////////////////////////
// Clase : message
// Descripcion : Texto del Mensaje
// @author: Fernando Cuadras Angulo
// Creacion : Mayo/2022
// Ult.Mod  04/Marzo/2025
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from "@/classes/Column";

export class message extends COLUMN {

  constructor() {
    super();
    this.prop.ColumnTextLabel = "Message";
    this.prop.ControlSource = "vi_cap_db_messages.message";
    this.style.width = "512px";
  }

}
