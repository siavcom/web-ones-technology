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
import { des_fec } from "./des_fec";
import { has_fec } from "./has_fec";


import { des_dat } from './des_dat'
import { has_dat } from './has_dat'
import { tip_con } from './tip_con'
//import { cam_dat } from './cam_dat'

export class reportForm extends FORM {
  public mon_rep = new mon_rep();
  public tip_rep = new tip_rep();
  public var_ord = new var_ord(); // variable de orden principal de la vista


  // public cam_dat = new cam_dat()
  public tip_con = new tip_con()
  public des_dat = new des_dat()
  public has_dat = new has_dat()


  public queryPri = new queryPri();
  public queryUsu = new queryUsu();
  public queryGen = new queryGen();

  public for_imp = new for_imp();
  public reportFields = new reportFields();

  public bt_obtener = new bt_obtener();
  public bt_pdf = new bt_pdf();
  public report = new report();

  public des_fec = new des_fec();
  public has_fec = new has_fec();

  tab_ord: string = ""; // tabla para indicar el orden del reporte
  vis_rep: string = ""; // nombre de la vista sql a utilizar en el reporte
  ord_vis: string = ""; // variables extras para el orden del select
  query: string = ""; // query para ejecutar el reporte
  //sqlQuery: string = ""; // Query a ejecutar antes de la vista del reporte
  pdfheight = "1200px"; // PDF height
  data = {};
  vis_ori: string = ""; // vista sql original
  for_ori: string = ""; // forma JASPER original

  fields: string[][]; // Campos que indica par alas variables des_dat y has_dat


  constructor(num_blocks: number) {
    super();
    this.prop.addRow = false; // Si es verdadero aumenta renglon automaticamente

    this.mon_rep.prop.TabIndex = 101;
    this.tip_rep.prop.TabIndex = 102;
    this.des_fec.prop.TabIndex = 103;
    this.has_fec.prop.TabIndex = 104;
    this.var_ord.prop.TabIndex = 111;

    //  this.cam_dat.prop.TabIndex = 104;
    this.tip_con.prop.TabIndex = 112;
    this.des_dat.prop.TabIndex = 113;
    this.has_dat.prop.TabIndex = 114;

    this.queryPri.prop.TabIndex = 115;
    this.queryUsu.prop.TabIndex = 116;
    this.queryGen.prop.TabIndex = 117;

    this.for_imp.prop.TabIndex = 118;
    this.reportFields.prop.TabIndex = 119;
    this.report.prop.TabIndex = 120;

    this.prop.cam_pri = ''


    let i = 0

    for (i = 0; i <= num_blocks; i++) {
      this.block[i] = structuredClone(this.container)
      this.block[i].prop.Visible = true
    }

    i = num_blocks + 1
    this.block[i] = structuredClone(this.container)
    this.block[i].component = {
      [0]: this.mon_rep,
      [1]: this.tip_rep,

    }

    this.block[i].prop.Visible = true
    this.block[i].title = 'Datos base'

    i++

    this.block[i] = structuredClone(this.container)
    this.block[i].component = {
      [0]: this.var_ord,
      [1]: this.tip_con,
      [2]: this.des_dat,
      [3]: this.has_dat

    }

    this.block[i].title = 'Rango'
    this.block[i].prop.Visible = true


    i++

    this.block[i] = structuredClone(this.container)
    this.block[i].component = {
      [0]: this.queryPri,
      [1]: this.queryUsu,
      [2]: this.queryGen
    }

    this.block[i].title = 'Condiciones'
    this.block[i].prop.Visible = true

    i++

    this.block[i] = structuredClone(this.container)
    this.block[i].component = {
      [0]: this.reportFields,

    }

    this.block[i].title = 'Campos de reporte'
    this.block[i].prop.Visible = false

    i++

    this.block[i] = structuredClone(this.container)
    this.block[i].component = {
      [0]: this.report,
    }

    this.block[i].title = 'Resultado'
    this.block[i].prop.Visible = false

  }

