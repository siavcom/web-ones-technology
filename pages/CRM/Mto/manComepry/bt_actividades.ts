import { COMPONENT } from "@/classes/Component";
import MessageBox from "~/plugins/2.MessageBox";

/**
 * //////////////////////////////////////////////
 *  @Clase : bt_actividades
 *  @Author : Fernando Cuadras Angulo
 *  @Descripcion : Muestra las actividades del proyecto
 *  @Creacion : 3 Noviembre 2023
 * /////////////////////////////////////////////
 * @export
 * @class bt_actividades
 * @extends {COMPONENT}
 */
export class bt_actividades extends COMPONENT {
  constructor() {
    super();

    this.prop.Value = "Actividades";
    this.prop.Capture = false;
    this.prop.BaseClass = "imgButton";
    this.prop.Position = "footer";
    this.prop.Image = "/Iconos/calendar-date.svg"; //bx-calendar.svg"
    this.prop.Visible = false;
    this.style.maxWidth = "100px";
  } // Fin constructor

  async click() {
    this.prop.Visible = false;
    this.Form.bt_graba.prop.Visible = false;
    this.Form.bt_borra.prop.Visible = false;

    const main = this.Form.main;
    for (let i = 0; i < main.length; i++) {
      // apagamos
      if (
        this.Form[main[i]].prop.Capture &&
        !this.Form[main[i]].prop.updateKey
      ) {
        this.Form[main[i]].prop.Visible = false;
      }
    }

    // lee tipos de actividades segun el tipo de proyecto
    const m = { tpy_tpy: this.Form.tpy_tpy.prop.Value };
    await this.Form.db.use("vi_cap_cometap", m);

    this.Form.grid_tap.Grid.tap_tap.prop.RowSourceType = 2; //1-Value, 2-Alias,3-sql Remote,4-Sql local 5-Array
    this.Form.grid_tap.Grid.tap_tap.prop.RowSource =
      "vi_cap_cometap.des_tap,tap_tap";

    m.num_pry = this.Form.num_pry.prop.Value;
    m.per_apy = this.Form.per_apy.prop.Value;

    // Lee la tabla de actividades que tiene este proyecto

    if (!(await this.Form.db.use("vi_cap_comeapy", m))) {
      alert("Open error table " + "vi_cap_comeapy");
      return;
    }

    // Si no tiene registro la Vista local
    console.log("Actividades view=", this.Sql.View.vi_cap_comeapy);
    if (this.Sql.View.vi_cap_comeapy.RecCount == 0) {
      MessageBox("No tiene actividades en este periodo");
      return;
    }
    this.Form.grid_tap.Grid.prop.RecordSource = "vi_cap_comeapy";

    //  if (this.Sql.View.vi_cap_comeapy.RecCount==0)
    //     await this.Form.grid_tap.Grid.appendRow()

    this.Form.grid_tap.prop.Disabled = false;
    this.Form.grid_tap.prop.Visible = true;
  }
}
