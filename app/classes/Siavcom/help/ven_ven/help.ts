
//////////////////////////////////////////////
// This Form was generated automatically by web-ones-technology
// BaseClass : help
// Class : help
// Description : Help de ayuda de vendedores
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
    this.prop.ColumnTextLabel = 'Buscador de vendedores'
    this.where = ''
    this.prop.RecordSource = 'man_comeven' // tabla donde buscar datos
    this.browse.prop.Caption = 'Vendedores'
    this.prop.cam_pri = 'nom_ven' // campo de buqueda principal


    // Campos a mostrar en la tabla 
    this.fields = [["ven_ven", "Vendedor", "16px"],
    ["nom_ven", "Nombre", "128px"],
    ["rfc_ven", "RFC", "32px"],
    ["dir_ven", "Dirección", "128px"],
    ["pob_ven", "Población", "64px"],
    ["tel_ven", "Telefono", "64px"]
    ];
  }


}

