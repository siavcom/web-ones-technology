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
 
    if (await super.valid()) {
      if (this.prop.Value==null || this.prop.Value.trim() == '') {
        this.prop.ErrorMessage='Dato en blanco'
        return false
      }
      const indice=this.prop.Value.trim()
      const ins_sql=`select key_pri from Now.vi_cap_ind where trim(nom_ind)='${indice}'`
      
      const res = await this.Form.db.localAlaSql(ins_sql)

     // console.log('vac_vis  valid indice ===>',indice,
     // await this.Form.db.localAlaSql('select key_pri,nom_ind from Now.vi_cap_ind'))


      if (res.length==0){
        this.prop.ErrorMessage='No existe el indice'
//        this.prop.ShowError=true
        this.prop.Valid=false

        return false


      }  
    }
    return true
  }

}
