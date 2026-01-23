//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// @baseClass  : t_combobox
// @class : c_tia_pag
// Description : Componente c_tia_pag
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 24/07/25
// Update Date  :
/////////////////////////////////////////////
// import { COLUMN } from "@/classes/Column";

import { COLUMN } from "@/classes/Column";
//imports

export class c_tia_pag extends COLUMN {
    //public
    constructor() {
        super();
        this.prop.BaseClass = "comboBox";
        this.prop.ColumnTextLabel = "Docto.";
        this.prop.BoundColumn = 2;
        this.prop.ColumnCount = 2;
        this.prop.ColumnWidths = "128px,60px";
        this.prop.ControlSource = "vi_cap_comepag.tia_pag";
        this.prop.RowSource = "doc_ppagar.des_tdo,tdo_tdo";
        // this.prop.UpdateKey = true
        this.prop.RowSourceType = 2;
        //this.prop.Value=doc_ppagar.tdo_tdo;
        this.style.width = '128px';

        //propiedades
    }

    override async when() {
        const m = await goto(this.Recno, 'vi_cap_comepag')
        if (m.key_pri > 0)
            return false
        return true
    }


    /*
        // Evento   : Valid
        // Objeto  : tia_pag
        // Tipo   : T_combobox
        async valid_old() {
            super.valid(true)
            let m = {}   // inicializamos m
    
            let Recno = 0
            let Alias = ''
    
            if (this.Form.prop.key == 27) {
                return true
    
            } // End If 
    
            if (this.prop.Valid == true && this.prop.Value == await oldValue(this.prop.Name)) {
                return true
    
            } // End If 
    
            this.prop.Valid = false
            // apagamos validaciones
            this.Parent.c_nua_pag.prop.Valid = false
            if (this.prop.Value == '  ') {
                // apagamos validacion de número de documento
                return true
    
            } // End If 
    
            let res = await localAlaSql("INSERT INTO resultado select tdo_tdo , des_tdo from doc_ppagar where tdo_tdo = this.prop.Value")
    
            if (await recCount('resultado') > 0) {
                res = await goto(0, 'resultado')
                // Inicio replace VFP
                const Recno = await recNo()
                const Alias = await alias()
                await localAlaSql(`update ${Alias} set vi_cap_comepag.des_tdo=?  where recno=${Recno} `, [res.des_tdo])
    
                await select('resultado')
    
                releaseUse() // use 
    
                this.prop.Valid = true
                this.Form.ap_pagos.rev_val()
                // va a revicion de validación
                return true
    
            } // End If 
    
            await select('resultado')
            releaseUse() // use 
            return false
    
        }   // Fin Procedure
    */
    //metodo

}