//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// BaseClass : Component
// Class : rfc_pve
// Description : Componente rfc_pve
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 24/07/25
// Update Date  :
/////////////////////////////////////////////
// import { COMPONENT } from "@/classes/Component";

//imports
import { nom_pve } from "./nom_pve"
import { tte_nom } from "./tte_nom"
import { top_nom } from "./top_nom"
import { iva_pve } from "./iva_pve"
import { obs_pve } from "./obs_pve"
import { bt_graba_pve } from "./Bt_graba_pve"


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
        this.prop.Caption = "R.F.C.";
        this.prop.Visible = false;
        this.style.width = '119px';
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


    // Evento   :Valid
    // Objeto  :rfc_pve
    // Tipo   :Cuadro de texto
    // Comentarios :KeyPress
    override async keyPress(nKeyCode, nShiftAltCtrl) {
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

    // Evento   :Valid
    // Objeto  :rfc_pve
    // Tipo   :Cuadro de texto
    // Comentarios :Es la validación de la llave principal
    override async valid(sw_rel?: boolean) {
        let m = {}   // inicializamos m
        let Recno = 0
        let Alias = ''
        if (this.Form.prop.key == 10) {
            return true

        } // End If 

        this.prop.Valid = false
        await select('lla1_pve')
        // seleccionamos la vista principal

        if (this.prop.Value == space(13)) {
            // si el rfc no es valido
            return true

        } // End If 

        m.rfc_pve = allTrim(this.prop.Value)
        if (len(m.rfc_pve) < 12 && (this.Form.prop.key == 10 || this.Form.prop.key == 9 || this.Form.prop.key == 13)) {
            return true

            MessageBox('Longitud invÃ¡lida', 16, 'Error', 3000)
            return false

        } // End If 

        if (len(m.rfc_pve) < 12 && (this.Form.prop.key == 10 || this.Form.prop.key == 9 || this.Form.prop.key == 13)) {
            MessageBox('Longitud invÃ¡lida', 16, 'Error', 3000)
            return false

        } // End If 

        if (len(m.rfc_pve) > 13) {
            MessageBox('Longitud invÃ¡lida', 16, 'Error', 3000)
            return false

        } // End If 

        await select('lla1_pve')
        // Abre la vista para leer datos

        this.prop.Valid = true
        if (await recNo() < 0) {
            // si es un rfc nuevo o esta borrado
            await tableRevert()

            await requery()

            if (await recCount() > 0) {
                // ya existe
                return true

            } // End If 

            await appendBlank()

            // Inicio replace VFP
            let Recno = await recNo()
            let Alias = await alias()
            await localAlaSql(`update ${Alias} set rfc_pve=?  where recno=${Recno} `, [m.rfc_pve])

            // Inicio replace VFP
            Recno = await recNo()
            Alias = await alias()
            await localAlaSql(`update ${Alias} set nom_pve=?  where recno=${Recno} `, [vi_cap_comenom.nom_nom])

            // Inicio replace VFP
            Recno = await recNo()
            Alias = await alias()
            await localAlaSql(`update ${Alias} set tte_pve=?  where recno=${Recno} `, [vi_cap_comenom.tte_nom])

            // Inicio replace VFP
            Recno = await recNo()
            Alias = await alias()
            await localAlaSql(`update ${Alias} set top_pve=?  where recno=${Recno} `, [vi_cap_comenom.top_nom])

        } // End If 

    }   // Fin Procedure


    override async when() {
        let m = {}   // inicializamos m
        if (this.prop.ReadOnly) {
            return false

        } // End If 

        if (await recNo('lla1_pve') > 0 && lla1_pve.rfc_pve > '             ' && vi_cap_comenom.rfc_nom == lla1_pve.rfc_pve) {
            return false

        } // End If 

        return true

    }   // Fin Procedure





    //metodo
}