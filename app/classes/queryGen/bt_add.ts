//////////////////////////////////////////////
// Clase : bt_add
// @author: Fernando Cuadras Angulo
// Creacion : Marzo/2023
/////////////////////////////////////////////
import { COMPONENT } from '@/classes/Component'
/**
*
*
* @export
* @class bt_add
* @extends {COMPONENT}
*/
export class bt_add extends COMPONENT {

  constructor() {
    super()
    this.Index = 1
    this.prop.BaseClass = 'imgButton'
    this.prop.Caption = 'Condición'
    this.prop.Position = 'footer'
    this.prop.Image = "/Iconos/svg/add-color.svg";
    this.prop.ToolTipText = 'Nueva condicion'

    this.captionStyle.fontSize = '10px'
    this.style.width = '30px'

  } // Fin constructor

  override async click() {
    //this.prop.Visible = false
    this.Parent.nco_que.prop.sw_add = true
    const m = {}

    m.nco_que = this.Parent.nco_que.prop.Value
    m.prg_prg = this.Form.prop.Name
    m.par_prg = this.Form.Params.par_prg ? this.Form.Params.par_prg : ''
    m.usu_que = this.Parent.usu_que

    m.con_que = '='
    m.cam_dat = this.Form.var_ord.prop.Value
    m.vis_rep = this.Form.vis_rep


    const data = await SQLExec(`select max(nco_que)+1 as max_que from man_db_query \
      where prg_prg='${m.prg_prg}' and par_prg='${m.par_prg}' \
         and usu_que='${m.usu_que}' `)
    m.nco_que = 1
    if (data[0] && data[0].max_que && data[0].max_que != null) {
      m.nco_que = data[0].max_que
    }
    this.Parent.nco_que.prop.Value = m.nco_que

    return this.Parent.bt_edit.click(true) // se pone en true para sumar nueva condicion

    //    this.Parent.bt_edit.prop.Visible = false
    /*
      const m = {
      prg_prg: this.Form.Name,
      par_prg: this.Form.Params.par_prg ? this.Form.Params.par_prg : '',
      usu_que: this.Parent.usu_que,
      ren_que: 1,
      nco_que: this.Parent.nco_que.prop.Value
    }

    const db = this.Form.db
    const data = await db.execute(`select nco_que from man_db_query \
                            where prg_prg='${m.prg_prg}' and par_prg='${m.par_prg}' \
                               and usu_que='${m.usu_que}' and nco_que=${m.nco_que} `)
    if (data[0].nco_que == m.nco_que) {

      const data = await db.execute(`select max(nco_que)+1 as max_que from man_db_query \
                            where prg_prg='${m.prg_prg}' and par_prg='${m.par_prg}' \
                               and usu_que='${m.usu_que}' `)

      if (data[0] && data[0].max_que && data[0].max_que != null) {
        m.nco_que = data[0].max_que
      }
    }
    this.Parent.nco_que.prop.Value = m.nco_que
    console.log('bt_add nco_que==', m.nco_que, this.Parent.nco_que.prop.Value)


    const filter = {
      usu_que: this.Parent.usu_que,
      nco_que: this.Parent.nco_que.prop.Value
    }
    await  localClone('vi_cap_db_query', this.Parent.prop.RecordSource, filter)

    await this.Parent.table.appendRow(m)
    this.Parent.table.prop.Visible = true
    */
  }


}
