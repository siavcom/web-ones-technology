
//////////////////////////////////////////////
// This Form was generated automatically by web-ones-technology
// BaseClass : Grid
// Class : vi_cap_dpy
// Description : Capture Grid
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 2024-03-21
// Update Date  : 
/////////////////////////////////////////////

///////////////////////////////////////
// Base class
///////////////////////////////////////
import { HELP } from "@/classes/Siavcom/help/help"
export class help extends HELP {
  constructor() {
    super()
    this.textLabel = 'Buscador de Clientes'
    this.where = ''
    this.prop.RecordSource = 'man_comenom' // tabla donde buscar datos
    this.browse.prop.textLabel = 'Clientes'
    this.prop.cam_pri = 'nom_nom' // campo de buqueda principal
    this.prop.RecordSource = `man_comenom`;
    this.prop.Where = " cop_nom='C' "

    // Campos a mostrar en la tabla 
    this.fields = [["cod_nom", "Código", "32px"],
    ["nom_nom", "Nombre", "100px"],
    ["rfc_nom", "RFC", "64px"],
    ["dir_nom", "Dirección", "124px"],
    ["ext_nom", "Exterior", "10px"],
    ["pob_nom", "Población", "64px"],
    ["te1_nom", "Telefonos", "64px"],
    ["ema_nom", "Email", "64px"]];
  }


}

