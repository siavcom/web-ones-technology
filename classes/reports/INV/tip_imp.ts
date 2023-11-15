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
export class tip_imp extends COMPONENT {

    constructor() {
        super()

        this.prop.textLabel = 'Tipo de impresión'
        this.prop.BaseClass = 'comboBox'
        this.prop.RowSourceType = 5 //1-Value, 2-Alias,3-sql 5-Array
        this.prop.RowSource = [["Con existencia","Sin existencia","Solo con movimientos","Existencia en negativo","Todos"], [1,2,3,4,5]]
        this.prop.ColumnCount = 2
        this.prop.BoundColumn = 2
        this.prop.ColumnWidths ="75%,25%"; // Puede ser en puntos 60px,30px /
        //this.prop.Value=1 
        this.style.zIndex=2  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente
        
    }
}
