//////////////////////////////////////////////
// BaseClass : component
// Class : alm_rep
// Description : Almacenes
// Author : El Fer Blocks
// Creation : 2023-09-20
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from '@/classes/Component'
export class alm_rep extends COMPONENT {

    constructor() {
        super()

        this.prop.textLabel = 'Almacen'
        this.prop.BaseClass = 'comboBox'
        this.prop.RowSourceType = 3 //1-Value, 2-Alias,3-sql 5-Array
        this.prop.RowSource = "select des_tda,alm_tda from man_cometda  union select '  Todos ' as des_tda,'?? ' as alm_tda order by des_tda "
        this.prop.ColumnCount = 2
        this.prop.BoundColumn = 2
        this.prop.ColumnWidths ="75%,25%"; // Puede ser en puntos 60px,30px /
        this.prop.Value='?? ' 
        this.style.zIndex=3  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente
        
    }
}
