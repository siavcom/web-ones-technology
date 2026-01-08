//////////////////////////////////////////////
// BaseClass : reportForm
// Class : thisForm
// Description : Análisis de insumos
// Author : El Fer Blocks (2025/03/07)
// Update Date  : 
/////////////////////////////////////////////

///////////////////////////////////////
// Base class 
///////////////////////////////////////

import { reportInv } from '@/classes/Siavcom/reports/INV/reportInv'
import { tip_doc } from './tip_doc'
import { in_tdo_tdo } from '~/classes/Siavcom/reports/INV/in_tdo_tdo'
import { in_tcd_tcd } from '~/classes/Siavcom/reports/INV/in_tcd_tcd'
import { tip_for } from './tip_for'
import { for_cal } from './for_cal'
import { tip_cos } from './tip_cos'
import { tip_ana } from './tip_ana'

export class ThisForm extends reportInv {
  public tip_doc = new tip_doc()
  public in_tdo_tdo = new in_tdo_tdo()
  public in_tcd_tcd = new in_tcd_tcd()
  public tip_for = new tip_for()
  public for_cal = new for_cal()
  public tip_ana = new tip_ana()
  public tip_cos = new tip_cos()
  constructor() {
    super(0)  // inicializa la clase base
    this.tab_ord = 'vi_come3220'
    this.prop.Name = 'come3220'
    this.prop.Caption = "Análisis de insumos"
    this.prop.Status = 'A'
    this.prop.Development = true
    this.vis_rep = 'vi_come3220'   // nombre de la vista sql a utilizar en el reporte
    this.for_imp.prop.Value = 'jr_come3220'   // no incluir extencion jasper o jrxml

    // deshabilitamos elementos que no se usan en este reporte
    this.mon_rep.prop.Visible = false
    this.mon_rep.prop.Disabled = true
    this.alm_rep.prop.Visible = false;
    this.alm_rep.prop.Disabled = true;
    this.op_des_isu.prop.Visible = false;
    this.op_des_isu.prop.Disabled = true;
    this.op_has_isu.prop.Visible = false;
    this.op_has_isu.prop.Disabled = true;
    this.sep_fam.prop.Visible = false;
    this.sep_fam.prop.Disabled = true;
    // deshabilitamos elementos que seran habilitados dependiendo de selecciones
    this.tip_cos.prop.Visible = false;
    this.tip_cos.prop.Disabled = true;
    this.tip_for.prop.Visible = false;
    this.tip_for.prop.Disabled = true;
    this.tip_ana.prop.Visible = false;
    this.tip_ana.prop.Disabled = true;
    this.for_cal.prop.Visible = false;
    this.for_cal.prop.Disabled = true;
    // habilitamos elementos de este reporte
    this.tip_rep.prop.Visible = true   // Muestra general odetallado
    this.tip_rep.prop.Disabled = false
    this.in_tdo_tdo.prop.Visible = true;
    this.in_tdo_tdo.prop.Disabled = false;
    this.tip_doc.prop.Visible = true;
    this.tip_doc.prop.Disabled = false;
    this.in_tdo_tdo.prop.MultiSelect = true;
    this.tip_imp.prop.Visible = true;
    this.tip_imp.prop.Disabled = false;

    // damos orden a los elementos que se muestran
    this.tip_doc.prop.TabIndex = 1;
    this.in_tdo_tdo.prop.TabIndex = 2;
    this.des_fec.prop.TabIndex = 3;
    this.has_fec.prop.TabIndex = 4;
    this.tip_rep.prop.TabIndex = 5;
    this.tip_imp.prop.TabIndex = 6;
    this.tip_cos.prop.TabIndex = 7;
    this.tip_for.prop.TabIndex = 8;
    this.for_cal.prop.TabIndex = 9;
    this.tip_ana.prop.TabIndex = 10;
    // definicion de bloques
    this.block[0].component = {
      [0]: this.tip_doc,
      [1]: this.in_tdo_tdo,
      [2]: this.des_fec,
      [3]: this.has_fec,
      [4]: this.tip_imp,
      [5]: this.tip_cos,
      [6]: this.tip_for,
      [7]: this.for_cal,
      [8]: this.tip_ana

    }
    this.block[0].prop.Visible = true
    this.block[0].prop.Disabled = false
    this.block[0].title = 'Generales'

    this.prop.cam_pri = 'cod_nom' // campo de buqueda principal
    // definimos campos para seleccionar orden dentro del reporte
    this.fields = [
      ['cod_nom', 'Código ', "", "99999999"],
      ['nom_nom', 'Nombre ', "", "ZZZZZZZZZZZZZ"]
    ]
    this.var_ord.prop.Value = "cod_nom";    // campo de orden de default
    this.ord_vis = ""  // campos de orden de la vista
  }


