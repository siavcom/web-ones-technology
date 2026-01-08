import { COMPONENT } from "@/classes/Component";

/**
 * //////////////////////////////////////////////
 *  @Clase : bt_clonar
 *  @Author : Fernando Cuadras Angulo
 *  @Descripcion : Muestra el grid de captura de la cotizacion
 *  @Creacion : 9 Abril 2023
 * /////////////////////////////////////////////
 * @export
 * @class bt_actividades
 * @extends {COMPONENT}
 */
export class bt_clonar extends IMGBUTTON {
  constructor() {
    super();

    this.prop.Caption = "Clona cotización ";
    this.prop.Capture = false;
    this.prop.BaseClass = "imgButton";
    this.prop.Position = "footer";
    this.prop.Image = "/Iconos/svg/clone.svg"; //bx-calendar.svg"
    this.prop.Visible = false;
    this.style.width = "70px";
    this.inputStyle.width = "50px";

  } // Fin constructor

  async click() {

    if (!await this.Form.grid_comecpy.whenVta())
      return

    this.prop.Visible = false;
    const m = {
      tpy_tpy: this.Form.tpy_tpy.prop.Value,
      num_pry: this.Form.num_pry.prop.Value,
      ver_cpy: this.Form.ver_cpy.prop.Value,
    };

    await this.Sql.use('vi_cap_comecpy', m)
    let data = await this.Sql.localAlaSql(`select * from vi_cap_comecpy  `)
    if (data.length == 0) {
      await MessageBox("No tiene partidas esta cotizacion para clonar")
      return
    }
    if (await MessageBox('Quieres clonar la presente cotizacion', 4, '') != 6) {
      this.prop.Visible = true;
      return
    }
    data = await SQLExec(`         
      select max(ver_cpy) as ver_cpy from vi_cap_comecpy where tpy_tpy='${this.Form.tpy_tpy.prop.Value}' \
      and num_pry=${this.Form.num_pry.prop.Value}`);
    m.ver_cpy = data[0].ver_cpy + 1
    // Actualizamos el numero de versión de la cotización
    const res = await SQLExec(`update man_comepry set ver_cpy=${m.ver_cpy} where tpy_tpy='${m.tpy_tpy}' and num_pry=${m.num_pry} `)
    if (!res)
      return;

    await this.Sql.localSql(`update vi_cap_comecpy set key_pri=0,ver_cpy=${m.ver_cpy}`)
    this.Form.ver_cpy.prop.Value = m.ver_cpy
    this.Form.grid_comecpy.prop.RecordSource = "vi_cap_comecpy";
    this.Form.grid_comecpy.prop.Visible = true;
    MessageBox("Cotizacion clonada")




    // 
  }
}
