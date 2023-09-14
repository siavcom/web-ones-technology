//////////////////////////////////////////////
// Clase : close
// Author : Fernando Cuadras Angulo
// Creacion : 29/May/2023
/////////////////////////////////////////////
import { COMPONENT } from '@/classes/Component'
/**
 *
 *
 * @export
 * @class BT_ACEPTAR
 * @extends {COMPONENT}
 */
export class bt_close extends COMPONENT {

  constructor() {
    super()
    this.prop.BaseClass = 'imgButton'
    this.prop.Value =''
    this.prop.Capture = false;
    this.prop.Position = 'footer'
    this.prop.Image = "/Iconos/svg/close-color.svg"        //print-color3.svg";
    this.prop.TabIndex = 1
    this.prop.Visible=true
    this.prop.ToolTipText='Close report'
    this.style.width='60px'

  } // Fin constructor

  async click() {

    this.Form.report.prop.Disabled=true
    this.Form.report.prop.Visible=false
    this.Form.report.browse.prop.RowSource = ''
  //  this.Form.report.browse.prop.Visible = false

    this.Form.report.displayPdf.prop.Visible = false
    this.Form.report.displayPdf.prop.Source = ''

    this.Form.report.bt_excel.prop.Visible=true
    this.Form.report.bt_json.prop.Visible=true


    this.Form.bt_obtener.prop.Visible=true

    this.Form.var_ord.prop.Visible=true

    this.Form.queryPri.prop.Visible=true
    this.Form.queryUsu.prop.Visible=true
    this.Form.queryGen.prop.Visible=true   

    this.Form.for_imp.prop.Visible=true
    this.Form.bt_obtener.prop.Visible=true
    this.Form.bt_pdf.prop.Visible=true

  
  
  }


}
