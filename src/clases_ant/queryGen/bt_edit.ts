//////////////////////////////////////////////
// Clase : bt_edit
// Author : Fernando Cuadras Angulo
// Creacion : Marzo/2023
/////////////////////////////////////////////
import { COMPONENT } from '@/classes/Component'
////import { MessageBox } from '@/classes/Functions';
/**
 *
 *
 * @export
 * @class BT_ACEPTAR
 * @extends {COMPONENT}
 */
export class bt_edit extends COMPONENT {

  constructor() {
    super()
    this.Index = 1
    this.prop.BaseClass = 'imgButton'
    this.prop.Position = 'footer'
    this.prop.textLabel = "Editar";
    this.prop.Capture = false;
    this.prop.Position = 'footer'
    this.prop.Image = "/Iconos/svg/edit1-color.svg";

    this.prop.TabIndex = 1


  } // Fin constructor

  async click() {
    this.Form.table.RecordSource='querys'
  }


}
