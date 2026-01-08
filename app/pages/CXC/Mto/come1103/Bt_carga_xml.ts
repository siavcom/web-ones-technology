//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// BaseClass : imgButton
// Class : Bt_carga_xml
// Description : Componente Bt_carga_xml
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 24/07/25
// Update Date  :
/////////////////////////////////////////////
// import { IMGBUTTON } from "@/classes/imgButton";

import { IMGBUTTON } from "@/classes/imgButton";
//imports

export class Bt_carga_xml extends IMGBUTTON {
    //public
    constructor() {
        super();

        this.prop.Caption = "Carga XML";
        this.prop.Disabled = true;
        this.prop.Visible = false;
        this.style.width = '65px';
        this.prop.Image = '/Iconos/svg/xml.svg';

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

        if (len(allTrim(this.Form.cod_nom.prop.Value)) != 0 && this.Form.imp_doc.prop.Value != 0) {
            this.Form.Bt_veri_xml.click
            return

        } // End If 

        m.FEC_XML_pve = iif(await select("PGEXML")
            ////// verificacom si tomamos fecha del xml o la digitada,
            > 1 && len(FIELD("FEC_XML_pve", "PGEXML")) > 3, PGEXML.FEC_XML_pve, "S")
        if (M.FEC_XML_pve == 'N' && MessageBox('Recuerde digitar la fecha del documento antes de cargar el xml, Continuamos?', 4) != 6) {
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
            this.Form.Bt_carga_xml.LostFocus
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
            this.Form.Bt_carga_xml.LostFocus
            this.Form.cod_nom.setFocus()
            return

        } // End If 

        let pve_var = 0
        if (len(allTrim(this.Form.cod_nom.prop.Value)) == 0) {
            // se trata de datos de proveedor varios normal
            ins_sql = "select man_comenom.cod_nom,nom_nom,dir_nom,cfd_xml,man_comedoc.tdo_tdo as tdo_doc,man_comedoc.ndo_doc as num_doc," + "man_comedoc.cod_nom as cod_doc,man_comexml.tdo_tdo as tdo_xml,man_comexml.ndo_doc as num_xml,tte_nom as tte_pve, " + " top_nom as top_pve from man_comenom " + " left outer join man_comedoc on man_comedoc.tdo_tdo='" + m.tdo_tdo + "' and man_comedoc.ndo_doc=" + str(m.ndo_doc) + " left outer join man_comexml on man_comexml.tdo_tdo='" + m.tdo_tdo + "' and man_comexml.ndo_doc=" + str(m.ndo_doc) + " where man_comenom.cop_nom='P' and rfc_nom='" + allTrim(m.rfc_nom) + "'"
            // si todo es correcto, nos traemos la informacion de la base de datos del proveedor
        } else {

            ins_sql = "select * from man_comepve where RTRIM(rfc_pve)='" + allTrim(m.rfc_nom) + "' "
            pve_var = 1
        } // End If 

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
                if (m.nom_nom != m.nom_xml) {

                    if (MessageBox('Razón Social de XML:' + m.nom_xml + ' diferente al registrado: ' + m.nom_nom + ' se CARGA ?', 4 + 256) == 6) {
                        sw_otro = 1
                    } // End If 

                } else {

                    sw_otro = 1
                } // End If 

                skip()
            } // End while 

            if (sw_otro == 0) {
                this.Form.Bt_carga_xml.LostFocus
                this.Form.cod_nom.setFocus()
                return

            } // End If 

            this.Form.cod_nom.prop.Value = m.cod_nom
            //  this.Form.cod_nom.refresh
            await select('vi_cap_comenom')
            // rellenamos con ceros a la izquierda

