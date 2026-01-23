//////////////////////////////////////////////
// @baseClass  : component
// @class : alm_rep
// Description : Almacenes
// @author: El Fer Blocks
// Creation : 2023-09-20
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from "@/classes/Component";
export class ubi_tda extends COMPONENT {
  constructor() {
    super();

    this.prop.Caption = "Almacen por ubicación";
    this.prop.BaseClass = "comboBox";
    this.prop.RowSourceType = 4;  //1-Value, 2-Alias,3-Query SQL Server,4 -Query Local SQL , 5-Array
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 1;
    this.prop.ColumnWidths = "80%,20%"; // Puede ser en puntos 60px,30px /
    this.prop.Value = "?? ";
    this.style.maxHeight = "200px";
    this.inputStyle.width = "240px";
    this.prop.MultiSelect = true;
    this.style.width = "auto";
    //this.style.zIndex=5  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente
  }


  override async init() {
    const data = await SQLExec(`select des_tda,alm_tda,left(ubi_tda,3) ubi_tda from man_cometda  union select '  Todos ' as des_tda,'?? ' as alm_tda,' ' as ubi_tda order by des_tda  `, 'loc_cometda')
    this.prop.RowSource = "select ubi_tda,' ' des_tda from now.loc_cometda group by ubi_tda union select ' Todas ' as ubi_tda,' ' as des_tda order by ubi_tda "
  }

}
