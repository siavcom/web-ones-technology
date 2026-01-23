//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// @baseClass  : component
// @class : ven_ven
// Description : Vendedor
// @author: El Fer Blocks
// Creation : 2023-07-20
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { CAPTURECOMPONENT } from '@/classes/CaptureComponent'
import { nom_ven } from "./nom_ven";
import { help } from '@/classes/Siavcom/help/ven_ven/help'

export class ven_ven extends CAPTURECOMPONENT {
  public nom_ven = new nom_ven();
  public help = new help()
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
    this.prop.Disabled = true

    this.prop.Help = true;
    this.inputStyle.width = "64px";

  }


}
