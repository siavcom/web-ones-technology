//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// @baseClass  : component
// @class : con_con
// Description : Consigantario
// @author: El Fer Blocks
// Creation : 2023-07-20
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { CAPTURECOMPONENT } from '@/classes/CaptureComponent'
import { help } from '@/classes/Siavcom/help/con_con/help'
import { noc_con } from './noc_con'


export class con_con extends CAPTURECOMPONENT {

    public help = new help()
    public noc_con = new noc_con()
    constructor() {
        super()

        this.prop.Caption = 'Consignatario'
        this.prop.Type = 'number'
        this.prop.BaseClass = 'editText'
        this.prop.ControlSource = 'vi_cap_comepry.con_con'
        this.prop.ToolTipText = 'Número de consignatario'
        this.prop.MaxLength = 6
        this.prop.Min = "0"
        this.prop.Max = "999999"
        this.prop.Decimals = 0
        this.prop.Capture = true
        this.prop.updateKey = false
        this.prop.Help = false;
        this.prop.Value = 0
        this.inputStyle.width = "64px";

    }

    override async when() {
        this.prop.Help = false;

        let ins_sql = ''
        if (this.Sql.dialect != "postgres") {
            ins_sql = `select top 1 key_pri from man_comecon where cop_nom='${this.Form.cop_nom.prop.Value}' and \
            cod_nom='${this.Form.cod_nom.prop.Value}' `
        } else {
            ins_sql = `select  key_pri from man_comecon where cop_nom='${this.Form.cop_nom.prop.Value}' and \
            cod_nom='${this.Form.cod_nom.prop.Value}'  limit 1`
        }

        const data = await SQLExec(ins_sql)

        if (data.length > 0) {
            this.help.cop_nom = this.Form.cop_nom.prop.Value
            this.help.cod_nom = this.Form.cod_nom.prop.Value
            this.prop.Help = true;
            this.prop.ReadOnly = false
        } else {
            this.prop.ReadOnly = true
            this.prop.nextFocus = true
        }

        return !this.prop.ReadOnly
    }

    ////////////////////////////////// 
    // event valid 
    ///////////////////////////////////

    async valid() {
        this.noc_con.Recno = 0
        console.log("valid con_con", this);
        if (this.prop.Value == 0)
            return true

        const m = {
            cop_nom: this.Form.cop_nom.prop.Value,   //mPublic.cop_nom //.trim()
            cod_nom: this.Form.cod_nom.prop.Value, //.trim()
            con_con: this.prop.Value,
        }

        const data = await this.Sql.use('lla1_con', m)
        if (data.length == 0) {
            this.prop.ErrorMessage = 'No existe'
            return false
        }
        this.noc_con.prop.Value = data[0].noc_con

        return true
    }

    async onChangeValue(styles?: any) {
        // asignamos el help si es de clientes o proveedores 
        this.help.cop_nom = this.Form.cop_nom.prop.Value
    }

}
