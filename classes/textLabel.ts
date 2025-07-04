//////////////////////////////////////////////
// Clase : 
// Author : Fernando Cuadras Angulo
// Creacion : 1/Julio/2025
// Ult.Mod  : 1/Julio/2023
// Descripcion : Clase para el componente textLabel
// Esta clase extiende de la clase COMPONENT y define una etiqueta de texto
// con propiedades específicas como Capture y Valid.
// Esta clase se utiliza para crear etiquetas de texto personalizadas en la aplicación web.
/////////////////////////////////////////////

import { COMPONENT } from "@/classes/Component";
export class TEXTLABEL extends COMPONENT {
  BaseClass = "textLabel";
  // textLabel = "";
  constructor() {
    super();
    this.prop.BaseClass = "textLabel";
    this.prop.Capture = false;
  }
}
