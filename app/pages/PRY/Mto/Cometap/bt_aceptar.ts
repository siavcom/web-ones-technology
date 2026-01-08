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
export class bt_aceptar extends IMGBUTTON {
  constructor() {
    super();
    // this.index = 1;
    this.prop.BaseClass = "imgButton";
    this.prop.Position = "footer";
    this.prop.Caption = "Aceptar";
    this.prop.Capture = false;
    this.prop.Image = " /Iconos/svg/accept.svg";
    this.style.width = "64px";
    this.prop.TabIndex = 1;
  } // Fin constructor

  async click() {
    this.prop.Visible = false;
    const m = { tpy_tpy: this.Form.tpy_tpy.prop.Value };
    await use("vi_cap_cometap", m);
    console.log(
      "bt_aceptar=",
      await this.Sql.localAlaSql("select * from vi_cap_cometap")
    );

    await SQLExec(
      `select des_tdo,tdo_tdo from man_cometdo \
       where nmo_tdo>0 and  (select cop_nom from vi_cap_cometpy where tpy_tpy='${this.Form.tpy_tpy.prop.Value}')=cop_nom \ 
        union select '....No Hay' as des_tdo,'  ' as tdo_tdo  order by des_tdo  `,
      "cometdo"
    );
    //   if (View.vi_cap_cometap.recnoVal.length==0)
    //      await this.Form.Grid.appendRow(m)
    this.Form.Grid.prop.RecordSource = "";
    this.Form.Grid.prop.Visible = true;
    this.Form.Grid.prop.RecordSource = "vi_cap_cometap";
  }
}
