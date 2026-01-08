//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// BaseClass : comboBox
// Class : tcd_tcd
// Description : Componente tcd_tcd
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 24/07/25
// Update Date  :
/////////////////////////////////////////////
// import { COMPONENT } from "@/classes/Component";
import { CAPTURECOMPONENT } from "@/classes/CaptureComponent";
//imports

export class tcd_tcd extends CAPTURECOMPONENT {
    //public
    constructor() {
        super();
        this.prop.BaseClass = "comboBox";
        this.prop.Caption = "Clasif. docto.";
        this.prop.ControlSource = "vi_cap_comedoc.tcd_tcd";
        this.prop.Value = 0;
        this.prop.RowSource = "vi_cap_cometcd.des_tcd,tcd_tcd";
        this.prop.RowSourceType = 2;
        this.prop.BoundColumn = 2;
        this.prop.ColumnCount = 2;
        this.prop.ColumnWidths = "200px,20px";

        this.prop.Messages[0] = 'No tiene definida la moneda la cuenta bancaria'
        this.prop.Messages[1] = 'Adverencia'



        //propiedades
    }
    // Evento   :Valid
    // Comentarios :si tiene clasificación de documentos permite escojer clasificación de documentos
    override async valid(sw_rel?: boolean) {
        let m = {}   // inicializamos m

        const cometdo = await goto(0, 'cometdo')
        this.prop.Valid = false
        if (Public.value.pct_pct == 1 && this.Form.prop.tip_cap == 'P') {
            // Si tiene contabilidad  && calcula saldo de chequera
            m.tdo_tdo = this.Form.tdo_tdo.prop.Value
            // VFP LOCATE For dia_dia=allTrim(this.Form.tdo_tdo.prop.Value)
            let records = await locateFor(`dia_dia="${this.Form.tdo_tdo.prop.Value.trim()}"`, 'comedia')

            if (records.lenght > 0 && records[0].tip_dia == 'CH') {
                m = appendM(m, await scatter())// scatter 
                let cta_cta = records[0].cta_cta.trim()
                if (cta_cta.length == 0) {
                    const lla1_tdo = await goto(0, 'lla1_tdo')
                    cta_cta = lla1_tdo.ctb_tdo.trim()
                    const vi_cap_cometcd = await goto(0, 'vi_cap_cometcd')

                    cta_cta = cta_cta + vi_cap_cometcd.ctb_tcd.trim()
                    m.mon_dia = vi_cap_cometcd.mon_doc
                } // End If 

                this.Form.d_sal_cta.prop.Value = await cal_sal_cta(cta_cta, Public.value.fpo_pge, m.mon_dia)
                this.Form.d_sal_cta.prop.Currency = Public.value.des_mon1[comedia.mon_dia]

                let fec_act = Date(year(Public.value.fpo_pge), motn(Public.value.fpo_pge), day(Public.value.fpo_pge))
                this.Form.d_sal_cta.prop.Caption = 'Saldo al ' + stringToDate(fec_act)
                this.Form.d_sal_cta.prop.Visible = true
            } else {

                // this.Form.la_sal_cta.prop.Visible = false
                this.Form.d_sal_cta.prop.Visible = false
            } // End If 

        } // End If 

        const vi_cap_comedoc = await scatter(['key_pri'], 'vi_cap_comedoc')

        if (cometdo.tip_cfd == 'P' && (vi_cap_comedoc.key_pri || this.prop.Value != await oldValue('tcd_tcd', 'vi_cap_comedoc'))) {

            m = { ...await goto(0, 'vi_cap_comedoc') }// scatter 
            m.cop_nom = 'N'
            m.cod_nom = space(12)

            m = { ...await goto(0, 'vi_cap_cometcd') }// scatter 

            if (m.cba_cba > 0) {
                // si  hay cuenta bancaria

                await use('vi_cap_comecba', m) // use lla1_cba lla1_cba
                const lla1_cba = await goto(0, 'vi_cap_comecba')

                if (lla1_cba.key_pri && lla1_cba.key_pri > 0) {
                    // Inicio replace VFP
                    this.Form.mon_doc.prop.Value = lla1_cba.mon_cba


                } else {
                    MessageBox(this.prop.Messages[0], 16, 'Error', 5000)
                    return false
                } // End If 

            } else { // Moneda principal
                this.Form.mon_doc.prop.Value = 1

            } // End If 

            //this.Form.mon_doc.prop.Value =vi_cap_comedoc.mon_doc
            await this.Form.mon_doc.valid()
            //   this.Form.mon_doc.Refresh
        } // End If 

        if (this.Form.sw_pga && await recNo('vi_cap_cometcd') > 0) {
            const vi_cap_cometcd = await goto(0, 'vi_cap_cometcd')
            await updateCampo(vi_cap_cometcd.pga_pga, 'vi_cap_comedoc.pga_pga', vi_cap_comedoc.recno)
            //await localAlaSql(`update vi_cap_comedoc set pga_pga=?  where recno=${vi_cap_comedoc.recno} `, [vi_cap_cometcd.pga_pga])
        } // End If 

        return true

    }   // Fin Procedure

