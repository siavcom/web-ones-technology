//////////////////////////////////////////////
// @baseClass  : component
// @class : par_mon
// Description : Paridad de monedas
// @author: El Fer Blocks
// Creation : 2025-10-30
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { PAR_MON } from "@/classes/Siavcom/par_mon/par_mon";
export class par_mon extends PAR_MON {
  constructor() {
    super();
    //this.vm1_pge.prop.ControlSource = 'vi_cap_comedoc.vm1_doc'
    this.vm2_pge.prop.ControlSource = 'vi_cap_comedoc.vm2_doc'
    this.vm3_pge.prop.ControlSource = 'vi_cap_comedoc.vm3_doc'
    this.vm4_pge.prop.ControlSource = 'vi_cap_comedoc.vm4_doc'
    this.vm5_pge.prop.ControlSource = 'vi_cap_comedoc.vm5_doc'
    this.prop.Messages[0] = 'Paridades del documento'

    this.asignaRecno()
  }
  override async init() {
    super.init()
    this.RemoveObject('pr5_pge') // removemos protecciones
    this.RemoveObject('pr4_pge')
    this.RemoveObject('pr3_pge')
    this.RemoveObject('pr2_pge')
    this.RemoveObject('pr1_pge')

    this.RemoveObject('dm1_pge') // removemos decimales de captura CFDI
    this.RemoveObject('dm2_pge')
    this.RemoveObject('dm3_pge')
    this.RemoveObject('dm4_pge')
    this.RemoveObject('dm5_pge')

  }

  override async open() {
    const cometdo = await goto(0, 'cometdo')
    this.block[0].title = this.prop.Messages[0] + cometdo.des_tdo + ' ' + this.Form.ndo_doc.prop.Value.toString()
    super.open()
  }

  override async close() {
    super.close()
    /*
    const alias = 'vi_lla1_doc'
    const recno = await recNo(alias)
    updateCampo(1,alias+'.vm1_doc' , recno)
    updateCampo(this.vm2_pge.prop.Value,alias+'.vm2_doc' , recno)
    updateCampo(this.vm3_pge.prop.Value,alias+'.vm3_doc' , recno)
    updateCampo(this.vm4_pge.prop.Value,alias+'.vm4_doc' , recno)
    updateCampo(this.vm5_pge.prop.Value,alias+'.vm5_doc' , recno)
    */
    this.Parent.Bt_par_doc.prop.Visible = true

  }
}