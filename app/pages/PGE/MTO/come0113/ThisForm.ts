/*
&& ----------------------------------------------------------------------------------------------
&&              Siavcom Software S. de R.L. de C.V.
&& ----------------------------------------------------------------------------------------------
&& Autor    	: Ing. Fernando Cuadras Angulo
&& Sistema  	: Siavcom  							Version : 6.0  Windows
&& Programa 	: Mantenimiento a Certificados digitales	Mnemo   : come0113.scx
&& Ult. mod.	: Fernando Cuadras  				Fecha   : 20/Noviembre/2025
&& -----------------------------------------------------------------------------------------------
*/
// import { captureForm } from "@/classes/CaptureForm";

import { cer_cer } from './cer_cer'
import { num_cer } from "./num_cer"
import { fve_cer } from './fve_cer'
import { ubi_cer } from './ubi_cer'
import { pwd_cer } from './pwd_cer'
import { con_pwd } from './con_pwd'
import { pem_cer } from './pem_cer'
import { key_cer } from './key_cer'
//import { ace_cer } from './ace_cer'

export class ThisForm extends captureForm {

  public cer_cer = new cer_cer()
  public num_cer = new num_cer()
  public fve_cer = new fve_cer()
  //public ubi_cer = new ubi_cer()
  public con_pwd = new con_pwd()
  public pwd_cer = new pwd_cer()
  public pem_cer = new pem_cer()
  public key_cer = new key_cer()
  // public ace_cer = new ace_cer()
  constructor() {
    super();
    this.prop.Caption = "Certificados digitales";
    this.prop.RecordSource = 'vi_cap_comecer'
    this.asignaRecno()
  }

  override async init() {
    await useNodata('vi_cap_comecer')
  }

  override async bt_modifyClick() {
    await super.bt_modifyClick()
    this.pem_cer.prop.Visible = true
    this.key_cer.prop.Visible = true
    this.key_cer.prop.ReadOnly = true

  }
  /*
    override async bt_saveClick_old() {
      await super.bt_saveClick()
      this.cer_cer.prop.Focus = true
  
    }*/
}