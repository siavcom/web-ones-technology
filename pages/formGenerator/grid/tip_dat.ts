//////////////////////////////////////////////
// Clase : tip_dat
// Descripcion : Tipo de dato
// Author : Fernando Cuadras Angulo
// Creacion : Mayo/2022
// Ult.Mod  16/Junio/2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from '@/classes/Column'

export class tip_dat extends COLUMN {

    //  constructor(parent: Record<string, never>) {
    constructor() {
        super()
        this.prop.Order = 2
        this.textLabel = 'Tipo de dato'
        this.prop.BaseClass = 'comboBox'
        this.prop.ToolTipText ='Tipo de dato'
        this.prop.Placeholder = "Tipo de dato"

        this.prop.RowSource = [
            ["Character", "Varchar", "Numeric", "Date", "Integer","TimeStamp",'Text','Logical'],
            ["C", "V", "N", "D", "I","T","M","L"],
          ]; // vi_cap_doc.tdo_tdo,des_tdo
        this.prop.ControlSource = 'vi_cap_for.tip_dat'
        this.prop.ReadOnly=true 
        this.prop.RowSourceType = 5; //1-Value, 2-Alias, 5-Array
        this.prop.ColumnCount = 2;
        this.prop.BoundColumn = 2;
        this.prop.ColumnWidths='95%,0%'        
        this.style.width = '80px' /* width/height  - initial value: auto */
    }

    ////////////////////////////////// 
    // Evento When
    ///////////////////////////////////
    async when() { 
      this.prop.ReadOnly=await !this.Parent.cam_dat.when() 
    return !this.prop.ReadOnly
       //   await super.when(row)
  }




}
