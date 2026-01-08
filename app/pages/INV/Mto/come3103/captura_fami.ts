//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// BaseClass : Grid
// Class : captura_fami
// Description : Componente captura_fami
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 15/05/25
// Update Date  :
/////////////////////////////////////////////
// import {Grid} from "@/classes/Grid";

import { GRID } from "@/classes/Grid";
import { cla_fam } from './captura_fami/cla_fam';
import { des_fam } from './captura_fami/des_fam';
//import { ctb_fam } from './captura_fami/ctb_fam';
import { esw_fam } from './captura_fami/esw_fam';
//imports

export class captura_fami extends GRID {
  public cla_fam = new cla_fam()
  public des_fam = new des_fam()
  //public ctb_fam = new ctb_fam()
  public esw_fam = new esw_fam()
  //public
  constructor() {
    super();

    this.prop.Name = "Captura_fami";
    this.prop.autoLoad = false  // carga automaticamente la tabla en el grid
    //propiedades
  }

  //metodo
}