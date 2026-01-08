//////////////////////////////////////////////
// BaseClass : component
// Class : equ_equ
// Description : Equipos de trabajo
// Author : El Fer Blocks
// Creation : 2023-12-08
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from "@/classes/Component";
export class equ_equ extends COMPONENT {

  constructor() {
    super();
    this.prop.Type = "text";
    this.prop.Caption = "Equipo de trabajo";
    this.prop.BaseClass = "comboBox";
    this.prop.RowSourceType = 3;
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.style.width = "300px";
  }
  async init(): Promise<void> {
    let user = "lower(SYSTEM_USER)";
    if (this.Form.dialect == "postgres") user = "lower(current_user)";

    this.prop.RowSource = `select des_equ,equ_equ from vi_cap_db_equipo  union select ' Todos ' des_equ,'??' equ_equ \
     where ${user}='sa' or \
     (select top 1 key_pri from man_db_equusu where man_db_equusu.log_usu=${user})>0 \
     order by equ_equ`;

    //     (select key_pri from vi_cap_equ_equ.log_usu=${user})>0  order by equ_equ`;
  }
}