//////////////////////////////////////////////
// Clase : formGenerator
// Clase base : ThisForm
// Author : Fernando Cuadras Angulo
// Creacion : 18/Octubre/2022
// Ult.Mod  : 
/////////////////////////////////////////////

import {nom_for} from "./nom_for"
import {nom_ind} from "./nom_ind"
import {tab_grid} from "./tab_grid"
import {tab_form} from "./tab_form"
import {vis_form} from "./vis_form"
import {vis_grid} from "./vis_grid"

import {tip_for} from "./tip_for"

import {bt_aceptar} from "./bt_aceptar"
import {bt_gen_forma} from "./bt_gen_forma"

import {grid} from "./grid/grid"

///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { FORM } from '@/classes/Form'

export class ThisForm extends FORM {

  public tip_for = new tip_for()

  public tab_form = new tab_form()
  public vis_form = new vis_form()

  public tab_grid = new tab_grid()
  public vis_grid = new vis_grid()

  public nom_ind = new nom_ind()

  public nom_for = new nom_for()
  public bt_aceptar = new bt_aceptar()
  public bt_gen_forma = new bt_gen_forma()

  public grid_form = new grid()
  public grid_columns = new grid()

 
  constructor() {
    super()  // inicializa la clase base
    
    this.Development = false
    this.Name = 'GenForma'
    this.prop.textLabel = "Generador de Formas de mantenimiento ";
    this.prop.Status = 'A'
    this.style.width = "auto"

    this.grid_form.Name='grid_form'
    this.grid_form.Name='grid_form'
    this.grid_form.prop.textLabel= 'Componentes del form'

    this.grid_columns.Name='grid_columns'
    this.grid_columns.Name='grid_columns'
    this.grid_columns.prop.textLabel= 'Componentes del grid'

  }
  
  async init() {
    try {
      await this.Form.db.use('vi_cap_comeind')
   
    }
    catch (error) {
      console.log("======Error Init=====" + this.Name, error)
    }
  

} 

}
