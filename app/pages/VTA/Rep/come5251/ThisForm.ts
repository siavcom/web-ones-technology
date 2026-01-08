//////////////////////////////////////////////
// BaseClass : reportForm
// Class : thisForm
// Description : Documentos de ventas
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 2023-09-20
// Update Date  : 2023-09-29
/////////////////////////////////////////////

///////////////////////////////////////
// Base class
///////////////////////////////////////

import { reportVtas } from "@/classes/Siavcom/reports/VTAS/reportVtas";
import { ndo_doc } from "./ndo_doc";

import { data_detail } from './detail/data_detail'
//import { unWatch } from './unWatch';

import { Bt_whatsApp } from "./Bt_whatsApp";
import { Bt_timbra } from "./Bt_timbra";
import { Bt_email } from "./Bt_email";
export class ThisForm extends reportVtas {
  public ndo_doc = new ndo_doc()
  public data_detail = new data_detail()

  public bt_whatsApp = new Bt_whatsApp()
  public bt_timbra = new Bt_timbra()
  public bt_email = new Bt_email()
  tdo_tdo = ''
  num_doc = 0
  num_pol = 0
  files: any[] = [];

  sw_imp = true
  transport = ''

  constructor() {
    super(2); // inicializa la clase base

    this.tab_ord = "vi_cfdi_ver40";
    this.prop.Name = "come5251";
    this.prop.Caption = "Impresión de CFDI'S";
    this.prop.Status = "A";
    this.prop.Development = true;
    this.vis_rep = "vi_cfdi_ver40"; // nombre de la vista sql a utilizar en el reporte
    this.for_imp.prop.Value = "cfdi_ver40_web"; // no incluir extencion jasper o jrxml
    this.op_tcd_tcd.prop.Visible = false
    this.op_tcd_tcd.prop.Disabled = true
    this.mon_rep.prop.Visible = false
    this.mon_rep.prop.Disabled = true
    this.des_fec.prop.Visible = false
    this.des_fec.prop.Disabled = true
    this.has_fec.prop.Visible = false
    this.has_fec.prop.Disabled = true

    this.op_tdo_tdo.prop.TabIndex = 1
    this.ndo_doc.prop.TabIndex = 2

    //this.dataView:string ='vcomepge'    // Vista de datos generales
    //this.sqlQuery=' `select des_tdo from cometdo where tdo_tdo=${this.Form.tdo_tdo.Value}` '             // Query a ejecutar antes de la vista del reporte

    this.block[0].component = {
      [0]: this.op_tdo_tdo,
      [1]: this.ndo_doc,
      [2]: this.data_detail

    }
    this.block[1].component = {
      [0]: this.data_detail
    }
    this.block[1].prop.Visible = false


    this.block[2].prop.Visible = false
    this.block[2].prop.Disabled = true

    this.block[3].prop.Visible = false
    this.block[3].prop.Disabled = true

    this.block[4].prop.Visible = false
    this.block[4].prop.Disabled = true

  }

  public override async init() {
    await super.init();

    var nom_par = 'ventas'
    this.prop.Caption = "Impresión de CFDI's ";
    this.Form.tit_rep = "Impresión de CFDI's  "

    if (this.Form.Params[0] && this.Form.Params[0].replaceAll("'", "").toLowerCase() == "co") {
      nom_par = 'compras'
      this.prop.Caption = "CFDI de compras ";
      this.Form.tit_rep = "CFDI de compras "
    }

    this.var_ord.prop.Value = "ndo_doc";
  }

  override async afterMounted() {
    super.afterMounted()

    if (this.Form.Params[1] != undefined) {
      const m = {
        tdo_tdo: this.Form.Params[0],
        ndo_doc: this.Form.Params[1]
      }
      this.op_tdo_tdo.prop.Value = m.tdo_tdo
      this.ndo_doc.prop.Value = m.ndo_doc
      this.op_tdo_tdo.prop.Visible = false
      this.ndo_doc.prop.Visible = false
      await use('vi_cap_comedoc', m)
      const vi_cap_comedoc = await goto(0, 'vi_cap_comedoc')
      if (vi_cap_comedoc.for_tdo > '         ')
        this.Form.for_imp.prop.Value = vi_cap_comedoc.for_tdo // asigna forma de impresion
      else {
        const ins_sql = `select num_fim,nom_fim,fim_fim,tpo_fim,dge_fim,cim_fim,mco_fim,des_tdo,tip_cfd from man_comefim 
                          join man_cometdo on man_cometdo.tdo_tdo = man_comefim.tdo_tdo where man_comefim.tdo_tdo='${m.tdo_tdo}' order by num_fim`
        await SQLExec(ins_sql, 'comefim')

        this.polImpresion(m)
        return
      }
      let tipo = vi_cap_comedoc.des_tdo
      if (vi_cap_comedoc.tip_cfd.trim() == 'P')
        tipo = `CFDI ${vi_cap_comedoc.des_tdo} Complemento de pago `

      if (vi_cap_comedoc.tip_cfd.trim() == 'I')
        tipo = `CFDI INGRESO ${vi_cap_comedoc.des_tdo}  `

      if (vi_cap_comedoc.tip_cfd.trim() == 'E')
        tipo = `CFDI EGRESO ${vi_cap_comedoc.des_tdo}  `

      if (vi_cap_comedoc.tip_cfd.trim() == 'T')
        tipo = `CFDI CARTA PORTE ${vi_cap_comedoc.des_tdo}  `


      this.Form.data_detail.messageSend.prop.Value = `Envio ${tipo}  Número ${m.ndo_doc} de ${Public.value.nem_pge} por ${vi_cap_comedoc.ref_doc} `
      this.Form.data_detail.phone.prop.Value = vi_cap_comedoc.te1_nom
      this.Form.data_detail.email.prop.Value = vi_cap_comedoc.ema_nom
      this.bt_pdf.click()
    }

  }

