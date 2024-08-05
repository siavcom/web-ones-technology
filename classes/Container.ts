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
  block = [] //{}


  container =
    {
      component: {
      },
      prop: {
        Visible: true
      },
      style: {
        border: '1px solid rgb(0, 0, 0)',
        background: 'bisque',
        borderRadius: '10px',
        boxShadow: 'inset 0 3px 6px rgba(0,0,0,0.16), 0 4px 6px rgba(0,0,0,0.45)',
        padding: '10px',
        // display: 'inline-flex',
        width: '-moz-available',
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'space-around' // 'space-between'  
      },
      title: ''
    }



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
    this.prop.BaseClass = 'container' //'modalContainer'//
    this.prop.Position = 'main'
    this.style = {
      maxWidth: 'fit-content',
      maxHeight: 'fit-content',
      borderStyle: 'double',
      background: 'antiquewhite',
      borderRadius: '10px',
      padding: '20px',   //Margen entre los bordes y el contenido
    }
    // Estilo de cada contenedor del modal


  }
  async init() {
    await super.init()
    let elementos = []
    // sumanos todos los componentes en uno solo
    elementos = elementos.concat(this.header)
    elementos = elementos.concat(this.main)
    elementos = elementos.concat(this.footer)
    // recorremos todos los componentes
    for (let i = 0; i < elementos.length; i++) {
      const componente = elementos[i]

      if (this[componente].Position && this[componente].Position.length > 0) {  // Si es componete tiene posision en la pantalla

      }
      else {  // Si tiene posicion relativa header, main o footer
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
        if (this.Divi[pos_ver])
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

    console.log('Container ', this.prop.Name, 'componentes=', this.Divi)

  }

}

