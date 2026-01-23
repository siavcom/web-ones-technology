//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// @baseClass  : comboBox
// @class : tdo_tdo
// Description : Componente tdo_tdo
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 24/07/25
// Update Date  :
/////////////////////////////////////////////
// import { COMPONENT } from "@/classes/Component";

import { CAPTURECOMPONENT } from "@/classes/CaptureComponent";
//imports

export class tdo_tdo extends CAPTURECOMPONENT {
    //public
    constructor() {
        super();
        this.prop.BaseClass = "comboBox";
        this.prop.ControlSource = "vi_cap_comedoc.tdo_tdo";
        this.prop.BoundColumn = 2;
        this.prop.ColumnCount = 3;
        this.prop.ColumnWidths = "250px,50px,100px";
        this.prop.RowSource = "cometdo.des_tdo,tdo_tdo,afe_tdo";
        this.prop.RowSourceType = 2;
        this.prop.updateKey = true
        this.prop.Visible = true;
        this.prop.First = true
        this.style.fontSize = '17px';
        this.inputStyle.fontSize = '17px'
        this.inputStyle.fontWeight = "bold";

        this.asignaRecno()
        //propiedades
    }

    // Evento   :Valid
    // Objeto  :tdo_tdo
    // Tipo   :Combo
    // Comentarios :
    override async valid(sw_rel?: boolean) {
        // cambiar locate
        const res = await localAlaSql(`select recno from cometdo where tdo_tdo='${this.prop.Value}'`)
        await goto(res[0]?.recno || 0, 'cometdo')
        return true
    }   // Fin Procedure

    override async when() {
        await super.when()
        //this.Form.Recno=0
        useNodata('vi_cap_comepag')

        this.Form.ap_pagos.prop.ReadOnly = true
        this.Form.block[3].prop.Visible = false // Documentos no pagados
        this.Form.block[4].prop.Visible = false // Aplica a documentos
        this.Form.block[5].prop.Visible = false // Campos XML
        this.Form.Bt_campos_xml.prop.Visible = false // caprura xml
        this.Form.Bt_imprime.prop.Visible = false // imprime
        this.Form.Bt_timbra.prop.Visible = false // timbra
        console.log('when tdo_tdo borrando')
        // await deleteLocalSql('ALL', 'vcomesal')
        this.Form.ap_pagos.prop.RecordSource = ''
        //            await useNodata('vi_cap_comepag') // use vi_cap_comepag vi_cap_comepag Nodata

        this.Form.aut_cap = false
        this.Form.d_tot_doc.prop.Value = 0
        this.Form.d_sal_doc.prop.Value = 0
        this.Form.d_pap_doc.prop.Value = 0
        this.Form.d_sal_cta.prop.Value = ''
        this.Form.ndo_doc.prop.Valid = false
        return true

    }   // Fin Procedure


    //metodo
}