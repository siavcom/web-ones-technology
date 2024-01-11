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
    this.prop.BaseClass = "comboBox";

    this.prop.RowSourceType = 3;
    this.prop.RowSource = `select max(bpe_bpe)+1 as bpe_bpe,' Nueva Boleta' as pla_bpe from man_comebpe where bas_bpe=1`;

    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 1;
    this.prop.ColumnWidths = "64px,128px";

    this.style.width = "400px";

    //this.prop.ControlSource = "vi_cap_comebpe.bpe_bpe";
    this.prop.Min = "1";
    this.prop.Max = "2147483647";
    this.prop.Capture = true;
    this.prop.updateKey = true;

    this.prop.Value = 1;

    this.prop.componentStyle.width = "54px";
    this.prop.componentStyle.fontSize = "17px";
    this.prop.componentStyle.fontWeight = "bold";
    this.style.fontSize = "17px";
    this.style.fontWeight = "bold";
    this.prop.First = true;
  }
  async when() {
    this.prop.RowSource = "";
    this.prop.RowSource = `select max(bpe_bpe)+1 as bpe_bpe,' Nueva Boleta' as pla_bpe from man_comebpe where bas_bpe=${this.Form.bas_bpe.prop.Value} union \
    select bpe_bpe,case when tip_bpe=1 then pla_bpe when tip_bpe=0 then cast(cam_cam as char) end as pla_bpe from man_comebpe \
    where pe2_bpe=0 and bas_bpe=${this.Form.bas_bpe.prop.Value} order by pla_bpe`;

    /*

    console.log("when bpe_bpe");
    this.Form.bt_pesada.prop.Visible = false;

    const data = await this.Sql.execute(`         
           select max(bpe_bpe)+1 as bpe_bpe from man_comebpe where bas_bpe=${this.Form.bas_bpe.prop.Value}`);

  

 
   console.log("when bpe_bpe", data);

    if (data[0]) {
      this.prop.Valid = true; // se pone en Verdadero para que no llame rutina validacion
      if (data[0].bpe_bpe == null) this.prop.Value = 1;
      else this.prop.Value = +data[0].bpe_bpe;
   
    }
*/

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
    const valid = await super.valid();

    if (!valid) return false;

    const data = await this.Sql.localAlaSql(`select * from vi_cap_comebpe `);

    if (data && data[0] && data[0].key_pri > 0) {
      console.log("Ya hay pesada ", data);
      // Ya hay datos
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

        this.Form.cho_bpe.prop.Visible = false;
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

        this.Form.cho_bpe.prop.Visible = true;
        this.Form.cli_bpe.prop.Visible = true;
        this.Form.pla_bpe.prop.Visible = true;
        // this.Form.cho_bpe.prop.Visible = true;
      }

      this.Form.pe2_bpe.prop.Visible = true;
      this.Form.tp2_bpe.prop.Visible = true;
    } else {
      // Pesada nueva
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

      for (const comp of this.Form.main) // ponemos como validados todos los componentes
        if (this.Form[comp].prop.Capture) this.Form[comp].prop.Valid = true;
      this.Form.tip_bpe.prop.Valid = false;
    }

    // this.Form.bt_graba.prop.Visible = false;

    if (this.Form.pe2_bpe.prop.Value > 0)
      // ya no se puede volver a pesar
      this.Form.bt_pesada.prop.Visible = false;
    else this.Form.bt_pesada.prop.Visible = true;
    return true;
  }
}
