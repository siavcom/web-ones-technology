//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class : tip_bpe
// Description : Tipo (0=Interno, 1=Publico)
// Author : El Fer Blocks
// Creation : 2024-01-03
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { captureComponent } from "@/classes/captureComponent";

export class tip_bpe extends captureComponent {
  constructor() {
    super();

    this.prop.textLabel = "Publico en general";
    this.prop.Type = "checkBox";
    this.prop.ControlSource = "vi_cap_comebpe.tip_bpe";
    this.prop.Value = 1;
    this.prop.Capture = true;
    this.prop.updateKey = false;
    this.prop.ReadOnly = true;
  }

  async when() {
    await this.interactiveChange();
    this.prop.Valid = true;
    return !this.prop.ReadOnly;
  }

  async interactiveChange() {
    if (this.prop.Value == 1) {
      this.Form.cop_nom.prop.Visible = false;
      this.Form.cod_nom.prop.Visible = false;
      this.Form.nom_nom.prop.Visible = false;

      this.Form.tba_tba.prop.Visible = false;
      this.Form.nom_tba.prop.Visible = false;

      this.Form.cam_cam.prop.Visible = false;
      this.Form.pla_cam.prop.Visible = false;
      this.Form.des_mar.prop.Visible = false;
      this.Form.des_tiu.prop.Visible = false;

      this.Form.pla_bpe.prop.Visible = true;
      this.Form.cli_bpe.prop.Visible = true;
      this.Form.cho_bpe.prop.Visible = true;
    } else {
      this.Form.cop_nom.prop.Visible = true;
      this.Form.cod_nom.prop.Visible = true;
      this.Form.nom_nom.prop.Visible = true;

      this.Form.tba_tba.prop.Visible = true;
      this.Form.nom_tba.prop.Visible = true;

      this.Form.cam_cam.prop.Visible = true;
      this.Form.pla_cam.prop.Visible = true;
      this.Form.des_mar.prop.Visible = true;
      this.Form.des_tiu.prop.Visible = true;

      this.Form.pla_bpe.prop.Visible = false;
      this.Form.cli_bpe.prop.Visible = false;
      this.Form.cho_bpe.prop.Visible = false;

      for (const comp of this.Form.main) // ponemos como validados todos los componentes
        if (
          !this.Form[comp].prop.updateKey &&
          this.Form[comp].prop.Capture &&
          this.Form[comp].prop.Visible
        )
          this.Form[comp].prop.Valid = false;
    }
  }
}
