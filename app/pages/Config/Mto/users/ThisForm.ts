//////////////////////////////////////////////
// This Form was generated automatically by web-ones-technology
// @baseClass  : captureForm
// @class : users
// Description : Capture Form 
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 2025-03-11
// Update Date  : 
/////////////////////////////////////////////

/////////////////////////////////////////
// Component import
//////////////////////////////////////

import { log_usr } from "./log_usr"
import { nam_usr } from "./nam_usr"
import { dat_usr } from "./dat_usr"
import { pho_usr } from "./pho_usr"
import { mai_usr } from "./mai_usr"
import { lan_lan } from "./lan_lan"
import { tzo_usr } from "./tzo_usr"
import { pw1_usr } from "./pw1_usr"
import { pw2_usr } from "./pw2_usr"
import { rol_usr } from "./rol_usr"
import { bt_newSession } from "./bt_newSession"
import { bt_changePassword } from "./bt_changePassword"

///////////////////////////////////////
// Base class 
///////////////////////////////////////

// import { captureForm } from '@/classes/CaptureForm'

export class ThisForm extends captureForm {

  ////////////////////////////////////
  // component imported
  ////////////////////////////////////

  public log_usr = new log_usr()
  public nam_usr = new nam_usr()
  public dat_usr = new dat_usr()
  public pho_usr = new pho_usr()
  public mai_usr = new mai_usr()
  public lan_lan = new lan_lan()
  public tzo_usr = new tzo_usr()
  public pw1_usr = new pw1_usr()
  public pw2_usr = new pw2_usr()
  public rol_usr = new rol_usr()
  public bt_newSesion = new bt_newSession()
  public bt_changePassword = new bt_changePassword()
  newUser = false
  constructor() {
    super()  // inicializa la clase base

    this.Development = false
    this.Name = 'users'
    this.prop.Caption = "Mantenimiento a usuarios"
    this.prop.RecordSource = 'vi_cap_db_users'
    this.prop.Status = 'A'
    this.asignaRecno()  // asigna recno a c/componente de captura de la forma

  }
  override async validComponent(compName?: string) {
    const result = await super.validComponent(compName)
    if (this.bt_delete.prop.Visible) {
      this.bt_newSesion.prop.Visible = true
      this.bt_changePassword.prop.Visible = true

      console.log('this.bt_delete.prop.Visible', this.bt_delete.prop.Visible)
    }
    return result

  }

  override async bt_saveClick() {
    this.newUser = false
    if (this.pw1_usr.prop.Value.trim() != this.pw2_usr.prop.Value.trim()) {
      MessageBox('Las contraseñas no coinciden', 16, 'Error')
      return false
    }

    const data = await scatter(['key_pri'], 'vi_cap_db_users')

    if (data.key_pri == 0)
      this.newUser = true
    else
      this.newUser = false


    return super.bt_saveClick()
  }

  override async afterSave(): Promise<void> {

    if (this.newUser) {  // Si es un usuario nuevo, da de alta la sesión
      this.bt_newSesion.click()
      /*
            if (this.dialect == 'mssql')
              await SQLExec(`execute sp_addlogin '${this.log_usr.prop.Value}', '${this.pw1_usr.prop.Value}'`)
            else
              await SQLExec(`CREATE USER ${this.log_usr.prop.Value} WITH PASSWORD '${this.pw1_usr.prop.Value}' ;`)
      */
    }
  }
}