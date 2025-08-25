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
    this.style.width = "72px"
    this.style.height = "26px"
    this.prop.Position = 'footer'; // main, header , footer
    this.captionStyle = {
      fontSize: '13px',
      fontWeight: 'bold',
      color: '#000000',
      textAlign: 'center',
      minWidth: '-moz-available',
      minHeight: '26px',
      background: 'lightgray'
    }
    this.inputStyle.background = 'white'
    this.inputStyle.color = 'black'
    this.style.background = 'white'
    this.style.color = 'black'


  }

  public override async init_(): Promise<void> {
    if (this.prop.Image.length > 0) {
      delete this.inputStyle.boxShadow

    }

  }
}