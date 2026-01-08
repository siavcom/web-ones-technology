//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : COLUMN
// Class : equ_usu
// Description : Descripción del equipo de trabajo
// Author : El Fer Blocks
// Creation : 2023-10-26
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { CAPTURECOMPONENT } from "@/classes/CaptureComponent";

export class des_equ extends CAPTURECOMPONENT {
  constructor() {
    super();

    this.prop.Caption = "Equipo de trabajo";
    // this.prop.BaseClass = "comboBox";
    this.prop.ControlSource = "vi_cap_comepry.des_equ";

    // this.prop.RowSourceType = 4;
    // this.prop.ColumnCount = 2;
    // this.prop.BoundColumn = 2;
    this.prop.Capture = true;
    this.prop.Disabled = true;
    this.inputStyle.width = "256px";
    this.style.width = "450px";
  }


  /*
  async init() {

    if (!await SQLExec('select des_equ,max(des_equ) as des_equ,log_usu,max(nom_usu) as nom_usu from vi_cap_db_equusu GROUP by des_equ, log_usu', 'equusu')) {
      MessageBox('No  hay definicion de equipos', 16, 'Error de base de datos');
      return
    }

    this.Form.des_equ.prop.RowSource = `select des_equ,des_equ from now.equusu group by des_equ,des_equ`;

  }
  async valid() {
    this.Form.log_usu.when()
    return true
  }

  */
}
