//////////////////////////////////////////////
// Clase : bt_gen_vista
// Author : Fernando Cuadras Angulo
// Creacion : Sep/2022
/////////////////////////////////////////////
import { COMPONENT } from '@/classes/Component'
export class bt_gen_vistas extends COMPONENT {

  constructor() {
    super()

    this.prop.BaseClass = 'imgButton'
    this.prop.Position = 'footer'
    this.prop.ToolTipText='Genera la vistas SQL Server'
    this.prop.Visible = false
    this.prop.Value = "Genera vistas"
    this.prop.TabIndex=4
    this.prop.Image = "/Iconos/svg/view-eye.svg"
    this.style.width='24px'

  } // Fin constructor

  // public click = async () => {
  async click() {
    if (this.prop.Disabled) return
    this.prop.Disabled = true

    if (await this.Form.bt_aceptar.grabaDatos('vi_cap_vis') && 
      await MessageBox('Continuamos con la generación de vistas Remotas de la tabla :'+this.Form.nom_tab.prop.Value, 4, '') == 6) {
      const error = await this.Form.db.genVistasSql(this.Form.nom_tab.prop.Value)
      if (error.length) 
        console.error('Error al generar/regenerar las vistas remotas de la tabla:'+this.Form.nom_tab.prop.Value)
    }
    this.prop.Disabled = false
    this.Form.grid_vistas.prop.Visible=true
    return
  }

}
