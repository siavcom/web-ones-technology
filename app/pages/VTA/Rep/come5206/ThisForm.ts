//////////////////////////////////////////////
// @baseClass  : reportForm
// @class : thisForm
// Description : Pedidos de clientes o proveedores 
// @author: MGSR
// Creation : 2025-06-19
// Update Date  : 
/////////////////////////////////////////////

///////////////////////////////////////
// Base class
///////////////////////////////////////

import { reportVtas } from "@/classes/Siavcom/reports/VTAS/reportVtas";
import { tip_ped } from "./tip_ped";
import { ord_isu } from "./ord_isu";
export class ThisForm extends reportVtas {
  public tip_ped = new tip_ped()
  public ord_isu = new ord_isu()
  constructor() {
    super(2); // inicializa la clase base
    this.tab_ord = "vi_come5206";
    this.prop.Name = "come5206";
    this.prop.Caption = "Pedidos";
    this.prop.Status = "A";
    this.prop.Development = true;
    this.vis_rep = "vi_come5206"; // nombre de la vista sql a utilizar en el reporte
    this.for_imp.prop.Value = "jr_come5206"; // no incluir extencion jasper o jrxml
    this.tip_rep.prop.Visible = false; // Muestra general o detallado
    this.tip_rep.prop.Disabled = true;
    this.op_tcd_tcd.prop.Visible = false
    this.op_tcd_tcd.prop.Disabled = true
    this.mon_rep.prop.Visible = false
    this.mon_rep.prop.Disabled = true
    this.alm_rep.prop.Visible = true
    this.alm_rep.prop.Disabled = false
    this.op_tdo_tdo.prop.TabIndex = 1
    this.op_tcd_tcd.prop.TabIndex = 2
    this.tip_ped.prop.TabIndex = 3
    this.des_fec.prop.TabIndex = 4
    this.has_fec.prop.TabIndex = 5
    this.ord_isu.prop.TabIndex = 6
    this.alm_rep.prop.TabIndex = 7
    // definicion de bloques
    this.block[2].component = {
      [0]: this.op_tdo_tdo,
      [1]: this.op_tcd_tcd,
      [2]: this.tip_ped,
      [3]: this.des_fec,
      [4]: this.has_fec,
      [5]: this.ord_isu,
      [6]: this.alm_rep
    }

    this.block[2].prop.Visible = true
    this.block[2].prop.Disabled = false
    this.block[2].title = 'Generales'

    this.block[0].prop.Visible = false
    this.block[0].prop.Disabled = true


    this.block[3].prop.Visible = false
    this.block[3].prop.Disabled = true

    //this.dataView:string ='vcomepge'    // Vista de datos generales
    //this.sqlQuery=' `select des_tdo from cometdo where tdo_tdo=${this.Form.tdo_tdo.Value}` '             // Query a ejecutar antes de la vista del reporte
    this.prop.cam_pri = 'ndo_doc' // campo de buqueda principal
    this.fields = [
      ["ndo_doc", "Número del documento", "0", "99999999"],
      ["cod_nom", "Cliente"],
      ["fec_doc", "Fecha "]
    ]

  }

  public async init() {
    await super.init();
    // Campos de orden de la vista
    var nom_par = 'clientes'
    this.prop.Caption = "Pedidos de clientes ";
    this.Form.tit_rep = "Pedidos de clientes "
    this.Form.for_imp.prop.Value = "jr_come5206"
    if (this.Form.Params[0].replaceAll("´", "").toLowerCase() == "co") {
      nom_par = 'proveedores'
      this.prop.Caption = "Pedidos de proveedores ";
      this.Form.tit_rep = "Pedidos de proveedores "
    }
    this.var_ord.prop.Value = "ndo_doc";
    this.op_tcd_tcd.prop.Value = " "
    console.log(
      "===================>Init Report name=",
      this.prop.Name,
      "var_ord",
      this.var_ord.prop.Value
    );
  }

  ///////////////////////////////////////////////////////////////
  // En caso de tener que generar el query del select del report
  ///////////////////////////////////////////////////////////////

