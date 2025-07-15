//////////////////////////////////////////////
// Clase : gru_dat
// Descripcion : Valor incial en typescript insertarse el registro nuevo en VUE 
// Author : Fernando Cuadras Angulo
// Creacion : Mayo/2022
// Ult.Mod  02/Mayo /2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from '@/classes/Column'


export class vue_dat extends COLUMN {

    //  constructor(parent: Record<string, never>) {
    constructor() {
        super()
        this.prop.Order = 3
        this.prop.ColumnTextLabel = 'Valor default Typescript'
        this.prop.Type = 'textArea'
        this.prop.ControlSource = 'vi_cap_comedat.vue_dat'
        this.prop.ToolTipText = 'Valor dafault en typescript al insertarse el registro nuevo en VUE'
        this.prop.Placeholder = "Valor default"
        this.style.width = '200px'
    }

    ////////////////////////////////// 
    // Evento When 
    ///////////////////////////////////
    override async when() {
        this.prop.Valid = true


        if (this.Parent.def_dat.prop.Value.trim() + this.Parent.cal_dat.prop.Value.trim() != '') {
            this.prop.ReadOnly = true
        }

        if (!this.prop.ReadOnly! && !await this.Parent.cam_dat.when()) {
            this.prop.ReadOnly = true
            this.prop.Valid = true
        }



        /*
                const Value = this.Parent.cam_dat.prop.Value.trim().toUpperCase();
                if (
                    Value == "USU_USU" ||
                    Value == "USU_CRE" ||
                    Value == "TIE_UAC" ||
                    Value == "TIE_CRE" ||
                    Value == "TIMESTAMP" ||
                    Value == "KEY_PRI"
                )
                    this.prop.ReadOnly = true;
        */
        console.log('when vue_dat=', this.Parent.def_dat.prop.Value.trim() + this.Parent.cal_dat.prop.Value.trim(), 'ReadOnly=', this.prop.ReadOnly)

        // else

        //     this.prop.ReadOnly = !await this.Parent.cam_dat.when()

        return !this.prop.ReadOnly
    }

    override async valid(): Promise<any> {
        if (this.prop.Value.trim() > '   ') {

            this.Parent.cal_dat.prop.Value = ''
            this.Parent.cal_dat.prop.ReadOnly = true
            this.Parent.cal_dat.prop.Valid = true

            this.Parent.def_dat.prop.Value = ''
            this.Parent.def_dat.prop.ReadOnly = true
            this.Parent.def_dat.prop.Valid = true
        } else {
            this.Parent.cal_dat.prop.ReadOnly = false
            this.Parent.def_dat.prop.ReadOnly = false
        }

        return true

    }


}
