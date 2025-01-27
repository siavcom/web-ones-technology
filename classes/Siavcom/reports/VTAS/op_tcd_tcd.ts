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
export class op_tcd_tcd extends COMPONENT {
  constructor() {
    super();
    this.prop.textLabel = "Clasificación de documento"; // Etiqueta que tendra este componente
    this.prop.BaseClass = "comboBox"; // Tipo de componente
    this.prop.RowSourceType = 3; //Tipo de combo Box (Similar a VFP) 1-Value, 2-Alias local SQL ,3-Serv SQL 5-Array
    this.prop.RowSource =
     `select '  Todos ' as des_tcd,'??' as tcd_tcd order by des_tcd  `;
    this.prop.ColumnCount = 2; // = VFP
    this.prop.BoundColumn = 2; // = VFP
    this.prop.ColumnWidths = "75%,25%"; // Puede ser en puntos 60px,30px
    this.prop.Value = "??";
    //this.style.zIndex=3  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente
  }
}
