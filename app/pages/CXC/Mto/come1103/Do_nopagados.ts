//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// BaseClass : Grid
// Class : Do_nopagados
// Description : Componente Do_nopagados
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 24/07/25
// Update Date  :
/////////////////////////////////////////////
// import { GRID } from "@/classes/Grid";

import { GRID } from "@/classes/Grid";
import { c_des_tdo } from './Do_nopagados/c_des_tdo';
import { c_dmo_doc } from './Do_nopagados/c_dmo_doc';
import { c_fec_doc } from './Do_nopagados/c_fec_doc';
import { c_fve_doc } from './Do_nopagados/c_fve_doc';
import { c_ndo_doc } from './Do_nopagados/c_ndo_doc';
import { c_ref_doc } from './Do_nopagados/c_ref_doc';
import { c_sal_doc } from './Do_nopagados/c_sal_doc';
//import { c_tdo_tdo } from './Do_nopagados/c_tdo_tdo';
//imports

export class Do_nopagados extends GRID {
    //   public c_tdo_tdo = new c_tdo_tdo()
    public c_des_tdo = new c_des_tdo()

    public c_ndo_doc = new c_ndo_doc()
    public c_ref_doc = new c_ref_doc()
    public c_fec_doc = new c_fec_doc()
    public c_fve_doc = new c_fve_doc()
    public c_sal_doc = new c_sal_doc()
    public c_dmo_doc = new c_dmo_doc()

    //public
    constructor() {
        super();
        this.prop.Caption = ""
        this.prop.showDeleteButton = false;
        this.prop.showSaveButton = false;
        this.prop.showAddButton = false;
        this.prop.addRow = false; // Si es verdadero aumenta renglon automaticamente
        this.prop.Rows = 6;   // renglones de la grid por defecto
        this.prop.ReadOnly = true
        this.prop.Visible = true;
        //propiedades
    }

    // Evento  :DragDrop
    // Objeto  :Do_nopagados
    // Tipo   :grid
    // Comentarios :
    async DragDrop(oSource, nXCoord, nYCoord) {
        let m = {}   // inicializamos m
        if (oSource.Parent.prop.Name == 'Captura_dpy_asi') {
            // await select('vi_cap_dpy_asi')
            m = await select('vi_cap_dpy_asi')
            //m = appendM(m, await scatter())// scatter 

            await deleteLocalSql()

            await tableUpdate()

            await select('vi_cap_dpy_noasi')

            await appendBlank()

            await gatherFrom(m)

            await tableUpdate()

            let ins_sql = 'update man_comedpy set par_cpy=0 where key_pri=' + lTrim(str(key_pri))
            await SQLExec(ins_sql)
            // ejecuta instruccion sql
            if (Public.value.ndb_emp == 2) {
                // sqlcommit ( Public.value.num_dbs ) 

            } // End If 

            //  this.refresh
            //  this.Form.Captura_dpy_asi.refresh
        } // End If 

        return

    }   // Fin Procedure

    // Evento   :open
    // Objeto  :Bt_doc_por_pagar
    // Tipo   :Boton
    // Comentarios :
    async open() {

        this.Form.Do_nopagados.prop.RecordSource = ''
        let m = {}   // inicializamos m

        let val_mon = [] // DIMENSION val_mon ( 5 )
        const vi_cap_comedoc = await goto(0, 'vi_cap_comedoc')

        val_mon[1] = 1
        val_mon[2] = vi_cap_comedoc.vm2_doc
        val_mon[3] = vi_cap_comedoc.vm3_doc
        val_mon[4] = vi_cap_comedoc.vm4_doc
        val_mon[5] = vi_cap_comedoc.vm5_doc

        //	await localAlaSql('CREATE TABLE IF NOT EXISTS now.vcomesal (tdo_tdo CHAR(3),des_tdo CHAR(16),ndo_doc NUMERIC(8),ref_doc CHAR(40),fec_doc DATE (8),fve_doc DATE (8),sal_doc NUMERIC(19,5),dmo_doc CHAR(3),pag_doc NUMERIC(19,5))')

        let ins_sql = "select " + iif(Public.value.ndb_emp < 4, this.Form.top_con, '') + " *,0 as sal_doc from vcomesal where (cop_nom='" + this.Form.prop.tip_cap + "' and cod_nom='" + vi_cap_comedoc.cod_nom + "'" + " and pag_doc>" + this.Form.lim_inf_sal + ') ' + this.Form.con_vcomesal + " order by fec_doc,tdo_tdo,ndo_doc " + iif(Public.value.ndb_emp == 4, this.Form.top_con, '')

        const res = await SQLExec(ins_sql, 'vcomesal')

        if (vi_cap_comedoc.tdo_tdo != this.Form.tdo_tdo.prop.Value || vi_cap_comedoc.ndo_doc != this.Form.ndo_doc.prop.Value)
            return

        console.log('Bt_doc_por_pagar res=', res, 'mon_doc=', vi_cap_comedoc.mon_doc, 'val_mon=', val_mon)
        const mon_doc = vi_cap_comedoc.mon_doc

        // await goto('TOP', sqlresult)

        if (recCount('vcomesal') > 0) {
            ins_sql = `
            update vcomesal set sal_doc=pag_doc*( 
                  1 / ${val_mon[mon_doc]} ) where mon_doc=1 ; 
            update vcomesal set sal_doc=pag_doc*( 
                  ${val_mon[2]} / ${val_mon[mon_doc]} ) where mon_doc=2 ; 
            update vcomesal set sal_doc=pag_doc*( 
                  ${val_mon[3]} / ${val_mon[mon_doc]} ) where mon_doc=3 ;
            update vcomesal set sal_doc=pag_doc*( 
                  ${val_mon[4]} / ${val_mon[mon_doc]} ) where mon_doc=4 ; 
             update vcomesal set sal_doc=pag_doc*( 
                  ${val_mon[5]} / ${val_mon[mon_doc]} ) where mon_doc=5 ;`


            await localAlaSql(ins_sql)

            this.Form.Do_nopagados.prop.RecordSource = 'vcomesal'
            this.Form.block[3].prop.Visible = true

        }

        return
        //this.enabled=.f.

    }   // Fin Procedure






    //metodo
}