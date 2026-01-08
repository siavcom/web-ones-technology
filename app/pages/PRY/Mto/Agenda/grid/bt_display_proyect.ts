//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : COLUMN
// Class : bt_display_proyect
// Description : Despliega todas las actividades del proyecto donde se hace click
// Author : El Fer Blocks
// Creation : 2024-12-02
// Update Date  : 
/////////////////////////////////////////////

export class bt_display_proyect extends IMGBUTTON {
  con = 0

  constructor() {
    super()
    this.prop.ColumnTextLabel = 'Show'
    this.prop.BaseClass = 'imgButton'
    this.prop.Image = "/Iconos/svg/view.svg"
    this.prop.Capture = false
    this.style.width = "30px"
    this.prop.ToolTipText = 'Display proyect'

  }

  override async click() {

    this.Form.grid_actividades.prop.Caption = "Actividades del proyecto "
    this.Form.grid_actividades.prop.RecordSource = "";


    this.Form.grid_actividades.tap_tap.prop.RowSourceType = 0; //1-Value, 2-Alias,3-sql Remote,4-Sql local 5-Array

    const m = {
      tpy_tpy: this.Parent.tpy_tpy.prop.Value,
      num_pry: this.Parent.num_pry.prop.Value,
      per_apy: this.Parent.per_apy.prop.Value
    }

    await use("vi_cap_cometap", m);

    // Lee la tabla de actividades que tiene este proyecto

    if (!(await use("vi_cap_comeapy", m))) {
      alert("Open error table " + "vi_cap_comeapy");

      return;
    }
    this.con++

    this.Form.grid_actividades.prop.Visible = true;
    this.Form.grid_actividades.tap_tap.prop.RowSourceType = 4; //1-Value, 2-Alias,3-sql Remote,4-Sql local 5-Array
    this.Form.grid_actividades.prop.RecordSource = "vi_cap_comeapy";

  }

}
