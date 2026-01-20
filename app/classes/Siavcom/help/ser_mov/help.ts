
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
  sse_pro: string

  constructor() {
    super()
    this.prop.ColumnTextLabel = 'Buscador de consignatarios'
    this.where = ''
    this.prop.RecordSource = 'vi_series_comemov' // tabla donde buscar datos
    this.browse.prop.Caption = 'Series'
    this.prop.cam_pri = 'ser_mov' // campo de buqueda principal
    this.prop.Where = " "
    this.sse_pro = 'S'


    // Campos a mostrar en la tabla 
    this.fields = [["ser_mov", "Serie/Lote", "32px"],
    ["fec_mov", "Fecha ingreso/lote", "128px"],
    ["ext_mov", "Dirección", "128px"],
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
