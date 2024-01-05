//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class : tba_tba
// Description : Chofer (trabajador siavcom)
// Author : El Fer Blocks
// Creation : 2024-01-03
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { captureComponent } from "@/classes/captureComponent";

export class tba_tba extends captureComponent {
  constructor() {
    super();

    // const nom_ind=renglon[i]['nom_ind']

    this.prop.textLabel = "Chofer (trabajador siavcom)";
    this.prop.Type = "text";
    this.prop.BaseClass = "editText";
    this.prop.ControlSource = "vi_cap_comebpe.tba_tba";
    this.prop.Placeholder = "Chofer (trabajador siavcom)";
    this.prop.ToolTipText = "Chofer (trabajador siavcom)";
    this.prop.MaxLength = 12;
    this.prop.Min = "0";
    this.prop.Max = "2147483647";
    this.prop.Decimals = 0;
    this.prop.Capture = true;
    this.prop.updateKey = false;
    this.prop.ReadOnly = true;
    this.prop.Visible = false;
  }

  //////////////////////////////////
  // event when
  ///////////////////////////////////

  async when() {
    if (this.Form.tip_bpe.prop.Value == 0) {
      this.prop.ReadOnly = false;
    } else {
      this.prop.ReadOnly = true;
    }

    this.prop.Valid = true;
    return !this.prop.ReadOnly;
  }

  //////////////////////////////////
  // event valid
  ///////////////////////////////////

  async valid() {
    if (this.prop.Value == 0) {
      this.prop.Valid = true;
      return true;
    }

    const res = await this.Sql.execute(
      `select nom_tba from man_cometba where tba_tba=${this.prop.Value}`
    );
    if (res && res[0].nom_tba.trim() > " ") {
      this.Form.nom_tba.prop.Value = res[0].nom_tba;
      this.prop.Valid = true;
    } else this.prop.Valid = false;

    return this.prop.Valid;
  }
}
