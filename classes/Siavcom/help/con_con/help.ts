
//////////////////////////////////////////////
// This Form was generated automatically by web-ones-technology
// BaseClass : help
// Class : help
// Description : Help para consignatarios
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 2024-04-29
// Update Date  : 
/////////////////////////////////////////////

///////////////////////////////////////
// Base class
///////////////////////////////////////
import { HELP } from "@/classes/help/help"
export class help extends HELP {
  cop_nom: string
  cod_nom: string
  constructor() {
    super()
    this.textLabel = 'Buscador de consignatarios'
    this.where = ''
    this.prop.RecordSource = 'man_comecon' // tabla donde buscar datos
    this.browse.prop.textLabel = 'Consigantarios'
    this.prop.cam_pri = 'noc_con' // campo de buqueda principal
    this.prop.Where = " "
    this.cop_nom = 'C'
    this.cod_nom = ''


    // Campos a mostrar en la tabla 
    this.fields = [["con_con", "Código", "32px"],
    ["noc_con", "Nombre", "128px"],
    ["dic_con", "Dirección", "128px"],
    ["coc_con", "Dirección", "128px"],
    ["poc_con", "Población", "64px"],
    ["cpc_con", "Población", "32px"],
    ["t1c_con", "Telefonos", "64px"]
    ];
  }

  async open() {
    this.prop.Where = ` cop_nom='${this.cop_nom}' and cod_nom='${this.cod_nom}'  `
    super.open()
  }

}
