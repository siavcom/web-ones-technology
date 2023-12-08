//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class : num_pry
// Description : Número
// Author : El Fer Blocks
// Creation : 2023-07-20
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { captureComponent } from "@/classes/captureComponent";

export class num_pry extends captureComponent {
  constructor() {
    super();

    // const nom_ind=renglon[i]['nom_ind']

    this.prop.textLabel = "Número";
    this.prop.Type = "number";
    this.prop.BaseClass = "editText";
    this.prop.ControlSource = "vi_cap_comepry.num_pry";
    this.prop.ToolTipText = "Número de proyecto";
    this.prop.MaxLength = 16;
    this.prop.Min = "0";
    this.prop.Max = "2147483647";
    this.prop.Decimals = 0;
    this.prop.Capture = true;
    this.prop.updateKey = true;
    this.prop.componentStyle.width = "64px";
    this.prop.componentStyle.fontSize = "17px";
    this.prop.componentStyle.fontWeight = "bold";
    this.style.width = "400px";
    this.style.fontSize = "17px";
    this.style.fontWeigth = "bold";

    this.prop.Value = 0;
  }

  //////////////////////////////////
  // event when
  ///////////////////////////////////

  async when() {
    await this.Form.tpy_tpy.when();

    const data = await this.Form.db.execute(`         
           select max(num_pry)+1 as num_pry from man_comepry where tpy_tpy='${this.Form.tpy_tpy.prop.Value}'`);

    if (data[0]) {
      //  console.log("1 num_pry when data=", data[0], this.prop.Value);

      this.prop.Valid = true; // se pone en Verdadero para que no llame rutina validacion
      //this.sw_when = true;
      if (data[0].num_pry == null) this.prop.Value = 1;
      else this.prop.Value = +data[0].num_pry;
    }

    if (this.prop.Value == 0) this.prop.Value = 1;

    this.Form.grid_tap.Grid.tap_tap.prop.RowSourceType = 0; //Actividades por proyecto
    return true;
  }

  async valid(): Promise<boolean> {
    if (this.prop.Value == 0) {
      return false;
    }
    this.Form.Recno = 0;
    await super.valid();
    /* console.log(
      "valid num_pry recno=",
      this.Sql.View.vi_cap_comepry.recno,
      "tpy_tpy=",
      this.Form.tpy_tpy.prop.Value,
      "num_pry=",
      this.Form.num_pry.prop.Value
    );
    */
    this.Form.per_apy.prop.Value = 1;
    if (this.Sql.View.vi_cap_comepry.recno > 0) {
      // Buscas si ya hay registro en algun componete de captura

      if (this.Form.per_pry.prop.Value == "U")
        this.Form.per_apy.prop.Visible = false;
      else this.Form.per_apy.prop.Visible = true;

      this.Form.per_apy.prop.Visible = true;
      this.Form.bt_actividades.prop.Visible = true;

      this.Form.bt_graba.Visible = true;
      this.Form.bt_borra.Visible = false;
    } else {
      this.Form.per_apy.prop.Visible = false;
      this.Form.bt_actividades.prop.Visible = false;
      this.Form.bt_graba.Visible = true;
    }
    return true;
  }
}
