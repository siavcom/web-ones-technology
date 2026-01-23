//////////////////////////////////////////////
// This class COMPONENT was generated automatically by web-ones-technology
// @baseClass  : Component
// @class : dap_cpy
// Description : Datos del proveedor externo
// @author: El Fer Blocks
// Creation : 2024-07-30
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class

///////////////////////////////////////

import { COMPONENT } from '@/classes/Component'


export class dap_cpy extends COMPONENT {

  constructor() {
    super()

    // const nom_ind=renglon[i]['nom_ind']

    this.prop.Type = 'json'
    this.prop.Caption = 'Datos generales del proveedor'
    this.prop.ControlSource = 'vi_cap_comecpy.dap_cpy'
    this.prop.ToolTipText = 'Datos del proveedor como Telefonos, e-mail, dirección, pagina web , etc'
    this.prop.Capture = true
    //this.style.width = "720px"
    //this.style.border= "double"
    this.style.bordeRadius = "3px"

    this.style.width = 'fit-content'
    this.inputStyle.backgroundColor = "lightgray"

    //this.inputStyle.width = "512px"



  }
}
