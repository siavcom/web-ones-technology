//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : COLUMN
// Class : tap_tap
// Description : Tipo de actividad
// Author : El Fer Blocks
// Creation : 2023-07-10
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COLUMN } from "@/classes/Column";

export class tap_tap extends COLUMN {
  old_val: string;

  constructor() {
    super();

    // const nom_ind=renglon[i]['nom_ind']

    this.textLabel = "Actividad"; // Column Header
    this.prop.Type = "text";
    this.prop.BaseClass = "comboBox";
    this.prop.ControlSource = "vi_cap_comeapy.tap_tap";
    this.prop.RowSourceType = 4;
    this.prop.RowSource =
      "select des_tap,tap_tap from vi_cap_cometap order by des_tap";
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.prop.ColumnWidths = "80%,20%";
    this.style.zIndex = 1;
    this.style.width = "200px";
    this.old_val = "";
  }

  async when() {

    const res=await this.Form.db.localAlaSql(`select efi_tap from Now.vi_cap_cometap where tap_tap='${this.prop.Value}' `)
    if ( res && res[0] && res[0].efi_tap.trim()==this.Parent.est_apy.prop.Value.trim()){
        this.prop.ReadOnly=true
        return false;
    }

    if (this.Parent.est_apy.prop.Value)
    this.old_val = this.prop.Value.trim();
    return true;
  }

  async interactiveChange() {
    if (this.old_val==this.prop.Value.trim())
       return
    const tap_tap=this.prop.Value.trim()
    const data = await this.Sql.localAlaSql(
        `select est_tap,ord_tap from vi_cap_cometap where tap_tap='${tap_tap}' `
      );
      console.log("tpa_tpa Value=",this.prop.Value,' data=', data)

      if (data.length==0) { // No hay actividades sin orden 
        this.prop.Valid = false;
        return 
      }   
      if (data[0].ord_tap==0 || data[0].ord_tap==this.Parent.ord_tap.prop.Value) {
        if (data[0].ord_tap!=this.Parent.ord_tap.prop.Value)
            this.Parent.ord_tap.prop.Value = data[0].ord_tap; // actualizamos el orden
        this.Parent.est_apy.prop.RowSource = eval(data[0].est_tap);
        this.prop.Valid = true;
      } else
        this.prop.Valid = false;

     return 
    }
  
}
