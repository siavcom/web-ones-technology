
//////////////////////////////////////////////
// Clase : grid_tablas
// Descripcion : Tablas que contiene el servidor SQL
// Author : Fernando Cuadras Angulo
// Creacion : Septiembre /2022
// Ult.Mod  : 07/Septiembre/2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////

import {GRID} from  '@/classes/Grid'


// las clases importadas son clases tipo columna, por lo que ya no se importan columnas
import {nom_tab} from './nom_tab'
import {des_tab} from './des_tab'
import {vis_tab} from './vis_tab'

export class grid_tablas extends GRID {
 
 // Columna que tiene el grid
  public nom_tab = new nom_tab()
  public des_tab = new des_tab()
  public vis_tab = new vis_tab()
 
  //  constructor(parent: Record<string, never>) {
  constructor() {
    super()
    this.prop.Name = 'grid_tablas'
    this.prop.textLabel= 'Tablas del SQL Server'
    this.prop.RecordSource='vi_cap_tab'
    this.prop.Visible= false
    this.prop.ReadOnly = false;
    this.prop.ColumnCount=3
    //this.nom_tab.prop.First=true // primer elemento
   //this.vis_tab.prop.Last= true // ultimo elemento
     }

///////////////////////////////////////////////////
  // Incerta renglon
  // m : valiables de memoria
  ///////////////////////////////////////////////////
  public async appendRow() { 
   // Obtiene el consecutivo con_tab del cursor local
   /*
   const data=await this.Form.db.VfpCursor("select max(num_tab) as num_tab from vi_cap_tab\
   where  (trim(cam_tab) <> 'USU_CRE' and \
   trim(cam_tab) <> 'USU_USU' and \
   trim(cam_tab) <> 'TIE_UAC' and \
   trim(cam_tab) <> 'TIE_CRE' and \
   trim(cam_tab) <> 'TIMESTAMP' and \
   trim(cam_tab) <> 'KEY_PRI') ")

   //console.log('appendRow',data[0])    
   const con_tab=data[0].con_tab+.1  
   */    
   const m = {}
   super.appendRow(m)   // llama a la clase base        
  }



}
