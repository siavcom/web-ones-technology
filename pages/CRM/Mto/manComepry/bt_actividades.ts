//////////////////////////////////////////////
// Clase : bt_actividades
// Author : Fernando Cuadras Angulo
// Creacion : 3 Noviembre 2023
/////////////////////////////////////////////
import { COMPONENT } from '@/classes/Component'
import MessageBox from '~/plugins/2.MessageBox'
////import { MessageBox } from '@/classes/Functions';
/**
 * //////////////////////////////////////////////
 *  @Clase : bt_actividades
 *  @Author : Fernando Cuadras Angulo
 *  @Creacion : 3 Noviembre 2023
 * /////////////////////////////////////////////
 * @export
 * @class bt_actividades
 * @extends {COMPONENT}
 */
export class bt_actividades extends COMPONENT {

  constructor() {
    super()

    this.prop.BaseClass = 'imgButton'
    this.prop.Position = 'footer'

    this.prop.Value = "Actividades"
    this.prop.Capture = false
    // this.prop.Image = "/Iconos/Accept.png";
    this.prop.Image = "/Iconos/svg/bx-calendar.svg"
    this.prop.Visible=false
    this.style.maxWidth='50px'

  } // Fin constructor

  async click() {
    this.prop.Disabled=true

    // lee tipos de actividades segun el tipo de proyecto

    const m={tpy_tpy:this.Form.tpy_tpy.prop.Value}
    await this.Form.db.use('vi_cap_cometap',m)
    this.Form.tap_tap.Grid.tap_tap.prop.RowSourceType = 2  //1-Value, 2-Alias,3-sql 5-Array

    m.num_pry=this.Form.num_pry.prop.Value

    // Lee la tabla de actividades que tiene este proyecto
    if( ! await this.Form.db.use('vi_cap_comeapy',m)) {
       alert('Open error table '+'vi_cap_comeapy' )
       return
    }
   this.Form.tap_tap.Grid.prop.RecordSource='vi_cap_comeapy'
   if (this.Form.db.View.vi_cap_comeapy.RecCount==0)
      await this.Form.tap_tap.Grid.appendRow()

   this.Form.tap_tap.prop.Disabled=false
   }

}