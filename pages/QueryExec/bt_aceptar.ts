//////////////////////////////////////////////
// Clase : bt_aceptar
// Author : Fernando Cuadras Angulo
// Creacion : Agosto/2021
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
    this.Index = 1;
    this.prop.BaseClass = "imgButton";
    this.prop.Position = "footer";
    this.prop.Value = "Aceptar";
    this.prop.Capture = false;
    this.prop.Image = " /Iconos/svg/accept.svg";
    this.prop.TabIndex = 1;
    this.style.width = "64px";
  } // Fin constructor

  async click() {
    this.Form.browse.prop.RowSource = "";
    // console.log('bt_aceptar click===>>>',this.Form.browse.prop.RowSource)
    if (this.Form.query.prop.Value.trim() > "   ") {
      const result = await this.Form.db.execute(
        this.Form.query.prop.Value.trim(),
        "sqlresult"
      );
      if (result) this.Form.browse.prop.RowSource = "Now.sqlresult";
      // console.log('bt_aceptar ===>>> Datos leidos del SQL Server',this.Form.browse.prop.RowSource)
    }
  }
}
