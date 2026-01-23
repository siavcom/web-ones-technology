//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// @baseClass  : Grid
// @class : Captura_alm
// Description : Componente Captura_alm
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 29/05/25
// Update Date  :
/////////////////////////////////////////////
// import {Grid} from "@/classes/Grid";

import { GRID } from "@/classes/Grid";
import { c_alm_tda } from './Captura_alm/c_alm_tda';
import { c_cla_isu } from './Captura_alm/c_cla_isu';
import { c_cpe_alm } from './Captura_alm/c_cpe_alm';

import { c_dst_alm } from './Captura_alm/c_dst_alm';
import { c_est_alm } from './Captura_alm/c_est_alm';
import { c_fic_alm } from './Captura_alm/c_fic_alm';
import { c_fiv_alm } from './Captura_alm/c_fiv_alm';
import { c_max_alm } from './Captura_alm/c_max_alm';
import { c_min_alm } from './Captura_alm/c_min_alm';
import { c_pre_alm } from './Captura_alm/c_pre_alm';
import { c_ubi_alm } from './Captura_alm/c_ubi_alm';
//imports

export class Captura_alm extends GRID {
  public c_alm_tda = new c_alm_tda()
  public c_cla_isu = new c_cla_isu()
  public c_cpe_alm = new c_cpe_alm()

  public c_dst_alm = new c_dst_alm()
  public c_est_alm = new c_est_alm()
  public c_fic_alm = new c_fic_alm()
  public c_fiv_alm = new c_fiv_alm()
  public c_max_alm = new c_max_alm()
  public c_min_alm = new c_min_alm()
  public c_pre_alm = new c_pre_alm()
  public c_ubi_alm = new c_ubi_alm()
  //public
  constructor() {
    super();

    this.prop.Name = "Captura_alm";
    this.prop.Caption = ""
    this.prop.Visible = true;
    this.prop.ReadOnly = false;
    this.prop.autoLoad = true; // carga automaticamente la tabla en el grid
    // this.prop.AllowAddNew = false;
    this.prop.UpdateMessage = "Grabamos tabla";
    this.prop.DeleteMessage = "Borramos registro";

    //propiedades
  }
  //metodo
}