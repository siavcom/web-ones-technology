//////////////////////////////////////////////
// Clase : bt_gen_vista
// Author : Fernando Cuadras Angulo
// Creacion : Sep/2022
/////////////////////////////////////////////

export class bt_gen_vistas extends IMGBUTTON {
  constructor() {
    super();

    this.prop.BaseClass = "imgButton";
    this.prop.Position = "footer";
    this.prop.ToolTipText = "Generate/Update SQL-Server views";
    this.prop.Visible = false;
    this.prop.Caption = "Actualiza SQLServer views";
    this.prop.TabIndex = 4;
    this.prop.Image = "/Iconos/svg/view-eye.svg";
    this.style.width = "64px";
  } // Fin constructor

  // public click = async () => {
  async click() {
    if (this.prop.Disabled) return;
    this.prop.Disabled = true;

    await this.Form.bt_aceptar.grabaDatos("vi_cap_comevis");
    const vistas = await localAlaSql("select nom_vis from vi_cap_comevis");

    for (let i = 0; i < vistas.length; i++) {
      if (await MessageBox("Geneneramos la vista " + vistas[i].nom_vis + " en SQL Server de la tabla :" +
        this.Form.nom_tab.prop.Value, 4, "") == 6) {
        const error = await genVistasSql(this.Form.nom_tab.prop.Value, vistas[i].nom_vis);
        if (error && error.length)
          console.error(
            "Error al generar la vista remotas de la tabla:" +
            this.Form.nom_tab.prop.Value + ' ' + error
          );
      }
    }
    this.prop.Disabled = false;

    return;
  }
}
