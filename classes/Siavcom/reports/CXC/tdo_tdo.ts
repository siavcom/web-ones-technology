//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class : tdo_tdo
// Description : Tip de documento
// Author : El Fer Blocks
// Creation : 2023-09-20
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from "@/classes/Component";
export class tdo_tdo extends COMPONENT {
  constructor() {
    super();
    this.prop.Caption = "Documento"; // Etiqueta que tendra este componente
    this.prop.BaseClass = "comboBox"; // Tipo de componente
    this.prop.RowSourceType = 3; //Tipo de combo Box (Similar a VFP) 1-Value, 2-Alias local SQL ,3-Serv SQL 5-Array
    this.prop.RowSource =
      "select des_tdo,tdo_tdo from man_cometdo where cop_nom='C' and  nmo_tdo>0 union select '  Todos ' as des_tdo,'?? ' as tdo_tdo order by des_tdo";
    this.prop.ColumnCount = 2; // = VFP
    this.prop.BoundColumn = 2; // = VFP
    this.prop.ColumnWidths = "75%,25%"; // Puede ser en puntos 60px,30px
    this.prop.Value = "?? ";
    //this.style.zIndex=3  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente
  }
}
