//////////////////////////////////////////////
// BaseClass : component
// Class : nco_que
// Description : Numero de Condicion
// Author : El Fer Blocks
// Creation : 2023-03-13
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from "@/classes/Component";

export class nco_que extends COMPONENT {
  constructor() {
    super();

    // const nom_ind=renglon[i]['nom_ind']

    this.prop.Type = "spinner";
    this.prop.textLabel = "Número";
    this.prop.Value = 1;
    this.prop.Position = "main";
    this.prop.Min = "1";
    this.prop.Max = "999";
    this.prop.Decimals = 0;
    this.prop.Capture = true;
    this.inputStyle.width = "40px";

    this.prop.Visible = true;
    this.prop.sw_add = false;
    //this.style.width='30px'
  }

  public async valid() {
    await this.interactiveChange();
    return true;
  }
  //////////////////////////////////
  // Interactive Change
  ///////////////////////////////////

  async interactiveChange() {
    if (!this.Parent.bt_add.prop.Visible)
      this.Parent.bt_add.prop.Visible = true;
    if (!this.Parent.query.prop.Visible) this.Parent.query.prop.Visible = true;

    if (this.prop.Value <= 0) {
      this.prop.Value = 1;
    }
    //console.log("1 InteractiveChange Value", this.prop.Value, this.Parent.Name);
    const tabla = this.Parent.tabla;
    this.Parent.bt_edit.prop.Visible = false;
    this.Parent.bt_delete.prop.Visible = false;
    this.Parent.Grid.prop.Visible = false;
    this.Parent.query.prop.Visible = false;
    this.Parent.query.prop.Value = "";
    var query = "";

    if (this.prop.sw_add) return;

    console.log(
      "1 InteractiveChange Value=",
      this.prop.Value,
      this.Parent.Name,
      await this.Form.db.localAlaSql("select * From vi_cap_db_query")
    );

    const q = {
      usu_que: this.Parent.usu_que,
      nco_que: +this.Parent.nco_que.prop.Value,
    };

    const RecordSource = this.Parent.Grid.prop.RecordSource;

    const ins_sql = `select * From vi_cap_db_query \
          where nco_que=${q.nco_que} and trim(usu_que)='${q.usu_que}' order by ren_que`;

    const data = await this.Form.db.localAlaSql(ins_sql);

    if (data.length == 0) {
      console.log("2 No hay datos interactiveChange ", ins_sql, "Data=", data);
      //      this.Parent.query.prop.Value = '' // limpiamos el query
      if (this.prop.Value == 1) {
        this.Parent.query.prop.Value = ""; // limpiamos el query
        return;
      }
      if (this.prop.Value > 1) {
        this.prop.Valid = false;
        this.prop.Value = this.prop.Value - 1;
        return;
        //this.interactiveChange()
      }
      return;
    } // Endif (
    this.prop.ReadOnly = false;

    let sig_uni = " ";
    console.log(
      " InteractiveChange nco_que=",
      this.prop.Value,
      "ins_sql=",
      ins_sql,
      data
    );

    for (let i = 0; i < data.length; i++) {
      const m = data[i]; //Scatter Memvar

      sig_uni = "Y";

      switch (m.uni_que.trim()) {
        case "AND":
          sig_uni = ' "Y" ';
          break;

        case "OR ":
          sig_uni = ' "O" ';
          break;
      }

      let con_uni = " IGUAL QUE";

      switch (m.con_que.trim()) {
        case ">":
          con_uni = " MAYOR QUE ";
          break;

        case "<":
          con_uni = " MENOR QUE ";
          break;

        case ">=":
          con_uni = " MAYOR O IGUAL QUE ";
          break;

        case "<=":
          con_uni = " MENOR O IGUAL QUE ";
          break;

        case "=":
          con_uni = " IGUAL A ";
          break;

        case "BETWEEN":
          con_uni = " ENTRE ";
          break;

        case "IN":
          con_uni = " ESTE EN ";
          break;

        case " NOT IN":
          con_uni = " NO ESTE EN ";
          break;

        case "CHARINDEX":
          con_uni = " CONTIENE ";
          break;

        case "<>":
          " DIFERENTE QUE ";
          break;

        case "NOCHAR":
          con_uni = " NO CONTIENE ";
          break;
        default:
          con_uni = " IGUAL"; //
          break;
      }
      query =
        query +
        m.pai_que +
        m.ref_dat.trim() +
        con_uni +
        m.val_que.trim() +
        m.pad_que +
        sig_uni +
        String.fromCharCode(13);
    } // EndFor (

    if (sig_uni.length > 0) {
      query = await left(query, query.length - sig_uni.length);
    } // Endif (

    this.Parent.query.prop.Value = query.trim();
    this.Parent.query.prop.Visible = true;
    this.Parent.bt_edit.prop.Visible = true;

    if (this.Parent.Name == "queryPri") {
      // solamente query Principal

      this.Form.var_ord.prop.Value = data[0].cam_dat;
    }

    return;
  }

  //////////////////////////////////
  // event when
  ///////////////////////////////////

  async when() {
    //    this.prop.Parent.browse.prop.RowSource = ''
    //this.Parent.Grid.RecordSource=''

    return true;
  }

  //////////////////////////////////
  // event click
  ///////////////////////////////////
  /*
  async click() {

  }
  */
}
