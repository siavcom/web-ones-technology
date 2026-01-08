//////////////////////////////////////////////
// BaseClass : reportForm
// Class : thisForm
// Description : Pedidos contra inventario
// Author : MGSR
// Creation : 2025-06-20
// Update Date  : 2025-06-20
/////////////////////////////////////////////

///////////////////////////////////////
// Base class
///////////////////////////////////////

import { reportVtas } from "@/classes/Siavcom/reports/VTAS/reportVtas";
import { imp_exi } from "./imp_exi";

export class ThisForm extends reportVtas {
  public imp_exi = new imp_exi()
  constructor() {
    super(3); // inicializa la clase base
    this.tab_ord = "vi_come5207";
    this.prop.Name = "come5207";
    this.prop.Caption = "Pedidos vs inventario";
    this.prop.Status = "A";
    this.prop.Development = true;
    this.vis_rep = "vi_come5207"; // nombre de la vista sql a utilizar en el reporte
    this.for_imp.prop.Value = "jr_come5207"; // no incluir extencion jasper o jrxml
    this.mon_rep.prop.Visible = false; // 
    // deshabilitamos elementos que no requerimos
    this.mon_rep.prop.Disabled = true;
    this.tip_rep.prop.Visible = false; // 
    this.tip_rep.prop.Disabled = true;
    this.op_tdo_tdo.prop.Visible = false;
    this.op_tdo_tdo.prop.Disabled = true;
    this.op_tcd_tcd.prop.Visible = false
    this.op_tcd_tcd.prop.Disabled = true
    this.des_fec.prop.Visible = false;
    this.des_fec.prop.Disabled = true;
    // Habilitamos elementos que si se requieren
    this.sep_fam.prop.Visible = true
    this.sep_fam.prop.Disabled = false
    this.alm_rep.prop.Visible = true
    this.alm_rep.prop.Disabled = false
    // damos orden de visualizacion
    this.has_fec.prop.TabIndex = 1
    this.imp_exi.prop.TabIndex = 2
    this.alm_rep.prop.TabIndex = 3
    this.sep_fam.prop.TabIndex = 4
    // definicion de bloques
    this.block[2].component = {
      [3]: this.has_fec,
      [4]: this.imp_exi,
      [5]: this.alm_rep
    }
    this.block[2].prop.Visible = true
    this.block[2].prop.Disabled = false
    this.block[2].title = 'Generales'

    this.block[3].component = {
      [0]: this.sep_fam,
      [1]: this.num_fam,
      [2]: this.op_des_fam,
      [3]: this.op_has_fam
    }
    this.block[3].prop.Visible = true
    this.block[3].prop.Disabled = false
    this.block[3].title = 'Familias'

    this.block[0].prop.Visible = false
    this.block[0].prop.Disabled = true

    this.block[4].prop.Visible = false
    this.block[4].prop.Disabled = true
    // Definimos campos de orden/busqueda
    this.prop.cam_pri = 'cla_isu' // campo de buqueda principal
    // Campos de orden de la vista
    this.fields = [
      ["cla_isu", "Clave"],
      ["des_isu", "Descripción"],
      ["sku_isu", "SKU"]

    ]
    this.var_ord.prop.Value = "cla_isu";

    //    console.log('parametros=',this.Form.Params[0])

  }

