//////////////////////////////////////////////
// BaseClass : component
// Class : nom_ind
// Description : Nobre del indice
// Author : El Fer Blocks
// Creation : 2024-04-15
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from "@/classes/Component";

export class cam_dat extends COMPONENT {
  Type: string
  constructor() {
    super();
    this.prop.BaseClass = "comboBox";
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.prop.Capture = false;
    this.prop.updateKey = true;
    this.prop.ColumnWidths = "200px,56px";
    this.style.width = "256px";
    this.style.marginLeft = "10px";
    this.inputStyle.height = '23px'
    this.inputStyle.width = '256px'

    this.inputStyle.fontSize = "17px";
    this.inputStyle.fontWeight = "bold";
    this.style.fontSize = "17px";
    this.style.fontWeight = "bold";

  }
  async when() {
    await this.interactiveChange()
  }
  async interactiveChange() {
    const data = await this.Sql.localAlaSql(`select tip_dat,lon_dat,dec_dat from now.diccionario where cam_dat='${this.prop.Value}'`)
    const tip_dat = data[0].tip_dat
    let Type = 'string'
    let des_Value = ''
    let has_Value = ''
    if (tip_dat == 'smallint' ||
      tip_dat.slice(0, 3) == 'int' ||
      tip_dat.slice(0, 5) == 'float' ||
      tip_dat.slice(0, 6) == 'double' ||
      tip_dat.slice(0, 3) == 'num'
    ) {

      Type = 'number'
      des_Value = 0
      has_Value = 9999999999999999
    }
    if (tip_dat == 'date'
    ) {
      Type = 'date'
      des_Value = new Date()
      has_Value = des_Value
    }

    if (tip_dat == 'date' ||
      tip_dat == 'datetime'
    ) {
      Type = 'dateTime'
      des_Value = new Date()
      has_Value = des_Value
    }

    this.Type = Type
    const lon_dat = data[0].lon_dat > 30 ? 30 : data[0].lon_dat

    this.Parent.des_dat.prop.Type = Type
    this.Parent.des_dat.prop.MaxLength = lon_dat
    this.Parent.des_dat.prop.Decimals = data[0].dec_dat
    this.Parent.des_dat.prop.Value = des_Value
    this.Parent.has_dat.prop.Type = Type
    this.Parent.has_dat.prop.MaxLength = lon_dat
    this.Parent.has_dat.prop.Decimals = data[0].dec_dat
    this.Parent.has_dat.prop.Value = has_Value
    this.Parent.tip_con.when()
  }
}
