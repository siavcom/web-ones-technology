//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// @baseClass  : Component
// @class : cod_nom
// Description : Componente cod_nom
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 24/07/25
// Update Date  :
/////////////////////////////////////////////
// import { COMPONENT } from "@/classes/Component";

import { help } from '@/classes/Siavcom/help/cod_nom/help'
import { d_nom_nom } from './d_nom_nom'

export class cod_nom extends CAPTURECOMPONENT {
    public help = new help()
    public d_nom_nom = new d_nom_nom()
    constructor() {
        super();
        this.prop.Caption = "Código";
        this.prop.Type = "text";
        this.prop.BaseClass = "editText";
        this.prop.ControlSource = "vi_cap_comedoc.cod_nom";
        this.prop.ToolTipText = "Codigo del cliente/proveedor";
        this.prop.Capture = true;
        this.prop.ErrorMessage = "Código inexistente";
        this.prop.Help = true;
        this.inputStyle.width = "120px";
        this.style.width = 'auto'
        // this.containerStyle.width = '-moz-available'
        this.prop.Messages[0] = 'Tiene pagos asignados'

        this.asignaRecno()

    }

    // Evento   :When
    // Objeto  :cod_nom
    // Tipo   :Cuadro de texto
    // Comentarios :Si es un documento de Ingreso o Egresos no permite cambiar su código
    override async when() {
        let m = {}   // inicializamos m
        this.prop.ReadOnly = this.prop.ReadOnly ? this.prop.ReadOnly : await !this.Form.rev_per(this.prop.Name)
        if (this.prop.ReadOnly) {
            this.prop.Valid = true
            return false
        } // End If 

        const vi_cap_comedoc = await goto(0, 'vi_cap_comedoc')
        if (vi_cap_comedoc.key_pri) { // Documento existente
            const vi_cap_comepag = await localAlaSql('select count(key_pri) as key_pri from vi_cap_comepag where key_pri<>0')

            if (vi_cap_comepag[0].key_pri > 0) {
                // Wait windows Nowait 'Tiene pagos asignados'
                MessageBox(this.prop.Messages[0], 16, 'Advertencia', 3000)
                return false

            } // End If 
        }

        if (this.Form.prop.tip_cap == 'P' && await select('lla1_pve') > 0) {
            // si es proveedores y esta conectado a contabilidad
            await useNodata('lla1_pve') // use lla1_pve lla1_pve NODATA

        } // End If 

        this.Form.Bt_carga_xml.prop.Visble = true
        if (this.Form.cod_cap > '      ') {
            return false

        } // End If 
        return true
    }   // Fin Procedure

