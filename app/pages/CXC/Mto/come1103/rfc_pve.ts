//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// @baseClass  : Component
// @class : rfc_pve
// Description : Componente rfc_pve
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 24/07/25
// Update Date  :
/////////////////////////////////////////////
// import { COMPONENT } from "@/classes/Component";

//imports
import { nom_pve } from "./rfc_pve/nom_pve"
import { tte_nom } from "./rfc_pve/tte_nom"
import { top_nom } from "./rfc_pve/top_nom"
import { iva_pve } from "./rfc_pve/iva_pve"
import { obs_pve } from "./rfc_pve/obs_pve"
import { bt_graba_pve } from "./rfc_pve/Bt_graba_pve"


export class rfc_pve extends COMPONENT {
    //public
    public nom_pve = new nom_pve()
    public tte_nom = new tte_nom()
    public top_nom = new top_nom()
    public iva_pve = new iva_pve()
    public obs_pve = new obs_pve()
    public bt_graba_pve = new bt_graba_pve()

    constructor() {
        super();
        this.prop.Caption = "RFC";
        this.prop.Visible = true;
        this.prop.ControlSource = "lla1_pve.rfc_pve";
        //this.style.width = '119px';
        this.prop.Visible = false;
        this.inputStyle.width = '100px';
        this.asignaRecno()
        //propiedades
    }

    public override async init() {
        if (this.Form.tip_cap == 'P') {
            this.prop.Visible = true
            await useNodata('lla1_pve') // use lla1_pve lla1_pve Nodata
            this.prop.ControlSource = "lla1_pve.rfc_pve";
        }
    }


    /**
     * @Evento   :keyPress
     * @Objeto  :rfc_pve
     * @Tipo   :Cuadro de texto
     * @Comentarios :
     */
    /*
        override async keyPress(nKeyCode: number, nShiftAltCtrl: number) {
            let m = {}   // inicializamos m
            this.Form.prop.key = nKeyCode
            if (((len(rTrim(this.prop.Value)) < 12 && len(rTrim(this.prop.Value)) > 0) && (this.Form.prop.key == 10 || this.Form.prop.key == 9 || this.Form.prop.key == 13)) || char(this.Form.prop.key) == '?') {
                // si da un crt enter
                let des_rfc = rTrim(this.prop.Value)
                let has_rfc = left(des_rfc + 'ZZZZZZZZZZZZZZZ', 13)
                let ins_sql = "select rfc_pve,nom_pve from man_comepve where rfc_pve>='" + des_rfc + "' and rfc_pve<='" + has_rfc + "' order by rfc_pve"
    
                let res = await SQLExec(ins_sql)
    
                if (res.length == 0) {
                    MessageBox('No hay RFC s ', 16, '', 3000)
                    //                this.keyPress(0)
                    //VFP  '' '' clear
                    // limpia el teclado
    
                    this.prop.Value = space(14)
                    this.Form.prop.key = 0
                    //              await select('lla1_pve')
    
                    return
    
                } // End If 
    
    
                m.rfc_pve = res[0].rfc_pve
    
                res = await requery('lla1_pve')
    
                this.prop.Value = m.rfc_pve
    
            } // End If 
        }   // Fin Procedure
    
    */

    /**
     * @Evento   :Valid
     * @Objeto  :rfc_pve
     * @Tipo   :Cuadro de texto
     * @Comentarios :Es la validación de la llave principal
     */
    override async valid(sw_rel?: boolean) {
        let m = {}   // inicializamos m
        if (this.Form.prop.key == 10) {
            return true
        } // End If 

        // seleccionamos la vista principal
        m.rfc_pve = this.prop.Value.trim()

        if (m.rfc_pve.length == 0) {
            return true
        } // End If 

        if (m.rfc_pve.length < 12 || m.rfc_pve.length > 13) {
            MessageBox('Longitud inválida', 16, 'Error', 3000)
            return false

        } // End If 

        // Abre la vista para leer datos
        this.prop.Valid = true

        // si es un rfc nuevo o esta borrado
        await appendBlank('lla1_pve', m)

        // Inicio replace VFP
        const vi_cap_comenom = await currentValue('*', 'vi_cap_comenom')
        const Recno = await recNo('lla1_pve')
        const Alias = 'lla1_pve'
        await localAlaSql(`update ${Alias} set rfc_pve='${m.rfc_pve}',
                                       nom_pve='${vi_cap_comenom.nom_nom}',
                                       tte_pve='${vi_cap_comenom.tte_nom}',
                                       top_pve='${vi_cap_comenom.top_nom}'
                                        where recno=${Recno} `)

    }   // Fin Procedure

    override async when() {
        let m = {}   // inicializamos m
        if (this.prop.ReadOnly) {
            return false

        } // End If 

        const lla1_pve = await currentValue('*', 'lla1_pve')
        if (await recNo('lla1_pve') > 0 && lla1_pve.rfc_pve > '             ' && m.rfc_pve == lla1_pve.rfc_pve) {
            return false

        } // End If 

        return true

    }   // Fin Procedure
    //metodo
}