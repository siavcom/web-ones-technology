import { COMPONENT } from "@/classes/Component";

/**
 * //////////////////////////////////////////////
 *  @Clase : bt_pesada
 *  @Author : Fernando Cuadras Angulo
 *  @Descripcion : Lee la pesada de la bascula
 *  @Creacion : 6 Enero 2024
 * /////////////////////////////////////////////
 * @export
 * @class bt_actividades
 * @extends {COMPONENT}
 */
export class bt_pesada extends COMPONENT {
  constructor() {
    super();

    this.prop.Value = "Leer pesada";
    this.prop.Capture = false;
    this.prop.BaseClass = "imgButton";
    this.prop.Position = "footer";
    this.prop.Image = "/Iconos/svg/vehicle-weight-truck.svg";

    this.style.maxWidth = "100px";
    this.prop.Disabled = true;
  } // Fin constructor

  async click() {
    if (this.Form.Recno == 0) {
      this.Form.pe2_bpe.prop.Visible = false;
      this.Form.tp2_bpe.prop.Visible = false;
      // Lee node bascula
      this.Form.pe1_bpe.prop.Value = Math.random() * 10000;
      this.Form.tp1_bpe.prop.Value = new Date();
    } else {
      if (this.Form.pe2_bpe.prop.Value > 0)
        // ya no se puede volver a pesar
        return;
      this.Form.pe2_bpe.prop.Value = Math.random() * 10000;
      this.Form.tp2_bpe.prop.Value = new Date();
    }
    this.Form.bt_graba.click();
  }
}
