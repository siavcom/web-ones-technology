//////////////////////////////////////////////
// This class COMPONENT was generated automatically by web-ones-technology
// @baseClass  : COLUMN
// @class : uco_dpy
// Description : USUARIO QUE COTIZO CON EL PROVEEDOR
// @author: El Fer Blocks
// Creation : 2024-03-21
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from '@/classes/Component'

export class uco_cpy extends COMPONENT {

  constructor() {
    super()
    this.prop.Caption = 'Usuario que cotizó en compras'
    this.prop.BaseClass = "comboBox";
    this.prop.ControlSource = 'vi_cap_comecpy.uco_cpy'

    this.prop.RowSourceType = 4; //4 -Query Local SQL
    //this.prop.RowSource = `select nom_usu,log_usu from now.equipos where rtrim(equ_equ)='${equ_equ}' group by log_usu,nom_usu` //equusu
    this.prop.RowSource = `select nom_usu,log_usu from now.equipos order by mom_usu,nom_usu` //equusu
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.prop.Capture = true;
    this.prop.updateKey = false;
    this.prop.Disabled = true
    this.inputStyle.width = "256px";
    this.style.width = "450px";
  }


}

