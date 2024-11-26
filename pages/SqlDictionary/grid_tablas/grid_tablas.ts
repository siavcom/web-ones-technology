
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

import { GRID } from '@/classes/Grid'


// las clases importadas son clases tipo columna, por lo que ya no se importan columnas
import { nom_tab } from './nom_tab'
import { des_tab } from './des_tab'
import { sis_sis } from './sis_sis'
import { vis_tab } from './vis_tab'

export class grid_tablas extends GRID {

  // Columna que tiene el grid
  public nom_tab = new nom_tab()
  public des_tab = new des_tab()
  public sis_sis = new sis_sis()
  public vis_tab = new vis_tab()

  //  constructor(parent: Record<string, never>) {
  constructor() {
    super()
    this.Name = 'grid_tablas'
    this.prop.textLabel = 'Tablas del SQL Server'

    this.prop.Visible = false
    this.prop.ReadOnly = false
    this.prop.autoLoad = false
    this.prop.ColumnCount = 3
    //this.nom_tab.prop.First=true // primer elemento
    //this.vis_tab.prop.Last= true // ultimo elemento
  }


}