            this.Form.cod_nom.prop.Value = m.cod_nom
            m.cop_nom = this.Form.prop.tip_cap
            // asignamos si es cliente o proveedor
            if (await recCount() == 0 || this.Form.cod_nom.prop.Value != vi_cap_comenom.cod_nom) {
                // si cambio de codigo o es un codigo nuevo
                await select('vi_cap_comenom')

                await use('vi_cap_comenom', m) // use vi_cap_comenom vi_cap_comenom

                if (await recCount() < 1) {
                    // no existe el cliente o proveedor
                    this.prop.Valid = false
                    MessageBox('No existe el código del cliente o proveedor')
                    return false

                } // End If 

                const vi_cap_comenom = await goto(0, 'vi_cap_comenom')
                this.Form.d_nom_nom.prop.ReadOnly = true
                dat_bus = 'fecha'
                // obtiene fecha de xml
                dat_sal = obt_cam_xml(m.xml_sat, precfd + "Comprobante", dat_bus)

                ////// si la fecha se tmoa del xml
                if (m.fec_xml_pve == 'S') {
                    this.Form.fec_doc.prop.Value = CTOT(substr(dat_sal, 9, 2) + '/' + substr(dat_sal, 6, 2) + '/' + substr(dat_sal, 1, 4))
                } // End If 

                if (this.Form.cod_nom.prop.Value != vi_cap_comenom.cod_nom) {
                    // si ha cambiado el codigo
                    this.Form.fve_doc.prop.Value = this.Form.fec_doc.prop.Value
                } // End If 


                // asignamos fecha de vencimiento del documento si ha cambiado el codigo
                if ((this.Form.prop.tip_cap + cometdo.coa_tdo == 'CC' || this.Form.prop.tip_cap + cometdo.coa_tdo == 'PA') && this.Form.cod_nom.prop.Value != vi_cap_comenom.cod_nom) {
                    this.Form.fve_doc.prop.Value = this.Form.fec_doc.prop.Value + vi_cap_comenom.dcr_nom
                } // End If 

                if (vi_cap_comenom.mcr_nom == 0) {
                    // Inicio replace VFP
                    Recno = await recNo()
                    Alias = await alias()
                    await localAlaSql(`update ${Alias} set vi_cap_comenom.mcr_nom=?  where recno=${Recno} `, [1])

                } // End If 

                if (vi_cap_comedoc.key_pri) {
                    // si es un documento nuevo
                    this.Form.mon_doc.prop.Value = vi_cap_comenom.mcr_nom
                    const vmo_doc = Public.value.val_mon1[vi_cap_comenom.mcr_nom]
                    this.Form.vmo_doc.prop.Value = vmo_doc
                } // End If 

                //    this.Form.d_nom_nom.refresh
                //   this.Form.fve_doc.refresh
                //   this.Form.mon_doc.refresh
            } // End If 

            await select('vi_cap_comenom')

            m = appendM(m, await scatter())// scatter 


            // seguridad por sucursales
            // si no tiene sucursal el cliente o proveedor
            // si no tiene sucirsal el usuario
            // o es diferente la sucursal del cliente o proveedor
            // a la del usuario
            if (Public.value.sucursal != '   ' && Public.value.sucursal != Public.value.suc_pge && Public.value.suc_pge != '   ') {
                MessageBox('Cliente de otra sucursal')
                return false
            } // End If 

            /*
                        if (cometdo.cop_nom + cometdo.coa_tdo == 'CA' || cometdo.cop_nom + cometdo.coa_tdo == 'PC') {
                            this.Form.Do_nopagados.open
                        } // End If 
            */
            await select('lla1_tdn')

            await use('lla1_tdn', m) // use lla1_tdn lla1_tdn

            if (lla1_tdn.ai0_tdn == 1) {
                this.Form.im0_doc.prop.Visible = true
            } else {

                this.Form.im0_doc.prop.Visible = false
            } // End If 

            if (lla1_tdn.ai1_tdn == 1) {
                this.Form.im1_doc.prop.Visible = true
            } else {

                this.Form.im1_doc.prop.Visible = false
            } // End If 

            if (lla1_tdn.ai2_tdn == 1) {
                this.Form.im2_doc.prop.Visible = true
            } else {

                this.Form.im2_doc.prop.Visible = false
            } // End If 

