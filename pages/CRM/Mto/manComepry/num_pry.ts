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
    this.prop.componentStyle.width = "100px";
    this.prop.Value = 0;
  }

  //////////////////////////////////
  // event when
  ///////////////////////////////////

  async when() {
    await super.when()

    const data = await this.Form.db.execute(`         
           select max(num_pry)+1 as num_pry from man_comepry where tpy_tpy='${this.Form.tpy_tpy.prop.Value}'`);

    if (data[0] ) {
      console.log('1 num_pry when data=',data[0],this.prop.Value)

      //this.prop.Valid=true  // se pone en Verdadero para que no llame rutina validacion
      this.sw_when = true;
      if (data[0].num_pry==null)
          this.prop.Value = 1;
      else
          this.prop.Value = +data[0].num_pry;
    }

    if (this.prop.Value == 0) 
      this.prop.Value = 1;

      this.Form.tap_tap.Grid.tap_tap.prop.RowSourceType = 0  //1-Value, 2-Alias,3-sql 5-Array
    return true;
  }

  async valid(): Promise<boolean> {
  
    if (this.prop.Value == 0) {
      this.prop.Valid = false;
      this.sw_when = false;
      return false;
    }
    if (!this.sw_when) {
      if (await super.valid()) {
        // lee tipos de actividades segun el tipo de proyecto
        const m={tpy_tpy:this.Form.tpy_tpy.prop.Value}
        await this.Form.db.use('vi_cap_cometap',m)

        this.Form.tap_tap.Grid.tap_tap.prop.RowSourceType = 2  //1-Value, 2-Alias,3-sql 5-Array
        this.Form.equ_equ.prop.Focus=true
        return true;
      }
    }
    this.sw_when = false;
    return true;
  }
}
