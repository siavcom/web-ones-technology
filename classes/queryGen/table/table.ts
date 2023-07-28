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

import {GRID} from  '@/classes/Grid'

////////////////////////////////
// Columns 
////////////////////////////////
import {ren_que} from './ren_que'
import {pai_que} from './pai_que'
import {cam_dat} from './cam_dat'

import {con_que} from './con_que'
import {val_que} from './val_que'
import {pad_que} from './pad_que'
import {uni_que} from './uni_que'


export class table extends GRID {
  public ren_que = new ren_que()
  public pai_que = new pai_que()
  public cam_dat = new cam_dat()
  public con_que = new con_que()
  public val_que = new val_que()
  public pad_que = new pad_que()
  public uni_que = new uni_que()

  constructor() {
    super()
    this.prop.Name = 'table'
    this.prop.Capture = false;
    this.prop.Valid = false;
    this.prop.Position = 'main'
    this.prop.RecordSource=''
    this.prop.Visible=true
    this.prop.textLabel=''
    this.prop.autoLoad=false  // se pone en falso para que no inicialice la tabla

    this.style.fontSize = '16px'
    this.style.color = 'green'
    this.style.backgroundColor = 'white'

  }

  public async appendRow(m?: {}) { 
    if (!m) m = {}

    if (!m.nco_que)
        m.nco_que=this.Parent.nco_que.prop.Value
     
    m.prg_prg= this.Form.prop.Name
    m.par_prg= this.Form.Params.par_prg ? this.Form.Params.par_prg:'' 
    m.usu_que= this.Parent.usu_que
    m.ren_que= 1
    
    const db = this.Form.db
    const data=await db.localAlaSql(`select max(ren_que)+1 as max_ren from ${this.prop.RecordSource} `)
    console.log('appendRow table Ala ===>',this.prop.RecordSource,await db.localAlaSql(`select * from ${this.prop.RecordSource} `))
        
    if( data[0] && data[0].max_ren && data[0].max_ren!=null)
       m.ren_que=data[0].max_ren
      else
       m.ren_que=1
    console.log('appendRow table m ===>',m,data,)
    await super.appendRow(m) 
    /*   
    if (!m) m = {}
    this.Row=-1 // Quitamos donde esta el renglon
    const values= await this.Form.db.appendBlank(this.prop.RecordSource, m) //Incertamos un renglon en blanco
    this.prop.Valid=false
    console.log('======grid Incertamos renglon========>',this.prop.Name,values)
   */
  }

 //////////////////////////////////
  // Graba Tabla
/////////////////////////////////
  async grabaTabla() {
    let resultado=false

    if (await super.grabaTabla()){
      console.log('grabaTabla super exito')
      const m = {
        prg_prg: this.Form.prop.Name,
        par_prg: this.Form.Params.par_prg ? this.Form.Params.par_prg : '',
      }
   
      await this.Form.db.use('vi_cap_query_db', m) // todos los querys del reporte
      resultado=true
    } 
    return resultado

  }
}
