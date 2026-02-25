//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// @baseClass  : comboBox
// @class : tcd_tcd
// Description : Componente tcd_tcd
// @author: El Fer Blocks (Fernando Cuadras)
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
        this.prop.Visible = false
        this.prop.RowSource = "vi_cap_cometcd.des_tcd,tcd_tcd";
        this.prop.RowSourceType = 0;
        this.prop.BoundColumn = 2;
        this.prop.ColumnCount = 2;
        this.prop.ColumnWidths = "200px,20px";
        this.prop.Value = '  '

        this.prop.Messages[0] = 'No tiene definida la moneda la cuenta bancaria'
        this.prop.Messages[1] = 'Adverencia'
        //propiedades
    }

    // Evento   :GotFocues
    // Objeto  :tcd_tcd
    // Tipo   :ComboBox
    // Comentarios :si tiene clasificación de documentos permite escojer clasificación de documentos
    override async when() {
        let m = {}   // inicializamos m
        console.log('tcd_tcd when() this.Recno=', this.Recno)
        if (recCount('vi_cap_cometcd') == 0) { // No hay tabla de clasificacion de documentos
            this.prop.Valid = true
            return false
        }
        await goto('Top', 'vi_cap_cometcd')
        const vi_cap_comedoc = await currentValue('*', 'vi_cap_comedoc')
        const vi_cap_cometcd = await currentValue('*', 'vi_cap_cometcd')


        const ReadOnly = this.prop.ReadOnly ? this.prop.ReadOnly : await !this.Form.rev_per(this.prop.Name)

        /**********************
               if (this.prop.ReadOnly) {
            this.prop.Valid = true

            if (cometdo.tip_cfd == 'P' && vi_cap_comedoc.key_pri > 0) { // Pago
                m.cop_nom = 'N'
                m.cod_nom = space(12)

                m = {...m, ...vi_cap_cometcd }// scatter 

                // Si hay cuenta bancaria
                if (vi_cap_cometcd.cba_cba > 0) {
                    await use('lla1_cba', m) // use lla1_cba lla1_cba
                    const lla1_cba = await goto(0, 'lla1_cba')

                    // Hay cuenta bancaria
                    if (lla1_cba.mon_cba != null) {

                        this.Form.mon_doc.prop.Value = lla1_cba.mon_cba
                        this.Form.vmo_doc.prop.Value = Public.value.val_mon1[lla1_cba.mon_cba]

                        // await localAlaSql(`update ${Alias} set mon_doc=?  where recno=${Recno} `, [lla1_cba.mon_cba])
                        //await updateCampo(lla1_cba.mon_cba, 'vi_cap_comedoc.mon_doc', Recno)
                        //await localAlaSql(`update ${Alias} set vmo_doc=?  where recno=${Recno} `, [Public.value.val_mon1(vi_cap_comedoc.mon_doc)])
                        //await updateCampo(Public.value.val_mon1[vi_cap_comedoc.mon_doc], 'vi_cap_comedoc.vmo_doc', Recno)

                    } else {
                        //this.prop.Messages[0]='No tiene definida la moneda la cuenta bancaria'
                        MessageBox(this.prop.Messages[0], 32, this.prop.Messages[1], 5000)
                    } // End If 

                } else {

                    //   await localAlaSql(`update ${Alias} set vi_cap_comedoc.mon_doc=? , vi_cap_comedoc.vmo_doc=?  where recno=${Recno} `, [1, 1])
                    //await updateCampo(1, 'vi_cap_comedoc.mon_doc', Recno)
                    //await updateCampo(1, 'vi_cap_comedoc.vmo_doc', Recno)

                    this.Form.mon_doc.prop.Value = 1
                    this.Form.mon_doc.prop.Value = 1

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
            return false  //Solo de lectura

        } // End If 

*******************/


        /*******************
        
                if (Public.value.pct_pct == 1 && this.Form.prop.tip_cap == 'P') { // Si tiene contabilidad  y es proveedor, calcula saldo de chequera
        
                    m.tdo_tdo = this.Form.tdo_tdo.prop.Value
        
                    // VFP LOCATE For dia_dia=allTrim(this.Form.tdo_tdo.prop.Value)
                    // Busca el diario en contabilidad
                    const comedia = await locateFor(` dia_dia='allTrim(${this.Form.tdo_tdo.prop.Value})'`, 'comedia')
        
                    if (comedia[0] && comedia[0].tip_dia == 'CH') { // Si el diario es un cheque
                        m = {...m, ...comedia[0]}// scatter 
        
                        if (m.cta_cta == ' ') { // formamos la cuenta de contabilidad
                            m.cta_cta = cometdo.ctb_tdo.trim()
                            m.cta_cta = m.cta_cta + vi_cap_cometcd.ctb_tcd.trim()
                            m.mon_dia = vi_cap_cometcd.mon_doc
                        } // End If 
        
                        this.Form.d_sal_cta.prop.Value =cal_sal_cta(m.cta_cta, Public.value.fpo_pge, m.mon_dia)
                        this.Form.d_sal_cta.prop.Currency=Public.value.des_mon1(m.mon_dia) //  , '$999,999,999.99 ') + Public.value.des_mon1(mon_dia)
                        
                        
                         this.Form.d_sal_cta.prop.Caption = 'Saldo al ' + new Date(Public.value.fpo_pge).toISOString().split('T')[0]
                        // this.Form.la_sal_cta.prop.Visible = true
                        this.Form.d_sal_cta.prop.Visible = true
                    } else {
        
                        //this.Form.la_sal_cta.prop.Visible = false
                        this.Form.d_sal_cta.prop.Visible = false
                    } // End If 
        
                } else { // Si no tiene contabilidad
        
                    if (this.prop.Value != await oldValue('tcd_tcd', 'vi_cap_comedoc') && this.Form.d_tot_doc.prop.Value != 0) {
                        return false
        
                    } // End If 
        
                    if (cometdo.tip_cfd == 'P' && vi_cap_comedoc.key_pri) {
                        // Si es un CFDI de pago Busca las cuentas propias donde se haran los depositos
                        m.cop_nom = 'N'
                        m.cod_nom = space(12)
        
                        m = appendM(m, await goto(0, 'vi_cap_cometcd'))// scatter 
        
                        if (m.cba_cba > 0) { // si  hay cuenta bancaria
        
                            const lla1_cba = await use('lla1_cba', m) // use lla1_cba lla1_cba
                            if (lla1_cba.mon_cba > 0) {
                                // Inicio replace VFP
        
                                // await localAlaSql(`update ${Alias} set mon_doc=?  where recno=${Recno} `, [lla1_cba.mon_cba])
                                // await localAlaSql(`update ${Alias} set vmo_doc=?  where recno=${Recno} `, [Public.value.val_mon1(vi_cap_comedoc.mon_doc)])
        
                                this.Form.mon_doc.prop.Value = lla1_cba.mon_cba  // asignamos moneda
                                this.Form.vmo_doc.prop.Value = Public.value.val_mon1[vi_cap_comedoc.mon_doc]  // asignamos valor de la moneda
        
                                //await updateCampo(lla1_cba.mon_cba, 'vi_cap_comedoc.mon_doc', Recno)
                                //await updateCampo(Public.value.val_mon1[vi_cap_comedoc.mon_doc], 'vi_cap_comedoc.vmo_doc', Recno)
        
                            } else {
                                MessageBox(this.prop.Messages[0], 32, this.prop.Messages[1], 5000)
                            } // End If 
                            return true
                        } else { // No hay cuenta bancaria
                            //  await localAlaSql(`update ${Alias} set vi_cap_comedoc.mon_doc=? , vi_cap_comedoc.vmo_doc=?  where recno=${Recno} `, [1, 1])
                            this.Form.mon_doc.prop.Value = 1  // asignamos moneda
                            this.Form.vmo_doc.prop.Value = 1  // asignamos valor de la moneda
        
                            //                    await updateCampo(1, 'vi_cap_comedoc.mon_doc', Recno)
                            //                    await updateCampo(1, 'vi_cap_comedoc.vmo_doc', Recno)
        
                        } // End If 
        
                        return true
                    }
        
        
                    // End If 
        
                } // End If 
        
          **********/

        if (vi_cap_comedoc.key_pri == 0) {
            this.prop.Value = vi_cap_cometcd.tcd_tcd
            console.log('tcd_tcd when vi_cap_cometcd', vi_cap_cometcd)
        }

        this.Form.cba_cba.prop.Valid = true
        this.Form.cba_cba.prop.ReadOnly = true

        this.Form.che_doc.prop.Valid = true
        this.Form.che_doc.prop.ReadOnly = true

        if (ReadOnly)
            this.prop.Valid = await this.Valid()

        return !ReadOnly

    }   // Fin Procedure


    // Evento   :Valid
    override async valid(sw_rel?: boolean) {
        //  debugger
        let m = {}   // inicializamos m
        console.log('valid tcd_tcd=', this.prop.Value)
        if (this.prop.Value.trim() == '')
            return true
        this.prop.Value = this.prop.Value.trim()
        const vi_cap_comedoc = await currentValue('*', 'vi_cap_comedoc')
        const data = await locateFor(`trim(tcd_tcd)='${this.prop.Value}'`, 'vi_cap_cometcd')
        if (data.length > 0) {
            console.log('valid tcd_tcd this.prop.Value=', this.prop.Value, 'data=', data, 'vi_cap_cometcd=', await localAlaSql('select * from vi_cap_cometcd'))
            if (!data[0].mon_doc) {
                this.Form.mon_doc.prop.Value = 1
                return true
            }
            this.Form.mon_doc.prop.Value = data[0].mon_doc
        } else {
            this.prop.Value = '  '
            return true
        }



        const cometdo = await goto(0, 'cometdo')

        if (Public.value.pct_pct == 1 && this.Form.prop.tip_cap == 'P') {     // Si tiene contabilidad  && calcula saldo de chequera
            m.tdo_tdo = this.Form.tdo_tdo.prop.Value
            // VFP LOCATE For dia_dia=allTrim(this.Form.tdo_tdo.prop.Value)
            const records = await locateFor(`dia_dia="${this.Form.tdo_tdo.prop.Value.trim()}"`, 'comedia')

            if (records.records[0] && records[0].tip_dia == 'CH') {
                m = appendM(m, reccord[0])// scatter 
                let cta_cta = records[0].cta_cta.trim()
                if (cta_cta.length == 0) {
                    cta_cta = cometdo.ctb_tdo.trim()
                    cta_cta = cta_cta + cometcd.ctb_tcd.trim()
                    m.mon_dia = cometcd.mon_doc
                } // End If 

                this.Form.d_sal_cta.prop.Value = await cal_sal_cta(cta_cta, Public.value.fpo_pge, m.mon_dia)
                this.Form.d_sal_cta.prop.Currency = Public.value.des_mon1[comedia.mon_dia]
                this.Form.d_sal_cta.prop.Caption = 'Saldo al ' + new Date(Public.value.fpo_pge).toISOString().split('T')[0]
                this.Form.d_sal_cta.prop.Visible = true
            } else {
                this.Form.d_sal_cta.prop.Visible = false
            } // End If 

        } // End If 

        if (cometdo.tip_cfd.trim() == 'P' && (vi_cap_comedoc.key_pri == 0 || this.prop.Value != await oldValue('tcd_tcd', 'vi_cap_comedoc'))) {

            //  m = { ...vi_cap_comedoc }// scatter 
            //  m.cop_nom = 'N'
            //  m.cod_nom = space(12)

            m = { ...await currentValue('*', 'vi_cap_cometcd') }// scatter 

            if (m.cba_cba > 0) {  // si  hay cuenta bancaria
                this.Form.mon_doc.prop.Value = m.mon_cba

                /*              await use('vi_cap_comecba', m) // use lla1_cba lla1_cba
                const lla1_cba = await currentValue('*', 'vi_cap_comecba')

                if (lla1_cba.key_pri && lla1_cba.key_pri > 0) {
                    this.Form.mon_doc.prop.Value = lla1_cba.mon_cba
                } else {
                    MessageBox(this.prop.Messages[0], 16, 'Error', 5000)
                    return false
                } // End If 
*/

            } else { // Moneda principal
                this.Form.mon_doc.prop.Value = 1

            } // End If 

            await this.Form.mon_doc.valid()
        } // End If 

        if (this.Form.sw_pga && await recNo('vi_cap_cometcd') > 0) { // Presupuesto de gasto
            const vi_cap_cometcd = await currentValue('*', 'vi_cap_cometcd')
            await updateCampo(vi_cap_cometcd.pga_pga, 'vi_cap_comedoc.pga_pga', vi_cap_comedoc.recno)
            //await localAlaSql(`update vi_cap_comedoc set pga_pga=?  where recno=${vi_cap_comedoc.recno} `, [vi_cap_cometcd.pga_pga])
        } // End If 
        return true

    }   // Fin Procedure
    //metodo
}