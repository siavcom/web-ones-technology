//////////////////////////////////////////////
// @baseClass  : reportForm
// @class : Teams
// Description : Reporte de existencias
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 2023-03-17
// Update Date  : 
/////////////////////////////////////////////

///////////////////////////////////////
// Base class 
///////////////////////////////////////

import { reportInv } from '@/classes/Siavcom/reports/INV/reportInv'
import { addDate } from '~/composables/Functions'
export class ThisForm extends reportInv {

  constructor() {
    super(1)  // inicializa la clase base
    this.tab_ord = 'man_comeisu'
    this.prop.Name = 'come3203'
    this.prop.Caption = "Existencias"
    this.prop.Status = 'A'
    this.prop.Development = true
    this.vis_rep = 'vi_come3203'   // nombre de la vista sql a utilizar en el reporte
    this.for_imp.prop.Value = 'jr_come3203'   // no incluir extencion jasper o jrxml
    this.tip_rep.prop.Visible = true    // Muestra general odetallado
    this.tip_rep.prop.Disabled = false
    this.mon_rep.prop.Visible = false
    this.mon_rep.prop.Disabled = true
    this.alm_rep.prop.MultiSelect = true
    //this.dataView:string ='vcomepge'    // Vista de datos generales
    //this.sqlQuery=' `select des_tdo from cometdo where tdo_tdo=${this.Form.tdo_tdo.Value}` '             // Query a ejecutar antes de la vista del reporte
    // deshabilitamos los elementos que no necesitamos de la clase
    this.op_des_isu.prop.Visible = false
    this.op_has_isu.prop.Visible = false
    this.op_des_isu.prop.Disabled = true
    this.op_has_isu.prop.Disabled = true
    // ordenamos los elementos
    this.des_fec.prop.TabIndex = 1;
    this.has_fec.prop.TabIndex = 2;
    this.alm_rep.prop.TabIndex = 3;
    this.tip_imp.prop.TabIndex = 4;
    // definicion de bloques
    this.block[0].component = {
      [0]: this.alm_rep,
      [1]: this.des_fec,
      [2]: this.has_fec,
      [3]: this.tip_imp
    }
    this.block[0].prop.Visible = true
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


  }


  ///////////////////////////////////////////////////////////////
  // En caso de tener que generar el query del select del report
  ///////////////////////////////////////////////////////////////

  public async sqlQuery(where: string, order: string) {
    let localWhere = "";
    const des_fec = await dateToSql(this.des_fec.prop.Value); //dateToSql(this.Form.des_fec.Value)
    const has_fec = await dateToSql(this.has_fec.prop.Value); //dateToSql(this.Form.has_fec.Value)
    const tip_rep = this.tip_rep.prop.Value;
    const tip_imp = this.Form.tip_imp.prop.Value;
    const ini_isu = this.Form.des_dat.prop.Value;
    const fin_isu = this.Form.has_dat.prop.Value;
    var alm_rep = this.Form.alm_rep.prop.Value;
    const var_ord = this.var_ord.prop.Value;
    const ima_pge = this.Form.mPublic.ima_pge;
    const sep_fam = this.sep_fam.prop.Value;
    const op_des_fam = this.op_des_fam.prop.Value;
    const op_has_fam = this.op_has_fam.prop.Value;
    const num_fam = this.num_fam.prop.Value;
    this.Form.con_rep = where
    var pri_cla = 1, tit_rep = '',
      pos_tom = 30,
      var_fam = ' ',
      ord_vis = `${var_ord}`,
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
      ord_vis = `${var_fam},${var_ord}`
    }
    // armamos almacen
    var alm_sql = ''
    if (alm_rep.trim() != '??') {
      alm_sql = alm_rep.replaceAll(",", "','")
      alm_rep = "'" + alm_rep + "'"
      // generamos titulo del reporte
      // obtenemos la descripcion de los documentos seleccionados  
      var des_tda = ',', i = 0, j = alm_sql.length, alm_tda = ' '
      for (let i = 0; i < j; i += 6) {
        alm_tda = alm_sql.slice(i, i + 3)
        const data = await this.Sql.localAlaSql(` select des_tda from now.loc_cometda where alm_tda='${alm_tda}'  `)
        des_tda = des_tda + "," + data[0].des_tda.trim()
      }
      alm_sql = ' and ( alm_tda in (' + "'" + alm_sql + "'" + ')) '
      tit_rep = tit_rep + ' ' + des_tda.replaceAll(",,", "")

    }
    else {
      tit_rep = tit_rep + ' todos '
      alm_rep = 'NULL';
      alm_sql = ' and ave_tda=1 '
    }
    this.Form.tit_rep = tit_rep
    this.Form.con_rep = where

