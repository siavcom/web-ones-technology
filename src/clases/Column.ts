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
  textLabel = ''

 // Segun Vfp
  //componente = new COMPONENT
  //header = new COMPONENT

  Order = 1
  
  constructor() {
    super()
    this.BaseClass = 'Column'
    this.prop.Capture = true;
    this.prop.Sw_val = false;
// Segun Vfp
//    this.header.BaseClass = 'Header'
//    this.header.prop.Name = 'header'
//    this.componente.BaseClass = 'Component'
//    this.componente.prop.Name = 'component'
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