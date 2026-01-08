//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// BaseClass : Grid
// Class : ap_pagos
// Description : Componente ap_pagos
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 24/07/25
// Update Date  :
/////////////////////////////////////////////
// import { GRID } from "@/classes/Grid";

import { GRID } from "@/classes/Grid";
import { c_fec_doc } from './ap_pagos/c_fec_doc';
import { c_fve_doc } from './ap_pagos/c_fve_doc';
import { c_mon_pag } from './ap_pagos/c_mon_pag';
import { c_nua_pag } from './ap_pagos/c_nua_pag';
import { c_ref_doc } from './ap_pagos/c_ref_doc';
import { c_sal_doc } from './ap_pagos/c_sal_doc';
import { c_tia_pag } from './ap_pagos/c_tia_pag';
//imports

export class ap_pagos extends GRID {
    public c_tia_pag = new c_tia_pag()
    public c_nua_pag = new c_nua_pag()
    public c_ref_doc = new c_ref_doc()
    public c_fec_doc = new c_fec_doc()
    public c_fve_doc = new c_fve_doc()
    public c_mon_pag = new c_mon_pag()
    public c_sal_doc = new c_sal_doc()

    //public
    constructor() {
        super();
        this.prop.Name = "ap_pagos";
        this.prop.Caption = "";
        this.prop.RecordSource = "vi_cap_comepag";
        this.prop.showSaveButton = false;
        this.prop.autoUpdate = true;

        this.prop.Visible = true;
        this.prop.UpdateMessage = "Grabamos pagos";
        this.prop.DeleteMessage = "Borramos pago";
        this.prop.ErrorMessage = 'Pago no actualizados'
        this.prop.addRow = false; // Si es verdadero aumenta renglon automaticamente

        this.prop.ReadOnly = true;
        // this.prop.autoLoad = false;
        // this.prop.AllowAddNew = false;
        this.dat_ant = 0;
        //this.prop.ControlSource = 'vi_cap_comepag';
        this.prop.Messages[10] = 'No se permite arrastrar en este momento'
        this.style.minHeight = '150px'
        //this.style.height = '100%'
    }

    // inicializamos la clase base
    async DragDrop(oSource, nXCoord, nYCoord) {
        let m = {}   // inicializamos m
        //!// If cometdo.tip_cfd<>'P' Or Thisform.d_sta_doc.Value<>'Timbrado' && solo si es difernete a aplicacion de pagos
        //!//  Thisform.ap_pagos.Visible=.T.
        //!//  Thisform.ap_pagos.Enabled=.T.
        //!// Endif
        if (!this.prop.Visble) {
            MessageBox(this.prop.Messages[10], 16, 'Ojo', '5000')
            return

        } // End If 

        const vi_cap_comedoc = await goto(0, 'vi_cap_comedoc')
        if (vi_cap_comedoc.key_pri) {
            this.Form.grabar(false)
        } // End If 

        // set dele on 

        let sal_pag = this.Form.d_tot_doc.prop.Value - this.Form.d_sal_doc.prop.Value
        if (oSource.Parent.prop.Name == 'Do_nopagados' && sal_pag > 0) {
            await select('vi_cap_comepag')
            // selecionamos los pagos

            await goto('BOTTOM')
            // nos posicionamos el el ultimo renglon

            await tableRevert()

            this.ins_renglon
            //   key=24
            //   IF RECNO()>0 OR RECCOUNT()=0
            // incertamos el renglon si no es renglon nuevo
            await goto('BOTTOM')
            //   endif

            //  this.refresh
            // Inicio replace VFP
            let Recno = await recNo()
            let Alias = await alias()
            await localAlaSql(`update ${Alias} set vi_cap_comepag.tia_pag=?  where recno=${Recno} `, [vcomesal.tdo_tdo])

            this.c_tia_pag.tia_pag.prop.Value = vcomesal.tdo_tdo
            // Inicio replace VFP
            Recno = await recNo()
            Alias = await alias()
            await localAlaSql(`update ${Alias} set vi_cap_comepag.nua_pag=?  where recno=${Recno} `, [vcomesal.ndo_doc])

            await select('doc_ppagar')
            //   replace vi_cap_comepag.mon_pag with iif(sal_pag>=m.sal_doc,m.sal_doc,sal_pag)

            // VFP LOCATE FOR tdo_tdo=vcomesal.tdo_tdo
            let records = await locateFor(` tdo_tdo=vcomesal.tdo_tdo`)

            await select('vi_cap_comepag')

            for (let i = 1; i < this.prop.ColumnCount; i++) {
                //  this.columns(i).controls(2).refresh
                // recorremos las validaciones
                this.columns(i).controls(2).valid()
                // recorremos las validaciones
            } // End For; 

            this.c_tia_pag.tia_pag.setFocus()
            //VFP  chr chr ( 13 )
            //   this.c_mon_pag.mon_pag.setFocus()

            await select('vcomesal')
            //!//    tiempo=seconds()
            //!//    keyboard chr(9)
            //!//    do while seconds()-tiempo=<1
            //!//    enddo
            //!//    keyboard chr(9)
            //!//    do while seconds()-tiempo=<2
            //!//    enddo
            //!//    keyboard chr(9)
            // borramos documento fuente

            m = appendM(m, await scatter())// scatter 
            // leemos valores

            await deleteLocalSql()
            // borra de la vista de documento por pagar

            await tableUpdate()

            //  this.Form.Do_nopagados.refresh
            //  this.refresh
        } // End If 
        //   this.grabar

        return

    }   // Fin Procedure

