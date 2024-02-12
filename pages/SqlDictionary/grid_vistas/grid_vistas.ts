//////////////////////////////////////////////
// Clase : grid_vistas
// Descripcion : Mantenimiento de vistas remotas del diccionario de datos
// Author : Fernando Cuadras Angulo
// Creacion : Septiembre /2022
// Ult.Mod  : 8/Septiembre/2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { GRID } from "@/classes/Grid";

// las clases importadas son clases tipo columna, por lo que ya no se importan columnas
import { num_vis } from "./num_vis"
import { nom_vis } from "./nom_vis";
import { des_vis } from "./des_vis";
import { tab_vis } from "./tab_vis";
import { cam_vis } from "./cam_vis";
import { wjs_vis } from "./wjs_vis";
import { ord_vis } from "./ord_vis";
import { fil_vis } from "./fil_vis";
import { vac_vis } from "./vac_vis";

export class grid_vistas extends GRID {
  // Columna que tiene el grid
  // public con_vis = new COLUMN()
  public num_vis = new num_vis()
  public nom_vis = new nom_vis();
  public des_vis = new des_vis();
  public vac_vis = new vac_vis();
  public cam_vis = new cam_vis();
  public tab_vis = new tab_vis();
  public wjs_vis = new wjs_vis();
  public fil_vis = new fil_vis();
  public ord_vis = new ord_vis();

  //  constructor(parent: Record<string, never>) {
  constructor() {
    super();
    this.Name = "grid_vistas";
    this.prop.textLabel = "Definicion de vistas de captura";
    this.prop.RecordSource = "vi_cap_comevis";
    this.prop.Visible = false;
    this.prop.ReadOnly = false;
    this.prop.autoLoad = false;
    this.prop.ColumnCount = 8;
  }
  /*
///////////////////////////////////////////////////
  // Incerta renglon
  // m : valiables de memoria
  ///////////////////////////////////////////////////
  public async appendRow(m?:{}) { 
   // Obtiene el consecutivo con_vis del cursor local
  
   const data=await this.Form.db.VfpCursor("select max(num_vis) as num_vis from vi_cap_comevis\
   where  (trim(cam_vis) <> 'USU_CRE' and \
   trim(cam_vis) <> 'USU_USU' and \
   trim(cam_vis) <> 'TIE_UAC' and \
   trim(cam_vis) <> 'TIE_CRE' and \
   trim(cam_vis) <> 'TIMESTAMP' and \
   trim(cam_vis) <> 'KEY_PRI') ")

   //console.log('appendRow',data[0])    
   const con_vis=data[0].con_vis+.1      
   const m = {}
   super.appendRow(m)   // llama a la clase base        
  }
*/
}
