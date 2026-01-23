//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// @baseClass  : editBox
// @class : has_cla
// Description : Componente has_cla
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 29/05/25
// Update Date  :
/////////////////////////////////////////////
// import {editBox} from "@/classes/editBox";

import { COMPONENT } from "@/classes/Component";
import { des_has } from './des_has';
//imports

export class has_cla extends COMPONENT {
  public des_has = new des_has()  // descripcion hasta
  //public
  constructor() {
    super();

    this.prop.InputMask = (Public.value.ima_pge);
    this.prop.Caption = "Hasta el insumo";
    this.inputStyle.width = "128px"// "218px" // Son 30 puntos del icono de ayuda
    this.style.width = "max-content"


    this.prop.Visible = false;

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

    if (this.prop.Value.trim() < this.Form.des_cla.prop.Value.trim()) {
      this.prop.ErrorMessage = 'Clave menor'
      return false

    } // End If 

    this.des_has.prop.Value = ''

    m.cla_isu = this.prop.Value
    const data = await use('vi_cap_comeisu', m) // use vi_cap_comeisu vi_cap_comeisu

    if (recCount() > 1) {
      this.des_has.prop.Value = data[0].des_isu
    } // End If 

    return true


  }   // Fin Procedure


  //metodo
}