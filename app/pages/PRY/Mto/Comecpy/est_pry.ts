//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class : est_pry
// Description : Estatus
// Author : El Fer Blocks
// Creation : 2023-07-20
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { CAPTURECOMPONENT } from "@/classes/CaptureComponent";

export class est_pry extends CAPTURECOMPONENT {
  constructor() {
    super();

    this.prop.Caption = "Estatus";
    this.prop.Type = "text";
    this.prop.BaseClass = "comboBox";
    this.prop.ControlSource = "vi_cap_comepry.est_pry";
    this.prop.RowSourceType = 5; //1-Value, 2-Alias,3-sql 5-Array
    this.prop.RowSource = [
      [
        "Inicio",
        "Proceso",
        "Fincadose",
        "Costeo",
        "Autorizado",
        "Cotizado",
        "Aceptado",
        "Bloqueado",
        "Finalizado",
        "Cancelado",
      ],
      ["IN", "PR", "FI", "CT", "AU", "CZ", "AC", "BL", "FN", "CA"],
    ];
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;

    this.prop.Capture = true;
    this.prop.updateKey = false;
    this.inputStyle.width = "128px";
    this.style.width = "450px";
  }


  override async when() { // Busca si pertenece el usuario que autoriza el proyecto
    this.old_value = this.prop.Value
    const eqa_tap = this.Form.eqa_tap.trim() // equipo que autoriza

    //const res = await this.Sql.localAlaSql(`select esu_tpy from cometpy where tpy_tpy='${this.Form.tpy_tpy.prop.Value}' `)

    // equpos = equipos usuarios que pertenecen el usuario que esta capturando


    //console.log('est_pry eqa_tap', eqa_tap, ' equipos=', await this.Sql.localAlaSql(`select equ_equ from equipos `))

    const data = await this.Sql.localAlaSql(`select equ_equ from equipos where trim(equ_equ)='${eqa_tap}'`)

    if (data.length > 0)
      this.prop.ReadOnly = false
    else
      this.prop.ReadOnly = true

    return !this.prop.ReadOnly

  }
  override async valid() {
    if (this.prop.Value == 'AU') {

      const res = await SQLExec(`select max(key_pri) as key_pri from vi_cap_comecpy where tpy_tpy='${this.Form.tpy_tpy.prop.Value}' and num_pry=${this.Form.num_pry.prop.Value} and est_cpy<>'A' and est_cpy<>'X' `)
      if (res[0].key_pri > 0) {
        this.prop.Value = this.old_value
        await MessageBox('Existen partidas de cotizacion pendientes de autorizar', 16, 'Error')
        this.prop.ReadOnly = true
        return true
      }
    }
    await SQLExec(`update man_comepry set est_pry='${this.prop.Value}' where tpy_tpy='${this.Form.tpy_tpy.prop.Value}' and num_pry=${this.Form.num_pry.prop.Value} `)

    return true
  }
}
