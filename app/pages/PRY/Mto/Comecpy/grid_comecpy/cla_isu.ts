//////////////////////////////////////////////
// This class COMPONENT was generated automatically by web-ones-technology
// BaseClass : Component
// Class : cla_isu
// Description : CLAVE DEL INSUMO
// Author : El Fer Blocks
// Creation : 2024-03-21
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COLUMN } from '@/classes/Column'
import { help } from '@/classes/Siavcom/help/cla_isu/help'
import { des_isu } from './des_isu'
//import { modal_com } from './detail_compra/modal_com'

export class cla_isu extends COLUMN {
  public help = new help()
  public des_isu = new des_isu()
  cla_isu: string = ''

  constructor() {
    super()

    this.prop.ColumnTextLabel = 'Insumo del Siavcom'
    this.prop.ControlSource = 'vi_cap_comecpy.cla_isu'
    this.prop.MaxLength = 30
    this.prop.Help = true;
    this.prop.Capture = true
    this.prop.ErrorMessage = 'No existe la clave del insumo'
    this.inputStyle.width = "128px"// "218px" // Son 30 puntos del icono de ayuda
    this.style.width = "max-content"
    this.asignaRecno()
  }

  override async init() {
    this.prop.InputMask = this.Form.mPublic.ima_pge.trim()
  }


  async when() {
    if (this.Parent.isi_cpy.prop.Value != 'S') {
      this.prop.ReadOnly = true
      this.prop.Valid = true
      this.Parent.med_mov.prop.Valid = true
      return false
    }

    if (this.cla_isu.trim() == '')
      this.cla_isu = this.prop.Value

    this.prop.ReadOnly = ! await this.Parent.whenVta()
    if (this.prop.ReadOnly) {
      this.prop.Valid = true
      return false
    }

    this.prop.ReadOnly = false
    this.prop.Valid = true

    this.old_value = this.prop.Value
    return true
  }

  async valid(old_data?: {}) {
    let sw_old = false
    if (old_data)
      sw_old = true


    if (this.old_value > ' ' && this.old_value == this.prop.Value)
      return true

    const cla_isu = this.prop.Value


    if (this.Parent.isi_cpy.prop.Value != 'S') {
      this.prop.Valid = true
      return true
    }
    if (cla_isu.length == 0) {
      return false
    }
    //    if (this.cla_isu.trim() == this.prop.Value.trim())
    //      return true


    const res = await this.Form.obtInsumo(cla_isu)

    if (res.resultado == 0) {
      return false
    }

    this.prop.Valid = true

    if (res.dea_isu.trim().length > 10) {
      this.des_isu.prop.Value = res.dea_isu
      this.Parent.detail_vta.modal_vta.des_isu.prop.Value = res.dea_isu
    }
    else {
      this.des_isu.prop.Value = res.des_isu
      this.Parent.detail_vta.modal_vta.des_isu.prop.Value = res.des_isu
    }

    // actualizamos vista de actualizacion
    if (this.cla_isu != cla_isu) {// Si es otra clave o clave nueva

      const ins_sql = `update vi_cap_comecpy set cla_tca='${res.cla_tca}',dea_tca='${res.dea_tca}',\
       ppa_tca=${res.ppa_tca},fvi_tca='${res.fvi_tca}',un1_isu='${res.un1_isu}',\
       un2_isu='${res.un2_isu}',un3_isu='${res.un3_isu}',fa1_isu=1,fa2_isu=${res.fa2_isu},\
       fa3_isu=${res.fa3_isu} , pv1_isu=${res.pv1_isu},pv2_isu=${res.pv2_isu},pv3_isu=${res.pv3_isu},\
       pv4_isu=${res.pv4_isu},pv5_isu=${res.pv5_isu},prr_pro=${res.prr_pro},uni_mov='${res.un1_isu}', \
       med_mov=1,pve_mov=${res.pve_mov},mon_mov=${res.mon_isu} \
       where recno = ${this.Recno}`


      await this.Sql.localAlaSql(ins_sql)


      if (!old_data)
        old_data = {
          med_mov: 1,
          mon_mov: res.mon_isu,
          pve_mov: res.pve_mov
        }


    }

    const med_mov = ['', '', '', '']
    med_mov[1] = res.un1_isu
    med_mov[2] = res.un2_isu
    med_mov[3] = res.un3_isu

    const new_data = await this.Sql.scatter(['med_mov', 'mon_mov', 'pve_mov'], 'vi_cap_comecpy')

    if (!old_data)
      old_data = new_data

    const fac_isu = [0, 0, 0, 0]
    fac_isu[1] = 1
    fac_isu[2] = res.fa2_isu
    fac_isu[3] = res.fa3_isu

    const vmo_pge = [0, 0, 0, 0, 0, 0]
    vmo_pge[1] = 1
    vmo_pge[2] = this.Form.mPublic.va2_pge
    vmo_pge[3] = this.Form.mPublic.va3_pge
    vmo_pge[4] = this.Form.mPublic.va4_pge
    vmo_pge[5] = this.Form.mPublic.va5_pge

    // pasamos a la moneda del precio de venta que tiene el insumo
    if (old_data.pve_mov == 0) {
      old_data.pve_mov = res.pve_mov
      old_data.mon_mov = res.mon_isu
      new_data.mon_mov = res.mon_isu
    }
    let pve_mov = old_data.pve_mov

    if (old_data.mon_mov != new_data.mon_mov)
      pve_mov = old_data.pve_mov * vmo_pge[old_data.mon_mov] / vmo_pge[new_data.mon_mov]
    // pasamos el precio de venta a la unidad principal

    if (old_data.med_mov != new_data.med_mov)
      pve_mov = pve_mov / fac_isu[old_data.med_mov] * fac_isu[new_data.med_mov]

    pve_mov = await roundTo(pve_mov, this.Form.mPublic.dcp_pge)


    this.Parent.detail_vta.modal_vta.pve_mov.prop.Value = pve_mov
    this.Parent.detail_vta.modal_vta.mon_mov.prop.Value = new_data.mon_mov
    this.Form.grid_comecpy.med_mov.when() // = new_data.mon_mov
    await this.Sql.localAlaSql(`update vi_cap_comecpy set pve_mov=${pve_mov},mon_mov=${new_data.mon_mov} where recno = ${this.Recno}`)


    if (!sw_old) {

      // this.Parent.detail_vta.modal_vta.pve_mov.prop.Value = res.pve_mov
      this.Parent.detail_vta.modal_vta.med_mov.prop.Value = res.uni_mov
      //this.Parent.detail_vta.modal_vta.mon_mov.prop.Value = res.mon_isu

    }

    if (this.Parent.detail_vta.modal_vta.cla_isu.prop.Value != this.prop.Value)
      this.Parent.detail_vta.modal_vta.cla_isu.prop.Value = this.prop.Value
    if (this.Parent.detail_com.modal_com.cla_isu.prop.Value != this.prop.Value)
      this.Parent.detail_com.modal_com.cla_isu.prop.Value = this.prop.Value




    return true
  }

}