    let fec_exi = addDay(this.des_fec.prop.Value, -1)
    fec_exi = fec_exi.replaceAll('-', '')
    var con_fec = `  and (FEC_MOV>='${des_fec}' AND FEC_MOV<='${has_fec}' ) `,
      con_vis = ' where ', con_sql = '';

    con_vis = con_vis + " tin_tti='P' and (inv_tdo='E' or inv_tdo='S') "

    if (localWhere.length > 1)
      con_vis = con_vis + ` and ${localWhere} `
    if (where.length > 1)
      con_vis = con_vis + ' and ' + where
    if (tip_rep == 1)
      ord_vis = ord_vis + ',des_tda'

    localWhere = localWhere.replaceAll("'", '"')

    console.log('tit_rep=', this.Form.tit_rep)
    var ins_sql = ` if OBJECT_ID('tempdb..#movtos') is not null  drop table #movtos 
   			if OBJECT_ID('tempdb..#proalm0') is not null  drop table #proalm0 
   			if OBJECT_ID('tempdb..#exist') is not null  drop table #exist 
   			if OBJECT_ID('tempdb..#resultado') is not null  drop table #resultado
   			if OBJECT_ID('tempdb..#proalm') is not null drop table #proalm 
        select cla_isu as cla_exi,alm_tda,max(des_tda) as des_tda,isnull(sum(case when inv_tdo='e' then can_mov else 0 end ),0) as can_ent,  
         isnull(sum(case when inv_tdo='s' then can_mov else 0 end ),0) as can_sal  
         into `
    if (tip_imp == 3)
      ins_sql = ins_sql + `#proalm0 `
    else ins_sql = ins_sql + `#movtos `
    ins_sql = ins_sql + `from vi_come3203 ${con_vis} ${con_fec} ${alm_sql} group by cla_isu,alm_tda `
    if (tip_imp != 3)
      ins_sql = ins_sql + ` union 
          select distinct cla_isu,alm_tda,des_tda,0,0 
     	    from vi_come3203 ${con_vis} and fec_mov<='${has_fec}' ${alm_sql}
		    select cla_exi,alm_tda,max(des_tda) des_tda,sum(can_ent) can_ent,sum(can_sal) can_sal 
            into #proalm0 from #movtos group by cla_exi,alm_tda  `

    ins_sql = ins_sql + `
         select *,dbo.f_cal_exi_gen(cla_exi,0,'${fec_exi}',alm_tda,null,null,null) as exi_ini into #proalm from #proalm0 
         select *,${que_fam} des_fam into #resultado from `
    if (tip_rep == 0 && tip_imp == 5)
      ins_sql = ins_sql + `vi_come3201 left join #proalm on cla_exi=cla_isu ${con_vis}.replaceAll("and (inv_tdo='E' or inv_tdo='S')","") `
    else
      ins_sql = ins_sql + `#proalm join vi_come3201 on cla_exi=cla_isu `
    ins_sql = ins_sql + ` select cla_isu cla_cla,sum(isnull(exi_ini,0)+isnull(can_ent,0)-isnull(can_sal,0)) exi_cla into #exist 
		 from #resultado group by cla_isu 
         select * from #resultado join #exist on cla_cla=cla_isu `
    console.log('tip_imp=', tip_imp)
    if (tip_imp == 1)
      ins_sql = ins_sql + `  where exi_cla <>0 `
    if (tip_imp == 2)
      ins_sql = ins_sql + `  where exi_cla <=0 `
    if (tip_imp == 4)
      ins_sql = ins_sql + `  where exi_cla <0 `

    ins_sql = ins_sql + ` order by ${ord_vis}
 		 drop table #resultado; drop table #proalm0; drop table #proalm; drop table #exist; `
    if (tip_imp != 3)
      ins_sql = ins_sql + ` drop table #movtos `
    this.Form.for_imp.prop.Value = "jr_come3203";
    console.log("ins_sql", ins_sql,
      "sqlQuery =",
      ` EXEC p_come3203 '${des_fec}','${has_fec}','${ini_isu}','${fin_isu}','${alm_rep}','${localWhere} ',${tip_rep},${tip_imp},'${var_ord}',${num_fam}  `

    );
    return ` ${ins_sql}  `;
    //return ` select top 10 * from vi_come3203 `
    //return ` EXEC p_come3203 '${des_fec}','${has_fec}','${ini_isu}','${fin_isu}','${alm_rep}','${localWhere} ',${tip_rep},${tip_imp},'${var_ord}',${num_fam} `;


  }

} // End ThisForm

