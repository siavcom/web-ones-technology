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
    this.prop.textLabel = "Path/nombre de la vista VUE en el Servidor de Vue";
    this.prop.ToolTipText = "Path/nombre de la vista VUE en el Servidor de Vue";
    this.prop.ErrorMessage = ''

    this.prop.Value = ""
    this.prop.Placeholder="View name"
  }

  public async when() {
    // public setFocus = async () => {
    //  this.Form.nom_tab.prop.Visible= false
   return  await super.when()
  }


  public async valid () {
    this.prop.Value=this.prop.Value.replaceAll(' ','')
    this.Form.nom_tab.prop.Visible= true
    return true
  }
 }
