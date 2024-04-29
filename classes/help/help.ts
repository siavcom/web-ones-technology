
//////////////////////////////////////////////
// This Form was generated automatically by web-ones-technology
// BaseClass : help
// Class : help
// Description : Clase base de ayuda
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 2024-04-21
// Update Date  : 
/////////////////////////////////////////////

///////////////////////////////////////
// Base class
///////////////////////////////////////
import { CONTAINER } from "@/classes/Container";

/////////////////////////////////////////
// Component import
//////////////////////////////////////

import { des_dat } from './des_dat'
import { has_dat } from './has_dat'
import { tip_con } from './tip_con'
import { cam_dat } from './cam_dat'
import { bt_aceptar } from "./bt_aceptar"
import { bt_close } from "./bt_close"
import { browse } from "./browse"

export class HELP extends CONTAINER {

  public cam_dat = new cam_dat()
  public tip_con = new tip_con()
  public des_dat = new des_dat()
  public has_dat = new has_dat()

  public bt_aceptar = new bt_aceptar()
  public bt_close = new bt_close()

  public browse = new browse()

  fields: string[][]

  constructor() {
    super()
    this.textLabel = 'Buscador'
    this.prop.cam_pri = ''
    this.prop.oneClick = true
    this.prop.BaseClass = 'modalContainer'   //'modalContainer'
    this.prop.Where = ''

    this.prop.Visible = false
    this.prop.Disabled = true
    this.prop.RecordSource = '' // La tabla de la cual queremos obtener los datos

    this.cam_dat.Position = [0, 0]
    this.tip_con.Position = [0, 1]
    this.des_dat.Position = [0, 2]
    this.has_dat.Position = [0, 3]
    this.browse.Position = [0, 4]

    this.bt_aceptar.Position = [1, 0]
    this.bt_close.Position = [1, 1]

    this.cam_dat.prop.TabIndex = 8.1
    this.tip_con.prop.TabIndex = 8.2
    this.des_dat.prop.TabIndex = 8.3
    this.has_dat.prop.TabIndex = 8.4
    this.bt_aceptar.prop.TabIndex = 8.5
    this.browse.prop.TabIndex = 8.6
    this.prop.oneClick = true
    this.style.width = 'auto'



  }

  async open() {
    this.Parent.prop.InputProp.Enabled = false
    this.Parent.prop.InputProp.Visible = false


    let fields = ''
    let or = ''
    for (let i = 0; i < this.fields.length; i++) {
      fields = fields + or + "cam_dat='" + this.fields[i][0] + "'"
      or = ' or '
    }

    if (!this.Sql.View[this.prop.RecordSource]) {

      fields = ` ( ${fields} )`
      console.log("open fields=", fields)
      await this.Sql.execute(
        `select ref_dat,cam_dat,tip_dat,lon_dat,dec_dat
        from vi_schema_views where nom_tab='${this.prop.RecordSource}' and ${fields} order by con_dat`,
        'diccionario'
      );

      for (let i = 0; i < this.fields.length; i++)
        await this.Sql.localAlaSql(`update diccionario set ref_dat = '${this.fields[i][1]}' where cam_dat = '${this.fields[i][0]}'`)

    }
    this.browse.prop.Value = ''
    if (!this.prop.Visible) {
      this.cam_dat.prop.RowSource = `diccionario.ref_dat,cam_dat`;
      this.cam_dat.prop.RowSourceType = 2; //1-Value, 2-Alias, 5-Array = 2
      this.cam_dat.prop.Value = this.prop.cam_pri // asignamos campo principal
      await this.cam_dat.interactiveChange()
      this.tip_con.prop.Visible = true
      this.cam_dat.prop.Visible = true
      this.des_dat.prop.Visible = true
      this.has_dat.prop.Visible = true
      this.bt_aceptar.prop.Visible = true
      this.browse.prop.Visible = false
      this.prop.Visible = true
    } else {
      this.prop.Visible = false
      this.cam_dat.prop.RowSourceType = 0
    }

  }

  async close() {
    this.prop.Visible = false
    if (this.browse.prop.Value > '   ') {
      this.Parent.prop.Value = this.browse.prop.Value
      this.Parent.valid()
      this.Parent.prop.Disabled = false

    }
    this.Parent.prop.InputProp.Enabled = true
    this.Parent.prop.InputProp.Visible = true
    this.Parent.prop.Visible = true

    //this.Parent.prop.ReadOnly =false
    //this.Parent.prop.Disabled =false
    this.Parent.prop.Help = true



  }




}

