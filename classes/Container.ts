//////////////////////////////////////////////
// Clase : Container
// Author : Fernando Cuadras Angulo
// Creacion : Septiembre/2021
// Ult.Mod  : 16/Marzo/2023
/////////////////////////////////////////////

import { COMPONENT } from '@/classes/Component'

export class CONTAINER extends COMPONENT {
  //Dom: any = getCurrentInstance();
  eventos = [] // eventos a ejecutar en el stack
  estatus = []  // estatus de los componentes hijos
 // header = []   // componentes hijos en header
 // main : [] = [] // componentes hijos en main
 // footer : [] = [] // componentes hijos en footer

  constructor() {
    super()
    //this.prop.BaseClass = 'container'
    
    this.prop.BaseClass='container'
    this.prop.Position = 'main'
//    this.Container = this
    this.style.maxWidth = '720px'

  }

}

