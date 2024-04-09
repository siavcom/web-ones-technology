//////////////////////////////////////////////
// Clase : Container
// Author : Fernando Cuadras Angulo
// Creacion : Septiembre/2021
// Ult.Mod  : 16/Marzo/2023
/////////////////////////////////////////////

import { COMPONENT } from '@/classes/Component'

export class CONTAINER extends COMPONENT {
  eventos = [] // eventos a ejecutar en el stack
  estatus = []  // estatus de los componentes hijos

  constructor() {
    super()
    this.prop.BaseClass = 'container'
    this.prop.Position = 'main'
    this.style.maxWidth = '720px'

  }

}