  public async polImpresion(m: {}) {

    if (!m)
      m = { ndo_doc: 0, tdo_tdo: '' }

    const data = await localAlaSql('select * from comefim order by num_fim')

    if (this.num_doc > 0 && m.ndo_doc == 0) {
      m.tdo_tdo = this.tdo_tdo
      m.ndo_doc = this.num_doc
    }

    for (let i = this.num_pol; i < data.length; i++) {
      this.num_pol = i

      if (this.tdo_tdo != m.tdo_tdo || this.num_doc != m.ndo_doc) {
        await use('vi_cap_comedoc', m)
      }
      m = await goto(0, 'vi_cap_comedoc')
      this.tdo_tdo = m.tdo_tdo
      this.num_doc = m.ndo_doc

      if (m.cfd_tdo == 'N' || m.sta_doc === 'C' || m.sta_doc === 'T' || m.sta_doc == 'N') {
        this.bt_timbra.prop.Visible = false;
      } else {
        this.bt_timbra.prop.Visible = true;
      }

      this.op_tdo_tdo.prop.Value = m.tdo_tdo
      this.ndo_doc.prop.Value = m.ndo_doc

      this.Form.for_imp.prop.Value = data[i].fim_fim // asigna forma de impresion
      const nom_fim = data[i].nom_fim.trim().toUpperCase()

      if (this.sw_imp) {
        this.sw_imp = false
        switch (true) {
          case nom_fim == 'MODI' || nom_fim == '' || nom_fim == 'PDF' || nom_fim == 'FOXY' || nom_fim == 'PANTALLA':
            this.bt_pdf.click()
            return

          case nom_fim == "PDFMAIL" || nom_fim == "MAIL":
            if (this.Form.report.displayPdf.prop.Visible)
              this.bt_email.click()
            return

            break;
          case nom_fim == "WHATSAPP":
            if (this.Form.report.displayPdf.prop.Visible)
              this.bt_whatsApp.click()
            return

            break;
          case nom_fim == "MSM":

            break;
          default:
            break;

        }
      }
      this.sw_imp = true

      if (data[i].tpo_fim != 'M' || (m.sta_doc == 'P' && data[i].tpo_fim == 'M')) {

        if (data[i].cim_fim == 1) { // Pregunta Continua la impresion

          let mensaje = (data[i].tpo_fim == 'M') ? 'Timbramos' : 'Continuamos '
          if (data[i].mco_fim.trim() > '         ')  //Mensaje de continuacion
            mensaje = data[i].mco_fim
          if (await MessageBox(mensaje, 4, '') != 6) {
            window.history.back()
            return
          }
        }
      }

      if (m.sta_doc == 'P' && data[i].tpo_fim == 'M') {  // timbra
        await this.bt_timbra.click()
      }

      if (data[i].tpo_fim == 'C' || data[i].tpo_fim == 'G' || data[i].tpo_fim == 'T') {// Convierte,Genera o Transforma        
        //await use('vi_cap_comedoc', m)
        // m = await goto(0, 'vi_cap_comedoc')

        const con_des = await get_con_doc(m.dge_fim) // consecutivo destino

        let ins_sql = ''
        let alm_des = ''
        switch (true) {
          case m.inv_tdo == 'P' && m.cop_nom == 'C':
            alm_des = m.als_doc
            break;
          case m.inv_tdo == 'P' && m.cop_nom == 'P':
            alm_des = m.ale_doc
            break;
          case m.inv_tdo == 'E':
            alm_des = m.ale_doc
            break;
          case m.inv_tdo == 'S':
            alm_des = m.als_doc
          default:
            alm_des = '   '
        }

        let fec_des = 'current_date'
        if (this.Form.dialect = 'nssql') {
          ins_sql = `set dateformat dmy ; 
                  declare @current_date as date;
                  SET @current_date=getdate() ;
                  exec P_con_gen_doc `
          fec_des = '@' + fec_des
        }

        else
          ins_sql = "  BEGIN ;  select P_con_gen_doc ("

        ins_sql += `'${data[i].tpo_fim}',`
        ins_sql += `'${m.tdo_tdo}',`
        ins_sql += `${m.ndo_doc},`
        ins_sql += 'null,'
        ins_sql = 'null,'
        ins_sql += `'${m.cod_nom}',`
        ins_sql += `'${m.dge_fim}',`  // documento a generar
        ins_sql += `${con_des},`    // consecutivo destino
        ins_sql += `${fec_des},`
        ins_sql += `${m.mon_doc},`
        ins_sql += `'${alm_des}')`

        if (this.Form.dialect == 'postgres')
          ins_sql += " commit;"


        /*        
       tip_pro+;
                 tdo_fue+;
                 ndo_fue+; 
                 des_fec+;
                 has_fec+;
                 cod_des+;
                 tdo_des+;
                 ndo_des+;
                 fec_des+;
                 mon_des+;
                 alm_des+")"
      
      */

        const data = await SQLExec(ins_sql)

        if (!data) {
          MessageBox('Error al generar el documento')
          return
        }

        m.ndo_doc = data[0].ndo_doc
        m.tdo_doc = data[0].tdo_doc

      }


    }  // fin de politicas de impresion
    window.history.back()

  }


