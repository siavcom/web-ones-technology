//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// @baseClass  : tab_xml
// @class : captura_xml
// Description : Componente captura_xml
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 24/07/25
// Update Date  :
/////////////////////////////////////////////
// import { TAB_XML } from "@/classes/tab_xml";

import { CONTENEDOR_XML } from "~/classes/Siavcom/contenedor_xml/contenedor_xml";
//imports

export class captura_xml extends CONTENEDOR_XML {
    //public
    constructor() {
        super();
        //        this.style.height = '146px';
        //        this.style.width = '541px';
        this.prop.Disabled = false;
        /*
                this.var_dxm.Header1.prop.Name = "Header1";
                this.var_dxm.prop.Name = "var_dxm";
                this.var_dxm.VAR_DXM.prop.Name = "VAR_DXM";
                this.var_dxm.VAR_DXM.prop.Visible = false;
                this.var_dxm.prop.Visible = false;
                this.des_dxm.DES_DXM.prop.Name = "DES_DXM";
                this.des_dxm.DES_DXM.prop.Visible = false;
                this.des_dxm.Header1.prop.Name = "Header1";
                this.des_dxm.prop.Name = "des_dxm";
                this.des_dxm.prop.Visible = false;
                this.val_dxm.Header1.prop.Name = "Header1";
                this.val_dxm.prop.Name = "val_dxm";
                this.val_dxm.VAL_DXM.prop.Name = "VAL_DXM";
                this.val_dxm.VAL_DXM.prop.Visible = false;
                this.val_dxm.val_dxm1.prop.Name = "val_dxm1";
                this.val_dxm.prop.Visible = false;
        */
        //propiedades
        this.style.display = 'flex'
        this.style.flexWrap = 'wrap'

    }
    override async open(): Promise<void> {
        const vi_cap_comedoc = await goto(0, 'vi_cap_comedoc')
        if (await super.open('COMEDOC', vi_cap_comedoc.tdo_tdo, vi_cap_comedoc.key_pri))
            this.Form.block[5].prop.Visible = true
        else
            this.Form.block[5].prop.Visible = false
    }

    override async close() {
        this.Form.block[5].prop.Visible = false
        await super.close()
        this.Form.Bt_campos_xml.prop.Visible = true
    }

    //metodo
}