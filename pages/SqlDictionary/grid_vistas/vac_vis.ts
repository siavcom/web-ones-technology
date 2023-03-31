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
////import { MessageBox } from '@/classes/Functions'


export class vac_vis extends COLUMN {

  //  constructor(parent: Record<string, never>) {
  constructor() {
    super()
    this.prop.Order = 1
    this.textLabel = 'Indice de actualización'
    this.prop.BaseClass = 'editText'

    this.prop.ControlSource = 'vi_cap_vis.vac_vis'
    this.prop.ToolTipText = 'Vista remota SQL de actualización'
    this.prop.Placeholder = "vista remota SQL"
    this.prop.componentStyle.textTransform = 'lowercase'

    this.style.width = '200px'
  }

  public async valid() {
    console.log('vac_vis valid ', this.prop.Value)

    if (await super.valid()) {
      if (this.prop.Value.trim() == '') {
        this.prop.ErrorMessage='Dato en blanco'
        this.prop.ShowError=true
        this.prop.Valid=false
        return false
      }
      const ins_sql=`select key_pri from vi_cap_ind where nom_ind='${this.prop.Value.trim()}'`
      
      const res = await this.Form.db.localAlaSql(ins_sql)

      console.log('vac_vis localSql ===>',ins_sql,res)


      if (res.length==0){
        this.prop.ErrorMessage='No existe este indice'
        this.prop.ShowError=true
        this.prop.Valid=false
        return false


      }  console.log('vac_vis res ===>', res)
      return true
    }
    return false
  }

}
