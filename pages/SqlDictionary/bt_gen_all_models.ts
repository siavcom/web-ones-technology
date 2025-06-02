//////////////////////////////////////////////
// Clase : bt_gen_tabla
// Author : Fernando Cuadras Angulo
// Creacion : Sep/2022
/////////////////////////////////////////////

import { COMPONENT } from '@/classes/Component'
export class bt_gen_all_models extends COMPONENT {

  constructor() {
    super()

    this.prop.BaseClass = 'imgButton'
    this.prop.Position = 'footer'
    this.prop.Caption = " Sequelize MODELS"
    this.prop.ToolTipText = 'Genera todos sequelize MODEL en Back-End-Server'
    this.prop.Visible = false
    this.prop.Value = "All MODELS"
    this.prop.TabIndex = 1
    this.prop.Image = "/Iconos/svg/data-modelling.svg"
    this.style.width = "92px";

  } // Fin constructor


  async click() {

    if (await MessageBox('Generamos sequelize MODELS de todas las tablas', 4, '') == 6) {
      const error = await this.Form.db.genModel('ALL')
      if (error.length)
        console.error('Error al generar todos los sequalize MODELS ', this.Form.nom_tab.prop.Value)
    }
    this.prop.Disabled = false

    return
  }



}