  public override async init() {


    // this.var_ord.prop.RowSource = `select ref_dat,cam_dat from vi_cap_comedat where nom_tab='${this.tab_ord}' order by con_dat`;
    // this.var_ord.prop.RowSourceType = 3;

    this.queryPri.prop.Disabled = true;
    this.queryUsu.prop.Disabled = true;
    this.queryGen.prop.Disabled = true;

    const db = this.Sql;

    // vi_schema_views nos trae los campos que podemos utilizar en las condiciones
    const vis_rep = this.vis_rep;

    await SQLExec(
      `select ref_dat,cam_dat,tip_dat, CASE \
                        WHEN lower(cam_dat)='key_pri' or lower(cam_dat)='timestamp' or \ 
                         lower(cam_dat)='usu_usu' or lower(cam_dat)='tie_uac'  or \
                         lower(cam_dat)='usu_cre' or lower(cam_dat)='tie_cre' \
                         THEN 'zzzzzzzzzzz' \
                         ELSE nom_tab END as nom_tab \
        from vi_schema_views where nom_tab='${vis_rep}' `,
      "camposView",
      "NULL"
    );


    if (!this.Sql.View.camposView || this.Sql.View.camposView.recCount == 0) {
      MessageBox("No existe la vista Sql :" + vis_rep, 16, "Error  ");

      return;
    }

    // todos los querys del reporte
    /*
        const m = {
          prg_prg: this.prop.Name,
          par_prg: this.Params.par_prg ? this.Params.par_prg : " ",
          nom_tab: vis_rep,
        };
        */
    await this.openFilters()
    // await use("vi_cap_db_query", m); // todos los querys del reporte

    // Query Principal
    await this.asignaRecordSource("queryPri", "query_main");

    if (this.prop.Development == false) {
      this.queryPri.bt_add.prop.Visible = false;
      this.queryPri.Grid.prop.saveButton = false;
    }

    // Query Usuario

    await this.asignaRecordSource("queryUsu", "query_user");
    this.queryUsu.usu_que = this.Sql.session.user;
    this.queryUsu.prop.Caption =
      "Por usuario :" + this.queryUsu.usu_que;

    // Query Todos

    await this.asignaRecordSource("queryGen", "query_all");

    console.log('query_pri RecordSource=', this.queryPri.Grid.prop.RecordSource)
    console.log('query_usu RecordSource=', this.queryUsu.Grid.prop.RecordSource)
    console.log('query_gen RecordSource=', this.queryGen.Grid.prop.RecordSource)

    //    this.queryPri.activa.prop.Value = 0;

    //  await this.queryPri.nco_que.interactiveChange();


    if (this.Sql.session.user == "sa") {
      this.reportFields.prop.Visible = true;

    }

    await this.open()
    return

  }

  async openFilters() {

    const m = {
      prg_prg: this.prop.Name,
      par_prg: this.Params.par_prg ? this.Params.par_prg : " ",
      nom_tab: this.vis_rep,
    };
    await use("vi_cap_db_query", m); // todos los querys del reporte
  }


