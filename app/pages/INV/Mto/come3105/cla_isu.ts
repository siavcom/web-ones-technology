//////////////////////////////////////////////
// this Form was generated automatically for web-ones-technology
// BaseClass : editBox
// Class : cla_isu
// Description : Componente cla_isu
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 29/05/25
// Update Date  :
/////////////////////////////////////////////
// import {editBox} from "@/classes/editBox";

import { COMPONENT } from "@/classes/Component";
import { des_isu } from './des_isu';
import { help } from '@/classes/Siavcom/help/cla_isu/help'
//import { modal_com } from './detail_compra/modal_com'
export class cla_isu extends COMPONENT {
  public help = new help()
  public des_isu = new des_isu()
  cla_isu: string = ''

  //public
  constructor() {
    super();
    this.prop.BaseClass = "editBox";
    this.prop.Caption = "Clave del Insumo";
    this.prop.InputMask = Public.value.ima_pge.trim()
    this.prop.MaxLength = 30
    this.prop.Help = true;
    this.prop.Capture = true
    this.prop.ErrorMessage = 'No existe la clave del insumo'
    this.inputStyle.width = "128px"// "218px" // Son 30 puntos del icono de ayuda
    this.style.width = "max-content"


    //propiedades
  }


  // Evento   :GotFocus 
  // Objeto  :cla_isu 
  // Comentarios : 

  override async when() {

    const m = {}   // inicializamos m

    this.Form.cla_isu.prop.Visible = true
    this.Form.alm_tda.prop.Visible = false
    this.Form.des_cla.prop.Visible = false

    this.Form.has_cla.prop.Visible = false

    this.Form.sep_fam.prop.Visible = false
    this.Form.num_fam.prop.Visible = false
    this.Form.des_fam.prop.Visible = false
    this.Form.bt_aceptar.prop.Visible = false

    this.Form.Captura_alm.prop.RecordSource = ''  // asignamos la tabla de captura de movimientos 
    this.Form.Captura_alm.c_cla_isu.prop.Visible = false
    this.Form.Captura_alm.c_cla_isu.prop.Disabled = true

    this.Form.Captura_alm.c_alm_tda.prop.Visible = true
    this.Form.Captura_alm.c_alm_tda.prop.Disabled = false

    return true

  }   // Fin Procedure

  // Evento   :Valid 
  // Objeto  :cla_fam 
  // Comentarios : 

  override async valid() {
    let m = {}   // inicializamos m
    m.cla_isu = this.prop.Value
    const data = await use('vi_cap_comeisu', m) // use vi_cap_comeisu vi_cap_comeisu
    if (recCount() == 0)
      return false

    this.des_isu.prop.Value = data[0].des_isu

    await use('vi_cap_alm', m) // use vi_cap_alm vi_cap_alm
    this.Form.Captura_alm.prop.RecordSource = 'vi_cap_alm'  // actualiza la tabla en el grid 

    return true
  }   // Fin Procedure

  //metodo
}