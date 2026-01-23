//////////////////////////////////////////////
// Clase : bt_gen_tabla
// @author: Fernando Cuadras Angulo
// Creacion : Sep/2022
// Ult. Mod: 15/Mayo/2023
/////////////////////////////////////////////


export class bt_gen_model extends IMGBUTTON {

  constructor() {
    super()

    this.prop.BaseClass = 'imgButton'
    this.prop.Position = 'footer'
    this.prop.Visible = false
    this.prop.Caption = "Actualiza Sequelize MODEL"
    this.prop.ToolTipText = 'Generate/Update SEQUELIZE`S MODEL'
    this.prop.TabIndex = 1
    this.prop.Image = "/Iconos/svg/data-modelling.svg"
    this.style.width = "79px";

  } // Fin constructor

  // public click = async () => {
  async click() {
    if (this.prop.Disabled) return
    this.prop.Disabled = true


    if (await this.Form.bt_aceptar.grabaDatos('vi_cap_comedat') && await MessageBox('Continuamos con la generación del sequelize MODEL ' + this.Form.nom_tab.prop.Value, 4, '') == 6) {
      const error = await genModel(this.Form.nom_tab.prop.Value)
      if (error.length)
        console.error('Error al generar/regenerar MODEL ', this.Form.nom_tab.prop.Value)
    }
    this.prop.Disabled = false


    return
  }

}
