//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// BaseClass : imgButton
// Class : bt_graba_pve
// Description : Componente bt_graba_pve
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 24/07/25
// Update Date  :
/////////////////////////////////////////////
// import { IMGBUTTON } from "@/classes/imgButton";

//imports

export class bt_graba_pve extends IMGBUTTON {
    //public
    constructor() {
        super();

        this.prop.Caption = "Graba";
        this.style.fontSize = '8px';
        this.style.width = '74px';
        this.prop.Position = 'footer'; // main, header , footer
        //propiedades
    }

    // Evento  :grabar
    // Objeto  :come1103
    // Tipo   :Form
    // Comentarios :Pertenece a la forma principal de captura
    override async click(sw_rel) {
        let m = {}   // inicializamos m
        await select('lla1_pve')
        // seleccionamos la vista

        for (const control of this.Form.main) {

            if (substr(control.prop.Name, 4, 1) == '_' && left(control.prop.ControlSource, 11) == 'lla1_pve') {
                if (control.prop.Valid == false) {
                    control.setFocus()
                    return false

                } // End If 

            } // End If 

        } // End For; 

        await select('lla1_pve')
        // importe actual del documento
        // seleccionamos la vista

        if (!tableUpdate()  /*gra_reg()*/) {
            MessageBox('No se pudo dar de alta el proveedor')
        } // End If 

        await select('vi_cap_comedoc')

        return

    }   // Fin Procedure


    override async when() {
        let m = {}   // inicializamos m
        if (await recNo('lla1_pve') > 0 && vi_cap_comenom.rfc_nom == lla1_pve.rfc_pve) {
            return false

        } // End If 

        if (len(allTrim(lla1_pve.rfc_pve)) < 12) {
            return false

        } // End If 

        await select('lla1_pve')

        if (await recCount() > 0) {
            return true

        } // End If 
        return true
    }   // Fin Procedure




    //metodo
}