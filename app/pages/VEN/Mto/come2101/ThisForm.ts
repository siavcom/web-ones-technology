/* ---------------------------------------------------------------------------------------------- 
*              Siavcom Software S. de R.L. de C.V. 
* ---------------------------------------------------------------------------------------------- 
* Autor     : Ing. Fernando Cuadras Angulo 
* Sistema   : Siavcom         Version : 6.0  Windows 
* Programa  : Mantenimiento a vendedores  Mnemo   : come2101.scx 
* Ult. mod. : Fernando Cuadras      Fecha   : 24/08/98 
* Evento  : Init 
* Objeto  : come2101 
* Tipo   : Form 
* ---------------------------------------------------------------------------------------------- 
*/

///////////////////////////////////////
// Base class
///////////////////////////////////////

import { captureForm } from "@/classes/CaptureForm";

import { ven_ven } from './ven_ven';
import { nom_ven } from './nom_ven';
import { rfc_ven } from './rfc_ven';
import { dir_ven } from './dir_ven';
import { col_ven } from './col_ven';
import { pob_ven } from './pob_ven';
import { cpo_ven } from './cpo_ven';
import { tel_ven } from './tel_ven';
import { zon_ven } from './zon_ven';
import { pco_ven } from './pco_ven';
import { mai_ven } from './mai_ven';

export class ThisForm extends captureForm {

  public ven_ven = new ven_ven()
  public nom_ven = new nom_ven()
  public rfc_ven = new rfc_ven()
  public dir_ven = new dir_ven()
  public col_ven = new col_ven()
  public pob_ven = new pob_ven()
  public cpo_ven = new cpo_ven()
  public tel_ven = new tel_ven()
  public zon_ven = new zon_ven()
  public pco_ven = new pco_ven()

  public mai_ven = new mai_ven()
  constructor() {
    super();
    this.prop.Caption = "Mantenimiento a vendedores";
    this.prop.RecordSource = 'vi_cap_comeven'
    this.asignaRecno()
  }

}