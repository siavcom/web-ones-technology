//////////////////////////////////////////////
// Clase : Forma para generar reportes
// Author : Fernando Cuadras Angulo
// Creacion : Marzo/2023
// Ult.Mod  : 25/Mayo/2023
/////////////////////////////////////////////
//import { COMPONENT } from './Component'
import { FORM } from "@/classes/Form";
import { queryPri } from "@/classes/queryGen/queryPri";
import { queryUsu } from "@/classes/queryGen/queryUsu";
import { queryGen } from "@/classes/queryGen/queryGen";
import { bt_obtener } from "./bt_obtener";

import { mon_rep } from "./mon_rep";
import { tip_rep } from "./tip_rep";
import { var_ord } from "./var_ord";
import { for_imp } from "./for_imp";
import { report } from "./report/report";
import { reportFields } from "./reportFields";
import { bt_pdf } from "./bt_pdf";

export class reportForm extends FORM {
  public mon_rep = new mon_rep();
  public tip_rep = new tip_rep();
  public var_ord = new var_ord(); // variable de orden principal de la vista
  public queryPri = new queryPri();
  public queryUsu = new queryUsu();
  public queryGen = new queryGen();

  public for_imp = new for_imp();
  public reportFields = new reportFields();

  public bt_obtener = new bt_obtener();
  public bt_pdf = new bt_pdf();
  public report = new report();

  tab_ord: string = ""; // tabla para indicar el orden del reporte
  vis_rep: string = ""; // nombre de la vista sql a utilizar en el reporte
  ord_vis: string = ""; // variables extras para el orden del select
  query: string = ""; // query para ejecutar el reporte
  //sqlQuery: string = ""; // Query a ejecutar antes de la vista del reporte
  pdfheight = "1200px"; // PDF height
  data = {};
  vis_ori: string = ""; // vista sql original
  for_ori: string = ""; // forma JASPER original

  constructor() {
    super();
    this.mon_rep.prop.TabIndex = 101;
    this.tip_rep.prop.TabIndex = 102;
    this.var_ord.prop.TabIndex = 103;
    this.queryPri.prop.TabIndex = 104;
    this.queryUsu.prop.TabIndex = 105;
    this.queryGen.prop.TabIndex = 106;
    this.for_imp.prop.TabIndex = 107;
    this.reportFields.prop.TabIndex = 108;
  }

  public async init() {
    this.var_ord.prop.RowSource = `select ref_dat,cam_dat from man_comedat where nom_tab='${this.Form.tab_ord}' order by con_dat`;
    this.var_ord.prop.RowSourceType = 3;

    this.queryUsu.prop.Disabled = true;

    this.queryGen.prop.Disabled = true;

    const db = this.db;

    // vi_schema_views nos trae los campos que podemos utilizar en las condiciones
    const vis_rep = this.vis_rep;

    await db.execute(
      `select ref_dat,cam_dat,tip_dat, CASE \
                        WHEN lower(cam_dat)='key_pri' or lower(cam_dat)='timestamp' or \ 
                         lower(cam_dat)='usu_usu' or lower(cam_dat)='tie_uac'  or \
                         lower(cam_dat)='usu_cre' or lower(cam_dat)='tie_cre' \
                         THEN 'zzzzzzzzzzz' \
                         ELSE nom_tab END as nom_tab \
        from vi_schema_views where nom_vis='${vis_rep}' `,
      "camposView",
      "NULL"
    );

    if (!db.View.camposView || db.View.camposView.recCount == 0) {
      MessageBox("No existe la vista Sql :" + vis_rep, 16, "Error  ");

      return;
    }

    // todos los querys del reporte

    const m = {
      prg_prg: this.prop.Name,
      par_prg: this.Params.par_prg ? this.Params.par_prg : " ",
      nom_vis: vis_rep,
    };
    console.log("reportForm init m=", m);
    await db.use("vi_cap_db_query", m); // todos los querys del reporte

    // Query Principal

    await this.asignaRecordSource("queryPri", "query_main");

    if (this.prop.Development == false) {
      this.queryPri.bt_add.prop.Visible = false;
      this.queryPri.Grid.prop.saveData = false;
    }

    // Query Usuario

    await this.asignaRecordSource("queryUsu", "query_user");
    this.queryUsu.usu_que = db.session.user;
    this.queryUsu.prop.textLabel =
      "Condiciones por usuario :" + this.queryUsu.usu_que;

    // Query Todos

    await this.asignaRecordSource("queryGen", "query_all");

    this.Form.queryPri.activa.prop.Value = 1;
    await this.Form.queryPri.nco_que.interactiveChange();
    /*
    console.log(
      "Fin reportForm",
      this.Form.queryPri.Name,
      "Var_ord=",
      this.Form.var_ord.prop.Value,
      "Query=",
      this.Form.queryPri.query.prop.Value
      ,'camposView=', await this.Form.db.localAlaSql(
        `select * as tip_dat from Now.camposView ; ` )
      );
      */

    if (db.session.user == "sa") this.reportFields.prop.Visible = true;
  }

  // asignamos RecordSource y ControlSource de cada columna
  async asignaRecordSource(nom_que: string, RecordSource: string) {
    const tabla = this[nom_que].Grid;
    tabla.prop.RecordSource = RecordSource;
    for (let i = 0; i < tabla.elements.length; i++) {
      const column = tabla.elements[i].Name;
      tabla[column].prop.RecordSource = RecordSource;
      tabla[column].prop.ControlSource = RecordSource + "." + column;
    }
  }

  /////////////////////////////////////
  // gen_where : genera la parte del where de cada modulo de condicion
  // where : where ya generado y que se le aumentara el resultado de este
  // tip_con : tipo de condicion puede ser queryUsu,queryPri, queryGen
  ////////////////////////////////////////

