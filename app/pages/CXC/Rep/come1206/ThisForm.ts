//////////////////////////////////////////////
// BaseClass : reportForm
// Class : ThisForm
// Description : Diario de movimientos
// Author : MGSR
// Creation : 2025-06-05
// Update Date  : 2025-06-06
/////////////////////////////////////////////

///////////////////////////////////////
// Base class
///////////////////////////////////////

import { reportCXC } from "@/classes/Siavcom/reports/CXC/reportCXC";
import { dip_hoj } from "./dip_hoj";

export class ThisForm extends reportCXC {
  public dip_hoj = new dip_hoj()
  constructor() {
    super(0); // inicializa la clase base
    this.tab_ord = "man_comenom";
    this.prop.Name = "come1206";
    this.prop.Caption = "Diario de movimientos";
    this.prop.Status = "A";
    this.prop.Development = true;
    this.vis_rep = "vi_come1206"; // nombre de la vista sql a utilizar en el reporte
    this.for_imp.prop.Value = "jr_come1206"; // no incluir extencion jasper o jrxml
    this.tip_rep.prop.Visible = true; // Muestra general o detallado
    this.tip_rep.prop.Disabled = false
    this.des_fec.prop.Visible = true; //
    this.has_fec.prop.Visible = true;
    this.des_fec.prop.Disabled = false; //
    this.has_fec.prop.Disabled = false;
    this.mon_rep.prop.Visible = true;
    this.mon_rep.prop.TabIndex = 1;
    this.des_fec.prop.TabIndex = 2;
    this.has_fec.prop.TabIndex = 3;
    this.tip_rep.prop.TabIndex = 4;
    this.dip_hoj.prop.TabIndex = 5;
    // definicion de bloques
    this.block[0].component = {
      [0]: this.des_fec,
      [1]: this.has_fec,
      [3]: this.dip_hoj
    }
    this.block[0].prop.Visible = true
    this.block[0].prop.Disabled = false
    this.block[0].title = 'Generales'


    //this.dataView:string ='vcomepge'    // Vista de datos generales
    //this.sqlQuery=' `select des_tdo from cometdo where tdo_tdo=${this.Form.tdo_tdo.Value}` '             // Query a ejecutar antes de la vista del reporte
  }

  public override async init() {
    await super.init();

    this.var_ord.prop.Value = "cod_nom";
    if (this.Form.Params[0].replaceAll("´", "").toLowerCase() == "c")
      this.prop.Caption = "Diario de movimientos de clientes ";
    else
      this.prop.Caption = "Diario de movimientos de proveedores ";
  }

  ///////////////////////////////////////////////////////////////
  // En caso de tener que generar el query del select del report
  ///////////////////////////////////////////////////////////////

  public async sqlQuery(where: string, order: string) {
    let localWhere = "";
    const des_fec = dateToSql(this.Form.des_fec.prop.Value); //dateToSql(this.Form.des_fec.Value)
    const has_fec = dateToSql(this.Form.has_fec.prop.Value); //dateToSql(this.Form.has_fec.Value)
    const tip_rep = this.tip_rep.prop.Value;
    const dip_hoj = this.dip_hoj.prop.Value;
    const var_ord = this.var_ord.prop.Value;
    const mon_rep = this.mon_rep.prop.Value;
    this.Form.ord_vis = ' fec_doc,tdo_tdo,ndo_doc '
    this.Form.con_rep = where
    var par_prg = this.Form.Params[0].replaceAll("´", "").toLowerCase()
    this.Form.for_imp.prop.Value = "jr_come1206" + par_prg
    if (this.Form.tip_rep.prop.Value == 1)         // General
      this.Form.for_imp.prop.Value = this.Form.for_imp.prop.Value + "_d"
    else
      this.Form.for_imp.prop.Value = this.Form.for_imp.prop.Value + "_g"
    if (dip_hoj == 1)
      this.Form.for_imp.prop.Value = this.Form.for_imp.prop.Value + "d"
    // armamos titulo    
    if (par_prg == "C")
      this.Form.tit_rep = "Diario de movimientos de clientes "
    else
      this.Form.tit_rep = "Diario de movimientos de proveedores "
    if (where.length > 1)
      where = ' and ' + where
    console.log(localWhere)
    this.Form.con_vis = ` (fec_doc>='${des_fec}' and FEC_DOC<='${has_fec}') 
               AND COP_NOM='${par_prg}' `
    if (mon_rep != 0)
      this.Form.con_vis = this.Form.con_vis + ` AND MON_DOC=${mon_rep} `

    var fec_sal = addDay(this.des_fec.prop.Value, -1);
    fec_sal = fec_sal.replaceAll("-", "")
    var ins_sql = ` declare @saldo_ini numeric(16,2) ;
      select @saldo_ini=dbo.F_cal_sal_gen('${par_prg}','${fec_sal}',${mon_rep}) 
      select @saldo_ini saldo_ini,* from ${this.vis_rep} where ${this.Form.con_vis}  
      ${where} order by ${this.Form.ord_vis} `
    console.log(
      "sqlQuery =", ` ${ins_sql} `
    );
    // return ` select top 10 * from ${this.Form.vis_rep} `
    return ` ${ins_sql} `;


  }

} // End ThisForm
