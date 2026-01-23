//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// @baseClass  : captureForm
// @class : Tipo
// Description : Forma de captura
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 29/05/25
// Update Date  :
/////////////////////////////////////////////

///////////////////////////////////////
// Base class
///////////////////////////////////////

import { FORM } from "@/classes/Form";

import { alm_tda } from './alm_tda';
import { Captura_alm } from './Captura_alm';
import { cla_isu } from './cla_isu';
import { des_cla } from './des_cla';

import { des_fam } from './des_fam';

import { has_cla } from './has_cla';

import { num_fam } from './num_fam';
import { sep_fam } from './sep_fam';
import { Tipo } from './Tipo';
import { otro } from "./otro";
import { bt_aceptar } from "./bt_aceptar";


export class ThisForm extends FORM {
  public Tipo = new Tipo()
  public cla_isu = new cla_isu()

  public des_cla = new des_cla()
  public has_cla = new has_cla()

  public sep_fam = new sep_fam()
  public num_fam = new num_fam()
  public des_fam = new des_fam()

  public alm_tda = new alm_tda()
  public bt_aceptar = new bt_aceptar()

  public Captura_alm = new Captura_alm()
  //  public otro = new otro()
  constructor() {
    super();

    this.prop.Caption = "Puntos de reorden";
    this.prop.Name = "COME3105";

  }

  // ---------------------------------------------------------------------------------------------- 
  //              Siavcom Software S. de R.L. de C.V. 
  // ---------------------------------------------------------------------------------------------- 
  // Autor     : Ing. Fernando Cuadras Angulo 
  // Sistema   : Siavcom            Version : 6.0  Windows 
  // Programa  : Puntos de rorden        Mnemo   : come3105.scx 
  // Ult. mod. : Fernando Cuadras         Fecha   : 13/Octubre/1999 
  // Evento  : Init 
  // Objeto  : come3105 
  // Tipo   : Form 
  // ---------------------------------------------------------------------------------------------- 

  override async init() {
    const m = {}   // inicializamos m
    await useNodata('vi_cap_alm') // use vi_cap_alm vi_cap_alm nodata  // tabla de captura movimientos 
    await use('vi_cap_tda') // Tabla de descripcion de almacenes

    //  await useNodata('vi_cap_comeisu') 
    //  await useNodata('vi_cap_fam') // use vi_cap_fam vi_cap_fam nodata

    //    await useNodata('lla1_alm') // use lla1_alm lla1_alm nodata alias  // tabla de actualizaciÃ³n de movimientos 


    /*/
    const cam_arc = afields()
    // Buscamos si tiene el campo de numero de serie 

        if (ascan(cam_arc, 'FIV_ALM') <= 0) {  // no tiene campo decaptura de serie 
    
          this.Form.tab_cap.removeobject('c_fiv_alm')  // removemos columnas de fecha 
    
        } // End If 
    
    
        if (ascan(cam_arc, 'FIC_ALM') <= 0) {  // no tiene campo decaptura de serie 
    
          this.Form.tab_cap.removeobject('c_fic_alm')  // removemos columnas de fecha 
    
        } // End If 
    
    */
    // await useNodata('lla1_tda') // use lla1_tda lla1_tda nodata  // tabla de definiciÃ³n de alamcenes 

    // select 0




    // select 0


    // select 0


  }   // Fin Procedure



  //metodo
}