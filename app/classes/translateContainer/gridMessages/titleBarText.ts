//////////////////////////////////////////////
// Clase : message
// Descripcion : Titulo del mensaje
// @author: Fernando Cuadras Angulo
// Creacion : Mayo/2022
// Ult.Mod  04/Marzo/2025
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from "@/classes/Column";

export class titleBarText extends COLUMN {

  constructor() {
    super();
    this.prop.Order = 3;
    this.prop.ColumnTextLabel = "Title";
    this.prop.ControlSource = "vi_cap_db_messages.titlebartext";
    this.style.width = "512px";
  }

}
