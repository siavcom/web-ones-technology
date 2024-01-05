//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class : cod_nom
// Description : Codigo cliente o proveedor
// Author : El Fer Blocks
// Creation : 2024-01-03
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { captureComponent } from "@/classes/captureComponent";

export class cod_nom extends captureComponent {
  constructor() {
    super();

    // const nom_ind=renglon[i]['nom_ind']

    this.prop.textLabel = "Codigo cliente o proveedor";
    this.prop.Type = "text";
    this.prop.BaseClass = "editText";
    this.prop.ControlSource = "vi_cap_comebpe.cod_nom";
    this.prop.MaxLength = 12;

    this.prop.Capture = true;
    this.prop.updateKey = false;
    this.prop.ReadOnly = true;
    this.prop.componentStyle.width = "128px";
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
    if (this.prop.Value.trim() == "") {
      return true;
    }
    const m = {
      cop_nom: this.Form.cop_nom.prop.Value,
      cod_nom: this.prop.Value,
    };
    const res = await this.Sql.execute(
      `select nom_nom from man_comenom where cop_nom='${m.cop_nom}' and cod_nom='${m.cod_nom}' `
    );
    if (res && res[0].cam_cam && res[0].nom_nom.trim() > " ") {
      this.Form.nom_nom.prop.Value = res[0].nom_nom;
      this.prop.Valid = true;
    } else this.prop.Valid = false;
    return this.prop.Valid;
  }
}