            if (lla1_tdn.ai3_tdn == 1) {
                this.Form.im3_doc.prop.Visible = true
            } else {

                this.Form.im3_doc.prop.Visible = false
            } // End If 

            if (lla1_tdn.ai4_tdn == 1) {
                this.Form.im4_doc.prop.Visible = true
            } else {

                this.Form.im4_doc.prop.Visible = false
            } // End If 

            if (lla1_tdn.ai5_tdn == 1) {
                this.Form.im5_doc.prop.Visible = true
            } else {

                this.Form.im5_doc.prop.Visible = false
            } // End If 

        } // End If 

        // fin de if de pve de siavcom
        if (pve_var == 1) {

            m.tte_pve = '04'
            m.top_pve = '85'
            m.iva_pve = 16
        } else {

            m.tte_pve = m.tte_nom
            m.top_pve = m.top_nom
            m.iva_pve = 16
        } // End If 

        this.Form.rfC_pve.prop.Value = m.rfc_nom
        // asigna valores a campos de proveedores varios
        this.Form.noM_pve.prop.Value = m.nom_xml
        //  this.Form.rfc_pve.Refresh
        //  this.Form.nom_pve.refresh
        m.rfc_pve = m.rfc_nom
        m.nom_pve = m.nom_xml
        m.obs_pve = ' '
        let sw_pve = 0
        await select('sqlresult')

        if (await recCount() > 0) {
            m = appendM(m, await scatter())// scatter 

            sw_pve = 1
        } // End If 

        await select('lla1_pve')

        await tableUpdate()

        await requery()

        if (await recCount() < 1) {
            // no existe
            await appendBlank()

            // Inicio replace VFP
            Recno = await recNo()
            Alias = await alias()
            await localAlaSql(`update ${Alias} set rfc_pve=?  where recno=${Recno} `, [m.rfc_pve])

            // Inicio replace VFP
            Recno = await recNo()
            Alias = await alias()
            await localAlaSql(`update ${Alias} set nom_pve=?  where recno=${Recno} `, [m.nom_pve])

            // Inicio replace VFP
            Recno = await recNo()
            Alias = await alias()
            await localAlaSql(`update ${Alias} set tte_pve=?  where recno=${Recno} `, [m.tte_pve])

            // Inicio replace VFP
            Recno = await recNo()
            Alias = await alias()
            await localAlaSql(`update ${Alias} set top_pve=?  where recno=${Recno} `, [m.top_pve])

        } // End If 

        this.Form.tte_nom.prop.Value = m.tte_pve
        this.Form.top_nom.prop.Value = m.top_pve
        this.Form.iva_pve.prop.Value = m.iva_pve
        this.Form.obs_pve.prop.Value = m.obs_pve
        /*
        this.Form.tte_nom.Refresh
        this.Form.top_nom.Refresh
        this.Form.iva_pve.Refresh
        this.Form.obs_pve.Refresh
        this.Form.nom_pve.Refresh
        */
        m.tdo_tdo = this.Form.tdo_tdo.prop.Value
        m.ndo_doc = this.Form.ndo_doc.prop.Value
        m.cfd_xml = FILETOSTR(m.file_xml)
        dat_sal = ''
        dat_bus = 'UUID'
        // obtiene folio de cfdi si es un cfdi
        dat_sal = obt_cam_xml(m.xml_sat, precfd + "Complemento", dat_bus)
        if (len(allTrim(dat_sal)) > 0) {

            this.Form.ref_doc.prop.Value = dat_sal
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
            this.Form.ref_doc.prop.Value = 'Serie: ' + dat_sal + ' Folio: ' + num_fol
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

        this.Form.fve_doc.prop.Value = this.Form.fec_doc.prop.Value
        dat_bus = 'total'
        // obtiene total antes de impuestos
        dat_sal = ''
        dat_sal = obt_cam_xml(m.xml_sat, precfd + "Comprobante", dat_bus)
        this.Form.d_tot_doc.prop.Value = val(dat_sal)
        let d_tot = val(dat_sal)
        let n_etq = 0
        let im_sal = 0
        let nom_traret = 'Retenciones'
        let sig_impt = -1
        // es para multipliar el importe, 1 si es traslado -1 si es retencion
        m.datimpt = substr(m.xml_sat, atc('</cfdi:Conceptos>', m.xml_sat) + 17, atc('<cfdi:Complemento>', m.xml_sat) - atc('</cfdi:Conceptos>', m.xml_sat))
        for (let i_impt = 1; i_impt < 2; i_impt++) {
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
                            //// sw_nomimp=IIF(sw_nomimp='002','IVA',IIF(sw_nomimp='001','ISR',IIF(sw_nomimp='003','IEPS',sw_nomimp)))
                            //// sw_nomimp=IIF(nom_traret='Retencion ','RET '+sw_nomimp,sw_nomimp)
                            case this.Form.im0_doc.prop.Visible == true && (sw_nomimp != '001' && sw_nomimp != '002' && sw_nomimp != '003'):
                                this.Form.im0_doc.prop.Value = im_sal
                                d_tot = d_tot - im_sal
                                //   this.Form.im0_doc.Refresh
                                break
                            case this.Form.im1_doc.prop.Visible == true && sw_nomimp == '003' && nom_traret == 'Retencion ':
                                this.Form.im1_doc.prop.Value = im_sal
                                d_tot = d_tot - im_sal
                                //    this.Form.im1_doc.Refresh
                                break
                            case this.Form.im2_doc.prop.Visible == true && sw_nomimp == '003' && nom_traret == 'Traslado ':
                                this.Form.im2_doc.prop.Value = im_sal
                                d_tot = d_tot - im_sal
                                //    this.Form.im2_doc.Refresh
                                break
                            case this.Form.im3_doc.prop.Visible == true && sw_nomimp == '002' && nom_traret == 'Traslado ':
                                this.Form.im3_doc.prop.Value = im_sal
                                d_tot = d_tot - im_sal
                                //    this.Form.im3_doc.Refresh
                                break
                            case this.Form.im4_doc.prop.Visible == true && sw_nomimp == '002' && nom_traret == 'Retencion ':
                                this.Form.im4_doc.prop.Value = im_sal
                                d_tot = d_tot - im_sal
                                //    this.Form.im4_doc.Refresh
                                break
                            case this.Form.im5_doc.prop.Visible == true && sw_nomimp == '001' && nom_traret == 'Retencion ':
                                this.Form.im5_doc.prop.Value = im_sal
                                d_tot = d_tot - im_sal
                            //    this.Form.im5_doc.Refresh
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
                    this.Form.im0_doc.prop.Value = im_sal
                    d_tot = d_tot - im_sal
                    // this.Form.im0_doc.Refresh
                } // End If 

            } // End If 

        } // End If 

        this.Form.imp_doc.prop.Value = d_tot
        /*
        this.Form.fec_doc.Refresh
        this.Form.fve_doc.Refresh
        this.Form.imp_doc.Refresh
        this.Form.d_tot_doc.refresh
        this.Form.ref_doc.refresh
        */
        this.Form.Bt_carga_xml.prop.Visble = false
        this.Form.Bt_carga_xml.LostFocus
        this.Form.ref_doc.setFocus()
        this.prop.Valid = true
        // damos por bueno el dato
        await select('vi_cap_comedoc')

        if (pve_var == 1) {
            // grabamos proveedor varios si es nuevo
            await select('lla1_pve')

            for (const control of this.Form.main) {
                // Abre la vista para leer datos

                if (substr(control.prop.Name, 4, 1) == '_' && left(control.prop.ControlSource, 11) == 'lla1_pve') {
                    control.prop.Valid = true
                } // End If 

            } // End For; 

            if (!tableUpdate()  /*gra_reg()*/) {
                MessageBox('No se pudo dar de alta el proveedor')
            } // End If 

        } // End If 

        await select('vi_cap_comedoc')

        return true

    }   // Fin Procedure





    //metodo
}