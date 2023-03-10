//////////////////////////////////////////////
// Clase : formGenerator
// Descripcion : Generador de formas de mantenimiento
// Author : Fernando Cuadras Angulo
// Creacion : 17/Octubre/2022
// Ult.Mod  : 19/Octubre/2022
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


//import {NOM_IND} from './nom_ind'
import {updateKey} from './updateKey'  // es llave de captura
import {cam_act} from './cam_act'  // es campo capturable

import {controlSource} from './controlSource'
import {nullValue} from './nullValue'
import {min} from './min'
import {maxLen} from './maxLen'
import {placeHolder} from './placeHolder'
import {toolTipText} from './toolTipText'

export class grid_captura extends GRID {
 
 // Columna que tiene el grid
 // public con_dat = new COLUMN()
  public con_dat = new con_dat()
  public cam_dat = new cam_dat()
  public tip_dat = new tip_dat()
  public lon_dat = new lon_dat()
  public dec_dat = new dec_dat()
  public ref_dat = new ref_dat()

  //public nom_ind = new NOM_IND()
  public updateKey =new updateKey()  // es llave de captura
  public cam_act =new cam_act()  // es campo capturable
  
  public controlSource =new controlSource()
  public nullValue =new nullValue()
  
  public min =new min()
  public maxLen =new maxLen()

  public placeHolder =new placeHolder()
  public toolTipText =new toolTipText()
  
 
  //  constructor(parent: Record<string, never>) {
  constructor() {
    super()
    this.prop.Name = 'grid_captura'
    this.prop.textLabel= 'Campos del grid (captura tabla)'
    this.prop.RecordSource='vi_cap_grd'
    this.prop.Visible= false
    this.prop.ReadOnly = false;
    //this.prop.ColumnCount=8
    this.con_dat.prop.First=true // primer elemento
    this.toolTipText.prop.Last= true // ultimo elemento
    this.style.width='920'
   }

///////////////////////////////////////////////////
  // Incerta renglon
  // m : valiables de memoria
  ///////////////////////////////////////////////////
  public async appendRow() { 
   // Obtiene el consecutivo con_dat del cursor local
   const data=await this.Form.db.VfpCursor("select max(con_dat) as con_dat from "+this.prop.RecordSource+"\
   where  (trim(cam_dat) <> 'USU_CRE' and \
   trim(cam_dat) <> 'USU_USU' and \
   trim(cam_dat) <> 'TIE_UAC' and \
   trim(cam_dat) <> 'TIE_CRE' and \
   trim(cam_dat) <> 'TIMESTAMP' and \
   trim(cam_dat) <> 'KEY_PRI') ")

   //console.log('appendRow',data[0])    
   const con_dat=data[0].con_dat+.1      
   const m = {nom_tab:this.Form.vis_cap.prop.Value,
              con_dat:con_dat}
   super.appendRow(m)   // llama a la clase base        
  }



}
