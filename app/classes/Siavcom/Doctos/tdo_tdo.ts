/*******************************
// This Form was generated automatically for web-ones-technology
// @baseClass  : comboBox
// @class : tdo_tdo
// @Description : Tipo de documento
// @author: El Fer Blocks (Fernando Cuadras)
// @Creation : 24/07/25
// @Update Date  :
********************************************/

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
        // this.Form.d_tot_doc.prop.Value = 0
        this.Form.tcd_tcd.prop.Visible = false
        this.Form.Bt_campos_xml.prop.Visible = false // caprura xml
        this.Form.Bt_imprime.prop.Visible = false // imprime
        this.Form.Bt_timbra.prop.Visible = false // timbra

        if (this.Form.Name == 'come1103') { // Cargos y Abonos
            // useNodata('vi_cap_comepag')
            this.Form.ap_pagos.prop.ReadOnly = true
            this.Form.block[3].prop.Visible = false // Documentos no pagados
            this.Form.block[4].prop.Visible = false // Aplica a documentos
            this.Form.block[5].prop.Visible = false // Campos XML
            // await deleteLocalSql('ALL', 'vcomesal')
            this.Form.ap_pagos.prop.RecordSource = ''
            //            await useNodata('vi_cap_comepag') // use vi_cap_comepag vi_cap_comepag Nodata

            this.Form.aut_cap = false
            this.Form.d_sal_cta.prop.Value = 0
        } else {
            // Otros formularios
            this.Form.sw_aut = false
            // apagamos switch de autorizado
            //inicializamos datos

            // thisform.observaciones.enabled=.f.
            this.Form.dre_doc.prop.Visible = false
            // thisform.impuestos.enabled=.f.
            this.Form.carta_porte.prop.Visible = false
            const cometdo = await currentValue('*', 'cometdo')
            if (cometdo.afi_tdo == 1) {
                this.Form.ped_ped.prop.Visible = false

            } // End If 

            this.Form.d_exi_pro.prop.Value = 0
            this.Form.carga_xml.prop.Visible = false

            // if thisform.tag#'IN' AND thisform.tag#'PG' AND thisform.tag#'AE'        && si la captura es differente a inventario
            if (cometdo.cop_nom == 'C' || cometdo.cop_nom == 'P') {
                this.Form.datos_cliente.click(true)
            } // End If 

            if (this.Form.sw_xml) {
                this.Form.captura_xml.prop.RecordSource = ''
            } // End If 

        }

        return true
    }   // Fin Procedure
    //metodo
}