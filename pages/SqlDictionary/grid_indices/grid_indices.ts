
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

import { GRID } from '@/classes/Grid'
// import {COLUMN} from  '@/classes/Column'
// import { COMPONENT } from '@/classes/Component'

// las clases importadas son clases tipo columna, por lo que ya no se importan columnas
import { num_ind } from './num_ind'
import { nom_ind } from './nom_ind'
import { des_ind } from './des_ind'

import { exp_ind } from './exp_ind'
import { whe_ind } from './whe_ind'
import { col_ind } from './col_ind'
import { uni_ind } from './uni_ind'


export class grid_indices extends GRID {

  // Columna que tiene el grid
  // public con_ind = new COLUMN()
  public num_ind = new num_ind()
  public nom_ind = new nom_ind()
  public des_ind = new des_ind()
  public exp_ind = new exp_ind()
  public whe_ind = new whe_ind()
  public col_ind = new col_ind()
  public uni_ind = new uni_ind()


  //  constructor(parent: Record<string, never>) {
  constructor() {
    super()
    this.Name = 'grid_indices'
    this.prop.Caption = 'Definicion de indices '
    this.prop.RecordSource = 'vi_cap_comeind'
    this.prop.Visible = false
    this.prop.ReadOnly = false
    this.prop.autoLoad = false
    this.prop.MaxLength = 8
    // this.num_ind.prop.First = true // primer elemento
    this.nom_ind.prop.Last = true // ultimo elemento
  }

  //////////////////////////////////////////////////
  // Inserta renglon
  // m : valiables de memoria
  ///////////////////////////////////////////////////
  public override async appendRow() {
    // Obtiene el consecutivo con_ind del cursor local

    const data = await localAlaSql("select max(num_ind) as num_ind from vi_cap_comeind ")

    console.log('appendRow', data[0])

    let num_ind = data[0].num_ind + 1
    if (num_ind == undefined ||
      Number.isNaN(num_ind))
      num_ind = 1
    // asigna campos que no estan en el grid
    const m = {
      nom_tab: this.Form.nom_tab.prop.Value.trim(),
      num_ind: num_ind
    }
    console.log('appendRow', m)
    await super.appendRow(m) // llama a la clase base

  }



}
