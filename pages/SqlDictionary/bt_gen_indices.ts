//////////////////////////////////////////////
// Clase : bt_gen_inidices
// Author : Fernando Cuadras Angulo
// Creacion : Sep/2022
/////////////////////////////////////////////
import { COMPONENT } from "@/classes/Component";
export class bt_gen_indices extends COMPONENT {
  constructor() {
    super();

    this.prop.BaseClass = "imgButton";
    this.prop.Position = "footer";
    this.prop.ToolTipText = "Genera los indices en el SQL Server";
    this.prop.Visible = false;
    this.prop.Value = "Genera Indices";
    this.prop.Capture = false;
    this.prop.Image = "/Iconos/svg/index.svg";
    this.style.width = "24px";
  } // Fin constructor

  // public click = async () => {
  async click() {
    if (this.prop.Disabled) return;
    this.prop.Disabled = true;

    await this.Form.bt_aceptar.grabaDatos("vi_cap_ind");
    const indices = await this.Form.db.localAlaSql(
      "select nom_ind from vi_cap_ind"
    );

    for (let i = 0; i < indices.length; i++) {
      if (
        (await MessageBox(
          "Geneneramos el indice " +
            indices[i].nom_ind +
            " en SQL Server de la tabla :" +
            this.Form.nom_tab.prop.Value,
          4,
          ""
        )) == 6
      ) {
        const error = await this.Form.db.genIndices(
          this.Form.nom_tab.prop.Value,
          indices[i].nom_ind
        );
        if (error.length)
          console.error(
            "Error al generar/regenerar indices de la tabla:" +
              this.Form.nom_tab.prop.Value
          );
      }
    }
    this.Form.grid_indices.prop.Visible = true;
    this.prop.Disabled = false;

    return;
  }
}
