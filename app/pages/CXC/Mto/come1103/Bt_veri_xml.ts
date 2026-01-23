//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// @baseClass  : imgButton
// @class : Bt_veri_xml
// Description : Componente Bt_veri_xml
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 24/07/25
// Update Date  :
/////////////////////////////////////////////
// import { IMGBUTTON } from "@/classes/imgButton";

import { IMGBUTTON } from "@/classes/imgButton";
//imports

export class Bt_veri_xml extends IMGBUTTON {
    //public
    constructor() {
        super();
        this.prop.Caption = "Carga XML y Verifica";
        this.prop.Disabled = true;
        this.prop.Visible = false;
        this.prop.Position = 'footer'; // main, header , footer


        //propiedades
    }

    // Evento   :Click
    // Objeto  :Carga xml
    // Tipo   :Buttom
    // Comentarios :
    override async click() {
        let m = {}   // inicializamos m
        // SET DATE dmy 

        ////// verificacom si tomamos fecha del xml o la digitada,
        m.FEC_XML_PVE = iif(await select("PGEXML") > 1 && len(FIELD("FEC_XML_PVE", "PGEXML")) > 3, PGEXML.FEC_XML_PVE, "S")
        if (M.FEC_XML_PVE == 'N' && MessageBox('Recuerde digitar la fecha del documento antes de cargar el xml, Continuamos?', 4) != 6) {
            return false

        } // End If 

        m.file_xml = ''
        m.file_xml = GETFILE("xml", 'Archivo XML a cargar', 'Aceptar')
        await select('0')

        m.xml_sat = ''
        m.xml_sat = FILETOSTR(m.file_xml)
        ////  filetostr("certificados\2016dic05\00001000000202522914.pem")
        if (len(allTrim(m.xml_sat)) < 1) {
            MessageBox('Archivo no encontrado')
            this.Form.Bt_carga_xml.LostFocus
            this.Form.cod_nom.setFocus()
            return

        } // End If 

        m.xml_sat = strtran(m.xml_sat, ' "', '"')
        //// lectura archivo xml
        m.xml_sat = strtran(m.xml_sat, ' =', '=')
        m.xml_sat = allTrim(strtran(m.xml_sat, '= ', '='))
        if (atc(' certificado="', m.xml_sat, 1) > 0) {
            m.xml_sat1 = left(m.xml_sat, atc(' certificado="', m.xml_sat, 1))
            m.xml_sat2 = right(m.xml_sat, len(m.xml_sat) - atc(' certificado="', m.xml_sat, 1))
            let pos_ini = atc('"', m.xml_sat2, 2)
            m.xml_sat = m.xml_sat1 + 'cerfificado=""' + right(m.xml_sat2, len(m.xml_sat2) - pos_ini)
        } // End If 

        if (atc('<Addenda>', m.xml_sat, 1) > 0) {
            m.xml_sat = left(m.xml_sat, atc('<Addenda>', m.xml_sat, 1))
            m.xml_sat = allTrim(left(m.xml_sat, RATC('>', m.xml_sat, 1)) + '</Comprobante>')
        } // End If 

        if (atc('<cfdi:Addenda>', m.xml_sat, 1) > 0) {
            m.xml_sat = left(m.xml_sat, atc('<cfdi:Addenda>', m.xml_sat, 1))
            m.xml_sat = allTrim(left(m.xml_sat, RATC('>', m.xml_sat, 1)) + '</cfdi:Comprobante>')
        } // End If 

        let dat_bus = 'TimbreFiscalDigital'
        pos_ini = atc(dat_bus, m.xml_sat, 1)
        if (pos_ini != 0) {

            let precfd = 'cfdi:'
        } else {

            precfd = ''
        } // End If 

        let lon_tot = len(m.xml_sat)
        m.tdo_tdo = this.Form.tdo_tdo.prop.Value
        m.ndo_doc = this.Form.ndo_doc.prop.Value
        let dat_sal = ''
        // identifica tipo de cfd o cfd1
        //////// verifica que no este registrado el uuid en toda la base de datos
        ////
        dat_bus = 'UUID'
        // obtiene folio de cfdi si es un cfdi
        dat_sal = obt_cam_xml(m.xml_sat, precfd + "Complemento", dat_bus)
        if (len(allTrim(dat_sal)) > 0) {

            m.uuid = dat_sal
            let ins_sql = "select uuid uuid_reg,man_comedoc.cop_nom,man_comenom.cod_nom,nom_nom,man_comedoc.tdo_tdo as tdo_doc,man_comedoc.ndo_doc as num_doc," + "man_comedoc.cod_nom as cod_doc,man_comexml.tdo_tdo as tdo_xml,man_comexml.ndo_doc as num_xml,tte_nom as tte_pve, " + " top_nom as top_pve from man_comexml " + " left join man_comedoc on man_comedoc.tdo_tdo=man_comexml.tdo_tdo and man_comedoc.ndo_doc=man_comexml.ndo_doc " + " left join man_comenom on man_comedoc.cop_nom=man_comenom.cop_nom and man_comenom.cod_nom=man_comedoc.cod_nom " + " where uuid='" + m.uuid + "' "
            await select('0')
            // busca donde ubicar el resultado

            let a = ins_sql
            let res_sql = await SQLExec(ins_sql)
            // ejecuta instrucción SQL


            while (res_sql == 0 && this.Form.prop.key != 27) {
                // se repite mientras no hay resultados
                res_sql = await SQLExec()
                this.Form.prop.key = inkey()
            } // End while 

            if (res_sql >= 0) {
                await select('sqlresult')

                if (await recCount() > 0 && nvl(uuid_reg, ' ') != ' ') {

                    // si hay un error
                    if (nvl(cod_nom, ' ') != ' ' && nvl(cop_nom, ' ') != ' ') {
                        MessageBox('XML ya registrado UUID=' + uuid + 'documento: ' + tdo_xml + str(num_xml, 8) + ' ' + iif(nvl(cop_nom, 'C') == 'C', 'cliente: ', 'Proveedor: ') + nvl(cod_nom, ' ') + nvl(nom_nom, ' '))
                        return

                    } // End If 

                } // End If 

            } // End If 

        } // End If 

        ins_sql = ''
        await select('0')

        pos_ini = 0
        ////////
        m.datoxml = m.xml_sat
        m.rfc_nom = obt_cam_xml(m.datoxml, precfd + "Emisor", "rfc")
        // obtiene rfc del xml
        m.nom_xml = obt_cam_xml(m.datoxml, precfd + "Emisor", "nombre")
        m.rfc_pve = m.rfc_nom
        let tip_afe = obt_cam_xml(m.xml_sat, precfd + "Comprobante", "tipoDeComprobante")
        // obtiene tipo de comprobante del xml para comp.con docto.
        tip_afe = upper(tip_afe)
        if ((tip_afe == 'INGRESO' && cometdo.coa_tdo != 'A') || (tip_afe == 'EGRESO' && cometdo.coa_tdo != 'C')) {
            MessageBox('Tipo de comprobante del XML diferente a tipo de afectación del documento')
            this.Form.ver_xml.LostFocus
            this.Form.cod_nom.setFocus()
            return

        } // End If 

        m.datoxml = m.xml_sat
        // verifica que los datos del xml_receptor sean correctos
        m.rfc_cte = obt_cam_xml(m.datoxml, precfd + "Receptor", "rfc")
        // obtiene rfc del xml
        m.nom_cte = obt_cam_xml(m.datoxml, precfd + "Receptor", "nombre")
        // obtiene rfc del xml
        m.rfc_pve = m.rfc_nom
        if (upper(allTrim(m.rfc_cte)) != upper(allTrim(Public.value.rfc_pge)) && upper(allTrim(m.nom_cte)) != upper(allTrim(Public.value.nem_pge))) {
            MessageBox('Datos del receptor incorrectos en XML rfc:' + m.rfc_cte + ' nombre: ' + m.nom_cte)
            this.Form.ver_xml.LostFocus
            this.Form.cod_nom.setFocus()
            return

        } // End If 

        let pve_var = 0
        ins_sql = "select man_comenom.cod_nom cod_pve,nom_nom nom_pve,dir_nom dir_pve,cfd_xml,man_comedoc.tdo_tdo as tdo_doc,man_comedoc.ndo_doc as num_doc," + "man_comedoc.cod_nom as cod_doc,man_comexml.tdo_tdo as tdo_xml,man_comexml.ndo_doc as num_xml,tte_nom as tte_pve, " + " top_nom as top_pve from man_comenom " + " left outer join man_comedoc on man_comedoc.tdo_tdo='" + m.tdo_tdo + "' and man_comedoc.ndo_doc=" + str(m.ndo_doc) + " left outer join man_comexml on man_comexml.tdo_tdo='" + m.tdo_tdo + "' and man_comexml.ndo_doc=" + str(m.ndo_doc) + " where man_comenom.cop_nom='P' and rfc_nom='" + allTrim(m.rfc_nom) + "'"
        // si todo es correcto, nos traemos la informacion de la base de datos del proveedor
        await select('0')
        // busca donde ubicar el resultado

        a = ins_sql
        res_sql = await SQLExec(ins_sql, 'sqlresult')
        // ejecuta instrucción SQL


        while (res_sql == 0 && this.Form.prop.key != 27) {
            // se repite mientras no hay resultados
            res_sql = await SQLExec()
            this.Form.prop.key = inkey()
        } // End while 

        if (res_sql < 0) {
            // si hay un error
            if (this.Form.prop.key != 27) {
                // err_sql()()
            } else {

                if (pve_var == 0) {
                    MessageBox('RFC del proveedor ' + m.rfc_nom + ' del xml no se encuentra registrado' + str(pve_var))
                    return

                } // End If 

            } // End If 

        } // End If 

        await select('sqlresult')

        let tot_err = 0
        let sw_otro = 0
        if (await recCount() < 1 && pve_var == 0) {
            MessageBox('RFC del proveedor ' + m.rfc_nom + ' del xml no se encuentra registrado')
            return

        } // End If 

        if (pve_var == 0) {
            // VFP SCAN 
            while (!eof() && sw_otro == 0) {
                // inicia scaneo de documentos
                m = appendM(m, await scatter())// scatter 

                //& asigna valores a variables
                if (this.Form.cod_nom.prop.Value != m.cod_pve) {
                    if (MessageBox('Codigo de proveedor: ' + m.cod_pve + ' diferente a:' + this.Form.cod_nom.prop.Value + ' se CARGA ?', 4 + 256) == 6) {
                        sw_otro = 1
                    } // End If 

                } else {

                    sw_otro = 1
                } // End If 

                skip()
            } // End while 

            if (sw_otro == 0) {
                this.Form.ver_xml.LostFocus
                this.Form.cod_nom.setFocus()
                return

            } // End If 

            dat_bus = 'fecha'
            // obtiene fecha de xml
            dat_sal = obt_cam_xml(m.xml_sat, precfd + "Comprobante", dat_bus)
        } // End If 

        m.rfc_pve = m.rfc_nom
        m.nom_pve = m.nom_xml
        m.obs_pve = ' '
        let sw_pve = 0
        await select('sqlresult')

        if (await recCount() > 0) {
            m = appendM(m, await scatter())// scatter 

            sw_pve = 1
        } // End If 

        m.tdo_tdo = this.Form.tdo_tdo.prop.Value
        m.ndo_doc = this.Form.ndo_doc.prop.Value
        m.cfd_xml = FILETOSTR(m.file_xml)
        dat_sal = ''
        dat_bus = 'UUID'
        // obtiene folio de cfdi si es un cfdi
        dat_sal = obt_cam_xml(m.xml_sat, precfd + "Complemento", dat_bus)
        if (len(allTrim(dat_sal)) > 0) {

            m.uuid = dat_sal
        } else {

            dat_bus = 'folio'
            // obtiene folio de xml cfd
            dat_sal = obt_cam_xml(m.xml_sat, precfd + "Comprobante", dat_bus)
            let num_fol = dat_sal
            dat_bus = 'serie'
            // obtiene serie de xml
            dat_sal = ''
            dat_sal = obt_cam_xml(m.xml_sat, precfd + "Comprobante", dat_bus)
        } // End If 

        await select('lla1_xml')
        // graba xml en comexml

        await requery()

        if (await recCount() < 1) {
            await useNodata('lla1_xml') // use lla1_xml lla1_xml NODATA

            await localAlaSql(`INSERT INTO '+lla1_xml+' FROM ?`, [m])

            if (!tableUpdate()  /*gra_reg()*/) {

                // graba el registro
                aerror(men_err)
                //          Error al grabar
            } // End If 

        } else {

            // Inicio replace VFP
            //          IF thisform.messageBOX('XML ya registrado, se reescribe',4+256)=6
            // remplazamos
            Recno = await recNo()
            Alias = await alias()
            await localAlaSql(`update ${Alias} set cfd_xml=?  where recno=${Recno} `, [m.cfd_xml])

            // Inicio replace VFP
            Recno = await recNo()
            Alias = await alias()
            await localAlaSql(`update ${Alias} set uuid=?  where recno=${Recno} `, [m.uuid])

            if (!tableUpdate()  /*gra_reg()*/) {

                // graba el registro
                aerror(men_err)
                //          Error al grabar
            } // End If 

        } // End If 
        //        endif

        dat_bus = 'fecha'
        // obtiene fecha de xml
        dat_sal = ''
        dat_sal = obt_cam_xml(m.xml_sat, precfd + "Comprobante", dat_bus)

        ////// si la fecha se toma del xml
        if (m.fec_xml_pve == 'S') {
            this.Form.fec_doc.prop.Value = CTOT(substr(dat_sal, 9, 2) + '/' + substr(dat_sal, 6, 2) + '/' + substr(dat_sal, 1, 4))
        } // End If 

        dat_bus = 'total'
        // obtiene total antes de impuestos
        dat_sal = ''
        dat_sal = obt_cam_xml(m.xml_sat, precfd + "Comprobante", dat_bus)
        let tot_loc = this.Form.d_tot_doc.prop.Value
        let d_tot = val(dat_sal)
        let TOT_TOT = D_TOT
        let n_etq = 0
        let im_sal = 0
        let nom_traret = 'Retenciones'
        let sig_impt = -1
        // es para multipliar el importe, 1 si es traslado -1 si es retencion
        m.datimpt = substr(m.xml_sat, atc('</cfdi:Conceptos>', m.xml_sat) + 17, atc('<cfdi:Complemento>', m.xml_sat) - atc('</cfdi:Conceptos>', m.xml_sat))
        let im1_tot = 0
        let im2_tot = 0
        let im3_tot = 0
        let im4_tot = 0
        let im5_tot = 0
        let im0_tot = 0
        for (let i_impt = 1; i_impt < 2; i_impt++) {
            //////// AQUI VOY
            m.datoxml_t = obt_cam_xml(m.datimpt, precfd + nom_traret, ' ')
            m.datoxml = ''
            nom_traret = iif(i_impt == 1, 'Retencion ', 'Traslado ')
            for (let n_etq = 1; n_etq < 5; n_etq++) {
                im_sal = 0
                let posini = atc(nom_traret, m.datoxml_t, n_etq)
                if (posini > 0) {
                    m.datoxml = substr(m.datoxml_t, posini, len(allTrim(m.datoxml_t)) - posini + 1)
                    im_sal = val(obt_cam_xml(m.datoxml, ' ', 'importe'))
                    if (im_sal != 0) {
                        im_sal = im_sal * sig_impt
                        let sw_nomimp = obt_cam_xml(m.datoxml, ' ', 'impuesto')
                        switch (true) {
                            case this.Form.im0_doc.prop.Visible == true && (sw_nomimp != '001' && sw_nomimp != '002' && sw_nomimp != '003'):
                                im0_tot = im_sal
                                d_tot = d_tot - im_sal
                                break
                            case this.Form.im1_doc.prop.Visible == true && sw_nomimp == '003' && nom_traret == 'Retencion ':
                                im1_tot = im_sal
                                d_tot = d_tot - im_sal
                                break
                            case this.Form.im2_doc.prop.Visible == true && sw_nomimp == '003' && nom_traret == 'Traslado ':
                                im2_tot = im_sal
                                d_tot = d_tot - im_sal
                                break
                            case this.Form.im3_doc.prop.Visible == true && sw_nomimp == '002' && nom_traret == 'Traslado ':
                                im3_tot = im_sal
                                d_tot = d_tot - im_sal
                                break
                            case this.Form.im4_doc.prop.Visible == true && sw_nomimp == '002' && nom_traret == 'Retencion ':
                                im4_tot = im_sal
                                d_tot = d_tot - im_sal
                                break
                            case this.Form.im5_doc.prop.Visible == true && sw_nomimp == '001' && nom_traret == 'Retencion ':
                                im5_tot = im_sal
                                d_tot = d_tot - im_sal
                        } // End case 

                    } // End If 

                } // End If 

            } // End For; 

            nom_traret = 'Traslados'
            sig_impt = 1
            // es para multipliar el importe, 1 si es traslado -1 si es retencion
        } // End For; 


        //////
        //////  CARGA IMPUESTO 0 ESTATAL O LOCAL
        if (this.Form.im0_doc.prop.Visible == true) {
            m.datimpt = substr(m.xml_sat, atc('<cfdi:Complemento>', m.xml_sat), atc('</cfdi:Complemento>', m.xml_sat) - atc('<cfdi:Complemento>', m.xml_sat))
            if (atc('Impuesto', m.datimpt) > 0) {
                im_sal = val(obt_cam_xml(m.datimpt, ' ', 'importe'))
                if (im_sal != 0) {
                    sig_impt = iif(atc('Retenido', m.datimpt) > 0, -1, 1)
                    im_sal = im_sal * sig_impt
                    im0_tot = im_sal
                    d_tot = d_tot - im_sal
                } // End If 

            } // End If 

        } // End If 

        let imp_tot = d_tot
        let tot_doc = nvl(this.Form.imp_doc.prop.Value, 0) + this.Form.im1_doc.prop.Value + this.Form.im2_doc.prop.Value + this.Form.im3_doc.prop.Value + this.Form.im4_doc.prop.Value + this.Form.im5_doc.prop.Value + this.Form.im0_doc.prop.Value
        let dif_tot = tot_tot - tot_doc
        if (TOT_TOT != tot_doc) {
            let impuestosTot = im0_tot + im1_tot + im2_tot + im3_tot + im4_tot + im5_tot
            MessageBox('Total documento diferente al total de XML=' + allTrim(str(tot_tot, 16, 2)) + ' Diferencia=' + allTrim(str(dif_tot, 16, 2)) + ' Impuestos=' + allTrim(str(impuestosTot, 16, 2)))
        } // End If 
        ////  mensaje='Total diferentes en XML y Documento'
        //// do form come1103x with mensaje,dif_tot,tot_tot,imp_tot,im0_tot,im1_tot,im2_tot,im3_tot,im4_tot,im5_tot

        MessageBox('XML cargado UUID: ' + UUID)
        this.Form.Bt_carga_xml.prop.Visble = false
        this.Form.Bt_carga_xml.LostFocus
        this.Form.ref_doc.setFocus()
        await select('vi_cap_comedoc')

        return true

    }   // Fin Procedure


    //metodo
}