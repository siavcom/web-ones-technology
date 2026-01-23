//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// @baseClass  : component
// @class : est_pry
// Description : Estatus
// @author: El Fer Blocks
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
    this.style.width = "212px";
  }


  override async when() { // Busca si pertenece el usuario al equipo de compras

    const res = await this.Sql.localAlaSql(`select esu_tpy from cometpy where tpy_tpy='${this.Form.tpy_tpy.prop.Value}' `)
    const data = await this.Sql.localAlaSql(`select equ_equ from equusu where equ_equ='${res[0].esu_tpy}'`)
    if (data.length > 0)
      return true
    return false
  }



}
