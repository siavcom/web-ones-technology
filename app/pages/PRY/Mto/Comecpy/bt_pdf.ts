//////////////////////////////////////////////
// Clase : bt_pdf
// Author : Fernando Cuadras Angulo
// Creacion : 11/Octubre/2024
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
    // this.index = 1
    this.prop.BaseClass = 'imgButton'
    this.prop.Capture = false;
    this.prop.Position = 'footer'
    this.prop.Image = "/Iconos/svg/pdf-file.svg"        //print-color3.svg";
    this.prop.TabIndex = 3
    this.prop.Visible = false
    this.prop.ToolTipText = 'PDF file'
    this.style.width = '84px'

  } // Fin constructor

  async click() {
    this.prop.Visible = false

    this.Form.ver_cpy.prop.Disabled = true
    this.Form.bt_clonar.prop.Visible = false
    this.Form.bt_cotizacion.prop.Visible = false
    if (! await this.Form.grid_comecpy.saveTable()) {
      return this.Form.num_pry.setFocus()

    }

    // lee tipos de actividades segun el tipo de proyecto
    if (this.Parent.est_cpy.prop.Value != 'AU') { // Si no esta autorizado
      return

    }
    //par_cpy
    const val_min = +this.Sql.View.vi_cap_comecpy.est_tabla.pga_cpy.val_def
    const res = await this.Sql.localAlaSql(`select * from vi_cap_comecpy where \
           pve_mov=0 or (isi_cpy<>S' and pga_cpy <${val_min}  and est_cpy<>'A') `)
    console.log('bt_pdf res=', res)

    if (res.length) {
      for (let i = 0; i < res.length; i++) {
        await MessageBox('La partida ' + res[i].par_cpy + ' No está autorizada', 16, 'Error')

      }

      return this.Form.num_pry.setFocus()
    }

    const m = {
      tpy_tpy: this.Form.tpy_tpy.prop.Value,
      num_pry: this.Form.num_pry.prop.Value,
      ver_cpy: this.Form.ver_cpy.prop.Value,
    };

    const query = `select * from vi_rep_comecpy where tpy_tpy='${m.tpy_tpy}' and num_pry=${m.num_pry} and ver_cpy=${m.ver_cpy}`

    const buffer = await this.Sql.jasperReport(query, 'cotizacion')

    if (buffer == null) {
      return
    }

    this.Form.displayPdf.prop.Source = buffer
    this.Form.displayPdf.prop.Visible = true
    this.Form.displayPdf.height = '1200px'
    this.Form.grid_comecpy.prop.Visible = false


    return

  }


}
