//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// @baseClass  : imgButton
// @class : Bt_dre_doc
// Description : Componente Bt_dre_doc
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 24/07/25
// Update Date  :
/////////////////////////////////////////////
// import { IMGBUTTON } from "@/classes/imgButton";

import { IMGBUTTON } from "@/classes/imgButton";
//imports

export class Bt_dre_doc extends IMGBUTTON {
    //public
    constructor() {
        super();

        this.prop.Caption = "Documentos relacionados ";
        this.prop.Disabled = false;
        this.style.fontSize = '9px';
        this.prop.Visible = false;
        this.prop.ToolTipText = "Relaciona a los documentos";
        this.style.width = '84px';
        this.prop.Position = 'footer'; // main, header , footer

        //propiedades
    }
    // Evento   :Click
    // Objeto  :dre_doc
    // Tipo   :Buttom
    // Comentarios :
    //m.dre_doc=nvl(vi_cap_comedoc.dre_doc,'')
    //!// IF cometdo.coa_tdo='A'  OR cometdo.tip_cfd<>'I'
    //!//   if thisform.messageBOX('Este documento comunmente se relaciona en el proceso de asignacion de pagos en cargos y abonos de cuentas por cobrar. Quieres relacionarlo aquÃ­?',4+32)<>6
    //!//      RETURN
    //!//   endif
    //!// endif
    override async click() {
        let m = {}   // inicializamos m
        let Recno: number, Alias: string

        await select('tab_xml')

        // VFP LOCATE FOR upper(var_dxm)='DRE_DOC'
        let records = await locateFor(` upper(var_dxm)='DRE_DOC'`)

        if (found() && len(allTrim(tab_xml.val_dxm)) > 10) {
            m.dre_doc = tab_xml.val_dxm
            m.dre_doc = Strconv(m.dre_doc, 14)
        } else {

            await appendBlank()

            m.dre_doc = ''
            //   replace tab_xml.
        } // End If 

        m.doc_ant = m.dre_doc
        const router = useRouter();
        router.push({ name: 'formas/doc_rel', params: { Param1: m.dre_doc, Param2: vi_cap_comedoc.cop_nom, Param3: vi_cap_comedoc.cod_nom } })// tom.dre_doc

        await select('vi_cap_comedoc')

        if (m.dre_doc > '  ') {
            if (vi_cap_comedoc.tre_sat != '04') {
                // Inicio replace VFP
                Recno = await recNo()
                Alias = await alias()
                await localAlaSql(`update ${Alias} set vi_cap_comedoc.tre_sat=?  where recno=${Recno} `, ['04'])

            } // End If 

        } else {

            if (vi_cap_comedoc.tre_sat == '04') {
                // Inicio replace VFP
                Recno = await recNo()
                Alias = await alias()
                await localAlaSql(`update ${Alias} set vi_cap_comedoc.tre_sat=?  where recno=${Recno} `, [' '])

                tableUpdate()  /*gra_reg()*/
            } // End If 

        } // End If 

        if (m.dre_doc > '  ' || m.dre_doc != m.doc_ant) {
            if (len(allTrim(m.dre_doc)) > 10 || len(m.doc_ant) > 10) {
                await select('tab_xml')

                // VFP LOCATE FOR upper(var_dxm)='DRE_DOC'
                let records = await locateFor(` upper(var_dxm)='DRE_DOC'`)

                if (len(allTrim(m.dre_doc)) > 10) {
                    if (!found()) {
                        await appendBlank()

                        // Inicio replace VFP
                        Recno = await recNo()
                        Alias = await alias()
                        await localAlaSql(`update ${Alias} set ord_dxm=? , var_dxm=? , des_dxm=?  where recno=${Recno} `, [999, 'dre_doc', 'Documentos relacionados'])

                    } // End If 

                    m.dre_doc = Strconv(m.dre_doc, 13)
                    // Inicio replace VFP
                    Recno = await recNo()
                    Alias = await alias()
                    await localAlaSql(`update ${Alias} set tab_xml.val_dxm=?  where recno=${Recno} `, [m.dre_doc])

                } else {

                    if (found()) {
                        // Inicio replace VFP
                        Recno = await recNo()
                        Alias = await alias()
                        await localAlaSql(`update ${Alias} set tab_xml.val_dxm=?  where recno=${Recno} `, ["X"])

                    } // End If 

                } // End If 

            } // End If 
            //     replace vi_cap_comedoc.tre_sat WITH '04'

            this.Form.sw_xml = true
            //   replace docxml.dre_doc WITH m.dre_doc
            //   SELECT vi_cap_comedoc
            //   replace vi_cap_comedoc.dre_doc WITH m.dre_doc
            this.Form.prop.key = 0
            this.Form.bt_saveClick()
        } // End If 

        await select('vi_cap_comedoc')

        return

    }   // Fin Procedure


    override async keyPress(nKeyCode, nShiftAltCtrl) {
        let m = {}   // inicializamos m
        this.Form.Bt_can_docto.keyPress(nKeyCode, nShiftAltCtrl)
    }   // Fin Procedure



    // Evento   :When
    // Objeto  :Paridades
    // Tipo   :Buttom
    override async when() {
        let m = {}   // inicializamos m
        this.prop.Valid = true
        const cometdo = await goto(0, 'cometdo')
        const vi_cap_comedoc = await goto(0, 'vi_cap_comedoc')
        // solo los pagos fiscales se les puede meter una relacion
        if (cometdo.cop_nom != 'C' || cometdo.NMO_TDO > 0 || cometdo.tip_cfd != 'P') {
            return false

        } // End If 


        // si no hay relacion, esta cancelado o timbado
        //IF vi_cap_comedoc.cop_nom<>'C' OR LEN(ALLTRIM(vi_cap_comedoc.tre_sat))=0 OR  vi_cap_comedoc.sta_doc='C' OR vi_cap_comedoc.sta_doc='T'
        if (vi_cap_comedoc.cop_nom != 'C' || cometdo.coa_tdo != 'A' || vi_cap_comedoc.sta_doc == 'C' || vi_cap_comedoc.sta_doc == 'T') {
            return false

        } // End If 

        if (await !this.Form.rev_per('TRE')) {
            this.prop.Valid = true
            this.prop.nextFocus = true

            // manda revizar permisos
            return false

        } // End If 

        return true

    }   // Fin Procedure



    //metodo
}