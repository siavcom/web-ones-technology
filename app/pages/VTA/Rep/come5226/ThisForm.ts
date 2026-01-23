//////////////////////////////////////////////
// @baseClass  : reportForm
// @class : thisForm
// Description : POS 3M Reporte especial de shel
// @author: MGSR
// Creation : 2025-08-12
// Update Date  : 
/////////////////////////////////////////////

///////////////////////////////////////
// Base class
///////////////////////////////////////

import { reportVtas } from "@/classes/Siavcom/reports/VTAS/reportVtas";
import { tip_det } from "./tip_det";
import { ord_isu } from "./ord_isu";
export class ThisForm extends reportVtas {
  public tip_det = new tip_det()
  public ord_isu = new ord_isu()
  constructor() {
    super(2); // inicializa la clase base
    this.tab_ord = "vi_come5226";
    this.prop.Name = "come5226";
    this.prop.Caption = "POS 3M";
    this.prop.Status = "A";
    this.prop.Development = true;
    this.vis_rep = "vi_come5226"; // nombre de la vista sql a utilizar en el reporte
    this.for_imp.prop.Value = "jr_come5226"; // no incluir extencion jasper o jrxml
    this.tip_rep.prop.Visible = false; // Muestra general o detallado
    this.tip_rep.prop.Disabled = true;
    this.op_tcd_tcd.prop.Visible = false
    this.op_tcd_tcd.prop.Disabled = true
    this.mon_rep.prop.Visible = true
    this.mon_rep.prop.Disabled = false
    this.alm_rep.prop.Visible = false
    this.alm_rep.prop.Disabled = true
    this.tip_imp.prop.Visible = false;
    this.tip_imp.prop.Disabled = true;
    this.op_tdo_tdo.prop.MultiSelect = false;
    this.sep_fam.prop.Visible = true
    this.sep_fam.prop.Disabled = false
    this.ord_isu.prop.Visible = false
    this.ord_isu.prop.Disabled = true
    this.op_tdo_tdo.prop.TabIndex = 1
    this.op_tcd_tcd.prop.TabIndex = 2
    this.mon_rep.prop.TabIndex = 3
    this.des_fec.prop.TabIndex = 4
    this.has_fec.prop.TabIndex = 5
    this.tip_det.prop.TabIndex = 6
    this.ord_isu.prop.TabIndex = 7
    this.sep_fam.prop.TabIndex = 9
    // definicion de bloques
    this.block[2].component = {
      [0]: this.op_tdo_tdo,
      [1]: this.op_tcd_tcd,
      [2]: this.mon_rep,
      [3]: this.des_fec,
      [4]: this.has_fec,
      [5]: this.tip_det,
      [6]: this.ord_isu

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

    //    this.block[4].prop.Visible = false
    //    this.block[4].prop.Disabled = true

    //this.dataView:string ='vcomepge'    // Vista de datos generales
    //this.sqlQuery=' `select des_tdo from cometdo where tdo_tdo=${this.Form.tdo_tdo.Value}` '             // Query a ejecutar antes de la vista del reporte
    this.prop.cam_pri = 'ndo_doc' // campo de buqueda principal

    const m = this.Form.mPublic;
    const des_mon = [
      "Todas",
      m.pr1_pge,
      m.pr2_pge,
      m.pr3_pge,
      m.pr4_pge,
      m.pr5_pge,
    ];
    const num_mon = [0,
      1, 2, 3, 4, 5];
    this.Form.mon_rep.prop.RowSource = [des_mon, num_mon];
    this.Form.mon_rep.prop.Value = 0;
    this.ord_isu.prop.Value = 2;
  }

  public override async init() {
    await super.init();
    // Campos de orden de la vista
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

  public async sqlQuery(where: string, order: string) {
    const tip_det = this.tip_det.prop.Value
    const ord_isu = this.ord_isu.prop.Value
    const mon_rep = this.mon_rep.prop.Value
    const op_tdo_tdo = this.op_tdo_tdo.prop.Value
    const op_tcd_tcd = this.op_tcd_tcd.prop.Value
    const var_ord = this.var_ord.prop.Value
    const des_fec = await dateToSql(this.Form.des_fec.prop.Value); //dateToSql(this.Form.des_fec.Value)
    const has_fec = await dateToSql(this.Form.has_fec.prop.Value); //dateToSql(this.Form.has_fec.Value)

    // armamos documentos si hay clasificacion
    var doc_imp = '', tit_rep = ''
    if (op_tdo_tdo.trim() != "??") {
      doc_imp = op_tdo_tdo.replaceAll(",", "','")
      // obtenemos la descripcion de los documentos seleccionados   
      var i = 0, j = doc_imp.length, tdo_tdo = ' ', des_tdo = ','
      for (let i = 0; i < j; i += 6) {
        tdo_tdo = doc_imp.slice(i, i + 3)
        const data = await this.Sql.localAlaSql(` select des_tdo from now.loc_cometdo where tdo_tdo='${tdo_tdo}'  `)
        des_tdo = des_tdo + "," + data[0].des_tdo.trim()
      }
      doc_imp = ' tdo_tdo in (' + "'" + doc_imp + "'" + ') '
      tit_rep = tit_rep + 'Documentos: ' + des_tdo.replaceAll(",,", "")

    }
    if (op_tcd_tcd.trim() != "??") {
      doc_imp = '( ' + doc_imp + ' and tcd_tcd in (' + "'" + op_tcd_tcd.replaceAll(",", "','") + "'" + ') ) '
      const data = await this.Sql.localAlaSql(` select des_tcd from now.loc_cometcd where tdo_tdo='${this.op_tdo_tdo.prop.Value}' and tcd_tcd='${this.op_tcd_tcd.prop.Value}'  `)
      tit_rep = tit_rep + ' ' + data[0].des_tcd.trim()
    }

    tit_rep = tit_rep + " del " + des_fec + " al " + has_fec

    this.Form.con_rep = where
    // si hay condiciones de reporte  
    if (where.length > 0)
      where = ' AND ' + where
    // armamos condiciones de la vista
    var con_vis = ` ${doc_imp}  `
    if (mon_rep > 0)
      con_vis = con_vis + ` and mon_doc=${mon_rep} `

    con_vis = ' where ' + con_vis +
      ` and (fec_doc>='${des_fec}' AND fec_doc<='${has_fec}')  ${where}  `
    // definimos orden
    if (var_ord == 'ndo_doc')
      order = ' ndo_doc,fec_doc'
    if (var_ord == 'cod_nom')
      order = ' cod_nom,fec_doc,ndo_doc'
    if (var_ord == 'fec_doc')
      order = ' fec_doc,ndo_doc'
    if (var_ord == 'fel_doc')
      order = ' fel_doc,ndo_doc'
    if (var_ord == 'fve_doc')
      order = ' fve_doc,ndo_doc'
    if (tip_det == 2) {
      this.for_imp.prop.Value = 'jr_come5226_d_a'
      if (ord_isu == 1)
        order = order + ',mov_mov'
      else
        order = order + ',cla_isu'
    }
    // armmos query    
    var ins_sql = ` select cod_nom,tdo_tdo,ndo_doc,cla_isu,ser_mov,nom_nom,fec_doc,mon_com,can_mov,
    pve_mov,pve_com,dse_mov,des_isu,ped_ped,vmo_doc,als_doc,dsa_tda,ale_doc,den_tda,des_tdo,des_tcd,
    con_con,noc_con,vmo_com,mon_doc,uni_mov,ser_tdo,rfc_nom,dir_nom,ext_nom,int_nom,col_nom,edo_edo,
    pob_nom,cpo_nom,tpv_com,de1_mov,de2_mov,de3_mov,de4_mov,de5_mov,ii0_mov,ii1_mov,ii2_mov,ii3_mov,
    ii4_mov,ii5_mov,imp_doc,im0_doc,im1_doc,im2_doc,im3_doc,im4_doc,im5_doc,cop_nom,tdo_com,ndo_com,
    des_mov,fec_com 
    from ${this.Form.vis_rep} ${con_vis} order by ${order} `
    this.Form.tit_rep = tit_rep
    console.log('titulo=', tit_rep,
      "sqlQuery =",
      ` ${ins_sql}  `
    );
    //return ` select top 10 *  from ${this.Form.vis_rep}  `
    return ` ${ins_sql}   `;
  }
} // End ThisForm
