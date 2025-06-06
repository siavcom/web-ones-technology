//////////////////////////////////////////////
// Clase : nom_for
// Descripcion : Nombre de la vista Vue a generar 
// Author : Fernando Cuadras Angulo
// Creacion : 17/Octubre/2022
// Ult.Mod  : 
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////

import { COMPONENT } from '@/classes/Component'

export class nom_for extends COMPONENT {

  //  constructor(parent: Record<string, never>) {
  constructor() {
    super()

    this.prop.BaseClass = 'editText'
    this.prop.Caption = "Nombre de la pagina (Vue View) ";
    this.prop.ToolTipText = "Nombre de la pagina ";
    this.prop.ErrorMessage = 'Nombre de la pagina invalido';
    this.prop.Value = ""
    this.prop.Visible = false
    this.prop.Placeholder = "Page name"
    this.inputStyle.width = '300px'
    this.style.width = '500px'
  }

  public async when() {
    // public setFocus = async () => {
    //  this.Form.nom_tab.prop.Visible= false
    this.Form.bt_gen_forma.prop.Visible = false
    return true
  }

  public async valid() {
    this.prop.Value = this.prop.Value.replaceAll(' ', '')
    if (this.prop.Value.length == 0)
      return false
    this.Form.bt_aceptar.prop.Visible = true;
    return true
  }
}
