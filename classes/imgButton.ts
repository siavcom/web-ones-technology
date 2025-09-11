//////////////////////////////////////////////
// Clase : 
// Author : Fernando Cuadras Angulo
// Creacion : 1/Julio/2025
// Ult.Mod  : 1/Julio/2023
//            29/Ags/2025 Se pasa diseño por propiedades
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
    this.prop.Position = 'footer'; // main, header , footer
    this.captionStyle = {
      fontSize: '13px',
      fontWeight: 'bold',
      color: '#000000',
      textAlign: 'center',
      minWidth: '-moz-available',
      background: '#dfdcdc',
      borderRadius: '5%',
    }
    this.inputStyle.background = 'white'
    this.inputStyle.color = 'black'

    Object.assign(this.style, {
      background: 'white',
      color: 'black',
      width: "72px",
      height: "auto",
      borderRadius: '10%',
      boxShadow: "0 4px 8px 0, 0 6px 20px 0",
      boxSizing: "border-box",
    })


  }

}