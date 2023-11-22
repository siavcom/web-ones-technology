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
        this.prop.RowSourceType= 4
        this.prop.RowSource='select des_tap,tap_tap from vi_cap_cometap order by des_tap'
        this.prop.ColumnCount = 2;
        this.prop.BoundColumn = 2;
        this.prop.ColumnWidths ="80%,20%"
        this.style.zIndex = 1
        this.style.width='200px'
   }

     async when() {
         
 //        const des_tap=await this.Sql.localAlaSql(`select des_tap from vi_cap_cometap order by des_tap`)
 //        const tap_tap=await this.Sql.localAlaSql(`select tap_tap from vi_cap_cometap order by des_tap`)
 //        this.prop.RowSource=[des_tap,tap_tap]

         return super.when()
     }

     async interactiveChange() {
        const data=await this.Sql.localAlaSql(`select est_tap from vi_cap_cometap where tap_tap='${this.prop.Value}'`)
      
        this.Parent.est_apy.prop.RowSource=eval(data[0].est_tap)
        this.prop.Valid=true

    }





}
