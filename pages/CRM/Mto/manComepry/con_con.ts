//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class : con_con
// Description : Consigantario
// Author : El Fer Blocks
// Creation : 2023-07-20
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { captureComponent } from '@/classes/captureComponent'


export class con_con extends captureComponent {


    constructor() {
        super()
   
       // const nom_ind=renglon[i]['nom_ind']
         
        this.prop.textLabel = 'Consignatario'
        this.prop.Type ='number'
        this.prop.BaseClass = 'editText'
        this.prop.ControlSource = 'vi_cap_comepry.con_con'
        this.prop.Placeholder = 'NUMERO DE CONSIGNATARIO'
        this.prop.ToolTipText ='NUMERO DE CONSIGNATARIO'
       // this.prop.MaxLength=4
        this.prop.Decimals=0
        this.prop.Capture=true
        this.prop.updateKey=false
        this.prop.componentStyle.width='60px' 
        

    }

   
    
  ////////////////////////////////// 
  // event valid 
  ///////////////////////////////////

  async valid() {
    this.Form.noc_con.Recno=0
    if (this.prop.Value==0)
       return true

    const cop_nom=this.Form.cop_nom.prop.Value   //publicVar.cop_nom //.trim()
    const cod_nom=this.Form.cod_nom.prop.Value //.trim()
    const con_con=this.prop.Value

    const m={cop_nom,cod_nom,con_con}
    const data=await this.Form.db.use('lla1_con',m)
    if (data.length==0) {
        this.prop.ErrorMessage='No existe'
        return false
    }
    this.Form.noc_con.Recno=data[0].recno
    return true    
   }
  
}
