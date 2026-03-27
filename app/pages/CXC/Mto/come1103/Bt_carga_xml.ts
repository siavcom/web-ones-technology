//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// @baseClass  : imgButton
// @class : Bt_carga_xml
// Description : Componente Bt_carga_xml
// @author: El Fer Blocks (Fernando Cuadras)
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
        this.prop.BaseClass = "base64";
        this.inputStyle.accept = "application/xml"
        this.prop.Caption = "Carga XML";
        this.prop.Disabled = true;
        this.prop.Visible = false;

        this.prop.Image = '/Iconos/svg/xml.svg';
        this.prop.Position = 'footer'; // main, header , footer
        this.style.width = '83px';
        // this.style.height = 'max-content';
        //propiedades
    }

    // Evento   :Click
    // Objeto  :Carga xml
    // Tipo   :Buttom
    // Comentarios :
    override async click() {
        let m = {}   // inicializamos m
        // SET DATE dmy 
        if (this.prop.Value.trim().length <= 100)
            return false

        if (this.Form.cod_nom.prop.Value.trim().length > 0 && this.Form.imp_doc.prop.Value != 0) {
            return
        }
        // End If 
        // verificacom si tomamos fecha del xml o la digitada,
        debugger
        const pgexml = await localAlaSql('select * from pgexml')
        m.fec_xml_pve = pgexml[0].fec_xml_pve ? pgexml[0].fec_xml_pve : 'N'
        if (m.fec_xml_pve == 'N' && await MessageBox('Recuerde digitar la fecha del documento antes de cargar el xml, Continuamos?', 4) != 6) {
            return false
        } // End If 

        const cometdo = await currentValue('*', 'cometdo')
        m.xml_sat = this.prop.Value

        m.xml_sat = m.xml_sat.replaceAll(' "', '"')
        //// lectura archivo xml
        m.xml_sat = m.xml_sat.replaceAll(' =', '=')
        m.xml_sat = m.xml_sat.replaceAll('= ', '=').trim()

        if (atc(' certificado="', m.xml_sat, 1) > 0) {
            m.xml_sat1 = left(m.xml_sat, atc(' certificado="', m.xml_sat, 1))
            m.xml_sat2 = right(m.xml_sat, m.xml_sat.length - atc(' certificado="', m.xml_sat, 1))
            let pos_ini = atc('"', m.xml_sat2, 2)
            m.xml_sat = m.xml_sat1 + 'cerfificado=""' + right(m.xml_sat2, len(m.xml_sat2) - pos_ini)
        } // End If 

        if (atc('<Addenda>', m.xml_sat, 1) > 0) {
            m.xml_sat = left(m.xml_sat, atc('<Addenda>', m.xml_sat, 1))
            m.xml_sat = allTrim(left(m.xml_sat, ratc('>', m.xml_sat, 1)) + '</Comprobante>')
        } // End If 

        if (atc('<cfdi:Addenda>', m.xml_sat, 1) > 0) {
            m.xml_sat = left(m.xml_sat, atc('<cfdi:Addenda>', m.xml_sat, 1))
            m.xml_sat = allTrim(left(m.xml_sat, ratc('>', m.xml_sat, 1)) + '</cfdi:Comprobante>')
        } // End If 

        let dat_bus = 'TimbreFiscalDigital'
        let pos_ini = atc(dat_bus, m.xml_sat, 1)
        let precfd
        if (pos_ini != 0) {
            precfd = 'cfdi:'
        } else {
            precfd = ''
        } // End If 

        let lon_tot = m.xml_sat.length
        m.tdo_tdo = this.Form.tdo_tdo.prop.Value
        m.ndo_doc = this.Form.ndo_doc.prop.Value
        let dat_sal = ''
        // identifica tipo de cfd o cfd1
        //////// verifica que no este registrado el uuid en toda la base de datos
        ////
        dat_bus = 'UUID'
        // obtiene folio de cfdi si es un cfdi
        m.uuid = obt_cam_xml(m.xml_sat, precfd + "Complemento", dat_bus)
        if (m.length > 0) {
            let ins_sql = "select uuid uuid_reg,man_comedoc.cop_nom,man_comenom.cod_nom,nom_nom,man_comedoc.tdo_tdo as tdo_doc,man_comedoc.ndo_doc as num_doc," + "man_comedoc.cod_nom as cod_doc,man_comexml.tdo_tdo as tdo_xml,man_comexml.ndo_doc as num_xml,tte_nom as tte_pve, " + " top_nom as top_pve from man_comexml " + " left join man_comedoc on man_comedoc.tdo_tdo=man_comexml.tdo_tdo and man_comedoc.ndo_doc=man_comexml.ndo_doc " + " left join man_comenom on man_comedoc.cop_nom=man_comenom.cop_nom and man_comenom.cod_nom=man_comedoc.cod_nom " + " where uuid='" + m.uuid + "' "
            const data = await SQLExec(ins_sql)
            // ejecuta instrucción SQL

            if (data.length > 0) {
                if (data.uuid_reg > ' ') {

                    // si hay un error
                    if (data.cod_nom > ' ' && data.cop_nom > ' ') {
                        MessageBox('XML ya registrado UUID=' + m.uuid + 'documento: ' + tdo_xml + str(num_xml, 8) + ' ' + iif(nvl(cop_nom, 'C') == 'C', 'cliente: ', 'Proveedor: ') + nvl(cod_nom, ' ') + nvl(nom_nom, ' '))
                        return

                    } // End If 

                } // End If 

            } // End If 

        } // End If 

        pos_ini = 0
        ////////
        m.datoxml = m.xml_sat
        m.rfc_nom = obt_cam_xml(m.datoxml, precfd + "Emisor", "rfc")
        // obtiene rfc del xml
        m.nom_xml = obt_cam_xml(m.datoxml, precfd + "Emisor", "nombre")
        m.rfc_pve = m.rfc_nom
        let tip_afe = obt_cam_xml(m.xml_sat, precfd + "Comprobante", "tipoDeComprobante")
        // obtiene tipo de comprobante del xml para comp.con docto.
        tip_afe = tip_afe.toUpperCase()
        if ((tip_afe == 'INGRESO' && cometdo.coa_tdo != 'A') || (tip_afe == 'EGRESO' && cometdo.coa_tdo != 'C')) {
            MessageBox('Tipo de comprobante del XML diferente a tipo de afectación del documento')
            this.Form.cod_nom.setFocus()
            return
        } // End If 

        m.datoxml = m.xml_sat
        // verifica que los datos del xml_receptor sean correctos
        m.rfc_cte = obt_cam_xml(m.datoxml, precfd + "Receptor", "rfc").toUpperCase()
        // obtiene rfc del xml
        m.nom_cte = obt_cam_xml(m.datoxml, precfd + "Receptor", "nombre").toUpperCase()
        // obtiene rfc del xml
        m.rfc_pve = m.rfc_nom.trim().toUpperCase()
        if (m.rfc_cte != Public.value.rfc_pge.trim() && m.nom_cte != Public.value.nem_pge.toUpperCase()) {
            MessageBox('Datos del receptor incorrectos en XML rfc:' + m.rfc_cte + ' nombre: ' + m.nom_cte)
            this.Form.Bt_carga_xml.LostFocus
            this.Form.cod_nom.setFocus()
            return

        } // End If 

        let pve_var = 0
        let ins_sql = ''
        if (this.Form.cod_nom.prop.Value.trim().length == 0) {
            // se trata de datos de proveedor varios normal
            ins_sql = "select man_comenom.cod_nom,nom_nom,dir_nom,cfd_xml,man_comedoc.tdo_tdo as tdo_doc,man_comedoc.ndo_doc as num_doc," + "man_comedoc.cod_nom as cod_doc,man_comexml.tdo_tdo as tdo_xml,man_comexml.ndo_doc as num_xml,tte_nom as tte_pve, " + " top_nom as top_pve from man_comenom " + " left outer join man_comedoc on man_comedoc.tdo_tdo='" + m.tdo_tdo + "' and man_comedoc.ndo_doc=" + str(m.ndo_doc) + " left outer join man_comexml on man_comexml.tdo_tdo='" + m.tdo_tdo + "' and man_comexml.ndo_doc=" + str(m.ndo_doc) + " where man_comenom.cop_nom='P' and rfc_nom='" + allTrim(m.rfc_nom) + "'"
            // si todo es correcto, nos traemos la informacion de la base de datos del proveedor
        } else {

            ins_sql = "select * from man_comepve where RTRIM(rfc_pve)='" + allTrim(m.rfc_nom) + "' "
            pve_var = 1
        } // End If 


        const res = await SQLExec(ins_sql, 'sqlresult')
        // ejecuta instrucción SQL


        if (res.length == 0) {
            // si hay un error

            if (pve_var == 0) {
                MessageBox('RFC del proveedor ' + m.rfc_nom + ' del xml no se encuentra registrado' + pve_var.toString())
                return

            } // End If 


        } // End If 

        let sw_otro = 0

        if (pve_var == 0) {
            // VFP SCAN
            await goto('TOP', 'sqlresult')
            while (!eof('sqlresult') && sw_otro == 0) {
                // inicia scaneo de documentos
                m = appendM(m, await scatter())// scatter 

                //& asigna valores a variables
                if (m.nom_nom != m.nom_xml) {

                    if (await MessageBox('Razón Social de XML:' + m.nom_xml + ' diferente al registrado: ' + m.nom_nom + ' se CARGA ?', 4 + 256) == 6) {
                        sw_otro = 1
                    } // End If 

                } else {

                    sw_otro = 1
                } // End If 

                skip(1, 'sqlreult')
            } // End while 

            if (sw_otro == 0) {
                this.Form.cod_nom.setFocus()
                return
            } // End If 

            this.Form.cod_nom.prop.Value = m.cod_nom

            if (!await this.Form.cod_nom.valid())
                return

            // rellenamos con ceros a la izquierda
            m.cop_nom = this.Form.prop.tip_cap
            // asignamos si es cliente o proveedor
            if (1 == 0 && (await recCount() == 0 || this.Form.cod_nom.prop.Value != vi_cap_comenom.cod_nom)) {
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
            } // End If fin Lectura cod_nom *******

            m = appendM(m, await scatter('*', 'vi_cap_comenom'))// scatter 

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
        this.Form.nom_pve.prop.Value = m.nom_xml

        m.rfc_pve = m.rfc_nom
        m.nom_pve = m.nom_xml
        m.obs_pve = ' '
        let sw_pve = 0

        if (await recCount('sqlresult') > 0) {
            m = appendM(m, await scatter('*', 'sqlresult'))// scatter 

            sw_pve = 1
        } // End If 

        await use('lla1_pve', m)

        ///await requery()

        if (await recCount('lla1_pve') == 0) {
            // no existe
            await appendBlank('lla1_pve', m)
            await gather('lla1_pve', m)
            await tableUpdate(0, false, 'lla1_pve')

            // const Recno = await recNo()
            // await localAlaSql(`update lla1_pve set rfc_pve='${m.rfc_pve}',nom_pve='${m.nom_pve}',tte_pve='${m.tte_pve}',top_pve='${m.top_pve}' where recno=${recno} `)
        }
        await tableUpdate(0, false, 'lla1_pve')

        this.Form.tte_nom.prop.Value = m.tte_pve
        this.Form.top_nom.prop.Value = m.top_pve
        this.Form.iva_pve.prop.Value = m.iva_pve
        this.Form.obs_pve.prop.Value = m.obs_pve

        m.tdo_tdo = this.Form.tdo_tdo.prop.Value
        m.ndo_doc = this.Form.ndo_doc.prop.Value
        // m.cfd_xml = this.prop.Value //FILETOSTR(m.file_xml)
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

        await use('lla1_xml', m)
        // graba xml en comexml

        if (await recCount('lla1_xml') == 0) {
            await appendBlank('lla1_xml', m)
            await gather('lla1_xml', m)
            if (!await tableUpdate(0, false, 'lla1_xml'))
                return
        } else {

            const Recno = await recNo('lla1_xml')
            const Alias = 'lla1_xml'
            await localAlaSql(`update ${Alias} set cfd_xml='${m.cfd_xml}',uuid='${m.uuid}'  where recno=${Recno} `)

            if (!tableUpdate(0, false, 'lla1_xml'))
                return

        } // End If 
        //        endif

        dat_bus = 'fecha'
        // obtiene fecha de xml
        dat_sal = ''
        dat_sal = obt_cam_xml(m.xml_sat, precfd + "Comprobante", dat_bus)

        ////// si la fecha se toma del xml
        if (m.fec_xml_pve == 'S') {
            this.Form.fec_doc.prop.Value = substr(dat_sal, 9, 2) + '/' + substr(dat_sal, 6, 2) + '/' + substr(dat_sal, 1, 4)
        } // End If 

        this.Form.fve_doc.prop.Value = this.Form.fec_doc.prop.Value
        dat_bus = 'total'
        // obtiene total antes de impuestos
        dat_sal = ''
        dat_sal = obt_cam_xml(m.xml_sat, precfd + "Comprobante", dat_bus)
        //   this.Form.d_tot_doc.prop.Value = +(dat_sal)
        let d_tot = +(dat_sal)
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
                    im_sal = +(obt_cam_xml(m.datoxml, ' ', 'importe'))
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
                im_sal = +(obt_cam_xml(m.datimpt, ' ', 'importe'))
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
        this.Form.Bt_carga_xml.prop.Visble = false
        this.Form.Bt_carga_xml.LostFocus
        this.Form.ref_doc.setFocus()
        this.prop.Valid = true
        // damos por bueno el dato

        if (pve_var == 1) {  // grabamos proveedor varios si es nuevo
            for (const control of this.Form.main) {
                if (left(control.prop.ControlSource, 11) == 'lla1_pve')
                    control.prop.Valid = true

            } // End For; 

            if (!tableUpdate(0, false, 'lla1_pve')  /*gra_reg()*/) {
                MessageBox('No se pudo dar de alta el proveedor')
            } // End If 

        } // End If 
        return true

    }   // Fin Procedure
    //metodo
}