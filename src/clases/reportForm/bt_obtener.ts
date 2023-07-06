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
    this.prop.Value = 'Obtener datos'
    this.prop.Capture = false;
    this.prop.Position = 'footer'
    this.prop.Image = "/Iconos/svg/report-document.svg"        //print-color3.svg";
    this.prop.TabIndex = 1
    this.style.width = '35px'

  } // Fin constructor

  async click() {

    this.Form.report.displayPdf.prop.Source = ''
    this.Form.report.displayPdf.prop.Visible = false

    this.Form.var_ord.prop.Visible = false
    this.Form.for_imp.prop.Visible = false

    this.Form.queryPri.prop.Visible = false
    this.Form.queryUsu.prop.Visible = false
    this.Form.queryGen.prop.Visible = false


    this.Form.bt_obtener.prop.Visible = false
    this.Form.bt_pdf.prop.Visible = false


    let query=''
    if (this.Parent.sqlQuery.length>0)
    try{
      query=eval(this.Parent.sqlQuery)+';'
    } catch(error){

      MessageBox('eval('+this.Parent.sqlQuery+') '+error,16)
      return
    }  
    
    query=query+await this.Form.gen_query()
 

 //   const ins_sql = await this.Form.gen_query()

    if (! await this.Form.db.execute(query, 'result', 'null') ||
      this.Form.db.View.result && this.Form.db.View.result.recCount == 0) {
      this.Form.report.bt_close.click()
      return
    }


    this.Form.report.bt_excel.prop.Visible = true
    this.Form.report.bt_json.prop.Visible = true
    this.Form.report.browseResult.prop.RowSource = 'result'

    // Mostramos el reporte
    this.Form.report.prop.Visible = true
    this.Form.report.prop.Disabled = false


  }


}
