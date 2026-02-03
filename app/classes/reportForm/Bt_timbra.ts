/**
 *
 * @description Boton para timbrar CFDI
 * @export
 * @class bt_imprime
 * @extends {IMGBUTTON}
 */
export class Bt_timbra extends IMGBUTTON {

  constructor() {
    super()
    this.Index = 1
    this.prop.Capture = false;

    this.prop.Position = 'footer'
    this.prop.Image = "/Iconos/svg/bell.svg"        //print-color3.svg";
    this.prop.Caption = 'Timbra CFDI'
    this.prop.Visible = false
    this.prop.ToolTipText = 'Timbra CFDI'

    this.style.width = '84px'

  } // Fin constructor

  override async click() {
    let m = {}   // inicializamos m
    let ins_sql = ''

    this.prop.Visible = false

    if (!await timbraCFDI(this.Form.op_tdo_tdo.prop.Value, this.Form.ndo_doc.prop.Value))
      return
    MessageBox('Timbrado exitoso')
    this.Form.bt_pdf.click()


  }   // Fin Procedure


}
