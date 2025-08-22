//////////////////////////////////////////////
// Clase : 
// Author : Fernando Cuadras Angulo
// Creacion : 1/Julio/2025
// Ult.Mod  : 1/Julio/2023
// Descripcion : Clase para el componente imgButton
// Esta clase extiende de la clase COMPONENT y define un botón de imagen
// con propiedades específicas como Capture y Valid.
// Esta clase se utiliza para crear botones de imagen personalizados en la aplicación web.
/////////////////////////////////////////////

import { COMPONENT } from "@/classes/Component";
export class IMGBUTTON extends COMPONENT {

  BaseClass = "imgButton";

  // textLabel = "";
  constructor() {
    super();
    this.prop.BaseClass = 'imgButton';
    this.style.width = "64px"
    this.prop.Position = 'footer'; // main, header , footer
  }


}
