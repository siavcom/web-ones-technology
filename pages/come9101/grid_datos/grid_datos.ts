//////////////////////////////////////////////
// Clase : grid
// Descripcion : Mantenimiento al diccionario de datos
// Author : Fernando Cuadras Angulo
// Creacion : Diciembre/2021
// Ult.Mod  : 23/Septiembre/2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import {GRID} from  '@/classes/Grid'
// import {COLUMN} from  '@/classes/Column'
// import { COMPONENT } from '@/classes/Component'

// las clases importadas son clases tipo columna, por lo que ya no se importan columnas
import {con_dat} from './con_dat'
import {cam_dat} from './cam_dat'
import {tip_dat} from './tip_dat'
import {lon_dat} from './lon_dat'
import {dec_dat} from './dec_dat'
import {ref_dat} from './ref_dat'
import {sou_dat} from './sou_dat'
import {vue_dat} from './vue_dat'
import {val_dat} from './val_dat'



export class grid_datos extends GRID {
 
 // Columna que tiene el grid
 // public con_dat = new COLUMN()
  public con_dat = new con_dat()
  public cam_dat = new cam_dat()
  public tip_dat = new tip_dat()
  public lon_dat = new lon_dat()
  public dec_dat = new dec_dat()
  public ref_dat = new ref_dat()
  public sou_dat = new sou_dat()
  public vue_dat = new vue_dat()
  public val_dat = new val_dat()

 
  //  constructor(parent: Record<string, never>) {
  constructor() {
    super()
    this.prop.Name = 'grid_datos'
    this.prop.textLabel= 'Definicion de la tabla'
    this.prop.RecordSource='vi_cap_dat'
    this.prop.Visible= false
    this.prop.ReadOnly = false;
    this.prop.ColumnCount=8
    this.con_dat.prop.First=true // primer elemento
    this.vue_dat.prop.Last= true // ultimo elemento
 
    }

///////////////////////////////////////////////////
  // Incerta renglon
  // m : valiables de memoria
  ///////////////////////////////////////////////////
  public async appendRow() { 
   // Obtiene el consecutivo con_dat del cursor local
   const data=await this.Form.db.localSql("select max(con_dat) as con_dat from vi_cap_dat\
   where  lower(trim(cam_dat)) <> 'usu_cre' and \
   lower(trim(cam_dat)) <> 'usu_usu' and \
   lower(trim(cam_dat)) <> 'tie_uac' and \
   lower(trim(cam_dat)) <> 'tie_cre' and \
   lower(trim(cam_dat)) <> 'timestamp' and \
   lower(trim(cam_dat)) <> 'key_pri' ")
   //console.log('appenRow grid_datos',await this.Form.db.localSql('select * from vi_cap_dat' ), data[0].con_dat)
   //console.log('appendRow',data[0])    
   const con_dat=data[0].con_dat > 0 ? data[0].con_dat+.1 : 1       
   const m = {nom_tab:this.Form.nom_tab.prop.Value,
              con_dat:con_dat,
              cam_dat: ' ',
              des_dat :' ',
              tip_dat : 'C',
              lon_dat : 32 ,
              dec_dat : 0,
              ref_dat : ' ',
              val_dat : ' ',
              sou_dat : ' ',
              vvu_dat : ' '
               }
   await super.appendRow(m)   // llama a la clase base        
  }

  async appendDatos() {
    const m = {nom_tab:this.Form.nom_tab.prop.Value,
      con_dat: 0,
      cam_dat: ' ',
      des_dat :' ',
      tip_dat : 'C',
      lon_dat : 32 ,
      dec_dat : 0,
      ref_dat : ' ',
      val_dat : ' ',
      sou_dat : ' ',
      vvu_dat : ' '
       }

    m.con_dat = 11
    m.cam_dat = "usu_usu"
   
    m.tip_dat = "I"
    m.lon_dat = 4
    m.dec_dat = 0
    m.ref_dat = "USUARIO"
   
    await this.Form.db.appendBlank('vi_cap_dat', m) //Incertamos un renglon en blanco

    m.con_dat = 12
    m.cam_dat = "tie_uac"
   
    m.tip_dat = "D"
    m.lon_dat = 8
    m.dec_dat = 0
    m.ref_dat = "FECHA ULTIMA ACTUALIZACION"
  
    await this.Form.db.appendBlank('vi_cap_dat', m) //Incertamos un renglon en blanco

    m.con_dat = 13
    m.cam_dat = "usu_cre"
    m.des_dat = "usu_cre"
    m.tip_dat = "I"
    m.lon_dat = 2
    m.dec_dat = 0
    m.ref_dat = "USUARIO CREAOOR"

    await this.Form.db.appendBlank('vi_cap_dat', m) //Incertamos un renglon en blanco

    m.con_dat = 14
    m.cam_dat = "tie_cre"
    m.des_dat = "tie_cre"
    m.tip_dat = "D"
    m.lon_dat = 8
    m.dec_dat = 0
    m.ref_dat = "TIEMPO DE CREACION"

    await this.Form.db.appendBlank('vi_cap_dat', m) //Incertamos un renglon en blanco

    m.con_dat = 15
    m.cam_dat = "timestamp"
    m.des_dat = "timestamp"
    m.tip_dat = "T"
    m.lon_dat = 8
    m.dec_dat = 0
    m.ref_dat = "TIMESTAMP"
 
    await this.Form.db.appendBlank('vi_cap_dat', m) //Incertamos un renglon en blanco


    m.con_dat = 16
    m.cam_dat = "key_pri"
    m.des_dat = "key_pri"
    m.tip_dat = "I"
    m.lon_dat = 4
    m.dec_dat = 0
    m.ref_dat = "LLAVE PRIMARIA PARA LA ACTUALIZACION DE VISTAS    "
  
  await this.Form.db.appendBlank('vi_cap_dat', m) //Incertamos un renglon en blanco
  console.log('Grid_datos appendBlank ',await this.Form.db.localSql('select * from vi_cap_dat'))
   return
  }



}