  public async init() {

    await super.init();


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

  public async sqlQuery(where: string, order: string) {
    const sep_fam = this.sep_fam.prop.Value;
    const op_des_fam = this.op_des_fam.prop.Value;
    const op_has_fam = this.op_has_fam.prop.Value;
    const num_fam = this.num_fam.prop.Value;
    var alm_rep = this.alm_rep.prop.Value;
    const imp_exi = this.imp_exi.prop.Value;
    let localWhere = " ";
    var par_prg = 'C', tit_rep = '', alm_sql = ''

    const has_fec = await dateToSql(this.Form.has_fec.prop.Value); //dateToSql(this.Form.has_fec.Value)
    var pri_cla = 1,
      pos_tom = 30,
      var_fam = ' ',
      que_fam = ' des_fa1 ';

    if (sep_fam == 1) {
      if (this.Form.op_has_fam.prop.Value < this.Form.op_des_fam.prop.Value || this.Form.op_has_fam.prop.Value.length == 0)
        this.Form.op_has_fam.prop.Value = "ZZZZZ";
      // nos traemos posicion de la familia
      const data = await this.Sql.localAlaSql(` select top 1 pri_cla,ult_cla,que_fam from now.loc_comefam where num_fam=${num_fam} `)
      pri_cla = data[0].pri_cla + 1
      pos_tom = data[0].ult_cla - pri_cla
      que_fam = ' ' + data[0].que_fam + ' '
      var_fam = `substring(cla_isu,${pri_cla},${pos_tom})`  // variable para sustituir en query
      localWhere = ` (${var_fam}>='${op_des_fam}' and ${var_fam}<='${op_has_fam}') `;
      order = order.replaceAll("order by ", "order by des_fam,")
    }
    // armamos almacen
    if (alm_rep.trim() != '??') {
      alm_rep = "'" + alm_rep + "'"
      alm_sql = ` and alm_tda=${alm_rep} `
      // generamos titulo del reporte
      const data = await this.Sql.localAlaSql(` select des_tda from now.loc_cometda where alm_tda=${alm_rep} `)
      tit_rep = tit_rep + ' almacén ' + data[0].des_tda.trim()
    }
    else {
      tit_rep = tit_rep + ' todos los almacenes '
      alm_rep = 'NULL';

    }
    this.Form.tit_rep = tit_rep
    this.Form.con_rep = where
    // verificamos si el programa es de inventarios tomamos fecha del movimiento

    // localWhere=localWhere.replaceAll("'",'"')

    if (where.length > 0)
      where = ` and ${where}  `

    // armamos el orden del reporte
    var var_ord = this.var_ord.prop.Value;

    // amamos condiciones 
    var tip_ord = '', ins_sql = ''
    if (localWhere.length > 3)
      localWhere = localWhere + ' and '

    localWhere =
      localWhere +
      ` fec_doc<='${has_fec}'  ${alm_sql} ${where} `
    //and cop_nom='${par_prg}' and   (COA_TDO='C' OR COA_TDO='A') `;

    ins_sql = `SELECT CLA_ISU AS cla_isu1,max(des_isu) des_isu1,
          SUM(CASE WHEN COP_NOM='C' THEN CAN_MOV-CEN_MOV  ELSE 0  END) AS can_cli,
					SUM(CASE WHEN COP_NOM='P' THEN CAN_MOV-CEN_MOV  ELSE 0 END) AS can_pro,
          SUM(CASE WHEN COP_NOM='C' AND APA_TDO=1 AND FVE_DOC>'${has_fec}' THEN CAN_MOV-CEN_MOV 
                                     ELSE 0  END) AS can_apa,
	        isnull(dbo.F_CAL_EXI_GEN(CLA_ISU,0,'${has_fec}',${alm_rep},NULL,NULL,NULL),0) as exi_ini,
          MAX(des_tda) as des_tda 
          INTO  #RESULTADO from ${this.Form.vis_rep} where ${localWhere} 
          GROUP BY CLA_ISU 
    SELECT cla_isu1 cla_isu,des_isu1 des_isu,exi_ini,can_cli,can_apa,can_pro,un1_isu,${que_fam} des_fam
     FROM vi_come3201_g vcome3201 JOIN #RESULTADO ON #RESULTADO.CLA_ISU1=vcome3201.CLA_ISU
     `
    if (imp_exi == 1)
      ins_sql = ins_sql + ` where (CAN_CLI>0 OR CAN_PRO>0 OR CAN_APA>0) `
    ins_sql = ins_sql + `  ${order} drop table #resultado `
    console.log(
      "sqlQuery =",
      ` ${ins_sql} `
    );
    return `  ${ins_sql} `;
  }
} // End ThisForm