    // Evento   :GotFocues
    // Objeto  :tcd_tcd
    // Tipo   :ComboBox
    // Comentarios :si tiene clasificación de documentos permite escojer clasificación de documentos
    override async when() {
        let m = {}   // inicializamos m

        const cometdo = await goto(0, 'cometdo')
        //const Recno = await scatter(['Recno'], vi_cap_comedoc)
        const vi_cap_comedoc = await scatter(['Recno', 'key_pri'], 'vi_cap_comedoc')
        const Recno = vi_cap_comedoc.Recno
        this.prop.ReadOnly = this.prop.ReadOnly ? this.prop.ReadOnly : await !this.Form.rev_per(this.prop.Name)
        if (this.prop.ReadOnly) {
            this.prop.Valid = true

            if (cometdo.tip_cfd == 'P' && vi_cap_comedoc.key_pri > 0) {
                m.cop_nom = 'N'
                m.cod_nom = space(12)
                await select('vi_cap_cometcd')
                const vi_cap_cometcd = await goto(0, 'vi_cap_cometcd')
                m = { ...vi_cap_cometcd }// scatter 

                // Si hay cuenta bancaria
                if (vi_cap_cometcd.cba_cba > 0) {
                    await use('lla1_cba', m) // use lla1_cba lla1_cba

                    const lla1_cba = await goto(0, 'lla1_cba')

                    // Hay cuenta bancaria
                    if (lla1_cba.mon_cba != null) {

                        // await localAlaSql(`update ${Alias} set mon_doc=?  where recno=${Recno} `, [lla1_cba.mon_cba])
                        await updateCampo(lla1_cba.mon_cba, 'vi_cap_comedoc.mon_doc', Recno)
                        //await localAlaSql(`update ${Alias} set vmo_doc=?  where recno=${Recno} `, [Public.value.val_mon1(vi_cap_comedoc.mon_doc)])
                        await updateCampo(Public.value.val_mon1[vi_cap_comedoc.mon_doc], 'vi_cap_comedoc.vmo_doc', Recno)

                    } else {
                        //this.prop.Messages[1]='No tiene definida la moneda la cuenta bancaria'
                        MessageBox(this.prop.Messages[0], 32, this.prop.Messages[1], 5000)
                    } // End If 

                } else {

                    //                    await localAlaSql(`update ${Alias} set vi_cap_comedoc.mon_doc=? , vi_cap_comedoc.vmo_doc=?  where recno=${Recno} `, [1, 1])
                    await updateCampo(1, 'vi_cap_comedoc.mon_doc', Recno)
                    await updateCampo(1, 'vi_cap_comedoc.vmo_doc', Recno)

                    this.Form.cba_cba.prop.Valid = true
                    this.Form.cba_cba.prop.ReadOnly = true

                    this.Form.che_doc.prop.Valid = true
                    this.Form.che_doc.prop.ReadOnly = true

                } // End If 

                //this.Form.mon_doc.prop.Value = Public.value.des_mon1(vi_cap_comedoc.mon_doc)

            } // End If 
            else {
                this.Form.cba_cba.prop.Valid = true
                this.Form.cba_cba.prop.ReadOnly = true

                this.Form.che_doc.prop.Valid = true
                this.Form.che_doc.prop.ReadOnly = true

            }
            this.prop.nextFocus = true
            return false

        } // End If 


        const vi_cap_cometcd = await goto(0, 'vi_cap_cometcd')

        this.prop.Valid = true

        //   if (true) {// this.Form.rev_per(this.prop.Name)

        if (Public.value.pct_pct == 1 && this.Form.prop.tip_cap == 'P') {
            // Si tiene contabilidad  y es proveedor, calcula saldo de chequera
            m.tdo_tdo = this.Form.tdo_tdo.prop.Value
            await select('comedia')

            const comedia = await goto(0, 'comedia')
            // VFP LOCATE For dia_dia=allTrim(this.Form.tdo_tdo.prop.Value)
            let records = await locateFor(` dia_dia=allTrim(this.Form.tdo_tdo.prop.Value)`)

            if (found() && comedia.tip_dia == 'CH') {
                m = appendM(m, await scatter())// scatter 

                if (comedia.cta_cta == ' ') {
                    let cta_cta = allTrim(cometdo.ctb_tdo)
                    cta_cta = cta_cta + allTrim(vi_cap_cometcd.ctb_tcd)
                    m.mon_dia = vi_cap_cometcd.mon_doc
                } // End If 

                // this.Form.d_sal_cta.prop.Value = Transform(cal_sal_cta(cta_cta, Public.value.fpo_pge, m.mon_dia), '$999,999,999.99 ') + Public.value.des_mon1(mon_dia)
                //this.Form.la_sal_cta.prop.Caption = 'Saldo al ' + Transform(Public.value.fpo_pge, '@e')
                // this.Form.la_sal_cta.prop.Visible = true
                this.Form.d_sal_cta.prop.Visible = true
            } else {

                //this.Form.la_sal_cta.prop.Visible = false
                this.Form.d_sal_cta.prop.Visible = false
            } // End If 

        } else {

            if (this.prop.Value != await oldValue('tcd_tcd', 'vi_cap_comedoc') && vi_cap_comedoc.imp_doc + vi_cap_comedoc.im0_doc + vi_cap_comedoc.im1_doc + vi_cap_comedoc.im2_doc + vi_cap_comedoc.im3_doc + vi_cap_comedoc.im4_doc + vi_cap_comedoc.im5_doc != 0) {
                return false

            } // End If 

            if (cometdo.tip_cfd == 'P' && vi_cap_comedoc.key_pri) {
                // Si es un CFDI de pago Busca las cuentas propias donde se haran los depositos
                m.cop_nom = 'N'
                m.cod_nom = space(12)

                m = appendM(m, await goto(0, 'vi_cap_cometcd'))// scatter 

                if (m.cba_cba > 0) {
                    // si  hay cuenta bancaria

                    const lla1_cba = await use('lla1_cba', m) // use lla1_cba lla1_cba
                    if (lla1_cba.mon_cba > 0) {
                        // Inicio replace VFP

                        // await localAlaSql(`update ${Alias} set mon_doc=?  where recno=${Recno} `, [lla1_cba.mon_cba])
                        // await localAlaSql(`update ${Alias} set vmo_doc=?  where recno=${Recno} `, [Public.value.val_mon1(vi_cap_comedoc.mon_doc)])

                        await updateCampo(lla1_cba.mon_cba, 'vi_cap_comedoc.mon_doc', Recno)
                        await updateCampo(Public.value.val_mon1[vi_cap_comedoc.mon_doc], 'vi_cap_comedoc.vmo_doc', Recno)

                    } else {
                        MessageBox(this.prop.Messages[0], 32, this.prop.Messages[1], 5000)
                    } // End If 
                    return true
                } else {
                    //  await localAlaSql(`update ${Alias} set vi_cap_comedoc.mon_doc=? , vi_cap_comedoc.vmo_doc=?  where recno=${Recno} `, [1, 1])
                    await updateCampo(1, 'vi_cap_comedoc.mon_doc', Recno)
                    await updateCampo(1, 'vi_cap_comedoc.vmo_doc', Recno)

                } // End If 

                rfetur
            }


            // End If 

        } // End If 

        if (vi_cap_comedoc.key_pri == 0)
            this.prop.Value = vi_cap_cometcd.tcd_tcd

        this.Form.cba_cba.prop.Valid = true
        this.Form.cba_cba.prop.ReadOnly = true

        this.Form.che_doc.prop.Valid = true
        this.Form.che_doc.prop.ReadOnly = true

        return true

    }   // Fin Procedure

    //metodo
}