//////////////////////////////////////////////
// Clase : bt_delete
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
export class bt_delete extends COMPONENT {

  constructor() {
    super()
    this.Index = 1
    this.prop.BaseClass = 'imgButton'
    this.prop.Position = 'footer'
    this.prop.textLabel = "Borrar";
    this.prop.Capture = false;
    this.prop.Position = 'footer'
    this.prop.Image = "/Iconos/svg/delete2-color.svg";

    this.prop.TabIndex = 1


  } // Fin constructor

  async click() {
    this.Form.browseResult.prop.RowSource = ''
    console.log('bt_aceptar click===>>>',this.Form.browseResult.prop.RowSource)  
    if (this.Form.query.prop.Value.trim()>'   ' ){
      const result=await this.Form.db.execute(this.Form.query.prop.Value.trim(),'sqlresult') 
      if (result) this.Form.browseResult.prop.RowSource = 'sqlresult'
      console.log('bt_aceptar ===>>> Datos leidos del SQL Server',this.Form.browseResult.prop.RowSource)  
      }

  }


}
