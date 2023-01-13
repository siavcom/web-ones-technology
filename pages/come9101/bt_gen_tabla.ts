//////////////////////////////////////////////
// Clase : bt_gen_tabla
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
    this.prop.ToolTipText='Genera la tabla en el SQL Server'
    this.prop.Visible = false
    this.prop.Value = "Genera Tabla"
    this.prop.Capture = false
    this.prop.TabIndex=4
    //this.prop.Image = "/Iconos/Accept.png"
    this.prop.Image = "/Iconos/svg/bx-check-circle.svg"
    
  } // Fin constructor

  // public click = async () => {
  async click() {
    if (this.prop.Disabled) return
    this.prop.Disabled = true

    if (await this.Form.grabaDatos('vi_cap_dat') && await MessageBox('Continuamos con la generación de la tabla en el SQL Server:'+this.Form.nom_tab.prop.Value, 4, '') == 6) {
      const error = await this.Form.db.genTabla(this.Form.nom_tab.prop.Value)
      if (error.length) 
        console.error('Error al generar/regenerar la tabla:'+this.Form.nom_tab.prop.Value)
    }
    this.Form.grid_datos.prop.Visible = true
    this.prop.Disabled = false

    return
  }

}
