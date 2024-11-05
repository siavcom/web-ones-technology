//////////////////////////////////////////////
// Clase : lon_dat
// Descripcion : Longitud del dato
// Author : Fernando Cuadras Angulo
// Creacion : Junio/2022
// Ult.Mod  22/Junio/2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from '@/classes/Column'


export class lon_dat extends COLUMN {

    //  constructor(parent: Record<string, never>) {
    constructor() {
        super()
        this.prop.Order = 4
        this.textLabel = 'Longitud'
        this.prop.BaseClass = 'editText'
        this.prop.Type = 'number'
        this.prop.Min = '1'
        this.prop.Decimals = 0
        this.prop.ControlSource = 'vi_cap_comedat.lon_dat'
        this.prop.ToolTipText = 'Logitud del campo'
        this.prop.Placeholder = "Longitud del campo"
        this.style.width = '50px'
    }

    ////////////////////////////////// 
    // Evento When
    ///////////////////////////////////
    async when() {
        this.prop.ReadOnly = !await this.Parent.cam_dat.when()
        if (!this.prop.ReadOnly) {
            this.prop.Valid = true

            if (this.Parent.tip_dat.prop.Value == 'T' || this.Parent.tip_dat.prop.Value == 'D') {
                this.prop.Value = '8'
                this.prop.ReadOnly = true

            }
            if (this.Parent.tip_dat.prop.Value == 'M') {
                this.prop.Value = '10'
                this.ReadOnly = true

            }
        }

        return !this.prop.ReadOnly
    }


    async valid() {

        if (this.prop.Value == 0) {
            this.prop.ErrorMessage = 'El tamaño debe ser mayor a 0 '
            return false

            //console.log('ErrorMessage VALID ====>',this.prop.ErrorMessage)
        }
        if (this.Parent.tip_dat.prop.Value == 'I' &&
            this.prop.Value != 1 &&
            this.prop.Value != 2 &&
            this.prop.Value != 4) {
            this.prop.ErrorMessage = 'Valores permitidos 1,2 o 4'
            return false
        }

        if (this.Parent.tip_dat.prop.Value == 'V' &&
            this.prop.Value > 8000) {
            this.prop.ErrorMessage = 'Maximo valor permitido 8000'
            return false
        }

        if (this.Parent.tip_dat.prop.Value == 'C') {
            if (this.prop.Value > 8000) {
                this.prop.ErrorMessage = 'Maximo valor permitido 8000'
                return false
            }
            if (this.prop.Value = 0) {
                this.prop.ErrorMessage = 'El valor debe ser mayor a 0'
                return false
            }

        }

        if (this.Parent.tip_dat.prop.Value == 'N' &&
            this.prop.Value + this.Parent.dec_dat.prop.Value > 38) {
            this.prop.ErrorMessage = 'La suma longitud+decimales no debe exeder 38'
            return false
        }

        return true
    }

}
