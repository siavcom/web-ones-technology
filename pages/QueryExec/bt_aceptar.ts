//////////////////////////////////////////////
// Clase : bt_aceptar
// Author : Fernando Cuadras Angulo
// Creacion : Agosto/2021
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
    this.Index = 1;
    this.prop.BaseClass = "imgButton";
    this.prop.Position = "footer";
    this.prop.Caption = "Aceptar";
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
      if (result) this.Form.browse.prop.RowSource = "now.sqlresult";
      // console.log('bt_aceptar ===>>> Datos leidos del SQL Server',this.Form.browse.prop.RowSource)
    }
  }
}
