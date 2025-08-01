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

  constructor() {
    super()
    //this.prop.Name = null ? 'Container' : this.prop.Name
    //this.Name = "Container";

    this.prop.BaseClass = 'container' //'modalContainer'//
    this.prop.Position = 'main'
    this.prop.Capture = false;
    this.style.borderRadius = '5%'
    this.captionStyle.color = 'black'
    this.captionStyle.fontWeight = 'bold'
    this.captionStyle.fontSize = '17px'
    this.style.height = 'auto'
    this.style.width = "80%";
    // Estilo de cada contenedor del modal


  }
  override async init() {
    await super.init()
    if (this.prop.BaseClass == 'modalContainer') {
      this.style.maxWidth = '90%'
      this.style.maxHeight = '90%'
      this.style.borderStyle = 'double'
      this.style.background = 'antiquewhite'
      this.style.backgroundColor = 'antiquewhite'
      this.style.left = '3%'
      this.style.borderRadius = '1.5%'
      this.style.padding = '3%'   //Margen entre los bordes y el contenido
      this.captionStyle.color = 'black'
    }

    /*let elementos = []
    for (let i = 0; i < this.elements.length; i++) {
      const Name = this.elements[i].Name
      elementos.push(Name)
    }
    /*
    console.log('Init Container', this.Name, 'Elements=', elementos)
    /*
        let elementos = []
        // sumanos todos los componentes en uno solo
        elementos = elementos.concat(this.header)
        elementos = elementos.concat(this.main)
        elementos = elementos.concat(this.footer)
        console.log('Init Container', this.Name, 'Elementos=', elementos)
    */
    // recorremos todos los componentes

    for (let i = 0; i < this.elements.length; i++) {

      //  console.log('1) Container ', this.prop.Name, 'componente=', this.elements[i].Name)
      const componente = this.elements[i].Name

      //    for (let i = 0; i < elementos.length; i++) {
      //const componente = elementos[i]

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

    // console.log('Container ', this.prop.Name, 'componentes=', this.Divi)

  }

}

