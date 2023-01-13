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
        this.prop.Type='number'
        this.prop.Min='0'
        this.prop.Decimals=0
        this.prop.ControlSource = 'vi_cap_dat.lon_dat'
        this.prop.ToolTipText ='Logitud del campo'
        this.prop.Placeholder = "Longitud del campo"
        this.prop.Value=+0

        
        //this.style.flexBasis = '30%' /* width/height  - initial value: auto */
        this.style.width='50px'
    }

    ////////////////////////////////// 
    // Evento When
    ///////////////////////////////////
    async when() { 
        if (this.Parent.tip_dat.Value=='T' || this.Parent.tip_dat.Value=='D' )
        {this.prop.Value='8'
        this.prop.ReadOnly=true
        this.prop.Valid=true
        
        return !this.prop.ReadOnly    
        }



        await this.Parent.cam_dat.when()
        this.prop.ReadOnly = await this.Parent.cam_dat.prop.ReadOnly
        return !this.prop.ReadOnly
    }


    async valid() {

        if (this.prop.Value==0){
            this.prop.ErrorMessage='El tamaño debe ser mayot a 0'
            this.prop.Valid=false

            //console.log('ErrorMessage VALID ====>',this.prop.ErrorMessage)
            return false
        }
           return true
      }

}
