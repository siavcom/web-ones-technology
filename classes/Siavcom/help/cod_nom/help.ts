//////////////////////////////////////////////
// This Form was generated automatically by web-ones-technology
// BaseClass : help
// Class : help
// Description : Help para clientes
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 2024-03-21
// Update Date  : 
/////////////////////////////////////////////

///////////////////////////////////////
// Base class
///////////////////////////////////////
import { HELP } from "@/classes/help/help"
export class help extends HELP {
  constructor() {
    super()
    this.textLabel = 'Buscador'
    this.where = ''
    this.prop.RecordSource = 'man_comenom' // tabla donde buscar datos
    this.browse.prop.textLabel = 'Clientes'
    this.prop.cam_pri = 'nom_nom' // campo de buqueda principal
    this.prop.cop_nom = 'C'

    this.prop.Where = ""

    // Campos a mostrar en la tabla 
    this.fields = [["cod_nom", "Código", "32px"],
    ["nom_nom", "Nombre", "128px"],
    ["rfc_nom", "RFC", "32px"],
    ["dir_nom", "Dirección", "128px"],
    ["ext_nom", "Exterior", "10px"],
    ["pob_nom", "Población", "64px"],
    ["te1_nom", "Telefonos", "64px"],
    ["ema_nom", "Email", "64px"]];
  }

  async open() {

    this.prop.Where = ` cop_nom='${this.cop_nom}'  `

    if (this.cop_nom == 'C') {
      this.browse.prop.textLabel = 'Clientes'
    } else {
      this.browse.prop.textLabel = 'Proveedores'

    }

  }
}

