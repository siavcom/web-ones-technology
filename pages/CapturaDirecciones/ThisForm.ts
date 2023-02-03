//////////////////////////////////////////////
// This Form was generated automatically by web-ones-technology
// BaseClass : captureForm
// Class : CapturaDirecciones
// Description : Capture Form 
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 2023-02-02
// Update Date  : 
/////////////////////////////////////////////

/////////////////////////////////////////
// Component import
//////////////////////////////////////

import {rfc_dir } from "./rfc_dir" 
import {num_dir } from "./num_dir" 
import {nom_dir } from "./nom_dir" 
import {cal_dir } from "./cal_dir" 
import {ext_dir } from "./ext_dir" 
import {int_dir } from "./int_dir" 
import {cpo_dir } from "./cpo_dir" 
import {pai_dir } from "./pai_dir" 
import {gln_dir } from "./gln_dir" 
import {not_dir } from "./not_dir" 



////////////////////////////////////////
// Function import
///////////////////////////////////////

import { MessageBox } from '@/clases/Functions';

///////////////////////////////////////
// Base class 
///////////////////////////////////////

import { captureForm } from '@/clases/captureForm'


export class THISFORM extends captureForm {

////////////////////////////////////
// component imported
////////////////////////////////////

   public rfc_dir = new rfc_dir() 
   public num_dir = new num_dir() 
   public nom_dir = new nom_dir() 
   public cal_dir = new cal_dir() 
   public ext_dir = new ext_dir() 
   public int_dir = new int_dir() 
   public cpo_dir = new cpo_dir() 
   public pai_dir = new pai_dir() 
   public gln_dir = new gln_dir() 
   public not_dir = new not_dir() 
 
  
  constructor() {
    super()  // inicializa la clase base

    this.Development = false
    this.prop.Name = 'CapturaDirecciones'
    this.prop.textLabel = "Mantenimiento a la tabla COMEDIR"
    this.prop.RecordSource='lla1_dir'
    this.prop.nem_pge = "Killo Software"
    this.prop.fpo_pge = new Date().toISOString().substring(0, 10)
    this.prop.log_emp = "/img/Logo_Empresa.png"
    this.prop.Status = 'A'
    this.style.display = "flex"
    this.style.background = "white"
    this.style.color = "#b94295"
    this.style.fontSize = "13px" 
    this.style.position = "center"
    this.style.backgroundImage = "/img/Logo_Empresa.bmp"

  }
} // End ThisForm
