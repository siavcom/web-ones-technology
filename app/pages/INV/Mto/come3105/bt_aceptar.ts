//////////////////////////////////////////////
// Clase : bt_aceptar
// Author : Fernando Cuadras Angulo
// Creacion : 12/Julio/2023
/////////////////////////////////////////////


/**
 *
 *
 * @export
 * @class BT_ACEPTAR
 * @extends {COMPONENT}
 */
export class bt_aceptar extends IMGBUTTON {
  constructor() {
    super();

    this.prop.BaseClass = "imgButton";
    this.prop.Position = "footer";
    this.prop.Caption = "Aceptar";
    this.prop.Capture = false;
    this.prop.Image = " /Iconos/svg/accept.svg";
    this.prop.TabIndex = 1;
    this.style.width = "64px";
    this.prop.Visible = false;

  } // Fin constructor

  override async click() {
    this.prop.Visible = false;
    const m = {}   // inicializamos m

    m.des_cla = this.Form.des_cla.prop.Value
    m.has_cla = this.Form.has_cla.prop.Value
    m.alm_tda = this.Form.alm_tda.prop.Value

    const data = await use('vi_cap_alm_cla', m, 'vi_cap_alm') // use vi_cap_alm_cla vi_cap_alm_cla ALIAS  // esta vista es para la captura de almacenes 
    console.log('=======>bt_aceptar', data, View.vi_cap_alm)

    this.Form.Captura_alm.prop.RecordSource = 'vi_cap_alm'  // actualiza la tabla en el grid 

    return

  }   // Fin Procedure

}

