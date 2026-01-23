//////////////////////////////////////////////
// Clase : wri_dat
// Descripcion : Es de escritura el campo 
// @author: Fernando Cuadras Angulo
// Creacion : Mayo/2022
// Ult.Mod  02/Mayo /2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from '@/classes/Column'


export class wri_dat extends COLUMN {

    //  constructor(parent: Record<string, never>) {
    constructor() {
        super()
        this.prop.Order = 2
        this.prop.ColumnTextLabel = 'Insert/Update'
        this.prop.BaseClass = "comboBox";
        this.prop.ControlSource = 'vi_cap_comedat.wri_dat'
        this.prop.RowSource = [
            ["None",
                "Insert",
                "Update",
                "Insert/Update",
            ],
            [0, 1, 2, 3],
        ]; // vi_cap_doc.tdo_tdo,des_tdo
        this.prop.RowSourceType = 5; //1-Value, 2-Alias, 5-Array
        this.prop.ColumnCount = 2;
        this.prop.BoundColumn = 2;
        this.prop.ColumnWidths = "80%,10%";
        this.style.width = '124px'
    }

    ////////////////////////////////// 
    // Evento When
    ///////////////////////////////////
    async when() {
        this.prop.Valid = true
        if (!this.prop.ReadOnly! && !await this.Parent.cam_dat.when()) {
            this.prop.ReadOnly = true
            this.prop.Valid = true
        }
        return !this.prop.ReadOnly

    }

}
