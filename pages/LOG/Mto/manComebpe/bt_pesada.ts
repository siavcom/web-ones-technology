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
    this.prop.Visible = false;
  } // Fin constructor

  async click() {
    this.prop.Visible = false;
    if (this.Form.pe1_bpe.prop.Value == 0) {
      this.Form.pe2_bpe.prop.Visible = false;
      this.Form.tp2_bpe.prop.Visible = false;
      // Lee node bascula
      this.Form.pe1_bpe.prop.Value = parseInt(Math.random() * 10000); //Solo obtiene los enteros
      this.Form.tp1_bpe.prop.Value = await currentTime();
      if (
        (await MessageBox(
          "Pesada 1 =" + this.Form.pe1_bpe.prop.Value,
          4,
          "Correcto ?"
        )) != 6
      ) {
        MessageBox("Pesada cancelada");
        this.Form.pe2_bpe.prop.Value = 0;
        this.prop.Visible = true;
        return;
      }
    } else {
      if (this.Form.pe2_bpe.prop.Value > 0)
        // ya no se puede volver a pesar
        return;
      this.Form.pe2_bpe.prop.Value = parseInt(Math.random() * 10000); //Solo obtiene los enteros
      this.Form.tp2_bpe.prop.Value = await currentTime();

      if (
        (await MessageBox(
          "Pesada 2 =" + this.Form.pe2_bpe.prop.Value,
          4,
          "Correcto ?"
        )) != 6
      ) {
        MessageBox("Pesada cancelada");
        this.Form.pe2_bpe.prop.Value = 0;
        this.prop.Visible = true;
        return;
      }
    }

    await this.Form.bt_graba.click();
    this.Form.bpe_bpe.setFocus();
    return;
  }
}
