//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class : est_pry
// Description : Estatus
// Author : El Fer Blocks
// Creation : 2023-07-20
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { captureComponent } from '@/classes/captureComponent'


export class est_pry extends captureComponent {

    constructor() {
        super()
 
        
        this.prop.textLabel = 'Estatus'
        this.prop.Type ='text'
        this.prop.BaseClass = 'comboBox'
        this.prop.ControlSource = 'vi_cap_comepry.est_pry'
        this.prop.RowSourceType = 5 //1-Value, 2-Alias,3-sql 5-Array
        this.prop.RowSource = [["Inicio","Fincado","Conformado","Costeado","Autorizado","Cotizado","Bloqueado","Finalizado"],
                               ["I","F","N","C","A","Z","B","E"]]
        this.prop.ColumnCount = 2;
        this.prop.BoundColumn = 2;

        this.prop.Capture=true
        this.prop.updateKey=false

    }

    async init() {
   
        if (this.prop.Value>' '){
           const data=await this.Form.localAlaSql(`select est_tap from vi_cap_cometap where tap_tap='${this.prop.Value}' `)
           this.prop.RowSource=eval(data[0])
       }
      }


}
