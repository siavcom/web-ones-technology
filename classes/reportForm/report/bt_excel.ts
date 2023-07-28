//////////////////////////////////////////////
// Clase : bt_excel
// Author : Fernando Cuadras Angulo
// Creacion : 25/Mayo/2023
/////////////////////////////////////////////
import { COMPONENT } from '@/classes/Component'
/**
 *
 *
 * @export
 * @class BT_ACEPTAR
 * @extends {COMPONENT}
 */
export class bt_excel extends COMPONENT {

  constructor() {
    super()
    this.Index = 1
    this.prop.BaseClass = 'imgButton'
    this.prop.Value ='File'
    this.prop.Capture = false;
    this.prop.Position = 'footer'
    this.prop.Image = "/Iconos/svg/excel-file.svg"  
    this.prop.TabIndex = 2
    this.prop.Visible=true
    this.style.width='40px'

  } // Fin constructor

  async click() {
    await this.Form.db.localAlaSql(`select * into XLSXML("result.xlsx",?) from result`) 
   // await this.Form.db.localAlaSql(`select * into XLS("restest257a",?) from result`) 

  }


}
