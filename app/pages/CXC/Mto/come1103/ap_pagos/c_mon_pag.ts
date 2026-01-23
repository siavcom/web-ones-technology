//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// @baseClass  : t_textbox
// @class : c_mon_pag
// Description : Componente c_mon_pag
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 24/07/25
// Update Date  :
/////////////////////////////////////////////
// import { COLUMN } from "@/classes/Column";

import { COLUMN } from "@/classes/Column";
//imports

export class c_mon_pag extends COLUMN {
    //public
    constructor() {
        super();
        this.prop.ColumnTextLabel = "Monto Aplicar";
        this.prop.Type = "number";

        this.prop.ControlSource = "vi_cap_comepag.mon_pag";
        this.prop.InputMask = "99,999,999.99999";
        this.style.width = '92px';
        this.prop.Min = '0.000001'
        //propiedades
    }

    override async init() {
        this.prop.Decimals = Public.value.dcp_pge
    }

    // Evento   : When
    // Objeto  : Text
    // Tipo   : Cuadro de texto
    override async when() {
        if (this.Recno == 0)
            this.prop.Max = this.Form.d_pap_doc.prop.Value.toString()
        else
            this.prop.Max = (this.prop.Value + this.Form.d_pap_doc.prop.Value).toString()
        console.log('c_mon_pag when Max=', this.prop.Max, 'pap=', this.Form.d_pap_doc.prop.Value)
        return true
    }

    /*
        // Evento   : When
        // Objeto  : Text
        // Tipo   : Cuadro de texto
        override async when() {
            let m = {}   // inicializamos m
            if (this.Parent.c_nua_pag.prop.Valid == false) {
                this.prop.Valid = false
                return false
     
            } // End If 
     
            this.Form.ap_pagos.dat_ant = this.prop.Value
            this.old_value = this.prop.Value
            return true
     
        }   // Fin Procedure
    */

    /*     override async valid() {
     
         let res = await localAlaSql('select sum(mon_pag) AS sal_doc from vi_cap_comepag ')
     
         
         if (res[0].sal_doc > this.Form.d_tot_doc.prop.Value)
             return false
         
         this.Form.d_pap_doc.prop.Value = this.Form.d_tot_doc.prop.Value - this.Form.d_sal_doc.prop.Value
     
         // calcula el saldo de los documentos que se deben
     
         let val_mon = [] // DIMENSION val_mon ( 5 )
         const vi_cap_comedoc = await goto(0, 'vi_cap_comedoc')
     
         val_mon[1] = 1
         val_mon[2] = vi_cap_comedoc.vm2_doc
         val_mon[3] = vi_cap_comedoc.vm3_doc
         val_mon[4] = vi_cap_comedoc.vm4_doc
         val_mon[5] = vi_cap_comedoc.vm5_doc
     
         let ins_sql = "select *,0 as sal_doc from vcomesal where (tdo_tdo='" + vi_cap_comedoc.tdo_tdo + "' and num_doc=" + vi_cap_comedoc.ndo_doc + " and pag_doc>" + this.Form.lim_inf_sal + ') ' + this.Form.con_vcomesal
     
         res = await SQLExec(ins_sql, 'vcomesal_docto')
     
         // await goto('TOP', sqlresult)
     
         ins_sql = `
             update vcomesal_docto set sal_doc=pag_doc*( 
                   1 / ${val_mon[vi_cap_comedoc.mon_doc]} ) where mon_doc=1 ; 
             update vcomesal_docto set sal_doc=pag_doc*( 
                   ${val_mon[2]} / ${val_mon[vi_cap_comedoc.mon_doc]} ) where mon_doc=2 ; 
             update vcomesal_docto set sal_doc=pag_doc*( 
                   ${val_mon[3]} / ${val_mon[vi_cap_comedoc.mon_doc]} ) where mon_doc=3 ;
             update vcomesal_docto set sal_doc=pag_doc*( 
                   ${val_mon[4]} / ${val_mon[vi_cap_comedoc.mon_doc]} ) where mon_doc=4 ; 
              update vcomesal_docto set sal_doc=pag_doc*( 
                   ${val_mon[5]} / ${val_mon[vi_cap_comedoc.mon_doc]} ) where mon_doc=5 ;`
     
         await localAlaSql(ins_sql)
         res = await goto(1, 'vcomesal_docto')
     
         const sal_doc = res.sal_doc
     
         // actualiza el saldo
         if (sal_doc > 0)
             await localAlaSql(`update vcomesal set sal_doc=${sal_doc} where tdo_tdo='${res.tdo_tdo}' and ndo_doc=${res.ndo_doc} `)
         else
             await localAlaSql(`delete from vcomesal  where tdo_tdo='${res.tdo_tdo}' and ndo_doc=${res.ndo_doc} `)
     
         return true
     }
         */
    //metodo
}