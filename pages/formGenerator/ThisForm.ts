//////////////////////////////////////////////
// Clase : formGenerator
// Clase base : ThisForm
// Author : Fernando Cuadras Angulo
// Creacion : 18/Octubre/2022
// Ult.Mod  : 
/////////////////////////////////////////////

import {nom_for} from "./nom_for"
import {nom_ind} from "./nom_ind"
import {nom_tab} from "./nom_tab"
import {vis_cap} from "./vis_cap"

import {tip_for} from "./tip_for"

import {bt_aceptar} from "./bt_aceptar"
import {bt_gen_forma} from "./bt_gen_forma"

import {grid_components} from "./grid_components/grid"
import {grid_captura} from "./grid_captura/grid_captura"

///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { FORM } from '@/classes/Form'

export class THISFORM extends FORM {

  public tip_for = new tip_for()

  public nom_tab = new nom_tab()
  public nom_ind = new nom_ind()

  public vis_cap = new vis_cap()

  public nom_for = new nom_for()
  public bt_aceptar = new bt_aceptar()
  public bt_gen_forma = new bt_gen_forma()

  public grid_components = new grid_components()
  public grid_captura = new grid_captura()

 
  constructor() {
    super()  // inicializa la clase base
    
    this.Development = false
    this.prop.Name = 'GenForma'
    this.prop.textLabel = "Generador de Formas de mantenimiento ";
    this.prop.Status = 'A'
    this.style.width = "auto"
  
  }
  
  async init() {
    try {
      await this.Form.db.use('vi_cap_ind')
   
    }
    catch (error) {
      console.log("======Error Init=====" + this.prop.Name, error)
    }
  

} 

}
