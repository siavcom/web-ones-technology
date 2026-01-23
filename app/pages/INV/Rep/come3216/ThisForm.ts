//////////////////////////////////////////////
// @baseClass  : reportForm
// @class : reportInv
// Description : Existencia por lote o serie de producto
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 2025/mzo/05
// Update Date  : 
/////////////////////////////////////////////

///////////////////////////////////////
// Base class 
///////////////////////////////////////

import { reportInv } from '@/classes/Siavcom/reports/INV/reportInv'
export class ThisForm extends reportInv {

  constructor() {
    super(1)  // inicializa la clase base
    this.tab_ord = 'vi_come3216_s'
    this.prop.Name = 'come3216'
    this.prop.Caption = "Existencias por lote o serie de producto"
    this.prop.Status = 'A'
    this.prop.Development = true
    this.vis_rep = 'vi_come3216_s'   // nombre de la vista sql a utilizar en el reporte
    this.for_imp.prop.Value = 'jr_come3216'   // no incluir extencion jasper o jrxml
    this.tip_rep.prop.Visible = false    // 
    this.tip_rep.prop.Disabled = true
    this.mon_rep.prop.Visible = false
    this.mon_rep.prop.Disabled = true
    this.op_des_isu.prop.Visible = false
    this.op_des_isu.prop.Disabled = true
    this.op_has_isu.prop.Visible = false
    this.op_has_isu.prop.Disabled = true
    this.des_fec.prop.Visible = false
    this.des_fec.prop.Disabled = true
    this.tip_imp.prop.TabIndex = 1
    this.has_fec.prop.TabIndex = 2
    this.alm_rep.prop.TabIndex = 3
    // preparamos seleccion de tipo de reporte por lote o serie
    this.tip_imp.prop.Caption = " Tipo "
    this.tip_imp.prop.RowSourceType = 5; //1-Value, 2-Alias,3-sql 5-Array
    this.tip_imp.prop.RowSource = [
      ["Lote ", "Serie "],
      ["L", "S"]
    ];
    this.tip_imp.prop.ColumnCount = 2;
    this.tip_imp.prop.BoundColumn = 2;
    this.tip_imp.prop.ColumnWidths = "75%,25%"; // Puede ser en puntos 60px,30px /
    this.tip_imp.prop.Value = '1'

    // definicion de bloques
    this.block[0].component = {
      [0]: this.tip_imp,
      [1]: this.has_fec,
      [2]: this.alm_rep

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
    const tip_imp = this.tip_imp.prop.Value;
    const alm_rep = this.Form.alm_rep.prop.Value;
    const var_ord = this.var_ord.prop.Value;
    const ima_pge = this.Form.mPublic.ima_pge;
    const sep_fam = this.sep_fam.prop.Value;
    const op_des_fam = this.op_des_fam.prop.Value;
    const op_has_fam = this.op_has_fam.prop.Value;
    const num_fam = this.num_fam.prop.Value;
    this.Form.con_rep = where
    var pri_cla = 0,
      ult_cla = 29,
      pos_tom = 30,
      fam_num = 1,
      cn_i = 0;

    if (sep_fam == 1) {
      pri_cla = 0;
      //ult_cla=ima_pge.trim.length;
      console.log("ult_cla=" + ult_cla)
      if (this.Form.op_has_fam.prop.Value < this.Form.op_des_fam.prop.Value || this.Form.op_has_fam.prop.Value.length == 0)
        this.Form.op_has_fam.prop.value = "ZZZZZ";
      // número de familia

      while (cn_i > -1 && fam_num <= num_fam) {
        cn_i = ima_pge.indexOf('-', cn_i + 1)
        if (cn_i > -1) {
          if (fam_num == num_fam)
            ult_cla = cn_i
          else
            pri_cla = cn_i + 1
          fam_num = fam_num + 1
        }

      }
      pos_tom = ult_cla - pri_cla;
      pri_cla = pri_cla + 1;
      localWhere = localWhere + ` (substring(cla_isu,${pri_cla},${pos_tom})>='${op_des_fam}' and substring(cla_isu,${pri_cla},${pos_tom})<='${op_has_fam}') `;
      var ord_fam = 'substring(cla_isu,${pri_cla},${pos_tom})'
    }
    if (where.length > 0)
      where = ' AND ' + where

    if (tip_imp == "L") {
      this.for_imp.prop.Value = 'jr_come3216_l'   // no incluir extencion jasper o jrxml
    }
    else {
      this.for_imp.prop.Value = 'jr_come3216_s'   // no incluir extencion jasper o jrxml
    }
    var con_vis = "", ins_sql = "";

    con_vis = ` ( FEC_MOV<='${has_fec}'  AND SSE_PRO='${tip_imp}') `
    if (alm_rep.trim() != "??")
      con_vis = con_vis + ` and alm_tda='${alm_rep}' `

    if (localWhere.length > 3)
      localWhere =
        localWhere + ' and '
    localWhere = ` where ${localWhere} ${con_vis} ${where}
    `
    if (tip_imp == 'L')
      ins_sql = `SELECT cla_isu as cla_con,alm_tda,ser_mov,max(fpo_lot) as fpo_lot,
      max(fca_lot) as fca_lot ,max(ob1_lot) as ob1_lot ,max(ob2_lot) as ob2_lot,
      max(ob3_lot) as ob3_lot,
      SUM(case when ${this.vis_rep}.INV_TDO='E' then CAN_MOV else 0 end ) AS can_ent,  
       SUM(case when ${this.vis_rep}.INV_TDO='S' then CAN_MOV else 0 end ) AS can_sal
       into #resultado from ${this.vis_rep}
       join man_cometdo on ${this.vis_rep}.tdo_tdo=man_cometdo.tdo_tdo 
      ${localWhere}
      GROUP by cla_isu,alm_tda,ser_mov ORDER BY cla_con,ser_mov
    `
    else
      ins_sql = `
      SELECT cla_isu as cla_con,alm_tda,ser_mov,
        SUM(case when ${this.vis_rep}.INV_TDO='E' then CAN_MOV else 0 end ) AS can_ent,  
       SUM(case when ${this.vis_rep}.INV_TDO='S' then CAN_MOV else 0 end ) AS can_sal
       into #resultado from ${this.vis_rep}
       join man_cometdo on ${this.vis_rep}.tdo_tdo=man_cometdo.tdo_tdo 
      ${localWhere}
      GROUP by cla_isu,alm_tda,ser_mov ORDER BY cla_con,ser_mov
    `
    var sql_alm = 'null'
    if (alm_rep.trim() != '??') {
      sql_alm = "'" + alm_rep + "'"
      const data = await this.Sql.localAlaSql(` select des_tda from now.loc_cometda where alm_tda='${this.alm_rep.prop.Value}' `)
      this.Form.tit_rep = 'Almacen: ' + data[0].des_tda.trim()
    }
    ins_sql = ins_sql + `
    SELECT dbo.F_CAL_EXI_GEN(cla_con,0,'${has_fec}',${sql_alm},NULL,NULL,NULL) as exi_fis,
     * FROM #RESULTADO JOIN vi_come3201 vcome3201 ON #RESULTADO.CLA_CON=VCOME3201.CLA_ISU 
	     ORDER BY cla_con,ser_mov drop table #resultado  
        `
    console.log(
      "sqlQuery =", ins_sql, 'titulo=', this.Form.tit_rep
    );
    return ` ${ins_sql} `;

    //  return ` EXEC p_come3203 '${des_fec}','${has_fec}','${ini_isu}','${fin_isu}','${alm_rep}','${localWhere} ',${tip_rep},${tip_imp},'${var_ord}' `;


  }

} // End ThisForm

