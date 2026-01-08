//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// BaseClass : comboBox
// Class : suc_pge
// Description : Componente suc_pge
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 24/07/25
// Update Date  :
/////////////////////////////////////////////
// import { COMPONENT } from "@/classes/Component";
import { CAPTURECOMPONENT } from "@/classes/CaptureComponent";
//imports

export class suc_pge extends CAPTURECOMPONENT {
    //public
    constructor() {
        super();
        this.prop.BaseClass = "comboBox";
        this.prop.Caption = "Sucursal";
        this.prop.BoundColumn = 2;
        this.prop.ColumnCount = 2;
        this.prop.ColumnWidths = "150px,25px";
        this.prop.ControlSource = "vi_cap_comedoc.suc_pge";
        this.prop.RowSource = "vi_cap_comeunn.des_unn,unn_unn";
        this.prop.RowSourceType = 2;
        //propiedades
    }

    override async when() {
        let m = {}   // inicializamos m
        this.prop.ReadOnly = this.prop.ReadOnly ? this.prop.ReadOnly : await !this.Form.rev_per(this.prop.Name)
        if (this.prop.ReadOnly) {
            this.prop.Valid = true
            this.prop.nextFocus = true
            return false
        } // End If 
        return true
    }   // Fin Procedure


}