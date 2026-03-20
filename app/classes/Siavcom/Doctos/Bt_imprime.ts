//////////////////////////////////////////////
// Clase : bt_imprime 
// @author: Fernando Cuadras Angulo
// Creacion : 25/May/2023
// Ultima Modificacion : 
/////////////////////////////////////////////

/**
 *
 * @description Boton para imprimir en PDF
 * @export
 * @class bt_imprime
 * @extends {IMGBUTTON}
 */
export class Bt_imprime extends IMGBUTTON {

  constructor() {
    super()
    this.Index = 1

    this.prop.Capture = false;
    this.prop.Position = 'footer'
    this.prop.Image = "/Iconos/svg/pdf-file.svg"        //print-color3.svg";
    this.prop.TabIndex = 3
    this.prop.Visible = false
    this.prop.ToolTipText = 'get PDF'
    this.style.width = '84px'

  } // Fin constructor

  override async click() {
    const m = await goto(0, 'vi_cap_comedoc')
    const router = useRouter();
    const path = {
      path: '/VTA/Rep/come5251',
      params: {},
      query: { par_uno: m.tdo_tdo, par_dos: m.ndo_doc }
    }

    router.push(path)
    return
    /*  this.prop.Visible = false
      this.Form.report.displayPdf.prop.Source = 'XXXX'
      this.Form.report.displayPdf.prop.Visible = true
  
      // contenedor del reporte PDF
  
      if (buffer == null) {
        MessageBox("No data to show");
        this.Form.report.bt_close.click()
        return
      }
  
      this.Form.blick[0].prop.Visible = false
      this.Form.blick[1].prop.Visible = false
      this.Form.blick[2].prop.Visible = false
      this.Form.blick[4].prop.Visible = false
      this.Form.blick[5].prop.Visible = false
  
      this.Form.block[6].prop.Visible = true  // pdf
      this.Form.report.displayPdf.prop.Source = buffer
      this.Form.report.displayPdf.prop.Visible = true
      this.Form.report.displayPdf.height = '1200px'
      return
  */
  }

}
