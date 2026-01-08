//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// BaseClass : editBox
// Class : cod_nom
// Description : Componente cod_nom
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 15/05/25
// Update Date  :
/////////////////////////////////////////////
// import {editBox} from "@/classes/editBox";

import { COLUMN } from "@/classes/Column";
//imports

export class cod_nom extends COLUMN {
  //public
  constructor() {
    super();
    this.prop.BaseClass = "editBox";
    this.prop.ColumnTextLabel = "Cliente";
    this.prop.Type = 'text';
    this.prop.ControlSource = "vi_cap_tda.cod_nom";
    this.position.Left = 34;
    this.prop.Name = "cod_nom";

    //propiedades
  }

  // Evento   : When 
  // Objeto  : cod_nom 
  // Tipo   : Cuadro de texto 
  // Comentarios : Solo se activa si es un almacen de cliente 
  override async when() {
    this.prop.Valid = true
    this.prop.ReadOnly = !this.Parent.alm_tda.prop.Valid
    this.prop.ErrorMessage = 'No existe el código del cliente'

    if (this.prop.ReadOnly) {
      this.prop.Value = ''
      return false
    }

    return true

  }   // Fin Procedure


  // Evento   : Valid 
  // Objeto  : cod_nom 
  // Tipo   : Cuadro de texto 
  override async valid() {

    if (this.prop.Value.trim() == '') {
      return false
    } // End If 

    // si era un dato ya capturado y no cambio en nada 

    const m = {
      cop_nom: 'C',
      cod_nom: this.prop.Value
    }

    await use('lla1_nom')// use vi_lla1_nom vi_lla1_nom  // Utiliza la vista para validar 

    if (recCount('lla1_nom') > 0) {

      return true

    } // End If 

    MessageBox('No existe el codigo del cliente')
    return false


  }   // Fin Procedure

  //metodo
}