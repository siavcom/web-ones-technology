//////////////////////////////////////////////
// BaseClass : component
// Class : cal_reo
// Description : Calculo de puntos de reorden
// Author : MGSR
// Creation : 2025/01/30
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from '@/classes/Component'
export class cal_reo extends COMPONENT {

    constructor() {
        super()

        this.prop.Caption = 'Calculo de puntos de reorden'
        this.prop.Type = "checkBox";
        this.prop.Value = 0
        //   this.style.zIndex=3  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente

    }

    async interactiveChange() {
        if (this.prop.Value == 1) {
            this.Parent.des_per.prop.Visible = true;
            this.Parent.des_per.prop.Disabled = false;
            this.Parent.per_min.prop.Visible = true;
            this.Parent.per_min.prop.Disabled = false;
            this.Parent.tip_reo.prop.Visible = true;
            this.Parent.tip_reo.prop.Disabled = false;
            this.Parent.tip_afe.prop.Visible = true;
            this.Parent.tip_afe.prop.Disabled = false;
            return true;
        }
        else {
            this.Parent.des_per.prop.Visible = false;
            this.Parent.des_per.prop.Disabled = true;
            this.Parent.per_min.prop.Visible = false;
            this.Parent.per_min.prop.Disabled = true;
            this.Parent.tip_reo.prop.Visible = false;
            this.Parent.tip_reo.prop.Disabled = true;
            this.Parent.tip_afe.prop.Visible = false;
            this.Parent.tip_afe.prop.Disabled = true;
            this.Parent.alm_afe.prop.Visible = false;
            this.Parent.alm_afe.prop.Disabled = true;
            return true;
        }



    }

}
