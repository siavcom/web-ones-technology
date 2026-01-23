//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// @baseClass  : t_textbox
// @class : c_nua_pag
// Description : Componente c_nua_pag
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 24/07/25
// Update Date  :
/////////////////////////////////////////////
// import { COLUMN } from "@/classes/Column";

import { COLUMN } from "@/classes/Column";
//imports

export class c_nua_pag extends COLUMN {
    //public
    constructor() {
        super();
        this.prop.Type = "number";
        this.prop.ColumnTextLabel = "Número";
        this.prop.Decimals = 0
        this.prop.ControlSource = "vi_cap_comepag.nua_pag";
        this.prop.ErrorMessage = "Documento inválido";
        this.prop.Min = '1'
        this.prop.Max = '99999999'
        // this.prop.UpdateKey = true
        this.prop.InputMask = "999,999,999";
        this.style.width = '64px'
        this.prop.Messages[0] = 'No pertenece al mismo código de cliente o proveedor'
        //propiedades
    }


    // Evento   : Valid
    // Objeto  : Text
    // Tipo   : Cuadro de texto
    // Pertenece  : Grid
    // Comentarios : Es la validación de la llave principal
    override async valid() {

        console.log('valid c_nua_pag vcomesal=', await localAlaSql(`select * from now.vcomesal`))
        if (!await super.valid()) {
            return false
        }

        let m = {}   // inicializamos m
        let Recno = this.Recno
        let Alias = ''

        const vi_cap_comedoc = await goto(0, 'vi_cap_comedoc')
        // DIMENSION val_mon ( 5 ) 
        const val_mon = []
        val_mon[1] = 1
        val_mon[2] = vi_cap_comedoc.vm2_doc
        val_mon[3] = vi_cap_comedoc.vm3_doc
        val_mon[4] = vi_cap_comedoc.vm4_doc
        val_mon[5] = vi_cap_comedoc.vm5_doc

        if (this.Form.prop.key == 27 || this.Form.prop.key == 15 || this.Form.prop.key == 19) {
            return true

        } // End If 

        // si esta validado el campo y no cambio el valor
        if (this.prop.Value == await oldValue('nua_pag', 'vi_cap_comepag')) {
            return true

        } // End If 
        /*
                m.tdo_tdo = vi_cap_comedoc.tdo_tdo
                // asignamos el tipo de documento del pago
                m.ndo_doc = vi_cap_comedoc.ndo_doc
                // asignamos el tipo de documento del pago
        */

        const vi_cap_comepag = await goto(0, 'vi_cap_comepag')

        m.tdo_tdo = vi_cap_comepag.tia_pag
        // asignamos el tipo de documento pagado
        m.ndo_doc = vi_cap_comepag.nua_pag
        // asignamos el número de documento pagado
        /*
                const vi_cap_comepag=await goto(0,'vi_cap_comepag')
                let res=await localAlaSql(`select recno from vi_cap_comepag where tdo_tdo='${m.tdo_tdo}' and ndo_doc=${m.ndo_doc} and recno<>${vi_cap_comepag[0].recno}`)
                
                if (res.length>0) {
                    return false
                }
                */

        const ins_sql = `select * from vcomesal saldo_doc \
              where tdo_tdo='${m.tdo_tdo}' and ndo_doc=${m.ndo_doc} `

        const res = await SQLExec(ins_sql)

        if (res.length == 0) {
            return false
        }

        if (res[0].cod_nom != vi_cap_comedoc.cod_nom) {
            // reviza si es el mismo código
            MessageBox('', 16, this.prop.Messages[0])
            return false

        } // End If 

        let sal_doc = res[0].pag_doc
        let mon_doc = res[0].mon_doc
        sal_doc = sal_doc * val_mon[mon_doc] / val_mon[vi_cap_comedoc.mon_doc]

        /*
        await updateCampo(sal_doc, 'vi_cap_comepag.sal_doc', Recno)
        await updateCampo(res[0].fec_doc, 'vi_cap_comepag.fec_doc', Recno)
        await updateCampo(res[0].fve_doc, 'vi_cap_comepag.fve_doc', Recno)
        await updateCampo(res[0].ref_doc, 'vi_cap_comepag.ref_doc', Recno)
   */
        this.Parent.c_sal_doc.prop.Value = sal_doc
        this.Parent.c_fec_doc.prop.Value = res[0].fec_doc
        this.Parent.c_fve_doc.prop.Value = res[0].fve_doc
        this.Parent.c_ref_doc.prop.Value = res[0].ref_doc

        updateCampo(sal_doc, 'vi_cap_comepag.sal_doc', Recno)
        updateCampo(res[0].fec_doc, 'vi_cap_comepag.fec_doc', Recno)
        updateCampo(res[0].fve_doc, 'vi_cap_comepag.fve_doc', Recno)
        updateCampo(res[0].ref_doc, 'vi_cap_comepag.ref_doc', Recno)

        if (sal_doc >= this.Form.d_pap_doc.prop.Value)
            this.Parent.c_mon_pag.prop.Value = this.Form.d_pap_doc.prop.Value
        //await updateCampo(this.Form.d_pap_doc.prop.Value, 'vi_cap_comepag.mon_pag', Recno)
        else
            this.Parent.c_mon_pag.prop.Value = sal_doc
        //await updateCampo(sal_doc, 'vi_cap_comepag.mon_pag', Recno)

        this.Parent.c_tia_pag.prop.Valid = true
        this.Parent.c_mon_pag.prop.Valid = false
        return true
        // dato valido


    }   // Fin Procedure

    // Evento   : When
    // Objeto  : Text
    // Tipo   : Cuadro de texto
    override async when() {
        const m = await goto(this.Recno, 'vi_cap_comepag')
        if (m.key_pri > 0)  // ya esta grabado el registro
            return false

        // inicializamos m
        if (this.Parent.c_tia_pag.prop.Valid == false) {
            this.prop.Valid = false
            return false

        } // End If 

        return true

    }   // Fin Procedure

    //metodo
}