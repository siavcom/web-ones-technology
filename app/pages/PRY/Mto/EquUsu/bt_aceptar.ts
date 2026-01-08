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
  } // Fin constructor

  override async click() {
    const m = { log_usu: this.Form.log_usu.prop.Value.trim() };
    console.log('Log_usu:', m);
    await use("vi_cap_db_equusu", m);
    this.Form.Grid.prop.RecordSource = "vi_cap_db_equusu";
    this.Form.Grid.prop.Visible = true;
  }
}
