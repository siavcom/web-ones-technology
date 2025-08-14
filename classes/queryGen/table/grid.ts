//////////////////////////////////////////////
// BaseClass : Grid
// Class : table
// Description : Equipo
// Author : El Fer Blocks
// Creation : 2023-03-13
// Update Date  : 9/Julio/2023
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { GRID } from '@/classes/Grid'

////////////////////////////////
// Columns 
////////////////////////////////
import { ren_que } from './ren_que'
import { pai_que } from './pai_que'
import { cam_dat } from './cam_dat'

import { con_que } from './con_que'
import { val_que } from './val_que'
import { pad_que } from './pad_que'
import { uni_que } from './uni_que'


export class Grid extends GRID {
  public ren_que = new ren_que()
  public pai_que = new pai_que()
  public cam_dat = new cam_dat()
  public con_que = new con_que()
  public val_que = new val_que()
  public pad_que = new pad_que()
  public uni_que = new uni_que()

  constructor() {
    super()

    this.prop.Capture = false;
    this.prop.Valid = false;
    this.prop.Position = 'main'
    this.prop.RecordSource = ''
    this.prop.Visible = true
    this.prop.Caption = ''
    this.prop.autoLoad = false  // se pone en falso para que no inicialice la tabla

    this.style.fontSize = '16px'
    this.style.color = 'green'
    this.style.backgroundColor = 'white'

  }

  override async appendRow(m?: {}) {
    if (!m) m = {}

    this.Parent.nco_que.prop.sw_add = true

    m.nco_que = this.Parent.nco_que.prop.Value
    m.prg_prg = this.Form.prop.Name
    m.par_prg = this.Form.Params.par_prg ? this.Form.Params.par_prg : ''
    m.usu_que = this.Parent.usu_que
    m.ren_que = 1
    m.con_que = '='
    m.cam_dat = this.Form.var_ord.prop.Value
    m.vis_rep = this.Form.vis_rep

    const db = this.Form.db

    const data = await db.localAlaSql(`select max(ren_que)+1 as max_ren from ${this.prop.RecordSource} `)

    if (data[0] && data[0].max_ren && data[0].max_ren != null)
      m.ren_que = data[0].max_ren

    await super.appendRow(m)

  }

  //////////////////////////////////
  // Graba Tabla
  /////////////////////////////////
  override async grabaTabla() {
    let resultado = false

    //  console.log('grabaTabla ala ===>', await localAlaSql(`select * from ${this.prop.RecordSource}`))

    if (await super.grabaTabla()) {
      await this.Form.openFilters() // actualiza la visa de querys

      /*  const m = {
          prg_prg: this.Form.prop.Name,
          par_prg: this.Form.Params.par_prg ? this.Form.Params.par_prg : '',
        }
     */
      //  await  use('vi_cap_db_query', m) // todos los querys del reporte

      resultado = true
    }
    return resultado

  }
}
