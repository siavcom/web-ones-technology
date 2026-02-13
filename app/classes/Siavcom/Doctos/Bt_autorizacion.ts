//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// @baseClass  : imgButton
// @class : Bt_autorizacion
// Description : Componente Bt_autorizacion
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 24/07/25
// Update Date  :
/////////////////////////////////////////////
// import { IMGBUTTON } from "@/classes/imgButton";

import { IMGBUTTON } from "@/classes/imgButton";
//imports

export class Bt_autorizacion extends IMGBUTTON {
    //public
    constructor() {
        super();

        this.prop.Caption = "Autorización";
        this.prop.Visible = false;

        this.prop.Disabled = true;
        this.prop.ToolTipText = "Autorización de captura";
        this.style.width = '77px';
        this.prop.Position = 'footer'; // main, header , footer
        //propiedades
    }

    // Evento   :Click
    // Objeto  :Bt_autorizacion
    // Tipo   :Commandbuttom
    // Comentarios :
    override async click() {
        let m = {}   // inicializamos m
        if (await recCount('vi_cap_comedoc') == 0) {
            return

        } // End If 

        if (Public.value.log_usu.trim() == 'ADMIN') {
            return true

        } // End If 

        const lla1_seg = await goto(0, 'lla1_seg')
        let aut_cap = false
        let pas_aut = des_pal(lla1_seg.cla_seg)
        // password de Bt_autorizacion
        if (pas_aut == space(8)) {
            return

        } // End If 

        const router = useRouter();
        router.push({ name: 'formas\aut_cap', params: { Param1: des_pal(m.cla_seg) } })// toaut_cap

        if (aut_cap) {
            // si hay Bt_autorizacion de captura
            if (this.Form.d_sta_doc.prop.Value != 'Timbrado') {
                this.Form.cod_nom.prop.ReadOnly = false
                this.Form.ref_doc.prop.ReadOnly = false
                this.Form.fec_doc.prop.ReadOnly = false
                this.Form.fve_doc.prop.ReadOnly = false
                this.Form.ven_ven.prop.ReadOnly = false
                this.Form.com_doc.prop.ReadOnly = false
                this.Form.mon_doc.prop.ReadOnly = false
                this.Form.vmo_doc.prop.ReadOnly = false
                this.Form.im0_doc.prop.ReadOnly = false
                this.Form.im1_doc.prop.ReadOnly = false
                this.Form.im2_doc.prop.ReadOnly = false
                this.Form.im3_doc.prop.ReadOnly = false
                this.Form.im4_doc.prop.ReadOnly = false
                this.Form.im5_doc.prop.ReadOnly = false
                this.Form.bt_delete.prop.Visble = true
            } // End If 

            this.Form.Bt_imprime.prop.Visble = true
            this.Form.Bt_timbra.prop.Visble = true
            this.Form.aut_cap = true
        } // End If 

    }   // Fin Procedure






    //metodo
}