    override async appendRow() {
        console.log('appendRow Grid ap_pagos d_pap_doc=', this.Form.d_pap_doc.prop.Value)
        if (this.Form.d_pap_doc.prop.Value <= 0.00001) // Si tiene mas saldo a asignar
            return
        const m = await goto(0, 'vi_cap_comedoc')
        await super.appendRow(m)
    }

    override async deleteRow(recno: number, force?: boolean) {
        const m = await goto(0, 'vi_cap_comepag')

        if (await super.deleteRow(recno, force)) {

            this.c_tia_pag.prop.Valid = false
            this.c_nua_pag.prop.Valid = false
            this.c_mon_pag.prop.Valid = false

            this.c_nua_pag.prop.Value = 0
            this.c_mon_pag.prop.Value = 0

            this.recalcular(m)
            return true
        }
        return false
    }

    override async saveRow(columnName: string) {
        const m = await goto(0, 'vi_cap_comepag')
        if (await super.saveRow(columnName)) {
            this.recalcular(m)
            return true

        }
        this.c_mon_pag.prop.Valid = false
        this.c_mon_pag.prop.Focus = true

        return false
    }

    // Evento   :Open
    // Objeto  :ap_pago
    // Tipo   :Boton
    // Comentarios :
    async open(sw_muestra?: boolean) {

        this.prop.RecordSource = ''
        let m = {}
        const vi_cap_comedoc = await goto(0, 'vi_cap_comedoc')
        const cometdo = await goto(0, 'cometdo')

        if (Public.value.log_usu.trim() == 'ADMIN' || await this.Form.rev_per('IPR')) {
            // si encuentra el campo
            this.Form.Bt_imprime.prop.Visible = true
            if (cometdo.tip_cfd == 'P ' && vi_cap_comedoc.sta_doc != 'T' && vi_cap_comedoc.sta_doc != 'X')
                this.Form.Bt_timbra.prop.Visible = true
            // (pos>0 and thisform.nom_obj[pos+1)>='1' ) && si permite imprimir
        } // End If 

        if (((this.Form.prop.tip_cap == 'C' && cometdo.coa_tdo == 'C') || (this.Form.prop.tip_cap == 'P' && cometdo.coa_tdo == 'A'))) {
            return true
        } // End If 

        this.prop.Status = 'P'

        m = vi_cap_comedoc
        // DIMENSION val_mon ( 5 ) 
        const val_mon = []

        val_mon[1] = 1
        val_mon[2] = vi_cap_comedoc.vm2_doc
        val_mon[3] = vi_cap_comedoc.vm3_doc
        val_mon[4] = vi_cap_comedoc.vm4_doc
        val_mon[5] = vi_cap_comedoc.vm5_doc
        // si no no es un ndocumento de pago 

        // Ponemos de solo lectura los controles
        this.Form.cba_cba.prop.ReadOnly = true
        this.Form.mon_doc.prop.ReadOnly = true

        //   this.renglon = 0
        // renglon
        // this.ulr_act = 0

        await use('vi_cap_comepag', m) // use vi_cap_comepag vi_cap_comepag

        if (vi_cap_comedoc.tdo_tdo != this.Form.tdo_tdo.prop.Value || vi_cap_comedoc.ndo_doc != this.Form.ndo_doc.prop.Value)
            return


        if (await recCount('vi_cap_comepag') == 0) {
            // si el registro es nuevo

            await this.appendRow()
        } else {
            // ajustamos el saldo en la moneda del docuemnto de pago

            /*
                        await localAlaSql(`update vi_cap_comepag set sal_doc=sal_doc*( 
                            CASE 
                            when mon_doc=2 then ${val_mon[2]} 
                            when mon_doc=3 then ${val_mon[3]} 
                            when mon_doc=4 then ${val_mon[4]} 
                            when mon_doc=5 then ${val_mon[5]} 
                            else  1 
                            END / ${val_mon[vi_cap_comedoc.mon_doc]} ) where val_mon=1   `)
            */
            const ins_sql = `
            update vi_cap_comepag set sal_doc=sal_doc*( 
                  1 / ${val_mon[vi_cap_comedoc.mon_doc]} ) where val_mon=1 ; 
            update vi_cap_comepag set sal_doc=sal_doc*( 
                  ${val_mon[2]} / ${val_mon[vi_cap_comedoc.mon_doc]} ) where val_mon=2 ; 
            update vi_cap_comepag set sal_doc=sal_doc*( 
                  ${val_mon[3]} / ${val_mon[vi_cap_comedoc.mon_doc]} ) where val_mon=3 ;
            update vi_cap_comepag set sal_doc=sal_doc*( 
                  ${val_mon[4]} / ${val_mon[vi_cap_comedoc.mon_doc]} ) where val_mon=4 ; 
             update vi_cap_comepag set sal_doc=sal_doc*( 
                  ${val_mon[5]} / ${val_mon[vi_cap_comedoc.mon_doc]} ) where val_mon=5 ;`

            await localAlaSql(ins_sql)


        } // End If 

        this.prop.RecordSource = 'vi_cap_comepag'
        this.prop.Visible = true
        this.Form.block[4].prop.Visible = true // aplica el pago a los docuentos 
        this.prop.Status = 'A'
        return

    }   // Fin Procedure

