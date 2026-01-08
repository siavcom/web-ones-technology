//////////////////////////////////////////////
// BaseClass : component
// Class : tip_afe
// Description : Se hace afectacion definitiva en tablas
// Author : MGSR
// Creation : 2025/01/30
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from '@/classes/Component'
export class tip_afe extends COMPONENT {

    constructor() {
        super()

        this.prop.Caption = 'Se hace afectación definitiva '
        this.prop.Type = "checkBox";
        this.prop.Value = 0
        //   this.style.zIndex=3  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente

    }
    async interactiveChange() {
        if (this.prop.Value == 1) {
            this.Parent.alm_afe.prop.Visible = true;
            this.Parent.alm_afe.prop.Disabled = false;
            return true;
        }
        else {
            this.Parent.alm_afe.prop.Visible = false;
            this.Parent.alm_afe.prop.Disabled = true;
            return true;
        }



    }

}
