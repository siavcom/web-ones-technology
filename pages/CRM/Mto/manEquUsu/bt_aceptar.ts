//////////////////////////////////////////////
// Clase : bt_aceptar
// Author : Fernando Cuadras Angulo
// Creacion : 12/Julio/2023
/////////////////////////////////////////////
import { COMPONENT } from "@/classes/Component";

/**
 *
 *
 * @export
 * @class BT_ACEPTAR
 * @extends {COMPONENT}
 */
export class bt_aceptar extends COMPONENT {
  constructor() {
    super();

    this.prop.BaseClass = "imgButton";
    this.prop.Position = "footer";
    this.prop.Value = "Aceptar";
    this.prop.Capture = false;
    this.prop.Image = " /Iconos/svg/ok-accept.svg";
    this.prop.TabIndex = 1;
    this.style.width = "30px";
  } // Fin constructor

  async click() {
    this.prop.Visible = false;
    const m = { log_usu: this.Form.log_usu.prop.Value };
    await this.Form.db.use("vi_cap_db_equusu", m);
    this.Form.Grid.prop.RecordSource = "vi_cap_db_equusu";
  }
}
