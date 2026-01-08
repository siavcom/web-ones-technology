//////////////////////////////////////////////
// BaseClass : reportForm
// Class : thisForm
// Description : Ventas por día
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 2025-06-16
// Update Date  : 2025-06-16
/////////////////////////////////////////////

///////////////////////////////////////
// Base class
///////////////////////////////////////

import { reportVtas } from "@/classes/Siavcom/reports/VTAS/reportVtas";
import { tip_agr } from "./tip_agr";
export class ThisForm extends reportVtas {
  public tip_agr = new tip_agr()
  constructor() {
    super(2); // inicializa la clase base
    this.tab_ord = "vi_come5201_g";
    this.prop.Name = "come5204";
    this.prop.Caption = "Venta o compra por día";
    this.prop.Status = "A";
    this.prop.Development = true;
    this.vis_rep = "vi_come5201_g"; // nombre de la vista sql a utilizar en el reporte
    this.for_imp.prop.Value = "jr_come5204"; // no incluir extencion jasper o jrxml
    this.mon_rep.prop.Visible = false; // 
    this.mon_rep.prop.Disabled = true;
    this.tip_rep.prop.Visible = false; // 
    this.tip_rep.prop.Disabled = true;
    this.op_tcd_tcd.prop.Visible = false
    this.op_tcd_tcd.prop.Disabled = true
    this.var_ord.prop.Visible = false;
    this.var_ord.prop.Disabled = true;
    this.des_dat.prop.Visible = false;
    this.has_dat.prop.Visible = false;
    this.tip_con.prop.Visible = false;
    this.des_dat.prop.Disabled = true;
    this.has_dat.prop.Disabled = true;
    this.tip_con.prop.Disabled = true;
    this.tip_agr.prop.Visible = true
    this.tip_agr.prop.Disabled = false
    this.op_tdo_tdo.prop.TabIndex = 1
    this.op_tcd_tcd.prop.TabIndex = 2
    this.des_fec.prop.TabIndex = 3
    this.has_fec.prop.TabIndex = 4
    this.tip_agr.prop.TabIndex = 5
    // definicion de bloques
    this.block[2].component = {
      [0]: this.op_tdo_tdo,
      [1]: this.op_tcd_tcd,
      [2]: this.des_fec,
      [3]: this.has_fec,
      [4]: this.tip_agr
    }

    this.block[2].prop.Visible = true
    this.block[2].prop.Disabled = false
    this.block[2].title = 'Generales'

    this.block[0].prop.Visible = false
    this.block[0].prop.Disabled = true


    this.block[3].prop.Visible = false
    this.block[3].prop.Disabled = true

    this.prop.cam_pri = 'tdo_tdo' // campo de buqueda principal
    // Campos de orden de la vista
    this.fields = [
      ["tdo_tdo", "Tipo documento"]
    ]

  }