  async attachFiles() {
    //this.Form.report.displayPdf.prop.Value.length <= 10
    if (!this.Form.report.displayPdf.prop.Visible)
      return
    const m = {
      tdo_tdo: this.Form.op_tdo_tdo.prop.Value,
      ndo_doc: this.Form.ndo_doc.prop.Value
    }

    const attachments = []

    //const nodeBuffer = Buffer.from(this.Form.report.displayPdf.prop.Source);
    // Convert the Buffer to a Base64 string
    const nodeBuffer = this.Form.report.displayPdf.prop.Source


    const bytes = new Uint8Array(nodeBuffer);
    // Convert the Uint8Array to a binary string
    const binaryString = String.fromCharCode(...bytes);
    // Encode the binary string to Base64
    const base64String = btoa(binaryString);

    attachments.push({
      fileName: `cfdi_${m.tdo_tdo}_${m.ndo_doc}.pdf`,
      type: 'pdf',
      fileB64: true,
      file: base64String
    })

    //console.log('attachFiles=', attachments);

    const data = await localAlaSql(`select cop_nom,cod_nom,tdo_tdo,ndo_doc from vi_cap_comedoc `)
    if (data.length > 0) {
      m.cop_nom = data[0].cop_nom;
      m.cod_nom = data[0].cod_nom;
      m.tdo_tdo = data[0].tdo_tdo;
      m.ndo_doc = data[0].ndo_doc;



      const res = await SQLExec(`select cfd_xml from vi_cap_comexml where tdo_tdo='${m.tdo_tdo}' 
          and ndo_doc=${m.ndo_doc}`)

      if (res.length > 0 && res[0].cfd_xml.length > 10) {
        attachments.push({
          fileName: `cfdi_${m.tdo_tdo}_${m.ndo_doc}.xml`,
          type: 'xml',
          fileB64: false,
          file: res[0].cfd_xml
        })

        //  console.log('attachFiles=', attachments);
      }

    }

    return attachments

  }

  ///////////////////////////////////////////////////////////////
  // En caso de tener que generar el query del select del report
  ///////////////////////////////////////////////////////////////

  public async sqlQuery(where: string) {
    this.Form.con_rep = where
    let localWhere = "";
    var ins_sql = "";
    this.tip_imp.prop.Value = "T"

    const data = await localAlaSql(` select tip_cfd,tdo_tdo from loc_cometdo where tdo_tdo='${this.op_tdo_tdo.prop.Value}' `)
    const tip_cfd = data[0].tip_cfd.trim()
    const tdo_tdo = data[0].tdo_tdo.trim()

    if (tip_cfd == 'I' || tip_cfd == 'E') {
      this.for_imp.prop.Value = 'jr_cfdi_factura'
      this.vis_rep = 'vi_cfdi_factura'
      ins_sql = ` 
           exec p_gen_vis_fac_web '${tdo_tdo}',${this.ndo_doc.prop.Value} `

    }
    if (tip_cfd == 'P') {
      this.for_imp.prop.Value = 'jr_cfdi_pago'
      this.vis_rep = 'vi_cfdi_general'
      ins_sql = `
     exec p_gen_vis_pag_web '${tdo_tdo}',${this.ndo_doc.prop.Value}
     `
    }
    if (tip_cfd == 'T') {
      this.for_imp.prop.Value = 'jr_cfdi_factura'
      this.vis_rep = 'vi_cfdi_traslados'
      ins_sql = `select * from ${this.vis_rep} WHERE ${localWhere} order by mov_mov `
    }

    localWhere = ` tdo_tdo='${tdo_tdo}' and ndo_doc=${this.ndo_doc.prop.Value} `

    // pasamos a numerico la variable de orden

    console.log(
      "sqlQuery =",
      `select * from ${this.vis_rep} WHERE ${localWhere} order by mov_mov `
    );
    return ` ${ins_sql}  `;
  }


} // End ThisForm
