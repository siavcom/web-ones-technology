//////////////////////////////////////////////
// Clase : bt_obtener
// Author : Fernando Cuadras Angulo
// Creacion : Marzo/2023
/////////////////////////////////////////////
import { COMPONENT } from '@/classes/Component'
/**
 *
 *
 * @export
 * @class BT_ACEPTAR
 * @extends {COMPONENT}
 */
export class bt_obtener extends COMPONENT {

  constructor() {
    super()
    this.Index = 1
    this.prop.BaseClass = 'imgButton'
    this.prop.Value ='Obtener'
    this.prop.Capture = false;
    this.prop.Position = 'footer'
    this.prop.Image = "/Iconos/svg/report-document.svg"        //print-color3.svg";
    this.prop.TabIndex = 1
    this.style.width='40px'

  } // Fin constructor

  async click() {

    const ins_sql=await this.Form.gen_query()

    if ( ! await this.Form.db.execute(ins_sql,'result','null'))
        return

    if (this.Form.db.View.result && this.Form.db.View.result.recCount==0) // si no hay datos
       return 


    this.Form.reporte.broweResult.prop.RowSource = 'result'
    this.Form.reporte.broweResult.prop.Visible = true  // indica que despliega la información
    this.Form.bt_excel.prop.Visible=true
    this.Form.bt_pdf.prop.Visible=true
               // Mostramos el reporte
    this.Form.reporte.prop.Visible=false
    this.Form.reporte.prop.Disabled=false

  }


}
