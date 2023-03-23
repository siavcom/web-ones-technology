//////////////////////////////////////////////
// Clase : Container
// Author : Fernando Cuadras Angulo
// Creacion : Septiembre/2021
// Ult.Mod  : 16/Marzo/2023
/////////////////////////////////////////////

import { COMPONENT } from '@/classes/Component'

export class container extends COMPONENT {
  //Dom: any = getCurrentInstance();
  eventos = [] // eventos a ejecutar en el stack
  estatus = []  // estatus de los componentes hijos
  header = []   // componentes hijos en header
  main : [] = [] // componentes hijos en main
  footer : [] = [] // componentes hijos en footer

  constructor() {
    super()
    //this.prop.BaseClass = 'container'
    this.prop.Name = 'Container'
    this.prop.Position = 'main'
//    this.Container = this
    this.style.maxWidth = '920px'

  }

  ///////////////////////////////////////////////////////////
  //iInit
  ////////////////////////////////////////////////
  public async Init() {  //Container est?: any
    console.log('Container elemento',this)

    let  TabIndex= 1
    let maxTabIndex =1
    let id = 0
    let comp = {}
    const header :[] = []
    const main :[] = []
    const footer = []
    const elements :[] = []
    for (const componente in this) {
      if (componente != 'Parent' &&
        componente != 'ThisForm' &&
        componente != 'Form' &&
        this[componente] != null &&
        this[componente] != undefined &&
        this[componente] &&
        this[componente].prop // &&
        //this[componente].InitForm) {
       ) {
        const name = this[componente].prop.Name
        console.log('Container elemento',name,this[component].prop)

        if (this[componente].prop && this[componente].prop.Position == 'header')
          header.push(name)

        if (this[componente].prop && this[componente].prop.Position == 'main'){
          main.push(name)
          if (this[componente].prop.TabIndex==0) {
            this[componente].prop.TabIndex=TabIndex
            TabIndex++
          } else 
            TabIndex=this[componente].prop.TabIndex+1


          if (maxTabIndex<TabIndex)
              maxTabIndex=TabIndex

        }
        if (this[componente].prop && this[componente].prop.Position == 'footer')
          footer.push(name)
      
          elements.push({
            Name: this[componente].prop.Name,
            Id: this[componente].prop.Order,
            Position: this[componente].prop.Position
          })

        id++
      }
    }


    this.header = header
    this.main = main
    this.elements = elements
    TabIndex=maxTabIndex  // asignamos el TabIndex maximo de elementos
    for (let i=footer.length-1;i>=0;i--){
        //console.log('Form footer ',footer[i])
        this[footer[i]].prop.TabIndex=TabIndex
        TabIndex++
    }

    this.footer = footer.reverse()
    console.log('Container init header',this.header)
    console.log('Container init main',this.main)
    console.log('Container init footer',this.footer)
    console.log('Container init elements',this.elements)

  }

}

