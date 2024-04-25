//////////////////////////////////////////////
// Clase : Details
// Author : Fernando Cuadras Angulo
// Creacion : Septiembre/2021
// Ult.Mod  : 16/Marzo/2023
/////////////////////////////////////////////

import { COMPONENT } from '@/classes/Component'

export class CONTAINER extends COMPONENT {
  eventos = [] // eventos a ejecutar en el stack
  estatus = []  // estatus de los componentes hijos
  Divi = []
  /* {
    header: [],
    main: [],
    footer: []
  }
*/
  constructor() {
    super()
    //this.prop.Name = null ? 'Container' : this.prop.Name
    this.Text = 'Container'
    this.prop.BaseClass = 'container'
    this.prop.Position = 'main'
    this.style = {
      maxWidth: '720px',
      borderStyle: 'double',
      background: 'antiquewhite',
      borderRadius: '10px',


    }
  }
  async init() {
    await super.init()
    let elementos = []
    // sumanos todos los componentes en uno solo
    elementos = elementos.concat(this.header)
    elementos = elementos.concat(this.main)
    elementos = elementos.concat(this.footer)

    for (let i = 0; i < elementos.length; i++) {
      const componente = elementos[i]

      if (this[componente].Position && this[componente].Position.length > 0) {  // Si es componete tiene posision en la pantalla

      }
      else {
        let pos_ver = 0
        let pos_hor = 0
        if (this[componente].prop.Position = 'header') {
          pos_ver = 0
        }
        if (this[componente].prop.Position = 'main') {
          pos_ver = 1
        }
        if (this[componente].prop.Position = 'footer') {
          pos_ver = 2
        }
        pos_hor = this.Divi[pos_ver].length
        this[componente].Position[0] = pos_ver
        this[componente].Position[1] = pos_hor
      }

      let group = this[componente].Position[0]
      let element = this[componente].Position[1]


      if (!this.Divi[group])  // so existe el objeto, lo agrega
        this.Divi[group] = []

      this.Divi[group][element] = this[componente] // this.Divi[this[componente].Position[0]][this[componente].Position[1]] = this[componente]

    }



  }

}