  // asignamos RecordSource y ControlSource de cada columna
  async asignaRecordSource(nom_que: string, RecordSource: string) {
    const tabla = this[nom_que].Grid;
    tabla.prop.RecordSource = RecordSource

    // tabla.prop.RecordSource = RecordSource;

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
    //console.log("where ===>>>session=", session.dialect, tip_con, this[tip_con]);
    var where = "";
    if (this[tip_con].activa.prop.Value == 0) return where;

    const view = this[tip_con].Grid.prop.RecordSource;

    const usu_que = this[tip_con].usu_que;
    const nco_que = this[tip_con].nco_que.prop.Value;
    let tabla = "query_main";
    if (tip_con == "queryUsu") tabla = "query_user";

    if (tip_con == "queryGen") tabla = "query_all";

    //  console.log("reportForm alias");
    if (!this.Sql.View[tabla]) {
      // Si no existe el alias
      const filter = {
        usu_que: this[tip_con].usu_que,
        nco_que: this[tip_con].nco_que.prop.Value,
      };
      await this.Sql.localClone("vi_cap_db_query", tabla, filter);
    }

    const ins_sql = `select * from ${tabla} where nco_que=${nco_que} order by ren_que`;
    const data = await this.Sql.localAlaSql(ins_sql);

    if (data.length == 0) return where; // No hay condición

    let query = "";
    let sig_uni = " ";

    for (let i = 0; i < data.length; i++) {
      const m = data[i]; //Scatter Memvar
      m.cam_dat = m.cam_dat.trim();
      m.con_que = m.con_que.trim();
      m.val_que = m.val_que.trim();

      const data1 = await this.Sql.localAlaSql(
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


    //console.log("where ===>>>session=", session.dialect, query);

    return query;
  }

  public async gen_query() {

    await this.has_dat.valid()

    let where = ''

    let Type = this.var_ord.Type.toLowerCase()
    // console.log('reportForm query Type=', Type)
    if (this.tip_con.prop.Value == 'C') {  // contenga
      // Falta dialecto para Postgres
      where = ` ${this.var_ord.prop.Value} like '%${this.des_dat.prop.Value.trim()}%'`
    } else {

      let des_dat
      let has_dat
      switch (Type) {
        case 'text':
          des_dat = "'" + this.des_dat.prop.Value.trim() + "'";
          has_dat = "'" + this.has_dat.prop.Value.trim() + "'";
          break;
        case 'date':
          des_dat = "'" + await dateToSql(this.des_dat.prop.Value) + "'";
          has_dat = "'" + await dateToSql(this.has_dat.prop.Value) + "'";
          break;
        case 'datetime':
          des_dat = "'" + await dateTimeToSql(this.des_dat.prop.Value) + "'";
          has_dat = "'" + await dateTimeToSql(this.has_dat.prop.Value) + "'";
          break;
        default:

          des_dat = this.des_dat.prop.Value;
          has_dat = this.has_dat.prop.Value;
          break;
      }
      // console.log('gen_query des_dat=', des_dat, 'has_dat=', has_dat)

      where = ` ${this.var_ord.prop.Value} >= ${des_dat} and \
    ${this.var_ord.prop.Value} <= ${has_dat}`


      /*
            if (Type == 'date' || Type == 'dateTime') {
              const des_dat = dateToSring(this.des_dat.prop.Value)
              const has_dat = dateToSring(this.has_dat.prop.Value)
              where = ` ${this.var_ord.prop.Value} >= '${des_dat}' and \
                 ${this.var_ord.prop.Value} <= '${has_dat}'`
            }
      */
    }

    where = `  (${where}) `
    //console.log('gen_query where=', where )

    var orden: string = " order by " + this.var_ord.prop.Value; // variable de orden principal de la vista


    var executeQuery: string = "select * from " + this.vis_rep;

    // const m = await this.obtData(); // Variable de memoria los propiedades de la forma

    //    if (this.query.length > 1) executeQuery = this.query;

    const where_pri = await this.gen_where("queryPri");
    if (where_pri.length > 3)
      where = `${where} and ${where_pri}`

    // Anexa al where si hay condiciones por usuario
    if (this.queryUsu.activa.prop.Value == 1) {
      const where_usu = await this.gen_where("queryUsu");
      if (where_usu.length > 3) {
        if (where.length == 0) where = where_usu;
        else where = where + " and " + where_usu;
      }
    }
    // Anexa al where si hay condiciones en forma general
    if (this.queryGen.activa.prop.Value == 1) {
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

      executeQuery = await this.sqlQuery(where, orden);
    } else {
      if (where.length > 2) where = " where " + where;

      executeQuery = executeQuery + where + orden;
    }
    const m = await this.obtData(); // Variable de memoria los propiedades de la forma


    console.log("reportForm query", executeQuery);

    return executeQuery;

  }

  ////////////////////////////////////////
  // metodo :obtData
  // pone en la propiedad this.data todos los valores de las propiedades
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




    const Var = this.mPublic;
    for (let component in Var) {
      data[component] = Var[component];
      //console.log("bt_json component.value= ", data[component]);
    }
    //console.log("bt_json obtData= ", data,this.Form.mPublic);

    data['tit_rep'] = this.tit_rep // Aumenta la propiedad this.tit_rep
    this.data = data;
    data['con_rep'] = this.con_rep // Aumenta la propiedad this.con_rep
    this.data = data;
    data['ord_rep'] = this.ord_rep // Aumenta la propiedad this.con_rep
    this.data = data;

    // console.log("bt_json obtData= ", data);

    return data;
  }

  async open() {

    //    this.des_dat.prop.Value = ''
    //    this.has_dat.prop.Value = ''

    let fields = ''
    let or = ''
    for (let i = 0; i < this.fields.length; i++) {
      fields = fields + or + "cam_dat='" + this.fields[i][0] + "'"
      or = ' or '
    }

    if (!this.Sql.View[this.prop.RecordSource]) {

      fields = ` ( ${fields} )`
      /*      await SQLExec(
              `select ref_dat,cam_dat,tip_dat,lon_dat,dec_dat
              from vi_schema_views where nom_tab='${this.prop.RecordSource}' and ${fields} order by con_dat`,
              'diccionario'
            );
      */

      if (!await SQLExec(
        `select ref_dat,cam_dat,tip_dat,lon_dat,dec_dat
        from vi_schema_views where nom_tab='${this.tab_ord}' and ${fields} order by con_dat`,
        'diccionario'
      ))
        return


      for (let i = 0; i < this.fields.length; i++)
        await this.Sql.localAlaSql(`update Now.diccionario set ref_dat = '${this.fields[i][1]}' where cam_dat = '${this.fields[i][0]}'`)

    }


    this.var_ord.prop.Value = this.prop.cam_pri // asignamos campo principal
    this.var_ord.prop.RowSource = `diccionario.ref_dat,cam_dat`;
    this.var_ord.prop.RowSourceType = 2; //1-Value, 2-Alias, 5-Array = 2


    // await this.var_ord.interactiveChange()

  }



}
