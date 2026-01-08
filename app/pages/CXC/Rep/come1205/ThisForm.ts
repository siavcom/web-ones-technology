//////////////////////////////////////////////
// BaseClass : reportForm
// Class : ThisForm
// Description : Estado de cuenta de clientes
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 2023-09-20
// Update Date  : 2023-09-29
/////////////////////////////////////////////

///////////////////////////////////////
// Base class
///////////////////////////////////////

import { reportCXC } from "@/classes/Siavcom/reports/CXC/reportCXC";
import { con_doc } from "./con_doc";
import { addDay } from "~/composables/Functions";

export class ThisForm extends reportCXC {
  public con_doc = new con_doc()
  constructor() {
    super(0); // inicializa la clase base
    this.tab_ord = "man_comenom";
    this.prop.Name = "come1205";
    this.prop.Caption = "Estado de cuenta";
    this.prop.Status = "A";
    this.prop.Development = true;
    this.vis_rep = "vi_come1201"; // nombre de la vista sql a utilizar en el reporte
    this.for_imp.prop.Value = "jr_come1205c"; // no incluir extencion jasper o jrxml
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
    this.con_doc.prop.TabIndex = 4;
    this.tip_rep.prop.TabIndex = 5;

    // definicion de bloques
    this.block[0].component = {
      [0]: this.des_fec,
      [1]: this.has_fec,
      [2]: this.con_doc
    }
    this.block[0].prop.Visible = true
    this.block[0].prop.Disabled = false
    this.block[0].title = 'Generales'


  }

  public override async init() {
    await super.init();

    this.var_ord.prop.Value = "cod_nom";
    if (this.Form.Params[0].replaceAll("´", "").toLowerCase() == "c")
      this.prop.Caption = "Estado de cuenta de clientes ";
    else
      this.prop.Caption = "Estado de cuenta de proveedores ";

  }

  ///////////////////////////////////////////////////////////////
  // En caso de tener que generar el query del select del report
  ///////////////////////////////////////////////////////////////

  public async sqlQuery(where: string, order: string) {
    let localWhere = "";
    const des_fec = dateToSql(this.Form.des_fec.prop.Value); //dateToSql(this.Form.des_fec.Value)
    const has_fec = dateToSql(this.Form.has_fec.prop.Value); //dateToSql(this.Form.has_fec.Value)
    let fec_sal = addDay(this.des_fec.prop.Value, -1)
    const tip_rep = this.tip_rep.prop.Value;
    const var_ord = this.var_ord.prop.Value;
    const mon_rep = this.mon_rep.prop.Value;
    const has_cod = this.Form.has_dat.prop.Value;
    const des_cod = this.Form.des_dat.prop.Value;
    const tip_con = this.Form.tip_con.prop.Value;
    var par_prg = this.Form.Params[0].replaceAll("´", "").toLowerCase()
    this.Form.for_imp.prop.Value = "jr_come1205" + par_prg
    if (this.Form.tip_rep.prop.Value == 1)         //Detallado
    {
      if (this.Form.con_doc.prop.Value == 1) {
        this.Form.for_imp.prop.Value = this.Form.for_imp.prop.Value + "_2"
        this.Form.vis_rep = 'vi_come1205_d'

      }
      else {
        this.Form.for_imp.prop.Value = this.Form.for_imp.prop.Value + "_d"
        this.Form.vis_rep = 'vi_come1205'
      }
    }
    else {
      this.Form.for_imp.prop.Value = this.Form.for_imp.prop.Value + "_g"
      this.Form.vis_rep = 'vi_come1205'
      this.con_doc.prop.Value = '0'

    }
    var con_doc = this.con_doc.prop.Value;
    // armamos titulo    
    if (par_prg == "C")
      this.Form.tit_rep = "Estado de cuenta de clientes "
    else
      this.Form.tit_rep = "Estado de cuenta de proveedores "
    this.Form.con_rep = where
    localWhere = localWhere + where;
    console.log(localWhere)
    // arma queryIIF(thisform.ord_rep.value=1,"this.Form.des_dat.prop.Value;
    var var_ordp = 'comenom.cod_nom', ord_rep = 1
    var var_pag = ' '
    if (con_doc == 1)
      var_pag = ',ven_doc,tcd_pag,tdo_pag,mon_pag,ndo_pag,fec_pag,ref_pag,des_pag,fec_sal,mon_sal '

    if (var_ord == 'nom_nom') {
      ord_rep = 2
      var_ordp = 'comenom.nom_nom,comenom.cod_nom'
    }
    if (where.length > 2)
      where = ' and ' + where.replaceAll('cod_nom', 'comenom.cod_nom').replaceAll('nom_nom', 'comenom.nom_nom')
    fec_sal = fec_sal.replaceAll('-', '')
    var con_vis = ` ${where} `,
      con_vis2 = ` where FEC_DOC<='${has_fec}' and FEC_DOC>='${has_fec}' and 
       MON_DOC=${mon_rep} `

    var ins_sql = ` if OBJECT_ID('tempdb..#saldo') is not null  drop table #saldo
    create table #saldo (key_pri int,tot_sal numeric(18,6))
	 exec P_cal_sal_nom '${par_prg}','${des_cod}','${has_cod}',${mon_rep},
	'${fec_sal}','${ord_rep}'
  SELECT comenom.*,ISNULL(#saldo.tot_sal,0) sdo_nom,${this.Form.vis_rep}.*
	 from  vi_come1201_g comenom left join  #saldo on #saldo.key_pri=comenom.key_pri 
	 left outer join ${this.Form.vis_rep}
	 ON comenom.KEY_PRI=${this.Form.vis_rep}.KEY_PRI ${con_vis2} ${con_vis}
	ORDER BY ${var_ordp},fec_doc,coa_tdo,tdo_tdo,ndo_doc `
    if (con_doc == 1)
      ins_sql = `,${this.Form.vis_rep}.fec_pag `
    ins_sql = ins_sql + `  DROP TABLE #saldo `

    localWhere = localWhere.replaceAll("'", '"')
    console.log(
      "sqlQuery =", ins_sql)
      ;
    return ` EXEC p_come1205 '${par_prg}', '${des_fec}','${has_fec}',${mon_rep},${tip_rep},${con_doc},'${localWhere} ','${var_ord}','${des_cod}','${has_cod}','${tip_con}'  `;


  }

} // End ThisForm
