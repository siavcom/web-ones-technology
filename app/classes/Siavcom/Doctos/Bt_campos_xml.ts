//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// @baseClass  : imgButton
// @class : xml
// Description : Componente xml
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 24/07/25
// Update Date  :
/////////////////////////////////////////////
// import { IMGBUTTON } from "@/classes/imgButton";

import { IMGBUTTON } from "@/classes/imgButton";
//imports

export class Bt_campos_xml extends IMGBUTTON {
    //public
    constructor() {
        super();
        this.prop.Caption = "Datos extras";
        this.style.fontSize = '9px';
        this.style.width = '77px';
        this.prop.Image = '/Iconos/svg/data.svg';
        this.prop.Visible = false
        this.prop.Position = "footer";
        //propiedades
    }

    // Evento   :Click
    // Objeto  :Bt_autorizacion
    // Tipo   :Commandbuttom
    // Comentarios :
    override async click() {
        this.prop.Visible = false
        await this.Form.captura_xml.open()

    }   // Fin Procedure
    //metodo
}