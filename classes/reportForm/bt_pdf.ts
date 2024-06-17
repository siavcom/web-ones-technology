//////////////////////////////////////////////
// Clase : bt_pdf
// Author : Fernando Cuadras Angulo
// Creacion : 25/May/2023
/////////////////////////////////////////////
import { COMPONENT } from '@/classes/Component'
/**
 *
 *
 * @export
 * @class BT_ACEPTAR
 * @extends {COMPONENT}
 */
export class bt_pdf extends COMPONENT {

  constructor() {
    super()
    this.Index = 1
    this.prop.BaseClass = 'imgButton'
    this.prop.Value = 'File'
    this.prop.Capture = false;
    this.prop.Position = 'footer'
    this.prop.Image = "/Iconos/svg/pdf-file.svg"        //print-color3.svg";
    this.prop.TabIndex = 3
    this.prop.Visible = true
    this.prop.ToolTipText = 'PDF file'
    this.style.width = '60px'

  } // Fin constructor

  async click() {
    this.prop.Visible = false

    const main = this.Form.main

    this.Form.queryPri.prop.Visible = false
    this.Form.queryUsu.prop.Visible = false
    this.Form.queryGen.prop.Visible = false


    for (let i = 0; i < main.length; i++) {
      if (!this.Form[main[i]].prop.Disabled)
        this.Form[main[i]].prop.Visible = false
    }


    this.Form.report.displayPdf.prop.Source = 'XXXX'
    this.Form.report.displayPdf.prop.Visible = true

    // contenedor del reporte PDF
    this.Form.report.prop.Visible = true
    this.Form.report.prop.Disabled = false

    this.Form.report.bt_excel.prop.Visible = false
    this.Form.report.bt_json.prop.Visible = false

    this.Form.bt_obtener.prop.Visible = false
    //this.Form.var_ord.prop.Visible = false
    //this.Form.for_imp.prop.Visible = false


    const query = await this.Form.gen_query()
    // console.log('bt_pdf',query,this.Form.for_imp.prop.Value)

    // const dataView=await this.Form.obtData()  
    this.Parent.report.prop.Disabled = false

    const buffer = await this.Form.db.jasperReport(query, this.Form.for_imp.prop.Value, this.Form.data)

    if (buffer == null) {
      this.Form.report.bt_close.click()

      return

    }

    this.Form.report.displayPdf.prop.Source = buffer
    this.Form.report.displayPdf.prop.Visible = true


    this.Form.report.displayPdf.height = '1200px'

    return

  }


}
