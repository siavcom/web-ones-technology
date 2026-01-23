//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// @baseClass  : grid
// @class : tab_cap
// Description : Componente tab_cap
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 15/05/25
// Update Date  :
/////////////////////////////////////////////
// import {grid} from "@/classes/grid";

import { GRID } from "@/classes/Grid";
import { alm_tda } from './tab_cap/alm_tda';
import { des_tda } from './tab_cap/des_tda';
import { ubi_tda } from './tab_cap/ubi_tda';
import { ave_tda } from './tab_cap/ave_tda';
import { alc_tda } from './tab_cap/alc_tda';
import { cod_nom } from './tab_cap/cod_nom';
import { mub_tda } from './tab_cap/mub_tda';
import { cos_tda } from './tab_cap/cos_tda';
//imports

export class tab_cap extends GRID {
  public alm_tda = new alm_tda()
  public des_tda = new des_tda()
  public ubi_tda = new ubi_tda()
  public ave_tda = new ave_tda()
  public alc_tda = new alc_tda()
  public cod_nom = new cod_nom()
  public mub_tda = new mub_tda()
  public cos_tda = new cos_tda()
  //public
  constructor() {
    super();

    this.prop.RecordSource = "vi_cap_tda";
    this.prop.Name = "tab_cap";
    this.prop.Visible = true
    this.prop.ReadOnly = false
    this.prop.autoLoad = true  // carga automaticamente la tabla en el grid
    //propiedades
  }


  //metodo
}