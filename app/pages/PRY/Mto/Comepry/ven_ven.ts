//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class : ven_ven
// Description : Vendedor
// Author : El Fer Blocks
// Creation : 2023-07-20
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { CAPTURECOMPONENT } from '@/classes/CaptureComponent'
import { help } from '@/classes/Siavcom/help/ven_ven/help'
import { nom_ven } from "./nom_ven";

export class ven_ven extends CAPTURECOMPONENT {
  public help = new help()
  public nom_ven = new nom_ven();

  constructor() {
    super()

    // const nom_ind=renglon[i]['nom_ind']
    this.prop.Caption = 'Vendedor'
    this.prop.Type = 'number'
    this.prop.BaseClass = 'editText'
    this.prop.ControlSource = 'vi_cap_comepry.ven_ven'
    this.prop.Value = 0
    this.prop.Min = "0"
    this.prop.Max = "99999"
    this.prop.Decimals = 0
    this.prop.Capture = true
    this.prop.updateKey = false
    this.prop.ErrorMessage = 'Vendedor inválido'
    this.prop.Help = true;
    this.inputStyle.width = "64px";

  }

  ////////////////////////////////// 
  // event valid 
  ///////////////////////////////////

  override async valid() {
    if (this.prop.Value == 0) {
      this.nom_ven.prop.Value = ''
      return true
    }

    const ven_ven = this.prop.Value
    const m = { ven_ven }

    const data = await use('lla1_ven', m)
    if (data.length == 0) {
      return false
    }
    this.nom_ven.prop.Value = data[0].nom_ven
    this.prop.Valid = true

    console.log('valid ven_ven data=', data, this.nom_ven.prop.Value)

    return true

  }

}
