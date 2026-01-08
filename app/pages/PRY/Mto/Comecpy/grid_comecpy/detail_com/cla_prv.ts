//////////////////////////////////////////////
// This class COMPONENT was generated automatically by web-ones-technology
// BaseClass : Component
// Class : cla_prv
// Description : CLAVE DEL INSUMO tabla de claves alternas
// Author : El Fer Blocks
// Creation : 2024-03-21
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from '@/classes/Component'
//import { help } from '@/classes/Siavcom/cla_tca_help/help'
export class cla_prv extends COMPONENT {
  //public help = new help()

  constructor() {
    super()
    this.prop.Caption = 'Clave del insumo del proveedor'
    this.prop.Type = 'text'
    this.prop.BaseClass = 'editText'
    this.prop.ControlSource = 'vi_cap_comecpy.cla_prv'
    this.prop.ToolTipText = "Clave que maneja el proveedor"
    this.prop.ErrorMessage = 'Clave no valida'
    this.prop.MaxLength = 30
    this.prop.Capture = true
    this.prop.updateKey = false
    this.inputStyle.width = "225px"

  }



  async when() {
    if (this.Parent.isi_cpy.prop.Value == 'S')
      return true
    return false

    //ThisForm.grid_comecpy.detail_com.modal_com.cla_tca.when

  }

  async valid() {
    if (this.prop.Value.trim().length == 0) {
      return false
    }

    if (this.Parent.psi_cpy.prop.Value == 0) {

      this.Parent.dea_prv.prop.Value = ''
      this.Parent.ppa_prv.prop.Value = 0
      this.Parent.mop_prv.prop.Value = 1
      this.Parent.fvi_prv.prop.Value = '1900-01-01'

      this.Parent.cla_prv.prop.Disabled = false
      this.Parent.dea_prv.prop.Disabled = false

      return true

    }
    const m = {
      cla_tca: this.prop.Value,
      cla_isu: this.Parent.cla_isu.prop.Value,
      cop_nom: 'P',
      cod_nom: this.Parent.cod_nom.prop.Value
    }

    // revisa que no exista la clave alterna en el proveedor
    const data = await SQLExec(`select cast(getdate() as date) as fpo_pge,* from  man_cometca where cla_tca ='${m.cla_tca}' \
      and cop_nom='${m.cop_nom}' and cod_nom='${m.cod_nom}' `)


    if (data.length > 0) {

      this.Parent.dea_prv.prop.Value = data[0].dea_tca
      this.Parent.ppa_prv.prop.Value = data[0].ppa_tca
      this.Parent.mop_prv.prop.Value = data[0].mop_tca
      this.Parent.fvi_prv.prop.Value = data[0].fvi_tca
      /*
            this.Parent.dea_tca.prop.Disabled = true
            this.Parent.ppa_tca.prop.Disabled = true
            this.Parent.mop_tca.prop.Disabled = true
            this.Parent.fvi_tca.prop.Disabled = true
      */
      return true

    }
    this.Parent.dea_prv.prop.Disabled = false
    // this.Parent.ppa_tca.prop.Disabled = false
    // this.Parent.mop_tca.prop.Disabled = false
    // this.Parent.fvi_tca.prop.Disabled = false
    if (this.Parent.uco_cpy.prop.Value == '')
      this.Parent.uco_cpy.prop.Value = this.Form.mPublic.log_usu
    return true
  }
}
