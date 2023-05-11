//////////////////////////////////////////////
// Clase : bt_edit
// Author : Fernando Cuadras Angulo
// Creacion : Marzo/2023
/////////////////////////////////////////////
import { COMPONENT } from '@/classes/Component'
////import { MessageBox } from '@/classes/Functions';
/**
 *
 *
 * @export
 * @class BT_ACEPTAR
 * @extends {COMPONENT}
 */
export class bt_edit extends COMPONENT {

  constructor() {
    super()
    this.Index = 1
    this.prop.BaseClass = 'imgButton'
    this.prop.Position = 'footer'
    //this.prop.Value = "Editar";
    this.prop.Capture = false;
    this.prop.Image = "/Iconos/svg/edit1-color.svg";
    this.prop.ToolTipText='Edita'
    this.prop.Visible=false

    this.style.fontSize='10px'
    this.style.width='30px'


  } // Fin constructor

  async click(add?:boolean) {
    if (this.Parent.nco_que.prop.Value==0)
        this.Parent.nco_que.prop.Value=1

    this.prop.Visible=false  
 
    const filter = {
      usu_que: this.Parent.prop.usu_que,
      nco_que: this.Parent.nco_que.prop.Value
    }
 
   // if (this.Form.db.View[this.Parent.table.prop.RecordSource])
   //     await this.Form.db.useNodata(this.Parent.table.prop.RecordSource)
   // else    
    await this.Form.db.localClone('vi_cap_query_db', this.Parent.table.prop.RecordSource, filter)

    console.log('bt_edit click filter View',filter,this.Form.db.View[this.Parent.table.prop.RecordSource] )

    if (add || this.Form.db.View[this.Parent.table.prop.RecordSource].recCount==0){

      const m = {
        prg_prg: this.Form.prop.Name,
        par_prg: this.Form.Params.par_prg ? this.Form.Params.par_prg : '',
        usu_que: this.Parent.prop.usu_que,
        ren_que: 1,
        nco_que: this.Parent.nco_que.prop.Value
      }
      const data = await this.Form.db.execute(`select max(nco_que)+1 as max_que from man_query_db \
      where prg_prg='${m.prg_prg}' and par_prg='${m.par_prg}' \
         and usu_que='${m.usu_que}' `)

        if (data[0] && data[0].max_que && data[0].max_que != null) {
          m.nco_que = data[0].max_que
        } 
        console.log('bt_edit  click append Rowfilter m ',filter ,m)
        await this.Parent.table.appendRow(m)
        this.Parent.nco_que.prop.Value = m.nco_que
      }  
    
    this.Parent.table.prop.Visible = true
//    this.Parent.bt_delete.prop.Visible=true
    this.Parent.query.prop.Visible = false

}


}
