//////////////////////////////////////////////
// BaseClass : reportForm
// Class : thisForm
// Description : Documentos de ventas
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 2023-09-20
// Update Date  : 2023-09-29
/////////////////////////////////////////////

///////////////////////////////////////
// Base class
///////////////////////////////////////

import { reportVtas } from "@/classes/Siavcom/reports/VTAS/reportVtas";
import { tip_nof } from "./tip_nof";
export class ThisForm extends reportVtas {
  public tip_nof = new tip_nof()

  constructor() {
    super(2); // inicializa la clase base
    console.log("3) ThisForm ", 2);
    this.tab_ord = "vi_come5201_g";
    this.prop.Name = "come5201";
    this.prop.Caption = "Documentos";
    this.prop.Status = "A";
    this.prop.Development = true;
    this.vis_rep = "vi_come5201"; // nombre de la vista sql a utilizar en el reporte
    this.for_imp.prop.Value = "jr_come5201"; // no incluir extencion jasper o jrxml
    this.tip_rep.prop.Visible = true; // Muestra general o detallado
    this.op_tcd_tcd.prop.Visible = false
    this.op_tcd_tcd.prop.Disabled = true
    this.tip_nof.prop.Visible = true
    this.tip_nof.prop.Disabled = false
    this.op_tdo_tdo.prop.TabIndex = 1
    this.op_tcd_tcd.prop.TabIndex = 2
    this.mon_rep.prop.TabIndex = 3
    this.des_fec.prop.TabIndex = 4
    this.has_fec.prop.TabIndex = 5
    this.tip_nof.prop.TabIndex = 6
    //this.dataView:string ='vcomepge'    // Vista de datos generales
    //this.sqlQuery=' `select des_tdo from cometdo where tdo_tdo=${this.Form.tdo_tdo.Value}` '             // Query a ejecutar antes de la vista del reporte
    this.block[2].component = {
      [5]: this.tip_nof
    }

    this.block[2].prop.Visible = true
    this.block[2].title = 'Datos fiscales '


    console.log('2) ThisForm constructor blocks=', this.block)

  }

  public override async init() {
    await super.init();

    var nom_par = 'ventas'
    this.prop.Caption = "Documentos de ventas ";
    this.Form.tit_rep = "Documentos de ventas "
    if (this.Form.Params[0].replaceAll("´", "").toLowerCase() == "co") {
      nom_par = 'compras'
      this.prop.Caption = "Documentos de compras ";
      this.Form.tit_rep = "Documentos de compras "
      this.tip_nof.prop.Visible = false
      this.tip_nof.prop.Disabled = true

    }

    this.var_ord.prop.Value = "ndo_doc";
  }

  ///////////////////////////////////////////////////////////////
  // En caso de tener que generar el query del select del report
  ///////////////////////////////////////////////////////////////

  public async sqlQuery(where: string) {
    this.Form.con_rep = where
    const tip_rep = this.tip_rep.prop.Value
    let localWhere = "";
    if (this.op_tdo_tdo.prop.Value.trim() != "??") {
      if (this.op_tcd_tcd.prop.Value.trim() != '??')
        localWhere = ` (tdo_tdo='${this.op_tdo_tdo.prop.Value}' AND  tcd_tcd='${this.op_tcd_tcd.prop.Value}') and `;
      else localWhere = ` tdo_tdo='${this.op_tdo_tdo.prop.Value}' AND `
    }
    else localWhere = `cop_nom='C' AND `

    if (this.mon_rep.prop.Value > 0) {
      localWhere = localWhere + `mon_doc=${this.mon_rep.prop.Value} AND `;
    }
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
      var_ord = var_ord + ",fec_doc,tdo_tdo,ndo_doc"
    }
    if (this.var_ord.prop.Value == 'fec_doc') {
      this.Form.ord_rep = 3
      var_ord = 'fec_doc,tdo_tdo,ndo_doc'
    }
    if (this.var_ord.prop.Value == 'fel_doc') {
      this.Form.ord_rep = 4
      var_ord = 'fel_doc,tdo_tdo,ndo_doc'
    }
    if (tip_rep == 1)
      var_ord = var_ord + ",cla_isu "
    // si el reporte de con detalle fiscal, asignamos reporte fiscal
    if (this.tip_nof.prop.Value == 1)
      this.for_imp.prop.Value = "jr_come5201_gf"
    // si hay condiciones de reporte  
    if (where.length > 0)
      where = ' AND ' + where

    localWhere =
      localWhere +
      `  fec_doc>='${des_fec}' AND fec_doc<='${has_fec}' ` + where;

    console.log(
      "sqlQuery =",
      `select * from ${this.vis_rep} WHERE ${localWhere} `
    );
    return `select * from ${this.vis_rep} WHERE ${localWhere} order by ${var_ord} `;
  }
} // End ThisForm
