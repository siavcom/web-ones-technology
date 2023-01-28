//////////////////////////////////////////////
// Clase : bt_gen_tabla
// Author : Fernando Cuadras Angulo
// Creacion : Sep/2022
/////////////////////////////////////////////
import { COMPONENT } from '@/classes/Component'
//import { MessageBox } from '@/classes/Functions';

export class BT_GEN_MODEL extends COMPONENT {

  constructor() {
    super()

    this.prop.BaseClass = 'imgButton'
    this.prop.Position = 'footer'
    this.prop.ToolTipText='Genera el MODEL para sequalize en el backEnd Server'
    this.prop.Visible = false
    this.prop.Value = "Genera MODEL"
    this.prop.TabIndex=1
    this.prop.Image = "/Iconos/svg/bx-check-circle.svg"

  } // Fin constructor

  // public click = async () => {
  async click() {
    if (this.prop.Disabled) return
    this.prop.Disabled = true
    await this.Form.grabaDatos('vi_cap_ind')

    if (await MessageBox('Continuamos con la generación del MODEL del indice:'+this.Form.nom_tab.prop.Value, 4, '') == 6) {
      const error = await this.Form.db.genModel(this.Form.nom_tab.prop.Value)
      if (error.length) 
        console.error('Error al generar/regenerar MODEL del indice:',this.Form.nom_tab.prop.Value)
    }
    this.prop.Disabled = false
    
    return
  }

}