  ///////////////////////////////////////////////////////////////
  // En caso de tener que generar el query del select del report
  ///////////////////////////////////////////////////////////////

  public async sqlQuery(where: string, order: string) {
    let localWhere = "";
    const des_fec = await dateToSql(this.Form.des_fec.prop.Value); //dateToSql(this.Form.des_fec.Value)
    const has_fec = await dateToSql(this.Form.has_fec.prop.Value); //dateToSql(this.Form.has_fec.Value)
    const tip_imp = this.tip_imp.prop.Value;
    const tip_rep = this.tip_rep.prop.Value;
    const var_ord = this.var_ord.prop.Value;
    const tip_cos = this.tip_cos.prop.Value;
    const tip_ana = this.tip_ana.prop.Value;
    const tip_for = this.tip_for.prop.Value;
    const ima_pge = this.Form.mPublic.ima_pge;
    var op_tdo_tdo = this.in_tdo_tdo.prop.Value;
    var tip_doc = 'S'
    if (this.tip_doc.prop.Value == 1)
      tip_doc = 'E'
    this.Form.con_rep = where
    this.vis_rep = 'vi_come3220'
    if (tip_rep == 0)
      this.Form.for_imp.prop.Value = 'jr_come3220_g'
    else
      this.Form.for_imp.prop.Value = 'jr_come3220_d'
    // como es multiseleccion el documento, remplazamos, lo preparamos para instruccion in
    if (this.in_tdo_tdo.prop.Value.trim() != "??") {
      op_tdo_tdo = op_tdo_tdo.replaceAll(",", "','")
      localWhere = ` tdo_tdo in ('${op_tdo_tdo}') AND `
    }
    // obtenemos la descripcion de los documentos seleccionados   
    var i = 0, j = op_tdo_tdo.length, tdo_tdo = ' ', des_tdo = ',', dato = ' ', ins_loc = ''
    console.log('long_op_tdo=', j, 'op_tdo_tdo=', op_tdo_tdo)
    for (let i = 0; i < j; i += 6) {
      tdo_tdo = op_tdo_tdo.slice(i, i + 3)
      console.log('tdo_tdo=', tdo_tdo, 'i=', i, 'j=', j, 'ins_loc=', ins_loc)
      const data = await this.Sql.localAlaSql(` select des_tdo from now.loc_cometdo where tdo_tdo='${tdo_tdo}' `)
      console.log('dato=', data[0].des_tdo)
      des_tdo = des_tdo + "," + data[0].des_tdo.trim()

    }
    console.log('long_op_tdo=', j, 'des_tdo=', des_tdo)
    // generamos condiciones del programa 
    localWhere =
      localWhere + ` (fec_doc>='${des_fec}' and fec_doc<='${has_fec}') and ` + where;
    var con_vis = ' where ' + localWhere
    var for_cal = "", cos_for = "", tit_rep1 = "", var_cos = "", var_pco = "", col_ord = ""
    // se arma variables de calculo en caso de utilizar formula
    if (tip_cos == 5 && tip_for != 'OT') {
      for_cal = this.tip_for.prop.Value
      var i = 0, j = 0
      for_cal == this.for_cal.prop.Value

      cos_for = "(" + this.for_cal.prop.Value.trim() + ")"		// Costo por formula
    }
    tit_rep1 = ' unidades'
    if (tip_imp == 2) {	//   SI EL REPORTE DE CON IMPORTES
      this.Form.for_imp.prop.Value = this.Form.for_imp.prop.Value + '_i'
      tit_rep1 = ' '
      var_cos = "0"
      var_pco = "0"
      col_ord = "cos_tot"						// Si se trata de movimientos de entradas al almacen el analisis se hace sobre el total del costo             

      if (tip_doc == "S") {			// si tipo de movimientos son salidas se procedea geenerar codigo para tipo de analisis
        this.Form.for_imp.prop.Value = this.Form.for_imp.prop.Value + 's';
        switch (tip_ana) {
          case 1:	//& tipo de analisis sobre ganancia
            col_ord = "gan_tot";
            break;
          case 2:	// tipo de analisis sobre costo
            col_ord = "cos_tot";
            break;
          case 3:	// tipo de analisis sobre ventas
            col_ord = "vta_tot";
            break;
        }
      }
      switch (tip_cos) {
        case 1: {				// gneera variables par calculo de costo promedio
          if (tip_doc == "E")
            var_cos = "(cos_cap/can_mov)"
          else
            var_cos = "(case when sca_pro=0 then cos_cap/can_mov else 0 end)"

          var_pco = var_cos;
          tit_rep1 = 'Calculado en base al costo promedio'
          break;
        }
        case 2: {		// gneera variables par calculo de costo standar
          var_pco = "cst_isu"
          var_cos = var_pco
          tit_rep1 = 'Calculado en base al costo estandar'
          break;
        }
        case 3: {					// gneera variables par calculo de costo contable
          if (tip_doc == "E")
            var_cos = "(cos_cap/can_mov)"
          else
            var_cos = "(case when sca_pro=0 then cos_cap/can_mov else 0 end)"
          var_pco = var_cos;
          tit_rep1 = 'Calculado en base al costo contable'
          break;
        }
        case 4: {					// gneera variables par calculo de costo reposicion
          var_cos = "prr_pro"
          var_pco = "prr_pro"
          tit_rep1 = 'Calculado en base al costo de reposición'
          break;
        }
        case 5: {					//genera variables par calculo de costo x formula
          var_pco = cos_for
          var_cos = var_pco
          tit_rep1 = 'Calculado con formula: ' + cos_for
          break;
        }
      }
    }
    else							// REPORTE SOLO EN UNIDADES
      this.Form.for_imp.prop.Value = this.Form.for_imp.prop.Value + '_u'
    // armamos titulo
    this.Form.tit_rep = tit_rep1 + ' Documentos: ' + des_tdo.replaceAll(",,", "")
    var ins_sql = ' '
    if (tip_rep == 0) {          // Genera codigo sql para reporte General
      switch (tip_imp) {
        case 1:	// Cuando el reporte es por unidades y general
          ins_sql = ` select cla_isu,MAX(des_isu) as des_isu,
      SUM(can_mov) as can_mov 
      FROM  ${this.vis_rep}  ${con_vis}  group by cla_isu UNION 
      select 'total','total',SUM(can_mov) from  ${this.vis_rep}  ${con_vis} 
       order by can_mov desc,cla_isu `
          break;
        case 2: {// Genera codigo sql reporte unidades con importes general
          ins_sql = ` SELECT cla_isu,MAX(des_isu) as des_isu,MAX(fpr_pro) as fpr_pro,
        SUM(can_mov) as can_mov,SUM(can_mov* ${var_cos} ) as cos_tot,MAX( ${var_pco} ) as pre_cos,MAX(sca_pro) as sca_pro,
          sum(pve_mov) as vta_tot,SUM(pve_mov -(can_mov* ${var_cos} )) as gan_tot,MAX(mon_isu) as mon_isu 
      FROM  ${this.vis_rep} ${con_vis}  group by cla_isu union 
       SELECT 'Total','total','01/01/1900',SUM(can_mov),SUM(can_mov* ${var_cos} ),0,0,
       sum(pve_mov),SUM(pve_mov -(can_mov* ${var_cos} )),0 
      FROM  ${this.vis_rep}  ${con_vis} 
       order by  ${col_ord}  desc,cla_isu `
          console.log("con_vis=", con_vis, "var_cos=", var_cos, "col_ord=", col_ord, "var_pco=", var_pco)
          break;
        }
      }
    }
    else {                           // Genera codigo sql para reporte Detallado
      switch (tip_imp) {
        case 1:	//Cuando el reporte es por unidades y detallado
          ins_sql = `SELECT tdo_tdo,tcd_tcd,MAX(des_isu) as des_isu,MAX(des_tdo) as des_tdo,MAX(des_tcd)as des_tcd,cla_isu,
     SUM(can_mov) as can_mov 
     FROM  ${this.vis_rep}   ${con_vis}  group by tdo_tdo,tcd_tcd,cla_isu union
     SELECT tdo_tdo,tcd_tcd,' ',MAX('total'),MAX(des_tcd),' ',
     SUM(can_mov) 
     FROM  ${this.vis_rep}   ${con_vis}  group by tdo_tdo,tcd_tcd union 
     SELECT tdo_tdo,' ',' ',MAX(des_tdo),' ',' ',
     SUM(can_mov) 
     FROM  ${this.vis_rep}   ${con_vis}  group by tdo_tdo union 
     SELECT ' ',' ',' ',' ',' ',' ',
     SUM(can_mov) 
     FROM  ${this.vis_rep}   ${con_vis} order by tdo_tdo,tcd_tcd,can_mov desc,cla_isu `
          break;
        case 2:	// Cuando el reporte es unidades con importe detallado
          ins_sql = ` SELECT tdo_tdo,tcd_tcd,MAX(des_isu) as des_isu,MAX(des_tdo) as des_tdo,MAX(des_tcd)as des_tcd,cla_isu,
     SUM(can_mov) as can_mov,SUM(can_mov* ${var_cos} ) as cos_tot,MAX( ${var_pco} ) as pre_cos,MAX(sca_pro) as sca_pro, 
     sum(pve_mov) as vta_tot,SUM(pve_mov -(can_mov* ${var_cos} )) as gan_tot,MAX(mon_isu) as mon_isu,MAX(fpr_pro) as fpr_pro 
     FROM  ${this.vis_rep}  ${con_vis}  group by tdo_tdo,tcd_tcd,cla_isu union 
      SELECT tdo_tdo,tcd_tcd,max(des_tdo),MAX('total'),MAX(des_tcd),' ',
     SUM(can_mov),SUM(can_mov* ${var_cos} ),0,0,sum(pve_mov),SUM(pve_mov -(can_mov* ${var_cos} )),0,'01/01/1900' 
     FROM  ${this.vis_rep}   ${con_vis} 
      group by tdo_tdo,tcd_tcd union 
      SELECT tdo_tdo,' ',' ',MAX(des_tdo),' ',' ',
     SUM(can_mov),SUM(can_mov* ${var_cos} ),0,0,sum(pve_mov),SUM(pve_mov -(can_mov* ${var_cos} )),0,'01/01/1900' 
     FROM  ${this.vis_rep}   ${con_vis} 
      group by tdo_tdo union 
      SELECT ' ',' ',' ',' ',' ',' ',
     SUM(can_mov),SUM(can_mov* ${var_cos} ),0,0,sum(pve_mov),SUM(pve_mov -(can_mov* ${var_cos} )),0,'01/01/1900' 
     FROM  ${this.vis_rep}  ${con_vis} 
     order by tdo_tdo,tcd_tcd, ${col_ord}  desc,cla_isu `
          break;
      }
    }
    // localWhere = localWhere.replaceAll('", '"')
    console.log(
      "sqlQuery =", `${ins_sql} `
    );
    return `${ins_sql} `;



  }

} // End ThisForm

