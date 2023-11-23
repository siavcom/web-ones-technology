//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : COLUMN
// Class : tdo_tdo
// Description : Documento generado
// Author : El Fer Blocks
// Creation : 2023-07-10
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COLUMN } from '@/classes/Column'

export class tdo_tdo extends COLUMN {

    constructor() {
        super()
   
       // const nom_ind=renglon[i]['nom_ind']
         
        this.textLabel = 'Documento generado ' // Column Header
        this.prop.Type ='text'
        this.prop.BaseClass = 'comboBox'
        this.prop.RowSource = "cometdo.des_tdo,tdo_tdo"
        
        this.prop.RowSourceType = 2  //1-Value, 2-Alias,3-sql 5-Array
        this.prop.ControlSource = 'vi_cap_comeapy.tdo_tdo'
         this.prop.ColumnCount = 2;
        this.prop.BoundColumn = 2;
        this.prop.ColumnWidths ="80%,20%"

        this.prop.Capture=true
        this.style.zIndex = 1
        this.style.width='200px'
    }

    async when() {
        this.prop.ReadOnly = this.Parent.tap_tap.when();
        return !this.prop.ReadOnly;
      }

}
