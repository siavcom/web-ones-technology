//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// @baseClass  : component
// @class : in_tcd_tcd
// Description : Clasificacion de documento
// @author: El Fer Blocks
// Creation : 2023-09-20
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from "@/classes/Component";
export class in_tcd_tcd extends COMPONENT {
  constructor() {
    super();
    this.prop.Caption = "Clasificación de documento"; // Etiqueta que tendra este componente
    this.prop.BaseClass = "comboBox"; // Tipo de componente
    this.prop.RowSourceType = 4; //Tipo de combo Box (Similar a VFP) 1-Value, 2-Alias local SQL ,3-Serv SQL 5-Array
    this.prop.ColumnCount = 2; // = VFP
    this.prop.BoundColumn = 2; // = VFP
    this.prop.ColumnWidths = "75%,25%"; // Puede ser en puntos 60px,30px
    this.prop.Value = "??";
    this.prop.Visible = false;
    this.prop.Disabled = true;
    //this.style.zIndex=3  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente
  }


  override async init() {
    const data = await SQLExec(`select des_tcd,tcd_tcd,tdo_tdo,key_pri from man_cometcd  `, 'loc_cometcd')
    this.prop.RowSource = "select '  Todos ' as des_tcd,'??' as tcd_tcd  "
    //  RowSourceType: 0, //1-Value, 2-Alias,3-Query SQL Server,4 -Query Local SQL , 5-Array

  }
}
