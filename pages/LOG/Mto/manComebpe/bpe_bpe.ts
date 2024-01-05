//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class : bpe_bpe
// Description : Numero de boleta de pesada
// Author : El Fer Blocks
// Creation : 2024-01-03
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { captureComponent } from "@/classes/captureComponent";
export class bpe_bpe extends captureComponent {
  constructor() {
    super();

    this.prop.textLabel = "Numero de boleta";
    this.prop.Type = "number";
    this.prop.ControlSource = "vi_cap_comebpe.bpe_bpe";
    this.prop.Min = "0";
    this.prop.Max = "2147483647";
    this.prop.Capture = true;
    this.prop.updateKey = true;
    this.prop.ReadOnly = false;
    this.prop.Value = 1;

    this.prop.componentStyle.width = "64px";
    this.prop.componentStyle.fontSize = "17px";
    this.prop.componentStyle.fontWeight = "bold";
    this.style.fontSize = "17px";
    this.style.fontWeight = "bold";
  }
  async when() {
    const data = await this.Sql.execute(`         
           select max(bpe_bpe)+1 as bpe_bpe from man_comebpe where bas_bpe=${this.Form.bas_bpe.prop.Value}`);

    console.log("when bpe_bpe", data);

    if (data[0]) {
      this.prop.Valid = true; // se pone en Verdadero para que no llame rutina validacion
      if (data[0].bpe_bpe == null) this.prop.Value = 1;
      else this.prop.Value = +data[0].bpe_bpe;
    }

    if (this.prop.Value == 0) this.prop.Value = 1;

    this.Form.cop_nom.prop.Visible = false;
    this.Form.cod_nom.prop.Visible = false;
    this.Form.nom_nom.prop.Visible = false;

    this.Form.tba_tba.prop.Visible = false;
    this.Form.nom_tba.prop.Visible = false;

    this.Form.cam_cam.prop.Visible = false;
    this.Form.pla_cam.prop.Visible = false;
    this.Form.des_mar.prop.Visible = false;
    this.Form.des_tiu.prop.Visible = false;
    this.Form.pe2_bpe.prop.Visible = false;
    this.Form.tp2_bpe.prop.Visible = false;

    return true;
  }
  async valid() {
    if (!(await super.valid())) return false;
    const data = await this.Sql.localAlaSql(
      `select bpe_bpe from vi_cap_comebpe `
    );

    if (data && data[0] && data[0].key_pri > 0) {
      if (data[0].tip_bpe == 0) {
        // Siavcom
        this.Form.cop_nom.prop.Visible = true;
        this.Form.cod_nom.prop.Visible = true;
        this.Form.nom_nom.prop.Visible = true;

        this.Form.tba_tba.prop.Visible = true;
        this.Form.nom_tba.prop.Visible = true;

        this.Form.cam_cam.prop.Visible = true;
        this.Form.pla_cam.prop.Visible = true;
        this.Form.des_mar.prop.Visible = true;
        this.Form.des_tiu.prop.Visible = true;
        this.Form.cli_bpe.prop.Visible = false;
        this.Form.pla_bpe.prop.Visible = false;
      } else {
        // Publico en general

        this.Form.cop_nom.prop.Visible = false;
        this.Form.cod_nom.prop.Visible = false;
        this.Form.nom_nom.prop.Visible = false;

        this.Form.tba_tba.prop.Visible = false;
        this.Form.nom_tba.prop.Visible = false;

        this.Form.cam_cam.prop.Visible = false;
        this.Form.pla_cam.prop.Visible = false;
        this.Form.des_mar.prop.Visible = false;
        this.Form.des_tiu.prop.Visible = false;

        this.Form.cli_bpe.prop.Visible = true;
        this.Form.pla_bpe.prop.Visible = true;
        // this.Form.cho_bpe.prop.Visible = true;
      }

      this.Form.pe2_bpe.prop.Visible = true;
      this.Form.tp2_bpe.prop.Visible = true;
    } else {
      this.Form.cop_nom.prop.Visible = false;
      this.Form.cod_nom.prop.Visible = false;
      this.Form.nom_nom.prop.Visible = false;

      this.Form.tba_tba.prop.Visible = false;
      this.Form.nom_tba.prop.Visible = false;

      this.Form.cam_cam.prop.Visible = false;
      this.Form.pla_cam.prop.Visible = false;
      this.Form.des_mar.prop.Visible = false;
      this.Form.des_tiu.prop.Visible = false;
      this.Form.pe2_bpe.prop.Visible = false;
      this.Form.tp2_bpe.prop.Visible = false;
    }

    if (this.Form.pe2_bpe.prop.Value > 0) {
      // ya no se puede volver a pesar
      this.Form.bt_pesada.prop.Visible = false;
      return;
    }

    this.Form.bt_pesada.prop.Visible = true;
    this.Form.bt_pesada.prop.Disabled = false;
  }
}