  override async init() {
    await super.init();
    var nom_par = 'ventas'
    this.prop.Caption = "Ventas por día ";
    this.Form.tit_rep = "Ventas por día "
    console.log('ThisForm Params', this.Form.Params)
    if (this.Form.Params[0].replaceAll("´", "").toLowerCase() == "co") {
      nom_par = 'compras'
      this.prop.Caption = "Compras por día ";
      this.Form.tit_rep = "Compras por día "
    }

    this.var_ord.prop.Value = "tdo_tdo";
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
    const tip_agr = this.tip_agr.prop.Value
    const op_tdo_tdo = this.op_tdo_tdo.prop.Value
    const op_tcd_tcd = this.op_tcd_tcd.prop.Value
    let localWhere = " where ";
    var par_prg = 'C'
    if (this.Form.Params[0].replaceAll("´", "") == 'VE')
      par_prg = 'P'
    if (op_tdo_tdo.trim() != "??") {
      if (op_tcd_tcd.trim() != '??')
        localWhere = ` (tdo_tdo='${this.op_tdo_tdo.prop.Value}' AND  tcd_tcd='${this.op_tcd_tcd.prop.Value}') and `;
      else localWhere = ` tdo_tdo='${this.op_tdo_tdo.prop.Value}' AND `
    }
    else localWhere = `cop_nom='${par_prg}' AND `

    const des_fec = await dateToSql(this.Form.des_fec.prop.Value); //dateToSql(this.Form.des_fec.Value)
    const has_fec = await dateToSql(this.Form.has_fec.prop.Value); //dateToSql(this.Form.has_fec.Value)
    // armamos el orden del reporte
    var var_ord = this.var_ord.prop.Value;
    // pasamos a numerico la variable de orden
    if (this.var_ord.prop.Value == 'cla_isu') {
      this.Form.ord_rep = 1
      var_ord = 'cla_isu'
    }
    if (this.var_ord.prop.Value == "des_isu") {
      this.Form.ord_rep = 2
      var_ord = var_ord + "des_isu"
    }
    // amamos condiciones 
    var tip_ord = '', ins_sql = ''
    localWhere =
      localWhere +
      `  fec_doc>='${des_fec}' AND fec_doc<='${has_fec}' `;
    // asignamos el valor a tag_tcd para saber si hay clasificacion de documentos
    var tag_tcd = 0
    const data = await this.Sql.localAlaSql(`select count(*) as key_pri from now.loc_cometcd where tdo_tdo='${this.op_tdo_tdo.prop.Value}'`)
    console.log('dato=', data[0].key_pri)
    if (data[0].key_pri > 0)
      tag_tcd = 1
    switch (tip_agr) {
      case 1: {
        tip_ord = " GROUP BY TDO_TDO,TCD_TCD,FEC_DOC order by TDO_TDO,TCD_TCD,FEC_DOC"
        this.for_imp.prop.Value = "jr_come5204_d"
        break
      }
      case 2: {
        tip_ord = " GROUP BY TDO_TDO,FEC_DOC,TCD_TCD order by TDO_TDO,FEC_DOC,TCD_TCD"
        this.for_imp.prop.Value = "jr_come5204_g"
        break
      }
      case 3: {
        tip_ord = " GROUP BY TDO_TDO,FEC_DOC order by TDO_TDO,FEC_DOC "
        ins_sql = ` SELECT tdo_tdo,fec_doc,SUM(IMP_DOC*VMO_DOC) AS imp_doc,SUM(IM1_DOC*VMO_DOC) AS im1_doc,
			  SUM(IM2_DOC*VMO_DOC) AS im2_doc,SUM(IM3_DOC*VMO_DOC) AS im3_doc,SUM(IM4_DOC*VMO_DOC) AS im4_doc,
        SUM(IM5_DOC*VMO_DOC) AS im5_doc,SUM(IM0_DOC*VMO_DOC) AS im0_doc,MAX(DES_TDO) AS des_tdo,
        MAX(DES_TCD) AS des_tcd,max(${tag_tcd}) as tag_tcd
	        from ${this.vis_rep} where ${localWhere} ${tip_ord} `
        this.for_imp.prop.Value = "jr_come5204_g"
        break
      }
    }
    if (tip_agr < 3)
      ins_sql = ` SELECT tdo_tdo,tcd_tcd,fec_doc,SUM(IMP_DOC*VMO_DOC) AS imp_doc,SUM(IM1_DOC*VMO_DOC) AS im1_doc,
			  SUM(IM2_DOC*VMO_DOC) AS im2_doc,SUM(IM3_DOC*VMO_DOC) AS im3_doc,SUM(IM4_DOC*VMO_DOC) AS im4_doc,
        SUM(IM5_DOC*VMO_DOC) AS im5_doc,SUM(IM0_DOC*VMO_DOC) AS im0_doc,MAX(DES_TDO) AS des_tdo,
        MAX(DES_TCD) AS des_tcd,max(${tag_tcd}) as tag_tcd
	        from ${this.vis_rep} where ${localWhere} ${tip_ord} `

    console.log(
      "sqlQuery =",
      ` ${ins_sql} `
    );
    return `${ins_sql} `;
  }
} // End ThisForm
