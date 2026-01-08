//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : Component
// Class : con_con
// Description : Consigantario del proveedor que surte el insumo
// Author : El Fer Blocks
// Creation : 2024-10-14
// Update Date  : 
/////////////////////////////////////////////

import { COMPONENT } from "@/classes/Component";
import { noc_con } from './noc_con'
import { help_con } from './con_con/help'

export class con_con extends COMPONENT {
  public help = new help_con()
  public noc_con = new noc_con()

  constructor() {
    super()
    this.prop.Caption = 'Consignatario'
    this.prop.Type = 'number'
    this.prop.ControlSource = 'vi_cap_comecpy.con_con'
    this.prop.Decimals = 0
    this.prop.Capture = true
    this.prop.updateKey = false
    this.prop.Help = true;
    this.prop.ErrorMessage = 'No hay datos'
    this.prop.ToolTipText = 'Número de consignatario'
    // this.help.cop_nom = 'P'
    this.inputStyle.width = "72px";
    this.style.width = "auto"
  }
  async valid() {
    this.Form.noc_con.Recno = 0

    if (this.prop.Value == 0)
      return true

    const m = {
      cop_nom: 'P',   //mPublic.cop_nom //.trim()
      cod_nom: this.Parent.cod_nom.prop.Value, //.trim()
      con_con: this.prop.Value,
    }

    const data = await this.Sql.use('lla1_con', m)
    if (data.length == 0) {
      this.prop.ErrorMessage = 'No existe'
      return false
    }
    this.Parent.noc_con.prop.Value = data[0].noc_con

    return true
  }



}




