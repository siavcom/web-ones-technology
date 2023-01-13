//////////////////////////////////////////////
// Clase : bt_gen_inidices
// Author : Fernando Cuadras Angulo
// Creacion : Sep/2022
/////////////////////////////////////////////
import { COMPONENT } from '@/classes/Component'
import { MessageBox } from '@/classes/Functions';

export class BT_GEN_INDICES extends COMPONENT {

  constructor() {
    super()

    this.prop.BaseClass = 'imgButton'
    this.prop.Position = 'footer'
    this.prop.ToolTipText='Genera los indices en el SQL Server'
    this.prop.Visible = false
    this.prop.Value = "Genera Indices"
    this.prop.Capture = false
    this.prop.TabIndex=4
    this.prop.Image = "/Iconos/svg/bx-check-circle.svg"

  } // Fin constructor

  // public click = async () => {
  async click() {
    if (this.prop.Disabled) return
    this.prop.Disabled = true

    if (await this.Form.grabaDatos('vi_cap_ind') && await MessageBox('Continuamos con la generación de indices de la tabla:'+this.Form.nom_tab.prop.Value, 4, '') == 6) {
      const error = await this.Form.db.genIndices(this.Form.nom_tab.prop.Value)
      if (error.length) 
        console.error('Error al generar/regenerar indices de la tabla:'+this.Form.nom_tab.prop.Value)
    }
    this.Form.grid_indices.prop.Visible = true
    this.prop.Disabled = false

    return
  }

}
