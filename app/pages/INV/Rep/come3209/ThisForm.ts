//////////////////////////////////////////////
// BaseClass : reportForm
// Class : reportInv
// Description : Reporte de toma de inventario fisico
// Author : MGSR
// Creation : 2025/02/06
// Update Date  : 
/////////////////////////////////////////////

///////////////////////////////////////
// Base class 
///////////////////////////////////////

import { reportInv } from '@/classes/Siavcom/reports/INV/reportInv'
export class ThisForm extends reportInv {

  constructor() {
    super(1)  // inicializa la clase base
    this.tab_ord = 'vi_come3203_g'
    this.prop.Name = 'come3209'
    this.prop.Caption = "Toma de inventario físico"
    this.prop.Status = 'A'
    this.prop.Development = true
    this.vis_rep = 'vi_come3203'   // nombre de la vista sql a utilizar en el reporte
    this.for_imp.prop.Value = 'jr_come3209'   // no incluir extencion jasper o jrxml
    this.tip_rep.prop.Visible = true    // Muestra general odetallado
    this.tip_rep.prop.Disabled = false
    this.tip_rep.prop.Caption = 'Comparación contra capturado '
    this.mon_rep.prop.Visible = false
    this.mon_rep.prop.Disabled = true
    this.des_fec.prop.Visible = false
    this.des_fec.prop.Disabled = true
    this.op_des_isu.prop.Visible = false
    this.op_des_isu.prop.Disabled = true
    this.op_has_isu.prop.Visible = false
    this.op_has_isu.prop.Disabled = true

    //this.dataView:string ='vcomepge'    // Vista de datos generales
    //this.sqlQuery=' `select des_tdo from cometdo where tdo_tdo=${this.Form.tdo_tdo.Value}` '             // Query a ejecutar antes de la vista del reporte
    this.tip_rep.prop.TabIndex = 1;
    this.has_fec.prop.TabIndex = 2;
    this.tip_imp.prop.TabIndex = 3;
    this.alm_rep.prop.TabIndex = 4;
    this.tip_imp.prop.RowSource = [
      [
        "Con existencia",
        "Existencia en cero",
        "Existencia en negativo",
        "Todos",
      ],
      [1, 2, 3, 4],
    ];
    // definicion de bloques
    this.block[0].component = {
      [0]: this.tip_rep,
      [1]: this.has_fec,
      [2]: this.tip_imp,
      [3]: this.alm_rep
    }
    this.block[0].prop.Visible = true
    this.block[0].prop.Disabled = false
    this.block[0].title = 'Generales'

    this.block[1].component = {
      [0]: this.sep_fam,
      [1]: this.num_fam,
      [2]: this.op_des_fam,
      [3]: this.op_has_fam
    }
    this.block[1].prop.Visible = true
    this.block[1].prop.Disabled = false
    this.block[1].title = 'Familias'

    this.block[2].prop.Visible = false
    this.block[2].prop.Disabled = true

  }

  ///////////////////////////////////////////////////////////////
  // En caso de tener que generar el query del select del report
  ///////////////////////////////////////////////////////////////

