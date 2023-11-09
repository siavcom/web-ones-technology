//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : COLUMN
// Class : eau_tap
// Description : Estatus autorización
// Author : El Fer Blocks
// Creation : 2023-07-10
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COLUMN } from '@/classes/Column'

export class est_apy extends COLUMN {

    constructor() {
        super()
   
       // const nom_ind=renglon[i]['nom_ind']
         
        this.textLabel = 'Estatus' // Column Header
        this.prop.Type ='text'
        this.prop.BaseClass = 'comboBox'
        this.prop.ControlSource = 'vi_cap_comeapy.est_apy'
        this.prop.RowSource=''
        this.prop.RowSourceType=5
        

        this.prop.Capture=true
        this.prop.updateKey=false
        this.style.zIndex = 1
        this.style.width='100px'
    }

    async init() {
      if (!this.Form.db.View.vi_cap_cometap){
         await this.Form.db.useNodata('vi_cap_cometap')
         return
      }

      const data=await this.Form.db.localAlaSql(`select est_tap from vi_cap_cometap where tap_tap='${this.Parent.tap_tap.prop.Value}'`)
      this.prop.RowSource=eval(data[0].est_tap)
      return 
    }

    async when() {
      this.init()
      return super.when() 
    }

}
