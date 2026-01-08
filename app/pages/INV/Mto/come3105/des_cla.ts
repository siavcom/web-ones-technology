//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// BaseClass : editBox
// Class : des_cla
// Description : Componente des_cla
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 29/05/25
// Update Date  :
/////////////////////////////////////////////
// import {editBox} from "@/classes/editBox";

import { COMPONENT } from "@/classes/Component";
import { help } from '@/classes/Siavcom/help/cla_isu/help'
import { des_des } from './des_des';
//imports

export class des_cla extends COMPONENT {
  public help = new help()
  public des_des = new des_des()   // descripcion desde

  //public
  constructor() {
    super();
    this.prop.BaseClass = "editBox";

    this.prop.Caption = 'Desde el insumo';
    this.prop.Format = "K";
    this.prop.InputMask = (Public.value.ima_pge);
    this.prop.Help = true;
    this.prop.Name = "des_cla";
    this.prop.Visible = false;
    this.inputStyle.width = "128px"// "218px" // Son 30 puntos del icono de ayuda
    this.style.width = "max-content"


    //propiedades
  }
  override async when() {
    this.Form.Captura_alm.prop.RecordSource = ''  // asignamos la tabla de captura de movimientos 

    return true
  }   // Fin Procedure


  // Evento   :Valid 
  // Objeto  :cla_fam 
  // Comentarios : 

  override async valid() {
    let m = {}   // inicializamos m

    this.des_des.prop.Value = ''
    m.cla_isu = this.prop.Value
    const data = await use('vi_cap_comeisu', m) // use vi_cap_comeisu vi_cap_comeisu
    if (recCount() > 0) {
      this.prop.Value = data[0].cla_isu
      this.des_des.prop.Value = data[0].des_isu
      this.Parent.has_cla.prop.Value = data[0].cla_isu
    } // End If 

    return true

  }   // Fin Procedure


  //metodo
}