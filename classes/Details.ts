//////////////////////////////////////////////
// Clase : Details
// Author : Fernando Cuadras Angulo
// Creacion : Septiembre/2021
// Ult.Mod  : 16/Marzo/2023
/////////////////////////////////////////////

import { COMPONENT } from '@/classes/Component'

export class DETAILS extends COMPONENT {
  eventos = [] // eventos a ejecutar en el stack
  estatus = []  // estatus de los componentes hijos


  constructor() {
    super()
    this.prop.BaseClass = 'details' //  clase base de los componentes modalContainer
    this.prop.Position = 'main'
    this.style.maxWidth = '720px'
    this.style.width = 'auto'
  }

}

