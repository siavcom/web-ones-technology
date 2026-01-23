//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// @baseClass  : imgButton
// @class : Bt_observaciones
// Description : Componente Bt_observaciones
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 24/07/25
// Update Date  :
/////////////////////////////////////////////
// import { IMGBUTTON } from "@/classes/imgButton";

import { IMGBUTTON } from "@/classes/imgButton";
//imports

export class Bt_observaciones extends IMGBUTTON {
    //public
    constructor() {
        super();

        this.prop.Caption = "Bt_observaciones.";
        this.prop.Disabled = true;
        this.prop.Visible = false;
        this.prop.ToolTipText = "Observaciones del documento";
        this.style.fontSize = '9px';
        this.style.width = '127px';
        this.prop.Position = 'footer';

        //propiedades
    }

    // Evento   :Click
    // Objeto  :Bt_observaciones
    // Tipo   :Buttom
    // Comentarios :
    override async click() {
        let m = {}   // inicializamos m
        const router = useRouter();
        router.push({ name: 'formas\obs_doc' })

        await select('vi_cap_comedoc')

        let ins_sql = "update man_comedoc set ob1_doc='" + ob1_doc + "',ob2_doc='" + ob2_doc + "',ob3_doc='" + ob3_doc + "' where key_pri=" + lTrim(str(vi_cap_comedoc.key_pri))
        let a = ins_sql
        if (!await SQLExec(ins_sql))
            return

        if (Public.value.ndb_emp == 2) {
            // Si es InterBase
            // SQLCOMMIT ( Public.value.num_dbs ) 

        } // End If 
        //   iif(sqlexec(num_dbs,"COMMIT")>0,.t.,// err_sql()())

        await select('vi_cap_comedoc')

        m = appendM(m, await scatter())// scatter 

        await requery()

        return
        //Scatter memvar

    }   // Fin Procedure


    override async keyPress(nKeyCode, nShiftAltCtrl) {
        let m = {}   // inicializamos m
    }   // Fin Procedure




    //metodo
}