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
    this.prop.Image = "/Iconos/calendar-date.svg" //bx-calendar.svg"
    this.prop.Visible=false
    this.style.maxWidth='100px'

  } // Fin constructor

  async click() {
    this.prop.Visible=false

    // lee tipos de actividades segun el tipo de proyecto
    const m={tpy_tpy:this.Form.tpy_tpy.prop.Value}
    await this.Form.db.use('vi_cap_cometap',m)

    this.Form.tap_tap.Grid.tap_tap.prop.RowSourceType = 2  //1-Value, 2-Alias,3-sql Remote,4-Sql local 5-Array
    this.Form.tap_tap.Grid.tap_tap.prop.RowSource = "vi_cap_cometap.des_tap,tap_tap"

    m.num_pry=this.Form.num_pry.prop.Value

    // Lee la tabla de actividades que tiene este proyecto

    if( ! await this.Form.db.use('vi_cap_comeapy',m)) {
       alert('Open error table '+'vi_cap_comeapy' )
       return
    }
    console.log('bt_actividades vi_cap_cometap=',await this.Form.db.localAlaSql('select * from vi_cap_cometap'),' num_pry=',m.num_pry)

    console.log('bt_actividates ',await this.Form.db.localSql('select * from Now.vi_cap_comeapy'))
   this.Form.tap_tap.Grid.prop.RecordSource='vi_cap_comeapy'
   if (this.Form.db.View.vi_cap_comeapy.RecCount==0)
      await this.Form.tap_tap.Grid.appendRow()

   this.Form.tap_tap.prop.Disabled=false
   this.Form.tap_tap.prop.Visible=true

}

}