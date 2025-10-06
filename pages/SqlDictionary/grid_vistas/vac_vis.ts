//////////////////////////////////////////////
// Clase : vac_vis
// Descripcion : Vista remota de actualizaciònOrden de la vista remota
// Author : Fernando Cuadras Angulo
// Creacion : Mayo/2022
// Ult.Mod  03/Octubre/2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from '@/classes/Column'
// 


export class vac_vis extends COLUMN {

  //  constructor(parent: Record<string, never>) {
  constructor() {
    super()
    this.prop.Order = 1
    this.prop.ColumnTextLabel = 'Indice de busqueda/actualización'
    this.prop.BaseClass = 'editText'

    this.prop.ControlSource = 'vi_cap_comevis.vac_vis'
    this.prop.ToolTipText = 'Vista remota SQL de actualización'
    this.prop.Placeholder = "vista remota SQL"
    this.inputStyle.textTransform = 'lowercase'

    this.style.width = '140px'
  }

  public async valid() {

    if (await super.valid()) {
      if (this.prop.Value.trim() == '')
        return true

      const indice = this.prop.Value.trim()
      const ins_sql = `select key_pri from Now.vi_cap_comeind where trim(nom_ind)='${indice}'`
      const res = await this.Form.db.localAlaSql(ins_sql)

      // await this.Form.db.localAlaSql('select key_pri,nom_ind from Now.vi_cap_comeind'))

      console.log('vac_ind res=', res)
      if (res.length == 0) {
        this.prop.ErrorMessage = 'No existe el indice'
        //        this.prop.ShowError=true
        this.prop.Valid = false

        return false


      }
    }
    return true
  }

}
