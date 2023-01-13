//////////////////////////////////////////////
// Clase : formGenerator
// Clase base : ThisForm
// Author : Fernando Cuadras Angulo
// Creacion : 18/Octubre/2022
// Ult.Mod  : 
/////////////////////////////////////////////

import { MessageBox } from '@/classes/Functions';
/////////////////////////////////////////
// Clase de componentes
//////////////////////////////////////
//import { vie_nam } from "./vie_nam"


import {nom_for} from "./nom_for"
import {nom_ind} from "./nom_ind"
import {nom_tab} from "./nom_tab"
import {tip_for} from "./tip_for"

import {bt_aceptar} from "./bt_aceptar"
import {bt_gen_forma} from "./bt_gen_forma"

import {grid_components} from "./grid_components/grid"

//import { GRID_DATOS } from "./grid_datos/grid_datos"

///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { FORM } from '@/classes/Form'

export class THISFORM extends FORM {
  //public dic_dat = new DIC_DAT()
  
  ////   aqui comienza /////
   public nom_tab = new nom_tab()
  
  public nom_ind = new nom_ind()
  public tip_for = new tip_for()
  public nom_for = new nom_for()
  public bt_aceptar = new bt_aceptar()
  public bt_gen_forma = new bt_gen_forma()

  public grid_components = new grid_components()
 
  constructor() {
    super()  // inicializa la clase base
    
    this.Development = false
    this.prop.Name = 'GenForma'
    this.prop.textLabel = "Generador de Formas de mantenimiento ";
    this.prop.nem_pge = "Killo Software"
    this.prop.fpo_pge = new Date().toISOString().substring(0, 10); //  Fecha actual de la computadora cliente
    this.prop.log_emp = "/img/Logo_Empresa.png"
    this.prop.Status = 'A'
    this.style.width = "auto"
    this.style.height = "auto"
    this.style.backgroundImage = "/img/Logo_Empresa.png"
  
  }

  ////////////////////////////////////////
  // init de la forma
  // Se abriran las vistas remotas SQL que se utilizaran
  //////////////////////////////////////
  //public Init = async (Form) => {
  async init() {  

    try {
      const ThisForm = this
     
      // asignamos en la clase db Cual es la forma
      ThisForm.db.Form = this
      // Reservamos una area de trabajo
      await ThisForm.db.select(0)
      await ThisForm.db.use('vi_cap_tab')
//      await ThisForm.db.select(0)
//      await ThisForm.db.useNodata('vi_cap_ind')

      console.log('Termine de abrir tablas', ThisForm.db.View)
      super.init() // corre el init de la clase para asignar los valores ThisForm a todos los componentes

    }
    catch (error) {
      console.error('======Error evento init :' + this.prop.Name, error,)
    }

  }
  
}