    // Evento   :Valid
    // Objeto  :cod_nom
    // Tipo   :Cuadro de texto
    // Comentarios :Es la validación de codigo del cliente o proveedor
    override async valid(sw_rel?: boolean) {
        let m = {}   // inicializamos m
        if (this.Form.prop.key == 27)
            return true

        console.log('cod_nom valid', this.prop.Value, typeof this.prop.Value)
        if (this.prop.Value == null)
            this.prop.Value = '          '

        if (this.prop.Value.trim().length === 0)
            return false



        const vi_cap_comedoc = await goto(0, 'vi_cap_comedoc')

        // rellenamos con ceros a la derecha
        m.cop_nom = this.Form.tip_cap
        m.cod_nom = jus_cer(this.prop.Value, m.cop_nom)
        this.prop.Value = m.cod_nom

        let vi_cap_comenom = await goto(0, 'vi_cap_comenom')
        // si cambio de codigo o es un codigo nuevo
        if (vi_cap_comenom == null || vi_cap_comenom.length == 0 || m.cod_nom != vi_cap_comenom.cod_nom) {
            await use('vi_cap_comenom', m) // use vi_cap_comenom vi_cap_comenom
            vi_cap_comenom = await goto(0, 'vi_cap_comenom')
            console.log('vi_cap_comenom', vi_cap_comenom)
            if (vi_cap_comenom.length == 0 || vi_cap_comenom == null) // No existe el codigo
                return false

            // actualiza el tipo de cliente en comedoc
            await updateCampo(vi_cap_comenom.tip_tdn, 'vi_cap_comedoc.tip_tdn', vi_cap_comedoc.recno)

            await this.lee_tdn({
                cop_nom: vi_cap_comenom.cop_nom,
                tip_tdn: vi_cap_comenom.tip_tdn
            }) // lee tipo de cliente
            const cometdo = await goto(0, 'cometdo')
            this.d_nom_nom.prop.Value = vi_cap_comenom.nom_nom
            // asignamos fecha de vencimiento del documento

            if (vi_cap_comedoc.key_pri == 0) { // si es un docto nuevo
                if ((this.Form.prop.tip_cap + cometdo.coa_tdo == 'CC' || this.Form.prop.tip_cap + cometdo.coa_tdo == 'PA')) {
                    this.Form.fve_doc.prop.Value = addDay(vi_cap_comedoc.fec_doc, vi_cap_comenom.dcr_nom)
                } else {
                    this.Form.fve_doc.prop.Value = vi_cap_comedoc.fec_doc
                    this.Form.fve_doc.prop.Valid = true
                    this.Form.fve_doc.prop.ReadOnly = true
                } // End If 

                if (this.Form.prop.tip_cap != 'P') { // si no es proveedor
                    this.Form.ven_ven.prop.Valid = false
                    this.Form.ven_ven.prop.ReadOnly = false
                    this.Form.com_doc.prop.Valid = false
                    this.Form.com_doc.prop.ReadOnly = false
                }

            } // End If 

            if (vi_cap_comenom.mcr_nom == 0)
                vi_cap_comenom.mcr_nom = 1

            //  console.log('vi_cap_comenom', vi_cap_comenom, 'monedas', Public.value.val_mon1)
            if (!vi_cap_comedoc.key_pri) {
                if (cometdo.tip_cfd != 'P') {
                    // si es un documento nuevo
                    this.Form.mon_doc.prop.Value = vi_cap_comenom.mcr_nom
                    const vmo_doc = Public.value.val_mon1[vi_cap_comenom.mcr_nom]
                    await updateCampo(vmo_doc, 'vi_cap_comedoc.vmo_doc', 1)
                    //this.Form.vmo_doc.prop.Value = vmo_doc
                } // End If 

            } // End If 

        } // End If 


        // Proveedores varios
        if (this.Form.prop.tip_cap == 'P' && View['lla1_pve']) {
            // si es proveedores y esta conectado a contabilidad
            m.rfc_pve = vi_cap_comenom.rfc_nom

            await use('lla1_pve', m)

            if (await recCount() == 0) {
                // si no esta dado de alta en proveedores varios
                await appendBlank('lla1_pve')
                await updateCampo(m.rfc_nom, 'lla1_pve.rfc_pve', 1)
                await updateCampo(vi_cap_comenom.nom_nom, 'lla1_pve.nom_pve', 1)
                await updateCampo(vi_cap_comenom.tte_nom, 'lla1_pve.tte_pve', 1)
                await updateCampo(vi_cap_comenom.top_nom, 'lla1_pve.top_pve', 1)

            } // End If 
            this.Form.rfc_pve.prop.Visible = true
            /*            for (const Control of this.Form.main) {
                            // quitamos que solo es de lectura
                            const Comp = this.Form[Control]
                            if (substr(Comp.prop.Name, 4, 1) == '_' && left(Comp.prop.ControlSource, 11) == 'lla1_pve') {
                                Control.prop.ReadOnly = false
                                // no permitimos captura
                                Control.Refresh
                            } // End If 
            
                        } // End For; 
            */

            return true

        } // End If 

        return true

    }   // Fin Procedure

    async lee_tdn() {
        const m = await scatter(['cop_nom', 'tip_tdn'], 'vi_cap_comedoc')
        console.log('lee_tdn', m)
        let lla1_tdn = await goto(0, 'lla1_tdn')
        if (lla1_tdn == null || lla1_tdn.length == 0 || lla1_tdn.tip_tdn != m.tip_tdn) {
            await use('lla1_tdn', m) // use lla1_tdn lla1_tdn
            lla1_tdn = await goto(0, 'lla1_tdn')
        }

        if (lla1_tdn.ai0_tdn == 0) {
            this.Form.im0_doc.prop.ReadOnly = true
            this.Form.im0_doc.prop.Valid = true
        } // End If 

        if (lla1_tdn.ai1_tdn == 0) {
            this.Form.im1_doc.prop.ReadOnly = true
            this.Form.im1_doc.prop.Valid = true
        } // End If 

        if (lla1_tdn.ai2_tdn == 0) {
            this.Form.im2_doc.prop.ReadOnly = true
            this.Form.im2_doc.prop.Valid = true
        } // End If 


        if (lla1_tdn.ai3_tdn == 0) {
            this.Form.im3_doc.prop.ReadOnly = true
            this.Form.im3_doc.prop.Valid = true
        } // End If 

        if (lla1_tdn.ai4_tdn == 0) {
            this.Form.im4_doc.prop.ReadOnly = true
            this.Form.im4_doc.prop.Valid = true
        } // End If 

        if (lla1_tdn.ai5_tdn == 0) {
            this.Form.im5_doc.prop.ReadOnly = true
            this.Form.im5_doc.prop.Valid = true
        } // End If 

    }
    //metodo
}