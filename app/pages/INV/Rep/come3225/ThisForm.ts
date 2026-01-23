//////////////////////////////////////////////
// @baseClass  : reportForm
// @class : reportInv
// Description : Rotación de inventarios
// @author: MGSR
// Creation : 2025/03/21
// Update Date  : 
/////////////////////////////////////////////

///////////////////////////////////////
// Base class 
///////////////////////////////////////

import { reportInv } from '~/classes/Siavcom/reports/INV/reportInv'
import { tip_rot } from './tip_rot'
import { rep_rep } from './rep_rep'
import { left } from '~/composables/Functions'
export class ThisForm extends reportInv {
  public tip_rot = new tip_rot()
  public tip_exi = new rep_rep()
  constructor() {
    super(1)  // inicializa la clase base
    this.tab_ord = 'vi_come3225'
    this.prop.Name = 'come3225'
    this.prop.Caption = "Rotación de inventario"
    this.prop.Status = 'A'
    this.prop.Development = true
    this.vis_rep = 'vi_come3225'   // nombre de la vista sql a utilizar en el reporte
    this.for_imp.prop.Value = 'jr_come3225'   // no incluir extencion jasper o jrxml
    this.tip_rep.prop.Visible = false  // Muestra general odetallado
    this.tip_rep.prop.Disabled = true
    this.tip_imp.prop.Visible = false
    this.tip_imp.prop.Disabled = true
    this.mon_rep.prop.Visible = false
    this.mon_rep.prop.Disabled = true
    this.alm_rep.prop.MultiSelect = false
    //this.dataView:string ='vcomepge'    // Vista de datos generales
    //this.sqlQuery=' `select des_tdo from cometdo where tdo_tdo=${this.Form.tdo_tdo.prop.Value}` '             // Query a ejecutar antes de la vista del reporte
    // deshabilitamos los elementos que no necesitamos de la clase
    this.op_des_isu.prop.Visible = false
    this.op_has_isu.prop.Visible = false
    this.op_des_isu.prop.Disabled = true
    this.op_has_isu.prop.Disabled = true
    this.des_fec.prop.TabIndex = 1;
    this.has_fec.prop.TabIndex = 2;
    this.tip_exi.prop.TabIndex = 3;
    this.tip_rot.prop.TabIndex = 4;
    this.alm_rep.prop.TabIndex = 5;
    // definicion de bloques 
    this.block[0].component = {
      [0]: this.des_fec,
      [1]: this.has_fec,
      [2]: this.tip_exi,
      [3]: this.tip_rot,
      [4]: this.alm_rep

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
    const des_fec = await dateToSql(this.Form.des_fec.prop.Value); //dateToSql(this.Form.des_fec.prop.Value)
    const has_fec = await dateToSql(this.Form.has_fec.prop.Value); //dateToSql(this.Form.has_fec.prop.Value)
    const tip_rep = this.tip_exi.prop.Value;
    const tip_rot = this.tip_rot.prop.Value;
    const alm_rep = this.Form.alm_rep.prop.Value;
    const var_ord = this.var_ord.prop.Value;
    const sep_fam = this.sep_fam.prop.Value;
    const ima_pge = this.Form.mPublic.ima_pge;
    const op_des_fam = this.op_des_fam.prop.Value;
    const op_has_fam = this.op_has_fam.prop.Value;
    const num_fam = this.num_fam.prop.Value;
    this.Form.con_rep = where
    var pri_cla = 1,
      ult_cla = 29,
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
    }
    // armamos query de condiciones 
    var fec_exi = await addDay(this.des_fec.prop.Value, -1),
      con_con = `  (FEC_MOV>='${des_fec}' AND FEC_MOV<='${has_fec}' ) `,
      con_max = ` (FEC_MOV<='${has_fec}') `,
      con_cone = ` WHERE CLA_ISU=VCOME3201.CLA_ISU  `,
      con_vis = '', alm_alm = 'null', tit_rep = 'Almacen: ', con_sql = '';
    fec_exi = fec_exi.replaceAll('-', '')
    con_vis = where
    if (this.alm_rep.prop.Value.trim() != '??') {					// si es un almacen especifico
      alm_alm = "'" + alm_rep + "'";
      con_con = con_con + ` and ALM_TDA='${this.alm_rep.prop.Value}'`
      con_max = con_max + ` and ALM_TDA='${this.alm_rep.prop.Value}'`
      con_cone = con_cone + ` and ALM_TDA=${this.alm_rep.prop.Value}'`
      // obtenemos la descripcion de los almacenes seleccionados   
      const data = await this.Sql.localAlaSql(` select des_tda from now.loc_cometda where alm_tda='${alm_rep}' `)
      tit_rep = tit_rep + data[0].des_tda.trim()

    }
    else {													// si son todos los almacenes se trae los de venta
      con_con = con_con + " and AVE_TDA=1 "
      con_max = con_max + " and AVE_TDA=1 "
      tit_rep = tit_rep + ' todos '
    }

    var ord_vis = this.Form.ord_vis
    if (sep_fam == 0)									// si no es reporte de separación de familias
    // utiliza la variable principal de orden y 
    {
      if (var_ord.trim().length > 0) {
        ord_vis = "vi_come3201." + var_ord
      }
    }
    else														// orden por clave y variable de orden	
      // y orden de la vista
      ord_vis = `SUBSTRING(vi_come3201.cla_isu,${pri_cla},${pos_tom}),
        vi_come3201.${var_ord} `
    if (this.Form.ord_vis.trim().length > 0)
      ord_vis = ord_vis + `,${this.Form.ord_vis}`

    this.Form.tit_rep = tit_rep
    if (localWhere.trim().length > 0)
      localWhere = ' and ' + localWhere
    if (con_vis.trim().length > 0)
      con_vis = con_vis
    con_vis = ' where ' + con_vis + localWhere
    this.Form.tit_rep = tit_rep
    var ins_sql = ` select cla_isu as cla_mov,
    isnull(SUM(case when INV_TDO='E' AND TRA_TDO=0 and cod_nom<>' ' then CAN_MOV else 0 end ),0) AS can_ent,
    isnull(SUM(case when INV_TDO='S' AND TRA_TDO=0 and cod_nom<>' ' then CAN_MOV else 0 end ),0) AS can_sal,
    isnull(SUM(case when INV_TDO='E' AND TRA_TDO=0 and cod_nom=' '  then CAN_MOV else 0 end ),0) AS ent_ent,
    isnull(SUM(case when INV_TDO='S' AND TRA_TDO=0 and cod_nom=' ' then CAN_MOV  else 0 end ),0) AS sal_sal,
    isnull(SUM(case when INV_TDO='E' AND TRA_TDO=1 then CAN_MOV else 0 end ),0) AS ent_tra,
    isnull(SUM(case when INV_TDO='S'AND TRA_TDO=1 then CAN_MOV  else 0 end ),0) AS sal_tra 
    into #ventas from  vi_come3225 ${con_vis} and ${con_con} group by cla_isu 
    select cla_isu as cla_max,
    isnull(max(case when INV_TDO='E' AND TRA_TDO=0 and cop_nom='P' and cod_nom<>' ' then fec_mov else '19000101' end ),'19000101') AS fec_ent,
    isnull(max(case when INV_TDO='S' AND TRA_TDO=0 and cop_nom='C' and cod_nom<>' ' then fec_mov else '19000101' end ),'19000101') AS fec_vta,
    isnull(max(case when cop_nom='C' and INV_TDO='S' AND TRA_TDO=0 and cod_nom<>' ' then cla_esp else ' ' end),' ') AS esp_vta,
    isnull(max(case when cop_nom='P' and inv_tdo='E' AND TRA_TDO=0 and cod_nom<>' ' then cla_esp else ' ' end),' ') AS esp_ent
    into #maxim from  vcome3225 ${con_vis} and ${con_max}  group by cla_isu  
    SELECT cla_isu,dbo.F_CAL_EXI_GEN(CLA_ISU,0,'${fec_exi}',${alm_alm},NULL,NULL,NULL) as exi_ini, 
    isnull(CAN_ENT,0) can_ent,isnull(CAN_SAL,0) can_sal,isnull(ENT_ENT,0) ent_ent,isnull(SAL_SAL,0) sal_sal,isnull(ENT_TRA,0) ent_tra,
    isnull(SAL_TRA,0) sal_tra,isnull(esp_ent,' ') esp_ent,isnull(esp_vta,' ') esp_vta,
    isnull(fec_vta,'19000101') fec_vta,isnull(fec_ent,'19000101') fec_ent,
    des_isu,un1_isu,cst_isu,sku_isu,pim_pro,mon_pro,cin_pro,fe1_pro,fe2_pro,fe3_pro,pr1_pro,pr2_pro,
    pr3_pro,pu1_pro,pu2_pro,pu3_pro,mo1_pro,mo2_pro,mo3_pro,fes_pro,cli_pro,pus_pro,cmp_pro,fae_pro,tca_pro,fim_pro,
    gdc_pro,fuc_pro,prr_pro,fpr_pro,med_pro,des_fa1,des_fa2,des_fa3,${que_fam} as des_fam
    from vi_come3201  left join #ventas on CLA_ISU=cla_mov left join #maxim on CLA_ISU=cla_max 
    ${con_vis} ORDER BY ${ord_vis}  drop table #ventas  drop table #maxim  
    `
    console.log("sqlQuery =", ins_sql);
    //  return `select top 10 * from ${this.vis_rep}`;

    return ` ${ins_sql} `;

  }

}

