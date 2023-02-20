//////////////////////////////////////////////
// Clase : Celda de un gridd
// Author : Fernando Cuadras Angulo
// Creacion : Noviembre/2021
// Ult.Mod  : Mayo/2022
/////////////////////////////////////////////
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { COMPONENT } from '@/classes/Component'
//import { nextTick } from 'vue'
//import VueSimpleAlert from 'vue3-simple-alert'


export class COLUMN extends COMPONENT {

  //  constructor(parent: Record<string, never>) {
  
 // Segun Vfp
  //componente = new COMPONENT
  //header = new COMPONENT

  Order = 1
  BaseClass = 'Column'
  textLabel=''
  constructor() {
    super()
    this.prop.Capture = true;
    this.prop.Valid = false;
// Segun Vfp
//    this.header.BaseClass = 'Header'
//    this.header.prop.Name = 'header'
//    this.componente.BaseClass = 'Component'
//    this.componente.prop.Name = 'component'
  }

async valid(){
  this.prop.Valid=true

    if (this.prop.updateKey) {
      console.log('Column valid updateKey ',this.prop.Name)
      this.Parent.Valid=false
      if (this.prop.Value.trim().length==0){
          this.prop.ErrorMessage='No permite datos en blanco'
          this.prop.ShowError=true
          this.prop.Valid=false
        } 
     if (await this.Parent.ValidKey()== false){
        this.prop.ErrorMessage='Dato duplicado'
        this.prop.ShowError=true
        this.prop.Valid=false
      }
    }
    return this.prop.Valid
  }
/*
  ///////////////////////////////////////////////////// 
  // asignaRenglon 
  // lee los datos del renglon actual y depliega los componentes de captura
  ///////////////////////////////////////////////////////////
  public async asignaRenglon_old(row: number) {

    this.Parent.prop.Status='P'
    const recno = this.Form.db.View[this.Parent.prop.RecordSource].recnoVal[row]
    await this.Parent.asignaValue(recno)  // llama el asignaValue en el componente grid
    console.log('asigna renglon parent.row',this.Parent.Row)
    this.Parent.Row=row  // asigna el row donde tomo el foco
  
    // this.pushEvent('SetFocus()') Se puso la propiedad de autofocus 
   // por el watch de status de componentes se pone en activo el grid_datos
  }
*/

}