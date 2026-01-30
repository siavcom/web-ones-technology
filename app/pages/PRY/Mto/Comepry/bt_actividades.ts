import { COMPONENT } from "@/classes/Component";

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
export class bt_actividades extends IMGBUTTON {
  constructor() {
    super();

    this.prop.Caption = "Actividades";
    this.prop.Capture = false;
    this.prop.BaseClass = "imgButton";
    this.prop.Position = "footer";
    this.prop.Image = "/Iconos/svg/calendar-date.svg"; //bx-calendar.svg"
    this.prop.Visible = false;
    this.style.maxWidth = "92px";
  } // Fin constructor

  override async click() {
    this.prop.Visible = false;
    this.Form.bt_save.prop.Visible = false;
    this.Form.bt_delete.prop.Visible = false;
    this.Form.bt_modify.prop.Visible = false;

    const main = this.Form.main;
    this.Form.showComponents(false);

    // grid tipo de actividades
    //this.Form.grid_tap.Grid.tap_tap.prop.RowSourceType = 0; //1-Value, 2-Alias,3-sql Remote,4-Sql local 5-Array
    // this.Form.grid_tap.prop.Disabled = false

    this.Form.grid_actividades.prop.RecordSource = ''
    this.Form.grid_actividades.tap_tap.prop.RowSourceType = 0; //1-Value, 2-Alias,3-sql Remote,4-Sql local 5-Array

    // lee tipos de actividades segun el tipo de proyecto

    const m = {
      tpy_tpy: this.Form.tpy_tpy.prop.Value,
      num_pry: this.Form.num_pry.prop.Value,
      per_apy: this.Form.per_apy.prop.Value
    };

    await use("vi_cap_cometap", m);

    // Lee la tabla de actividades que tiene este proyecto


    const res = await use("vi_cap_comeapy", m)
    console.log('bt_actividades vi_cap_apy=', res)
    if (!res) {
      alert("Open error table " + "vi_cap_comeapy");
      return;
    }
    /*
        // Si no tiene registro la Vista local
        console.log("Actividades view=", await this.Sql.localAlaSql('SELECT * FROM vi_cap_comeapy'));
        if (this.Sql.View.vi_cap_comeapy.RecCount == 0) {
          MessageBox("No tiene actividades en este periodo");
          return;
        }
    */

    //console.log("Actividades view=", await this.Sql.localAlaSql('SELECT * FROM vi_cap_comeapy'));

    this.Form.grid_actividades.prop.RecordSource = "vi_cap_comeapy";

    this.Form.grid_actividades.tap_tap.prop.RowSourceType = 4; //1-Value, 2-Alias,3-sql Remote,4-Sql local 5-Array
    this.Form.grid_actividades.prop.Visible = true;
    this.Form.grid_actividades.prop.ReadOnly = false;
    console.log('bt_actividades grid_actividades ReadOnly=', this.Form.grid_actividades.prop.ReadOnly)
  }
}
