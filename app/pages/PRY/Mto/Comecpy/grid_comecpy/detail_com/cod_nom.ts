//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : Component
// Class : cod_nom
// Description : Código del proveedor que surte el insumo
// Author : El Fer Blocks
// Creation : 2024-03-21
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from "@/classes/Component";
import { nom_nom } from './nom_nom'
import { help } from '@/classes/Siavcom/help/cod_nom/help'

export class cod_nom extends COMPONENT {
  public help = new help()
  public nom_nom = new nom_nom()

  constructor() {
    super()
    this.prop.Caption = 'Proveedor'
    this.prop.Type = 'text'
    this.prop.BaseClass = 'editText'
    this.prop.ControlSource = 'vi_cap_comecpy.cod_nom'
    this.prop.MaxLength = 12
    this.prop.Capture = true
    this.prop.updateKey = false
    this.prop.Help = true;
    this.prop.ErrorMessage = 'No existe el proveedor'
    this.prop.ToolTipText = 'Código del proveedor que surte el insumo'
    this.help.cop_nom = 'P'
    this.inputStyle.width = "92px";
    this.style.width = "auto"
  }

  async valid() {
    this.Parent.cla_prv.prop.Value = ''
    this.Parent.dea_prv.prop.Value = ''
    this.Parent.ppa_prv.prop.Value = 0
    this.Parent.mop_prv.prop.Value = 1
    this.Parent.fvi_prv.prop.Value = '1900-01-01'

    const m = {
      cop_nom: 'P',
      cod_nom: this.prop.Value,
      cla_isu: this.Parent.cla_isu.prop.Value,
    }

    let data = await this.Sql.use('lla1_nom', m)

    if (data.length > 0) {
      this.prop.Valid = true
      this.Parent.nom_nom.prop.Value = data[0]['nom_nom']

    } else
      return false

    if (this.Parent.isi_cpy.prop.Value == 'S' && m.cla_isu.trim().length > 0) {

      //let data = await this.Sql.use('lla1_tca', m)

      const data = await SQLExec(`select cast(getdate() as date) as fpo_pge,* from  man_cometca where cla_isu ='${m.cla_isu}' \
        and cop_nom='${m.cop_nom}' and cod_nom='${m.cod_nom}' `)



      if (data.length > 0) { // Si hay contrato con proovedor

        this.Parent.cla_prv.prop.Disabled = true
        this.Parent.cla_prv.prop.Value = data[0].cla_tca
        this.Parent.dea_prv.prop.Value = data[0].dea_tca
        this.Parent.ppa_prv.prop.Value = data[0].ppa_tca
        this.Parent.mop_prv.prop.Value = data[0].mop_tca
        this.Parent.fvi_prv.prop.Value = data[0].fvi_tca
        /*
                // si ya caduco la fecha de vigencia
                if (data[0].fvi_tca > data[0].fpo_pge) {
                  this.Parent.cla_tca.prop.Disabled = true
                  this.Parent.dea_tca.prop.Disabled = true
                  this.Parent.ppa_tca.prop.Disabled = true
                  this.Parent.mop_tca.prop.Disabled = true
                  this.Parent.fvi_tca.prop.Disabled = true
                } else {
                  this.Parent.cla_tca.prop.Disabled = false
                  this.Parent.dea_tca.prop.Disabled = false
                }
        */
      } else {

        this.Parent.cla_prv.prop.Value = ''
        this.Parent.dea_prv.prop.Value = ''
        this.Parent.ppa_prv.prop.Value = 0
        this.Parent.mop_prv.prop.Value = 1
        this.Parent.fvi_prv.prop.Value = '1900-01-01'

        this.Parent.cla_prv.prop.Disabled = false
        this.Parent.dea_prv.prop.Disabled = false
      }
    }
    return true
  }
}
