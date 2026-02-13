//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// @baseClass  : imgButton
// @class : Bt_can_docto
// Description : Componente Bt_can_docto
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 24/07/25
// Update Date  :
/////////////////////////////////////////////
// import { IMGBUTTON } from "@/classes/imgButton";

import { IMGBUTTON } from "@/classes/imgButton";
//imports

export class Bt_can_docto extends IMGBUTTON {
    //public
    constructor() {
        super();
        this.prop.Caption = "Cancela documento";
        this.prop.Visible = false;
        this.prop.Image = '/Iconos/svg/cancel.svg';
        this.prop.ToolTipText = "Cancela documento";
        this.style.width = '72px';
        this.prop.Position = 'footer'; // main, header , footer

        //propiedades
    }

    // evento   :click
    // objeto  :Bt_can_docto
    // tipo   :buttom
    // comentarios :
    override async click() {
        let m = {}   // inicializamos m
        await select('vi_cap_comedoc')

        m = appendM(m, await scatter())// scatter 

        let status_doc = vi_cap_comedoc.sta_doc
        if (await this.Form.rev_per('ndo_doc') && await recNo() > 0 && MessageBox("Seguro que desea cancelar este documento", 4 + 32) == 6) {
            let are_tra = await select()

            let pge_xml = this.Form.captura_xml.obt_val('COMEPGE', 1, 'PGEXML')
            // obtiene campos xml
            await select(are_tra)

            if (!can_doc(m.tdo_tdo, m.ndo_doc)) {
                // procedimiento para cancelar documentos
                MessageBox('No se pudo dar de baja completamente el documento, favor de revisarlo')
                return

            } // End If 

            await select('vi_cap_comedoc')
            //!//     IF status_doc<>'T'  AND thisform.messagebox("Imprimimos el documento cancelado",4+32)=6
            //!//       SELECT vi_cap_comedoc
            //!//       SCATTER memvar && lee variables
            //!//       TABLEUPDATE(.t.)
            //!//       REQUERY()
            //!//       SELECT vi_cap_mov
            //!//       TABLEUPDATE(.t.)
            //!//       REQUERY()
            //!//       APPEND BLANK  && generamos un registro en blanco solo para simular un registro
            //!//       replace vi_cap_mov.can_mov WITH 0  && ponemos en cero la cantidad
            //!//       TABLEUPDATE(.t.)
            //!//
            //!//       thisform.Bt_imprime.click
            //!//     endif

            await useNodata('vi_cap_comedoc') // use vi_cap_comedoc vi_cap_comedoc NODATA
            this.Form.tdo_tdo.setFocus()

        } // End If 

    }   // Fin Procedure



    // Evento   :keyPress
    // Objeto  :Bt_can_docto
    // Tipo   :Buttom
    // Comentarios :
    override async keyPress(nKeyCode, nShiftAltCtrl) {
        let m = {}   // inicializamos m
        switch (true) {
            case (char(nkeycode) == 'M' || char(nkeycode) == 'm'):
                this.Form.captura_movi.columns(1).setFocus()
                break
            case (char(nkeycode) == 'S' || char(nkeycode) == 's'):
                this.Form.salir.click
        } // End case 

    }   // Fin Procedure



    // Evento   :When
    // Objeto  :Bt_can_docto
    // Tipo   :Buttom
    // Comentarios :
    // Modifi.  : 29/Jul/2004   Fernando Cuadras
    //                -Permitia cancelacion de documentos a pesar de no tener
    //                 habilitada la funcion
    override async when() {
        let m = {}   // inicializamos m
        if (Public.value.log_usu.trim() == 'ADMIN') {
            // si es el administrador
            return true
            // permite

        } // End If 

        //      let pos = ascan(this.Form.nom_obj, 'NDO')
        // si permite captura o modificacion
        //        if (pos > 0 && (this.Form.nom_obj[pos + 1] == '1' || this.Form.nom_obj[pos + 1] == '3')) {
        if (this.Form.nom_obj.NDO == '3') {
            if (await this.Form.rev_per('CNC')) {
                // manda revizar permisos de cancelacion
                return true

            } // End If 

            return false

        } // End If 

        return false

    }   // Fin Procedure






    //metodo
}