//////////////////////////////////////////////
// BaseClass : reportForm
// Class : ThisForm
// Description : Cálculo de fluctuación
// Author : MGSR
// Creation : 2025-06-12
// Update Date  : 2025-06-10
/////////////////////////////////////////////

///////////////////////////////////////
// Base class
///////////////////////////////////////

import { reportCXC } from "@/classes/Siavcom/reports/CXC/reportCXC";
import { tcb_act } from "./tcb_act";
import { tcb_ant } from "./tcb_ant";
import { per_act } from "./per_act";
export class ThisForm extends reportCXC {
  public tcb_act = new tcb_act()
  public tcb_ant = new tcb_ant()
  public per_act = new per_act()

  constructor() {
    super(0); // inicializa la clase base
    this.tab_ord = "man_comedoc";
    this.prop.Name = "come1211";
    this.prop.Caption = "Cálculo de fluctuación";
    this.prop.Status = "A";
    this.prop.Development = true;
    this.vis_rep = "vi_come1203"; // nombre de la vista sql a utilizar en el reporte
    this.for_imp.prop.Value = "jr_come1211"; // no incluir extencion jasper o jrxml
    this.tip_rep.prop.Visible = false; // Muestra general o detallado
    this.tip_rep.prop.Disabled = true
    this.des_fec.prop.Visible = false; //
    this.has_fec.prop.Visible = false;
    this.des_fec.prop.Disabled = true //
    this.has_fec.prop.Disabled = true;
    this.mon_rep.prop.Visible = true;
    this.cx_tdo_tdo.prop.Visible = true;
    this.cx_tcd_tcd.prop.Visible = true;
    this.cx_tcd_tcd.prop.Disabled = false;
    this.cx_tdo_tdo.prop.Disabled = false;
    this.cx_tdo_tdo.prop.TabIndex = 1;
    this.cx_tcd_tcd.prop.TabIndex = 2;
    this.mon_rep.prop.TabIndex = 3;
    this.per_act.prop.TabIndex = 4;
    this.tcb_ant.prop.TabIndex = 5;
    this.tcb_act.prop.TabIndex = 6;
    // definicion de bloques
    this.block[0].component = {
      [0]: this.cx_tdo_tdo,
      [1]: this.cx_tcd_tcd,
      [2]: this.per_act,
      [3]: this.tcb_ant,
      [4]: this.tcb_act
    }
    this.block[0].prop.Visible = true
    this.block[0].prop.Disabled = false
    this.block[0].title = 'Generales'

    this.block[1].prop.Visible = true
    this.block[1].prop.Disabled = false

  }

  public override async init() {
    await super.init();
    // Campos de orden de la vista
    var nom_par = 'clientes'
    this.prop.Caption = "Cálculo de fluctuación clientes ";
    this.Form.tit_rep = "Cálculo de fluctuación clientes "
    if (this.Form.Params[0].replaceAll("´", "").toLowerCase() == "p") {
      nom_par = 'proveedores'
      this.prop.Caption = "Cálculo de fluctuación proveedores ";
      this.Form.tit_rep = "Cálculo de fluctuación proveedores "
    }
    this.Form.fields = [
      ["ndo_doc", "Numero de documento ", "1", "99999999"],
      ["cod_nom", "codigo del " + nom_par, "''", "'ZZZZZZZZZZZ'"]

    ]
    this.Form.prop.cam_pri = 'ndo_doc' // campo de buqueda principal

    this.Form.var_ord.prop.Value = "ndo_doc";
  }

  ///////////////////////////////////////////////////////////////
  // En caso de tener que generar el query del select del report
  ///////////////////////////////////////////////////////////////