  public async sqlQuery(where: string) {
    const tip_ped = this.tip_ped.prop.Value
    const ord_isu = this.ord_isu.prop.Value
    const alm_rep = this.alm_rep.prop.Value
    const op_tdo_tdo = this.op_tdo_tdo.prop.Value
    const op_tcd_tcd = this.op_tcd_tcd.prop.Value
    let localWhere = "";
    // armamos documentos si hay clasificacion
    var doc_imp = '', tit_rep = ''
    if (op_tdo_tdo.trim() != "??") {
      doc_imp = op_tdo_tdo.replaceAll(",", "','")
      // obtenemos la descripcion de los documentos seleccionados   
      var i = 0, j = doc_imp.length, tdo_tdo = ' ', des_tdo = ','
      for (let i = 0; i < j; i += 6) {
        tdo_tdo = doc_imp.slice(i, i + 3)
        const data = await this.Sql.localAlaSql(` select des_tdo from now.loc_cometdo where tdo_tdo='${tdo_tdo}'  `)
        des_tdo = des_tdo + "," + data[0].des_tdo.trim()
      }
      doc_imp = ' and ( tdo_tdo in (' + "'" + doc_imp + "'" + ') '
      tit_rep = tit_rep + 'Documentos: ' + des_tdo.replaceAll(",,", "")

    }
    if (op_tcd_tcd.trim() != "??") {
      doc_imp = doc_imp + ' and tcd_tcd in (' + "'" + op_tcd_tcd.replaceAll(",", "','") + "'" + ') '
      const data = await this.Sql.localAlaSql(` select des_tcd from now.loc_cometcd where tdo_tdo='${this.op_tdo_tdo.prop.Value}' and tcd_tcd='${this.op_tcd_tcd.prop.Value}'  `)
      tit_rep = tit_rep + ' ' + data[0].des_tcd.trim()
    }

    if (doc_imp.length > 2)
      doc_imp = doc_imp + ')'
    // armamos almacen
    var alm_sql = ''
    if (alm_rep.trim() != '??') {
      alm_sql = ` and alm_tda='${alm_rep}'  `
      // generamos titulo del reporte
      const data = await this.Sql.localAlaSql(` select des_tda from now.loc_cometda where alm_tda='${alm_rep}' `)
      tit_rep = tit_rep + ' almacén ' + data[0].des_tda.trim()
    }
    else
      tit_rep = tit_rep + ' todos los almacenes '

    // verificamos si el programa es de inventarios tomamos fecha del movimiento

    console.log('ord_isu=', this.ord_isu.prop.Value, 'tip_ped=', this.tip_ped.prop.Value)
    const des_fec = await dateToSql(this.Form.des_fec.prop.Value); //dateToSql(this.Form.des_fec.Value)
    const has_fec = await dateToSql(this.Form.has_fec.prop.Value); //dateToSql(this.Form.has_fec.Value)
    // armamos el orden del reporte
    var var_ord = this.var_ord.prop.Value;
    // pasamos a numerico la variable de orden
    if (this.var_ord.prop.Value == 'ndo_doc') {
      this.Form.ord_rep = 1
      var_ord = 'tdo_tdo,ndo_doc'
    }
    if (this.var_ord.prop.Value == "cod_nom") {
      this.Form.ord_rep = 2
      var_ord = var_ord + ",tdo_tdo,ndo_doc"
    }
    if (this.var_ord.prop.Value == 'fec_doc') {
      this.Form.ord_rep = 3
      var_ord = 'fec_doc,tdo_tdo,ndo_doc'
    }
    if (ord_isu == 1)
      var_ord = var_ord + ',mov_mov'
    else
      var_ord = var_ord + ',cla_isu,mov_mov'

    // si hay condiciones de reporte  
    if (where.length > 0)
      where = ' AND ' + where

    localWhere = localWhere +
      `  (fec_doc>='${des_fec}' AND fec_doc<='${has_fec}')  ${doc_imp} ${alm_sql} ` + where;

    switch (tip_ped) {
      case 1:
        localWhere = localWhere + " AND (CAN_MOV-CEN_MOV>0 )"
        break;
      case 2:
        localWhere = localWhere + " AND CEN_MOV>0 "
        break;
    }
    this.Form.tit_rep = this.Form.tit_rep + ' ' + tit_rep
    console.log(
      "sqlQuery =",
      `select * from ${this.vis_rep} where ${localWhere} order by ${var_ord} `
    );
    return `select * from ${this.vis_rep} where ${localWhere} order by ${var_ord}  `;
  }
} // End ThisForm
