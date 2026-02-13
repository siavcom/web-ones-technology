//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// @baseClass  : Component
// @class : ndo_doc
// Description : Componente ndo_doc
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 24/07/25
// Update Date  :
/////////////////////////////////////////////
// import { COMPONENT } from "@/classes/Component";
import { CAPTURECOMPONENT } from "@/classes/CaptureComponent";
//imports

export class ndo_doc extends CAPTURECOMPONENT {
    //public
    constructor() {
        super();

        this.prop.Type = 'number';
        this.prop.ControlSource = "vi_cap_comedoc.ndo_doc";
        this.prop.Min = '1';
        this.prop.Max = '999999999';
        this.prop.Decimals = 0;
        this.prop.Value = 0;
        this.prop.updateKey = true

        this.style.fontSize = '17px';
        this.inputStyle.fontSize = '17px'
        this.inputStyle.fontWeight = "bold";
        this.inputStyle.width = '64px';
        this.prop.Messages[0] = 'Este documento se cancelo después de timbrar. No se puede utilizar'
        this.prop.Messages[1] = 'No hay documentos por pagar'
    }

    // Evento   :When
    // Objeto  :ndo_doc
    // Tipo   :ComboBox
    // Comentarios :Lee la segutidad
    override async when() {
        await super.when()
        await this.Form.tdo_tdo.when()


        let m = { tdo_tdo: this.Form.tdo_tdo.prop.Value }   // inicializamos m
        // debugger
        const res = await locateFor(`tdo_tdo='${m.tdo_tdo}'`, 'cometdo')
        const cometdo = res[0]
        const vi_cap_cometcd = await currentValue('*', 'vi_cap_cometcd')

        this.Form.tcd_tcd.prop.Visible = false
        this.Form.tcd_tcd.prop.Value = '  '
        // refresca tabla de clasificacion de documentos

        if (vi_cap_cometcd.tdo_tdo != m.tdo_tdo)
            await use('vi_cap_cometcd', m)

        if (await recCount('vi_cap_cometcd') > 0) {
            const vi_cap_cometcd = await currentValue('tcd_tcd', 'vi_cap_cometcd')
            this.Form.tcd_tcd.prop.Value = vi_cap_cometcd.tcd_tcd
            this.Form.tcd_tcd.prop.Visible = true
            // this.Form.tcd_tcd.requery()  // Refrescamos comboBox
        }

        // se apaga swith de documento nuevo

        // this.Form.d_coa_tdo.prop.Value = iif(cometdo.coa_tdo == 'C', 'Cargo', 'Abono')

        if (this.Form.Name === 'come1103') { // Cargos y Abonos
            if (cometdo.cop_nom + cometdo.coa_tdo == 'CA' || cometdo.cop_nom + cometdo.coa_tdo == 'PC') {
                this.Form.d_sal_doc.prop.Caption = 'Aplicado'
            } else {

                this.Form.d_sal_doc.prop.Caption = 'Pagado'
            } // End If 
            // saldo del documento
            //  this.Form.d_sal_doc.prop.Value = 0
            // saldo por pagar
            //this.Form.d_pap_doc.prop.Value = 0

        }

        // total del documento
        //        this.Form.d_tot_doc.prop.Value = 0

        // si no ha leido seguridad o cambio el tipo de docto
        // lee la seguridad

        // asignamos la seguridad por tipo de documento

        m.log_usu = Public.value.log_usu
        m.gru_gru = Public.value.gru_gru

        //log_usu: "ADMIN      
        if (m.log_usu.trim().toUpperCase() != "ADMIN") {
            await use('lla1_seg', m) // use lla1_seg lla1_seg
            if (await recCount('lla1_seg') > 0) {
                m = appendM(m, await scatter())// scatter 
            } else {
                m.per_seg = space(120)
            } // End If 
        }

        const nom_obj = JSON.parse('{"' + Public.value.cmp_seg.replaceAll(',', '":0,"') + '":0}')
        let i = 0
        for (const objeto in nom_obj) {

            if (m.log_usu.trim().toUpperCase() != "ADMIN")
                nom_obj[objeto] = m.per_seg.slice(i, i + 1)
            else
                nom_obj[objeto] = '3'

            i++
        } // End For; 
        this.Form.nom_obj = nom_obj

        this.prop.Value = await get_con_doc(this.Form.tdo_tdo.prop.Value)
        console.log('ndo_doc when  ', 'This.prop.Value=', this.prop.Value)

        return await this.Form.rev_per('ndo_doc')

    }   // Fin Procedure


