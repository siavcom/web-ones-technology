//////////////////////////////////////////////
// Clase : bt_timbra
// @author: Fernando Cuadras Angulo
// Creacion : 19/Nov/2025
// Ultima Modificacion : 
/////////////////////////////////////////////

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
    this.prop.Visible = false
    this.prop.Caption = 'Timbra CFDI'
    this.style.width = '84px'

  } // Fin constructor

  override async click() {
    let m = {}   // inicializamos m
    let ins_sql = ''

    this.prop.Visible = false
    m = await goto(0, 'vi_cap_comedoc')
    if (!await timbraCFDI(m.tdo_tdo, m.ndo_doc))
      return

    MessageBox('Timbrado exitoso')
    this.Form.tdo_tdo.setFocus()
  }   // Fin Procedure


}
