
//////////////////////////////////////////////
// Clase : come9101
// Clase base : ThisForm
// Author : Fernando Cuadras Angulo
// Creacion : Septiembre/2021
// Ult.Mod  : Septiembre/2022
/////////////////////////////////////////////

//import { MessageBox } from '@/classes/Functions'
/////////////////////////////////////////
// Clase de componentes
//////////////////////////////////////
import { dic_dat } from "./dic_dat"
import { nom_tab } from "./nom_tab"
import { sis_sis } from "./sis_sis"
import { tip_men } from "./tip_men"
import { bt_aceptar } from "./bt_aceptar"
//import { BT_GEN_MODEL } from "./bt_gen_model"
//import { BT_GEN_TABLA } from "./bt_gen_tabla"
//import { BT_GEN_VISTAS } from "./bt_gen_vistas"
//import { BT_GEN_MENU } from "./bt_gen_menu"

import { grid_datos } from "./grid_datos/grid_datos"
import { grid_indices } from "./grid_indices/grid_indices"
import { grid_vistas } from "./grid_vistas/grid_vistas"
import { grid_menu } from "./grid_menu/grid_menu"
import { grid_tablas } from "./grid_tablas/grid_tablas"
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { FORM } from "@/classes/Form"
//import router from "@/router"
export class THISFORM extends FORM {
  public dic_dat = new dic_dat()
  public nom_tab = new nom_tab()
  public tip_men = new tip_men()
  public sis_sis = new sis_sis()

  //public btGenModel = new BT_GEN_MODEL()
  //public btGenIndices = new BT_GEN_INDICES()
  //public btGenTabla = new BT_GEN_TABLA()

  //public btGenVistas = new BT_GEN_VISTAS()
  public bt_aceptar = new bt_aceptar()

  public grid_datos = new grid_datos()
  public grid_indices = new grid_indices()
  public grid_vistas = new grid_vistas()
  public grid_tablas = new grid_tablas()
  public grid_menu = new grid_menu()

  constructor() {
    super() // inicializa la clase base
    this.Development = false
    this.prop.Name = "come9101"
    this.prop.Login = false
    this.prop.tag = ""
    this.prop.textLabel = "Mantenimiento al diccionario de datos"
    this.prop.nem_pge = "Killo Software"
    this.prop.fpo_pge = new Date().toISOString().substring(0, 10) //  Fecha actual de la computadora cliente
    this.prop.log_emp = "/img/Logo_Empresa.png"
    this.prop.Status = "A"

    this.style.display = "inline-flex"
    this.style.background = "white"
    this.style.color = "#b94295"
    this.style.width = "auto"
    this.style.height = "auto"
    this.style.fontSize = "13px" // automaticamente vue lo cambiara por font-size (para eso se utiliza la anotacion Camello)
    this.style.position = "center" //absolute,
    this.style.backgroundImage = "/img/Logo_Empresa.bmp"
  }

  ////////////////////////////////////////
  // Init de la forma
  // Se abriran las vistas remotas SQL que se utilizaran
  //////////////////////////////////////

  //public Init = async (Form) => {
  async init() {
    try {
      const ThisForm = this

      // asignamos en la clase db Cual es la forma
      ThisForm.db.Form = this
      // Reservamos una area de trabajo
      console.log("ThisForm.init")
    } catch (error) {
      console.log("======Error Init=====" + this.prop.Name, error)
    }
  }
  async appendDatos() {
    const m = {}
    m.con_dat = 11
    m.cam_dat = "usu_usu"
    m.des_dat = "usu_usu"
    m.tip_dat = "I"
    m.lon_dat = 4
    m.dec_dat = 0
    m.des_dat = "USUARIO"
    m.val_tab = ""
    m.nom_tab = this.Form.nom_tab.prop.Value
    await this.Form.db.appendBlank('vi_cap_dat', m) //Incertamos un renglon en blanco

    m.con_dat = 12
    m.cam_dat = "tie_uac"
    m.des_dat = "tie_uac"
    m.tip_dat = "D"
    m.lon_dat = 8
    m.dec_dat = 0
    m.des_dat = "FECHA ULTIMA ACTUALIZACION"
    m.val_tab = ""
    m.nom_tab = this.Form.nom_tab.prop.Value

    await this.Form.db.appendBlank('vi_cap_dat', m) //Incertamos un renglon en blanco

    m.con_dat = 13
    m.cam_dat = "usu_cre"
    m.des_dat = "usu_cre"
    m.tip_dat = "I"
    m.lon_dat = 2
    m.dec_dat = 0
    m.des_dat = "USUARIO CREAOOR"
    m.val_tab = ""
    m.nom_tab = this.Form.nom_tab.prop.Value
    await this.Form.db.appendBlank('vi_cap_dat', m) //Incertamos un renglon en blanco

    m.con_dat = 14
    m.cam_dat = "tie_cre"
    m.des_dat = "tie_cre"
    m.tip_dat = "D"
    m.lon_dat = 8
    m.dec_dat = 0
    m.des_dat = "TIEMPO DE CREACION"
    m.val_tab = ""
    m.nom_tab = this.Form.nom_tab.prop.Value
    await this.Form.db.appendBlank('vi_cap_dat', m) //Incertamos un renglon en blanco

    m.con_dat = 15
    m.cam_dat = "timestamp"
    m.des_dat = "timestamp"
    m.tip_dat = "T"
    m.lon_dat = 8
    m.dec_dat = 0
    m.des_dat = "TIMESTAMP"
    m.val_tab = ""
    m.nom_tab = this.Form.nom_tab.prop.Value
    await this.Form.db.appendBlank('vi_cap_dat', m) //Incertamos un renglon en blanco


    m.con_dat = 16
    m.cam_dat = "key_pri"
    m.des_dat = "key_pri"
    m.tip_dat = "I"
    m.lon_dat = 4
    m.dec_dat = 0
    m.des_dat = "LLAVE PRIMARIA PARA LA ACTUALIZACION DE VISTAS    "
    m.val_tab = ""
    m.nom_tab = this.Form.nom_tab.prop.Value
  await this.Form.db.appendBlank('vi_cap_dat', m) //Incertamos un renglon en blanco
    console.log('ThisForm appendBlank ',await this.Form.db.localSql('select * from vi_cap_dat'))



  }
}