    // Evento   :Valid
    // Objeto  :ndo_doc
    // Tipo   :Cuadro de texto
    // Comentarios :Es la validación de la llave principal
    override async valid(sw_rel?: boolean) {
        /*      if (this.Form.prop.key == 27 || this.Form.prop.key == 15) {
                  this.prop.Valid = false
                  return true
      
              } // End If 
      
              if (await recCount(vi_cap_comedoc) != 0) {
                  // tiene un registro abierto trata de actualizar el registro
                  this.Form.SetAll('Readonly', false)
                  // Ponemos de solo lectura los controles
                  this.Form.mon_doc.prop.Visble = true
                  this.prop.ReadOnly = true
                  // Se ponen en solo lectura el tipo y número de documento
                  this.Form.tdo_tdo.prop.Visble = false
                  this.Form.tdo_tdo.prop.ReadOnly = true
                  this.Form.cba_cba.prop.Visble = true
                  this.Form.mon_doc.prop.Visble = true
                  this.Form.otro.prop.Visble = true
                  this.Form.salir.prop.Visble = true
      
                  return true
      
              } // End If 
      
      */

        if (this.prop.Value == 0) {
            return false
        }
        if (!await super.valid()) {
            return false
        }

        const cometdo = await goto(0, 'cometdo')

        const vi_cap_comedoc = await goto(0, 'vi_cap_comedoc')
        let m = vi_cap_comedoc   // inicializamos m

        //pos=ascan(nom_obj,'BDO')  && revizamos seguridad de borrado
        if (vi_cap_comedoc.key_pri && (Public.value.log_usu.trim() == 'ADMIN' || await this.Form.rev_per('BDO'))) {
            // si encuentra el campo
            this.Form.bt_delete.prop.Visble = true
            //(pos>0 and thisform.nom_obj[pos+1)>='1' ) && si permite bt_delete
        } else {

            this.Form.bt_delete.prop.Visble = false
        } // End If 

        this.Form.d_fel_doc.prop.Valid = true
        if (!vi_cap_comedoc.key_pri) {

            m.hrs_doc = '12:00:00'
            await updateCampo(m.hrs_doc, 'vi_cap_comedoc.hrs_doc', m.recno)
            //  hora

            m.mon_doc = 1
            await updateCampo(m.mon_doc, 'vi_cap_comedoc.mon_doc', m.recno)
            // asignamos la moneda

            m.vmo_doc = 1
            await updateCampo(m.vmo_doc, 'vi_cap_comedoc.vmo_doc', m.recno)
            // valor de la moneda

            m.suc_pge = Public.value.sucursal
            await updateCampo(m.suc_pge, 'vi_cap_comedoc.suc_pge', m.recno)
            // sucursal


            if (allTrim(this.Form.cod_cap) > '      ') {
                // si ya viene en parametros el codigo de captura lo pone
                // Inicio replace VFP
                await updateCampo(this.Form.cod_cap, 'vi_cap_comedoc.cod_nom', m.recno)
                this.Form.cod_nom.prop.Value = this.Form.cod_cap
                this.Form.cod_nom.valid()
            } // End If 


            const vi_cap_comedoc = await goto(0, 'vi_cap_comedoc')

            // seguridad por sucursales
            // si no tiene sucursal el cliente o proveedor
            // si no tiene sucursal el usuario
            // o es diferente la sucursal del cliente o proveedor
            // a la del usuario
            //If sucursal<>'   ' And sucursal<>suc_pge And suc_pge<>'   '
            // thisform.messagebox('Cliente de otra sucursal')
            // Return .F.
            //Endif
            // leemos variables de memoria
            // Se activara Bt_apl_pag si es un cliente y es un abono
            // o es proveedor y cargo
            ////////////////////////////////////////////////////////

            ////////////////////////////////////////////////////////////////

            // predemos switch de registro nuevo
            for (const Control of this.Form.main) {
                const Comp = this.Form[Control]


                let nombres = upper(left(Control, 3))
                // busca el nombre del objeto en el arreglo nom_cam para ver su seguridad
                if (nombres == 'HRS') {
                    nombres = 'FEC'
                } // End If 

                if (Public.value.log_usu.trim() != 'ADMIN' && await !this.Form.rev_per(nombres)) {
                    Comp.prop.Visble = false
                    Comp.prop.Valid = true  // iif(Comp.prop.Name == 'tcd_tcd', true, false)
                } // End If 



            } // End For; 

            // asignamos fecha contable

            this.Form.fec_doc.prop.Value = Public.value.fpo_pge

            m.tdo_tdo = vi_cap_comedoc.tdo_tdo

            // Tabla de clasificacion de documentos
            // Ya esata en el when
            /*
            if (vi_cap_cometcd.key_pri == 0 || (vi_cap_cometcd.key_pri > 0 && vi_cap_cometcd.tdo_tdo != vi_cap_comedoc.tdo_tdo)) {
                await use('vi_cap_cometcd', m)
                const vi_cap_cometcd = await goto(0, 'vi_cap_cometcd')
                if (await recCount('vi_cap_cometcd') > 0) {
                    this.Form.tcd_tcd.prop.Value = vi_cap_cometcd.tcd_tcd
                }
            } // End If 
             */
        } else {  // si no es nuevo

            const cometdo = await goto(0, 'cometdo')
            // Si es un cfdi, busca su estatus en tabla CFDI XML
            if (cometdo.tip_cfd != '  ' && cometdo.tip_cfd != 'NA') {
                //  busca su estatus en CFDI
                let ins_sql = `select sta_doc as sta_xml from man_comexml where tdo_tdo = '${vi_cap_comedoc.tdo_tdo}' and ndo_doc = ${vi_cap_comedoc.ndo_doc}`
                const res = await SQLExec(ins_sql, 'sqlresult')
                if (res && res.length > 0) {

                    if (res[0].sta_xml == 'C') {
                        MessageBox(this.prop.Messages[0], 16)
                        return false

                    } // End If 

                } // End If 
            }



            try {
                await this.Form.num_pry.valid()
                // validamos el número de proyecto
            }
            catch (error) {

            } // End Try

            await this.Form.cba_cba.gotFocus()
            // obtenemos datos de  chequera

            if (cometdo.cop_nom + cometdo.coa_tdo == 'CA' || cometdo.cop_nom + cometdo.coa_tdo == 'PC') {
                this.Form.Do_nopagados.open()
                this.Form.ap_pagos.open(true)
            } // End If 

            await this.Parent.cod_nom.lee_tdn()

            this.Form.dat_ant = m.imp_doc
            // asignamos el importe del documento dato anterior
            this.Form.im0_doc.valid()
            // no vamos a validar para obtener totales

            //   this.Form.d_tot_doc.prop.Value = vi_cap_comedoc.imp_doc + vi_cap_comedoc.im0_doc + vi_cap_comedoc.im1_doc + vi_cap_comedoc.im2_doc + vi_cap_comedoc.im3_doc + vi_cap_comedoc.im4_doc + vi_cap_comedoc.im5_doc

            //     this.Form.d_pap_doc.prop.Value = this.Form.d_tot_doc.prop.Value - vi_cap_comedoc.sal_doc

            /*
                        let num_obj = 1
                        if (!this.Form.im0_doc.prop.Visible) {
                            num_obj = num_obj + 1
                        } // End If 
            
                        if (!this.Form.im1_doc.prop.Visible) {
                            num_obj = num_obj + 1
                        } // End If 
            
                        if (!this.Form.im2_doc.prop.Visible) {
                            num_obj = num_obj + 1
                        } // End If 
            
                        if (!this.Form.im3_doc.prop.Visible) {
                            num_obj = num_obj + 1
                        } // End If 
            
                        if (!this.Form.im4_doc.prop.Visible) {
                            num_obj = num_obj + 1
                        } // End If 
            
                        if (!this.Form.im5_doc.prop.Visible) {
                            num_obj = num_obj + 1
                        } // End If 
            
                        */
            this.Form.prop.key = 0
            if (this.Form.prop.tip_cap == 'P' && await select('lla1_pve') > 0) {
                // si es proveedores y esta conectado a contabilidad
                await select('lla1_pvd')

                await requery()

                // busca en la tabla de proveedores varios
                if (await recCount() > 0) {
                    m = appendM(m, await scatter())// scatter 
                    await tableUpdate('lla1_pve')
                    await requery()
                } // End If 

            } // End If 


        } // End If 


        // calcula saldo de la cuenta de cheques
        if (Public.value.pct_pct == 1 && this.Form.prop.tip_cap == 'P') {
            // Si tiene contabilidad  && calcula saldo de chequera

            let records = await locateFor(` dia_dia=${this.Form.tdo_tdo.prop.Value.trim()}`, 'comedia')
            m.tip_dia = ''
            m.cta_cta = ''
            if (found()) {
                m = await goto(0, 'comedia')
            }
            if (m.tip_dia == 'CH') {
                if (len(allTrim(m.cta_cta)) == 0)
                    m.cta_cta = allTrim(cometdo.ctb_tdo)

                this.Form.d_sal_cta.prop.Value = cal_sal_cta(cta_cta, Public.value.fpo_pge, m.mon_dia)
                this.Form.d_sal_cta.prop.Currency = Public.value.des_mon1(m.mon_dia)
                this.Form.d_sal_cta.prop.Caption = 'Saldo al ' + new Date(Public.value.fpo_pge)
                this.Form.d_sal_cta.prop.Visible = true
            } else {

                //  this.Form.la_sal_cta.prop.Visible = false
                this.Form.d_sal_cta.prop.Visible = false
            } // End If 

        } // End If 

        this.Form.Bt_observaciones.prop.Visble = true
        // deshabilitamos los controles porque se toma como registro nuevo
        if (this.Form.sw_xml) {
            // Lee XML utiliza el parametro de mantenimiento
            this.Form.captura_xml.lee_xml('COMEDOC', vi_cap_comedoc.tdo_tdo, iif(vi_cap_comedoc.key_pri, 0, vi_cap_comedoc.key_pri))
            // elemento nuevo
        } // End If 

        //        if (!this.Form.tcd_tcd.prop.Visible)
        //            this.Form.ref_doc.setFocus()

        return true

    }   // Fin Procedure
    //metodo
}