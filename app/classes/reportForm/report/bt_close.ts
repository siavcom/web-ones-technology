//////////////////////////////////////////////
// Clase : close
// Author : Fernando Cuadras Angulo
// Creacion : 29/May/2023
/////////////////////////////////////////////

/** 
* Clase : close
* Author : Fernando Cuadras Angulo
* Creacion : 29/May/2023
 *
 * @export
 * @class BT_ACEPTAR
 * @extends {COMPONENT}
 */
export class bt_close extends IMGBUTTON {

  constructor() {
    super()
    this.prop.BaseClass = 'imgButton'
    this.prop.Value = ''
    this.prop.Capture = false;
    this.prop.Position = 'footer'
    this.prop.Image = "/Iconos/svg/close-color.svg"        //print-color3.svg";
    this.prop.TabIndex = 1
    this.prop.Visible = true
    this.prop.ToolTipText = 'Close report'
    this.style.width = '60px'

  } // Fin constructor

  override async click() {


    let bloque = 0
    for (bloque = 0; bloque < this.Form.block.length - 2; bloque++)
      if (!this.Form.block[bloque].prop.Disabled)
        this.Form.block[bloque].prop.Visible = true

    bloque = this.Form.block.length - 1
    this.Form.block[bloque].prop.Visible = false  // reportFields
    this.Form.block[bloque - 1].prop.Visible = false  // resultado

    const main = this.Form.main
    // console.log('bt_close main=', main)
    const ThisForm = this.Form
    for (let i = 0; i < main.length; i++) {
      if (ThisForm[main[i]].prop.Name != "translateContainer" && !ThisForm[main[i]].prop.Disabled)
        ThisForm[main[i]].prop.Visible = true
    }

    this.Form.report.prop.Disabled = true
    this.Form.report.prop.Visible = false

    this.Parent.displayBrowse.prop.RowSource = ''
    //  this.Form.report.browse.prop.Visible = false

    this.Parent.displayPdf.prop.Visible = false
    this.Parent.displayPdf.prop.Source = ''

    this.Parent.bt_excel.prop.Visible = true
    this.Parent.bt_json.prop.Visible = true

    this.Form.bt_obtener.prop.Visible = true

    // this.Form.var_ord.prop.Visible = true

    this.Form.queryPri.prop.Visible = true
    this.Form.queryUsu.prop.Visible = true
    this.Form.queryGen.prop.Visible = true
    this.Form.reportFields.prop.Visible = false

    this.Form.for_imp.prop.Visible = true
    this.Form.bt_obtener.prop.Visible = true

    if (!this.Form.bt_pdf.prop.Disabled)
      this.Form.bt_pdf.prop.Visible = true

    this.Form.tip_con.interactiveChange()
  }


}