  public async sqlQuery(where: string, order: string) {
    let localWhere = "";
    const has_fec = await dateToSql(this.Form.has_fec.prop.Value); //dateToSql(this.Form.has_fec.Value)
    const tip_rep = this.tip_rep.prop.Value;
    const tip_imp = this.Form.tip_imp.prop.Value;
    const ini_isu = this.op_des_isu.prop.Value;
    const fin_isu = this.op_has_isu.prop.Value;
    const alm_rep = this.Form.alm_rep.prop.Value;
    const var_ord = this.var_ord.prop.Value;
    const ima_pge = this.Form.mPublic.ima_pge;
    const sep_fam = this.sep_fam.prop.Value;
    const op_des_fam = this.op_des_fam.prop.Value;
    const op_has_fam = this.op_has_fam.prop.Value;
    const num_fam = this.num_fam.prop.Value;
    this.Form.con_rep = where
    var pri_cla = 1,
      ult_cla = 29,
      pos_tom = 30,
      var_fam = ' ',
      que_fam = 'des_fa1 ';

    if (sep_fam == 1) {
      if (this.Form.op_has_fam.prop.Value < this.Form.op_des_fam.prop.Value || this.Form.op_has_fam.prop.Value.length == 0)
        this.Form.op_has_fam.prop.Value = "ZZZZZ";
      // nos traemos posicion de la familia
      const data = await this.Sql.localAlaSql(` select top 1 pri_cla,ult_cla,que_fam from now.loc_comefam where num_fam=${num_fam} `)
      pri_cla = data[0].pri_cla + 1
      pos_tom = data[0].ult_cla - pri_cla
      que_fam = data[0].que_fam + ' '
      var_fam = `substring(cla_isu,${pri_cla},${pos_tom}`  // variable para sustituir en query
      localWhere = ` (${var_fam})>='${op_des_fam}' and ${var_fam})<='${op_has_fam}') `;
      order = 'order by des_fam,' + var_ord
    }

    var fec_cie = await addDay(this.Form.mPublic.uac_pge, 1);
    var has_fec_que = "'" + this.has_fec.prop.Value.replaceAll('-', '') + "'"
    var des_fec_exi = "'" + this.Form.mPublic.uac_pge.replaceAll('-', '') + "'"
    var des_fec_que = "'" + fec_cie.replaceAll('-', '') + "'"

    var con_con = `
     WHERE VCOME3203.CLA_ISU=VCOME3201.CLA_ISU AND FEC_MOV>=${des_fec_que}
          AND FEC_MOV<=${has_fec_que} `
    if (alm_rep.trim() != '??')
      con_con = con_con + ` and alm_tda ='${alm_rep}' `
    else
      con_con = con_con + ` and ave_tda =1  `

    // localWhere=localWhere.replaceAll("'",'"')
    var alm_tda = alm_rep
    if (alm_rep.trim() == '??')
      alm_tda = 'NULL'

    if (localWhere.length < 3)
      localWhere = " tin_tti='P' ";
    if (where.length > 0)
      localWhere = localWhere + 'AND ' + where;
    // generamos titulo del reporte
    var tit_rep = ''
    if (this.alm_rep.prop.Value != '?? ') {
      const data = await this.Sql.localAlaSql(` select des_tda from now.loc_cometda where alm_tda='${alm_rep}' `)
      tit_rep = ' ' + data[0].des_tda.trim()
    }
    else
      tit_rep = ' todos '
    this.Form.tit_rep = tit_rep

    var ins_sql = ' '
    ins_sql = `
    SELECT *,(select ISNULL(SUM(case  when INV_TDO='E' then CAN_MOV else 0 end ),0) from vi_come3203_g vcome3203 ${con_con} ) can_ent,
      ( select ISNULL(SUM(case when INV_TDO='S' then CAN_MOV  else 0 end ),0) from vi_come3203_g vcome3203 ${con_con} ) can_sal,
	    dbo.F_CAL_EXI_GEN(CLA_ISU,0,${des_fec_exi},${alm_tda},NULL,NULL,NULL) as exi_ini, 
	    dbo.F_CAL_EXI_TIF(CLA_ISU,${has_fec_que},${alm_tda},NULL,NULL) as cal_tif,${que_fam} des_fam
  	   INTO #RESULTADO from  vi_come3201 vcome3201  where ${localWhere}
    select * from #RESULTADO `
    if (tip_imp == 1)
      ins_sql = ins_sql + ` where EXI_INI+CAN_ENT-CAN_SAL<>0 `
    if (tip_imp == 2)
      ins_sql = ins_sql + ` where EXI_INI+CAN_ENT-CAN_SAL=0 `
    if (tip_imp == 3)
      ins_sql = ins_sql + ` where EXI_INI+CAN_ENT-CAN_SAL<0 `
    ins_sql = ins_sql + `${order} ;  DROP TABLE #RESULTADO   `

    console.log(ins_sql)
      ;
    //return `select top 1 * from ${this.vis_rep} vcome3203  `;
    this.for_imp.prop.Value = 'jr_come3209'
    return ` ${ins_sql} `

  }

} // End ThisForm

