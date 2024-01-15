//////////////////////////////////////////////
// BaseClass : reportForm
// Class : Teams
// Description : Reporte de pesadas de basculas
// Author : MGSR
// Creation : 2024-01-11
// Update Date  :
/////////////////////////////////////////////

///////////////////////////////////////
// Base class
///////////////////////////////////////

import { reportForm } from "@/classes/reportForm/reportForm";
import { bascula } from "./bascula";
import { tipo } from "./tipo";
import { des_fec } from "./des_fec";
import { has_fec } from "./has_fec";
import { tip_imp } from "./tip_imp"; 

export class ThisForm extends reportForm {
  public bascula = new bascula();
  public tipo = new tipo();
  public des_fec = new des_fec();
  public has_fec = new has_fec();
  public tip_imp = new tip_imp();

  constructor() {
    super(); // inicializa la clase base
    this.tab_ord = "comebpe"; // Tabla de donde tomara los campos para el orden de la vista
    this.prop.Name = "comebpe";
    this.prop.textLabel = "Reporte de pesadas";
    this.prop.Status = "A";
    this.prop.Development = true;
    this.vis_rep = "vi_comebpe"; // nombre de la vista sql a utilizar en el reporte
    this.for_imp.prop.Value = "rep_comebpe"; // no incluir extencion jasper o jrxml
    this.bascula.prop.TabIndex = 1;
    this.tipo.prop.TabIndex = 2;
    this.des_fec.prop.TabIndex = 3;
    this.has_fec.prop.TabIndex = 4;
    this.tip_imp.prop.TabIndex = 5;
    this.tip_rep.prop.Visible = false;
    this.tip_rep.prop.Disabled = true;
    this.des_fec.prop.Visible = true;
    this.des_fec.prop.Disabled = false;
    this.mon_rep.prop.Visible = false;
    this.mon_rep.prop.Disabled = true;
  }
  public async init() {
    await super.init();
    this.des_fec.prop.Value = this.publicVar.fpo_pge + "T00:00:00";
    this.des_fec.prop.Max = this.publicVar.fpo_pge + "T23:59:59";

    this.has_fec.prop.Value = this.publicVar.fpo_pge + "T23:59:59";
    this.has_fec.prop.Min = this.des_fec.prop.Value;
    // this.has_fec.prop.Max=this.publicVar.fpo_pge+'T23:59:59'

    this.var_ord.prop.Value = "bpe_bpe";
  }
  ///////////////////////////////////////////////////////////////
  // En caso de tener que generar el query del select del report
  ///////////////////////////////////////////////////////////////

  public async sqlQuery(where: string, order: string) {
    let localWhere = "";
    const des_fec = await dateTimeToSql(this.Form.des_fec.prop.Value); //dateToSql(this.Form.des_fec.Value)
    const has_fec = await dateTimeToSql(this.Form.has_fec.prop.Value); //dateToSql(this.Form.has_fec.Value)
    const bas_cul = this.bascula.prop.Value;
    const var_ord = this.var_ord.prop.Value;
    const int_pub = this.tipo.prop.Value;
    const vis_rep = this.vis_rep;
    const tip_imp = this.tip_imp.prop.Value;

    if (int_pub != "T") {
      if (localWhere.length > 0) localWhere = localWhere + ` and  `;
      if (int_pub == "I") localWhere = localWhere + ` tip_bpe=0 `;
      else localWhere = localWhere + ` tip_bpe=1 `;
    }
    if (bas_cul != "T") {
      if (localWhere.length > 0)
        localWhere = localWhere + ` and bas_bpe=${bas_cul} `;
      else localWhere = localWhere + ` bas_bpe=${bas_cul} `;
    }
    if (tip_imp != 0) {
      if (localWhere.length > 0)
        localWhere = localWhere + ` and pe2_bpe=0 `;
      else localWhere = localWhere + ` pe2_bpe=0 `;
    }
    if (where.length > 0) where = " AND " + where;

    if (localWhere.length > 0) localWhere = localWhere + " and ";
    localWhere =
      localWhere + `  tp1_bpe>='${des_fec}' AND tp1_bpe<='${has_fec}' ` + where;

    //localWhere=localWhere.replaceAll("'",'"')
    console.log(
      "sqlQuery =",
      ` select * from ${this.vis_rep} WHERE ${localWhere}  `
    );
    return ` select * from ${this.vis_rep} WHERE ${localWhere}  `;
  }
} // End ThisForm
