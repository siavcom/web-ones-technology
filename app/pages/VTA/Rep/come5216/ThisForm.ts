//////////////////////////////////////////////
// @baseClass  : reportForm
// @class : thisForm
// Description : Reporte de claves alternas
// @author: MGSR
// Creation : 2025-07-10
// Update Date  : 2025-07-10
/////////////////////////////////////////////

///////////////////////////////////////
// Base class
///////////////////////////////////////

import { reportVtas } from "@/classes/Siavcom/reports/VTAS/reportVtas";
export class ThisForm extends reportVtas {
  constructor() {
    super(0); // inicializa la clase base
    this.tab_ord = "vi_come5216";
    this.prop.Name = "come5216";
    this.prop.Caption = "Claves alternas de insumos ";
    this.prop.Status = "A";
    this.prop.Development = true;
    this.vis_rep = "vi_come5216"; // nombre de la vista sql a utilizar en el reporte
    this.for_imp.prop.Value = "jr_come5216"; // no incluir extencion jasper o jrxml
    this.mon_rep.prop.Visible = false; // 
    this.mon_rep.prop.Disabled = true;
    this.tip_rep.prop.Visible = false; // 
    this.tip_rep.prop.Disabled = true;
    this.op_tcd_tcd.prop.Visible = false
    this.op_tcd_tcd.prop.Disabled = true
    this.op_tdo_tdo.prop.Visible = false
    this.op_tdo_tdo.prop.Disabled = true
    this.des_fec.prop.Visible = false
    this.has_fec.prop.Visible = false
    this.des_fec.prop.Disabled = true
    this.has_fec.prop.Disabled = true
    //this.dataView:string ='vcomepge'    // Vista de datos generales
    //this.sqlQuery=' `select des_tdo from cometdo where tdo_tdo=${this.Form.tdo_tdo.Value}` '             // Query a ejecutar antes de la vista del reporte
    var nom_par = 'Cliente'
    this.prop.Caption = "Claves alternas de insumos de Clientes ";

    if (this.Form.Params[0].replaceAll("´", "").toLowerCase() == "co") {
      nom_par = 'Proveedor'
      this.prop.Caption = "Claves alternas de insumos de proveedores ";
    }
    // Definimos campos de orden/busqueda
    this.prop.cam_pri = 'cla_isu' // campo de buqueda principal
    // Campos de orden de la vista
    this.fields = [
      ["cla_isu", "Clave de insumo", "''", "'ZZZZZZZZZ'"],
      ["cod_nom", nom_par, "'000000'", "'999999'"],
      ["nom_nom", "Nombre ", "''", "'ZZZZZZZZZZZZZ'"]
    ]
    this.var_ord.prop.Value = "cla_isu";

    this.block[0].prop.Visible = false
    this.block[0].prop.Disabled = true

  }
  ///////////////////////////////////////////////////////////////
  // En caso de tener que generar el query del select del report
  ///////////////////////////////////////////////////////////////

  public async sqlQuery(where: string, order: string) {
    let localWhere = " where ";
    var par_prg = 'C'
    if (this.Form.Params[0].replaceAll("´", "") == 'CO')
      par_prg = 'P'
    this.Form.con_rep = where
    // armamos el orden del reporte
    var var_ord = this.var_ord.prop.Value;
    this.for_imp.prop.Value = "jr_come5216c"
    order = var_ord + ',cla_isu,fti_con '
    if (var_ord == 'cla_isu') {
      this.for_imp.prop.Value = "jr_come5216i"
      order = var_ord + ',cod_nom,fti_con '
    }
    // amamos condiciones 
    var tip_ord = '', ins_sql = ''
    localWhere =
      localWhere +
      `  cop_nom='${par_prg}'  `;
    if (where.length > 2)
      localWhere = localWhere + ' and ' + where

    ins_sql = `SELECT *  from ${this.Form.vis_rep}  ${localWhere} 
        order by ${order}
      
  `
    console.log(
      "sqlQuery =",
      ` ${ins_sql} `
    );
    return ` ${ins_sql}  `;
  }
} // End ThisForm
