//////////////////////////////////////////////
// Clase : pas_usu
// Author : Fernando Cuadras Angulo
// Creacion : Septiembre/2021
// Ult.Mod  : 01/Noviembre /2021
/////////////////////////////////////////////
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {COMPONENT} from '@/classes/Component'
export class PAS_USU extends COMPONENT {

  name='pas_usu'
  num_int: number;
//  Instance: any = getCurrentInstance();
//  OpenDb = new OpenDb("siavcom.com.mx:58000/", "Demo", "sa", "*****")
//  constructor(parent: Record<string, never>) {
  constructor() {
   super()
    //    this.Parent=Parent.value
    this.prop.BaseClass='editText'
    this.prop.textLabel = "Contraseña"
    this.prop.Type = "password"
    this.prop.Capture = false
    this.prop.Sw_val = false
    this.prop.Status = 'A'
    this.num_int=0
    //this.style.width = '200px'
    this.prop.componentStyle.width= "130px"
  
  }
  public valid = async () => {
    //console.log('pas_usu====>',this.Form)
    const ThisForm = this.Form;
 
    const m:any = {
    }; // :  Record<string, never> ;
/*
    if (this.prop.Value.length==0){
        console.log('Valid pas_usu This.Value.length',this.prop.Value.length)
        ThisForm.pas_usu.prop.ErrorMessage = 'Digite contraseña'
        return false    
      }
*/    
    return this.Form.bt_aceptar.Click()

  }; // fin metodo valid


}
