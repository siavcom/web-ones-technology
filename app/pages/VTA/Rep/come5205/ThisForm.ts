//////////////////////////////////////////////
// @baseClass  : reportForm
// @class : thisForm
// Description : General de ventas
// @author: MGSR
// Creation : 2025-06-18
// Update Date  : 2025-06-18
/////////////////////////////////////////////

///////////////////////////////////////
// Base class
///////////////////////////////////////

import { reportVtas } from "@/classes/Siavcom/reports/VTAS/reportVtas";
export class ThisForm extends reportVtas {
  constructor() {
    super(2); // inicializa la clase base
    this.tab_ord = "vi_come5201_g";
    this.prop.Name = "come5205";
    this.prop.Caption = "General de ventas";
    this.prop.Status = "A";
    this.prop.Development = true;
    this.vis_rep = "vi_come5201_g"; // nombre de la vista sql a utilizar en el reporte
    this.for_imp.prop.Value = "jr_come5205"; // no incluir extencion jasper o jrxml
    // deshabilitamos objetos no utilizados
    this.mon_rep.prop.Visible = false; // 
    this.mon_rep.prop.Disabled = true;
    this.tip_rep.prop.Visible = false; // 
    this.tip_rep.prop.Disabled = true;
    this.var_ord.prop.Visible = false;
    this.var_ord.prop.Disabled = true;
    this.des_dat.prop.Visible = false;
    this.has_dat.prop.Visible = false;
    this.tip_con.prop.Visible = false;
    this.des_dat.prop.Disabled = true;
    this.has_dat.prop.Disabled = true;
    this.tip_con.prop.Disabled = true;
    this.op_tcd_tcd.prop.Visible = false
    this.op_tcd_tcd.prop.Disabled = true
    this.op_tdo_tdo.prop.Visible = false
    this.op_tdo_tdo.prop.Disabled = true
    this.des_fec.prop.TabIndex = 1
    this.has_fec.prop.TabIndex = 2
    // definicion de bloques
    this.block[2].component = {
      [0]: this.des_fec,
      [1]: this.has_fec

    }
    this.block[2].prop.Visible = true
    this.block[2].prop.Disabled = false
    this.block[2].title = 'Generales'
    // deshabilitamos bloque que no se utilizan

    this.block[0].prop.Visible = false
    this.block[0].prop.Disabled = true
    this.block[3].prop.Visible = false
    this.block[3].prop.Disabled = true

    this.prop.cam_pri = 'tdo_tdo' // campo de buqueda principal
    // Campos de orden de la vista
    this.fields = [
      ["tdo_tdo", "Tipo de documento"]
    ]

  }

  public async init() {
    await super.init();
    var nom_par = 'ventas'
    this.prop.Caption = "General de ventas ";
    this.Form.tit_rep = "General de ventas "
    if (this.Form.Params[0].replaceAll("´", "").toLowerCase() == "co") {
      nom_par = 'compras'
      this.prop.Caption = "General de compras ";
      this.Form.tit_rep = "General de compras "
    }

    this.var_ord.prop.Value = "tdo_tdo";
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
    let localWhere = " where ";
    var par_prg = 'C'
    if (this.Form.Params[0].replaceAll("´", "") == 'CO')
      par_prg = 'P'

    const des_fec = await dateToSql(this.Form.des_fec.prop.Value); //dateToSql(this.Form.des_fec.Value)
    const has_fec = await dateToSql(this.Form.has_fec.prop.Value); //dateToSql(this.Form.has_fec.Value)
    // armamos el orden del reporte
    var var_ord = this.var_ord.prop.Value;

    // amamos condiciones 
    var tip_ord = '', ins_sql = ''
    localWhere =
      localWhere +
      `  (fec_doc>='${des_fec}' AND fec_doc<='${has_fec}') and cop_nom='${par_prg}' and 
               (COA_TDO='C' OR COA_TDO='A') `;
    if (where.length > 2)
      localWhere = localWhere + ' and ' + where

    ins_sql = `SELECT cop_nom,tdo_tdo,coa_tdo,MAX(DES_TDO) as des_tdo,SUM(IMP_DOC*VMO_DOC) AS imp_doc ,
        SUM(im1_doc*vmo_doc) AS im1_doc,SUM(im2_doc*vmo_doc) AS im2_doc,SUM(im3_doc*vmo_doc) AS im3_doc,
        SUM(im4_doc*vmo_doc) AS im4_doc,SUM(im5_doc*vmo_doc) AS im5_doc,SUM(im0_doc*vmo_doc) AS im0_doc,
  	    sum(ipo_tot*vmo_doc) as ipo_tot,sum(imp_tot*vmo_doc) as imp_tot,sum(0.00) tot_car,sum(0.00) tot_abo  from ${this.Form.vis_rep}
         ${localWhere} GROUP BY cop_nom,coa_tdo,tdo_tdo 
        union 
        select max(cop_nom),' ','A','TOTALES',0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,
          sum(case when coa_tdo='C' then imp_tot*vmo_doc else 0 end),
          sum(case when coa_tdo='A' then imp_tot*vmo_doc else 0 end)
        from ${this.Form.vis_rep} ${localWhere} 
        order by coa_tdo,tdo_tdo
      
  `
    console.log(
      "sqlQuery =",
      ` ${ins_sql} `
    );
    return ` ${ins_sql}  `;
  }
} // End ThisForm
