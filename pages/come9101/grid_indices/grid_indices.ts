
//////////////////////////////////////////////
// Clase : grid
// Descripcion : Mantenimiento de indices del diccionario de datos
// Author : Fernando Cuadras Angulo
// Creacion : Septiembre /2022
// Ult.Mod  : 5/Septiembre/2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////

import {GRID} from  '@/classes/Grid'
// import {COLUMN} from  '@/classes/Column'
// import { COMPONENT } from '@/classes/Component'

// las clases importadas son clases tipo columna, por lo que ya no se importan columnas
import {num_ind} from './num_ind'
import {exp_ind} from './exp_ind'
import {des_ind} from './des_ind'
import {nom_ind} from './nom_ind'
import {uni_ind} from './uni_ind'


export class grid_indices extends GRID {
 
 // Columna que tiene el grid
 // public con_ind = new COLUMN()
  public num_ind = new num_ind()
  public exp_ind = new exp_ind()
  public des_ind = new des_ind()
  public nom_ind = new nom_ind()
  public uni_ind = new uni_ind()
 
 
  //  constructor(parent: Record<string, never>) {
  constructor() {
    super()
    this.prop.Name = 'grid_indices'
    this.prop.textLabel= 'Definicion de indices de una tabla'
    this.prop.RecordSource='vi_cap_ind'
    this.prop.Visible= false
    this.prop.ReadOnly = false;
    this.prop.ColumnCount=8
    this.num_ind.prop.First=true // primer elemento
    this.nom_ind.prop.Last= true // ultimo elemento
     }

  //////////////////////////////////////////////////
  // Incerta renglon
  // m : valiables de memoria
  ///////////////////////////////////////////////////
  public async appendRow() { 
   // Obtiene el consecutivo con_ind del cursor local
  
   const data=await this.Form.db.VfpCursor("select max(num_ind) as num_ind from vi_cap_ind ")

   console.log('appendRow',data[0])  
    
   let num_ind=data[0].num_ind+1     
   if (num_ind == undefined ||
       Number.isNaN(num_ind))
       num_ind =1
       
       
   // asigna campos que no estan en el grid
   const m = {nom_tab:this.Form.nom_tab.prop.Value.trim(),
              num_ind:num_ind}
              await this.Form.db.appendBlank('vi_cap_ind', m) //Incertamos un renglon en blanc
  
  }



}
