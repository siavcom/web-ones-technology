//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// BaseClass : comboBox
// Class : cba_cba
// Description : Componente cba_cba
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 24/07/25
// Update Date  :
/////////////////////////////////////////////
// import { COMPONENT } from "@/classes/Component";
import { CAPTURECOMPONENT } from "@/classes/CaptureComponent";
//imports

export class cba_cba extends CAPTURECOMPONENT {
    //public
    constructor() {
        super();
        this.prop.BaseClass = "comboBox";
        this.prop.Caption = "Cuenta bancaria";
        this.prop.ControlSource = "vi_cap_comedoc.cba_cba";

        this.prop.BoundColumn = 3;
        this.prop.ColumnCount = 3;
        this.prop.RowSource = "select '          ' as cod_nom,'Efe./No Identifiado' as num_cba, '' as nco_ban,0 as cba_cba ";
        this.prop.ColumnWidths = "180px,120px,32px";
        this.prop.RowSourceType = 4
        //propiedades
    }

    // Evento   :GotFocus
    // Objeto  :cba_cba
    // Tipo   : Combo Box
    // Comentarios :
    async leeChequeras() {

        this.prop.Valid = true
        // let vi_cap_comecba = await goto(0, 'vi_cap_comecba')
        const m = await scatter(['cop_nom', 'cod_nom'], 'vi_cap_comedoc')
        const vi_cap_comecba = await goto(0, 'vi_cap_comecba')
        // noi hay tabla abierta o es diferente el codigo

        if (vi_cap_comecba == null || vi_cap_comecba.cod_nom != m.cod_nom) {
            this.prop.RowSourceType = 0
            const ins_sql = `select '${m.cod_nom}' as cod_nom,'Efe./No Identifiado' as num_cba, '' as nco_ban,0 as cba_cba UNION select '${m.cod_nom}' as cod_nom,num_cba,nco_ban,cba_cba from vi_cap_comecba where cop_nom='${m.cop_nom}'  AND cod_nom='${m.cod_nom}'   order by num_cba desc`

            await SQLExec(ins_sql, 'vi_cap_comecba')
            this.prop.RowSource = "select num_cba,nco_ban,cba_cba from vi_cap_comecba";
            this.prop.RowSourceType = 4
        } // End If 


        if (await recCount('vi_cap_comecba') <= 1)
            return false

        /*
        await select('vi_cap_comecba')

        // VFP SCAN 
        //  IF RECCOUNT()=0
        //  ENDIF
        // IF thisform.vi_cap_comedoc.key_pri
        //     replace vi_cap_comedoc.cta_cta WITH
        while (!eof()) {
            cta_cli = cta_cli + allTrim(nvl(nco_ban, ' ')) + ' ' + allTrim(nvl(num_cba, ' ')) + "," + allTrim(str(nvl(cba_cba, 0))) + ","
            skip()
        } // End while 

        cta_cli = cta_cli + 'Efe./No Identificado,0'
        for (let i = 1; i < this.ListCount; i++) {
            // borramos la lista actual
            this.RemoveListItem(i)
        } // End For; 

        const cta_pago = [[],];// VFP dime cta_pago(getwordcount(cta_cli,',')/2,2)

        let f = 1
        for (let i = 1; i < alen(cta_pago); i++) {
            cta_pago[i] = getwordnum(cta_cli, i, ",")
            this.AddListItem(cta_pago(i), f, 1)
            i = i + 1
            cta_pago[i] = getwordnum(cta_cli, i, ",")
            this.AddListItem(cta_pago(i), f, 2)
            if (vi_cap_comedoc.key_pri && f == 1) {
                // asigna valor default
                // Inicio replace VFP
                Recno = await recNo()
                Alias = await alias()
                await localAlaSql(`update ${Alias} set vi_cap_comedoc.cba_cba=?  where recno=${Recno} `, [cta_pago(i)])

                this.prop.ControlSource = 'vi_cap_comedoc.cba_cba'
                this.prop.Value = vi_cap_comedoc.cba_cba
                this.prop.Value = cta_pago[i - 1]
            } // End If 

            f = f + 1
        } // End For; 

        this.Form.cba_cba.refresh
        this.prop.Valid = true
        await select('vi_cap_comecba')
        
        */

        // si hay cuentas bancarias
        // End If 
        return true
    }   // Fin Procedure

    // Evento   :When
    // Objeto  :cba_cba
    // Tipo   :Cuadro de texto
    // Comentarios :Cuando se permi la captura de la fecha de vencimiento
    override async when() {
        let m = {}   // inicializamos m
        const cometdo = await goto(0, 'cometdo')
        console.log('when cba_cba', cometdo)
        // Cuando se trate de un movimiento que tenga detalle no preguntara la chequera
        if (cometdo.cop_tdo + cometdo.coa_tdo == 'CC' ||
            cometdo.cop_tdo + cometdo.coa_tdo == 'PA' ||
            cometdo.nmo_tdo > 0 ||
            !await this.leeChequeras())
            this.prop.ReadOnly = true

        this.prop.ReadOnly = this.prop.ReadOnly ? this.prop.ReadOnly : await !this.Form.rev_per(this.prop.Name)
        if (this.prop.ReadOnly) {
            this.prop.Valid = true
            this.prop.nextFocus = true
            return false
        }
        return true

    }   // Fin Procedure

    //metodo
}