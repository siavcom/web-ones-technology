//////////////////////////////////////////////
// Clase : bt_aceptar
// @author: Fernando Cuadras Angulo
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
    this.style.width = "30px";
  } // Fin constructor

  async click() {
    this.prop.Visible = false;
    const m = { alm_tda: this.Form.alm_tda.prop.Value };
    await use("vi_cap_comeisa", m);

    this.Form.Grid.prop.RecordSource = "vi_cap_comeisa";
  }
}