    async recalcular(m: {}) {

        //  this.Form.Do_nopagados.open()
        this.Form.Do_nopagados.prop.Visible = false
        let vi_cap_comedoc = await goto(0, 'vi_cap_comedoc')

        await use('vi_cap_comedoc', vi_cap_comedoc)
        vi_cap_comedoc = await goto(0, 'vi_cap_comedoc')

        this.Form.d_tot_doc.prop.Value = vi_cap_comedoc.imp_doc + vi_cap_comedoc.im0_doc + vi_cap_comedoc.im1_doc + vi_cap_comedoc.im2_doc + vi_cap_comedoc.im3_doc + vi_cap_comedoc.im4_doc + vi_cap_comedoc.im5_doc
        this.Form.d_pap_doc.prop.Value = this.Form.d_tot_doc.prop.Value - vi_cap_comedoc.sal_doc
        this.Form.d_sal_doc.prop.Value = this.Form.d_tot_doc.prop.Value - this.Form.d_pap_doc.prop.Value

        let ins_sql = `select  * from vcomesal where \
                    tdo_tdo='${m.tia_pag}' and ndo_doc=${m.nua_pag} `

        // Documento de pago

        const pago = await SQLExec(ins_sql)

        // esta totalmente saldado el documento . Borrara del vcomesal 
        if (pago.length == 0 || pago[0].imp_doc - pago[0].pag_doc <= 0.00001) { // no tiene saldo

            const data = await localAlaSql(`select recno from vcomesal where tdo_tdo='${m.tia_pag}' and ndo_doc=${m.nua_pag}`)
            if (data.length > 0)

                this.Form.Do_nopagados.deleteRow(data[0].recno, true)

            /*
                        this.Form.Do_nopagados.prop.RecordSource = ''
                        await localAlaSql(`delete from vcomesal where tdo_tdo='${m.tia_pag}' and ndo_doc=${m.nua_pag}`)
                        this.Form.Do_nopagados.prop.RecordSource = 'vcomesal'
                        this.Form.Do_nopagados.prop.Visible = true
            */
            return true
        }

        let val_mon = [] // DIMENSION val_mon ( 5 )
        val_mon[1] = 1
        val_mon[2] = vi_cap_comedoc.vm2_doc
        val_mon[3] = vi_cap_comedoc.vm3_doc
        val_mon[4] = vi_cap_comedoc.vm4_doc
        val_mon[5] = vi_cap_comedoc.vm5_doc

        const pag_doc = pago[0].pag_doc *
            (val_mon[pago[0].mon_doc] / val_mon[vi_cap_comedoc.mon_doc])

        const vcomesal = await localAlaSql(`select count(recno) as recno from  vcomesal where 
            tdo_tdo='${m.tia_pag}' and ndo_doc=${m.nua_pag}`)


        // No existe el pago borrado en el comesal
        if (vcomesal.length == 0 || vcomesal[0].recno == 0) {

            const M = pago[0]
            //            const recno = View['vcomesal'].recnoVal.length
            const res = await localAlaSql(`select max(recno) as recno,count(recno) as countRecno from  vcomesal`)


            let recno = 0
            if (res[0].recno && res[0].countRecno > 0)
                recno = res[0].recno + 1

            await localAlaSql(`insert into vcomesal \
                (tdo_tdo,ndo_doc,des_tdo,ref_doc,fec_doc,fve_doc,mon_doc,pag_doc,recno) values \
                ('${M.tdo_tdo}',${M.ndo_doc},'${M.des_tdo}','${M.ref_doc}','${M.fec_doc}','${M.fve_doc}',${M.mon_doc},${pag_doc},${recno})`)


            const id = View.vcomesal.recnoVal.length
            View.vcomesal.recnoVal.push({ recno: recno, id: id })
        }
        await localAlaSql(`update vcomesal set pag_doc=${pag_doc} where 
            tdo_tdo='${m.tia_pag}' and ndo_doc=${m.nua_pag}`)

        this.Form.Do_nopagados.prop.RecordSource = 'vcomesal'
        this.Form.Do_nopagados.prop.Visible = true
    }
}