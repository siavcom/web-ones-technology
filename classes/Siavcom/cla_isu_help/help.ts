
//////////////////////////////////////////////
// This Form was generated automatically by web-ones-technology
// BaseClass : help
// Class : help
// Description : Help para insumos
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 2024-04-21
// Update Date  : 
/////////////////////////////////////////////

///////////////////////////////////////
// Base class
///////////////////////////////////////
import { HELP } from "@/classes/help/help"
export class help extends HELP {
  constructor() {
    super()
    this.textLabel = 'Buscador de insumos'
    this.prop.RecordSource = 'man_comeisu' // tabla donde buscar datos
    this.browse.prop.textLabel = 'insumos'
    this.prop.cam_pri = 'des_isu' // campo de buqueda principal

    // Campos a mostrar en la tabla
    this.fields = [["cla_isu", "Clave", "64px"],
    ["des_isu", "Descripción", "100px"]]

    this.where = ''

  }


}