  public async sqlQuery(where: string, order: string) {
    let localWhere = "";
    //    let has_fec =await dateToSql(this.Form.has_fec.prop.Value); //dateToSql(this.Form.has_fec.Value)
    //    let des_fec =await dateToSql(this.Form.des_fec.prop.Value); //dateToSql(this.Form.has_fec.Value)
    var var_ord = this.var_ord.prop.Value;
    const mon_rep = this.mon_rep.prop.Value;
    const tcb_act_act = this.tcb_act.prop.Value;
    const tcb_ant = this.tcb_ant.prop.Value;
    const per_act = this.per_act.prop.Value;
    const cx_tdo_tdo = this.cx_tdo_tdo.prop.Value;
    const cx_tcd_tcd = this.cx_tcd_tcd.prop.Value;
    // asignamos condiciones de reportes que vienen en where
    this.Form.con_rep = where
    var par_prg = this.Form.Params[0].replaceAll("´", "").toLowerCase(),
      has_fec = per_act.replaceAll('/', '-') + '-28',
      des_fec = per_act.replaceAll('/', '-') + '-01',
      per_ant = addDay(des_fec, -1);
    per_ant = per_ant.slice(0, 7)
    per_ant = per_ant.replaceAll("-", "")
    console.log('per_ant=', per_ant)
    // armamos fecha final
    console.log('Fecha antes : ', has_fec)
    // fec_exi_q= await addDate(fec_exi_q,28, "D");
    var num_mes = has_fec.slice(5, 7),
      mes_act = num_mes,
      ji = 0
    console.log('num_mes: ', num_mes)

    while (num_mes == mes_act && ji < 4) {
      has_fec = addDay(has_fec, 1);
      console.log('fecha_in=', has_fec)
      num_mes = has_fec.slice(5, 7)
      ji = ji + 1
      console.log('num_mes=', num_mes)
      console.log('ji=', ji)
    }
    ji = ji + 26
    console.log('ji=', ji)

    has_fec = addDay(des_fec, ji);
    this.has_fec.prop.Value = has_fec
    this.des_fec.prop.Value = des_fec
    console.log('des_fec=', des_fec, 'has_fec=', has_fec)
    // fin de fecha final

    // armamos documentos si hay clasificacion
    var doc_imp = '', tit_rep1 = ' ', tip_doc = 'C';
    if (par_prg == 'p')
      tip_doc = 'A'
    if (cx_tdo_tdo.trim() != "??") {
      doc_imp = cx_tdo_tdo.replaceAll(",", "','")
      // obtenemos la descripcion de los documentos seleccionados   
      var i = 0, j = doc_imp.length, tdo_tdo = ' ', des_tdo = ','
      for (let i = 0; i < j; i += 6) {
        tdo_tdo = doc_imp.slice(i, i + 3)
        const data = await this.Sql.localAlaSql(` select des_tdo from now.loc_cometdo where tdo_tdo='${tdo_tdo}'  `)
        des_tdo = des_tdo + "," + data[0].des_tdo.trim()
      }
      doc_imp = '  ( fac.tdo_tdo in (' + "'" + doc_imp + "'" + ') '
      tit_rep1 = ' ' + des_tdo.replaceAll(",,", "")

    }
    else
      doc_imp = ` (fac.cop_nom='${par_prg}' and fac.coa_tdo='${tip_doc}' `
    if (cx_tcd_tcd.trim() != "??") {
      doc_imp = doc_imp + ' and fac.tcd_tcd in (' + "'" + cx_tcd_tcd.replaceAll(",", "','") + "'" + ') '
      const data = await this.Sql.localAlaSql(` select des_tcd from now.loc_cometcd where tdo_tdo='${this.in_tdo_tdo.prop.Value}' and tcd_tcd='${this.in_tcd_tcd.prop.Value}'  `)
      tit_rep1 = tit_rep1 + ' ' + data[0].des_tcd.trim()
    }

    if (doc_imp.length > 2)
      doc_imp = doc_imp + ')  '
    console.log('titulo', tit_rep1, 'this.form.tit_rep=', this.Form.tit_rep)
    var que_coac = " coa_tdo='C' ", que_coaa = " coa_tdo='A' ", con_imp = ' '
    if (par_prg == 'p') {
      que_coac = " coa_tdo='A' "
      que_coaa = " coa_tdo='C' "
    }
    var_ord = 'ndo_doc'
    this.Form.ord_vis = 'tdo_tdo,tcd_tcd,fec_doc ,ord_rep,fec_pag'
    if (var_ord == "ndo_doc") {
      if (cx_tdo_tdo.length > 5 || cx_tdo_tdo.trim() == '??') {
        this.Form.ord_vis = 'fec_doc,tdo_tdo,ndo_doc,ord_rep,fec_pag'
        var_ord = 'fec_doc'
        //      thisform.primero.value=thisform.des_fec.value
        //    thisform.ultimo.value=thisform.has_fec.value
      }
      else {
        this.Form.ord_vis = 'ndo_doc,tdo_tdo,fec_doc,ord_rep,fec_pag'
        var_ord = 'ndo_doc'
      }
    }
    this.Form.tit_rep = this.Form.tit_rep + ' ' + tit_rep1
    console.log('titulo', tit_rep1, 'this.form.tit_rep=', this.Form.tit_rep)
    var con_pgo = '', pag_tot = '', con_vis = ''
    if (where.length > 1)
      con_vis = where;
    console.log(con_vis)
    if (con_vis.length > 3) {
      con_vis = con_vis.replaceAll("  ", " ")
      var_ord = 'cod_nom'
      con_vis = con_vis.replaceAll(var_ord, "fac." + var_ord)
      var_ord = 'ndo_doc'
    }
    per_ant = per_ant.replaceAll("/", "")
    des_fec = des_fec.replaceAll("-", "")
    has_fec = has_fec.replaceAll("-", "")

    con_pgo = con_vis + ` and ${doc_imp} and doc.mon_doc=${mon_rep}
                   and (doc.FEC_DOC>='${des_fec}' and doc.fec_doc<='${has_fec}')    
`
    pag_tot = `ISNULL((select sum(mon_pag) from man_comepag p left outer join man_comedoc d on p.tdo_tdo=d.tdo_tdo and 
        p.ndo_doc=d.ndo_doc where tia_pag=fac.tdo_tdo and nua_pag=fac.ndo_doc and d.fec_doc<'${des_fec}'
          and d.mon_doc=${mon_rep}),0)
`
    con_vis = con_vis + ` and ${doc_imp} AND (fac.MON_DOC=${mon_rep}
           ) AND fac.FEC_DOC<='${has_fec}' and (imp_doc+im1_doc+im2_doc+im3_doc+im4_doc+im5_doc+im0_doc-${pag_tot}> .09 or 
                           ( tdo_fac is not  null ))     
 `
    this.Form.con_vis = ` (( ${doc_imp} (fec_doc>='${des_fec}' and fec_doc<='${has_fec}') or 
                fec_doc IS NULL)    
               and mon_doc=${mon_rep}) ${con_imp} `

    var ins_sql = ''
    ins_sql = ` if OBJECT_ID('tempdb..#pagos') is not null  drop table #pagos 
    select tia_pag as tdo_fac,nua_pag as num_fac,mon_pag,pag.tdo_tdo as tdo_pag,pag.ndo_doc as num_pag,doc.fec_doc as fec_pag,
    doc.mon_doc as mone_pag,doc.vmo_doc as vmo_pag,doc.ref_doc as ref_pag,doc.tcd_tcd as tcd_pag 
    into #pagos from man_comepag pag 
    join man_comedoc doc on pag.tdo_tdo=doc.tdo_tdo and pag.ndo_doc=doc.ndo_doc 
    join man_comedoc fac on tia_pag=fac.tdo_tdo and nua_pag=fac.ndo_doc where ${con_pgo}
    select fac.tdo_tdo as tdo_tdo,tfa.des_tdo as des_fac,ndo_doc,fac.cod_nom,nom.nom_nom,ref_doc,(imp_doc+im1_doc+im2_doc+im3_doc+im4_doc+im5_doc+im0_doc) as imp_fac,
    fac.fec_doc,isnull(fec_pag,'19000101') as fec_pag,tdo_pag,isnull(tpg.des_tdo,' ') as des_pag,num_pag,isnull(ref_pag,' ') as ref_pag,
    isnull(mon_pag,0) as mon_pag,isnull(vmo_pag,0) as vmo_pag,isnull(tcp.des_tcd,' ') as tcd_pgo,vmo_doc,
    ${pag_tot}+ ISNULL(mon_pag,0) as tot_pag,
    (cast(year(fac.fec_doc) as char(4))+right('0'+rtrim(cast(month(fac.fec_doc) as char(2))),2)) as per_fac 
     into #res00 from man_comedoc fac
     full outer join #pagos pag on fac.tdo_tdo=tdo_fac and fac.ndo_doc=num_fac
     left outer join man_comenom nom on fac.cop_nom=nom.cop_nom and fac.cod_nom=nom.cod_nom
     left outer join man_cometdo tfa on fac.tdo_tdo=tfa.tdo_tdo
     left outer join man_cometdo tpg on tdo_pag=tpg.tdo_tdo
     left outer join man_cometcd tcp on tdo_pag=tcp.tdo_tdo and tcd_pag=tcp.tcd_tcd 
     where ${con_vis} and fac.sta_doc<>'C' 
     select *,(case when mon_pag=0 then (imp_fac-tot_pag) else 0 end) as ult_rev,
      (case when per_fac<='${per_ant}' and mon_pag>0 then mon_pag 
            when per_fac<='${per_ant}' and mon_pag=0 then imp_fac-tot_pag else 0 end) as mon_rev,
        (case when mon_pag >0 and (imp_fac-tot_pag)> 0 then 2 else 1 end ) as cve_rep ,
        DATEADD(dd,-1,'${des_fec}') as des_fec_uno
       from #res00  order by tdo_tdo,ndo_doc,fec_doc 
        drop table #pagos  drop table #res00 
  `
    ins_sql = ins_sql.replaceAll('where and', 'where ')
    console.log(
      "sqlQuery =", ` ${ins_sql}  `

    );
    return `  ${ins_sql}  `;


  }

} // End ThisForm
