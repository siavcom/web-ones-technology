//////////////////////////////////////////////
// Clase : bt_edit
// @author: Fernando Cuadras Angulo
// Creacion : Marzo/2023
/////////////////////////////////////////////
import { COMPONENT } from '@/classes/Component'
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
    this.prop.Caption = "Editar";
    this.prop.Capture = false;
    this.prop.Image = "/Iconos/svg/edit1-color.svg";
    this.prop.ToolTipText = 'Editar condicion'
    this.prop.Visible = false
    this.captionStyle.fontSize = '10px'
    this.style.width = '50px'


  } // Fin constructor

  async click(add?: boolean) {
    if (this.Parent.nco_que.prop.Value == 0)
      this.Parent.nco_que.prop.Value = 1

    this.prop.Visible = false
    //this.Parent.bt_add.prop.Visible = false
    const RecordSource = this.Parent.Grid.prop.RecordSource
    this.Parent.Grid.prop.Visible = false
    this.Parent.Grid.prop.RecordSource = ''

    // || this.Sql.db.View[this.Parent.Grid.prop.RecordSource].recCount==0

    /*
    const m = {
      prg_prg: this.Form.prop.Name,
      par_prg: this.Form.Params.par_prg ? this.Form.Params.par_prg : '',
      usu_que: this.Parent.usu_que,
      nco_que: this.Parent.nco_que.prop.Value
    }
*/
    const filter = {
      usu_que: this.Parent.usu_que,
      nco_que: this.Parent.nco_que.prop.Value
    }

    await localClone('vi_cap_db_query', RecordSource, filter)
    this.Parent.Grid.prop.RecordSource = RecordSource


    console.log('bt_edit alaSql recordSource=', this.Parent.Grid.prop.RecordSource,
      await localAlaSql(`select * from ${this.Parent.Grid.prop.RecordSource}`))

    console.log('bt_edit Fin')

    //this.Parent.activa.prop.Value=1
    this.Parent.query.prop.Visible = false
    this.Parent.Grid.prop.Visible = true
    this.Parent.bt_delete.prop.Visible = true
    this.Parent.bt_view.prop.Visible = true
    /*
        if (View[this.Parent.Grid.prop.RecordSource].recCount == 0) {
          this.Parent.nco_que.prop.sw_add = true
          await this.Parent.Grid.appendRow()
        }
    */


  }


}
