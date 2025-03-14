//////////////////////////////////////////////
// This Form was generated automatically by web-ones-technology
// BaseClass : captureForm
// Class : users
// Description : Capture Form 
// Author : El Fer Blocks (Fernando Cuadras)
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

///////////////////////////////////////
// Base class 
///////////////////////////////////////

import { captureForm } from '@/classes/CaptureForm'


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


  constructor() {
    super()  // inicializa la clase base

    this.Development = false
    this.Name = 'users'
    this.prop.textLabel = "Mantenimiento a usuarios"
    this.prop.RecordSource = 'vi_cap_db_users'
    this.prop.Status = 'A'
    this.asignaRecno()  // asigna recno a c/componente de captura de la forma
  }

} // End ThisForm
