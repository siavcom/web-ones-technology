//////////////////////////////////////////////
// Clase : grid_menu
// Descripcion : Mantenimiento del menu del sistema
// Author : Fernando Cuadras Angulo
// Creacion : Septiembre /2022
// Ult.Mod  : 8/Septiembre/2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { GRID } from "@/classes/Grid";

// las clases importadas son clases tipo columna
import { path_prg } from "./path_prg";
import { prg_prg } from "./prg_prg";

import { des_prg } from "./des_prg";
import { num_prg } from "./num_prg";
import { par_prg } from "./par_prg";
import { sis_sis } from "./sis_sis";
import { sis_prg } from "./sis_prg";
//import {tpr_prg} from './tpr_prg'
import { ico_prg } from "./ico_prg";

export class grid_menu extends GRID {
  // Columna que tiene el grid

  public des_prg = new des_prg();
  public path_prg = new path_prg();
  public prg_prg = new prg_prg();
  public num_prg = new num_prg();
  public par_prg = new par_prg();
  public sis_sis = new sis_sis();
  public ico_prg = new ico_prg();
  public sis_prg = new sis_prg();

  //  constructor(parent: Record<string, never>) {
  constructor() {
    super();
    this.Name = "grid_menu"; // se necesita poner su nombre
    this.prop.Caption = "Menu de programas";
    this.prop.RecordSource = "vi_cap_prg";
    this.prop.Visible = false;
    this.prop.ReadOnly = false;
    this.prop.autoLoad = false;
    this.prop.MaxLength = 8;
  }

  //////////////////////////////////////////////////
  // Incerta renglon
  // m : valiables de memoria
  ///////////////////////////////////////////////////
  public async appendRow() {
    /*
    // Obtiene el consecutivo con_ind del cursor local
    const data=await this.Form.db.VfpCursor("select max(num_ind) as num_ind from vi_cap_comeind\
    where  (trim(cam_ind) <> 'USU_CRE' and \
    trim(cam_ind) <> 'USU_USU' and \
    trim(cam_ind) <> 'TIE_UAC' and \
    trim(cam_ind) <> 'TIE_CRE' and \
    trim(cam_ind) <> 'TIMESTAMP' and \
    trim(cam_ind) <> 'KEY_PRI') ")

    //console.log('appendRow',data[0])    
    const con_ind=data[0].con_ind+.1     
 */
    // asigna campos que no estan en el grid

    const m = { sis_sis: "   ", tpr_prg: "S" };

    if (this.Form.tpr_prg.prop.Value != "S") {
      // Si es programas
      m.sis_sis = this.Form.sis_sis.prop.Value; // 'CXC', 'CON','LOG
      m.tpr_prg = this.Form.tpr_prg.prop.Value;
    }

    await super.appendRow(m); // llama a la clase base
  }
}
