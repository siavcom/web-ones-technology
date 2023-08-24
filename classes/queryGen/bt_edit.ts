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
    this.Parent.bt_add.prop.Visible=false

   // || this.Form.db.View[this.Parent.Grid.prop.RecordSource].recCount==0

   const m = {
    prg_prg: this.Form.Name,
    par_prg: this.Form.Params.par_prg ? this.Form.Params.par_prg : '',
    usu_que: this.Parent.usu_que,
    ren_que: 1,
    nco_que: this.Parent.nco_que.prop.Value
  }

   if (add ){
      this.Parent.nco_que.prop.sw_add=true
      const data = await this.Form.db.execute(`select max(nco_que)+1 as max_que from man_query_db \
      where prg_prg='${m.prg_prg}' and par_prg='${m.par_prg}' \
         and usu_que='${m.usu_que}' `)
         m.nco_que=1 
        if (data[0] && data[0].max_que && data[0].max_que != null) {
          m.nco_que = data[0].max_que
        } 
         this.Parent.nco_que.prop.Value = m.nco_que
      }  

    const filter = {
      usu_que: this.Parent.usu_que,
      nco_que: this.Parent.nco_que.prop.Value
    }
 
   // if (this.Form.db.View[this.Parent.Grid.prop.RecordSource])
   //     await this.Form.db.useNodata(this.Parent.Grid.prop.RecordSource)
   // else    
    await this.Form.db.localClone('vi_cap_query_db', this.Parent.Grid.prop.RecordSource, filter)

    if (this.Form.db.View[this.Parent.Grid.prop.RecordSource].recCount==0){
      await this.Parent.Grid.appendRow(m)
    }
    this.Parent.query.prop.Visible=false 
    this.Parent.Grid.prop.Visible = true
//    this.Parent.bt_delete.prop.Visible=true

}


}
