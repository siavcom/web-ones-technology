//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class : cod_nom
// Description : Código
// Author : El Fer Blocks
// Creation : 2023-07-20
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { captureComponent } from '@/classes/captureComponent'


export class cod_nom extends captureComponent {

  constructor() {
    super()

    // const nom_ind=renglon[i]['nom_ind']

    this.prop.textLabel = 'Código'
    this.prop.Type = 'text'
    this.prop.BaseClass = 'editText'
    this.prop.ControlSource = 'vi_cap_comepry.cod_nom'
    this.prop.ToolTipText = 'Codigo del cliente/proveedor'
    this.prop.MaxLength = 12
    this.prop.Decimals = 0
    this.prop.Capture = true
    this.prop.updateKey = false
    this.prop.ErrorMessage='No existe'
  }

  ////////////////////////////////// 
  // event valid 610230
  ///////////////////////////////////

  async valid() {
    this.Form.nom_nom.Recno=0
    let cod_nom=this.prop.Value //.trim()
    if (cod_nom.length==0){
       this.prop.Valid=false
       return false
    }   
    
    const m={cop_nom:this.Form.cop_nom,
              cod_nom}
    const data=await this.Form.db.use('lla1_nom',m)

    if (data.length==0) {
        this.prop.Valid=false  
        return false
    }
    this.Form.nom_nom.Recno=data[0].recno
    this.prop.Valid=true
    return this.prop.Valid   
//    cod_nom='0'.repeat(cod_nom.length-6)
   }
 
}
