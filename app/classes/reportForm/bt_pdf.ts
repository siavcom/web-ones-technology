//////////////////////////////////////////////
// Clase : bt_pdf
// Author : Fernando Cuadras Angulo
// Creacion : 25/May/2023
/////////////////////////////////////////////

/**
 *
 *
 * @export
 * @class BT_ACEPTAR
 * @extends {COMPONENT}
 */
export class bt_pdf extends IMGBUTTON {

  constructor() {
    super()
    this.Index = 1
    this.prop.BaseClass = 'imgButton'
    this.prop.Capture = false;
    this.prop.Position = 'footer'
    this.prop.Image = "/Iconos/svg/pdf-file.svg"        //print-color3.svg";
    this.prop.TabIndex = 3
    this.prop.Visible = true
    this.prop.ToolTipText = 'PDF file'
    this.style.width = '84px'

  } // Fin constructor

  async click() {
    this.prop.Visible = false

    let bloque = 0
    for (bloque = 0; bloque < this.Form.block.length - 1; bloque++)
      this.Form.block[bloque].prop.Visible = false

    bloque = this.Form.block.length - 1

    console.log('bt_pdf click No bloque=', bloque, 'bloques=', this.Form.block, 'Form.block.length=', this.Form.block.length)

    this.Form.block[bloque].prop.Visible = true  // resultado ultimo bloque

    const main = this.Form.main
    /*
        this.Form.queryPri.prop.Visible = false
        this.Form.queryUsu.prop.Visible = false
        this.Form.queryGen.prop.Visible = false
        this.Form.reportFields.prop.Visible = false
    
    
    
        for (let i = 0; i < main.length; i++) {
          if (!this.Form[main[i]].prop.Disabled)
            this.Form[main[i]].prop.Visible = false
        }
    */

    this.Form.report.displayPdf.prop.Source = 'XXXX'
    this.Form.report.displayPdf.prop.Visible = true

    // contenedor del reporte PDF
    this.Form.report.prop.Visible = true
    this.Form.report.prop.Disabled = false

    this.Form.report.bt_excel.prop.Visible = false
    this.Form.report.bt_json.prop.Visible = false

    this.Form.bt_obtener.prop.Visible = false

    this.Form.report.prop.Disabled = false

    this.Form.report.displayBrowse.table.isLoading = true; // indicadorm de caqrga
    const query = await this.Form.gen_query()


    Processing()
    console.log("bt_pdf buffer=", query, this.Form.for_imp.prop.Value, this.Form.data)
    const buffer = await jasperReport(query, this.Form.for_imp.prop.Value, this.Form.data)


    this.Form.report.displayBrowse.table.isLoading = false
    if (buffer == null) {
      closeProcessing('No data to show')

      this.Form.report.bt_close.click()
      return
    }
    closeProcessing()

    this.Form.report.displayPdf.prop.Source = buffer
    this.Form.report.displayPdf.prop.Visible = true
    this.Form.report.displayPdf.height = '1200px'
    this.Form.bt_whatsApp.prop.Visible = true
    this.Form.bt_email.prop.Visible = true

    return

  }


}
