//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : COLUMN
// Class : tap_tap
// Description : Tipo de actividad
// Author : El Fer Blocks
// Creation : 2023-07-10
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COLUMN } from '@/classes/Column'

export class tap_tap extends COLUMN {

    constructor() {
        super()
   
       // const nom_ind=renglon[i]['nom_ind']
         
        this.textLabel = 'Actividad' // Column Header
        this.prop.Type ='text'
        this.prop.BaseClass = 'comboBox'
        this.prop.ControlSource = 'vi_cap_comeapy.tap_tap'
       

        this.prop.ColumnCount = 2;
        this.prop.BoundColumn = 2;
        this.prop.ColumnWidths ="80%,20%"
        this.style.zIndex = 1
        this.style.width='200px'


    }
    /*
   async init() {
     if (this.prop.Value>' '){
         const data=await this.Form.localAlaSql(`select des_tab,tap_tap from vi_cap_cometap where tap_tap='${this.prop.Value}' `)
         this.prop.RowSource=[[data[0].des_tab],[data[0].tap_tab]]

     }

    }
    */
     async when() {
 
         const des_tap=await this.Form.localAlaSql(`select des_tap from vi_cap_cometap order by des_tap`)
         const tap_tap=await this.Form.localAlaSql(`select tap_tap from vi_cap_cometap order by des_tap`)
         this.prop.RowSource=[des_tap,tap_tap]

         return super.when()
     }


}
