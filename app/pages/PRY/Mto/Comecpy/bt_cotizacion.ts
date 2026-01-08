import { COMPONENT } from "@/classes/Component";
/**
 * //////////////////////////////////////////////
 *  @Clase : bt_cotizacion
 *  @Author : Fernando Cuadras Angulo
 *  @Descripcion : Muestra el grid de captura de la cotizacion
 *  @Creacion : 9 Abril 2023
 * /////////////////////////////////////////////
 * @export
 * @class bt_actividades
 * @extends {COMPONENT}
 */
export class bt_cotizacion extends IMGBUTTON {
  constructor() {
    super();

    this.prop.Caption = "Cotización";
    this.prop.Capture = false;
    this.prop.BaseClass = "imgButton";
    this.prop.Position = "footer";
    this.prop.Image = "/Iconos/svg/order-quote.svg"; //bx-calendar.svg"
    this.prop.Visible = false;
    this.style.width = "76px";
  }

  override async click() {
    this.prop.Visible = false;
    // this.Form.bt_save.prop.Visible = false;
    // this.Form.bt_delete.prop.Visible = false;

    // lee tipos de actividades segun el tipo de proyecto
    //    if (this.Parent.est_cpy.prop.Value == 'AU') { // Si ya esta autorizado, nadie lo modifica
    //      return

    //    }

    const m = {
      tpy_tpy: this.Form.tpy_tpy.prop.Value,
      num_pry: this.Form.num_pry.prop.Value,
      ver_cpy: this.Form.ver_cpy.prop.Value,
    };

    const res = await SQLExec(`update man_comepry set ver_cpy=${m.ver_cpy} where tpy_tpy='${m.tpy_tpy}' and num_pry=${m.num_pry} `)

    if (!res)
      return;


    await this.Sql.use('vi_cap_comecpy', m)

    this.Form.grid_comecpy.prop.RecordSource = "vi_cap_comecpy";
    this.Form.grid_comecpy.prop.Visible = true;

    if (!this.Form.bt_clonar.prop.Disabled)
      this.Form.bt_clonar.prop.Visible = true

    if (!this.Form.bt_pdf.prop.Disabled)
      this.Form.bt_pdf.prop.Visible = true
    // 
  }
}