  async gen_where(tip_con: string) {
    const session = Session();
    console.log("where ===>>>", tip_con, this[tip_con]);
    var where = "";
    if (this[tip_con].activa.prop.Value == 0) return where;

    const view = this[tip_con].Grid.prop.RecordSource;

    const usu_que = this[tip_con].usu_que;
    const nco_que = this[tip_con].nco_que.prop.Value;
    let tabla = "query_main";
    if (tip_con == "queryUsu") tabla = "query_user";

    if (tip_con == "queryGen") tabla = "query_all";

    console.log("reportForm alias");
    if (!this.Form.db.View[tabla]) {
      // Si no existe el alias
      const filter = {
        usu_que: this[tip_con].usu_que,
        nco_que: this[tip_con].nco_que.prop.Value,
      };
      await this.Form.db.localClone("vi_cap_db_query", tabla, filter);
    }

    const ins_sql = `select * from ${tabla} where nco_que=${nco_que} order by ren_que`;
    const data = await this.Form.db.localAlaSql(ins_sql);

    if (data.length == 0) return where; // No hay condición

    let query = "";
    let sig_uni = " ";

    for (let i = 0; i < data.length; i++) {
      const m = data[i]; //Scatter Memvar
      m.cam_dat = m.cam_dat.trim();
      m.con_que = m.con_que.trim();
      m.val_que = m.val_que.trim();

      const data1 = await this.Form.db.localAlaSql(
        `select trim(tip_dat) as tip_dat from Now.camposView where trim(cam_dat)='${m.cam_dat}' ; `
      );

      if (data1.length > 0) {
        const tip_dat = data1[0].tip_dat.slice(0, 4);

        if (
          tip_dat == "char" ||
          tip_dat == "date" ||
          tip_dat.slice(0, 8) == "time"
        )
          m.val_que = "'" + m.val_que + "'";

        switch (m.con_que) {
          case "CHARINDEX":
            if (session.dialect != "Postgres") {
              m.con_que = `CHARINDEX(${m.val_que},${m.cam_dat})>0`;
            } else {
              m.con_que = `POSITION(${m.val_que} IN ${m.cam_dat})>0`;
            }
            query = query + `${sig_uni} ${m.pai_que} ${m.con_que} ${m.pad_que} `;

            break;
          case "NOCHAR":
            if (session.dialect != "Postgres") {
              m.con_que = `CHARINDEX(${m.val_que},${m.cam_dat})=0`;
            } else {
              m.con_que = `POSITION(${m.val_que} IN ${m.cam_dat})=0`;
            }
            query = query + `${sig_uni} ${m.pai_que} ${m.con_que} ${m.pad_que} `;

            break;

          default:
            query =
              query +
              `${sig_uni} ${m.pai_que} ${m.cam_dat} ${m.con_que} ${m.val_que} ${m.pad_que} `;

            }

        //        query =
        //          query +
        //          `${sig_uni} ${m.pai_que} ${m.cam_dat} ${m.con_que} ${m.val_que} ${m.pad_que} `;

        sig_uni = m.uni_que.trim();
        if (sig_uni.trim() == "") sig_uni = " AND ";
      }
    } // EndFor
    if (query.length > 0) query = "(" + query + ")";

    return query;
  }

  public async gen_query() {
    var where: string = "";
    var orden: string = " order by " + this.var_ord.prop.Value; // variable de orden principal de la vista
    var executeQuery: string = "select * from " + this.vis_rep;

    const m = await this.Form.obtData(); // Variable de memoria los propiedades de la forma

    //    if (this.query.length > 1) executeQuery = this.query;

    where = await this.gen_where("queryPri");

    if (this.queryUsu.prop.Visible) {
      const where_usu = await this.gen_where("queryUsu");
      if (where_usu.length > 3) {
        if (where.length == 0) where = where_usu;
        else where = where + " and " + where_usu;
      }
    }
    if (this.queryGen.prop.Visible) {
      const where_gen = await this.gen_where("queryGen");
      if (where_gen.length > 3) {
        if (where.length == 0) where = where_gen;
        else where = where + " and " + where_gen;
      }
    }

    if (this.ord_vis.length > 1) {
      // variables extras para el orden del select
      orden = orden + "," + this.ord_vis;
    }

    if (this.sqlQuery) {
      // si hay generacion de query
      console.log("reportForm query Generacion custom de query");
      executeQuery = await this.sqlQuery(where, orden);
    } else {
      if (where.length > 2) where = " where " + where;

      executeQuery = executeQuery + where + orden;
    }
    /*
    if (this.ord_vis.length > 1) {
      // variables extras para el orden del select
      orden = orden + "," + this.ord_vis;
    }
*/
    console.log("reportForm query", executeQuery);

    return executeQuery;
    //   init = async ()=> {
  }

  ////////////////////////////////////////
  // metodo :obtData
  // pone en la propiedad this.Form.data todos los valores de las propiedades
  // de esta Forma
  //////////////////////////////////////

  async obtData(data?: {}) {
    if (!data) data = {};

    // obtenemos valores de los componentes en la forma
    for (let i = 0; i < this.main.length; i++) {
      if (
        typeof this[this.main[i]].prop.Value == "string" ||
        typeof this[this.main[i]].prop.Value == "number"
      )
        data[this.main[i]] = this[this.main[i]].prop.Value;
    }

    // Obtenemos variables Publicas
    const Var = this.Form.publicVar;
    for (let component in Var) {
      data[component] = Var[component];
      //console.log("bt_json component.value= ", data[component]);
    }
    //console.log("bt_json obtData= ", data,this.Form.publicVar);
    this.Form.data = data;
    return data;
  }
}
