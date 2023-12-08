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
    this.Index = 1;
    this.prop.BaseClass = "imgButton";
    this.prop.Position = "footer";
    this.prop.Value = "Aceptar";
    this.prop.Capture = false;
    this.prop.Image = "/Iconos/svg/bx-check-circle.svg";
    this.prop.TabIndex = 1;
  } // Fin constructor

  async click() {
    this.prop.Visible = false;
    const m = { tpy_tpy: this.Form.tpy_tpy.prop.Value };
    await this.Form.db.use("vi_cap_cometap", m);

    await this.Form.db.execute(
      `select des_tdo,tdo_tdo from man_cometdo \
       where nmo_tdo>0 and  (select cop_nom from vi_cap_cometpy where tpy_tpy='${this.Form.tpy_tpy.prop.Value}')=cop_nom \ 
        union select '....No Hay' as des_tdo,'  ' as tdo_tdo  order by des_tdo  `,
      "cometdo"
    );
    //   if (this.Form.db.View.vi_cap_cometap.recnoVal.length==0)
    //      await this.Form.Grid.appendRow(m)
    this.Form.Grid.prop.RecordSource = "vi_cap_cometap";
  }
}
